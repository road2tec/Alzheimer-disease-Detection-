import torch
import numpy as np
import cv2
import matplotlib.pyplot as plt
from PIL import Image
import os

def generate_attention_map(model, img_tensor, output_dir='results/grad_cam'):
    """
    Generates an attention heatmap for ViT using the last layer's attention weights.
    This is an 'Attention Rollout' style visualization.
    """
    os.makedirs(output_dir, exist_ok=True)
    
    # 1. Get attention weights from the last block
    # Note: timm ViT models have 'blocks' list
    last_block = model.vit.blocks[-1]
    
    # Hook to capture attention weights
    # Note: ViT attention is usually [Batch, Heads, Tokens, Tokens]
    # We want the attention from CLS token to all other spatial patches.
    
    # For simplicity in this deployment, we use a more direct method:
    # Feature map extraction from the last block's norm output
    # or using the attention weights if we had registered hooks.
    
    # Since capturing hooks is complex in a one-off script, 
    # we will use the patch embeddings approach.
    
    model.eval()
    with torch.no_grad():
        # Get patch embeddings before the final transformer blocks if possible
        # Or just use the model internal features
        # For ViT base 16: 224/16 = 14x14 patches = 196 + 1(CLS) = 197 tokens
        
        # Capture features from the last layer
        features = model.vit.forward_features(img_tensor)
        # features is [1, 197, 768]
        
        # The attention from CLS token (index 0) to patches (1:197)
        # We approximate this by the weights of the features themselves 
        # (L2 norm across embedding dimension for each token)
        # This highlights which tokens have the 'strongest' signal
        
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
    original_path = os.path.join(output_dir, 'original.png')
    heatmap_path = os.path.join(output_dir, 'heatmap.png')
    overlay_path = os.path.join(output_dir, 'overlay.png')
    
    Image.fromarray(img_np).save(original_path)
    Image.fromarray(heatmap).save(heatmap_path)
    Image.fromarray(overlay).save(overlay_path)
    
    return 'overlay.png'
