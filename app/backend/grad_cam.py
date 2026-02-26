import torch
import numpy as np
import cv2
import matplotlib.pyplot as plt
from PIL import Image
import os

def generate_attention_map(model, img_tensor, output_dir='results/grad_cam', filename='overlay.png'):
    """
    Generates an attention heatmap for ViT using the last layer's attention weights.
    """
    os.makedirs(output_dir, exist_ok=True)
    
    model.eval()
    with torch.no_grad():
        # Capture features from the last layer
        features = model.vit.forward_features(img_tensor)
        
        # The attention from CLS token (index 0) to patches (1:197)
        # We approximate this by the weights of the features themselves 
        attn_map = torch.norm(features[0, 1:, :], dim=1) # [196]
        attn_map = attn_map.view(14, 14).cpu().numpy()
        
    # Scale to 224x224
    attn_map = cv2.resize(attn_map, (224, 224))
    attn_map = (attn_map - attn_map.min()) / (attn_map.max() - attn_map.min())
    
    # Create Heatmap
    heatmap = cv2.applyColorMap(np.uint8(255 * attn_map), cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    
    # Load original image for overlay
    img_np = img_tensor.squeeze().cpu().numpy().transpose(1, 2, 0)
    # Unnormalize
    img_np = (img_np * 0.5 + 0.5) * 255
    img_np = img_np.astype(np.uint8)
    
    # Overlay
    overlay = cv2.addWeighted(img_np, 0.6, heatmap, 0.4, 0)
    
    # Save files
    overlay_path = os.path.join(output_dir, filename)
    Image.fromarray(overlay).save(overlay_path)
    
    return filename
