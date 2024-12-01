const express = require('express');
const router = express.Router();
const { getInteraction } = require('../controllers/DDIController');

router.post('/check-interaction', getInteraction);

module.exports = router;
