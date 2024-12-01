const mongoose = require('mongoose');

const pakPriceSchema = new mongoose.Schema({
  Title: { type: String, required: false },
  Company: { type: String, required: false },
  Pack: { type: String, required: false },
  Link: { type: String, required: false },
  Discounted_Price: { type: Number, required: false },
  Original_Price: { type: Number, required: false },
  reg_no: { type: Number, required: false },
  Company_Name: { type: String, required: false },
  Brand_Name: { type: String, required: false },
  Formulation: { type: String, required: false },
  Pack_Size: { type: String, required: false },
  MRP: { type: String, required: false }
}, { collection: 'PakPrices', versionKey: false });

module.exports = mongoose.model('PakPrice', pakPriceSchema);
