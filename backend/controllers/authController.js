const User = require('../models/user');
const CurrentUser = require('../models/currentUser');

exports.signup = async (req, res) => {
  const { email, password, phone } = req.body;
  try {
    const existingUser = await User.findOne({ emailaddress: email.trim() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ emailaddress: email, password, phonenumber: phone });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ emailaddress: email.trim() });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     res.status(200).json({ message: 'Login successful!', user });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ emailaddress: email.trim() });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Clear any existing current user entries
    await CurrentUser.deleteMany({});

    // Create a new current user entry with the logged-in user's ID
    const newCurrentUser = new CurrentUser({
      currentuserid: [user._id]
    });
    await newCurrentUser.save();

    res.status(200).json({ 
      message: 'Login successful!', 
      userId: user._id 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};


// Update avatar for current user
exports.updateAvatar = async (req, res) => {
  try {
    console.log("Try hora hai")
    const { userID } = req.body; // User ID from the client
    const { avatar } = req.body; // Selected avatar number

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatar = avatar; // Update avatar field
    await user.save();

    res.status(200).json({ message: 'Avatar updated successfully', avatar });
  } catch (error) {
    console.error('Error updating profile picture:', error.response ? error.response.data : error.message);

    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
