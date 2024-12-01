const Medicine = require('../models/medicine'); 

// Get medicine by ID
exports.getMedicineById = async (req, res) => {
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
};

// Search for medicines by name 
exports.searchMedicines = async (req, res) => {
  const { searchTerm } = req.params; // Get the search term from params
  console.log('Search term:', searchTerm);

  try {
    const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search
    const medicines = await Medicine.find(
      { drug_name: { $regex: searchRegex } },
      'drug_name medical_condition generic_name'
    );

    if (!medicines || medicines.length === 0) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json(medicines);
  } catch (err) {
    console.error('Error fetching medicine:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.searchMedicinesByName = async (req, res) => {
//app.get('/api/medicine-by-name/:name', async (req, res) => {
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
}
