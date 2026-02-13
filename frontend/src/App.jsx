import React, { useState } from 'react';

const App = () => {
  const [page, setPage] = useState('login');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({});

  const calculatePrediction = (data, disease) => {
    let score = 0;
    const { age, pulse, bloodPressure, cholesterol, bloodSugar, creatinine } = data;
    
    // Heart Attack Logic
    if (disease === 'heart') {
      if (age > 50) score += 20;
      if (pulse > 100) score += 15;
      if (bloodPressure > 140) score += 30;
      if (cholesterol > 240) score += 25;
      if (score > 100) score = 100;
    }
    
    // Diabetes Logic
    if (disease === 'diabetes') {
      if (age > 40) score += 15;
      if (bloodSugar > 125) score += 50;
      if (cholesterol > 200) score += 10;
      if (score > 100) score = 100;
    }

    // Kidney Disease Logic
    if (disease === 'kidney') {
      if (age > 60) score += 20;
      if (bloodPressure > 130) score += 30;
      if (creatinine > 1.2) score += 50;
      if (score > 100) score = 100;
    }
    
    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const predictionScore = calculatePrediction(formData, selectedDisease);
    setPrediction(predictionScore);
    setPage('results');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };
  
  const renderContent = () => {
    switch (page) {
      case 'login':
        return (
          <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to Health Predictor</h1>
            <p style={styles.subheading}>Sign in to access your health insights</p>
            <div style={styles.card}>
              <div style={styles.inputGroup}>
                <input type="text" placeholder="Username" style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <input type="password" placeholder="Password" style={styles.input} />
              </div>
              <button onClick={() => setPage('diseases')} style={styles.button}>Login</button>
            </div>
          </div>
        );
      case 'diseases':
        return (
          <div style={styles.container}>
            <h2 style={styles.heading}>Select a condition to analyze</h2>
            <div style={styles.gridContainer}>
              <div onClick={() => { setSelectedDisease('heart'); setPage('form'); }} style={styles.gridItem}>
                <h3>Heart Attack Risk</h3>
              </div>
              <div onClick={() => { setSelectedDisease('diabetes'); setPage('form'); }} style={styles.gridItem}>
                <h3>Diabetes Risk</h3>
              </div>
              <div onClick={() => { setSelectedDisease('kidney'); setPage('form'); }} style={styles.gridItem}>
                <h3>Kidney Disease Risk</h3>
              </div>
            </div>
          </div>
        );
      case 'form':
        return (
          <div style={styles.container}>
            <h2 style={styles.heading}>Enter your health data</h2>
            <div style={styles.card}>
              <form onSubmit={handleSubmit} style={{width: '100%'}}>
                <div style={styles.inputGroup}>
                  <input type="number" name="age" placeholder="Age" onChange={handleInputChange} required style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <input type="number" name="pulse" placeholder="Pulse Rate (bpm)" onChange={handleInputChange} required style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <input type="number" name="bloodPressure" placeholder="Systolic Blood Pressure (mmHg)" onChange={handleInputChange} required style={styles.input} />
                </div>
                {selectedDisease === 'heart' && (
                  <div style={styles.inputGroup}>
                    <input type="number" name="cholesterol" placeholder="Cholesterol (mg/dL)" onChange={handleInputChange} required style={styles.input} />
                  </div>
                )}
                {selectedDisease === 'diabetes' && (
                  <div style={styles.inputGroup}>
                    <input type="number" name="bloodSugar" placeholder="Blood Sugar (mg/dL)" onChange={handleInputChange} required style={styles.input} />
                  </div>
                )}
                {selectedDisease === 'kidney' && (
                  <div style={styles.inputGroup}>
                    <input type="number" name="creatinine" placeholder="Creatinine (mg/dL)" onChange={handleInputChange} required style={styles.input} />
                  </div>
                )}
                <button type="submit" style={styles.button}>Predict</button>
              </form>
            </div>
          </div>
        );
      case 'results':
        return (
          <div style={styles.container}>
            <div style={styles.card}>
              <h2 style={styles.heading}>Your risk prediction is:</h2>
              <p style={{...styles.subheading, fontSize: '48px', margin: '20px 0'}}>{prediction}%</p>
              <button onClick={() => setPage('diseases')} style={styles.button}>Back to Home</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#282c34',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '20px'
    },
    heading: {
      fontSize: '2em',
      marginBottom: '10px'
    },
    subheading: {
      fontSize: '1em',
      marginBottom: '20px'
    },
    card: {
      backgroundColor: '#383c4a',
      borderRadius: '10px',
      padding: '20px',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '1em'
    },
    button: {
      backgroundColor: '#61dafb',
      color: 'black',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '1em',
      cursor: 'pointer'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '20px',
      width: '100%',
      maxWidth: '600px'
    },
    gridItem: {
      backgroundColor: '#383c4a',
      padding: '20px',
      borderRadius: '10px',
      cursor: 'pointer'
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default App;