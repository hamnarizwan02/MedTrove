const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://i210603:hamna123@medtrove.r56y0tg.mongodb.net/medTrove', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    emailaddress: String, 
    password: String,
    phonenumber: Number
}, { collection: 'User', versionKey: false });

const User = mongoose.model('User', userSchema);

// POST route for user signup
app.post('/api/signup', async (req, res) => {
  const { email, password, phone } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ emailaddress: email.trim() });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }


  const newUser = new User({
    emailaddress: email, // Use the key defined in your schema
    password: password, 
    phonenumber: phone   // Use the key defined in your schema
  });
  
  console.log(email);
  console.log(phone);

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

app.post('/api/login', async (req, res) => {
  console.log('Request body:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  try {
    // Fetch user from the database
    console.log('Querying user with email:', email);

    const user = await User.findOne({ emailaddress: email.trim() });
    console.log('Fetched User:', user); // Debugging output

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials user not found' });
    }

    // Compare passwords
    console.log('Stored Password:', user.password); // Debugging output
    console.log('Provided Password:', password); // Debugging output

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful!', user });
  } catch (err) {
    console.error('Server Error:', err); // Log server errors
    return res.status(500).json({ msg: 'Server error', error: err });
  }
});

// -> MED INFO PAGE FUNCTIONALITY <-

// GET route for medicine information

const medicineSchema = new mongoose.Schema({
  drug_name: String,
  medical_condition: String,
  side_effects: String,
  generic_name: String
}, { collection: 'Med_Info', versionKey: false });

const Medicine = mongoose.model('Medicine', medicineSchema);


// app.get('/api/medicines/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//       const medicine = await Medicine.findById(id, 'drug_name medical_condition side_effects generic_name'); // Only select the required fields
//       if (!medicine) {
//           return res.status(404).json({ message: 'Medicine not found' });
//       }
//       res.status(200).json(medicine);
//   } catch (err) {
//       console.error('Error fetching medicine:', err);
//       res.status(500).json({ message: 'Server error', error: err });
//   }
// });

// GET route for medicine information
app.get('/api/medicines/:id', async (req, res) => {
  const { searchTerm } = req.query; // Get the search term from the query parameters

  try {
    // Use regular expression to search for matching drug names or medical conditions
  
    const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search
    console.log('Search term:', searchTerm);

    const medicines = await Medicine.findOne({
      drug_name: { $regex: searchRegex }
    }, 'drug_name medical_condition generic_name');
    //'drug_name medical_condition side_effects generic_name');


    // const medicines = await Medicine.find({
    //   $or: [
    //     { drug_name: { $regex: searchRegex } },
    //     { medical_condition: { $regex: searchRegex } }
    //   ]
    // }, 'drug_name medical_condition side_effects generic_name'); // Only select the required fields

    if (medicines.length === 0) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json(medicines);
  } catch (err) {
    console.error('Error fetching medicine:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// //GET medicine that has been searched 
// app.get('/api/medicines/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//       const medicine = await Medicine.findById(id, 'drug_name medical_condition side_effects generic_name'); // Only select the required fields
//       if (!medicine) {
//           return res.status(404).json({ message: 'Medicine not found' });
//       }
//       res.status(200).json(medicine);
//   } catch (err) {
//       console.error('Error fetching medicine:', err);
//       res.status(500).json({ message: 'Server error', error: err });
//   }
// });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});