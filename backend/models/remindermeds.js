// const mongoose = require('mongoose');

// const medicationSchema = new mongoose.Schema({
//   userId: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   name: {
//     type: String,
//     required: true
//   },
//   dosage: {
//     notes: String,
//     amount: Number,
//     unit: String
//   },
//   frequency: {
//     type: Number,
//     required: true
//   },
//   times_a_day: {
//     type: Number,
//     required: true
//   },
//   selectedDays: {
//     Sun: Boolean,
//     Mon: Boolean,
//     Tue: Boolean,
//     Wed: Boolean,
//     Thu: Boolean,
//     Fri: Boolean,
//     Sat: Boolean
//   },
//   duration: {
//     type: Number,
//     required: true
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   endDate: {
//     type: Date,
//     required: true
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true,
//   collection: 'remindermeds'
// });

// module.exports = mongoose.model('Medication', medicationSchema);

const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  name: {
    type: String,
    required: true
  },
  dosage: {
    notes: String,
    amount: Number,
    unit: String
  },
  frequency: {
    type: Number,
    required: true
  },
  times_a_day: {
    type: Number,
    required: true
  },
  times: [{
    hour: Number,
    minute: Number,
    id: String
  }],
  selectedDays: {
    Sun: Boolean,
    Mon: Boolean,
    Tue: Boolean,
    Wed: Boolean,
    Thu: Boolean,
    Fri: Boolean,
    Sat: Boolean
  },
  duration: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notificationIds: [{
    type: String
  }]
}, {
  timestamps: true,
  collection: 'remindermeds'
});

module.exports = mongoose.model('Medication', medicationSchema);