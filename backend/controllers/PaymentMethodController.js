const mongoose = require('mongoose');
const PaymentMethod = require('../models/PaymentMethod');

exports.createPaymentMethod = async (req, res) => {
    try {
        const { userID, paymentMethod, cardDetails } = req.body;

        // Validate userID
        let validUserID;
        try {
            validUserID = new mongoose.Types.ObjectId(userID);
        } catch (idError) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid User ID format' 
            });
        }

        // Validate payment method
        const validPaymentMethods = ['Credit', 'Debit'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid payment method. Must be Credit or Debit' 
            });
        }

        // Validate card details
        const requiredFields = ['cardName', 'cardNumber', 'expiryDate', 'cvv'];
        const missingFields = requiredFields.filter(field => !cardDetails[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // Create new payment method document
        const newPaymentMethod = new PaymentMethod({
            userID: [validUserID],
            method: paymentMethod,
            cardNum: cardDetails.cardNumber,
            expDate: cardDetails.expiryDate,
            cvv: cardDetails.cvv,
            name: cardDetails.cardName
        });

        const savedPaymentMethod = await newPaymentMethod.save();

        return res.status(201).json({
            success: true,
            message: 'Payment method saved successfully',
            data: savedPaymentMethod
        });
    } catch (error) {
        console.error('Payment method save error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Error saving payment method', 
            error: error.message 
        });
    }
};