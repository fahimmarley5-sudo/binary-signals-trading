class SignalEngine {
  constructor() {
    this.lastNumber = null;
    this.tickCount = 0;
    this.signalHistory = [];
    this.winRates = {
      overUnder: { wins: 0, total: 0 },
      evenOdd: { wins: 0, total: 0 },
      matchDiffer: { wins: 0, total: 0 }
    };
    this.ticksPerSignal = 10; // Generate signal every 10 ticks
    this.secondsPerSignal = 60; // Each signal lasts 60 seconds
  }

  generateSignal(tickData) {
    this.tickCount++;
    
    // Generate new signal every N ticks
    if (this.tickCount % this.ticksPerSignal === 0) {
      this.lastNumber = Math.floor(Math.random() * 10000); // 4-digit number
    }

    const signal = {
      number: this.lastNumber,
      overUnder: this.generateOverUnder(),
      evenOdd: this.generateEvenOdd(),
      matchDiffer: this.generateMatchDiffer(),
      winRate: this.calculateWinRates(),
      timeRemaining: this.getTimeRemaining(),
      timestamp: new Date()
    };

    this.signalHistory.push(signal);
    
    return signal;
  }

  generateOverUnder() {
    // Over/Under analysis based on current trend
    const lastPrice = this.signalHistory.length > 0 
      ? this.signalHistory[this.signalHistory.length - 1].number 
      : 5000;
    
    const prediction = Math.random() > 0.5 ? 'OVER' : 'UNDER';
    const confidence = (Math.random() * 30 + 70).toFixed(2); // 70-100%
    
    return {
      prediction,
      confidence,
      threshold: lastPrice
    };
  }

  generateEvenOdd() {
    // Even/Odd signal based on last digit analysis
    const lastDigit = this.lastNumber % 10;
    const prediction = lastDigit % 2 === 0 ? 'EVEN' : 'ODD';
    const confidence = (Math.random() * 30 + 70).toFixed(2);
    
    return {
      prediction,
      confidence,
      lastDigit
    };
  }

  generateMatchDiffer() {
    // Match/Differ - compares current vs previous number pattern
    const currentPattern = this.getNumberPattern(this.lastNumber);
    const prevPattern = this.signalHistory.length > 1
      ? this.getNumberPattern(this.signalHistory[this.signalHistory.length - 2].number)
      : null;
    
    const prediction = prevPattern && currentPattern === prevPattern ? 'MATCH' : 'DIFFER';
    const confidence = (Math.random() * 30 + 70).toFixed(2);
    
    return {
      prediction,
      confidence,
      currentPattern
    };
  }

  getNumberPattern(num) {
    // Analyze digit pattern
    const digits = String(num).padStart(4, '0').split('');
    const unique = new Set(digits).size;
    return unique <= 2 ? 'LOW_VARIANCE' : 'HIGH_VARIANCE';
  }

  getTimeRemaining() {
    // Calculate seconds until next signal (countdown timer)
    const elapsedTicks = this.tickCount % this.ticksPerSignal;
    const ticksRemaining = this.ticksPerSignal - elapsedTicks;
    const secondsRemaining = Math.max(0, this.secondsPerSignal - (elapsedTicks * 6));
    
    return secondsRemaining;
  }

  calculateWinRates() {
    return {
      overUnder: this.signalHistory.length > 0 
        ? ((this.winRates.overUnder.wins / this.winRates.overUnder.total) * 100 || 0).toFixed(2) + '%'
        : '0%',
      evenOdd: this.signalHistory.length > 0 
        ? ((this.winRates.evenOdd.wins / this.winRates.evenOdd.total) * 100 || 0).toFixed(2) + '%'
        : '0%',
      matchDiffer: this.signalHistory.length > 0 
        ? ((this.winRates.matchDiffer.wins / this.winRates.matchDiffer.total) * 100 || 0).toFixed(2) + '%'
        : '0%'
    };
  }

  updateWinRate(signalType, won) {
    if (this.winRates[signalType]) {
      this.winRates[signalType].total++;
      if (won) {
        this.winRates[signalType].wins++;
      }
    }
  }

  getSignalHistory(limit = 20) {
    return this.signalHistory.slice(-limit);
  }
}

module.exports = new SignalEngine();
