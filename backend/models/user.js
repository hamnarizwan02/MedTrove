const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    emailaddress: String, 
    password: String,
    phonenumber: Number
}, { collection: 'User', versionKey: false });

module.exports = mongoose.model('User', userSchema);
