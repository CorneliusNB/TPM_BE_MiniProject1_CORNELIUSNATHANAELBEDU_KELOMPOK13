# Mini Project 1 - Habit Learning Tracker

Aplikasi web sederhana menggunakan Express.js untuk mencatat kebiasaan belajar developer.

## Fitur

- 3 route utama:
  - `/` Home
  - `/create` Form input kebiasaan belajar
  - `/summary` Ringkasan kebiasaan belajar
- 2 route API:
  - `GET /api/habits`
  - `POST /api/habits`
- Input form: title, duration, email, difficulty, mood.
- Data disimpan di `data/data.json` (tanpa database).

## Cara Menjalankan

1. Clone repository ini.
2. Jalankan `npm install`.
3. Buat file `.env` berdasarkan `.env.example`.
4. Jalankan:
   - `npm start`
5. Buka `http://localhost:3000` di browser.

## Struktur Proyek

Mengikuti pemisahan `routes`, `controllers`, `middlewares`, `utils`, dan `config` untuk menjaga kode terorganisir.

