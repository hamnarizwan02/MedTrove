const User = require('../models/user');

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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ emailaddress: email.trim() });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful!', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
