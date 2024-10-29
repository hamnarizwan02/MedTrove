const Medicine = require('../models/Medicine');

exports.getMedicineById = async (req,res) => {
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
}

exports.getMedicineByName = async (req, res) => {
  const { name } = req.params;
  try {
    const cleanedSearchTerm = name.trim().toLowerCase();
    
    // Try exact match first
    let medicine = await Medicine.findOne({
      drug_name: new RegExp(`^${cleanedSearchTerm}$`, 'i')
    });

    if (!medicine) {
      // If no exact match, search within compound names
      medicine = await Medicine.findOne({
        drug_name: new RegExp(`\\b${cleanedSearchTerm}\\b`, 'i')
      });
    }

    if (medicine) {
      const drugNames = medicine.drug_name.split('/').map(drug => drug.trim());
      const response = {
        ...medicine.toObject(),
        is_compound: drugNames.length > 1,
        compound_components: drugNames,
        note: drugNames.length > 1 ? `This is a compound medication containing multiple drugs.` : undefined
      };
      res.json(response);
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (err) {
    console.error('Error fetching medicine by name:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.checkMedicineExists = async (req, res) => {
  const { name } = req.params;
  try {
    const medicine = await Medicine.findOne({ drug_name: { $regex: new RegExp(name, 'i') } });
    res.json({ exists: !!medicine, id: medicine ? medicine._id : null });
  } catch (err) {
    console.error('Error checking medicine existence:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};