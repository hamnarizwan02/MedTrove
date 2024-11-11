const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users/signup
router.post('/signup', userController.signup);

// POST /api/users/login
router.post('/login', userController.login);

module.exports = router;