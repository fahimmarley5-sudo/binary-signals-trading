const express = require('express');
const router = express.Router();

const courses = [
  {
    id: 1,
    title: 'Understanding Over/Under Signals',
    description: 'Learn how to interpret and use Over/Under trading signals',
    lessons: [
      { id: 1, title: 'What are Over/Under Signals?', duration: 15 },
      { id: 2, title: 'Reading Price Action', duration: 20 },
      { id: 3, title: 'Identifying Trends', duration: 18 }
    ]
  },
  {
    id: 2,
    title: 'Mastering Even/Odd Predictions',
    description: 'Deep dive into Even/Odd analysis and pattern recognition',
    lessons: [
      { id: 1, title: 'Number Pattern Basics', duration: 12 },
      { id: 2, title: 'Probability Analysis', duration: 25 },
      { id: 3, title: 'Advanced Patterns', duration: 22 }
    ]
  },
  {
    id: 3,
    title: 'Match/Differ Strategy',
    description: 'Master the art of comparing market patterns',
    lessons: [
      { id: 1, title: 'Pattern Comparison 101', duration: 16 },
      { id: 2, title: 'Historical Analysis', duration: 20 },
      { id: 3, title: 'Real-time Application', duration: 18 }
    ]
  },
  {
    id: 4,
    title: 'Risk Management & Win Rate Tracking',
    description: 'How to manage risk and track your trading performance',
    lessons: [
      { id: 1, title: 'Position Sizing', duration: 14 },
      { id: 2, title: 'Stop Loss & Take Profit', duration: 19 },
      { id: 3, title: 'Performance Metrics', duration: 17 }
    ]
  }
];

router.get('/', (req, res) => {
  res.json(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
});

module.exports = router;