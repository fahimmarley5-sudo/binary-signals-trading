const EventEmitter = require('events');

class TickDataProcessor extends EventEmitter {
  constructor() {
    super();
    this.currentTick = null;
    this.tickBuffer = [];
    this.tickInterval = null;
  }

  start() {
    this.tickInterval = setInterval(() => {
      const newTick = this.generateMockTick();
      this.tickBuffer.push(newTick);
      this.currentTick = newTick;
      
      this.emit('newTick', newTick);
    }, 1000);
  }

  generateMockTick() {
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