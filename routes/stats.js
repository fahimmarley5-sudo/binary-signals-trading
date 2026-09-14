const express = require('express');
const router = express.Router();
const signalEngine = require('../engine/signalEngine');

router.get('/winrates', (req, res) => {
  const winRates = signalEngine.calculateWinRates();
  res.json(winRates);
});

router.get('/details', (req, res) => {
  res.json({
    overUnderStats: signalEngine.winRates.overUnder,
    evenOddStats: signalEngine.winRates.evenOdd,
    matchDifferStats: signalEngine.winRates.matchDiffer,
    totalSignalsGenerated: signalEngine.signalHistory.length
  });
});

module.exports = router;