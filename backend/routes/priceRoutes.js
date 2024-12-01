const express = require('express');
const router = express.Router();
const { getPrice } = require('../controllers/PriceController');

router.get('/price/:name', getPrice);

module.exports = router;
