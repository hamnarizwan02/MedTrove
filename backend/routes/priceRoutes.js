const express = require('express');
const router = express.Router();
const priceController = require('../controllers/PriceController');

// GET /api/prices/:name
router.get('/:name', priceController.getPriceByName);

module.exports = router;