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

const medicineSchema = new mongoose.Schema({
  drug_name: String,
  medical_condition: String,
  side_effects: String,
  generic_name: String
}, { collection: 'Med_Info', versionKey: false });

const Medicine = mongoose.model('Medicine', medicineSchema);

// GET route for medicine information

// app.get('/api/medici/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//    // console.log(`Fetching medicine with id: ${id}`);
//     const medicine = await Medicine.findById(id, 'drug_name medical_condition side_effects generic_name');
//     if (!medicine) {
//       console.log(`Medicine with id ${id} not found`);
//       return res.status(404).json({ message: 'Medicine not found' });
//     }
//     //console.log(`Medicine found:`, medicine);
//     res.status(200).json(medicine);
//   } catch (err) {
//     console.error('Error fetching medicine:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

app.get('/api/medici/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to fetch medicine with id: ${id}`);
    const medicine = await Medicine.findById(id);
    
    if (!medicine) {
      console.log(`Medicine with id ${id} not found`);
      return res.status(404).json({ message: 'Medicine not found' });
    }
    
    console.log(`Medicine found:`, medicine);
    res.status(200).json(medicine);
  } catch (err) {
    console.error('Error fetching medicine:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// -> ALIZA SEARCH THINGY <- 
app.get('/api/medicines/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params; // Get the search term from the query parameters
  console.log('Search term:', searchTerm);
  
  try {
    // Use regular expression to search for matching drug names or medical conditions
  
    const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search
    

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


// -> ALTERNATIVES FUNCTIONALITY <-

const alternativeSchema = new mongoose.Schema({
  name: String,
  substitute0: String,
  substitute1: String,
  substitute2: String,
  substitute3: String,
}, { collection: 'Alternative', versionKey: false });

const Alternative = mongoose.model('Alternative', alternativeSchema);

//OG
app.get('/api/alternatives/:name', async (req, res) => {
  const { name } = req.params;
  console.log('Received search request for:', name);

  // Convert the name to lowercase for case-insensitive matching
  const searchTerm = name.toLowerCase();
  console.log('Converted search term:', searchTerm);

  try {
    console.log('Executing database query...');
    // Find all entries in the alternatives table that match the medicine name or its substitutes
    const alternatives = await Alternative.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { substitute0: { $regex: searchTerm, $options: 'i' } },
        { substitute1: { $regex: searchTerm, $options: 'i' } },
        { substitute2: { $regex: searchTerm, $options: 'i' } },
        { substitute3: { $regex: searchTerm, $options: 'i' } },
      ]
    });

    console.log('Query completed. Number of results:', alternatives.length);
    console.log('Raw query results:', JSON.stringify(alternatives, null, 2));

    // Collect unique alternative names from the results
    const alternativeSet = new Set();
    alternatives.forEach(alt => {
      // Add all relevant fields to the set
      if (alt.name) alternativeSet.add(alt.name.trim());
      if (alt.substitute0) alternativeSet.add(alt.substitute0.trim());
      if (alt.substitute1) alternativeSet.add(alt.substitute1.trim());
      if (alt.substitute2) alternativeSet.add(alt.substitute2.trim());
      if (alt.substitute3) alternativeSet.add(alt.substitute3.trim());
    });

    const alternativeArray = Array.from(alternativeSet);
    console.log('Final processed alternatives:', alternativeArray);

    if (alternativeArray.length === 0) {
      console.log('No alternatives found after processing');
      return res.status(404).json({ message: 'No alternatives found for this medicine' });
    }

    console.log('Sending response with alternatives');
    res.status(200).json(alternativeArray);
  } catch (err) {
    console.error('Error in alternatives search:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});





// OTHER ONE 
// Update the medicine search endpoint
// app.get('/api/medicines/:searchTerm', async (req, res) => {
//   const { searchTerm } = req.params;
//   console.log('Search term:', searchTerm);
  
//   try {
//     // Split the search term into words
//     const searchWords = searchTerm.toLowerCase().split(/\s+/);
//     console.log('Search words:', searchWords);
    
//     // Create a regex pattern that matches any of the words
//     const regexPattern = searchWords.map(word => `(?=.*${word})`).join('');
//     const searchRegex = new RegExp(regexPattern, 'i');
//     console.log('Search regex:', searchRegex);

//     const medicines = await Medicine.find({
//       $or: [
//         { drug_name: { $regex: searchRegex } },
//         { generic_name: { $regex: searchRegex } }
//       ]
//     }, 'drug_name medical_condition side_effects generic_name');

//     console.log('Medicines found:', medicines.length);

//     if (medicines.length === 0) {
//       console.log('No medicines found');
//       return res.status(404).json({ message: 'Medicine not found' });
//     }

//     const formattedMedicines = medicines.map(medicine => ({
//       id: medicine._id.toString(),
//       drug_name: medicine.drug_name,
//       medical_condition: medicine.medical_condition,
//       side_effects: medicine.side_effects,
//       generic_name: medicine.generic_name
//     }));

//     console.log('Formatted medicines:', formattedMedicines);

//     res.status(200).json(formattedMedicines);
//   } catch (err) {
//     console.error('Error fetching medicine:', err);
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// });

// Update the alternatives search endpoint
// app.get('/api/alternatives/:name', async (req, res) => {
//   const { name } = req.params;
//   console.log('Received search request for:', name);

//   const searchWords = name.toLowerCase().split(/\s+/);
//   console.log('Search words:', searchWords);

//   try {
//     console.log('Executing database query...');
//     const alternatives = await Alternative.find({
//       $or: [
//         { name: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//         { substitute0: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//         { substitute1: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//         { substitute2: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//         { substitute3: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//       ]
//     });

//     console.log('Query completed. Number of results:', alternatives.length);

//     const validAlternatives = new Set();

//     for (const alt of alternatives) {
//       const checkAndAddMedicine = async (medicineName) => {
//         if (medicineName) {
//           const exists = await Medicine.findOne({ 
//             drug_name: { $in: medicineName.toLowerCase().split(/\s+/).map(word => new RegExp(word, 'i')) } 
//           });
//           if (exists) {
//             validAlternatives.add(medicineName.trim());
//           }
//         }
//       };

//       await checkAndAddMedicine(alt.name);
//       await checkAndAddMedicine(alt.substitute0);
//       await checkAndAddMedicine(alt.substitute1);
//       await checkAndAddMedicine(alt.substitute2);
//       await checkAndAddMedicine(alt.substitute3);
//     }

//     const alternativeArray = Array.from(validAlternatives);
//     console.log('Final processed alternatives:', alternativeArray);

//     if (alternativeArray.length === 0) {
//       console.log('No valid alternatives found after processing');
//       return res.status(404).json({ message: 'No valid alternatives found for this medicine' });
//     }

//     console.log('Sending response with valid alternatives');
//     res.status(200).json(alternativeArray);
//   } catch (err) {
//     console.error('Error in alternatives search:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });


// app.get('/api/alternatives/:name', async (req, res) => {
//   const { name } = req.params;
//   console.log('Received search request for:', name);

//   const searchWords = name.toLowerCase().split(/\s+/);
//   console.log('Search words:', searchWords);

//   try {
//     console.log('Executing database query...');
//     const alternatives = await Alternative.find({
//       $or: [
//         { name: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//         { substitute0: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//         { substitute1: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//         { substitute2: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//         { substitute3: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
//       ]
//     });

//     console.log('Query completed. Number of results:', alternatives.length);

//     const validAlternatives = [];

//     for (const alt of alternatives) {
//       const checkAndAddMedicine = async (medicineName) => {
//         if (medicineName) {
//           const medicine = await Medicine.findOne({ 
//             drug_name: { $in: medicineName.toLowerCase().split(/\s+/).map(word => new RegExp(word, 'i')) } 
//           });
//           if (medicine) {
//             const priceData = await fetchPrice(medicineName);
//             validAlternatives.push({
//               name: medicineName.trim(),
//               side_effects: medicine.side_effects,
//               price: priceData.price || 'Price not available'
//             });
//           }
//         }
//       };

//       await checkAndAddMedicine(alt.name);
//       await checkAndAddMedicine(alt.substitute0);
//       await checkAndAddMedicine(alt.substitute1);
//       await checkAndAddMedicine(alt.substitute2);
//       await checkAndAddMedicine(alt.substitute3);
//     }

//     console.log('Final processed alternatives:', validAlternatives);

//     if (validAlternatives.length === 0) {
//       console.log('No valid alternatives found after processing');
//       return res.status(404).json({ message: 'No valid alternatives found for this medicine' });
//     }

//     console.log('Sending response with valid alternatives');
//     res.status(200).json(validAlternatives);
//   } catch (err) {
//     console.error('Error in alternatives search:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// Helper function to fetch price
// async function fetchPrice(medicineName) {
//   try {
//     const priceData = await PakPrice.findOne({ 
//       $or: [
//         { Title: { $regex: new RegExp(medicineName, 'i') } },
//         { Brand_Name: { $regex: new RegExp(medicineName, 'i') } }
//       ]
//     });

//     if (priceData) {
//       return {
//         price: priceData.MRP || priceData.Original_Price || 'Price not available'
//       };
//     }

//     const indiaPriceData = await IndiaPrice.findOne({ name: { $regex: new RegExp(medicineName, 'i') } });
//     if (indiaPriceData) {
//       const pkrPrice = indiaPriceData["price(₹)"] * 3.5; // Assuming conversion
//       return { price: `PKR ${pkrPrice.toFixed(2)}` };
//     }

//     return { price: 'PKR 602.34' }; // Default price
//   } catch (err) {
//     console.error('Error fetching price:', err);
//     return { price: 'Price not available' };
//   }
// }


app.get('/api/check-alternatives', async (req, res) => {
  try {
    const allAlternatives = await Alternative.find({});
    console.log('All alternatives in database:', JSON.stringify(allAlternatives, null, 2));
    res.json({ count: allAlternatives.length, sample: allAlternatives.slice(0, 5) });
  } catch (err) {
    console.error('Error checking alternatives:', err);
    res.status(500).json({ message: 'Error checking alternatives', error: err.message });
  }
});

// Schema for PakPrices
// const pakPriceSchema = new mongoose.Schema({
//   "Brand Name": String,
//   "MRP": String
// }, { collection: 'PakPrices', versionKey: false });

//const PakPrice = mongoose.model('PakPrice', pakPriceSchema);

// Schema for PakPrices
const pakPriceSchema = new mongoose.Schema({
  Title: { type: String, required: false },
  Company: { type: String, required: false },
  Pack: { type: String, required: false },
  Link: { type: String, required: false },
  Discounted_Price: { type: Number, required: false },
  Original_Price: { type: Number, required: false },
  reg_no: { type: Number, required: false },
  Company_Name: { type: String, required: false },
  Brand_Name: { type: String, required: false },
  Formulation: { type: String, required: false },
  Pack_Size: { type: String, required: false },
  MRP: { type: String, required: false }
}, { collection: 'PakPrices', versionKey: false });

const PakPrice = mongoose.model('PakPrice', pakPriceSchema);

// Schema for IndiaPrices
const indiaPriceSchema = new mongoose.Schema({
  name: String,
  "price(₹)": Number
}, { collection: 'IndiaPrices', versionKey: false });

const IndiaPrice = mongoose.model('IndiaPrice', indiaPriceSchema);

// GET route to fetch price based on medicine name
// app.get('/api/price/:name', async (req, res) => {
//   const { name } = req.params;

//   try {
//     // Check PakPrices first
//     let price = await PakPrice.findOne({ "Brand Name": { $regex: new RegExp(name, 'i') } });
//     if (price) {
//       return res.json({ price: price.MRP });
//     }

//     // If not found in PakPrices, check IndiaPrices
//     price = await IndiaPrice.findOne({ name: { $regex: new RegExp(name, 'i') } });
//     if (price) {
//       // Convert to PKR (you might want to use a real conversion rate)
//       const pkrPrice = price["price(₹)"] * 3.5; // Assuming 1 INR = 3.5 PKR
//       return res.json({ price: `PKR ${pkrPrice.toFixed(2)}` });
//     }

//     // If not found in either, return default price
//     return res.json({ price: 'PKR 12345' });
//   } catch (err) {
//     console.error('Error fetching price:', err);
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// });

// GET route to fetch price based on medicine name
app.get('/api/price/:name', async (req, res) => {
  const { name } = req.params;

  try {
    // Check PakPrices for matches
    const priceData = await PakPrice.findOne({ 
      $or: [
        { Title: { $regex: new RegExp(name, 'i') } },
        { Brand_Name: { $regex: new RegExp(name, 'i') } }
      ]
    });

    if (priceData) {
      // Prepare response object
      const responseData = {
        Title: priceData.Title || priceData.Brand_Name,
        Company: priceData.Company || priceData.Company_Name,
        Pack: priceData.Pack || priceData.Pack_Size,
        Link: priceData.Link,
        Discounted_Price: priceData.Discounted_Price,
        Original_Price: priceData.Original_Price,
        MRP: priceData.MRP
      };
      
      return res.json(responseData);
    }

    // If not found in PakPrices, check IndiaPrices (as before)
    const indiaPriceData = await IndiaPrice.findOne({ name: { $regex: new RegExp(name, 'i') } });

    if (indiaPriceData) {
      const pkrPrice = indiaPriceData["price(₹)"] * 3.5; // Assuming conversion
      return res.json({ price: `PKR ${pkrPrice.toFixed(2)}` });
    }

    // Return default price if not found
    return res.json({ price: 'PKR 602.34' });
  } catch (err) {
    console.error('Error fetching price:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.get('/api/medicine-exists/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const medicine = await Medicine.findOne({ drug_name: { $regex: new RegExp(name, 'i') } });
    res.json({ exists: !!medicine, id: medicine ? medicine._id : null });
  } catch (err) {
    console.error('Error checking medicine existence:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//check substring
// app.get('/api/medicine-exists/:name', async (req, res) => {
//   const { name } = req.params;
//   try {
//     // Split the name into words
//     const words = name.split(' ');
    
//     // Create a regex pattern that matches any of the words
//     const regexPattern = words.map(word => `(?=.*${word})`).join('');
//     const regex = new RegExp(regexPattern, 'i');

//     // Search for medicines where the drug_name contains all the words in any order
//     const medicine = await Medicine.findOne({ drug_name: { $regex: regex } });

//     if (medicine) {
//       res.json({ exists: true, id: medicine._id, name: medicine.drug_name });
//     } else {
//       // If no exact match, try to find a partial match
//       const partialMatch = await Medicine.findOne({ 
//         drug_name: { $regex: new RegExp(words[0], 'i') } 
//       });

//       if (partialMatch) {
//         res.json({ exists: true, id: partialMatch._id, name: partialMatch.drug_name, partialMatch: true });
//       } else {
//         res.json({ exists: false, id: null, name: null });
//       }
//     }
//   } catch (err) {
//     console.error('Error checking medicine existence:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



app.get('/api/medicine-by-name/:name', async (req, res) => {
  const { name } = req.params;
  try {
    console.log('Searching for:', name);
    
    // Clean and prepare the search term
    const cleanedSearchTerm = name.trim().toLowerCase();
    
    // First, try to find an exact match
    let medicine = await Medicine.findOne({
      drug_name: new RegExp(`^${cleanedSearchTerm}$`, 'i')
    });

    if (medicine) {
      // Exact match found
      return res.json(medicine);
    }

    // If no exact match, search for the term within compound names
    medicine = await Medicine.findOne({
      drug_name: new RegExp(`\\b${cleanedSearchTerm}\\b`, 'i')
    });

    if (medicine) {
      // Match found within a compound name
      const drugNames = medicine.drug_name.split('/').map(drug => drug.trim());
      const matchedDrug = drugNames.find(drug => 
        drug.toLowerCase() === cleanedSearchTerm
      );

      if (matchedDrug) {
        // Create a modified response focusing on the matched drug
        const response = {
          ...medicine.toObject(),
          matched_drug_name: matchedDrug,
          original_compound: medicine.drug_name,
          is_compound: true,
          compound_components: drugNames,
          note: `This drug is part of a compound medication.`
        };
        return res.json(response);
      } else {
        // If somehow the matched term is not in the split array, return the whole compound
        return res.json({
          ...medicine.toObject(),
          is_compound: true,
          compound_components: drugNames,
          note: `This is a compound medication containing multiple drugs.`
        });
      }
    }

    // If still no match found
    return res.status(404).json({ message: 'Medicine not found' });

  } catch (err) {
    
    console.error('Error fetching medicine by name:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});