const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    Medicine: [String],
    Quantity: [String]
}, { collection: 'Cart', versionKey: false });
  
module.exports = mongoose.model('Cart', cartSchema);