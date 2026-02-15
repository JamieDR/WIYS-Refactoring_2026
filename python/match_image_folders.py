import os
import sys
import json
import time
import requests
import re
from pathlib import Path
from requests.auth import HTTPBasicAuth
from difflib import SequenceMatcher

try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
except ImportError:
    print("Installing required libraries...")
    os.system("pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib requests")
    print("Restart the script after installation.")
    input("Press Enter to exit...")
    sys.exit(1)

# Path configuration
if getattr(sys, 'frozen', False):
    SCRIPT_PATH = Path(sys.executable).parent
else:
    SCRIPT_PATH = Path(__file__).parent

SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
]

class ImageFolderMatcher:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.drive_service = None
        self.sheets_service = None
        self.spreadsheet_id = self.config['google_sheet_id']
        self.parent_folder_id = self.config['parent_folder_id']
        
        # WordPress credentials
        self.wp_username = "Jamie Delos Reyes"
        self.wp_password = "dYskG4C7NjenzBchL8FXAuMj"
        self.wp_base_url = "https://wheninyourstate.com/wp-json/wp/v2"
        self.wp_auth = HTTPBasicAuth(self.wp_username, self.wp_password)
        
        # Cache for Drive folders
        self.drive_folders = {}
        
        # WordPress session for scraping
        self.wp_session = requests.Session()
        self.wp_session.auth = self.wp_auth
        
    def load_config(self):
        """Load configuration from config.json"""
        config_file = SCRIPT_PATH / "config.json"
        with open(config_file, 'r') as f:
            return json.load(f)
    
    def authenticate(self):
        """Authenticate with Google APIs"""
        print("Authenticating with Google APIs...")
        
        token_path = SCRIPT_PATH / "token.json"
        creds_path = SCRIPT_PATH / "credentials.json"
        
        if token_path.exists():
            self.creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)
        
        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(str(creds_path), SCOPES)
                self.creds = flow.run_local_server(port=0)
                
            with open(token_path, 'w') as token:
                token.write(self.creds.to_json())
        
        self.drive_service = build('drive', 'v3', credentials=self.creds)
        self.sheets_service = build('sheets', 'v4', credentials=self.creds)
        print("Authentication successful!\n")
    
    def get_short_title_from_wp(self, wp_url):
        """Fetch short title by scraping the WordPress editor page"""
        try:
            # Extract slug from URL
            slug = wp_url.rstrip('/').split('/')[-1]
            
            # First get the post ID
            api_url = f"{self.wp_base_url}/posts?slug={slug}&_fields=id"
            response = requests.get(api_url, auth=self.wp_auth, timeout=30)
            
            if response.status_code != 200:
                print(f"      API Error: {response.status_code}")
                return None
            
            data = response.json()
            if isinstance(data, list):
                if not data:
                    return None
                data = data[0]
            
            post_id = data.get('id')
            
            # Now scrape the edit page
            edit_url = f"https://wheninyourstate.com/wp-admin/post.php?post={post_id}&action=edit"
            
            # Fetch the edit page with session
            response = self.wp_session.get(edit_url, timeout=30)
            
            if response.status_code != 200:
                print(f"      Could not access edit page: {response.status_code}")
                return None
            
            html = response.text
            
            # Look for: name="post_short_title_field" ... value="..."
            pattern = r'name="post_short_title_field"[^>]*value="([^"]*)"'
            match = re.search(pattern, html)
            
            if match:
                short_title = match.group(1)
                # Decode HTML entities
                short_title = short_title.replace('&#8211;', '–')
                short_title = short_title.replace('&#8212;', '—')
                short_title = short_title.replace('&#8217;', "'")
                short_title = short_title.replace('&#8216;', "'")
                short_title = short_title.replace('&#8220;', '"')
                short_title = short_title.replace('&#8221;', '"')
                short_title = short_title.replace('&amp;', '&')
                short_title = short_title.replace('&lt;', '<')
                short_title = short_title.replace('&gt;', '>')
                short_title = short_title.replace('&quot;', '"')
                return short_title.strip()
            
            print(f"      Short title field not found in HTML")
            return None
            
        except Exception as e:
            print(f"      Error: {e}")
            return None
    
    def read_broken_posts_from_sheet(self):
        """Read all broken posts from WP Image Repair sheet"""
        print("Reading broken posts from sheet...")
        
        try:
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='WP Image Repair!A2:H'
            ).execute()
            
            values = result.get('values', [])
            
            posts = []
            for i, row in enumerate(values, start=2):
                if len(row) >= 4:
                    posts.append({
                        'row': i,
                        'wp_url': row[3] if len(row) > 3 else '',
                        'short_title': row[4] if len(row) > 4 else '',
                        'drive_folder': row[5] if len(row) > 5 else ''
                    })
            
            print(f"Found {len(posts)} broken posts\n")
            return posts
            
        except Exception as e:
            print(f"Error reading sheet: {e}")
            return []
    
    def fetch_all_drive_folders(self):
        """Fetch all folders from Google Drive parent folder"""
        print("\n" + "="*60)
        print("FETCHING DRIVE FOLDERS")
        print("="*60)
        print("Getting all image folders from Drive...\n")
        
        try:
            query = f"'{self.parent_folder_id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false"
            
            page_token = None
            total_folders = 0
            
            while True:
                response = self.drive_service.files().list(
                    q=query,
                    fields='nextPageToken, files(id, name, webViewLink)',
                    pageToken=page_token,
                    pageSize=1000
                ).execute()
                
                folders = response.get('files', [])
                
                for folder in folders:
                    folder_name = folder['name']
                    # Store with and without number prefix for matching
                    self.drive_folders[folder_name.lower()] = {
                        'name': folder_name,
                        'url': folder.get('webViewLink', ''),
                        'id': folder['id']
                    }
                    
                    # Also store without number prefix
                    # e.g., "1 West Side Market..." -> "West Side Market..."
                    if folder_name and folder_name[0].isdigit():
                        parts = folder_name.split(' ', 1)
                        if len(parts) > 1:
                            name_without_number = parts[1]
                            self.drive_folders[name_without_number.lower()] = {
                                'name': folder_name,
                                'url': folder.get('webViewLink', ''),
                                'id': folder['id']
                            }
                
                total_folders += len(folders)
                print(f"  Loaded {total_folders} folders...")
                
                page_token = response.get('nextPageToken')
                if not page_token:
                    break
            
            print(f"\n✓ Cached {len(self.drive_folders)} folder variations\n")
            return True
            
        except Exception as e:
            print(f"Error fetching Drive folders: {e}")
            return False
    
    def find_best_folder_match(self, short_title):
        """Find best matching Drive folder for a short title"""
        if not short_title:
            return None
        
        short_title_lower = short_title.lower().strip()
        
        # Try exact match first
        if short_title_lower in self.drive_folders:
            return self.drive_folders[short_title_lower]
        
        # Try fuzzy matching
        best_match = None
        best_ratio = 0.0
        
        for folder_key, folder_data in self.drive_folders.items():
            ratio = SequenceMatcher(None, short_title_lower, folder_key).ratio()
            
            if ratio > best_ratio:
                best_ratio = ratio
                best_match = folder_data
        
        # Only return if confidence is high enough
        if best_ratio > 0.75:  # 75% similarity
            return best_match
        
        return None
    
    def phase1_fetch_short_titles(self, posts):
        """Phase 1: Fetch short titles from WordPress"""
        print("\n" + "="*60)
        print("PHASE 1: FETCHING SHORT TITLES")
        print("="*60)
        print("Scraping short titles from WordPress edit pages...")
        print("⚠️  This will be SLOW (1-2 seconds per post)")
        print("⚠️  Scraping 1000+ posts may take 30-60 minutes\n")
        
        updates_needed = []
        processed = 0
        found = 0
        
        for post in posts:
            # Skip if already has short title
            if post['short_title']:
                continue
            
            processed += 1
            print(f"[{processed}] Fetching short title...")
            print(f"    URL: {post['wp_url']}")
            
            short_title = self.get_short_title_from_wp(post['wp_url'])
            
            if short_title:
                print(f"    ✓ Found: {short_title}")
                post['short_title'] = short_title
                updates_needed.append({
                    'row': post['row'],
                    'short_title': short_title
                })
                found += 1
            else:
                print(f"    ✗ No short title found")
            
            # Write in batches of 10
            if len(updates_needed) >= 10:
                self.write_short_titles_batch(updates_needed)
                updates_needed = []
            
            time.sleep(2)  # Rate limiting - be nice to the server
        
        # Write remaining
        if updates_needed:
            self.write_short_titles_batch(updates_needed)
        
        print(f"\n✓ Phase 1 complete: Found {found} short titles")
        return posts
    
    def write_short_titles_batch(self, updates):
        """Write short titles to sheet in batch"""
        try:
            value_updates = []
            
            for update in updates:
                value_updates.append({
                    'range': f'WP Image Repair!E{update["row"]}',
                    'values': [[update['short_title']]]
                })
            
            if value_updates:
                self.sheets_service.spreadsheets().values().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={
                        'valueInputOption': 'RAW',
                        'data': value_updates
                    }
                ).execute()
                
                print(f"    ✓ Wrote {len(updates)} short titles to sheet")
            
        except Exception as e:
            print(f"Error writing short titles: {e}")
    
    def phase2_match_folders(self, posts):
        """Phase 2: Match short titles to Drive folders"""
        print("\n" + "="*60)
        print("PHASE 2: MATCHING TO DRIVE FOLDERS")
        print("="*60)
        print("Matching short titles to folder names...\n")
        
        updates_needed = []
        matched = 0
        unmatched = 0
        
        for post in posts:
            # Skip if already has drive folder
            if post['drive_folder']:
                continue
            
            # Skip if no short title
            if not post['short_title']:
                continue
            
            print(f"Matching: {post['short_title']}")
            
            folder = self.find_best_folder_match(post['short_title'])
            
            if folder:
                print(f"  ✓ Matched to: {folder['name']}")
                post['drive_folder'] = folder['url']
                updates_needed.append({
                    'row': post['row'],
                    'folder_url': folder['url']
                })
                matched += 1
            else:
                print(f"  ✗ No match found")
                unmatched += 1
            
            # Write in batches of 10
            if len(updates_needed) >= 10:
                self.write_folders_batch(updates_needed)
                updates_needed = []
        
        # Write remaining
        if updates_needed:
            self.write_folders_batch(updates_needed)
        
        print(f"\n✓ Phase 2 complete: Matched {matched}, Unmatched {unmatched}")
        return posts
    
    def write_folders_batch(self, updates):
        """Write folder URLs to sheet in batch"""
        try:
            value_updates = []
            
            for update in updates:
                value_updates.append({
                    'range': f'WP Image Repair!F{update["row"]}',
                    'values': [[update['folder_url']]]
                })
            
            if value_updates:
                self.sheets_service.spreadsheets().values().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={
                        'valueInputOption': 'RAW',
                        'data': value_updates
                    }
                ).execute()
                
                print(f"    ✓ Wrote {len(updates)} folder URLs to sheet")
            
        except Exception as e:
            print(f"Error writing folder URLs: {e}")
    
    def main(self):
        """Main execution"""
        print("="*60)
        print("IMAGE FOLDER MATCHER")
        print("="*60)
        print("\nThis script will:")
        print("  1. Read broken posts from 'WP Image Repair' sheet")
        print("  2. Scrape short titles from WordPress edit pages")
        print("  3. Fetch all Drive folders")
        print("  4. Match short titles to folder names")
        print("  5. Write folder URLs back to sheet")
        print("\n⚠️  WARNING: Scraping 1000+ posts will take 30-60 minutes!")
        
        confirm = input("\nContinue? (Y/N): ").upper().strip()
        
        if confirm != 'Y':
            print("Cancelled.")
            return
        
        try:
            self.authenticate()
            
            # Read broken posts
            posts = self.read_broken_posts_from_sheet()
            
            if not posts:
                print("No posts found in sheet.")
                return
            
            # Phase 1: Fetch short titles
            posts = self.phase1_fetch_short_titles(posts)
            
            # Fetch Drive folders
            if not self.fetch_all_drive_folders():
                print("Failed to fetch Drive folders. Cannot continue.")
                return
            
            # Phase 2: Match folders
            posts = self.phase2_match_folders(posts)
            
            print("\n" + "="*60)
            print("MATCHING COMPLETE!")
            print("="*60)
            print("Check the 'WP Image Repair' sheet:")
            print("  - Column E: Short titles")
            print("  - Column F: Matched Drive folders")
            print("\nReview unmatched posts and match manually if needed.")
            
        except Exception as e:
            print(f"\nERROR: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    try:
        matcher = ImageFolderMatcher()
        matcher.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")