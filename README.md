# 🧬 Genome Assembly Error Detection: Detecting Sequence Discrepancies using Deep Learning and Machine Learning

Genome assembly is a critical step in modern bioinformatics, but even high-quality assemblies may contain errors due to limitations in sequencing technology, alignment algorithms, or biological complexity. This project presents an advanced, hybrid approach to detect discrepancies between aligned DNA sequences using a combination of deep learning architectures and traditional machine learning models.

---

## 🧪 Objective

The goal of this project is to build a robust classification system that identifies whether two DNA sequences (original vs. aligned) are **identical** or **differ**, thereby flagging potential genome assembly errors. We use both deep learning (CNN, Bi-LSTM) and classical ML (Logistic Regression, Random Forest) models for this task, comparing their performance across multiple metrics.

---

## 🧠 Key Features

### ✅ Automated Dataset Extraction
- Reads and extracts DNA alignment datasets from a ZIP archive.
- Handles nested folders and dynamically locates CSV/TXT files based on expected patterns (e.g., `csv3testdata.csv`).

### ✅ Advanced Preprocessing Pipeline
- Cleans and validates sequence data.
- Handles missing values, non-standard characters, and inconsistent formatting.
- Pads/truncates sequences to ensure fixed-length inputs.
- Performs one-hot encoding based on dynamic character vocabularies.

### ✅ Binary Classification Labeling
- A binary label (`label_encoded`) is derived by comparing `sequence_a` and `sequence_b`.
- If they are different, the label is `1` (error); if identical, the label is `0`.

### ✅ Deep Learning Architectures
- **Convolutional Neural Network (CNN):** Detects localized patterns between sequence pairs.
- **Bi-Directional LSTM:** Captures sequential dependencies and forward–backward relationships in DNA sequences.
- Trained with `EarlyStopping`, `ModelCheckpoint`, and `validation_split` for regularization.

### ✅ Traditional Machine Learning
- Extracts **k-mer features** using `CountVectorizer` for n-gram style analysis.
- Trains models such as **Logistic Regression** and **Random Forest** on engineered k-mer features.

### ✅ Comprehensive Model Evaluation
Each model is evaluated on a hold-out test set using:
- Accuracy  
- Precision  
- Recall  
- F1 Score  
- ROC-AUC  
- PR-AUC (Precision-Recall Curve)  
- MCC (Matthews Correlation Coefficient)  
- Log Loss  

### ✅ Visualizations
- Confusion Matrices  
- ROC and PR Curves  
- Bar charts comparing model metrics  
- Embedding space projections using **t-SNE**, **PCA**, and **UMAP**

### ✅ Cross-Validation Support
- Includes **Stratified K-Fold Cross-Validation** to ensure generalizable results and analyze performance consistency.

---

## 📂 Dataset

- **Source:** Manually uploaded ZIP dataset (e.g., from Kaggle)
- **Folder structure:** `ALLdataset/dataset3T/csv3testdata.csv`
- **Input:** Two DNA sequences per sample
- **Output:** Binary label indicating sequence match/mismatch

---

## 🔍 Use Cases

- **Genome Assembly Quality Control:** Flag misaligned or inconsistent sequences  
- **Bioinformatics Pipelines:** Integrate into preprocessing tools for sequence validation  
- **Educational Tool:** Demonstrates applied deep learning on biological sequences  
- **Benchmarking:** Compare performance of DL vs. classical ML models on biological text data

---

## 📊 Results

Both CNN and Bi-LSTM models performed effectively in detecting sequence discrepancies, with the Bi-LSTM generally achieving higher F1 and PR-AUC scores. The traditional ML models with k-mer features also offered respectable performance and much faster training times, showing that simpler methods can be valuable when data is limited or speed is prioritized.

---

## 💡 Future Work

- Use transformer-based models like **DNABERT** or **Bioformer** for improved sequence understanding  
- Incorporate **error localization** instead of binary classification  
- Build an interactive **web interface or REST API** for live sequence evaluation  
- Expand dataset to include **insertions, deletions, and SNPs** explicitly

---
