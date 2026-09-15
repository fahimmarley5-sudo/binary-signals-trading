require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const signalEngine = require('./engine/signalEngine');
const tickDataProcessor = require('./engine/tickDataProcessor');

const app = express();
const server = http.createServer(app);

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

const io = socketIo(server, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: clientUrl,
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/signals', require('./routes/signals'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/courses', require('./routes/courses'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Real-time signal emission
ticksDataProcessor.on('newTick', (tickData) => {
  const signal = signalEngine.generateSignal(tickData);
  
  io.emit('signal', {
    timestamp: new Date(),
    number: signal.number,
    overUnder: signal.overUnder,
    evenOdd: signal.evenOdd,
    matchDiffer: signal.matchDiffer,
    winRate: signal.winRate,
    timeRemaining: signal.timeRemaining
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  tickDataProcessor.start();
});

module.exports = app;