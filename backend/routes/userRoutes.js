const express = require('express');
const router = express.Router();
const { logoutCurrentUser } = require('../controllers/CurrentUserController');

// Correct route definition
router.post('/logout', logoutCurrentUser);
//router.get('/user/current',updateAvatar)

module.exports = router;