const CurrentUser = require('../models/currentUser');

exports.getCurrentUser = async (req, res) => {
  try {
    const currentUser = await CurrentUser.findOne({})
      .populate('currentuserid')
      .lean();
    
    console.log('Fetched current user:', currentUser);

    if (!currentUser || !currentUser.currentuserid || currentUser.currentuserid.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No user currently logged in' 
      });
    }

    const userData = currentUser.currentuserid[0];
    
    // Send all necessary user data in one response
    const response = {
      success: true,
      userID: userData._id.toString(),
      emailaddress: userData.emailaddress,
      password: userData.password,
      phonenumber: userData.phonenumber,
      avatar: userData.avatar
    };

    console.log('Sending response:', response);
    return res.status(200).json(response);

  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Add error handling middleware
exports.errorHandler = (err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};


// Fetch user ID for internal use
exports.fetchCurrentUserID = async () => {
  const currentUser = await CurrentUser.findOne({});
  if (!currentUser || !currentUser.currentuserid[0]) {
    throw new Error('No user currently logged in');
  }
  return currentUser.currentuserid[0];
};

//logout functionality
exports.logoutCurrentUser = async (req, res) => {
  try 
  {
    await CurrentUser.deleteMany({});
    res.status(200).json({ message: 'Logged out successfully' });
  } 
  catch (error) 
  {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Server error during logout', error: error.message });
  }
}


// Fetch the current user
// exports.getCurrentUser = async (req, res) => {
//   try {
//     const currentUser = await CurrentUser.findOne({});
//     if (!currentUser || !currentUser.currentuserid[0]) {
//       return res.status(404).json({ message: 'No user currently logged in' });
//     }
//     res.json({ userID: currentUser.currentuserid[0] });
//     console.log(currentUser.currentuserid[0])
//   } catch (error) {
//     console.error('Error fetching current user:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };