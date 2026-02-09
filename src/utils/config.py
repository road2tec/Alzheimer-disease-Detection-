import os

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(BASE_DIR, 'data', 'OASIS')
RAW_DIR = os.path.join(DATA_DIR, 'raw')
CLINICAL_DIR = os.path.join(DATA_DIR, 'clinical')
PROCESSED_DIR = os.path.join(DATA_DIR, 'processed', 'mri_slices')
MODEL_SAVE_PATH = os.path.join(BASE_DIR, 'models', 'hybrid_alzheimer_model.pt')
CLINICAL_FILE = os.path.join(CLINICAL_DIR, 'oasis_clinical.csv')

# Hyperparameters
IMG_SIZE = 224
BATCH_SIZE = 32
LEARNING_RATE = 1e-4
EPOCHS = 20
NUM_CLASSES = 3  # CN, MCI, AD
SEED = 42

# Column names in Clinical Data
COL_ID = 'Subject ID'
COL_LABEL = 'CDR' 
# Note: CDR 0->CN, 0.5->MCI, 1+->AD. We will map this in dataset.

# Device
import torch
DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
