const mongoose = require('mongoose');

const drugInteractionSchema = new mongoose.Schema({
    drug1_id: String,
    drug2_id: String,
    drug1_name: String,
    drug2_name: String,
    interaction_type: String
}, { collection: 'DDI', versionKey: false });
  
module.exports = mongoose.model('DrugInteraction', drugInteractionSchema);