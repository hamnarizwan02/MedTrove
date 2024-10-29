const Alternative = require('../models/Alternative');
const Medicine = require('../models/Medicine');

exports.getAlternatives = async (req, res) => {
  const { name } = req.params;
  try {
    const searchWords = name.toLowerCase().split(/\s+/);
    const alternatives = await Alternative.find({
      $or: [
        { name: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
        { substitute0: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
        { substitute1: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
        { substitute2: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
        { substitute3: { $in: searchWords.map(word => new RegExp(word, 'i')) } },
      ]
    });

    const validAlternatives = new Set();

    for (const alt of alternatives) {
      const checkAndAddMedicine = async (medicineName) => {
        if (medicineName) {
          const exists = await Medicine.findOne({ 
            drug_name: { $regex: new RegExp(medicineName, 'i') } 
          });
          if (exists) {
            validAlternatives.add(medicineName.trim());
          }
        }
      };

      await checkAndAddMedicine(alt.name);
      await checkAndAddMedicine(alt.substitute0);
      await checkAndAddMedicine(alt.substitute1);
      await checkAndAddMedicine(alt.substitute2);
      await checkAndAddMedicine(alt.substitute3);
    }

    const alternativeArray = Array.from(validAlternatives);
    console.log(alternativeArray);

    if (alternativeArray.length === 0) {
      return res.status(404).json({ message: 'No valid alternatives found for this medicine' });
    }

    res.status(200).json(alternativeArray);
  } catch (err) {
    console.error('Error in alternatives search:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};