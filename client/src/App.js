import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SignalDisplay from './components/SignalDisplay';
import StatsPanel from './components/StatsPanel';
import CoursesList from './components/CoursesList';
import './App.css';

const App = () => {
  const [signal, setSignal] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('signals');
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('signal', (data) => {
      setSignal(data);
    });

    fetchStats();
    return () => socket.disconnect();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats/winrates');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Binary Signals Trading</h1>
        <p>Real-time Over/Under, Even/Odd & Match/Differ Signals</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'signals' ? 'active' : ''}
          onClick={() => setActiveTab('signals')}
        >
          Live Signals
        </button>
        <button 
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
        <button 
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'signals' && signal && <SignalDisplay signal={signal} />}
        {activeTab === 'stats' && <StatsPanel stats={stats} />}
        {activeTab === 'courses' && <CoursesList />}
      </main>
    </div>
  );
};

export default App;