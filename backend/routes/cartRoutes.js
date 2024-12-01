const express = require('express');
const router = express.Router();

const { getCartCurrent, AddCart, RemoveFromCart, UpdateCart } = require('../controllers/cartController');

// router.get('/cart/current', getCartCurrent);

router.post('/cart/add' , AddCart);

router.delete('/cart/remove/:medicine', RemoveFromCart);

router.put('/cart/update', UpdateCart);

module.exports = router;