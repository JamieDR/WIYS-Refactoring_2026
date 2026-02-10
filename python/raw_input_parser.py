import os
import sys
import json
import re
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

SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/documents'
]

class RawInputParser:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.drive_service = None
        self.sheets_service = None
        self.docs_service = None
        self.spreadsheet_id = self.config['google_sheet_id']
        self.parent_folder_id = self.config['parent_folder_id']
        
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
        
        self.drive_service = build('drive', 'v3', credentials=self.creds)
        self.sheets_service = build('sheets', 'v4', credentials=self.creds)
        self.docs_service = build('docs', 'v1', credentials=self.creds)
        print("Authentication successful!\n")
    
    def get_rows_to_process(self):
        """Get rows with 'Raw Input Pasted' status"""
        try:
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Enhanced Drafter!A:L'
            ).execute()
            
            values = result.get('values', [])
            rows = []
            
            for i, row in enumerate(values[1:], start=2):
                while len(row) < 12:
                    row.append('')
                
                status = row[11] if len(row) > 11 else ''  # Column L
                raw_input = row[4] if len(row) > 4 else ''  # Column E
                
                if status == 'Raw Input Pasted' and raw_input:
                    rows.append({
                        'row': i,
                        'raw_input': raw_input
                    })
            
            return rows
            
        except Exception as e:
            print(f"Error reading sheet: {e}")
            return []
    
    def clean_heading(self, text):
        """Strip all heading markers and return clean text"""
        text = text.strip()
        # Remove (H1 --) and (H2 --) markers
        text = re.sub(r'\(H1\s*--\)', '', text)
        text = re.sub(r'\(H2\s*--\)', '', text)
        # Remove # and ## markers
        text = re.sub(r'^#{1,2}\s*', '', text)
        # Remove * and ** markers
        text = re.sub(r'\*+', '', text)
        # Clean up extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def is_h1(self, line):
        """Check if line is an H1 heading"""
        line = line.strip()
        # Contains (H1 --) marker
        if re.search(r'\(H1\s*--\)', line):
            return True
        # Starts with # but not ##
        if line.startswith('# ') or (line.startswith('#') and not line.startswith('##')):
            return True
        return False
    
    def is_h2(self, line):
        """Check if line is an H2 heading"""
        line = line.strip()
        # Contains (H2 --) marker
        if re.search(r'\(H2\s*--\)', line):
            return True
        # Starts with ##
        if line.startswith('## ') or line.startswith('##'):
            return True
        return False
    
    def is_state(self, line):
        """Check if line is STATE"""
        line = line.strip()
        # Remove ** markers first
        clean = re.sub(r'\*+', '', line)
        return clean.startswith('STATE:')
    
    def is_tags(self, line):
        """Check if line is TAGS"""
        line = line.strip()
        # Remove ** markers first
        clean = re.sub(r'\*+', '', line)
        return clean.startswith('TAGS:')
    
    def get_state_value(self, line):
        """Extract STATE value"""
        line = line.strip()
        clean = re.sub(r'\*+', '', line)
        if clean.startswith('STATE:'):
            return clean[6:].strip()
        return ''
    
    def get_tags_value(self, line):
        """Extract TAGS value"""
        line = line.strip()
        clean = re.sub(r'\*+', '', line)
        if clean.startswith('TAGS:'):
            return clean[5:].strip()
        return ''
    
    def parse_raw_input(self, raw_input):
        """Parse raw input into components"""
        result = {
            'title': '',
            'intro': '',
            'body': '',
            'state': '',
            'tags': ''
        }
        
        lines = raw_input.strip().split('\n')
        
        # Find title (H1)
        title_idx = -1
        for i, line in enumerate(lines):
            if self.is_h1(line):
                result['title'] = self.clean_heading(line)
                title_idx = i
                break
        
        # If no H1 marker found, use the first non-empty line as title
        if title_idx == -1:
            for i, line in enumerate(lines):
                if line.strip():
                    result['title'] = line.strip()
                    title_idx = i
                    break
        
        # Find STATE and TAGS
        state_idx = -1
        tags_idx = -1
        
        for i, line in enumerate(lines):
            if self.is_state(line):
                result['state'] = self.get_state_value(line)
                state_idx = i
            elif self.is_tags(line):
                result['tags'] = self.get_tags_value(line)
                tags_idx = i
        
        # Find body end
        body_end = len(lines)
        if state_idx > -1:
            body_end = min(body_end, state_idx)
        if tags_idx > -1:
            body_end = min(body_end, tags_idx)
        
        # Extract body
        if title_idx > -1:
            body_lines = lines[title_idx:body_end]
            result['body'] = '\n'.join(body_lines).strip()
            
            # Extract intro (first H2 section content)
            in_intro = False
            intro_lines = []
            
            for line in body_lines[1:]:
                if self.is_h2(line):
                    if in_intro:
                        break
                    in_intro = True
                    continue
                elif in_intro:
                    if line.strip():
                        intro_lines.append(line.strip())
            
            result['intro'] = ' '.join(intro_lines).strip()
        
        return result
    
    def create_google_doc(self, title, body):
        """Create a Google Doc with the article content"""
        try:
            # Create the document
            doc = self.docs_service.documents().create(body={'title': title}).execute()
            doc_id = doc.get('documentId')
            
            # Move to parent folder
            self.drive_service.files().update(
                fileId=doc_id,
                addParents=self.parent_folder_id,
                removeParents='root',
                fields='id, parents'
            ).execute()
            
            # Parse body into sections
            lines = body.split('\n')
            content_parts = []
            current_text = []
            
            for line in lines:
                # Skip ### lines
                if line.startswith('### '):
                    continue
                # Skip STATE and TAGS lines
                elif self.is_state(line) or self.is_tags(line):
                    continue
                # H1 title
                elif self.is_h1(line):
                    if current_text:
                        text = '\n'.join(current_text).strip()
                        if text:
                            content_parts.append({'text': text + '\n\n', 'style': 'CONTENT'})
                        current_text = []
                    clean_title = self.clean_heading(line)
                    content_parts.append({'text': clean_title + '\n', 'style': 'TITLE'})
                # H2 subheading
                elif self.is_h2(line):
                    if current_text:
                        text = '\n'.join(current_text).strip()
                        if text:
                            content_parts.append({'text': text + '\n\n', 'style': 'CONTENT'})
                        current_text = []
                    clean_heading = self.clean_heading(line)
                    content_parts.append({'text': '## ' + clean_heading + '\n', 'style': 'H2'})
                # Normal text
                else:
                    if line.strip():
                        current_text.append(line.strip())
            
            # Don't forget remaining text
            if current_text:
                text = '\n'.join(current_text).strip()
                if text:
                    content_parts.append({'text': text + '\n\n', 'style': 'CONTENT'})
            
            # Add footer
            content_parts.append({'text': '\n', 'style': 'CONTENT'})
            content_parts.append({'text': 'This article was created with AI assistance and human editing.\n\n', 'style': 'ITALIC'})
            content_parts.append({'text': 'Read more from this brand:\n', 'style': 'BOLD'})
            content_parts.append({'text': '- Link #1\n- Link #2\n- Link #3\n', 'style': 'CONTENT'})
            
            # Build the full text
            full_text = ''.join([p['text'] for p in content_parts])
            
            if not full_text.strip():
                return None
            
            # Insert text first
            requests = [{
                'insertText': {
                    'location': {'index': 1},
                    'text': full_text
                }
            }]
            
            # Apply paragraph styles (headings) and text styles
            current_index = 1
            for part in content_parts:
                text_length = len(part['text'])
                end_index = current_index + text_length
                
                if part['style'] == 'TITLE':
                    # Apply HEADING_1 paragraph style
                    requests.append({
                        'updateParagraphStyle': {
                            'range': {'startIndex': current_index, 'endIndex': end_index},
                            'paragraphStyle': {'namedStyleType': 'HEADING_1'},
                            'fields': 'namedStyleType'
                        }
                    })
                    # Apply Arial 20, Bold
                    requests.append({
                        'updateTextStyle': {
                            'range': {'startIndex': current_index, 'endIndex': end_index},
                            'textStyle': {
                                'bold': True,
                                'fontSize': {'magnitude': 20, 'unit': 'PT'},
                                'weightedFontFamily': {'fontFamily': 'Arial'}
                            },
                            'fields': 'bold,fontSize,weightedFontFamily'
                        }
                    })
                
                elif part['style'] == 'H2':
                    # Apply HEADING_2 paragraph style
                    requests.append({
                        'updateParagraphStyle': {
                            'range': {'startIndex': current_index, 'endIndex': end_index},
                            'paragraphStyle': {'namedStyleType': 'HEADING_2'},
                            'fields': 'namedStyleType'
                        }
                    })
                    # Apply Arial 16, Bold
                    requests.append({
                        'updateTextStyle': {
                            'range': {'startIndex': current_index, 'endIndex': end_index},
                            'textStyle': {
                                'bold': True,
                                'fontSize': {'magnitude': 16, 'unit': 'PT'},
                                'weightedFontFamily': {'fontFamily': 'Arial'}
                            },
                            'fields': 'bold,fontSize,weightedFontFamily'
                        }
                    })
                
                elif part['style'] == 'CONTENT':
                    # Apply Arial 11, Normal
                    requests.append({
                        'updateTextStyle': {
                            'range': {'startIndex': current_index, 'endIndex': end_index},
                            'textStyle': {
                                'bold': False,
                                'italic': False,
                                'fontSize': {'magnitude': 11, 'unit': 'PT'},
                                'weightedFontFamily': {'fontFamily': 'Arial'}
                            },
                            'fields': 'bold,italic,fontSize,weightedFontFamily'
                        }
                    })
                
                elif part['style'] == 'ITALIC':
                    # Apply Arial 11, Italic
                    requests.append({
                        'updateTextStyle': {
                            'range': {'startIndex': current_index, 'endIndex': end_index},
                            'textStyle': {
                                'italic': True,
                                'bold': False,
                                'fontSize': {'magnitude': 11, 'unit': 'PT'},
                                'weightedFontFamily': {'fontFamily': 'Arial'}
                            },
                            'fields': 'italic,bold,fontSize,weightedFontFamily'
                        }
                    })
                
                elif part['style'] == 'BOLD':
                    # Apply Arial 11, Bold
                    requests.append({
                        'updateTextStyle': {
                            'range': {'startIndex': current_index, 'endIndex': end_index},
                            'textStyle': {
                                'bold': True,
                                'italic': False,
                                'fontSize': {'magnitude': 11, 'unit': 'PT'},
                                'weightedFontFamily': {'fontFamily': 'Arial'}
                            },
                            'fields': 'bold,italic,fontSize,weightedFontFamily'
                        }
                    })
                
                current_index = end_index
            
            # Execute requests
            self.docs_service.documents().batchUpdate(
                documentId=doc_id,
                body={'requests': requests}
            ).execute()
            
            doc_url = f"https://docs.google.com/document/d/{doc_id}/edit"
            return doc_url
            
        except Exception as e:
            print(f"Error creating Google Doc: {e}")
            import traceback
            traceback.print_exc()
            return None
    
    def update_row(self, row_num, state, title, body, tags, doc_url):
        """Update the row with parsed data and doc URL"""
        try:
            updates = [
                {'range': f'Enhanced Drafter!G{row_num}', 'values': [[state]]},
                {'range': f'Enhanced Drafter!H{row_num}', 'values': [[title]]},
                {'range': f'Enhanced Drafter!I{row_num}', 'values': [[body]]},
                {'range': f'Enhanced Drafter!J{row_num}', 'values': [[tags]]},
                {'range': f'Enhanced Drafter!K{row_num}', 'values': [[doc_url]]},
                {'range': f'Enhanced Drafter!L{row_num}', 'values': [['Ready for Transfer']]}
            ]
            
            self.sheets_service.spreadsheets().values().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={'valueInputOption': 'RAW', 'data': updates}
            ).execute()
            
            return True
            
        except Exception as e:
            print(f"Error updating row: {e}")
            return False
    
    def process_row(self, row_data):
        """Process a single row"""
        row_num = row_data['row']
        raw_input = row_data['raw_input']
        
        print(f"\n  Parsing raw input...")
        parsed = self.parse_raw_input(raw_input)
        
        if not parsed['title']:
            print(f"  âœ— Could not find title (H1)")
            return False
        
        print(f"  Title: {parsed['title'][:50]}...")
        print(f"  State: {parsed['state']}")
        print(f"  Tags: {parsed['tags'][:50]}..." if parsed['tags'] else "  Tags: (none)")
        
        print(f"  Creating Google Doc...")
        doc_url = self.create_google_doc(parsed['title'], parsed['body'])
        
        if not doc_url:
            print(f"  âœ— Failed to create Google Doc")
            return False
        
        print(f"  Updating sheet...")
        if self.update_row(row_num, parsed['state'], parsed['title'], parsed['body'], parsed['tags'], doc_url):
            print(f"  âœ“ Success!")
            return True
        else:
            print(f"  âœ— Failed to update sheet")
            return False
    
    def main(self):
        print("="*60)
        print("  DIVIDE RAW INPUT & CREATE GDOC")
        print("="*60)
        
        try:
            self.authenticate()
            
            print("Scanning for 'Raw Input Pasted' rows...")
            rows = self.get_rows_to_process()
            
            if not rows:
                print("No rows found with 'Raw Input Pasted' status.")
                return
            
            print(f"\nFound {len(rows)} rows to process:")
            for i, row in enumerate(rows[:10], 1):
                preview = row['raw_input'][:50].replace('\n', ' ')
                print(f"  {i}. Row {row['row']}: {preview}...")
            
            if len(rows) > 10:
                print(f"  ... and {len(rows) - 10} more")
            
            confirm = input("\nProceed? (Y/N): ").upper().strip()
            
            if confirm != 'Y':
                print("Cancelled.")
                return
            
            print("\n" + "="*60)
            print("PROCESSING")
            print("="*60)
            
            success_count = 0
            error_count = 0
            
            for idx, row_data in enumerate(rows, 1):
                print(f"\n[{idx}/{len(rows)}] Row {row_data['row']}")
                
                if self.process_row(row_data):
                    success_count += 1
                else:
                    error_count += 1
            
            print("\n" + "="*60)
            print("COMPLETE!")
            print("="*60)
            print(f"âœ“ Success: {success_count}")
            if error_count > 0:
                print(f"âœ— Errors: {error_count}")
            
        except Exception as e:
            print(f"\nERROR: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    try:
        parser = RawInputParser()
        parser.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")