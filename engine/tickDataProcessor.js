const EventEmitter = require('events');

class TickDataProcessor extends EventEmitter {
  constructor() {
    super();
    this.currentTick = null;
    this.tickBuffer = [];
    this.tickInterval = null;
  }

  start() {
    // Simulate real tick data - replace with actual broker API
    this.tickInterval = setInterval(() => {
      const newTick = this.generateMockTick();
      this.tickBuffer.push(newTick);
      this.currentTick = newTick;
      
      this.emit('newTick', newTick);
    }, 1000); // New tick every second
  }

  generateMockTick() {
    // Simulates real market tick data
    // Replace this with actual broker API calls
    return {
      price: Math.floor(Math.random() * 10000),
      timestamp: Date.now(),
      volume: Math.random() * 1000,
      symbol: 'EURUSD'
    };
  }

  stop() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
    }
  }

  getTickBuffer(count = 10) {
    return this.tickBuffer.slice(-count);
  }
}

module.exports = new TickDataProcessor();
