const express = require('express');
const router = express.Router();
const { getInteraction } = require('../controllers/DDIController');

//  router.post('/check-interaction', getInteraction);
//router.post('/', getInteraction);
router.post('/check-interaction', (req, res, next) => {
    console.log("Request received at /api/check-interaction");
    next();  // Continue to the actual handler
  }, getInteraction);
  

module.exports = router;
