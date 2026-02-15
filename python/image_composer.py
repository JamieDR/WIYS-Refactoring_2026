import os
import sys
import shutil
from pathlib import Path
import time

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow...")
    os.system("pip install Pillow")
    from PIL import Image

if getattr(sys, 'frozen', False):
    BASE_PATH = Path(sys.executable).parent
else:
    BASE_PATH = Path(__file__).parent.parent.parent.parent

FOR_PROCESSING_PATH = BASE_PATH / "For Processing"
RENAMED_FOLDER = BASE_PATH / "RENAMED"


def is_close_to_canvas_size(image_path, canvas_size=(1280, 720)):
    """Check if image is close enough to canvas size to skip composition"""
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            canvas_width, canvas_height = canvas_size
            
            # Image is close enough if it's within reasonable range
            close_enough = (width >= 1000 and width <= 1350 and 
                           height >= 600 and height <= 850)
            return close_enough
    except:
        return False
def get_creation_time(file_path):
    try:
        return os.path.getctime(file_path)
    except:
        return os.path.getmtime(file_path)

def get_folders_to_process():
    if not FOR_PROCESSING_PATH.exists():
        return []
    return [f for f in os.listdir(FOR_PROCESSING_PATH) 
            if os.path.isdir(os.path.join(FOR_PROCESSING_PATH, f))]


def create_composed_image(historical_image_path, background_image_path, canvas_size=(1280, 720)):
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
            
            # Tiered scaling logic
            # Tier 1: Keep original size for images that are reasonably close to canvas size
            fits_in_canvas = (hist_width <= canvas_width and hist_height <= canvas_height) or \
                           (hist_width >= 1000 and hist_width <= 1350 and hist_height >= 600 and hist_height <= 850)
            fits_in_large_area = hist_width <= 1200 and hist_height <= 700
            
            if fits_in_canvas:
                # Tier 1: Keep original size for images that already fit
                print(f"  Kept original size: {hist_width}x{hist_height}")
                
            elif fits_in_large_area:
                # Tier 2: Scale to fit 1200x700 for near-perfect fit
                scale_x = 1200 / hist_width
                scale_y = 700 / hist_height
                scale = min(scale_x, scale_y)
                
                new_width = int(hist_width * scale)
                new_height = int(hist_height * scale)
                hist_img = hist_img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                print(f"  Near-perfect scaling: {hist_width}x{hist_height} -> {new_width}x{new_height}")
                
            else:
                # Tier 3: Very oversized - scale to 90% of canvas for minimal padding
                target_width = canvas_width * 0.9  # 1152
                target_height = canvas_height * 0.9  # 648
                scale_x = target_width / hist_width
                scale_y = target_height / hist_height
                scale = min(scale_x, scale_y)
                
                new_width = int(hist_width * scale)
                new_height = int(hist_height * scale)
                hist_img = hist_img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                print(f"  Minimal padding scaling: {hist_width}x{hist_height} -> {new_width}x{new_height}")
            
            # Calculate center position for final placement
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

def process_folder(folder_path):
    folder_name = os.path.basename(folder_path)
    print(f"\nProcessing: {folder_name}")
    
    images = []
    for file in os.listdir(folder_path):
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            full_path = os.path.join(folder_path, file)
            creation_time = get_creation_time(full_path)
            images.append((full_path, creation_time, file))
    
    if len(images) < 2:
        print(f"  Error: {folder_name} needs at least 2 images (background + historical)")
        return False
    
    images.sort(key=lambda x: x[1])
    
    background_path = images[0][0]
    background_ext = os.path.splitext(images[0][2])[1]
    background_new_name = f"BACKGROUND{background_ext}"
    background_new_path = os.path.join(folder_path, background_new_name)
    
    os.rename(background_path, background_new_path)
    print(f"  Background: {images[0][2]} -> {background_new_name}")
    
    for index, (old_path, _, old_name) in enumerate(images[1:], 1):
        _, ext = os.path.splitext(old_name)
        
        if index == 1:
            new_name = f"1 intro {folder_name}{ext}"
        else:
            new_name = f"{index} {folder_name}{ext}"
        
        new_path = os.path.join(folder_path, new_name)
        
        # Check if image is close enough to canvas size to skip composition
        if is_close_to_canvas_size(old_path):
            os.rename(old_path, new_path)
            print(f"  Close to canvas size, kept as-is: {old_name} -> {new_name}")
        else:
            composed_image = create_composed_image(old_path, background_new_path)
            if composed_image:
                composed_image.save(new_path, 'JPEG', quality=95)
                os.remove(old_path)
                print(f"  Composed: {old_name} -> {new_name}")
            else:
                print(f"  Error: Failed to compose {old_name}")
                return False
    
    os.remove(background_new_path)
    print(f"  Cleaned up background file")
    
    return True

def main():
    print("Image Composer - Processing historical images with backgrounds")
    print("=" * 60)
    
    os.makedirs(RENAMED_FOLDER, exist_ok=True)
    
    folders = get_folders_to_process()
    
    if not folders:
        print("No folders found in For Processing.")
        return
    
    print(f"Found {len(folders)} folders to process:")
    for folder in folders:
        print(f"  - {folder}")
    
    response = input("\nProceed with processing? (Y/N): ").upper()
    if response != 'Y':
        print("Processing cancelled.")
        return
    
    success_count = 0
    error_count = 0
    
    for folder_name in folders:
        folder_path = FOR_PROCESSING_PATH / folder_name
        
        if process_folder(folder_path):
            success_count += 1
            
            new_folder_name = f"R_{folder_name}"
            new_folder_path = RENAMED_FOLDER / new_folder_name
            
            shutil.move(str(folder_path), str(new_folder_path))
            print(f"  -> Moved to RENAMED: {new_folder_name}")
        else:
            error_count += 1
    
    print(f"\n" + "=" * 60)
    print(f"Processing complete!")
    print(f"Success: {success_count} folders")
    print(f"Errors: {error_count} folders")

if __name__ == "__main__":
    try:
        main()
        input("\nPress Enter to exit...")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        input("Press Enter to exit...")
