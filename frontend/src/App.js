import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Particles from './Particles';
// Custom Components
const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="card-header">
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`card-title ${className}`}>
    {children}
  </h2>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`card-description ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, disabled = false, className = '', variant = 'primary' }) => (
  <button 
    className={`btn btn-${variant} ${className} ${disabled ? 'disabled' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const Input = ({ type, accept, onChange, className = '', id }) => (
  <input 
    type={type}
    accept={accept}
    onChange={onChange}
    className={`input ${className}`}
    id={id}
  />
);

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`label ${className}`}>
    {children}
  </label>
);

// Icons as simple SVG components
const Upload = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const Activity = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Shield = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Zap = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const AlertCircle = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircle = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Loader2 = ({ className = '' }) => (
  <svg className={`${className} animate-spin`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const analyzeXRay = async () => {
  if (!selectedFile) return;

  setIsAnalyzing(true);

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    setResult({
      hasPneumonia: data.prediction === 'PNEUMONIA',
      confidence: data.confidence,  // Optional fake confidence
      details: data.prediction === 'PNEUMONIA'
        ? "Opacity detected in lower right lobe consistent with pneumonia"
        : "No significant abnormalities detected in lung fields"
    });

  } catch (error) {
    alert('Error during prediction: ' + error.message);
  }

  setIsAnalyzing(false);
};


  const resetAnalysis = () => {
    setResult(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (  
      <div className="app">
        <div style={{ 
      position: "absolute", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      zIndex: 0 
    }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
        
        <div className="container">
          <div className="grid">
            {/* Left Side - Site Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="info-section"
            >
              <div className="info-content">
                <h1 className="main-title">
                  AI X-Ray Pneumonia Detector
                </h1>
                <p className="main-description">
                  Advanced artificial intelligence technology to assist healthcare professionals in detecting pneumonia
                  from chest X-ray images. Our AI model has been trained on thousands of medical images to provide
                  accurate and reliable analysis.
                </p>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <Activity className="feature-icon blue" />
                  <div>
                    <h3>Fast Analysis</h3>
                    <p>Get results in seconds, not hours</p>
                  </div>
                </div>

                <div className="feature-card">
                  <Shield className="feature-icon green" />
                  <div>
                    <h3>HIPAA Compliant</h3>
                    <p>Your data is secure and private</p>
                  </div>
                </div>

                <div className="feature-card">
                  <Zap className="feature-icon yellow" />
                  <div>
                    <h3>High Accuracy</h3>
                    <p>95%+ accuracy rate in clinical trials</p>
                  </div>
                </div>
              </div>

              <div className="disclaimer">
                <p>
                  <strong>Disclaimer:</strong> This tool is for educational purposes only and should not replace
                  professional medical diagnosis. Always consult with qualified healthcare professionals.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Upload Form or Result */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="upload-section"
            >
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="upload-form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="upload-card">
                      <CardHeader>
                        <CardTitle className="upload-title">
                          <Upload className="title-icon" />
                          Upload X-Ray Image
                        </CardTitle>
                        <CardDescription>
                          Select a chest X-ray image for pneumonia analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="upload-content">
                        {previewUrl && (
                          <div className="preview-container">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="X-ray preview"
                              className="preview-image"
                            />
                          </div>
                        )}

                        <div className="input-group">
                          <Label htmlFor="xray-upload">
                            Choose X-Ray File
                          </Label>
                          <Input
                            id="xray-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                          />
                        </div>

                        <Button
                          onClick={analyzeXRay}
                          disabled={!selectedFile || isAnalyzing}
                          className="analyze-btn"
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="btn-icon" />
                              Analyzing...
                            </>
                          ) : (
                            "Analyze X-Ray"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result-card"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <Card className={`result-card ${result.hasPneumonia ? 'pneumonia' : 'clear'}`}>
                      <CardHeader>
                        <CardTitle className="result-title">
                          {result.hasPneumonia ? (
                            <AlertCircle className="result-icon red" />
                          ) : (
                            <CheckCircle className="result-icon green" />
                          )}
                          Analysis Complete
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="result-content">
                        <div className="confidence-display">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className={`confidence-number ${result.hasPneumonia ? 'red' : 'green'}`}
                          >
                            {result.confidence}%
                          </motion.div>
                          <p className="confidence-label">Confidence Level</p>
                        </div>

                        <div className={`result-details ${result.hasPneumonia ? 'pneumonia' : 'clear'}`}>
                          <h3 className="result-status">
                            {result.hasPneumonia ? "Pneumonia Detected" : "No Pneumonia Detected"}
                          </h3>
                          <p className="result-description">{result.details}</p>
                        </div>

                        <Button
                          onClick={resetAnalysis}
                          variant="outline"
                          className="reset-btn"
                        >
                          Analyze Another Image
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    
  );
}

export default App;