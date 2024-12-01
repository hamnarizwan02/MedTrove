const mongoose = require('mongoose');

const indiaPriceSchema = new mongoose.Schema({
  name: String,
  "price(₹)": Number
}, { collection: 'IndiaPrices', versionKey: false });

module.exports = mongoose.model('IndiaPrice', indiaPriceSchema);
