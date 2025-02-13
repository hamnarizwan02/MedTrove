// const express = require('express');
// const router = express.Router();
// const { addMedication } = require('../controllers/remindermedsController');

// router.post('/medications', addMedication);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
  addMedication, 
  getMedications,
  getMedicationsForDate,
  getWeeklyMedications,
  getMedicationsByMonth
} = require('../controllers/remindermedsController');

router.post('/medications', addMedication);
router.get('/medications', getMedications);
router.get('/medications/date', getMedicationsForDate);
router.get('/medications/week', getWeeklyMedications);
router.get('/medications/month', getMedicationsByMonth);
module.exports = router;
