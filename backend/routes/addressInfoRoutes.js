const express = require('express');
const router = express.Router();
const { createAddressInfo, getAddressByUserId } = require('../controllers/AddressInfoController');

// router.post('/save-address', createAddressInfo);
router.post('/save-address', (req, res, next) => {
    console.log('ROUTE HIT: Save Address');
    console.log('Received body:', req.body);
    next();
  }, createAddressInfo);

router.get('/address/:userID', getAddressByUserId);

module.exports = router;