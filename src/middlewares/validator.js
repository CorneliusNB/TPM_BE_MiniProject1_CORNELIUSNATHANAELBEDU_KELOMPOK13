const validateHabit = (req, res, next) => {
  const { title, duration, email, difficulty, mood } = req.body;

  const errors = [];

  if (!title || typeof title !== 'string') {
    errors.push('Title is required and must be a string');
  }

  const numDuration = Number(duration);
  if (!duration || Number.isNaN(numDuration) || numDuration <= 0) {
    errors.push('Duration must be a positive number');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Valid email is required');
  }

  const allowedDifficulty = ['beginner', 'intermediate', 'advanced'];
  if (!difficulty || !allowedDifficulty.includes(difficulty)) {
    errors.push('Difficulty must be beginner, intermediate, or advanced');
  }

  if (!mood || typeof mood !== 'string') {
    errors.push('Mood is required and must be a string');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'fail',
      errors
    });
  }

  return next();
};

module.exports = {
  validateHabit
};
