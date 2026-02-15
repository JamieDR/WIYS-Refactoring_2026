import os
import sys
import json
import time
from pathlib import Path

try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
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

SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
]

# Retry configuration
MAX_RETRY_ROUNDS = 3
RETRY_WAIT = 10  # Seconds to wait before retry round


class TransferToTracker:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.sheets_service = None
        self.spreadsheet_id = self.config['google_sheet_id']
        
        # Tracking
        self.total_success = 0
        self.total_errors = 0
        
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
        except Exception:
            return None
    
    def get_rows_to_transfer(self):
        """Get rows with 'Ready for Transfer' status from Enhanced Drafter"""
        try:
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Enhanced Drafter!A:M'
            ).execute()
            
            values = result.get('values', [])
            rows = []
            
            for i, row in enumerate(values[1:], start=2):
                while len(row) < 13:
                    row.append('')
                
                status = row[11] if len(row) > 11 else ''  # Column L
                
                if status == 'Ready for Transfer':
                    original_topic = row[1] if len(row) > 1 else ''  # Column B
                    state = row[6] if len(row) > 6 else ''      # Column G
                    title = row[7] if len(row) > 7 else ''      # Column H
                    tags = row[9] if len(row) > 9 else ''       # Column J
                    doc_url = row[10] if len(row) > 10 else ''  # Column K
                    raw_input = row[4] if len(row) > 4 else ''  # Column E
                    
                    topic_summary = self.extract_topic_summary(title, raw_input)
                    
                    if title:
                        rows.append({
                            'row': i,
                            'original_topic': original_topic,
                            'state': state,
                            'title': title,
                            'tags': tags,
                            'doc_url': doc_url,
                            'topic_summary': topic_summary
                        })
            
            return rows
            
        except Exception as e:
            print(f"Error reading Enhanced Drafter: {e}")
            return []
    
    def extract_topic_summary(self, title, raw_input):
        """Extract title + intro for Topic and Summary column"""
        if not raw_input:
            return f"TOPIC: {title}"
        
        lines = raw_input.strip().split('\n')
        
        in_intro = False
        intro_lines = []
        found_h1 = False
        
        for line in lines:
            if line.startswith('# ') and not line.startswith('## '):
                found_h1 = True
                continue
            
            if found_h1:
                if line.startswith('## '):
                    if in_intro:
                        break
                    in_intro = True
                    continue
                elif in_intro:
                    if line.strip():
                        intro_lines.append(line.strip())
        
        intro = ' '.join(intro_lines).strip()
        
        if intro:
            return f"TOPIC: {title}\nSUMMARY: {intro}"
        else:
            return f"TOPIC: {title}"
    
    def get_next_tracker_row(self):
        """Find the absolute last row with any data, then return the next row"""
        try:
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Article Status Tracker!A:K'
            ).execute()
            
            values = result.get('values', [])
            
            # Find the last row that has ANY data in ANY column
            last_row_with_data = 0
            for i, row in enumerate(values, start=1):
                if any(cell.strip() for cell in row if cell):
                    last_row_with_data = i
            
            return last_row_with_data + 1
            
        except Exception as e:
            print(f"Error finding next row: {e}")
            return None
    
    def transfer_row(self, row_data, tracker_row):
        """Transfer a single row to Article Status Tracker. Returns (success, error_context)"""
        try:
            # Write to Article Status Tracker
            tracker_updates = [
                {'range': f'Article Status Tracker!A{tracker_row}', 'values': [[row_data['state']]]},
                {'range': f'Article Status Tracker!C{tracker_row}', 'values': [[row_data['title']]]},
                {'range': f'Article Status Tracker!D{tracker_row}', 'values': [[row_data['doc_url']]]},
                {'range': f'Article Status Tracker!G{tracker_row}', 'values': [['Not Available Yet']]},
                {'range': f'Article Status Tracker!I{tracker_row}', 'values': [[row_data['original_topic']]]},
                {'range': f'Article Status Tracker!J{tracker_row}', 'values': [[row_data['tags']]]},
                {'range': f'Article Status Tracker!K{tracker_row}', 'values': [[row_data['topic_summary']]]}
            ]
            
            self.sheets_service.spreadsheets().values().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={'valueInputOption': 'RAW', 'data': tracker_updates}
            ).execute()
            
            # Update Enhanced Drafter status to DONE
            self.sheets_service.spreadsheets().values().update(
                spreadsheetId=self.spreadsheet_id,
                range=f'Enhanced Drafter!L{row_data["row"]}',
                valueInputOption='RAW',
                body={'values': [['DONE']]}
            ).execute()
            
            return True, None
            
        except HttpError as e:
            error_code = e.resp.status
            error_context = {
                429: "Rate Limit",
                503: "Service Unavailable",
                500: "Server Error",
                403: "Permission Denied",
                404: "Not Found"
            }.get(error_code, f"Error {error_code}")
            return False, error_context
            
        except Exception as e:
            return False, str(e)[:30]
    
    def mark_row_failed(self, row_num, error_context):
        """Mark a row as failed with Retry Row status and red background"""
        sheet_id = self.get_sheet_id('Enhanced Drafter')
        
        try:
            # Update values: Column L = "Retry Row", Column M = error context
            self.sheets_service.spreadsheets().values().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={
                    'valueInputOption': 'RAW',
                    'data': [
                        {'range': f'Enhanced Drafter!L{row_num}', 'values': [['Retry Row']]},
                        {'range': f'Enhanced Drafter!M{row_num}', 'values': [[error_context]]}
                    ]
                }
            ).execute()
            
            # Apply darker red background to L and M
            if sheet_id:
                requests = [{
                    'repeatCell': {
                        'range': {
                            'sheetId': sheet_id,
                            'startRowIndex': row_num - 1,
                            'endRowIndex': row_num,
                            'startColumnIndex': 11,  # Column L
                            'endColumnIndex': 13     # Column M (inclusive)
                        },
                        'cell': {
                            'userEnteredFormat': {
                                'backgroundColor': {'red': 0.9, 'green': 0.6, 'blue': 0.6}
                            }
                        },
                        'fields': 'userEnteredFormat.backgroundColor'
                    }
                }]
                self.sheets_service.spreadsheets().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={'requests': requests}
                ).execute()
        except Exception as e:
            print(f"    Warning: Could not mark row as failed: {e}")
    
    def print_summary(self):
        """Print the final summary report"""
        print("\n" + "="*60)
        print("PROCESSING COMPLETE")
        print("="*60)
        print(f"\nTOTAL SUCCESS: {self.total_success}")
        print(f"TOTAL ERRORS: {self.total_errors}")
        print("="*60)
    
    def main(self):
        print("="*60)
        print("  TRANSFER DRAFTS TO ARTICLE TRACKER")
        print("="*60)
        
        try:
            self.authenticate()
            
            print("Scanning for 'Ready for Transfer' rows...")
            rows = self.get_rows_to_transfer()
            
            if not rows:
                print("No rows found with 'Ready for Transfer' status.")
                return
            
            print(f"\nFound {len(rows)} rows to transfer:")
            for i, row in enumerate(rows[:10], 1):
                print(f"  {i}. {row['title'][:50]}...")
            
            if len(rows) > 10:
                print(f"  ... and {len(rows) - 10} more")
            
            # Show where they will be placed
            next_row = self.get_next_tracker_row()
            if next_row:
                print(f"\nWill be placed starting at row {next_row}")
            
            confirm = input("\nProceed with transfer? (Y/N): ").upper().strip()
            
            if confirm != 'Y':
                print("Cancelled.")
                return
            
            if not next_row:
                print("Could not find next row in Article Status Tracker.")
                return
            
            print("\n" + "="*60)
            print("TRANSFERRING")
            print("="*60)
            
            # Process all rows, collect failures
            failed_rows = []
            current_tracker_row = next_row
            
            for idx, row_data in enumerate(rows, 1):
                print(f"\n[{idx}/{len(rows)}] {row_data['title'][:40]}...")
                
                success, error_context = self.transfer_row(row_data, current_tracker_row)
                
                if success:
                    print(f"  ✓ Transferred to row {current_tracker_row}")
                    self.total_success += 1
                    current_tracker_row += 1  # Only increment on success
                else:
                    print(f"  ✗ Failed: {error_context}")
                    failed_rows.append({
                        'row_data': row_data,
                        'error': error_context
                    })
            
            # Retry failed rows
            retry_round = 1
            while failed_rows and retry_round <= MAX_RETRY_ROUNDS:
                print(f"\n" + "="*60)
                print(f"RETRY ROUND {retry_round}/{MAX_RETRY_ROUNDS}")
                print(f"="*60)
                print(f"⏳ Waiting {RETRY_WAIT} seconds before retrying {len(failed_rows)} failed rows...")
                time.sleep(RETRY_WAIT)
                
                # Recalculate next row in case some succeeded
                current_tracker_row = self.get_next_tracker_row()
                if not current_tracker_row:
                    print("Could not find next row in Article Status Tracker.")
                    break
                
                still_failed = []
                
                for idx, failed in enumerate(failed_rows, 1):
                    row_data = failed['row_data']
                    print(f"\n[Retry {idx}/{len(failed_rows)}] {row_data['title'][:40]}...")
                    
                    success, error_context = self.transfer_row(row_data, current_tracker_row)
                    
                    if success:
                        print(f"  ✓ Transferred to row {current_tracker_row}")
                        self.total_success += 1
                        current_tracker_row += 1
                    else:
                        print(f"  ✗ Failed: {error_context}")
                        still_failed.append({
                            'row_data': row_data,
                            'error': error_context
                        })
                
                failed_rows = still_failed
                retry_round += 1
            
            # Mark remaining failures
            if failed_rows:
                print(f"\n" + "-"*60)
                print(f"Marking {len(failed_rows)} rows as failed...")
                for failed in failed_rows:
                    row_num = failed['row_data']['row']
                    error = failed['error']
                    self.mark_row_failed(row_num, error)
                    self.total_errors += 1
                    print(f"  Row {row_num}: {error}")
            
            # Print summary
            self.print_summary()
            
        except Exception as e:
            print(f"\nERROR: {e}")
            import traceback
            traceback.print_exc()


if __name__ == "__main__":
    try:
        transfer = TransferToTracker()
        transfer.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")