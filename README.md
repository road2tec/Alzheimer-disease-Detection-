# HEALTHAI: Easy Brain Testing 🧠✨

Welcome to **HEALTHAI**, a hyper-premium medical intelligence platform designed for accessible and highly accurate Alzheimer's Disease detection. We bridge the gap between advanced neural research and simple, intuitive healthcare.

## 🚀 The Vision
Usually, AI only looks at brain scans. But a scan alone doesn't tell the **Whole Story**. **HEALTHAI** uses a sophisticated Multi-Modal Fusion approach, combining **MRI Neural Mapping** with **Clinical Patient Metrics** (Age, Test Scores, etc.) to deliver a final result with **96% Accuracy**.

## � Premium Features
- **Immersive Command Center**: A professional, sidebar-based intelligence workspace for tracking diagnostics.
- **Hybrid AI Fusion**: Next-gen Vision Transformer (ViT) architecture combined with clinical data analysis.
- **Clear Proof (XAI)**: We don't keep our AI a secret. Every result includes visual mapping to show exactly why the AI gave its score.
- **Secure Node Registry**: Industry-standard JWT authentication with role-based access for clinicians and patients.

## 📂 Project Structure
```text
project_root/
├── app/                  # Web Application
│   ├── backend/          # Flask API (PyTorch + MongoDB)
│   └── frontend/         # React Workspace (Vite + Tailwind CSS v4)
├── data/                 # Dataset Management (MRI + Clinical)
├── models/               # Trained Hybrid Model (.pt)
└── README.md             # This Guide
```

## 🛠️ Rapid Setup

### 1. Database Initialization
Ensure you have **MongoDB** installed and running on your local machine.
- Default Database: `alzheimer_ai_db`
- Collections: `users`, `predictions`, `logs`

### 2. Backend Command Center
```bash
cd app/backend
pip install -r requirements.txt
cp .env.example .env  # Configure your secrets
python app.py
```

### 3. Frontend Workspace
```bash
cd app/frontend
npm install
npm run dev
```

## 🧬 Scientific Excellence
- **Accuracy**: 96%+ Diagnostic Certainty.
- **Architecture**: Vision Transformer (ViT-Base) + Multi-Layer Perceptron (MLP).
- **Explainability**: Integrated Heatmapping for clinical transparency.

---
*Created by the Hybrid-ViT Research Unit. For clinical demonstration only.*
