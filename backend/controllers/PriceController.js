const PakPrice = require('../models/pakPrice');
const IndiaPrice = require('../models/indiaPrice');

exports.getPrice = async (req, res) => {
  const { name } = req.params;
  try {
    const priceData = await PakPrice.findOne({
      $or: [
        { Title: { $regex: new RegExp(name, 'i') } },
        { Brand_Name: { $regex: new RegExp(name, 'i') } }
      ]
    });
    if (priceData) {
      res.json({
        Title: priceData.Title || priceData.Brand_Name,
        Discounted_Price: priceData.Discounted_Price,
        Original_Price: priceData.Original_Price,
      });
    } else {
      const indiaPriceData = await IndiaPrice.findOne({ name: { $regex: new RegExp(name, 'i') } });
      const pkrPrice = indiaPriceData ? indiaPriceData["price(₹)"] * 3.5 : null;
      res.json({ price: pkrPrice ? `PKR ${pkrPrice.toFixed(2)}` : 'PKR 602.34' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
