import os
import sys
import json
from pathlib import Path

try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
except ImportError:
    print("Installing Google API libraries...")
    os.system("pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib")
    print("Restart the script after installation.")
    input("Press Enter to exit...")
    sys.exit(1)

if getattr(sys, 'frozen', False):
    SCRIPT_PATH = Path(sys.executable).parent
else:
    SCRIPT_PATH = Path(__file__).parent

DESKTOP_PATH = Path.home() / "Desktop"

SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
]

class DeskFolderCreator:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.sheets_service = None
        self.spreadsheet_id = self.config['google_sheet_id']
        
    def load_config(self):
        config_file = SCRIPT_PATH / "config.json"
        with open(config_file, 'r') as f:
            return json.load(f)
    
    def authenticate(self):
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
    
    def get_articles_to_process(self):
        try:
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Article Status Tracker!A:G'
            ).execute()
            
            values = result.get('values', [])
            articles = []
            
            for i, row in enumerate(values[1:], start=2):
                if len(row) < 7:
                    continue
                
                article_title = row[2] if len(row) > 2 else ''
                status = row[6] if len(row) > 6 else ''
                
                if status == 'Create Desk Folders' and article_title:
                    articles.append({
                        'row': i,
                        'title': article_title.strip()
                    })
            
            return articles
            
        except Exception as e:
            print(f"Error reading Article Status Tracker: {e}")
            return []
    
    def create_folders(self, articles):
        created_count = 0
        skipped_count = 0
        
        print("\nCreating folders on Desktop...")
        
        for article in articles:
            folder_path = DESKTOP_PATH / article['title']
            
            if folder_path.exists():
                print(f"  Already exists: {article['title']}")
                skipped_count += 1
            else:
                try:
                    folder_path.mkdir(exist_ok=True)
                    print(f"  Created: {article['title']}")
                    created_count += 1
                except Exception as e:
                    print(f"  Error creating {article['title']}: {e}")
        
        return created_count, skipped_count
    
    def batch_update_statuses(self, articles):
        try:
            value_updates = []
            
            for article in articles:
                value_updates.append({
                    'range': f'Article Status Tracker!G{article["row"]}',
                    'values': [['Desk Folder Created']]
                })
            
            if value_updates:
                self.sheets_service.spreadsheets().values().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={
                        'valueInputOption': 'RAW',
                        'data': value_updates
                    }
                ).execute()
                
                print(f"\nUpdated {len(value_updates)} statuses to 'Desk Folder Created'")
                return True
            
            return False
            
        except Exception as e:
            print(f"Error updating statuses: {e}")
            return False
    
    def main(self):
        print("="*60)
        print("DESK FOLDER CREATOR")
        print("="*60)
        
        try:
            self.authenticate()
            
            print("Scanning Article Status Tracker for 'Create Desk Folders' status...")
            articles = self.get_articles_to_process()
            
            if not articles:
                print("No articles found with 'Create Desk Folders' status.")
                return
            
            print(f"\nFound {len(articles)} articles to create folders for:")
            for i, article in enumerate(articles[:10], 1):
                print(f"  {i}. {article['title']}")
            if len(articles) > 10:
                print(f"  ... and {len(articles) - 10} more")
            
            confirm = input("\nProceed with folder creation? (Y/N): ").upper().strip()
            
            if confirm != 'Y':
                print("Cancelled.")
                return
            
            created_count, skipped_count = self.create_folders(articles)
            
            print(f"\nSummary:")
            print(f"  Created: {created_count} folders")
            print(f"  Already existed: {skipped_count} folders")
            
            print("\nUpdating statuses in Article Status Tracker...")
            if self.batch_update_statuses(articles):
                print("\n" + "="*60)
                print("COMPLETED SUCCESSFULLY!")
                print("="*60)
            else:
                print("\nWarning: Status updates may have failed.")
            
        except Exception as e:
            print(f"\nERROR: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    try:
        creator = DeskFolderCreator()
        creator.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")