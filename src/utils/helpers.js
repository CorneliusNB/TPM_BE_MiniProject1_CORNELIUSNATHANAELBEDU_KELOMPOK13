// Arrow function + array methods

const calculateTotalDuration = (habits) =>
  habits.reduce((total, habit) => total + Number(habit.duration || 0), 0);

const groupByDifficulty = (habits) =>
  habits.reduce((acc, habit) => {
    const key = habit.difficulty || 'unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

module.exports = {
  calculateTotalDuration,
  groupByDifficulty
};
