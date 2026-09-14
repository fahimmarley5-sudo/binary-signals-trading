# Binary Signals Trading App

A real-time binary options trading signals platform with:
- Live Over/Under signals
- Even/Odd predictions
- Match/Differ analysis
- Real-time countdown timers
- Win rate tracking
- Educational courses

## Features

✅ Real-time signal generation from market tick data
✅ Three signal types: Over/Under, Even/Odd, Match/Differ
✅ Live countdown timer (shows seconds remaining before signal changes)
✅ Win rate tracking and performance metrics
✅ Educational course module
✅ WebSocket real-time updates
✅ RESTful API

## Project Structure

```
binary-signals-trading/
├── engine/
│   ├── signalEngine.js       # Core signal generation logic
│   └── tickDataProcessor.js  # Real-time tick data handler
├── routes/
│   ├── signals.js            # Signal API endpoints
│   ├── stats.js              # Statistics endpoints
│   └── courses.js            # Educational content endpoints
├── client/                   # React frontend
├── server.js                 # Main Express server
├── package.json
└── .env.example
```

## Installation

### Backend Setup
```bash
npm install
```

### Frontend Setup
```bash
cd client
npm install
```

## Running the Application

### Start Backend
```bash
npm run dev
```

### Start Frontend
```bash
npm run client
```

## API Endpoints

### Signals
- `GET /api/signals/latest` - Get latest signal
- `GET /api/signals/history` - Get signal history
- `POST /api/signals/result` - Record win/loss

### Statistics
- `GET /api/stats/winrates` - Get current win rates
- `GET /api/stats/details` - Get detailed statistics

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course

## Signal Types Explained

### Over/Under
Predicts whether the next price will be OVER or UNDER the current level

### Even/Odd
Predicts whether the last digit of the number will be EVEN or ODD

### Match/Differ
Compares current pattern with previous pattern:
- MATCH: Pattern is similar
- DIFFER: Pattern is different

## Countdown Timer
Each signal displays a countdown timer showing seconds remaining before the next signal (0-60 seconds)

## Next Steps

1. Set up MongoDB connection in `server.js`
2. Create React frontend in `client/` directory
3. Implement actual broker API integration
4. Add user authentication
5. Create course content
6. Deploy to production

## License

MIT
