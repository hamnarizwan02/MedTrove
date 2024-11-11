const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    drug_name: String,
    medical_condition: String,
    side_effects: String,
    generic_name: String
}, { collection: 'Med_Info', versionKey: false });
  
const Medicine = mongoose.model('Medicine', medicineSchema);