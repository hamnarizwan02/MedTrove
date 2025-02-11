// const Cart = require('../models/cart');
// const CurrentUser = require('../models/currentUser');
// const { fetchCurrentUserID } = require('../controllers/CurrentUserController');

// // Get current user's cart
// // exports.getCartCurrent = async (req, res) => {
// //     try {
// //       // Get current user
// //       const currentUser = await CurrentUser.findOne({});
// //       if (!currentUser || !currentUser.currentuserid[0]) {
// //         return res.status(404).json({ message: 'No user currently logged in' });
// //       }
  
// //       // Get cart for current user
// //       const cart = await Cart.findOne({ userID: currentUser.currentuserid[0] });
// //       if (!cart) {
// //         return res.status(404).json({ message: 'Cart not found' });
// //       }
  
// //       res.json(cart);
// //     } catch (error) {
// //       console.error('Error fetching cart:', error);
// //       res.status(500).json({ message: 'Server error', error: error.message });
// //     }
// // }

// // Fetch cart for the current user
// exports.getCartForCurrentUser = async (req, res) => {
//     try {
//       const userID = await fetchCurrentUserID(); // Use the helper from CurrentUserController
//       const cart = await Cart.findOne({ userID });
//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }
//       res.json(cart);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// exports.AddCart = async (req, res) => {
//     try {
//       const { medicine, quantity } = req.body;
      
//       // Get current user
//       const currentUser = await CurrentUser.findOne({});
//       if (!currentUser || !currentUser.currentuserid[0]) {
//         return res.status(404).json({ message: 'No user currently logged in' });
//       }
  
//       // Find or create cart for user
//       let cart = await Cart.findOne({ userID: currentUser.currentuserid[0] });
      
//       if (!cart) {
//         cart = new Cart({
//           userID: [currentUser.currentuserid[0]],
//           Medicine: [medicine],
//           Quantity: [quantity.toString()]
//         });
//       } else {
//         // Check if medicine already exists in cart
//         const medicineIndex = cart.Medicine.indexOf(medicine);
//         if (medicineIndex !== -1) {
//           // Update quantity if medicine exists
//           cart.Quantity[medicineIndex] = (parseInt(cart.Quantity[medicineIndex]) + parseInt(quantity)).toString();
//         } else {
//           // Add new medicine if it doesn't exist
//           cart.Medicine.push(medicine);
//           cart.Quantity.push(quantity.toString());
//         }
//       }
  
//       await cart.save();
//       res.status(200).json({ message: 'Item added to cart successfully', cart });
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
// }

// exports.RemoveFromCart = async (req, res) => {
//     try {
//       const { medicine } = req.params;
      
//       // Get current user
//       const currentUser = await CurrentUser.findOne({});
//       if (!currentUser || !currentUser.currentuserid[0]) {
//         return res.status(404).json({ message: 'No user currently logged in' });
//       }
  
//       // Find cart and remove item
//       const cart = await Cart.findOne({ userID: currentUser.currentuserid[0] });
//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }
  
//       const medicineIndex = cart.Medicine.indexOf(medicine);
//       if (medicineIndex !== -1) {
//         cart.Medicine.splice(medicineIndex, 1);
//         cart.Quantity.splice(medicineIndex, 1);
//         await cart.save();
//       }
  
//       res.json({ message: 'Item removed from cart successfully', cart });
//     } catch (error) {
//       console.error('Error removing from cart:', error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
// }


// exports.UpdateCart = async (req, res) => {
//     try {
//       const { medicine, quantity } = req.body;
  
//       // Ensure quantity is handled as a number throughout the operation
//       const numericQuantity = parseInt(quantity, 10);
      
//       if (!medicine || isNaN(numericQuantity) || numericQuantity < 0) {
//         return res.status(400).json({ 
//           message: 'Invalid input. Medicine name and non-negative quantity required.' 
//         });
//       }
  
//       const currentUser = await CurrentUser.findOne({});
//       if (!currentUser || !currentUser.currentuserid[0]) {
//         return res.status(404).json({ message: 'No user currently logged in' });
//       }
  
//       const cart = await Cart.findOne({ userID: currentUser.currentuserid[0] });
//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }
  
//       const medicineIndex = cart.Medicine.indexOf(medicine);
//       if (medicineIndex === -1) {
//         return res.status(404).json({ 
//           message: 'Medicine not found in cart' 
//         });
//       }
  
//       // Store the quantity as a string, but ensure it's converted from a number
//       cart.Quantity[medicineIndex] = numericQuantity.toString();
  
//       await cart.save();
  
//       res.status(200).json({ 
//         message: 'Cart updated successfully', 
//         cart 
//       });
  
//     } catch (error) {
//       console.error('Error updating cart:', error);
//       res.status(500).json({ 
//         message: 'Server error', 
//         error: error.message 
//       });
//     }
// }

//to insert total as well
const Cart = require('../models/cart');
const CurrentUser = require('../models/currentUser');
const { fetchCurrentUserID } = require('../controllers/CurrentUserController');

