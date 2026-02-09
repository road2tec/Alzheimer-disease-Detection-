import os
import glob
import numpy as np
import nibabel as nib
from PIL import Image
import sys
from tqdm import tqdm

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from src.utils.config import RAW_DIR, PROCESSED_DIR, IMG_SIZE

def normalize_intensity(img_data):
    """Normalize image intensity to 0-255 range."""
    min_val = np.min(img_data)
    max_val = np.max(img_data)
    
    if max_val - min_val == 0:
        return np.zeros(img_data.shape, dtype=np.uint8)
        
    normalized = (img_data - min_val) / (max_val - min_val)
    return (normalized * 255).astype(np.uint8)

def process_mri_data():
    """
    Explore OASIS/raw structure, find .img files, extracting middle slices.
    The OASIS structure often has disc folders -> subject folders -> PROCESSED -> MPRAGE -> T88_111 -> ...
    We will walk recursively to find .img and .hdr pairs.
    """
    print(f"Searching for MRI files in {RAW_DIR}...")
    
    # Ensure processed directory exists
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    
    # Count variables
    processed_count = 0
    error_count = 0
    
    # Walk through the raw directory
    # We are looking for files ending in .img that have a corresponding .hdr
    # Usually named like OAS1_XXXX_MR1_mpr_n4_anon_111_t88_gfc.img
    
    mri_files = []
    for root, dirs, files in os.walk(RAW_DIR):
        for file in files:
            if file.endswith('.img'):
                # Check for 'mpr' (MPRAGE) and 't88' (Atlas registered) which are usually the processed ones in OASIS
                # Adjust filter logic based on specific dataset version if needed.
                # For OASIS-1 cross-sectional, we usually want the T88 masked/registered ones.
                if 't88' in file.lower() and 'masked' in file.lower(): 
                   mri_files.append(os.path.join(root, file))
                # Fallback: if no t88 masked found, take any .img that looks like a structural scan
                elif 'analyzed' in root.lower() or 'processed' in root.lower(): # Basic heuristic
                     mri_files.append(os.path.join(root, file))

    # Remove duplicates if any (though walk shouldn't give duplicates)
    mri_files = sorted(list(set(mri_files)))
    
    print(f"Found {len(mri_files)} candidates. Starting processing...")
    
    for file_path in tqdm(mri_files):
        try:
            # Extract Subject ID from filename
            # Example: OAS1_0001_MR1_mpr_n4_anon_111_t88_masked_gfc.img -> OAS1_0001
            filename = os.path.basename(file_path)
            parts = filename.split('_')
            if len(parts) >= 2 and parts[0].startswith('OAS'):
                subject_id = f"{parts[0]}_{parts[1]}"
            else:
                # Fallback extraction
                import re
                match = re.search(r'(OAS\d_\d+)', filename)
                if match:
                    subject_id = match.group(1)
                else:
                    print(f"Skipping {filename}: Could not extract Subject ID")
                    continue
            
            # Load MRI
            img = nib.load(file_path)
            data = img.get_fdata()
            
            # Handling dimensions (usually 3D or 4D)
            # We want Axial slices (usually dimension 2 in neurological convention, but nibabel might reorient)
            # OASIS T88 is usually (176, 208, 176) roughly.
            # We will take the middle slice and neighbors.
            
            # Check dimensions
            if len(data.shape) == 4:
                data = data[:, :, :, 0] # Take first volume if 4D
            
            x, y, z = data.shape
            
            # Select middle slices (e.g., middle 3 slices) to capture ventricles/hippocampus
            mid_slice = z // 2
            slice_indices = [mid_slice - 1, mid_slice, mid_slice + 1]
            
            subject_dir = os.path.join(PROCESSED_DIR, subject_id)
            os.makedirs(subject_dir, exist_ok=True)
            
            for i, slice_idx in enumerate(slice_indices):
                # Extract slice
                # Note: Depending on orientation, might need to rotate
                # Axial is usually data[:, :, slice_idx]
                slice_img = data[:, :, slice_idx]
                
                # Analyze orientation: usually we want eyes up or similar standard
                # For now we just extract raw.
                
                # Normalize
                slice_norm = normalize_intensity(slice_img)
                
                # Resize
                # Using PIL for resizing
                img_pil = Image.fromarray(slice_norm)
                img_pil = img_pil.resize((IMG_SIZE, IMG_SIZE), Image.BILINEAR)
                
                # Save
                save_path = os.path.join(subject_dir, f"slice_{i:03d}.png")
                img_pil.save(save_path)
            
            processed_count += 1
            
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            error_count += 1

    print(f"Processing complete.")
    print(f"Processed Subjects: {processed_count}")
    print(f"Errors: {error_count}")

if __name__ == "__main__":
    process_mri_data()
