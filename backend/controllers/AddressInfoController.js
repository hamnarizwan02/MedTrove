const AddressInfo = require('../models/AddressInfo');

// exports.createAddressInfo = async (req, res) => {
//     try {
//       console.log('Full request body:', req.body);
  
//       const { userID, address } = req.body;
  
//       // Validate input
//       if (!userID) {
//         console.error('No User ID provided');
//         return res.status(400).json({ 
//           success: false,
//           message: 'User ID is required' 
//         });
//       }
  
//       if (!address) {
//         console.error('No address object provided');
//         return res.status(400).json({ 
//           success: false,
//           message: 'Address information is required' 
//         });
//       }
  
//       // Detailed field validation
//       const requiredFields = ['street', 'city', 'postalCode', 'phone'];
//       const missingFields = requiredFields.filter(field => !address[field]);
  
//       if (missingFields.length > 0) {
//         console.error('Missing fields:', missingFields);
//         return res.status(400).json({ 
//           success: false,
//           message: `Missing required fields: ${missingFields.join(', ')}` 
//         });
//       }
  
//       // Attempt to create and save document
//       try {
//         const newAddressInfo = new AddressInfo({
//           userID: [userID],
//           address: {
//             street: address.street,
//             city: address.city,
//             postalCode: address.postalCode,
//             phone: address.phone
//           },
//           helpNeeded: req.body.helpNeeded || false
//         });
  
//         const savedAddressInfo = await newAddressInfo.save();
  
//         console.log('Address info saved successfully:', savedAddressInfo);
  
//         return res.status(201).json({
//           success: true,
//           message: 'Address information saved successfully',
//           data: savedAddressInfo
//         });
//       } catch (saveError) {
//         console.error('Save error details:', saveError);
//         return res.status(500).json({ 
//           success: false,
//           message: 'Error saving address information', 
//           error: saveError.message 
//         });
//       }
//     } catch (error) {
//       console.error('Unexpected error:', error);
//       return res.status(500).json({ 
//         success: false,
//         message: 'Unexpected error occurred', 
//         error: error.message 
//       });
//     }
//   };

  // Get address by user ID

  exports.createAddressInfo = async (req, res) => {
    try {
        console.log('Received request to create address info');
        console.log('Full request body:', JSON.stringify(req.body, null, 2));

        const { userID, address } = req.body;

        // Validate input
        if (!userID) {
            console.error('Validation Error: No User ID provided');
            return res.status(400).json({ 
                success: false,
                message: 'User ID is required' 
            });
        }

        if (!address) {
            console.error('Validation Error: No address object provided');
            return res.status(400).json({ 
                success: false,
                message: 'Address information is required' 
            });
        }

        console.log('Extracted userID:', userID);
        console.log('Extracted address:', JSON.stringify(address, null, 2));

        // Detailed field validation
        const requiredFields = ['street', 'city', 'postalCode', 'phone'];
        const missingFields = requiredFields.filter(field => !address[field]);

        if (missingFields.length > 0) {
            console.error('Validation Error: Missing fields:', missingFields);
            return res.status(400).json({ 
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        console.log('Validation passed, proceeding to save in DB...');

        // Attempt to create and save document
        try {
            const newAddressInfo = new AddressInfo({
                userID: [userID],
                address: {
                    street: address.street,
                    city: address.city,
                    postalCode: address.postalCode,
                    phone: address.phone
                },
                helpNeeded: req.body.helpNeeded || false
            });

            console.log('Prepared AddressInfo object:', JSON.stringify(newAddressInfo, null, 2));

            const savedAddressInfo = await newAddressInfo.save();

            console.log('Address info saved successfully:', JSON.stringify(savedAddressInfo, null, 2));

            return res.status(201).json({
                success: true,
                message: 'Address information saved successfully',
                data: savedAddressInfo
            });
        } catch (saveError) {
            console.error('Database Save Error:', saveError);
            return res.status(500).json({ 
                success: false,
                message: 'Error saving address information', 
                error: saveError.message 
            });
        }
    } catch (error) {
        console.error('Unexpected Error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Unexpected error occurred', 
            error: error.message 
        });
    }
};


exports.getAddressByUserId = async (req, res) => {
  try {
      const { userID } = req.params;
      console.log(`Fetching latest address for userID: ${userID}`);

      const latestAddress = await AddressInfo.findOne({ userID })
          .sort({ createdAt: -1 })  // Sort by latest createdAt
          .exec();

      if (!latestAddress) {
          console.log('No address found for this user.');
          return res.status(404).json({ 
              success: false, 
              message: 'No address found for this user' 
          });
      }

      console.log('Latest address retrieved:', latestAddress);
      return res.status(200).json({ success: true, address: latestAddress });

  } catch (error) {
      console.error('Error fetching address:', error);
      return res.status(500).json({ 
          success: false, 
          message: 'Error retrieving address', 
          error: error.message 
      });
  }
};
