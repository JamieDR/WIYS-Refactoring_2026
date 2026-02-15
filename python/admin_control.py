import os
import sys
import subprocess
from pathlib import Path

if getattr(sys, 'frozen', False):
    SCRIPT_PATH = Path(sys.executable).parent
else:
    SCRIPT_PATH = Path(__file__).parent

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def show_menu():
    clear_screen()
    print("="*50)
    print("  ARTICLE AUTOMATION")
    print("="*50)
    print()
    print()
    print("  1. Generate Titles")
    print()
    print()
    print("  -- ARTICLE DRAFTING --")
    print()
    print("  2. Divide Raw Input & Create GDoc")
    print()
    print("  3. Transfer Drafts to Article Tracker")
    print()
    print()
    print("  -- UPLOADER PREP --")
    print()
    print("  4. Create New Rows")
    print()
    print("  5. Paste Content")
    print()
    print("  6. Delete Successful Uploads")
    print()
    print()
    print("  -- IMAGE EDITING --")
    print()
    print("  7. Create Desktop Folders")
    print()
    print("  8. Edit + Upload Images")
    print()
    print()
    print("  0. Exit")
    print()
    print("="*50)

def run_script(script_name, display_name):
    clear_screen()
    print("="*50)
    print(f"  {display_name}")
    print("="*50)
    print()
    
    script_path = SCRIPT_PATH / script_name
    
    if not script_path.exists():
        print(f"ERROR: {script_name} not found!")
        input("\nPress Enter to continue...")
        return
    
    try:
        result = subprocess.run(
            [sys.executable, str(script_path)],
            cwd=str(SCRIPT_PATH)
        )
        
        if result.returncode != 0:
            print(f"\nScript exited with error code: {result.returncode}")
        
    except Exception as e:
        print(f"\nERROR: {e}")
    
    input("\nPress Enter to continue...")

def main():
    scripts = {
        '1': ('title_generator.py', 'Generate Titles'),
        '2': ('raw_input_parser.py', 'Divide Raw Input & Create GDoc'),
        '3': ('transfer_to_tracker.py', 'Transfer Drafts to Article Tracker'),
        '4': ('batch_article_processor.py', 'Create New Rows'),
        '5': ('batch_paste_sections.py', 'Paste Content'),
        '6': ('delete_successful_uploads.py', 'Delete Successful Uploads'),
        '7': ('desk_folder_creator.py', 'Create Desktop Folders'),
        '8': ('desk_composer_uploader.py', 'Edit + Upload Images')
    }
    
    while True:
        show_menu()
        choice = input("Choose (0-8): ").strip()
        
        if choice == '0':
            clear_screen()
            print("\nGoodbye!\n")
            sys.exit(0)
        
        elif choice in scripts:
            script_name, display_name = scripts[choice]
            run_script(script_name, display_name)
        
        else:
            input("\nInvalid choice. Press Enter to try again...")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        clear_screen()
        print("\n\nGoodbye!\n")
        sys.exit(0)
    except Exception as e:
        print(f"\nERROR: {e}")
        import traceback
        traceback.print_exc()
        input("\nPress Enter to exit...")