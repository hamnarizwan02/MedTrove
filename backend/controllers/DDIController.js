const DrugInteraction = require('../models/ddi');
const mongoose = require('mongoose');  

exports.getInteraction = async (req, res) => {
  console.log("MongoDB Connection State:", mongoose.connection.readyState);
    console.log("ddiii");
    try {
      console.log('Received request to /api/check-interaction'); // Debugging: Endpoint hit
      
      const { drug1, drug2 } = req.body;
      console.log('Request body:', req.body); // Debugging: Log input drugs
  
      // Validate input
      if (!drug1 || !drug2) {
        console.warn('Missing drug names in the request body'); // Debugging: Missing input
        return res.status(400).json({ 
          message: 'Both drug1 and drug2 must be provided.' 
        });
      }
  
      console.log(`Searching for interaction between "${drug1}" and "${drug2}"`); // Debugging: Input drug names
  
      // Search for interaction in both directions
      const interaction = await DrugInteraction.findOne({
        $or: [
          { 
            drug1_name: { $regex: new RegExp(drug1, 'i') },
            drug2_name: { $regex: new RegExp(drug2, 'i') }
          },
          {
            drug1_name: { $regex: new RegExp(drug2, 'i') },
            drug2_name: { $regex: new RegExp(drug1, 'i') }
          }
        ]
      });
  
      console.log('Database query result:', interaction); // Debugging: Log the query result
  
      if (interaction) {
        console.log(`Interaction found: ${interaction}`); // Debugging: Interaction details
        res.json({
          found: true,
          interaction: {
            drug1: interaction.drug1_name,
            drug2: interaction.drug2_name,
            type: interaction.interaction_type
          }
        });
      } else {
        console.log(`No interaction found between "${drug1}" and "${drug2}"`); // Debugging: No interaction
        res.json({
          found: false,
          //message: "No known interaction found between these medications."
           message: "Sorry! Medication not found."
        });
      }
    } catch (error) {
      console.error('Error checking drug interaction:', error); // Debugging: Log the error
      res.status(500).json({ 
        message: 'Server error', 
        error: error.message 
      });
    }
}