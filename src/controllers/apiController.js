const fs = require('fs');
const path = require('path');
const habitsData = require('../../data/data.json');
const { calculateTotalDuration, groupByDifficulty } = require('../utils/helpers');

// GET /api/habits
const getHabits = (req, res, next) => {
  try {
    const totalDuration = calculateTotalDuration(habitsData);
    const grouped = groupByDifficulty(habitsData);

    res.status(200).json({
      status: 'success',
      data: {
        habits: habitsData,
        totalDuration,
        groupedByDifficulty: grouped
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/habits
const createHabit = (req, res, next) => {
  try {
    const { title, duration, email, difficulty, mood } = req.body;

    const newHabit = {
      id: habitsData.length + 1,
      title,
      duration: Number(duration),
      email,
      difficulty,
      mood,
      createdAt: new Date().toISOString()
    };

    habitsData.push(newHabit);

    const filePath = path.join(__dirname, '..', '..', 'data', 'data.json');
    fs.writeFileSync(filePath, JSON.stringify(habitsData, null, 2));

    res.status(201).json({
      status: 'success',
      message: 'Habit created successfully',
      data: newHabit
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHabits,
  createHabit
};
