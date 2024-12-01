const express = require('express');
const { getCartForCurrentUser } = require('../controllers/cartController');
const { getCurrentUser } = require('../controllers/CurrentUserController');

const router = express.Router();

router.get('/cart/current', getCartForCurrentUser);
router.get('/user/current', getCurrentUser);

module.exports = router;
