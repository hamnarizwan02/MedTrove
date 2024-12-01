const mongoose = require('mongoose');

const currentUserSchema = new mongoose.Schema({
    currentuserid: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }, { collection: 'CurrentUserLoggedIn', versionKey: false });
  
module.exports = mongoose.model('CurrentUser', currentUserSchema);