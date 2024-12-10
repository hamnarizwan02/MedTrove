const express = require('express');
const router = express.Router();
const { logoutCurrentUser } = require('../controllers/CurrentUserController');

// Correct route definition
router.post('/logout', logoutCurrentUser);

module.exports = router;