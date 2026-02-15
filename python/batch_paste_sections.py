import os
import sys
import json
import re
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

WORKSPACES = ['JAMIE', 'CHARL', 'LARA', 'SHAYNE', 'NAINTARA', 'KARL', 'MARIE']
SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/documents.readonly'
]

class BatchPasteSections:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.sheets_service = None
        self.docs_service = None
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
        self.docs_service = build('docs', 'v1', credentials=self.creds)
        print("Authentication successful!\n")
    
    def get_sheet_id(self, sheet_name):
        try:
            metadata = self.sheets_service.spreadsheets().get(
                spreadsheetId=self.spreadsheet_id
            ).execute()
            for sheet in metadata.get('sheets', []):
                if sheet['properties']['title'] == sheet_name:
                    return sheet['properties']['sheetId']
            return None
        except Exception as e:
            print(f"Error getting sheet ID: {e}")
            return None
    
    def get_merged_ranges(self):
        try:
            sheet_id = self.get_sheet_id('Uploader')
            if not sheet_id:
                return []
            metadata = self.sheets_service.spreadsheets().get(
                spreadsheetId=self.spreadsheet_id,
                fields='sheets(properties(sheetId,title),merges)'
            ).execute()
            for sheet in metadata.get('sheets', []):
                if sheet['properties']['title'] == 'Uploader':
                    return sheet.get('merges', [])
            return []
        except Exception as e:
            print(f"Error getting merged ranges: {e}")
            return []
    
    def get_workspace_structure(self):
        try:
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Uploader!A:M'
            ).execute()
            values = result.get('values', [])
            merges = self.get_merged_ranges()
            workspaces = []
            merge_map = {}
            
            for merge in merges:
                start_row = merge['startRowIndex'] + 1
                if merge['startColumnIndex'] == 0:
                    merge_map[start_row] = {'num_columns': merge['endColumnIndex'] - merge['startColumnIndex']}
            
            for row_num in range(1, len(values) + 1):
                if row_num in merge_map and merge_map[row_num]['num_columns'] == 13:
                    if row_num - 1 < len(values) and values[row_num - 1]:
                        cell_value = values[row_num - 1][0] if values[row_num - 1] else ''
                        if cell_value and 'END ROW' in cell_value.upper():
                            if workspaces:
                                workspaces[-1]['end_row'] = row_num
                        elif cell_value and cell_value.strip():
                            workspaces.append({
                                'person_name': cell_value.strip(),
                                'header_row': row_num,
                                'start_row': row_num + 1,
                                'end_row': None
                            })
            return workspaces, values, merge_map
        except Exception as e:
            print(f"Error analyzing workspace: {e}")
            return [], [], {}
    
    def get_articles_ready_for_paste(self):
        try:
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Article Status Tracker!A:G'
            ).execute()
            values = result.get('values', [])
            articles = []
            
            for i, row in enumerate(values[1:], start=2):
                if len(row) >= 7:
                    assigned_to = row[1] if len(row) > 1 else ''
                    article_title = row[2] if len(row) > 2 else ''
                    doc_url = row[3] if len(row) > 3 else ''
                    status = row[6] if len(row) > 6 else ''
                    
                    if status == 'Row Created' and article_title and doc_url:
                        articles.append({
                            'title': article_title.strip(),
                            'doc_url': doc_url.strip(),
                            'assigned_to': assigned_to.strip(),
                            'status_row': i
                        })
            return articles
        except Exception as e:
            print(f"Error getting articles: {e}")
            return []
    
    def extract_doc_id(self, url):
        return url.split('/d/')[1].split('/')[0] if '/d/' in url else None
    
    def parse_google_doc(self, doc_id, article_title):
        try:
            doc = self.docs_service.documents().get(documentId=doc_id).execute()
            content = doc.get('body').get('content')
            sections = []
            current_section = None
            content_start_index = -1
            expecting_url = False
            
            # Find H1
            for i, element in enumerate(content):
                if 'paragraph' in element:
                    paragraph = element['paragraph']
                    if 'elements' in paragraph:
                        text = ''.join([e.get('textRun', {}).get('content', '') for e in paragraph['elements']]).strip()
                        style = paragraph.get('paragraphStyle', {})
                        if style.get('namedStyleType', '') == 'HEADING_1':
                            if text == article_title or article_title.split(' - ')[0] in text:
                                content_start_index = i + 1
                                break
            
            if content_start_index == -1:
                return None, "H1 title not found"
            
            # Parse sections
            for element in content[content_start_index:]:
                if 'paragraph' not in element:
                    continue
                paragraph = element['paragraph']
                if 'elements' not in paragraph:
                    continue
                
                text_parts = []
                is_bold = False
                for elem in paragraph['elements']:
                    if 'textRun' in elem:
                        text_parts.append(elem['textRun'].get('content', ''))
                        if elem['textRun'].get('textStyle', {}).get('bold'):
                            is_bold = True
                
                text = ''.join(text_parts).strip()
                if not text:
                    continue
                
                # Stop at markers
                if any(m in text for m in ['Read More from', 'Instructions:', 'Draft Prompt']):
                    break
                
                style = paragraph.get('paragraphStyle', {})
                heading = style.get('namedStyleType', '')
                
                # H1 = end
                if heading == 'HEADING_1':
                    break
                
                # H2 = new section
                if heading == 'HEADING_2':
                    if current_section and current_section['content']:
                        sections.append(current_section)
                    current_section = {
                        'subheading': re.sub(r'^##\s*', '', text).strip(),
                        'content': [],
                        'url': None
                    }
                    expecting_url = True
                
                # H3 = URL
                elif heading == 'HEADING_3' and expecting_url and current_section:
                    cleaned = re.sub(r'^###\s*', '', text).strip()
                    if 'paste url here' not in cleaned.lower():
                        if cleaned.startswith(('http://', 'https://')):
                            current_section['url'] = cleaned
                    expecting_url = False
                
                # Markdown headings
                elif text.startswith('#'):
                    match = re.match(r'^(#{1,3})\s+(.+)', text)
                    if match:
                        hash_count = len(match.group(1))
                        heading_text = match.group(2).strip()
                        
                        if hash_count == 2:  # H2
                            if current_section and current_section['content']:
                                sections.append(current_section)
                            current_section = {
                                'subheading': heading_text,
                                'content': [],
                                'url': None
                            }
                            expecting_url = True
                        
                        elif hash_count == 3 and expecting_url and current_section:  # H3 URL
                            if 'paste url here' not in heading_text.lower():
                                if heading_text.startswith(('http://', 'https://')):
                                    current_section['url'] = heading_text
                            expecting_url = False
                    else:
                        # Not a heading, add as content
                        if current_section:
                            current_section['content'].append(text)
                            expecting_url = False
                
                # Bold text as heading
                elif is_bold and 3 < len(text) < 100 and text[-1] not in '.,:;!?' and not expecting_url:
                    if current_section and current_section['content']:
                        sections.append(current_section)
                    current_section = {
                        'subheading': text,
                        'content': [],
                        'url': None
                    }
                    expecting_url = True
                
                # Regular content
                elif current_section:
                    current_section['content'].append(text)
                    expecting_url = False
            
            # Don't forget last section
            if current_section and current_section['content']:
                sections.append(current_section)
            
            return (sections, None) if sections else (None, "No H2 sections found")
        except Exception as e:
            return None, str(e)
    
    def find_article_in_uploader(self, article_title, workspace, values, merge_map):
        start_row = workspace['start_row']
        end_row = workspace['end_row'] if workspace['end_row'] else len(values)
        
        for row_num in range(start_row, end_row):
            if row_num in merge_map and merge_map[row_num]['num_columns'] == 11:
                if row_num - 1 < len(values) and values[row_num - 1]:
                    title = values[row_num - 1][0] if values[row_num - 1] else ''
                    if title.strip() == article_title:
                        return row_num
        return None
    
    def paste_sections_to_sheet(self, article_title, title_row, sections):
        try:
            sheet_id = self.get_sheet_id('Uploader')
            if not sheet_id:
                return False, "Could not find Uploader sheet"
            
            content_start_row = title_row + 1
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range=f'Uploader!A{content_start_row}:A'
            ).execute()
            
            values = result.get('values', [])
            merges = self.get_merged_ranges()
            merge_map = {merge['startRowIndex'] + 1: True for merge in merges if merge['startColumnIndex'] == 0}
            
            content_end_row = content_start_row
            for i in range(len(values)):
                check_row = content_start_row + i
                if check_row in merge_map:
                    content_end_row = check_row - 1
                    break
                content_end_row = check_row
            
            available_rows = content_end_row - content_start_row + 1
            needed_rows = len(sections)
            
            # MEGA BATCH: All requests in ONE call
            all_requests = []
            
            # Row adjustments
            if needed_rows > available_rows:
                all_requests.append({
                    'insertDimension': {
                        'range': {
                            'sheetId': sheet_id,
                            'dimension': 'ROWS',
                            'startIndex': content_end_row,
                            'endIndex': content_end_row + (needed_rows - available_rows)
                        }
                    }
                })
            elif needed_rows < available_rows:
                all_requests.append({
                    'deleteDimension': {
                        'range': {
                            'sheetId': sheet_id,
                            'dimension': 'ROWS',
                            'startIndex': content_start_row + needed_rows - 1,
                            'endIndex': content_end_row
                        }
                    }
                })
            
            if needed_rows > 0:
                # Format all content rows at once
                all_requests.extend([
                    # Wrap strategy
                    {'repeatCell': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows}, 'cell': {'userEnteredFormat': {'wrapStrategy': 'CLIP'}}, 'fields': 'userEnteredFormat.wrapStrategy'}},
                    # A-K: white bg, black text
                    {'repeatCell': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows, 'startColumnIndex': 0, 'endColumnIndex': 11}, 'cell': {'userEnteredFormat': {'backgroundColor': {'red': 1, 'green': 1, 'blue': 1}, 'textFormat': {'foregroundColor': {'red': 0, 'green': 0, 'blue': 0}, 'bold': False, 'fontSize': 10}}}, 'fields': 'userEnteredFormat(backgroundColor,textFormat)'}},
                    # D: pink bg, center
                    {'repeatCell': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows, 'startColumnIndex': 3, 'endColumnIndex': 4}, 'cell': {'userEnteredFormat': {'backgroundColor': {'red': 1, 'green': 0.9, 'blue': 0.94}, 'horizontalAlignment': 'CENTER'}}, 'fields': 'userEnteredFormat(backgroundColor,horizontalAlignment)'}},
                    # H-J: center
                    {'repeatCell': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows, 'startColumnIndex': 7, 'endColumnIndex': 10}, 'cell': {'userEnteredFormat': {'horizontalAlignment': 'CENTER'}}, 'fields': 'userEnteredFormat.horizontalAlignment'}},
                    # L: gray bg
                    {'repeatCell': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows, 'startColumnIndex': 11, 'endColumnIndex': 12}, 'cell': {'userEnteredFormat': {'backgroundColor': {'red': 0.8, 'green': 0.8, 'blue': 0.8}}}, 'fields': 'userEnteredFormat.backgroundColor'}},
                    # M+: white bg
                    {'repeatCell': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows, 'startColumnIndex': 12}, 'cell': {'userEnteredFormat': {'backgroundColor': {'red': 1, 'green': 1, 'blue': 1}}}, 'fields': 'userEnteredFormat.backgroundColor'}},
                    # Clear dropdown
                    {'setDataValidation': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows, 'startColumnIndex': 11, 'endColumnIndex': 12}, 'rule': None}},
                    # Clear B
                    {'updateCells': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows, 'startColumnIndex': 1, 'endColumnIndex': 2}, 'fields': 'userEnteredValue'}},
                    # Clear D-F
                    {'updateCells': {'range': {'sheetId': sheet_id, 'startRowIndex': content_start_row - 1, 'endRowIndex': content_start_row - 1 + needed_rows, 'startColumnIndex': 3, 'endColumnIndex': 6}, 'fields': 'userEnteredValue'}}
                ])
            
            # Execute mega batch
            if all_requests:
                self.sheets_service.spreadsheets().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={'requests': all_requests}
                ).execute()
            
            # Prepare data
            value_updates = []
            for i, section in enumerate(sections):
                target_row = content_start_row + i
                if section['url']:
                    value_updates.append({'range': f'Uploader!B{target_row}', 'values': [[section['url']]]})
                value_updates.extend([
                    {'range': f'Uploader!D{target_row}', 'values': [[i + 1]]},
                    {'range': f'Uploader!E{target_row}', 'values': [[section['subheading']]]},
                    {'range': f'Uploader!F{target_row}', 'values': [[' '.join(section['content'])]]}
                ])
            value_updates.append({'range': f'Uploader!L{title_row}', 'values': [['Sections Pasted Successfully']]})
            
            # Write all data
            if value_updates:
                self.sheets_service.spreadsheets().values().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={'valueInputOption': 'RAW', 'data': value_updates}
                ).execute()
            
            return True, None
        except Exception as e:
            return False, str(e)
    
    def update_status_tracker(self, status_row, new_status):
        try:
            self.sheets_service.spreadsheets().values().update(
                spreadsheetId=self.spreadsheet_id,
                range=f'Article Status Tracker!G{status_row}',
                valueInputOption='RAW',
                body={'values': [[new_status]]}
            ).execute()
            return True
        except:
            return False
    
    def select_mode(self):
        print("\n" + "="*60)
        print("BATCH PASTE ARTICLE SECTIONS")
        print("="*60)
        print("\nChoose mode:")
        print("  A - Select specific workspace")
        print("  B - Process ALL workspaces automatically\n")
        while True:
            choice = input("Enter choice (A/B): ").upper().strip()
            if choice in ['A', 'B']:
                return choice
            print("Invalid choice. Please enter A or B.")
    
    def select_workspace(self):
        print("\nAvailable workspaces:")
        print("  0. ALL WORKSPACES")
        for i, workspace in enumerate(WORKSPACES, 1):
            print(f"  {i}. {workspace}")
        while True:
            try:
                choice_num = int(input("\nEnter workspace number: ").strip())
                if choice_num == 0:
                    return 'ALL'
                elif 1 <= choice_num <= len(WORKSPACES):
                    return WORKSPACES[choice_num - 1]
                else:
                    print(f"Invalid number. Please enter 0-{len(WORKSPACES)}")
            except ValueError:
                print("Invalid input. Please enter a number.")
    
    def main(self):
        try:
            self.authenticate()
            mode = self.select_mode()
            
            workspaces_to_process = WORKSPACES if mode == 'B' else (
                WORKSPACES if self.select_workspace() == 'ALL' else [self.select_workspace()]
            )
            
            if mode == 'A' and workspaces_to_process != WORKSPACES:
                workspaces_to_process = [self.select_workspace()]
            
            print("\nScanning Article Status Tracker for 'Row Created' articles...")
            all_articles = self.get_articles_ready_for_paste()
            
            if not all_articles:
                print("No articles found with 'Row Created' status.")
                return
            
            articles_to_process = [
                a for a in all_articles 
                for w in workspaces_to_process 
                if w.upper() in a['assigned_to'].upper()
            ]
            
            if not articles_to_process:
                print("No articles found for selected workspace(s).")
                return
            
            print(f"\nFound {len(articles_to_process)} articles to process:")
            for i, article in enumerate(articles_to_process[:10], 1):
                print(f"  {i}. {article['title']}")
            if len(articles_to_process) > 10:
                print(f"  ... and {len(articles_to_process) - 10} more")
            
            if input("\nContinue with paste? (Y/N): ").upper().strip() != 'Y':
                print("Cancelled.")
                return
            
            print("\n" + "="*60)
            print("PROCESSING ARTICLES (With 5-second delay between articles)")
            print("="*60)
            print("â³ Includes delay to prevent timeouts/rate limits")
            print("="*60 + "\n")
            
            total_success = total_errors = 0
            
            for idx, article in enumerate(articles_to_process, 1):
                print(f"\n[{idx}/{len(articles_to_process)}] Processing: {article['title']}")
                title_row = None
                
                try:
                    doc_id = self.extract_doc_id(article['doc_url'])
                    if not doc_id:
                        print("  âœ— Invalid Google Doc URL")
                        total_errors += 1
                        continue
                    
                    print("  Reading Google Doc...")
                    sections, error = self.parse_google_doc(doc_id, article['title'])
                    
                    print("  Recalculating sheet structure...")
                    workspaces, values, merge_map = self.get_workspace_structure()
                    target_workspace = next((ws for ws in workspaces if ws['person_name'].upper() in article['assigned_to'].upper()), None)
                    
                    if not target_workspace:
                        print("  âœ— Workspace not found")
                        total_errors += 1
                        continue
                    
                    title_row = self.find_article_in_uploader(article['title'], target_workspace, values, merge_map)
                    if not title_row:
                        print("  âœ— Article not found in Uploader sheet")
                        total_errors += 1
                        continue
                    
                    print(f"  Found at row {title_row}")
                    
                    if error:
                        print(f"  âœ— Error: {error}")
                        total_errors += 1
                        self.sheets_service.spreadsheets().values().update(
                            spreadsheetId=self.spreadsheet_id,
                            range=f'Uploader!L{title_row}',
                            valueInputOption='RAW',
                            body={'values': [[f'Error: {error}']]}
                        ).execute()
                        continue
                    
                    print(f"  Found {len(sections)} sections")
                    print(f"  Pasting {len(sections)} sections...")
                    
                    success, error = self.paste_sections_to_sheet(article['title'], title_row, sections)
                    if success:
                        self.update_status_tracker(article['status_row'], 'Pasted')
                        print("  âœ“ Success!")
                        total_success += 1
                        
                        # Add delay between articles to prevent timeouts
                        if idx < len(articles_to_process):
                            print("  â³ Waiting 5 seconds before next article...")
                            time.sleep(5)
                    else:
                        print(f"  âœ— Error: {error}")
                        total_errors += 1
                        self.sheets_service.spreadsheets().values().update(
                            spreadsheetId=self.spreadsheet_id,
                            range=f'Uploader!L{title_row}',
                            valueInputOption='RAW',
                            body={'values': [[f'Error: {error}']]}
                        ).execute()
                
                except Exception as e:
                    print(f"  âœ— Unexpected error: {e}")
                    total_errors += 1
                    if title_row:
                        try:
                            self.sheets_service.spreadsheets().values().update(
                                spreadsheetId=self.spreadsheet_id,
                                range=f'Uploader!L{title_row}',
                                valueInputOption='RAW',
                                body={'values': [[f'Error: {str(e)[:100]}']]}
                            ).execute()
                        except:
                            pass
            
            print("\n" + "="*60)
            print("PROCESSING COMPLETE!")
            print("="*60)
            print(f"Successfully processed: {total_success} articles")
            if total_errors > 0:
                print(f"âœ— Errors: {total_errors} articles")
            print("="*60)
        except Exception as e:
            print(f"\nERROR: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    try:
        paster = BatchPasteSections()
        paster.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")