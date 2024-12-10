const express = require('express');
const router = express.Router();

const { getCartForCurrentUser } = require('../controllers/cartController');
const { getCurrentUser } = require('../controllers/CurrentUserController');

// Add this to your existing routes
router.get('/cart/current', getCartForCurrentUser);
router.get('/user/current', getCurrentUser);

module.exports = router;
