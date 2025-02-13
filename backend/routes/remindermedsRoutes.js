const express = require('express');
const router = express.Router();
const { 
  addMedication, 
  getMedications,
  getMedicationsForDate,
  getWeeklyMedications,
  getMonthlyMedications
} = require('../controllers/remindermedsController');

router.post('/medications', addMedication);
router.get('/medications', getMedications);
router.get('/medications/date', getMedicationsForDate);
router.get('/medications/week', getWeeklyMedications);
router.get('/medications/month', getMonthlyMedications);

module.exports = router;
