const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    userID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    method: { 
        type: String, 
        required: true 
    },
    cardNum: { 
        type: String, 
        required: true 
    },
    expDate: { 
        type: String, 
        required: true 
    },
    cvv: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);