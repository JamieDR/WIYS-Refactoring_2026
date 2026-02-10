import os
import sys
import json
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

# Path configuration
if getattr(sys, 'frozen', False):
    SCRIPT_PATH = Path(sys.executable).parent
else:
    SCRIPT_PATH = Path(__file__).parent

# Hardcoded workspace names
WORKSPACES = ['JAMIE', 'CHARL', 'LARA', 'SHAYNE', 'NAINTARA', 'KARL', 'MARIE']

SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
]

class DeleteSuccessfulUploads:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.sheets_service = None
        self.spreadsheet_id = self.config['google_sheet_id']
        
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
    
    def get_merged_ranges(self):
        """Get all merged cell ranges in the Uploader sheet"""
        try:
            sheet_id = self.get_sheet_id('Uploader')
            if not sheet_id:
                return []
            
            sheet_metadata = self.sheets_service.spreadsheets().get(
                spreadsheetId=self.spreadsheet_id,
                fields='sheets(properties(sheetId,title),merges)'
            ).execute()
            
            for sheet in sheet_metadata.get('sheets', []):
                if sheet['properties']['title'] == 'Uploader':
                    return sheet.get('merges', [])
            
            return []
        except Exception as e:
            print(f"Error getting merged ranges: {e}")
            return []
    
    def get_workspace_structure(self):
        """Analyze workspace structure - same logic as Apps Script"""
        try:
            # Get all data and merges
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Uploader!A:M'
            ).execute()
            
            values = result.get('values', [])
            merges = self.get_merged_ranges()
            
            workspaces = []
            
            # Build a map of row -> merge info
            merge_map = {}
            for merge in merges:
                start_row = merge['startRowIndex'] + 1  # Convert to 1-indexed
                end_row = merge['endRowIndex']  # Already exclusive
                start_col = merge['startColumnIndex']
                end_col = merge['endColumnIndex']  # Already exclusive
                
                num_columns = end_col - start_col
                
                # Only care about merges starting in column A
                if start_col == 0:
                    merge_map[start_row] = {
                        'num_columns': num_columns,
                        'num_rows': end_row - start_row + 1
                    }
            
            # Scan for workspace headers (13-column merges)
            for row_num in range(1, len(values) + 1):
                if row_num in merge_map and merge_map[row_num]['num_columns'] == 13:
                    if row_num - 1 < len(values) and values[row_num - 1]:
                        cell_value = values[row_num - 1][0] if len(values[row_num - 1]) > 0 else ''
                        
                        if cell_value and 'END ROW' in cell_value.upper():
                            # Mark end of previous workspace
                            if workspaces:
                                workspaces[-1]['end_row'] = row_num
                        
                        elif cell_value and cell_value.strip():
                            # This is a workspace header
                            workspace = {
                                'person_name': cell_value.strip(),
                                'header_row': row_num,
                                'start_row': row_num + 1,
                                'end_row': None
                            }
                            workspaces.append(workspace)
            
            return workspaces, values, merge_map
            
        except Exception as e:
            print(f"Error analyzing workspace structure: {e}")
            return [], [], {}
    
    def scan_workspace_for_successful_uploads(self, workspace, values, merge_map):
        """Scan workspace for articles with 'Successful WP Upload' - same logic as Apps Script"""
        articles = []
        
        start_row = workspace['start_row']
        end_row = workspace['end_row'] if workspace['end_row'] else len(values)
        
        for row_num in range(start_row, end_row):
            # Check if this row has an 11-column merge (article title)
            if row_num in merge_map and merge_map[row_num]['num_columns'] == 11:
                # This is an article title row
                if row_num - 1 < len(values) and values[row_num - 1]:
                    article_title = values[row_num - 1][0] if len(values[row_num - 1]) > 0 else ''
                    status = values[row_num - 1][11] if len(values[row_num - 1]) > 11 else ''  # Column L
                    
                    if article_title and article_title.strip() and status == 'Successful WP Upload':
                        # Calculate how many rows this article spans
                        rows_to_delete = 1  # Title row
                        check_row = row_num + 1
                        
                        # Count content rows until next merge or end
                        while check_row < end_row:
                            if check_row in merge_map:
                                # Hit another merged cell (next article or END ROW)
                                break
                            rows_to_delete += 1
                            check_row += 1
                        
                        articles.append({
                            'title': article_title.strip(),
                            'row': row_num,
                            'rows_to_delete': rows_to_delete,
                            'workspace': workspace['person_name']
                        })
        
        return articles
    
    def delete_article_rows(self, articles_to_delete):
        """Delete article rows in batch (bottom-up to preserve row numbers)"""
        if not articles_to_delete:
            return 0, 0
        
        try:
            sheet_id = self.get_sheet_id('Uploader')
            if not sheet_id:
                print("Could not find Uploader sheet ID")
                return 0, len(articles_to_delete)
            
            # Sort by row number descending (delete from bottom to top)
            articles_sorted = sorted(articles_to_delete, key=lambda x: x['row'], reverse=True)
            
            deleted_count = 0
            error_count = 0
            
            for article in articles_sorted:
                try:
                    # Delete rows for this article
                    delete_request = {
                        'deleteDimension': {
                            'range': {
                                'sheetId': sheet_id,
                                'dimension': 'ROWS',
                                'startIndex': article['row'] - 1,  # 0-indexed
                                'endIndex': article['row'] - 1 + article['rows_to_delete']
                            }
                        }
                    }
                    
                    self.sheets_service.spreadsheets().batchUpdate(
                        spreadsheetId=self.spreadsheet_id,
                        body={'requests': [delete_request]}
                    ).execute()
                    
                    print(f"  ✓ Deleted: {article['title']} ({article['rows_to_delete']} rows)")
                    deleted_count += 1
                    
                except Exception as e:
                    print(f"  ✗ Error deleting {article['title']}: {e}")
                    error_count += 1
            
            return deleted_count, error_count
            
        except Exception as e:
            print(f"Error in batch deletion: {e}")
            return 0, len(articles_to_delete)
    
    def select_mode(self):
        """Let user choose between specific workspace or all workspaces"""
        print("\n" + "="*60)
        print("DELETE SUCCESSFUL UPLOADS")
        print("="*60)
        print("\nChoose mode:")
        print("  A - Select specific workspace")
        print("  B - Process ALL workspaces automatically")
        print()
        
        while True:
            choice = input("Enter choice (A/B): ").upper().strip()
            if choice in ['A', 'B']:
                return choice
            print("Invalid choice. Please enter A or B.")
    
    def select_workspace(self):
        """Let user select a specific workspace"""
        print("\nAvailable workspaces:")
        print("  0. ALL WORKSPACES")
        for i, workspace in enumerate(WORKSPACES, 1):
            print(f"  {i}. {workspace}")
        
        while True:
            try:
                choice = input("\nEnter workspace number: ").strip()
                choice_num = int(choice)
                
                if choice_num == 0:
                    return 'ALL'
                elif 1 <= choice_num <= len(WORKSPACES):
                    return WORKSPACES[choice_num - 1]
                else:
                    print(f"Invalid number. Please enter 0-{len(WORKSPACES)}")
            except ValueError:
                print("Invalid input. Please enter a number.")
    
    def main(self):
        """Main execution"""
        try:
            self.authenticate()
            
            # Mode selection
            mode = self.select_mode()
            
            if mode == 'A':
                # Specific workspace selection
                workspace = self.select_workspace()
                
                if workspace == 'ALL':
                    workspaces_to_process = WORKSPACES
                else:
                    workspaces_to_process = [workspace]
            else:
                # Process all workspaces
                workspaces_to_process = WORKSPACES
            
            # Get workspace structure
            print("Analyzing workspace structure...")
            all_workspaces, values, merge_map = self.get_workspace_structure()
            
            if not all_workspaces:
                print("No workspaces found. Please check sheet structure.")
                return
            
            # Scan selected workspaces for successful uploads
            print("\nScanning for 'Successful WP Upload' articles...")
            workspace_summaries = {}
            
            for workspace in all_workspaces:
                # Check if this workspace should be processed
                if workspace['person_name'].upper() in [w.upper() for w in workspaces_to_process]:
                    print(f"  Scanning {workspace['person_name']}...")
                    articles = self.scan_workspace_for_successful_uploads(workspace, values, merge_map)
                    if articles:
                        workspace_summaries[workspace['person_name']] = articles
                        print(f"    ✓ Found {len(articles)} articles")
            
            if not workspace_summaries:
                print("\nNo articles found with 'Successful WP Upload' status.")
                return
            
            # Calculate total
            total_articles = sum(len(articles) for articles in workspace_summaries.values())
            
            # Show deletion plan
            print("\n" + "="*60)
            print("DELETION PLAN")
            print("="*60)
            print(f"\nTotal articles to delete: {total_articles}")
            print(f"Affected workspaces: {len(workspace_summaries)}\n")
            
            for workspace_name, articles in workspace_summaries.items():
                print(f"\n{workspace_name} ({len(articles)} articles):")
                for i, article in enumerate(articles[:5], 1):  # Show first 5
                    print(f"  {i}. {article['title']} (Row {article['row']}, {article['rows_to_delete']} rows)")
                
                if len(articles) > 5:
                    print(f"  ... and {len(articles) - 5} more articles")
            
            # Confirm deletion
            print("\n" + "="*60)
            print("⚠️  WARNING: This action cannot be undone!")
            print("="*60)
            confirm = input("\nContinue with deletion? (Y/N): ").upper().strip()
            
            if confirm != 'Y':
                print("Deletion cancelled.")
                return
            
            # Execute deletion WITH RECALCULATION after each workspace
            print("\n" + "="*60)
            print("DELETING ARTICLES (With Recalculation After Each Workspace)")
            print("="*60)
            
            total_deleted = 0
            total_errors = 0
            
            # Process workspaces in REVERSE order (bottom to top)
            workspace_names = list(workspace_summaries.keys())
            workspace_names.reverse()
            
            for workspace_name in workspace_names:
                print(f"\n{'='*60}")
                print(f"Processing: {workspace_name}")
                print(f"{'='*60}")
                
                # RECALCULATE fresh structure before each workspace
                print("  Recalculating workspace structure...")
                fresh_workspaces, fresh_values, fresh_merge_map = self.get_workspace_structure()
                
                # Find this workspace in fresh structure
                current_workspace = None
                for ws in fresh_workspaces:
                    if ws['person_name'] == workspace_name:
                        current_workspace = ws
                        break
                
                if not current_workspace:
                    print(f"  ⚠️ Workspace {workspace_name} not found after recalculation. Skipping.")
                    continue
                
                # Rescan for articles with fresh row numbers
                print("  Scanning for fresh article positions...")
                fresh_articles = self.scan_workspace_for_successful_uploads(
                    current_workspace, 
                    fresh_values, 
                    fresh_merge_map
                )
                
                if not fresh_articles:
                    print(f"  ℹ️ No articles found (may have been deleted already)")
                    continue
                
                print(f"  Found {len(fresh_articles)} articles to delete")
                
                # Delete this workspace's articles
                deleted, errors = self.delete_article_rows(fresh_articles)
                total_deleted += deleted
                total_errors += errors
                
                print(f"  Workspace complete: {deleted} deleted, {errors} errors")
            
            # Summary
            print("\n" + "="*60)
            print("DELETION COMPLETE!")
            print("="*60)
            print(f"✓ Successfully deleted: {total_deleted} articles")
            if total_errors > 0:
                print(f"✗ Errors: {total_errors} articles")
            print("="*60)
            
        except Exception as e:
            print(f"\nERROR: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    try:
        deleter = DeleteSuccessfulUploads()
        deleter.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")