require('dotenv').config();

const APP_PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'HabitLearningTracker';
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  APP_PORT,
  APP_NAME,
  NODE_ENV
};
