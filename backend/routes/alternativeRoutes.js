const express = require('express');
const router = express.Router();
const { getAlternatives } = require('../controllers/alternativeController');

router.get('/alternatives/:name', getAlternatives);

module.exports = router;
