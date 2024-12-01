const express = require('express');
const router = express.Router();
const { getMedicineById, searchMedicines, searchMedicinesByName } = require('../controllers/medicineController');

// Route to get medicine by ID
router.get('/medici/:id', getMedicineById);

// Route to search medicines by name or condition
router.get('/medicines/:searchTerm', searchMedicines);

router.get('/medicine-by-name/:name', searchMedicinesByName);

module.exports = router;
