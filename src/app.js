const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/apiRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file (jika nanti butuh)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routing utama dan API
app.use('/', indexRouter);
app.use('/api', apiRouter);

// 404 handler sederhana
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
