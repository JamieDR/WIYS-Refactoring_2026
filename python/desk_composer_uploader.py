import os
import sys
import json
import shutil
import time
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow...")
    os.system("pip install Pillow")
    from PIL import Image

try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload
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
DONE_PATH = Path(r"C:\Users\Windows\Desktop\HistoryProcessor\RENAMED\DONE")

SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
]

class DeskComposerUploader:
    def __init__(self):
        self.config = self.load_config()
        self.creds = None
        self.drive_service = None
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
        
        self.drive_service = build('drive', 'v3', credentials=self.creds)
        self.sheets_service = build('sheets', 'v4', credentials=self.creds)
        print("Authentication successful!\n")
    
    def get_articles_with_desk_folders(self):
        """Get articles with 'Desk Folder Created' status from Article Status Tracker"""
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
                drive_folder_url = row[5] if len(row) > 5 else ''
                status = row[6] if len(row) > 6 else ''
                
                if status == 'Desk Folder Created' and article_title:
                    folder_id = self.extract_folder_id(drive_folder_url)
                    articles.append({
                        'row': i,
                        'title': article_title.strip(),
                        'folder_id': folder_id
                    })
            
            return articles
            
        except Exception as e:
            print(f"Error reading Article Status Tracker: {e}")
            return []
    
    def get_folders_to_process(self, articles):
        """Get Desktop folders that match articles with 'Desk Folder Created' status"""
        folders = []
        
        for article in articles:
            folder_path = DESKTOP_PATH / article['title']
            
            if folder_path.exists() and folder_path.is_dir():
                # Check if folder has images
                has_images = any(
                    f.suffix.lower() in ('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp')
                    for f in folder_path.iterdir()
                    if f.is_file()
                )
                if has_images:
                    folders.append({
                        'path': folder_path,
                        'article': article
                    })
        
        return folders
    
    # ===== COMPOSITION FUNCTIONS =====
    
    def get_creation_time(self, file_path):
        try:
            return os.path.getctime(file_path)
        except:
            return os.path.getmtime(file_path)
    
    def is_close_to_canvas_size(self, image_path, canvas_size=(1280, 720)):
        try:
            with Image.open(image_path) as img:
                width, height = img.size
                canvas_width, canvas_height = canvas_size
                
                close_enough = (width >= 1000 and width <= 1350 and 
                               height >= 600 and height <= 850)
                return close_enough
        except:
            return False
    
    def create_composed_image(self, historical_image_path, background_image_path, canvas_size=(1280, 720)):
        try:
            with Image.open(background_image_path) as bg:
                background = bg.resize(canvas_size, Image.Resampling.LANCZOS)
            
            overlay = Image.new('RGBA', canvas_size, (0, 0, 0, int(255 * 0.9)))
            
            if background.mode != 'RGBA':
                background = background.convert('RGBA')
            canvas = Image.alpha_composite(background, overlay)
            
            with Image.open(historical_image_path) as hist_img:
                hist_width, hist_height = hist_img.size
                canvas_width, canvas_height = canvas_size
                
                fits_in_canvas = (hist_width <= canvas_width and hist_height <= canvas_height) or \
                               (hist_width >= 1000 and hist_width <= 1350 and hist_height >= 600 and hist_height <= 850)
                fits_in_large_area = hist_width <= 1200 and hist_height <= 700
                
                if fits_in_canvas:
                    print(f"  Kept original size: {hist_width}x{hist_height}")
                    
                elif fits_in_large_area:
                    scale_x = 1200 / hist_width
                    scale_y = 700 / hist_height
                    scale = min(scale_x, scale_y)
                    
                    new_width = int(hist_width * scale)
                    new_height = int(hist_height * scale)
                    hist_img = hist_img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    print(f"  Near-perfect scaling: {hist_width}x{hist_height} -> {new_width}x{new_height}")
                    
                else:
                    target_width = canvas_width * 0.9
                    target_height = canvas_height * 0.9
                    scale_x = target_width / hist_width
                    scale_y = target_height / hist_height
                    scale = min(scale_x, scale_y)
                    
                    new_width = int(hist_width * scale)
                    new_height = int(hist_height * scale)
                    hist_img = hist_img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    print(f"  Minimal padding scaling: {hist_width}x{hist_height} -> {new_width}x{new_height}")
                
                hist_width, hist_height = hist_img.size
                x = (canvas_width - hist_width) // 2
                y = (canvas_height - hist_height) // 2
                
                if hist_img.mode != 'RGBA':
                    hist_img = hist_img.convert('RGBA')
                
                canvas.paste(hist_img, (x, y), hist_img)
            
            return canvas.convert('RGB')
            
        except Exception as e:
            print(f"Error creating composed image: {e}")
            return None
    
    def compose_folder(self, folder_path):
        folder_name = folder_path.name
        print(f"\nComposing: {folder_name}")
        
        images = []
        for file in folder_path.iterdir():
            if file.suffix.lower() in ('.png', '.jpg', '.jpeg', '.gif', '.bmp'):
                creation_time = self.get_creation_time(file)
                images.append((file, creation_time))
        
        if len(images) < 2:
            print(f"  Error: Needs at least 2 images (background + historical)")
            return False
        
        images.sort(key=lambda x: x[1])
        
        background_path = images[0][0]
        background_ext = background_path.suffix
        background_new_name = f"BACKGROUND{background_ext}"
        background_new_path = folder_path / background_new_name
        
        os.rename(background_path, background_new_path)
        print(f"  Background: {background_path.name} -> {background_new_name}")
        
        for index, (old_path, _) in enumerate(images[1:], 1):
            ext = old_path.suffix
            
            if index == 1:
                new_name = f"1 intro {folder_name}{ext}"
            else:
                new_name = f"{index} {folder_name}{ext}"
            
            new_path = folder_path / new_name
            
            if self.is_close_to_canvas_size(old_path):
                os.rename(old_path, new_path)
                print(f"  Close to canvas size, kept as-is: {old_path.name} -> {new_name}")
            else:
                composed_image = self.create_composed_image(old_path, background_new_path)
                if composed_image:
                    composed_image.save(new_path, 'JPEG', quality=95)
                    os.remove(old_path)
                    print(f"  Composed: {old_path.name} -> {new_name}")
                else:
                    print(f"  Error: Failed to compose {old_path.name}")
                    return False
        
        os.remove(background_new_path)
        print(f"  Cleaned up background file")
        
        return True
    
    # ===== UPLOAD FUNCTIONS =====
    
    def extract_folder_id(self, url):
        if not url or '/folders/' not in url:
            return None
        return url.split('/folders/')[1].split('?')[0]
    
    def get_sheet_id(self, sheet_name):
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
    
    def find_article_in_uploader(self, article_title):
        try:
            result = self.sheets_service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Uploader!A:M'
            ).execute()
            
            values = result.get('values', [])
            merges = self.get_merged_ranges()
            
            merge_map = {}
            for merge in merges:
                start_row = merge['startRowIndex'] + 1
                start_col = merge['startColumnIndex']
                num_columns = merge['endColumnIndex'] - start_col
                
                if start_col == 0:
                    merge_map[start_row] = {'num_columns': num_columns}
            
            for row_num in range(1, len(values) + 1):
                if row_num in merge_map and merge_map[row_num]['num_columns'] == 11:
                    if row_num - 1 < len(values) and values[row_num - 1]:
                        title = values[row_num - 1][0] if values[row_num - 1] else ''
                        if title.strip() == article_title:
                            return row_num
            
            return None
            
        except Exception as e:
            print(f"  Error searching Uploader sheet: {e}")
            return None
    
    def get_existing_files_in_drive(self, drive_folder_id):
        """Get list of files already in Drive folder"""
        try:
            query = f"'{drive_folder_id}' in parents and trashed=false"
            results = self.drive_service.files().list(
                q=query,
                fields='files(name)'
            ).execute()
            
            files = results.get('files', [])
            return [f['name'] for f in files]
            
        except Exception as e:
            print(f"  Error checking Drive folder: {e}")
            return None
    
    def upload_to_drive(self, folder_path, drive_folder_id, is_retry=False):
        if not drive_folder_id:
            error_msg = "Drive folder ID not found"
            print(f"  {error_msg}")
            return False, error_msg
        
        images = []
        extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp')
        
        for file in folder_path.iterdir():
            if file.suffix.lower() in extensions:
                images.append(file)
        
        images.sort(key=lambda x: x.name)
        
        # If retry, check what's already uploaded
        existing_files = []
        if is_retry:
            print("  Checking for already uploaded files...")
            existing_files = self.get_existing_files_in_drive(drive_folder_id)
            if existing_files is None:
                error_msg = "Could not check Drive folder for existing files"
                return False, error_msg
            
            if existing_files:
                print(f"  Found {len(existing_files)} files already uploaded")
                images = [img for img in images if img.name not in existing_files]
                print(f"  Will upload {len(images)} remaining files")
        
        if not images:
            print("  All files already uploaded!")
            return True, None
        
        uploaded_count = 0
        failed_image = None
        error_details = None
        
        for image_path in images:
            # Retry logic: try up to 3 times
            max_retries = 3
            retry_count = 0
            uploaded = False
            
            while retry_count < max_retries and not uploaded:
                try:
                    file_metadata = {
                        'name': image_path.name,
                        'parents': [drive_folder_id]
                    }
                    
                    media = MediaFileUpload(str(image_path))
                    
                    self.drive_service.files().create(
                        body=file_metadata,
                        media_body=media,
                        fields='id'
                    ).execute()
                    
                    print(f"    Uploaded: {image_path.name}")
                    uploaded_count += 1
                    uploaded = True
                    
                except Exception as e:
                    retry_count += 1
                    if retry_count < max_retries:
                        print(f"    Retry {retry_count}/{max_retries} for {image_path.name}...")
                        time.sleep(5)
                    else:
                        failed_image = image_path.name
                        error_details = str(e)
                        print(f"    Failed after {max_retries} attempts: {failed_image} - {error_details}")
                        error_msg = f"Upload failed at {failed_image} ({uploaded_count}/{len(images)} uploaded): {error_details}"
                        return False, error_msg
        
        return uploaded_count == len(images), None
    
    def update_statuses(self, tracker_row, uploader_row, status, error_details=None):
        try:
            value_updates = []
            
            # Update Article Status Tracker Column G
            value_updates.append({
                'range': f'Article Status Tracker!G{tracker_row}',
                'values': [[status]]
            })
            
            # Update Article Status Tracker Column H with error details
            if error_details:
                value_updates.append({
                    'range': f'Article Status Tracker!H{tracker_row}',
                    'values': [[error_details]]
                })
            
            # Update Uploader sheet if row found
            if uploader_row:
                value_updates.append({
                    'range': f'Uploader!L{uploader_row}',
                    'values': [[status]]
                })
            
            if value_updates:
                self.sheets_service.spreadsheets().values().batchUpdate(
                    spreadsheetId=self.spreadsheet_id,
                    body={
                        'valueInputOption': 'RAW',
                        'data': value_updates
                    }
                ).execute()
                
                return True
            
            return False
            
        except Exception as e:
            print(f"  Error updating statuses: {e}")
            return False
    
    def process_upload(self, folder_data, is_retry=False):
        folder_path = folder_data['path']
        article = folder_data['article']
        folder_name = folder_path.name
        
        print(f"\n{'='*60}")
        print(f"Processing: {folder_name}")
        print(f"{'='*60}")
        
        # Find article in uploader
        print("  Searching Uploader sheet...")
        uploader_row = self.find_article_in_uploader(folder_name)
        
        if uploader_row:
            print(f"  Found at row {uploader_row}")
        else:
            print("  Warning: Not found in Uploader sheet")
        
        # Upload to Drive
        print("  Uploading to Google Drive...")
        success, error_msg = self.upload_to_drive(folder_path, article['folder_id'], is_retry)
        
        if success:
            print("  Upload successful!")
            
            # Update statuses
            print("  Updating statuses...")
            if self.update_statuses(article['row'], uploader_row, "Desk Images Uploaded"):
                print("  Statuses updated")
                
                # Move to DONE
                os.makedirs(DONE_PATH, exist_ok=True)
                
                done_folder_path = DONE_PATH / folder_name
                counter = 1
                original_name = folder_name
                while done_folder_path.exists():
                    done_folder_path = DONE_PATH / f"{original_name}_{counter}"
                    counter += 1
                
                shutil.move(str(folder_path), str(done_folder_path))
                print(f"  Moved to DONE: {done_folder_path.name}")
                
                return True, None
        else:
            print("  Upload failed")
            self.update_statuses(article['row'], uploader_row, "Failed Desk Upload", error_msg)
            return False, error_msg
    
    def main(self):
        print("="*60)
        print("DESK COMPOSER + UPLOADER")
        print("="*60)
        
        try:
            self.authenticate()
            
            # Get articles with 'Desk Folder Created' status
            print("\nScanning Article Status Tracker for 'Desk Folder Created' status...")
            articles = self.get_articles_with_desk_folders()
            
            if not articles:
                print("No articles found with 'Desk Folder Created' status.")
                return
            
            print(f"Found {len(articles)} articles with 'Desk Folder Created' status")
            
            # Get matching folders on Desktop
            print("\nLooking for matching folders on Desktop...")
            folders = self.get_folders_to_process(articles)
            
            if not folders:
                print("No matching folders with images found on Desktop.")
                return
            
            print(f"\nFound {len(folders)} folders to process:")
            for i, folder_data in enumerate(folders[:10], 1):
                print(f"  {i}. {folder_data['path'].name}")
            if len(folders) > 10:
                print(f"  ... and {len(folders) - 10} more")
            
            # PHASE 1: COMPOSITION
            print("\n" + "="*60)
            print("PHASE 1: IMAGE COMPOSITION")
            print("="*60)
            
            confirm = input("\nProceed with composition? (Y/N): ").upper().strip()
            
            if confirm != 'Y':
                print("Composition cancelled. Returning to admin control.")
                return
            
            print("\nStarting composition...")
            
            composed_count = 0
            composition_errors = 0
            
            for idx, folder_data in enumerate(folders, 1):
                print(f"\n[{idx}/{len(folders)}]")
                if self.compose_folder(folder_data['path']):
                    composed_count += 1
                else:
                    composition_errors += 1
            
            print("\n" + "="*60)
            print("COMPOSITION COMPLETE")
            print("="*60)
            print(f"Successfully composed: {composed_count} folders")
            print(f"Errors: {composition_errors} folders")
            
            if composed_count == 0:
                print("\nNo folders were successfully composed. Cannot proceed to upload.")
                return
            
            # PHASE 2: UPLOAD
            print("\n" + "="*60)
            print("PHASE 2: UPLOAD TO GOOGLE DRIVE")
            print("="*60)
            
            confirm = input("\nProceed with upload? (Y/N): ").upper().strip()
            
            if confirm != 'Y':
                print("Upload cancelled.")
                return
            
            print("\nStarting upload (sequential with 30s delays)...")
            
            success_count = 0
            failed_folders = []
            
            for idx, folder_data in enumerate(folders, 1):
                print(f"\n[{idx}/{len(folders)}]")
                
                success, error_msg = self.process_upload(folder_data)
                if success:
                    success_count += 1
                else:
                    failed_folders.append({
                        'data': folder_data,
                        'error': error_msg
                    })
                
                # Add delay between uploads (except after last one)
                if idx < len(folders):
                    print(f"\n  Waiting 30 seconds before next folder...")
                    time.sleep(30)
            
            print("\n" + "="*60)
            print("UPLOAD COMPLETE")
            print("="*60)
            print(f"Successfully uploaded: {success_count} folders")
            print(f"Failed: {len(failed_folders)} folders")
            
            # RETRY LOGIC
            if failed_folders:
                print("\n" + "="*60)
                print("FAILED FOLDERS")
                print("="*60)
                for i, failed in enumerate(failed_folders, 1):
                    print(f"  {i}. {failed['data']['path'].name}")
                    print(f"     Error: {failed['error']}")
                
                retry = input(f"\nRetry {len(failed_folders)} failed folders? (Y/N): ").upper().strip()
                
                if retry == 'Y':
                    print("\n" + "="*60)
                    print("RETRYING FAILED FOLDERS")
                    print("="*60)
                    print("(No delays between retries)")
                    
                    retry_success = 0
                    still_failed = []
                    
                    for idx, failed in enumerate(failed_folders, 1):
                        print(f"\n[Retry {idx}/{len(failed_folders)}]")
                        
                        success, error_msg = self.process_upload(failed['data'], is_retry=True)
                        if success:
                            retry_success += 1
                        else:
                            still_failed.append(failed['data']['path'].name)
                    
                    print("\n" + "="*60)
                    print("RETRY COMPLETE")
                    print("="*60)
                    print(f"Successfully uploaded on retry: {retry_success} folders")
                    if still_failed:
                        print(f"Still failed: {len(still_failed)} folders")
                        for folder_name in still_failed:
                            print(f"  - {folder_name}")
            
        except Exception as e:
            print(f"\nERROR: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    try:
        processor = DeskComposerUploader()
        processor.main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
        input("Press Enter to exit...")