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


// Get user details by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details, excluding sensitive information
    res.json({
      emailaddress: user.emailaddress,
      phonenumber: user.phonenumber,
      avatar: user.avatar
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user avatar
exports.updateUserAvatar = async (req, res) => {
  try {
    const { userId, avatarId } = req.body;

    // Validate avatarId (assuming 0 and 1 are valid avatar IDs)
    if (avatarId !== 0 && avatarId !== 1) {
      return res.status(400).json({ message: 'Invalid avatar ID' });
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      { avatar: avatarId }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'Avatar updated successfully', 
      avatar: user.avatar 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId, email, password, phoneNumber } = req.body;

    const user = await User.findByIdAndUpdate(
      userId, 
      { 
        emailaddress: email, 
        password: password,
        phonenumber: phoneNumber 
      }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'Profile updated successfully', 
      user: {
        emailaddress: user.emailaddress,
        password: user.password,
        phonenumber: user.phonenumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};