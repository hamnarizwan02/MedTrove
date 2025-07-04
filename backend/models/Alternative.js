const mongoose = require('mongoose');

const alternativeSchema = new mongoose.Schema({
  name: String,
  substitute0: String,
  substitute1: String,
  substitute2: String,
  substitute3: String,
}, { collection: 'Alternative', versionKey: false });

module.exports = mongoose.model('Alternative', alternativeSchema);
