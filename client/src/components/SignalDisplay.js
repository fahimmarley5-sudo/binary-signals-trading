import React, { useState, useEffect } from 'react';
import './SignalDisplay.css';

const SignalDisplay = ({ signal }) => {
  const [timeLeft, setTimeLeft] = useState(signal.timeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeLeft(signal.timeRemaining);
  }, [signal]);

  return (
    <div className="signal-display">
      <div className="signal-number-box">
        <h2>Current Number</h2>
        <div className="number">{String(signal.number).padStart(4, '0')}</div>
        <div className="countdown-timer">
          <span className="time-text">Time Remaining:</span>
          <div className="countdown">{timeLeft}s</div>
          <div className="timer-bar">
            <div className="timer-fill" style={{width: `${(timeLeft / 60) * 100}%`}}></div>
          </div>
        </div>
      </div>

      <div className="signals-grid">
        {/* Over/Under Signal */}
        <div className="signal-card over-under">
          <h3>Over/Under</h3>
          <div className="prediction">{signal.overUnder.prediction}</div>
          <div className="confidence">Confidence: {signal.overUnder.confidence}%</div>
          <div className="threshold">Threshold: {signal.overUnder.threshold}</div>
          <button className="btn-confirm">Record Result</button>
        </div>

        {/* Even/Odd Signal */}
        <div className="signal-card even-odd">
          <h3>Even/Odd</h3>
          <div className="prediction">{signal.evenOdd.prediction}</div>
          <div className="confidence">Confidence: {signal.evenOdd.confidence}%</div>
          <div className="last-digit">Last Digit: {signal.evenOdd.lastDigit}</div>
          <button className="btn-confirm">Record Result</button>
        </div>

        {/* Match/Differ Signal */}
        <div className="signal-card match-differ">
          <h3>Match/Differ</h3>
          <div className="prediction">{signal.matchDiffer.prediction}</div>
          <div className="confidence">Confidence: {signal.matchDiffer.confidence}%</div>
          <div className="pattern">Pattern: {signal.matchDiffer.currentPattern}</div>
          <button className="btn-confirm">Record Result</button>
        </div>
      </div>

      <div className="win-rates">
        <h3>Current Win Rates</h3>
        <div className="rates-grid">
          <div className="rate-item">
            <span>Over/Under:</span>
            <strong>{signal.winRate.overUnder}</strong>
          </div>
          <div className="rate-item">
            <span>Even/Odd:</span>
            <strong>{signal.winRate.evenOdd}</strong>
          </div>
          <div className="rate-item">
            <span>Match/Differ:</span>
            <strong>{signal.winRate.matchDiffer}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalDisplay;