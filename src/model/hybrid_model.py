import torch
import torch.nn as nn
import timm

class HybridAlzheimerModel(nn.Module):
    def __init__(self, num_classes=3, clinical_input_dim=4):
        super(HybridAlzheimerModel, self).__init__()
        
        # 1. Vision Transformer Branch
        # Load pretrained ViT
        # We set num_classes=0 to remove the head and get the embedding
        print("Loading Pretrained ViT (vit_base_patch16_224)...")
        self.vit = timm.create_model('vit_base_patch16_224', pretrained=True, num_classes=0)
        
        # ViT output dim is usually 768 for base model
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
        # Image Branch
        img_features = self.vit(img) # [Batch, 768]
        
        # Clinical Branch
        clinical_features = self.clinical_mlp(clinical_data) # [Batch, 32]
        
        # Fusion
        combined = torch.cat((img_features, clinical_features), dim=1)
        
        # Classification
        output = self.classifier(combined)
        
        return output

if __name__ == "__main__":
    # Test Model
    model = HybridAlzheimerModel()
    dummy_img = torch.randn(2, 3, 224, 224)
    dummy_clinical = torch.randn(2, 4)
    out = model(dummy_img, dummy_clinical)
    print(f"Output Shape: {out.shape}")
