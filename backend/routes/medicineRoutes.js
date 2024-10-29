const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/MedicineController');

//GET app.get('/api/medici/:id'
router.get('/medici/:id', medicineController.getMedicineById);

// GET /api/medicines/by-name/:name
router.get('/by-name/:name', medicineController.getMedicineByName);

// GET /api/medicines/exists/:name
router.get('/exists/:name', medicineController.checkMedicineExists);

module.exports = router;