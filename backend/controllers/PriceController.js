const PakPrice = require('../models/PakPrice');
const IndiaPrice = require('../models/IndiaPrice');

exports.getPriceByName = async (req, res) => {
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

    // If not found in PakPrices, check IndiaPrices
    const indiaPriceData = await IndiaPrice.findOne({ name: { $regex: new RegExp(name, 'i') } });

    if (indiaPriceData) {
      const pkrPrice = indiaPriceData["price(₹)"] * 3.5; // Assuming conversion
      return res.json({ price: `PKR ${pkrPrice.toFixed(2)}` });
    }

    // Return default price if not found
    return res.json({ price: 'PKR 602.34' });
  } catch (err) {
    console.error('Error fetching price:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};