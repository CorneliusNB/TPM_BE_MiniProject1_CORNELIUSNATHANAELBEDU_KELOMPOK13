// 📂 FILE: src/routes/cargoRoutes.js

const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');
const uploadMiddleware = require('../middlewares/upload');

// Definisi Endpoint API
router.get('/', cargoController.getAllCargos);
router.get('/:id', cargoController.getCargoById);

// Upload gambar menggunakan key form-data: "image"
router.post('/', uploadMiddleware('image'), cargoController.createCargo);
router.put('/:id', uploadMiddleware('image'), cargoController.updateCargo);

router.delete('/:id', cargoController.deleteCargo);

module.exports = router;
