const CurrentUser = require('../models/currentUser');

// Fetch the current user
exports.getCurrentUser = async (req, res) => {
  try {
    const currentUser = await CurrentUser.findOne({});
    if (!currentUser || !currentUser.currentuserid[0]) {
      return res.status(404).json({ message: 'No user currently logged in' });
    }
    res.json({ userID: currentUser.currentuserid[0] });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch user ID for internal use
exports.fetchCurrentUserID = async () => {
  const currentUser = await CurrentUser.findOne({});
  if (!currentUser || !currentUser.currentuserid[0]) {
    throw new Error('No user currently logged in');
  }
  return currentUser.currentuserid[0];
};
