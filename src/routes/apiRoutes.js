const express = require('express');
const router = express.Router();
const { createHabit, getHabits } = require('../controllers/apiController');
const { validateHabit } = require('../middlewares/validator');

// API routes
router.get('/habits', getHabits);
router.post('/habits', validateHabit, createHabit);

module.exports = router;
