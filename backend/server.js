// server.js
// This file sets up a simple server to handle prediction requests from the frontend.

const express = require('express');
const cors = require('cors');

// Create an instance of the Express application
const app = express();
const PORT = 3001;

// Middleware setup:
// 'cors' allows the frontend (on a different port) to communicate with this server.
// 'express.json' allows the server to parse JSON data sent in the request body.
app.use(cors());
app.use(express.json());

// In-memory data storage (like a temporary database)
// This array will hold a log of all prediction requests.
let predictionsLog = [];

// A POST endpoint to handle prediction requests.
// The frontend will send data to this URL.
app.post('/api/predict', (req, res) => {
  // Destructure the disease type and form data from the request body.
  const { disease, data } = req.body;

  // The simplified prediction logic is here, simulating an AI model.
  const calculatePrediction = (data, disease) => {
    let score = 0;
    const { age, pulse, bloodPressure, cholesterol, bloodSugar, creatinine } = data;

    // Logic for Heart Attack risk prediction
    if (disease === 'heart') {
      if (age > 50) score += 20;
      if (pulse > 100) score += 15;
      if (bloodPressure > 140) score += 30;
      if (cholesterol > 240) score += 25;
      if (score > 100) score = 100;
    }

    // Logic for Diabetes risk prediction
    if (disease === 'diabetes') {
      if (age > 40) score += 15;
      if (bloodSugar > 125) score += 50;
      if (cholesterol > 200) score += 10;
      if (score > 100) score = 100;
    }

    // Logic for Kidney Disease risk prediction
    if (disease === 'kidney') {
      if (age > 60) score += 20;
      if (bloodPressure > 130) score += 30;
      if (creatinine > 1.2) score += 50;
      if (score > 100) score = 100;
    }

    return score;
  };

  const predictionScore = calculatePrediction(data, disease);
  
  // Create a new prediction object to log
  const newPrediction = {
    id: predictionsLog.length + 1,
    disease,
    score: predictionScore,
    date: new Date().toISOString().slice(0, 10),
  };

  // Add the new prediction to our in-memory log
  predictionsLog.push(newPrediction);

  // Send the prediction score and the updated log back to the frontend
  res.json({
    prediction: predictionScore,
    insights: predictionsLog,
  });
});

// Start the server and listen for connections on the specified port.
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
