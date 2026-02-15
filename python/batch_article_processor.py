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

# Retry and delay configuration
MAX_RETRIES = 3
RETRY_DELAYS = [10, 20, 40]  # Exponential backoff in seconds
OPERATION_DELAY = 7  # Seconds between major operations


class BatchArticleProcessor:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.drive_service = None
        self.sheets_service = None
        self.spreadsheet_id = self.config['google_sheet_id']
        self.parent_folder_id = self.config['parent_folder_id']
        
        # Error tracking per workspace
        self.errors_by_workspace = {}
        self.total_success = 0
        self.total_errors = 0
        
    def load_config(self):
        """Load configuration from config.json"""
        config_file = SCRIPT_PATH / "config.json"
        with open(config_file, 'r') as f:
            return json.load(f)
    
    def track_error(self, workspace_name):
        """Track an error for a workspace"""
        if workspace_name not in self.errors_by_workspace:
            self.errors_by_workspace[workspace_name] = 0
        self.errors_by_workspace[workspace_name] += 1
        self.total_errors += 1
    
    def track_success(self):
        """Track a successful article"""
        self.total_success += 1
    
    def api_call_with_retry(self, operation_name, api_function):
        """
        Wrapper that retries API calls on rate limit errors.
        Returns: (result, error_context) - error_context is None on success
        """
        for attempt in range(MAX_RETRIES):
            try:
                result = api_function()
                return result, None
            except HttpError as e:
                error_code = e.resp.status
                
                # Retryable errors: 429 (rate limit), 503 (unavailable), 500 (server error)
                if error_code in [429, 503, 500]:
                    if attempt < MAX_RETRIES - 1:
                        wait_time = RETRY_DELAYS[attempt]
                        print(f"    ⚠ {operation_name}: Error {error_code}, retrying in {wait_time}s (attempt {attempt + 1}/{MAX_RETRIES})")
                        time.sleep(wait_time)
                    else:
                        print(f"    ✗ {operation_name}: Failed after {MAX_RETRIES} attempts")
                        return None, self.get_error_context(error_code)
                else:
                    # Non-retryable error
                    print(f"    ✗ {operation_name}: Error {error_code}")
                    return None, self.get_error_context(error_code)
                    
            except Exception as e:
                if attempt < MAX_RETRIES - 1:
                    wait_time = RETRY_DELAYS[attempt]
                    print(f"    ⚠ {operation_name}: {str(e)[:50]}, retrying in {wait_time}s (attempt {attempt + 1}/{MAX_RETRIES})")
                    time.sleep(wait_time)
                else:
                    print(f"    ✗ {operation_name}: Failed after {MAX_RETRIES} attempts")
                    return None, "Connection Error"
        
        return None, "Unknown Error"
    
    def get_error_context(self, error_code):
        """Convert error code to readable context for Column H"""
        error_map = {
            429: "Rate Limit",
            503: "Service Unavailable",
            500: "Server Error",
            403: "Permission Denied",
            404: "Not Found"
        }
        return error_map.get(error_code, f"Error {error_code}")
    
    def delay(self, message=None):
        """Standard delay between operations to avoid rate limits"""
        if message:
            print(f"  ⏳ {message}")
        time.sleep(OPERATION_DELAY)
    
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
    
    def get_sheet_id(self, sheet_name):
        """Get the sheet ID for a given sheet name"""
        def api_call():
            return self.sheets_service.spreadsheets().get(
                spreadsheetId=self.spreadsheet_id
            ).execute()
        
        result, error = self.api_call_with_retry("Get sheet ID", api_call)
        
        if error:
            return None
        
        for sheet in result.get('sheets', []):
            if sheet['properties']['title'] == sheet_name:
                return sheet['properties']['sheetId']
        return None
    
    def scan_articles_for_workspace(self, workspace_name):
        """Scan Article Status Tracker for articles assigned to workspace with 'Not Available Yet' status"""
        def api_call():
            return self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Article Status Tracker!A:H'
            ).execute()
        
        result, error = self.api_call_with_retry("Scan articles", api_call)
        
        if error:
            return []
        
        values = result.get('values', [])
        articles = []
        
        for i, row in enumerate(values[1:], start=2):  # Skip header, start from row 2
            if len(row) < 7:
                continue
            
            assigned_to = row[1] if len(row) > 1 else ''  # Column B
            article_title = row[2] if len(row) > 2 else ''  # Column C
            status = row[6] if len(row) > 6 else ''  # Column G
            
            if status == 'Not Available Yet' and assigned_to and article_title:
                if workspace_name.upper() in assigned_to.upper():
                    articles.append({
                        'row': i,
                        'title': article_title.strip(),
                        'assigned_to': assigned_to.strip()
                    })
        
        return articles
    
    def get_existing_titles_in_workspace(self, workspace_name):
        """Get all existing article titles in a workspace to check for duplicates"""
        def api_call():
            return self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Uploader!A:M'
            ).execute()
        
        result, error = self.api_call_with_retry("Get existing titles", api_call)
        
        if error:
            return []
        
        values = result.get('values', [])
        existing_titles = []
        in_workspace = False
        
        for row in values:
            if not row:
                continue
            
            cell_value = row[0] if len(row) > 0 else ''
            
            # Check if this is a workspace header
            if cell_value and workspace_name.upper() in cell_value.upper() and 'END ROW' not in cell_value.upper():
                in_workspace = True
                continue
            
            # Check if we've reached END ROW or another workspace
            if in_workspace and cell_value:
                if 'END ROW' in cell_value.upper():
                    break
                if any(ws.upper() in cell_value.upper() for ws in WORKSPACES):
                    break
            
            # If we're in the right workspace and this looks like an article title
            if in_workspace and cell_value:
                existing_titles.append(cell_value.strip())
        
        return existing_titles
    
    def find_workspace_end_row(self, workspace_name):
        """Find the END ROW position for a workspace in Uploader sheet"""
        def api_call():
            return self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Uploader!A:A'
            ).execute()
        
        result, error = self.api_call_with_retry("Find END ROW", api_call)
        
        if error:
            return None
        
        values = result.get('values', [])
        in_workspace = False
        
        for i, row in enumerate(values, start=1):
            if not row:
                continue
            
            cell_value = row[0] if len(row) > 0 else ''
            
            # Found the workspace header
            if cell_value and workspace_name.upper() in cell_value.upper() and 'END ROW' not in cell_value.upper():
                in_workspace = True
                continue
            
            # Found the END ROW
            if in_workspace and cell_value and 'END ROW' in cell_value.upper():
                return i
        
        return None
    
    def create_drive_folder(self, article_title):
        """Create a Google Drive folder for the article. Returns (url, error_context)"""
        # Check if folder already exists
        def check_existing():
            query = f"name='{article_title}' and '{self.parent_folder_id}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false"
            return self.drive_service.files().list(q=query, fields='files(id, webViewLink)').execute()
        
        result, error = self.api_call_with_retry("Check existing folder", check_existing)
        
        if error:
            return None, error
        
        files = result.get('files', [])
        if files:
            return files[0].get('webViewLink', ''), None
        
        # Create new folder
        def create_folder():
            file_metadata = {
                'name': article_title,
                'mimeType': 'application/vnd.google-apps.folder',
                'parents': [self.parent_folder_id]
            }
            return self.drive_service.files().create(
                body=file_metadata,
                fields='webViewLink'
            ).execute()
        
        folder, error = self.api_call_with_retry("Create folder", create_folder)
        
        if error:
            return None, error
        
        return folder.get('webViewLink', ''), None
    
    def insert_article_rows(self, workspace_name, articles_data):
        """
        Batch insert all article rows at once with formatting.
        Returns: (success, error_context)
        """
        if not articles_data:
            return True, None
        
        end_row = self.find_workspace_end_row(workspace_name)
        if not end_row:
            return False, "END ROW not found"
        
        sheet_id = self.get_sheet_id('Uploader')
        if not sheet_id:
            return False, "Sheet not found"
        
        # Calculate total rows needed (2 per article)
        total_rows = len(articles_data) * 2
        
        # Step 1: Insert all rows at once
        def insert_rows():
            insert_request = {
                'insertDimension': {
                    'range': {
                        'sheetId': sheet_id,
                        'dimension': 'ROWS',
                        'startIndex': end_row - 1,
                        'endIndex': end_row - 1 + total_rows
                    }
                }
            }
            return self.sheets_service.spreadsheets().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={'requests': [insert_request]}
            ).execute()
        
        _, error = self.api_call_with_retry("Insert rows", insert_rows)
        if error:
            return False, error
        
        print(f"  Inserted {total_rows} rows")
        self.delay("Waiting before formatting...")
        
        # Step 2: Prepare all formatting requests
        requests = []
        value_updates = []
        
        for i, article_data in enumerate(articles_data):
            title_row = end_row + (i * 2)
            content_row = title_row + 1
            article_title = article_data['title']
            folder_url = article_data['folder_url']
            
            # Store title_row for verification later
            article_data['title_row'] = title_row
            
            # TITLE ROW - Merge A-K
            requests.append({
                'mergeCells': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': title_row - 1,
                        'endRowIndex': title_row,
                        'startColumnIndex': 0,
                        'endColumnIndex': 11
                    },
                    'mergeType': 'MERGE_ALL'
                }
            })
            
            # TITLE ROW - Formatting (black bg, white text, bold, center)
            requests.append({
                'repeatCell': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': title_row - 1,
                        'endRowIndex': title_row,
                        'startColumnIndex': 0,
                        'endColumnIndex': 11
                    },
                    'cell': {
                        'userEnteredFormat': {
                            'backgroundColor': {'red': 0, 'green': 0, 'blue': 0},
                            'textFormat': {
                                'foregroundColor': {'red': 1, 'green': 1, 'blue': 1},
                                'fontSize': 11,
                                'bold': True
                            },
                            'horizontalAlignment': 'CENTER',
                            'verticalAlignment': 'MIDDLE'
                        }
                    },
                    'fields': 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
                }
            })
            
            # TITLE ROW - Column L (dropdown cell) - Dark gray bg, white text
            requests.append({
                'repeatCell': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': title_row - 1,
                        'endRowIndex': title_row,
                        'startColumnIndex': 11,
                        'endColumnIndex': 12
                    },
                    'cell': {
                        'userEnteredFormat': {
                            'backgroundColor': {'red': 0.2, 'green': 0.2, 'blue': 0.2},
                            'textFormat': {
                                'foregroundColor': {'red': 1, 'green': 1, 'blue': 1}
                            },
                            'horizontalAlignment': 'CENTER'
                        }
                    },
                    'fields': 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
                }
            })
            
            # TITLE ROW - Column M+ (white background)
            requests.append({
                'repeatCell': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': title_row - 1,
                        'endRowIndex': title_row,
                        'startColumnIndex': 12
                    },
                    'cell': {
                        'userEnteredFormat': {
                            'backgroundColor': {'red': 1, 'green': 1, 'blue': 1}
                        }
                    },
                    'fields': 'userEnteredFormat.backgroundColor'
                }
            })
            
            # CONTENT ROW - Entire row clip wrap
            requests.append({
                'repeatCell': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': content_row - 1,
                        'endRowIndex': content_row
                    },
                    'cell': {
                        'userEnteredFormat': {
                            'wrapStrategy': 'CLIP'
                        }
                    },
                    'fields': 'userEnteredFormat.wrapStrategy'
                }
            })
            
            # CONTENT ROW - Columns A-K (white background, black text, not bold)
            requests.append({
                'repeatCell': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': content_row - 1,
                        'endRowIndex': content_row,
                        'startColumnIndex': 0,
                        'endColumnIndex': 11
                    },
                    'cell': {
                        'userEnteredFormat': {
                            'backgroundColor': {'red': 1, 'green': 1, 'blue': 1},
                            'textFormat': {
                                'foregroundColor': {'red': 0, 'green': 0, 'blue': 0},
                                'bold': False,
                                'fontSize': 10
                            }
                        }
                    },
                    'fields': 'userEnteredFormat(backgroundColor,textFormat)'
                }
            })
            
            # CONTENT ROW - Column D (pink background)
            requests.append({
                'repeatCell': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': content_row - 1,
                        'endRowIndex': content_row,
                        'startColumnIndex': 3,
                        'endColumnIndex': 4
                    },
                    'cell': {
                        'userEnteredFormat': {
                            'backgroundColor': {'red': 1, 'green': 0.9, 'blue': 0.94},
                            'horizontalAlignment': 'CENTER'
                        }
                    },
                    'fields': 'userEnteredFormat(backgroundColor,horizontalAlignment)'
                }
            })
            
            # CONTENT ROW - Columns H, I, J (center alignment)
            for col in [7, 8, 9]:
                requests.append({
                    'repeatCell': {
                        'range': {
                            'sheetId': sheet_id,
                            'startRowIndex': content_row - 1,
                            'endRowIndex': content_row,
                            'startColumnIndex': col,
                            'endColumnIndex': col + 1
                        },
                        'cell': {
                            'userEnteredFormat': {
                                'horizontalAlignment': 'CENTER'
                            }
                        },
                        'fields': 'userEnteredFormat.horizontalAlignment'
                    }
                })
            
            # CONTENT ROW - Column L (gray background)
            requests.append({
                'repeatCell': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': content_row - 1,
                        'endRowIndex': content_row,
                        'startColumnIndex': 11,
                        'endColumnIndex': 12
                    },
                    'cell': {
                        'userEnteredFormat': {
                            'backgroundColor': {'red': 0.8, 'green': 0.8, 'blue': 0.8}
                        }
                    },
                    'fields': 'userEnteredFormat.backgroundColor'
                }
            })
            
            # CONTENT ROW - Column M+ (white background)
            requests.append({
                'repeatCell': {
                    'range': {
                        'sheetId': sheet_id,
                        'startRowIndex': content_row - 1,
                        'endRowIndex': content_row,
                        'startColumnIndex': 12
                    },
                    'cell': {
                        'userEnteredFormat': {
                            'backgroundColor': {'red': 1, 'green': 1, 'blue': 1}
                        }
                    },
                    'fields': 'userEnteredFormat.backgroundColor'
                }
            })
            
            # Prepare value updates
            value_updates.append({
                'range': f'Uploader!A{title_row}',
                'values': [[article_title]]
            })
            
            value_updates.append({
                'range': f'Uploader!L{title_row}',
                'values': [['GDrive Folder is Ready']]
            })
            
            if folder_url:
                value_updates.append({
                    'range': f'Uploader!M{title_row}',
                    'values': [[folder_url]]
                })
        
        # Step 3: Apply all formatting in one batch
        def apply_formatting():
            return self.sheets_service.spreadsheets().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={'requests': requests}
            ).execute()
        
        _, error = self.api_call_with_retry("Apply formatting", apply_formatting)
        if error:
            return False, error
        
        print(f"  Applied formatting for {len(articles_data)} articles")
        self.delay("Waiting before writing data...")
        
        # Step 4: Write all values in one batch
        def write_values():
            return self.sheets_service.spreadsheets().values().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={
                    'valueInputOption': 'RAW',
                    'data': value_updates
                }
            ).execute()
        
        _, error = self.api_call_with_retry("Write values", write_values)
        if error:
            return False, error
        
        print(f"  Wrote data for {len(articles_data)} articles")
        self.delay("Waiting before copying dropdowns...")
        
        # Step 5: Copy dropdown validation
        for i, article_data in enumerate(articles_data):
            title_row = article_data['title_row']
            
            def copy_dropdown(tr=title_row):
                copy_request = {
                    'copyPaste': {
                        'source': {
                            'sheetId': sheet_id,
                            'startRowIndex': 1,
                            'endRowIndex': 2,
                            'startColumnIndex': 11,
                            'endColumnIndex': 12
                        },
                        'destination': {
                            'sheetId': sheet_id,
                            'startRowIndex': tr - 1,
                            'endRowIndex': tr,
                            'startColumnIndex': 11,
                            'endColumnIndex': 12
                        },
                        'pasteType': 'PASTE_DATA_VALIDATION'
                    }
                }
                return self.sheets_service.spreadsheets().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={'requests': [copy_request]}
                ).execute()
            
            _, error = self.api_call_with_retry(f"Copy dropdown row {title_row}", copy_dropdown)
            # Don't fail the whole batch for dropdown errors, just warn
            if error:
                print(f"    Warning: Could not copy dropdown for {article_data['title']}")
        
        print(f"  Copied dropdowns for {len(articles_data)} articles")
        
        return True, None
    
    def verify_article(self, article_data):
        """
        Verify that an article was correctly inserted.
        Checks: Column A = title, Column L = 'GDrive Folder is Ready', Column M = folder URL
        Returns: (success, error_context)
        """
        title_row = article_data['title_row']
        expected_title = article_data['title']
        
        def read_row():
            return self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range=f'Uploader!A{title_row}:M{title_row}'
            ).execute()
        
        result, error = self.api_call_with_retry(f"Verify row {title_row}", read_row)
        
        if error:
            return False, error
        
        values = result.get('values', [[]])
        row = values[0] if values else []
        
        # Pad row to ensure we have enough columns
        while len(row) < 13:
            row.append('')
        
        actual_title = row[0].strip() if row[0] else ''
        actual_status = row[11].strip() if row[11] else ''
        actual_url = row[12].strip() if row[12] else ''
        
        # Check all three conditions
        if actual_title != expected_title:
            return False, "Title not found"
        
        if actual_status != 'GDrive Folder is Ready':
            return False, "Status not set"
        
        if not actual_url:
            return False, "URL not found"
        
        return True, None
    
    def mark_article_failed(self, article_row, error_context):
        """Mark an article as failed in Article Status Tracker with red background"""
        sheet_id = self.get_sheet_id('Article Status Tracker')
        
        # Update values: Column G = "Retry Row", Column H = error context
        def update_values():
            return self.sheets_service.spreadsheets().values().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={
                    'valueInputOption': 'RAW',
                    'data': [
                        {'range': f'Article Status Tracker!G{article_row}', 'values': [['Retry Row']]},
                        {'range': f'Article Status Tracker!H{article_row}', 'values': [[error_context]]}
                    ]
                }
            ).execute()
        
        self.api_call_with_retry("Update failed status", update_values)
        
        # Apply light red background to G and H
        if sheet_id:
            def apply_red_bg():
                requests = [{
                    'repeatCell': {
                        'range': {
                            'sheetId': sheet_id,
                            'startRowIndex': article_row - 1,
                            'endRowIndex': article_row,
                            'startColumnIndex': 6,  # Column G
                            'endColumnIndex': 8     # Column H (inclusive)
                        },
                        'cell': {
                            'userEnteredFormat': {
                                'backgroundColor': {'red': 1, 'green': 0.8, 'blue': 0.8}
                            }
                        },
                        'fields': 'userEnteredFormat.backgroundColor'
                    }
                }]
                return self.sheets_service.spreadsheets().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={'requests': requests}
                ).execute()
            
            self.api_call_with_retry("Apply red background", apply_red_bg)
    
    def update_status_tracker(self, updates):
        """Batch update statuses in Article Status Tracker"""
        def api_call():
            value_updates = []
            
            for update in updates:
                if update.get('folder_url'):
                    value_updates.append({
                        'range': f'Article Status Tracker!F{update["row"]}',
                        'values': [[update['folder_url']]]
                    })
                
                value_updates.append({
                    'range': f'Article Status Tracker!G{update["row"]}',
                    'values': [[update['status']]]
                })
            
            return self.sheets_service.spreadsheets().values().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={
                    'valueInputOption': 'RAW',
                    'data': value_updates
                }
            ).execute()
        
        self.api_call_with_retry("Update status tracker", api_call)
    
    def process_workspace(self, workspace_name):
        """Process all articles for a single workspace"""
        print(f"\n{'='*60}")
        print(f"Processing workspace: {workspace_name}")
        print(f"{'='*60}")
        
        # Step 1: Scan for articles
        print(f"\nScanning for articles assigned to {workspace_name}...")
        articles = self.scan_articles_for_workspace(workspace_name)
        
        if not articles:
            print(f"No articles found with 'Not Available Yet' status for {workspace_name}")
            return {'processed': 0, 'duplicates': 0, 'errors': 0}
        
        print(f"Found {len(articles)} articles to process")
        self.delay("Waiting before checking duplicates...")
        
        # Step 2: Check for duplicates
        print(f"\nChecking for duplicates in {workspace_name} workspace...")
        existing_titles = self.get_existing_titles_in_workspace(workspace_name)
        existing_titles_lower = [t.lower() for t in existing_titles]
        
        articles_to_process = []
        duplicate_articles = []
        
        for article in articles:
            if article['title'].lower() in existing_titles_lower:
                duplicate_articles.append(article)
            else:
                articles_to_process.append(article)
        
        print(f"New articles: {len(articles_to_process)}")
        print(f"Duplicates found: {len(duplicate_articles)}")
        
        # Mark duplicates
        if duplicate_articles:
            dup_updates = [{'row': a['row'], 'status': 'DUPLICATE FOUND!'} for a in duplicate_articles]
            self.update_status_tracker(dup_updates)
            print(f"  Marked {len(duplicate_articles)} duplicates")
        
        if not articles_to_process:
            return {'processed': 0, 'duplicates': len(duplicate_articles), 'errors': 0}
        
        self.delay("Waiting before creating folders...")
        
        # Step 3: Create Drive folders
        print(f"\nCreating Google Drive folders...")
        articles_with_folders = []
        folder_errors = []
        
        for article in articles_to_process:
            folder_url, error = self.create_drive_folder(article['title'])
            
            if folder_url:
                article['folder_url'] = folder_url
                articles_with_folders.append(article)
                print(f"  ✓ {article['title']}")
            else:
                folder_errors.append((article, error))
                print(f"  ✗ {article['title']} ({error})")
            
            self.delay()  # Delay between folder creations
        
        # Mark folder creation failures
        for article, error in folder_errors:
            self.mark_article_failed(article['row'], error)
            self.track_error(workspace_name)
        
        if not articles_with_folders:
            return {
                'processed': 0, 
                'duplicates': len(duplicate_articles), 
                'errors': len(folder_errors)
            }
        
        self.delay("Waiting before inserting rows...")
        
        # Step 4: Insert all rows with formatting
        print(f"\nInserting {len(articles_with_folders)} article entries in Uploader sheet...")
        success, error = self.insert_article_rows(workspace_name, articles_with_folders)
        
        if not success:
            # Bulk insert failed - mark all as failed
            print(f"  ✗ Bulk insert failed: {error}")
            for article in articles_with_folders:
                self.mark_article_failed(article['row'], error)
                self.track_error(workspace_name)
            return {
                'processed': 0, 
                'duplicates': len(duplicate_articles), 
                'errors': len(folder_errors) + len(articles_with_folders)
            }
        
        self.delay("Waiting before verification...")
        
        # Step 5: Verify each article individually
        print(f"\nVerifying inserted articles...")
        verified_articles = []
        verification_errors = []
        
        for article in articles_with_folders:
            verified, error = self.verify_article(article)
            
            if verified:
                verified_articles.append(article)
                print(f"  ✓ {article['title']}")
                self.track_success()
            else:
                verification_errors.append((article, error))
                print(f"  ✗ {article['title']} ({error})")
        
        # Mark verification failures
        for article, error in verification_errors:
            self.mark_article_failed(article['row'], f"Verification: {error}")
            self.track_error(workspace_name)
        
        self.delay("Waiting before updating tracker...")
        
        # Step 6: Update status tracker for verified articles only
        if verified_articles:
            print(f"\nUpdating Article Status Tracker...")
            success_updates = [{
                'row': a['row'],
                'folder_url': a['folder_url'],
                'status': 'Row Created'
            } for a in verified_articles]
            self.update_status_tracker(success_updates)
            print(f"  Updated {len(success_updates)} statuses to 'Row Created'")
        
        return {
            'processed': len(verified_articles),
            'duplicates': len(duplicate_articles),
            'errors': len(folder_errors) + len(verification_errors)
        }
    
    def select_mode(self):
        """Let user choose between specific workspace or all workspaces"""
        print("\n" + "="*60)
        print("BATCH ARTICLE PROCESSOR")
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
    
    def print_summary(self):
        """Print the final summary report"""
        print("\n" + "="*60)
        print("PROCESSING COMPLETE")
        print("="*60)
        print(f"\nTOTAL SUCCESS: {self.total_success}")
        print(f"TOTAL ERRORS: {self.total_errors}")
        
        # Only show workspaces with errors
        if self.errors_by_workspace:
            print("\n" + "-"*40)
            for workspace, count in self.errors_by_workspace.items():
                print(f"{workspace} - {count} error{'s' if count != 1 else ''}")
        
        print("="*60)
    
    def main(self):
        """Main execution"""
        try:
            self.authenticate()
            
            # Mode selection
            mode = self.select_mode()
            
            if mode == 'A':
                workspace = self.select_workspace()
                
                if workspace == 'ALL':
                    workspaces_to_process = WORKSPACES
                else:
                    workspaces_to_process = [workspace]
            else:
                workspaces_to_process = WORKSPACES
            
            # Confirm
            print(f"\nWill process: {', '.join(workspaces_to_process)}")
            confirm = input("Continue? (Y/N): ").upper().strip()
            
            if confirm != 'Y':
                print("Cancelled.")
                return
            
            # Process workspaces
            total_duplicates = 0
            
            for i, workspace in enumerate(workspaces_to_process):
                result = self.process_workspace(workspace)
                total_duplicates += result['duplicates']
                
                # Delay between workspaces
                if i < len(workspaces_to_process) - 1:
                    self.delay("Waiting before next workspace...")
            
            # Print summary
            self.print_summary()
            
            if total_duplicates > 0:
                print(f"⚠ Duplicates found: {total_duplicates} articles")
            
        except Exception as e:
            print(f"\nERROR: {e}")
            import traceback
            traceback.print_exc()


if __name__ == "__main__":
    try:
        processor = BatchArticleProcessor()
        processor.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")