const mongoose = require('mongoose');

const addressInfoSchema = new mongoose.Schema({
    userID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    address: {
      street: { 
        type: String, 
        required: true 
      },
      city: { 
        type: String, 
        required: true 
      },
      postalCode: { 
        type: String, 
        required: true 
      },
      phone: { 
        type: String, 
        required: true 
      }
    },
    helpNeeded: { 
      type: Boolean, 
      default: false 
    }
  }, { 
    timestamps: true 
  });

module.exports = mongoose.model('AddressInfo', addressInfoSchema);