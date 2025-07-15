import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
classes = ['NORMAL', 'PNEUMONIA']
model = load_model("pneumonia_vgg16_model.h5")
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    # Preprocess
    img = image.load_img(filepath, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    # Predict
    pred = model.predict(img_array)[0][0]
    confidence = float(pred) * 100
    result = 'PNEUMONIA' if pred > 0.5 else 'NORMAL'
    print(f"Prediction Score: {pred}")

    return jsonify({
        'prediction': result,
        'confidence': round(confidence, 2),
        'filename': file.filename
    })

if __name__ == '__main__':
    app.run(debug=True)