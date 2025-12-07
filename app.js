// 📂 FILE: app.js (Di folder paling luar)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./src/routes/index');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files (Agar gambar di folder uploads bisa dibuka di browser)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes API
app.use('/api', routes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route tidak ditemukan' });
});

app.listen(PORT, () => {
    console.log(`🚀 Cosmic Cargo V2 berjalan di port ${PORT}`);
});
