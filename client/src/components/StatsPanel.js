import React, { useEffect, useState } from 'react';
import './StatsPanel.css';

const StatsPanel = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats/details');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!stats) return <div className="loading">Loading statistics...</div>;

  return (
    <div className="stats-panel">
      <h2>Trading Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Over/Under</h3>
          <div className="stat-value">
            <span className="wins">Wins: {stats.overUnderStats.wins}</span>
            <span className="total">Total: {stats.overUnderStats.total}</span>
          </div>
          {stats.overUnderStats.total > 0 && (
            <div className="win-rate">
              {((stats.overUnderStats.wins / stats.overUnderStats.total) * 100).toFixed(2)}%
            </div>
          )}
        </div>

        <div className="stat-card">
          <h3>Even/Odd</h3>
          <div className="stat-value">
            <span className="wins">Wins: {stats.evenOddStats.wins}</span>
            <span className="total">Total: {stats.evenOddStats.total}</span>
          </div>
          {stats.evenOddStats.total > 0 && (
            <div className="win-rate">
              {((stats.evenOddStats.wins / stats.evenOddStats.total) * 100).toFixed(2)}%
            </div>
          )}
        </div>

        <div className="stat-card">
          <h3>Match/Differ</h3>
          <div className="stat-value">
            <span className="wins">Wins: {stats.matchDifferStats.wins}</span>
            <span className="total">Total: {stats.matchDifferStats.total}</span>
          </div>
          {stats.matchDifferStats.total > 0 && (
            <div className="win-rate">
              {((stats.matchDifferStats.wins / stats.matchDifferStats.total) * 100).toFixed(2)}%
            </div>
          )}
        </div>

        <div className="stat-card highlight">
          <h3>Total Signals</h3>
          <div className="big-number">{stats.totalSignalsGenerated}</div>
          <p>Signals Generated</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;