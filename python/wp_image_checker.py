import os
import sys
import json
import time
import requests
from pathlib import Path
from requests.auth import HTTPBasicAuth

try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
except ImportError:
    print("Installing Google API libraries...")
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

class WordPressImageChecker:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.sheets_service = None
        self.spreadsheet_id = self.config['google_sheet_id']
        
        # WordPress credentials
        self.wp_username = "Jamie Delos Reyes"
        self.wp_password = "dYskG4C7NjenzBchL8FXAuMj"
        self.wp_base_url = "https://wheninyourstate.com/wp-json/wp/v2"
        self.wp_auth = HTTPBasicAuth(self.wp_username, self.wp_password)
        
        # Checkpoint tracking
        self.checkpoint_file = SCRIPT_PATH / "wp_checker_checkpoint.json"
        
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
        
        self.sheets_service = build('sheets', 'v4', credentials=self.creds)
        print("Authentication successful!\n")
    
    def load_checkpoint(self):
        """Load checkpoint if exists"""
        if self.checkpoint_file.exists():
            with open(self.checkpoint_file, 'r') as f:
                return json.load(f)
        return {'last_page': 0, 'total_checked': 0, 'total_broken': 0}
    
    def save_checkpoint(self, page, total_checked, total_broken):
        """Save checkpoint"""
        checkpoint = {
            'last_page': page,
            'total_checked': total_checked,
            'total_broken': total_broken
        }
        with open(self.checkpoint_file, 'w') as f:
            json.dump(checkpoint, f)
    
    def delete_checkpoint(self):
        """Delete checkpoint file when complete"""
        if self.checkpoint_file.exists():
            os.remove(self.checkpoint_file)
    
    def get_sheet_id(self, sheet_name):
        """Get the sheet ID for a given sheet name"""
        try:
            sheet_metadata = self.sheets_service.spreadsheets().get(
                spreadsheetId=self.spreadsheet_id
            ).execute()
            
            for sheet in sheet_metadata.get('sheets', []):
                if sheet['properties']['title'] == sheet_name:
                    return sheet['properties']['sheetId']
            return None
        except Exception as e:
            print(f"Error getting sheet ID: {e}")
            return None
    
    def create_or_prepare_sheet(self, is_resume=False):
        """Create WP Image Repair sheet or prepare for resume"""
        try:
            # Check if sheet exists
            sheet_metadata = self.sheets_service.spreadsheets().get(
                spreadsheetId=self.spreadsheet_id
            ).execute()
            
            sheet_exists = False
            for sheet in sheet_metadata.get('sheets', []):
                if sheet['properties']['title'] == 'WP Image Repair':
                    sheet_exists = True
                    break
            
            if not sheet_exists:
                # Create new sheet
                requests_body = {
                    'requests': [{
                        'addSheet': {
                            'properties': {
                                'title': 'WP Image Repair'
                            }
                        }
                    }]
                }
                self.sheets_service.spreadsheets().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body=requests_body
                ).execute()
                print("Created 'WP Image Repair' sheet")
                
                # Write header
                header = [['#', 'Date Published', 'Article Title', 'WordPress URL', 'GDrive Image Folder', 'Status', 'Error']]
                self.sheets_service.spreadsheets().values().update(
                    spreadsheetId=self.spreadsheet_id,
                    range='WP Image Repair!A1:G1',
                    valueInputOption='RAW',
                    body={'values': header}
                ).execute()
            elif not is_resume:
                # Clear existing data if starting fresh
                self.sheets_service.spreadsheets().values().clear(
                    spreadsheetId=self.spreadsheet_id,
                    range='WP Image Repair!A2:G'
                ).execute()
                print("Cleared existing data from 'WP Image Repair' sheet")
                
                # Write header
                header = [['#', 'Date Published', 'Article Title', 'WordPress URL', 'GDrive Image Folder', 'Status', 'Error']]
                self.sheets_service.spreadsheets().values().update(
                    spreadsheetId=self.spreadsheet_id,
                    range='WP Image Repair!A1:G1',
                    valueInputOption='RAW',
                    body={'values': header}
                ).execute()
            else:
                print("Resuming - keeping existing data in sheet")
            
        except Exception as e:
            print(f"Error creating/preparing sheet: {e}")
            raise
    
    def process_batch(self, page, batch_size=100):
        """Process one batch of posts (100 posts per batch)"""
        broken_posts = []
        posts_checked = 0
        
        try:
            url = f"{self.wp_base_url}/posts?per_page={batch_size}&page={page}&status=publish"
            response = requests.get(url, auth=self.wp_auth, timeout=30)
            
            if response.status_code != 200:
                return None, posts_checked  # Signal end or error
            
            posts = response.json()
            
            if not posts:
                return None, posts_checked  # No more posts
            
            # Check each post
            for post in posts:
                posts_checked += 1
                
                featured_media = post.get('featured_media', 0)
                
                # ONLY flag if featured_media is 0 or missing
                if not featured_media or featured_media == 0:
                    # Parse date
                    date_published = post['date'].split('T')[0]
                    
                    # Clean title
                    title = self.clean_html_entities(post['title']['rendered'])
                    
                    broken_posts.append([
                        '',  # Row number (will be filled when writing)
                        date_published,
                        title,
                        post['link'],
                        '',  # GDrive folder (empty)
                        'Retrieved',
                        'No featured image set'
                    ])
            
            return broken_posts, posts_checked
            
        except Exception as e:
            print(f"Error processing batch: {e}")
            return None, posts_checked
    
    def write_batch_to_sheet(self, broken_posts):
        """Write a batch of broken posts to the sheet"""
        if not broken_posts:
            return
        
        try:
            # Get current last row
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='WP Image Repair!A:A'
            ).execute()
            
            current_rows = len(result.get('values', []))
            next_row = current_rows + 1
            
            # Add row numbers
            for i, post in enumerate(broken_posts):
                post[0] = next_row + i
            
            # Write to sheet
            range_name = f'WP Image Repair!A{next_row}:G{next_row + len(broken_posts) - 1}'
            
            self.sheets_service.spreadsheets().values().update(
                spreadsheetId=self.spreadsheet_id,
                range=range_name,
                valueInputOption='RAW',
                body={'values': broken_posts}
            ).execute()
            
            print(f"    ✓ Wrote {len(broken_posts)} broken posts to sheet")
            
        except Exception as e:
            print(f"Error writing to sheet: {e}")
            raise
    
    def clean_html_entities(self, text):
        """Clean HTML entities from text"""
        if not text:
            return ''
        
        replacements = {
            '&#8217;': "'",
            '&#8216;': "'",
            '&#8220;': '"',
            '&#8221;': '"',
            '&#8211;': '-',
            '&#8212;': '--',
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"'
        }
        
        for entity, char in replacements.items():
            text = text.replace(entity, char)
        
        return text
    
    def scan_all_posts(self):
        """Scan all posts in batches of 100"""
        print("\n" + "="*60)
        print("SCANNING POSTS (100 per batch)")
        print("="*60)
        print("Only flagging posts with featured_media = 0\n")
        
        # Load checkpoint
        checkpoint = self.load_checkpoint()
        start_page = checkpoint['last_page'] + 1
        total_checked = checkpoint['total_checked']
        total_broken = checkpoint['total_broken']
        
        if start_page > 1:
            print(f"📍 RESUMING from page {start_page}")
            print(f"   Previously: {total_checked} checked, {total_broken} broken\n")
        
        page = start_page
        batch_size = 100
        
        while True:
            print(f"\n{'='*60}")
            print(f"BATCH {page} (Posts {(page-1)*batch_size + 1} to {page*batch_size})")
            print(f"{'='*60}")
            
            # Process this batch
            print(f"  Fetching posts...")
            broken_posts, posts_checked = self.process_batch(page, batch_size)
            
            if broken_posts is None:
                # No more posts or error
                print(f"\n✓ Reached end of posts")
                break
            
            if posts_checked == 0:
                # No posts in this batch
                break
            
            total_checked += posts_checked
            broken_count = len(broken_posts)
            total_broken += broken_count
            
            print(f"  Checked: {posts_checked} posts")
            print(f"  Found: {broken_count} with featured_media = 0")
            
            # Write broken posts to sheet
            if broken_posts:
                print(f"  Writing to sheet...")
                self.write_batch_to_sheet(broken_posts)
            
            # Save checkpoint
            self.save_checkpoint(page, total_checked, total_broken)
            print(f"  ✓ Progress saved (Total: {total_checked} checked, {total_broken} broken)")
            
            # Move to next batch
            page += 1
            time.sleep(2)  # 2 second delay between batches
        
        # Delete checkpoint when complete
        self.delete_checkpoint()
        
        print("\n" + "="*60)
        print("SCAN COMPLETE!")
        print("="*60)
        print(f"Total posts checked: {total_checked}")
        print(f"Total broken posts found: {total_broken}")
        print("="*60)
        
        return total_checked, total_broken
    
    def main(self):
        """Main execution"""
        print("="*60)
        print("WORDPRESS IMAGE CHECKER (SIMPLIFIED)")
        print("="*60)
        print("\nThis version ONLY flags posts with featured_media = 0")
        print("(No media ID verification - much faster!)")
        
        # Check for existing checkpoint
        checkpoint = self.load_checkpoint()
        is_resume = checkpoint['last_page'] > 0
        
        if is_resume:
            print(f"\n📍 CHECKPOINT FOUND!")
            print(f"   Last completed: Page {checkpoint['last_page']}")
            print(f"   Progress: {checkpoint['total_checked']} posts checked, {checkpoint['total_broken']} broken")
            print("\nOptions:")
            print("  R - Resume from checkpoint")
            print("  S - Start fresh (delete checkpoint)")
            
            choice = input("\nEnter choice (R/S): ").upper().strip()
            
            if choice == 'S':
                self.delete_checkpoint()
                is_resume = False
                print("Starting fresh...")
            elif choice != 'R':
                print("Cancelled.")
                return
        else:
            print("\nEstimated time: ~10 minutes for 11,374 posts")
            
            confirm = input("\nContinue? (Y/N): ").upper().strip()
            
            if confirm != 'Y':
                print("Cancelled.")
                return
        
        try:
            self.authenticate()
            self.create_or_prepare_sheet(is_resume)
            
            # Scan all posts in batches (no media ID cache needed!)
            total_checked, total_broken = self.scan_all_posts()
            
            print(f"\n✓ Results written to 'WP Image Repair' sheet")
            print(f"✓ Found {total_broken} posts with no featured image")
            
        except KeyboardInterrupt:
            print("\n\n⚠️  INTERRUPTED!")
            print("Progress has been saved.")
            print("Run the script again and choose 'R' to resume.")
        except Exception as e:
            print(f"\nERROR: {e}")
            print("\n⚠️  Progress has been saved to checkpoint.")
            print("Run the script again and choose 'R' to resume.")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    try:
        checker = WordPressImageChecker()
        checker.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")