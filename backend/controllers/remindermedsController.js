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
    
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const medications = await Medication.find({
      userId: userId,
      isActive: true,
      startDate: { $lte: endOfDay },
      endDate: { $gte: startOfDay },
      $or: [
        { [`selectedDays.${dayOfWeek}`]: true },
        { duration: 1 },
        { $expr: { $eq: [{ $size: { $objectToArray: "$selectedDays" } }, 0] } }
      ]
    }).lean();

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

// exports.getWeeklyMedications = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const currentUser = await CurrentUser.findOne({});
//     if (!currentUser || !currentUser.currentuserid[0]) {
//       return res.status(404).json({ message: 'No user currently logged in' });
//     }

//     const userId = currentUser.currentuserid[0];

//     // Fetch medications that are active and within the start and end date range
//     const medications = await Medication.find({
//       userId: userId,
//       isActive: true,
//       startDate: { $lte: new Date(endDate) },
//       endDate: { $gte: new Date(startDate) }
//     }).lean();

//     // Group medications by day of the week
//     const groupedMedications = {};
//     medications.forEach(med => {
//       const start = new Date(med.startDate);
//       const end = new Date(med.endDate);
      
//       // Iterate through each day in the range
//       for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
//         const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
//         if (!groupedMedications[dayOfWeek]) {
//           groupedMedications[dayOfWeek] = [];
//         }
//         groupedMedications[dayOfWeek].push(med);
//       }
//     });

//     res.status(200).json({
//       success: true,
//       data: groupedMedications
//     });

//   } catch (error) {
//     console.error('Error fetching weekly medications:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching weekly medications',
//       error: error.message
//     });
//   }
// };

exports.getWeeklyMedications = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const currentUser = await CurrentUser.findOne({});
    if (!currentUser || !currentUser.currentuserid[0]) {
      return res.status(404).json({ message: 'No user currently logged in' });
    }

    const userId = currentUser.currentuserid[0];

    // Fetch medications within the date range
    const medications = await Medication.find({
      userId: userId,
      isActive: true,
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) }
    }).lean();

    // Group medications by day of the week
    const groupedMedications = {};

    medications.forEach(med => {
      const start = new Date(med.startDate);
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][start.getDay()];
      
      const duration = med.duration || 1;
      const frequency = med.frequency || 1; // Number of times per day

      // Ensure the medication is only shown on the start date's weekday
      if (!groupedMedications[dayOfWeek]) {
        groupedMedications[dayOfWeek] = [];
      }

      // Add the medication "frequency" number of times on the start date's weekday
      for (let i = 0; i < frequency; i++) {
        groupedMedications[dayOfWeek].push({ ...med, doseNumber: i + 1 });
      }
    });

    res.status(200).json({
      success: true,
      data: groupedMedications
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



exports.getMonthlyMedications = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    const currentUser = await CurrentUser.findOne({});
    if (!currentUser || !currentUser.currentuserid[0]) {
      return res.status(404).json({ message: 'No user currently logged in' });
    }

    const userId = currentUser.currentuserid[0];

    // Create date range for the specified month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const medications = await Medication.find({
      userId: userId,
      isActive: true,
      startDate: { $lte: endOfMonth },
      endDate: { $gte: startOfMonth }
    }).lean();

    // Group medications by date
    const groupedMedications = {};
    medications.forEach(med => {
      const start = new Date(Math.max(med.startDate, startOfMonth));
      const end = new Date(Math.min(med.endDate, endOfMonth));
      
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
        if (med.selectedDays[dayOfWeek]) {
          const dateStr = date.toISOString().split('T')[0];
          if (!groupedMedications[dateStr]) {
            groupedMedications[dateStr] = [];
          }
          groupedMedications[dateStr].push(med);
        }
      }
    });

    res.status(200).json({
      success: true,
      data: groupedMedications
    });

  } catch (error) {
    console.error('Error fetching monthly medications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly medications',
      error: error.message
    });
  }
};