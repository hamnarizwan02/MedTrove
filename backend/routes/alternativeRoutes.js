const express = require('express');
const router = express.Router();
const alternativeController = require('../controllers/AlternativeController');

// GET /api/alternatives/:name
router.get('/:name', alternativeController.getAlternatives);

module.exports = router;