---

# 🩻 X-Ray Image Classification

![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
![Build Passing](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-proprietary-lightgrey.svg)

A full-stack web application that allows users to upload X-ray images and receive **real-time AI-powered diagnostic predictions** (e.g., detecting pneumonia from chest X-rays). The backend uses a trained deep learning model (e.g., VGG16), while the frontend provides a clean, responsive interface.

---

## 📑 Table of Contents

* [✨ Features](#-features)
* [📸 Demo](#-demo)
* [🧰 Installation](#-installation)
* [🚀 Usage](#-usage)
* [📁 Project Structure](#-project-structure)
* [🧠 Model and Dataset](#-model-and-dataset)
* [📡 API Endpoints](#-api-endpoints)
* [🧱 Technologies Used](#-technologies-used)
* [🌟 Future Enhancements](#-future-enhancements)
* [🪪 License](#-license)
* [📬 Contact](#-contact)

---

## ✨ Features

* 🖼️ **Image Upload:** Upload chest X-ray images via browser.
* 🧠 **Deep Learning Classification:** Backend model classifies X-ray as "Pneumonia" or "Normal".
* 🔍 **Prediction Confidence:** Displays model confidence score alongside predictions.
* ⚡ **Fast & Lightweight:** Runs on Flask API with minimal latency.
* 🎨 **Clean UI:** Interactive frontend built using HTML, CSS, and JS.

---

## 📸 Demo

<img width="1675" height="895" alt="Screenshot 2025-07-15 172833" src="https://github.com/user-attachments/assets/65a848b3-e188-4ce1-8331-0d766d718182" />
<img width="1686" height="887" alt="Screenshot 2025-07-15 172942" src="https://github.com/user-attachments/assets/27b83e14-4669-4563-8afa-dda1bc6187f4" />

---

## 🧰 Installation

### ⚙️ Backend

```bash
git clone https://github.com/rasika1205/Xray-Image-Classification.git
cd Xray-Image-Classification/backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Ensure the following files are in `backend/`:

* `pneumonia_vgg16_model.h5` — Trained model file
* `app.py` — Flask server

### 🖥️ Frontend

```bash
cd ../frontend
npm install
npm start
```

Frontend will run on: [http://localhost:3000](http://localhost:3000)
Backend will run on: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 🚀 Usage

### Option 1: Web Interface

* Visit [http://localhost:3000](http://localhost:3000)
* Upload an X-ray image (JPG/PNG)
* Receive prediction, confidence score, and summary

### Option 2: API Endpoint

```bash
curl -X POST -F 'file=@path_to_image.jpg' http://127.0.0.1:5000/predict
```

Sample Response:

```json
{
  "prediction": "Pneumonia",
  "confidence": 0.94
}
```

---

## 📁 Project Structure

```
Xray-Image-Classification/
├── backend/
│   ├── app.py                     # Flask backend
│   ├── requirements.txt           # Dependencies
│   ├── pneumonia_vgg16_model.h5   # Trained model (NOT pushed to GitHub)
│
├── frontend/
│   ├── public/                    # Public static assets
│   ├── src/                       # React components and logic
│   ├── package.json               # React project config
│
├── .gitignore
├── README.md
```

---

## 🧠 Model Development & Training Process

The model training process for this X-Ray Image Classification system involved multiple phases of experimentation, beginning with custom CNN architectures and culminating in state-of-the-art transfer learning with VGG16.

### 🔹 1. CNN from Scratch

* Initially, a **basic Convolutional Neural Network (CNN)** with **3 layers** was built to classify images into `NORMAL` and `PNEUMONIA`.
* Achieved:

  * ✅ **Validation Accuracy**: \~93.75%
  * ✅ **Test Accuracy**: \~85.89%

### 🔹 2. Hyperparameter Optimization (HPO)

* A deeper CNN model with **4 convolutional layers** and varied dropout rates was tested.
* Goal: Improve generalization through parameter tuning.
* Result:

  * ✅ **Validation Accuracy**: 100% (but likely overfitting)
  * ⚠️ **Test Accuracy**: \~84.29%

### 🔹 3. Transfer Learning with VGG16

* Adopted **VGG16** from Keras applications with **ImageNet weights**.
* The base layers were frozen, and custom dense layers were added for binary classification.
* Result:

  * ✅ **Validation Accuracy**: \~92.47%
  * ✅ **Test Accuracy**: \~92.47%

### 🔹 4. Fine-Tuned VGG16

* The VGG16 base was partially **unfrozen and fine-tuned** for domain-specific improvement.
* This boosted performance while increasing training time.
* Final result:

  * ✅ **Validation Accuracy**: **100%**
  * ✅ **Test Accuracy**: **92.4%**

---

### 📈 Model Comparison Summary

| Model                | Validation Accuracy | Test Accuracy | Notes               |
| -------------------- | ------------------- | ------------- | ------------------- |
| CNN (3 Layers)       | \~93.75%            | \~85.89%      | Strong baseline     |
| CNN + HPO (4 Layers) | 100%                | \~84.29%      | Likely overfitting  |
| VGG16 (Frozen)       | \~92.47%            | \~92.47%      | Best generalization |
| VGG16 (Fine-Tuned)   | 100%                | 92.4%         | Best overall        |

---

### 🧪 Dataset Used

* Source: Chest X-Ray Images (Kaggle)
* Classes: `NORMAL` and `PNEUMONIA`
* Input images resized to `100x100` grayscale before feeding into the network.


---

## 📡 API Endpoints

### `POST /predict`

**Description:** Upload an X-ray image for classification.

* **Request Type:** `multipart/form-data`
* **Field:** `file`
* **Response:**

```json
{
  "prediction": "Normal",
  "confidence": 0.85
}
```

---

## 🧱 Technologies Used

### Backend:

* Python 3.x
* Flask + Flask-CORS
* Keras / TensorFlow
* Image Processing

### Frontend:

* React.js
* HTML5 / CSS3 / JS

### Others:

* Git & GitHub for version control
* Jupyter Notebook (model training & experiments)

---

## 🌟 Future Enhancements

* 🧪 Add multi-class support (e.g., TB, COVID-19)
* 📊 Visualization of model layers or heatmaps (Grad-CAM)
* 🧾 History & report tracking for uploaded predictions
* 🧠 Switch to faster models like EfficientNet or MobileNet
* 📱 Build a responsive PWA or mobile app version
* 🔒 Add user authentication and login support

---


## 🪪 License

This project is **proprietary** and protected by copyright © 2025 Rasika Gautam.

You are welcome to view the code for educational or evaluation purposes (e.g., portfolio review by recruiters).  
However, you may **not copy, modify, redistribute, or claim this project as your own** under any circumstances — including in interviews or job applications — without written permission.

---

Feel free to explore the code.

_Developed with 💡 by [Rasika Gautam](https://github.com/rasika1205)_

