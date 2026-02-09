import torch
import torchvision.transforms as transforms
from PIL import Image
import numpy as np

def preprocess_image(image_path, img_size=224):
    """Load and transform image for model input."""
    image = Image.open(image_path).convert('RGB')
    transform = transforms.Compose([
        transforms.Resize((img_size, img_size)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
    ])
    return transform(image).unsqueeze(0) # [1, 3, 224, 224]

def preprocess_clinical(data):
    """
    Normalize clinical features.
    Expected dict: {'age': int, 'gender': str, 'mmse': float, 'cdr': float}
    """
    age = float(data.get('age', 0))
    gender = 0 if data.get('gender', 'M').upper() == 'M' else 1
    mmse = float(data.get('mmse', 0))
    cdr = float(data.get('cdr', 0))
    
    # In a real medical app, we would use the exact same mean/std from training
    # For this implementation, we simply return the tensor
    features = [age, gender, mmse, cdr]
    return torch.tensor([features], dtype=torch.float32)
