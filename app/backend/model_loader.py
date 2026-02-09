import torch
import torch.nn as nn
import timm
import os

# Define the model architecture exactly as during training
class HybridAlzheimerModel(nn.Module):
    def __init__(self, num_classes=3, clinical_input_dim=4):
        super(HybridAlzheimerModel, self).__init__()
        
        # 1. Vision Transformer Branch
        self.vit = timm.create_model('vit_base_patch16_224', pretrained=True, num_classes=0)
        self.vit_dim = self.vit.num_features
        
        # 2. Clinical Data Branch (MLP)
        self.clinical_mlp = nn.Sequential(
            nn.Linear(clinical_input_dim, 16),
            nn.ReLU(),
            nn.BatchNorm1d(16),
            nn.Linear(16, 32),
            nn.ReLU(),
            nn.BatchNorm1d(32)
        )
        self.clinical_dim = 32
        
        # 3. Fusion & Classifier
        fusion_dim = self.vit_dim + self.clinical_dim
        self.classifier = nn.Sequential(
            nn.Dropout(0.2),
            nn.Linear(fusion_dim, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes)
        )
        
    def forward(self, img, clinical_data):
        img_features = self.vit(img)
        clinical_features = self.clinical_mlp(clinical_data)
        combined = torch.cat((img_features, clinical_features), dim=1)
        output = self.classifier(combined)
        return output

def load_model(model_path, device='cpu'):
    model = HybridAlzheimerModel()
    # Load state dict
    state_dict = torch.load(model_path, map_location=device)
    model.load_state_dict(state_dict)
    model.to(device)
    model.eval()
    return model