exports.getCartForCurrentUser = async (req, res) => {
    try {
      const userID = await fetchCurrentUserID();
      const cart = await Cart.findOne({ userID });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// exports.AddCart = async (req, res) => {
//   try {
//     const { medicine, quantity, total } = req.body;
    
//     // Validate required fields
//     if (!medicine || !quantity) {
//       return res.status(400).json({ 
//         message: 'Medicine and quantity are required fields'
//       });
//     }

//     // Parse and validate quantity
//     const numericQuantity = parseInt(quantity, 10);
//     if (isNaN(numericQuantity) || numericQuantity < 1) {
//       return res.status(400).json({ 
//         message: 'Quantity must be a positive number'
//       });
//     }

//     // Validate and format total
//     const formattedTotal = total ? total.toString() : '0';
    
//     const currentUser = await CurrentUser.findOne({});
//     if (!currentUser || !currentUser.currentuserid[0]) {
//       return res.status(404).json({ message: 'No user currently logged in' });
//     }

//     let cart = await Cart.findOne({ userID: currentUser.currentuserid[0] });
    
//     if (!cart) {
//       // Create new cart
//       cart = new Cart({
//         userID: [currentUser.currentuserid[0]],
//         Medicine: [medicine],
//         Quantity: [numericQuantity.toString()],
//         Total: formattedTotal
//       });
//     } else {
//       // Update existing cart
//       const medicineIndex = cart.Medicine.indexOf(medicine);
//       if (medicineIndex !== -1) {
//         // Update existing item
//         const newQuantity = (parseInt(cart.Quantity[medicineIndex]) + numericQuantity);
//         cart.Quantity[medicineIndex] = newQuantity.toString();
//         // cart.Total[medicineIndex] = formattedTotal;
//         cart.Total = formattedTotal; 
//       } else {
//         // Add new item
//         cart.Medicine.push(medicine);
//         cart.Quantity.push(numericQuantity.toString());
//         cart.Total.push(formattedTotal);
//       }
//     }

//     // Log cart state before saving
//     console.log('Cart before save:', {
//       Medicine: cart.Medicine,
//       Quantity: cart.Quantity,
//       Total: cart.Total
//     });

//     await cart.save();
    
//     res.status(200).json({ 
//       message: 'Item added to cart successfully', 
//       cart 
//     });
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     // Log detailed error information
//     console.error('Request body:', req.body);
//     console.error('Error details:', {
//       name: error.name,
//       message: error.message,
//       stack: error.stack
//     });
//     res.status(500).json({ 
//       message: 'Server error', 
//       error: error.message 
//     });
//   }
// }

exports.AddCart = async (req, res) => {
  try {
    const { medicine, quantity, total } = req.body;
    
    // Validate required fields
    if (!medicine || !quantity) {
      return res.status(400).json({ 
        message: 'Medicine and quantity are required fields'
      });
    }

    const numericQuantity = parseInt(quantity, 10);
    if (isNaN(numericQuantity) || numericQuantity < 1) {
      return res.status(400).json({ 
        message: 'Quantity must be a positive number'
      });
    }

    const formattedTotal = total ? total.toString() : '0';
    
    const currentUser = await CurrentUser.findOne({});
    if (!currentUser || !currentUser.currentuserid[0]) {
      return res.status(404).json({ message: 'No user currently logged in' });
    }

    let cart = await Cart.findOne({ userID: currentUser.currentuserid[0] });
    
    if (!cart) {
      // Create new cart - Fixed initialization
      cart = new Cart({
        userID: currentUser.currentuserid[0], // Remove array wrapper
        Medicine: [medicine],
        Quantity: [numericQuantity.toString()],
        Total: formattedTotal // Single total value
      });
    } else {
      // Update existing cart
      const medicineIndex = cart.Medicine.indexOf(medicine);
      if (medicineIndex !== -1) {
        // Update existing item
        const newQuantity = (parseInt(cart.Quantity[medicineIndex]) + numericQuantity);
        cart.Quantity[medicineIndex] = newQuantity.toString();
        cart.Total = formattedTotal; // Update total
      } else {
        // Add new item
        cart.Medicine.push(medicine);
        cart.Quantity.push(numericQuantity.toString());
        cart.Total = formattedTotal; // Update total
      }
    }

    // Add error logging
    console.log('Saving cart:', {
      userID: cart.userID,
      Medicine: cart.Medicine,
      Quantity: cart.Quantity,
      Total: cart.Total
    });

    await cart.save();
    
    res.status(200).json({ 
      message: 'Item added to cart successfully', 
      cart 
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    console.error('Request body:', req.body);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
}

exports.RemoveFromCart = async (req, res) => {
    try {
      const { medicine } = req.params;
      
      const currentUser = await CurrentUser.findOne({});
      if (!currentUser || !currentUser.currentuserid[0]) {
        return res.status(404).json({ message: 'No user currently logged in' });
      }
  
      const cart = await Cart.findOne({ userID: currentUser.currentuserid[0] });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const medicineIndex = cart.Medicine.indexOf(medicine);
      if (medicineIndex !== -1) {
        cart.Medicine.splice(medicineIndex, 1);
        cart.Quantity.splice(medicineIndex, 1);
        cart.Total.splice(medicineIndex, 1);
        await cart.save();
      }
  
      res.json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.UpdateCart = async (req, res) => {
  try {
    const { medicine, quantity, total } = req.body;

    const numericQuantity = parseInt(quantity, 10);
    
    if (!medicine || isNaN(numericQuantity) || numericQuantity < 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const currentUser = await CurrentUser.findOne({});
    if (!currentUser || !currentUser.currentuserid[0]) {
      return res.status(404).json({ message: 'No user currently logged in' });
    }

    const cart = await Cart.findOne({ userID: currentUser.currentuserid[0] });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const medicineIndex = cart.Medicine.indexOf(medicine);
    if (medicineIndex === -1) {
      return res.status(404).json({ message: 'Medicine not found in cart' });
    }

    cart.Quantity[medicineIndex] = numericQuantity.toString();
    cart.Total = total;

    await cart.save();

    res.status(200).json({ 
      message: 'Cart updated successfully', 
      cart 
    });

  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
}