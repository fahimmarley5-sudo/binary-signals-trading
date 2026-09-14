const express = require('express');
const router = express.Router();
const signalEngine = require('../engine/signalEngine');

router.get('/latest', (req, res) => {
  const history = signalEngine.getSignalHistory(1);
  res.json(history[0] || {});
});

router.get('/history', (req, res) => {
  const limit = req.query.limit || 20;
  const history = signalEngine.getSignalHistory(limit);
  res.json(history);
});

router.post('/result', (req, res) => {
  const { signalType, won } = req.body;
  
  if (!signalType || won === undefined) {
    return res.status(400).json({ error: 'Missing signalType or won' });
  }
  
  signalEngine.updateWinRate(signalType, won);
  res.json({ success: true, winRates: signalEngine.calculateWinRates() });
});

module.exports = router;