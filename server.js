require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const signalEngine = require('./engine/signalEngine');
const tickDataProcessor = require('./engine/tickDataProcessor');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/signals', require('./routes/signals'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/courses', require('./routes/courses'));

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Real-time signal emission
tickDataProcessor.on('newTick', (tickData) => {
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
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  tickDataProcessor.start();
});
