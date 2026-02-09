import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, random_split
from tqdm import tqdm
import sys

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from src.dataset.oasis_dataset import OASISDataset
from src.model.hybrid_model import HybridAlzheimerModel
from src.utils.config import BATCH_SIZE, LEARNING_RATE, EPOCHS, DEVICE, MODEL_SAVE_PATH

import matplotlib
matplotlib.use('Agg') # Use non-interactive backend
import matplotlib.pyplot as plt
import pandas as pd

RESULTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'results')
os.makedirs(RESULTS_DIR, exist_ok=True)
HISTORY_PATH = os.path.join(RESULTS_DIR, 'training_history.csv')
PLOT_PATH = os.path.join(RESULTS_DIR, 'training_curves.png')

def plot_history(history):
    print(f"Generating training curves at {PLOT_PATH}...")
    plt.figure(figsize=(12, 5))
    
    # Loss Plot
    plt.subplot(1, 2, 1)
    plt.plot(history['train_loss'], label='Train Loss')
    plt.plot(history['val_loss'], label='Val Loss')
    plt.title('Loss Curves')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    
    # Accuracy Plot
    plt.subplot(1, 2, 2)
    plt.plot(history['train_acc'], label='Train Acc')
    plt.plot(history['val_acc'], label='Val Acc')
    plt.title('Accuracy Curves')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy (%)')
    plt.legend()
    
    plt.tight_layout()
    plt.savefig(PLOT_PATH)
    plt.close()

def train():
    print(f"Using Device: {DEVICE}")
    
    # 1. Prepare Dataset
    print("Initializing Dataset (this may take a moment to scan files)...")
    full_dataset = OASISDataset()
    
    if len(full_dataset) == 0:
        print("ERROR: No samples found! Please run preprocessing first.")
        return

    print(f"Total Samples: {len(full_dataset)}")
    
    # Split Train/Val (80/20)
    train_size = int(0.8 * len(full_dataset))
    val_size = len(full_dataset) - train_size
    train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0) # Windows workers=0 safe
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)
    
    # 2. Initialize Model
    model = HybridAlzheimerModel().to(DEVICE)
    
    # 3. Loss and Optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.AdamW(model.parameters(), lr=LEARNING_RATE)
    
    # 4. Training Loop
    best_val_loss = float('inf')
    history = {
        'train_loss': [], 'train_acc': [],
        'val_loss': [], 'val_acc': []
    }
    
    for epoch in range(EPOCHS):
        print(f"\nEpoch {epoch+1}/{EPOCHS}")
        
        # --- TRAINING ---
        model.train()
        train_loss = 0.0
        correct = 0
        total = 0
        
        loop = tqdm(train_loader, desc="Training", leave=False)
        for images, clinical, labels in loop:
            images = images.to(DEVICE)
            clinical = clinical.to(DEVICE)
            labels = labels.to(DEVICE)
            
            optimizer.zero_grad()
            
            outputs = model(images, clinical)
            loss = criterion(outputs, labels)
            
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            
            loop.set_postfix(loss=loss.item())
            
        avg_train_loss = train_loss / len(train_loader)
        train_acc = 100 * correct / total
        print(f"Train Loss: {avg_train_loss:.4f} | Train Acc: {train_acc:.2f}%")
        
        # --- VALIDATION ---
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for images, clinical, labels in val_loader:
                images = images.to(DEVICE)
                clinical = clinical.to(DEVICE)
                labels = labels.to(DEVICE)
                
                outputs = model(images, clinical)
                loss = criterion(outputs, labels)
                
                val_loss += loss.item()
                _, predicted = torch.max(outputs.data, 1)
                val_total += labels.size(0)
                val_correct += (predicted == labels).sum().item()
        
        avg_val_loss = val_loss / len(val_loader)
        val_acc = 100 * val_correct / val_total
        print(f"Val Loss: {avg_val_loss:.4f} | Val Acc: {val_acc:.2f}%")
        
        # Update History
        history['train_loss'].append(avg_train_loss)
        history['train_acc'].append(train_acc)
        history['val_loss'].append(avg_val_loss)
        history['val_acc'].append(val_acc)
        
        # Save History to CSV after each epoch
        pd.DataFrame(history).to_csv(HISTORY_PATH, index=False)
        plot_history(history)
        
        # Save Best Model
        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
            torch.save(model.state_dict(), MODEL_SAVE_PATH)
            print(f"Saved Best Model to {MODEL_SAVE_PATH}")

    print(f"Training Complete! Curves saved to {PLOT_PATH}")

if __name__ == "__main__":
    train()
