const express = require('express');
const router = express.Router();
const { createPaymentMethod } = require('../controllers/PaymentMethodController');

router.post('/save-payment-method', (req, res, next) => {
    console.log('ROUTE HIT: Save Payment Method');
    console.log('Received body:', req.body);
    next();
}, createPaymentMethod);

module.exports = router;