import React, { useState, useEffect, useRef } from 'react';

const DERIV_APP_ID = "1089"; // Testing App ID
const DERIV_WS_URL = `wss://://derivws.com{DERIV_APP_ID}`;



export default function DigitAnalyzer() {
  const [symbol, setSymbol] = useState("R_100"); // Default Volatility 100
  const [tradeType, setTradeType] = useState("matches"); // matches, even_odd, over_under
  const [latestPrice, setLatestPrice] = useState("0.0000");
  const [lastDigit, setLastDigit] = useState("-");
  const [timeLeft, setTimeLeft] = useState(2.0);
  const [digitStats, setDigitStats] = useState(Array(10).fill(0));
  const [tickHistory, setTickHistory] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  const ws = useRef(null);
  const timerInterval = useRef(null);

  // Connect to Deriv Live WebSocket
  const connectDeriv = () => {
    if (ws.current) ws.current.close();

    setConnectionStatus("Connecting...");
    ws.current = new WebSocket(DERIV_WS_URL);

    ws.current.onopen = () => {
      setConnectionStatus("Connected");
      ws.current.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.msg_type === "tick" && data.tick) {
        const price = data.tick.quote.toFixed(data.tick.pip_size || 4);
        setLatestPrice(price);
        
        const finalDigit = parseInt(price.slice(-1));
        if (!isNaN(finalDigit)) {
          setLastDigit(finalDigit);
          setTimeLeft(2.0); // Reset countdown timer to 2 seconds

          // Track last 100 ticks for digit percentage analysis
          setTickHistory((prev) => {
            const updated = [...prev, finalDigit].slice(-100);
            
            // Calculate new percentage distribution (0-9)
            const counts = Array(10).fill(0);
            updated.forEach(d => counts[d]++);
            const percentages = counts.map(c => updated.length ? Math.round((c / updated.length) * 100) : 0);
            setDigitStats(percentages);
            
            return updated;
          });
        }
      }
    };

    ws.current.onclose = () => setConnectionStatus("Disconnected");
  };

  useEffect(() => {
    connectDeriv();
    return () => ws.current && ws.current.close();
  }, [symbol]);

  // Handle smooth 2-second countdown bar tick rate
  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0.1 ? 0 : parseFloat((prev - 0.1).toFixed(1))));
    }, 100);
    return () => clearInterval(timerInterval.current);
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: '#1e293b', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        
        {/* Connection Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Market Analysis</h2>
          <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '12px', backgroundColor: connectionStatus === 'Connected' ? '#10b98120' : '#ef444420', color: connectionStatus === 'Connected' ? '#34d399' : '#f87171' }}>
            ● {connectionStatus}
          </span>
        </div>

        {/* Volatility Index Picker */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: '600' }}>SELECT INDEX</label>
          <select value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ w: '100%', width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: '#334155', color: '#fff', border: 'none', fontSize: '14px', outline: 'none' }}>
            <option value="R_10">Volatility 10 Index</option>
            <option value="R_25">Volatility 25 Index</option>
            <option value="R_50">Volatility 50 Index</option>
            <option value="R_75">Volatility 75 Index</option>
            <option value="R_100">Volatility 100 Index</option>
          </select>
        </div>

        {/* Trade Type Filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['matches', 'even_odd', 'over_under'].map((type) => (
            <button key={type} onClick={() => setTradeType(type)} style={{ flex: 1, padding: '10px 4px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', cursor: 'pointer', border: 'none', backgroundColor: tradeType === type ? '#6366f1' : '#334155', color: '#fff' }}>
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Price Display */}
        <div style={{ textAlign: 'center', backgroundColor: '#0f172a', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', trackingSpacing: '1px' }}>LIVE SPOT PRICE</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', margin: '6px 0', color: '#cbd5e1' }}>{latestPrice}</div>
          
          {/* Main Visual Circle & 2-Second Timer */}
          <div style={{ width: '110px', height: '110px', borderRadius: '50%', border: '4px solid #6366f130', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '15px auto', position: 'relative', backgroundColor: '#6366f105' }}>
            <span style={{ fontSize: '10px', color: '#818cf8', fontWeight: 'bold' }}>DIGIT</span>
            <span style={{ fontSize: '42px', fontWeight: '800', fontFamily: 'monospace', color: timeLeft === 0 ? '#475569' : '#818cf8' }}>{lastDigit}</span>
          </div>
          
          {/* Countdown Linear Bar */}
          <div style={{ width: '150px', margin: '0 auto' }}>
            <div style={{ width: '100%', height: '5px', backgroundColor: '#334155', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${(timeLeft / 2.0) * 100}%`, height: '100%', backgroundColor: '#6366f1', transition: 'width 0.1s linear' }}></div>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace', display: 'block', marginTop: '4px' }}>{timeLeft.toFixed(1)}s remaining</span>
          </div>
        </div>

        {/* Digit Statistics Bar Chart Layout (0-9) */}
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Digit Distribution (Last 100 Ticks)</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '80px', backgroundColor: '#0f172a', padding: '12px', borderRadius: '16px' }}>
            {digitStats.map((pct, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <span style={{ fontSize: '9px', color: '#a5b4fc', marginBottom: '2px', fontFamily: 'monospace' }}>{pct}%</span>
                <div style={{ width: '12px', height: `${Math.max(pct, 4)}px`, backgroundColor: idx === lastDigit ? '#34d399' : '#475569', borderRadius: '3px', transition: 'height 0.3s ease' }}></div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '4px', color: idx === lastDigit ? '#34d399' : '#94a3b8' }}>{idx}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
