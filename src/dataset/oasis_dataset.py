import os
import pandas as pd
import torch
from torch.utils.data import Dataset
from PIL import Image
import torchvision.transforms as transforms
from src.utils.config import PROCESSED_DIR, CLINICAL_FILE, IMG_SIZE

class OASISDataset(Dataset):
    def __init__(self, transform=None, mode='train'):
        """
        Args:
            transform: Image transforms.
            mode: 'train' or 'test' (unused currently, logic depends on splitting strategy).
        """
        self.transform = transform
        self.processed_dir = PROCESSED_DIR
        
        # Load clinical data
        self.clinical_data = pd.read_csv(CLINICAL_FILE)
        
        # Preprocess clinical data mapping
        self.prepare_clinical_data()
        
        # Collect available samples
        self.samples = []
        self._scan_samples()
        
    def prepare_clinical_data(self):
        # Clean column names
        self.clinical_data.columns = [c.strip() for c in self.clinical_data.columns]
        
        # Fill missing values if any
        self.clinical_data['CDR'] = self.clinical_data['CDR'].fillna(0) # Assume 0 if missing (Normal)
        self.clinical_data['MMSE'] = self.clinical_data['MMSE'].fillna(self.clinical_data['MMSE'].mean())
        
        # Map labels
        # 0 -> CN (CDR 0)
        # 1 -> MCI (CDR 0.5)
        # 2 -> AD (CDR >= 1)
        def map_label(cdr):
            if cdr == 0:
                return 0
            elif cdr == 0.5:
                return 1
            else:
                return 2
        
        self.clinical_data['Label_Encoded'] = self.clinical_data['CDR'].apply(map_label)
        
        # Map Gender: M -> 0, F -> 1
        self.clinical_data['M/F'] = self.clinical_data['M/F'].apply(lambda x: 0 if x == 'M' else 1)
        
    def _scan_samples(self):
        # Iterate through processed image folders and match with clinical data
        available_subjects = os.listdir(self.processed_dir)
        
        for subject_id in available_subjects:
            # Find subject in clinical data
            # Clinical data 'ID' usually matches 'OAS1_XXXX_MR1'
            # Our folder is 'OAS1_XXXX'
            
            # Try to match partial ID
            # Clinical ID example: OAS1_0001_MR1
            # Folder ID example: OAS1_0001
            
            clinical_row = self.clinical_data[self.clinical_data['ID'].str.contains(subject_id)]
            
            if len(clinical_row) == 0:
                continue
                
            clinical_row = clinical_row.iloc[0]
            label = clinical_row['Label_Encoded']
            
            # Clinical features: Age, Gender, MMSE, CDR (Wait, CDR is label... actually user said use CDR as input?
            # User requirement: "Input: Age, Gender, MMSE, CDR". 
            # Note: Using CDR as input and Label derived from CDR is data leakage if Label = f(CDR).
            # However, I will strictly follow user instructions.
            # "Label (0 = CN, 1 = MCI, 2 = AD)"
            # "Input: Age, Gender, MMSE, CDR"
            
            clinical_features = [
                clinical_row['Age'],
                clinical_row['M/F'],
                clinical_row['MMSE'],
                clinical_row['CDR']
            ]
            
            subject_path = os.path.join(self.processed_dir, subject_id)
            if not os.path.isdir(subject_path):
                continue
                
            # Get all slices for this subject
            slices = [f for f in os.listdir(subject_path) if f.endswith('.png')]
            
            for slice_file in slices:
                self.samples.append({
                    'img_path': os.path.join(subject_path, slice_file),
                    'clinical': torch.tensor(clinical_features, dtype=torch.float32),
                    'label': torch.tensor(label, dtype=torch.long)
                })

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        item = self.samples[idx]
        
        # Load Image
        image = Image.open(item['img_path']).convert('RGB') # ViT expects RGB
        
        if self.transform:
            image = self.transform(image)
        else:
            # Default transform
            default_tf = transforms.Compose([
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
            ])
            image = default_tf(image)
            
        clinical = item['clinical']
        label = item['label']
        
        return image, clinical, label
