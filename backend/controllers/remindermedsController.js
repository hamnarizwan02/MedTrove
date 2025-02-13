const mongoose = require('mongoose');
const Medication = require('../models/remindermeds');
const CurrentUser = require('../models/currentUser');
const { fetchCurrentUserID } = require('../controllers/CurrentUserController');

exports.addMedication = async (req, res) => {
    try {
      console.log('Incoming request body:', JSON.stringify(req.body, null, 2));
  
      const {
        name,
        dosage,
        frequency,
        times_a_day,
        selectedDays,
        duration,
        startDate,
        endDate,
        isActive
      } = req.body;

      const currentUser = await CurrentUser.findOne({});
      if (!currentUser || !currentUser.currentuserid[0]) {
        return res.status(404).json({ message: 'No user currently logged in' });
      }
  
      //console.log('Extracted userId:', currentUser.currentuserid[0]);
  
      const medication = new Medication({
        userId: currentUser.currentuserid[0],
        name,
        dosage,
        frequency,
        times_a_day,
        selectedDays,
        duration,
        startDate,
        endDate,
        isActive
      });
  
     // console.log('Medication object before saving:', JSON.stringify(medication, null, 2));
  
      await medication.save();
  
      console.log('Medication saved successfully:', JSON.stringify(medication, null, 2));
  
      res.status(201).json({
        success: true,
        message: 'Medication added successfully',
        data: medication
      });
    } catch (error) {
      console.error('Error adding medication:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding medication',
        error: error.message
      });
    }
};

exports.getMedications = async (req, res) => {
  try {
    // Get current user
    const currentUser = await CurrentUser.findOne({});
    if (!currentUser || !currentUser.currentuserid[0]) {
      return res.status(404).json({ message: 'No user currently logged in' });
    }

    const userId = currentUser.currentuserid[0];

    // Fetch medications for current user
    const medications = await Medication.find({ userId: userId })
      .sort({ startDate: 1 }) // Sort by start date
      .lean();

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter and format medications
    const activeMedications = medications.filter(med => {
      const endDate = new Date(med.endDate);
      endDate.setHours(0, 0, 0, 0);
      return med.isActive && endDate >= today;
    });

    res.status(200).json({
      success: true,
      data: activeMedications
    });

  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medications',
      error: error.message
    });
  }
};

// Get medications for a specific date
exports.getMedicationsForDate = async (req, res) => {
  try {
    const { date } = req.query;
    console.log('Requested date:', date);

    const currentUser = await CurrentUser.findOne({});
    if (!currentUser || !currentUser.currentuserid[0]) {
      return res.status(404).json({ message: 'No user currently logged in' });
    }

    const userId = currentUser.currentuserid[0];
    const queryDate = new Date(date);
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][queryDate.getDay()];
    
    // Convert dates to UTC to match stored dates
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    console.log('Searching with criteria:', {
      userId,
      startDate: { $lte: endOfDay },
      endDate: { $gte: startOfDay },
      [`selectedDays.${dayOfWeek}`]: true,
      isActive: true
    });

    const medications = await Medication.find({
      userId: userId,
      isActive: true,
      startDate: { $lte: endOfDay },
      endDate: { $gte: startOfDay },
      [`selectedDays.${dayOfWeek}`]: true
    }).lean();

    // If no medications found, let's do a broader search to debug
    if (medications.length === 0) {
      console.log('No medications found, checking all medications for this user:');
      const allMeds = await Medication.find({ userId: userId }).lean();
      console.log('All user medications:', allMeds);
    }

    res.status(200).json({
      success: true,
      data: medications
    });

  } catch (error) {
    console.error('Error fetching medications for date:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching medications for date',
      error: error.message
    });
  }
};

exports.getWeeklyMedications = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const currentUser = await CurrentUser.findOne({});
    if (!currentUser || !currentUser.currentuserid[0]) {
      return res.status(404).json({ message: 'No user currently logged in' });
    }

    const userId = currentUser.currentuserid[0];

    const medications = await Medication.find({
      userId: userId,
      isActive: true,
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) }
    }).lean();

    res.status(200).json({
      success: true,
      data: medications
    });

  } catch (error) {
    console.error('Error fetching weekly medications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weekly medications',
      error: error.message
    });
  }
};

exports.getMedicationsByMonth = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      const currentUser = await CurrentUser.findOne({});
      if (!currentUser || !currentUser.currentuserid[0]) {
        return res.status(404).json({ message: 'No user currently logged in' });
      }

      const userId = currentUser.currentuserid[0];

      const medications = await Medication.find({
        userId: userId,
        isActive: true,
        startDate: { $lte: new Date(endDate) },
        endDate: { $gte: new Date(startDate) }
      }).lean();

      res.status(200).json({
        success: true,
        data: medications
      });

    } catch (error) {
      console.error('Error fetching weekly medications:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching weekly medications',
        error: error.message
      });
    }
  };