import os
import sys
from pathlib import Path

if getattr(sys, 'frozen', False):
    BASE_PATH = Path(sys.executable).parent
else:
    BASE_PATH = Path(__file__).parent.parent.parent.parent

TITLE_LIST_PATH = BASE_PATH / "Title List.txt"
FOR_PROCESSING_PATH = Path.home() / "Desktop"  # Changed to Desktop

def read_title_list():
    try:
        with open(TITLE_LIST_PATH, 'r', encoding='utf-8') as file:
            titles = [line.strip() for line in file if line.strip() and not line.strip().startswith('#')]
        return titles
    except FileNotFoundError:
        print(f"Error: Title List.txt not found at {TITLE_LIST_PATH}")
        return []

def get_existing_folders():
    try:
        if not FOR_PROCESSING_PATH.exists():
            return []
        return [f for f in os.listdir(FOR_PROCESSING_PATH) 
                if os.path.isdir(os.path.join(FOR_PROCESSING_PATH, f))]
    except Exception as e:
        print(f"Error reading existing folders: {str(e)}")
        return []

def sanitize_folder_name(name):
    invalid_chars = '<>:"|?*\/'
    for char in invalid_chars:
        name = name.replace(char, '')
    return name.strip()

def clear_title_list():
    try:
        with open(TITLE_LIST_PATH, 'w', encoding='utf-8') as file:
            file.write("")  # Completely blank
        
        print("\nCleared Title List.txt (completely blank)")
        return True
    except Exception as e:
        print(f"Error clearing Title List.txt: {e}")
        return False

def create_folders():
    titles = read_title_list()
    if not titles:
        print("No titles found to process.")
        return
    
    # Desktop already exists, no need to create it
    existing_folders = get_existing_folders()
    created_count = 0
    skipped_count = 0
    
    print(f"Creating folders on Desktop...")
    
    for title in titles:
        folder_name = sanitize_folder_name(title)
        
        if folder_name in existing_folders:
            print(f"Skipped (exists): {folder_name}")
            skipped_count += 1
            continue
        
        try:
            folder_path = FOR_PROCESSING_PATH / folder_name
            folder_path.mkdir(exist_ok=True)
            print(f"Created: {folder_name}")
            created_count += 1
        except Exception as e:
            print(f"Error creating {folder_name}: {e}")
    
    print(f"\nSummary: Created {created_count} folders on Desktop, skipped {skipped_count}")
    
    if created_count > 0:
        if clear_title_list():
            print("Title List.txt cleared and ready for next batch")

if __name__ == "__main__":
    try:
        print("Creating folders from Title List.txt...")
        create_folders()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        input("Press Enter to exit...")