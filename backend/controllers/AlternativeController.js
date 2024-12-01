const Alternative = require('../models/alternative');

exports.getAlternatives = async (req, res) => {
  const searchTerm = req.params.name.toLowerCase();
  try {
    const alternatives = await Alternative.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { substitute0: { $regex: searchTerm, $options: 'i' } },
        { substitute1: { $regex: searchTerm, $options: 'i' } },
        { substitute2: { $regex: searchTerm, $options: 'i' } },
        { substitute3: { $regex: searchTerm, $options: 'i' } },
      ]
    });

    const alternativeSet = new Set();
    alternatives.forEach(alt => {
      if (alt.name) alternativeSet.add(alt.name.trim());
      if (alt.substitute0) alternativeSet.add(alt.substitute0.trim());
      if (alt.substitute1) alternativeSet.add(alt.substitute1.trim());
      if (alt.substitute2) alternativeSet.add(alt.substitute2.trim());
      if (alt.substitute3) alternativeSet.add(alt.substitute3.trim());
    });

    res.status(200).json(Array.from(alternativeSet));
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
