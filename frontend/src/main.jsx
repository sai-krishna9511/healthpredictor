const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let predictionsLog = [];

app.post('/api/predict', (req, res) => {
  const { disease, data } = req.body;

  const calculatePrediction = (data, disease) => {
    let score = 0;
    const { age, pulse, bloodPressure, cholesterol, bloodSugar, creatinine } = data;

    if (disease === 'heart') {
      if (age > 50) score += 20;
      if (pulse > 100) score += 15;
      if (bloodPressure > 140) score += 30;
      if (cholesterol > 240) score += 25;
      if (score > 100) score = 100;
    }

    if (disease === 'diabetes') {
      if (age > 40) score += 15;
      if (bloodSugar > 125) score += 50;
      if (cholesterol > 200) score += 10;
      if (score > 100) score = 100;
    }

    if (disease === 'kidney') {
      if (age > 60) score += 20;
      if (bloodPressure > 130) score += 30;
      if (creatinine > 1.2) score += 50;
      if (score > 100) score = 100;
    }

    return score;
  };

  const predictionScore = calculatePrediction(data, disease);
  const newPrediction = {
    id: predictionsLog.length + 1,
    disease,
    score: predictionScore,
    date: new Date().toISOString().slice(0, 10),
  };

  predictionsLog.push(newPrediction);

  res.json({
    prediction: predictionScore,
    insights: predictionsLog,
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
