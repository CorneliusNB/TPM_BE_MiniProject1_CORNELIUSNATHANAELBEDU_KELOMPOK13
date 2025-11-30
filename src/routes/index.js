const express = require('express');
const path = require('path');
const router = express.Router();
const habitsData = require('../../data/data.json');
const { calculateTotalDuration, groupByDifficulty } = require('../utils/helpers');

// Home
router.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Habit Learning Tracker</title>
      </head>
      <body>
        <h1>Habit Learning Tracker</h1>
        <p>Catat kebiasaan belajar coding Anda.</p>
        <ul>
          <li><a href="/create">Tambah kebiasaan belajar</a></li>
          <li><a href="/summary">Lihat ringkasan kebiasaan</a></li>
        </ul>
      </body>
    </html>
  `);
});

// Form input
router.get('/create', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Tambah Kebiasaan Belajar</title>
      </head>
      <body>
        <h1>Form Kebiasaan Belajar</h1>
        <form method="POST" action="/api/habits">
          <label>Judul materi:</label><br/>
          <input type="text" name="title" required/><br/><br/>

          <label>Durasi (menit):</label><br/>
          <input type="number" name="duration" min="1" required/><br/><br/>

          <label>Email:</label><br/>
          <input type="email" name="email" required/><br/><br/>

          <label>Level kesulitan:</label><br/>
          <select name="difficulty" required>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select><br/><br/>

          <label>Mood setelah belajar:</label><br/>
          <input type="text" name="mood" required/><br/><br/>

          <button type="submit">Simpan</button>
        </form>
        <p><a href="/">Kembali ke Home</a></p>
      </body>
    </html>
  `);
});

// Summary
router.get('/summary', (req, res) => {
  const totalDuration = calculateTotalDuration(habitsData);
  const grouped = groupByDifficulty(habitsData);

  const listItems = habitsData
    .map(
      (h) =>
        `<li>${h.title} - ${h.duration} menit - ${h.difficulty} - mood: ${h.mood}</li>`
    )
    .join('');

  res.send(`
    <html>
      <head>
        <title>Ringkasan Kebiasaan Belajar</title>
      </head>
      <body>
        <h1>Ringkasan Kebiasaan Belajar</h1>
        <p>Total durasi belajar: ${totalDuration} menit</p>
        <h3>Jumlah kebiasaan per level:</h3>
        <ul>
          <li>Beginner: ${grouped.beginner || 0}</li>
          <li>Intermediate: ${grouped.intermediate || 0}</li>
          <li>Advanced: ${grouped.advanced || 0}</li>
        </ul>
        <h3>Daftar kebiasaan:</h3>
        <ul>${listItems}</ul>
        <p><a href="/">Kembali ke Home</a></p>
      </body>
    </html>
  `);
});

module.exports = router;
