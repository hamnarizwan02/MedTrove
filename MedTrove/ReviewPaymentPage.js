import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import CONFIG from './config';

const ReviewPaymentPage = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [isHelpNeeded, setIsHelpNeeded] = useState(false);
  const { paymentMethod } = route.params;

  useEffect(() => {
    console.log('Component mounted, calling loadData()');
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let helpNeeded = false;
      console.log('Starting loadData function...');
      
      // First fetch address to check helpneeded status
      console.log('Fetching user data...');
      const userResponse = await axios.get(`${CONFIG.backendUrl}/api/user/current`);
      console.log('User response:', userResponse.data);

      if (userResponse.data?.userID) {
        console.log(`Fetching address for userID: ${userResponse.data.userID}`);
        const addressResponse = await axios.get(`${CONFIG.backendUrl}/api/address/${userResponse.data.userID}`);
        console.log('Address response:', addressResponse.data);

        if (addressResponse.data?.address) {
          console.log('Setting address data:', addressResponse.data.address);

          setAddress(addressResponse.data.address.address);
          //console.log('Updated address state:', addressResponse.data.address.address);

          helpNeeded = addressResponse.data.address.helpNeeded || false;
          console.log('Help needed status:', helpNeeded);
          setIsHelpNeeded(helpNeeded);
        } else {
          console.log('No address data found in response');
        }
      } else {
        console.log('No userID found in response');
      }

      // Then fetch cart and apply discount if needed
      console.log('Fetching cart data...');
      const cartResponse = await axios.get(`${CONFIG.backendUrl}/api/cart/current`);
      console.log('Cart response:', cartResponse.data);

      if (cartResponse.data?.Medicine) {
        const items = cartResponse.data.Medicine.map((medicine, index) => ({
          name: medicine,
          quantity: cartResponse.data.Quantity[index],
          total: parseFloat(cartResponse.data.Total) // Parse as float, assuming Total is now a string
        }));
        console.log('Mapped cart items:', items);
        setCartItems(items);
        
        // Calculate total from the Total string
        const originalTotal = parseFloat(cartResponse.data.Total);
        console.log('Original total calculated:', originalTotal);
        setOriginalAmount(originalTotal);
        
        // Apply discount if helpneeded
        const finalTotal = helpNeeded ? originalTotal * 0.9 : originalTotal;
        console.log('Help needed:', helpNeeded);
        console.log('Final total after discount check:', finalTotal);
        console.log('Discount applied:', helpNeeded ? 'Yes' : 'No');
        console.log('Discount amount:', helpNeeded ? originalTotal * 0.1 : 0);
        setTotalAmount(finalTotal);
      } else {
        console.log('No Medicine data found in cart response');
      }
    } catch (error) {
      console.error('Error in loadData:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      Alert.alert('Error', 'Failed to load order details');
    } finally {
      console.log('LoadData complete, setting loading to false');
      setLoading(false);
    }
  };

  const handleProceedToPayment = async () => {
    try {
      console.log('Proceeding to payment with amount:', totalAmount);
      console.log('Discount status:', isHelpNeeded);
      
      const response = await axios.post(`${CONFIG.backendUrl}/api/create-payment-intent`, {
        amount: totalAmount,
        isDiscounted: isHelpNeeded
      });
      console.log('Payment intent response:', response.data);
      
      const { clientSecret } = response.data;
      navigation.navigate('StripeWebView', { 
        paymentUrl: stripeCheckoutUrl,
        source: 'ReviewPayment' // Add this line
      });
      navigation.navigate('StripeWebView', { 
        paymentmethod: paymentMethod, 
        paymentUrl: `${CONFIG.backendUrl}/checkout?clientSecret=${clientSecret}`
      });
    } catch (error) {
      console.error('Error in handleProceedToPayment:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      Alert.alert('Error', 'Unable to process payment. Please try again.');
    }
  };

  useEffect(() => {
    console.log('State updates:', {
      isHelpNeeded,
      originalAmount,
      totalAmount,
      hasAddress: !!address,
      cartItemsCount: cartItems.length
    });
  }, [isHelpNeeded, originalAmount, totalAmount, address, cartItems]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text>Loading order details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Review</Text>

      {/* Order Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Rs. {item.total}</Text>
          </View>
        ))}
      </View>

      {/* Delivery Address */}
      {address && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{address.street}</Text>
            <Text style={styles.addressText}>{address.city}, {address.postalCode}</Text>
            <Text style={styles.addressText}>Phone: {address.phone}</Text>
          </View>
        </View>
      )}

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text style={styles.paymentMethod}>Stripe ({paymentMethod} Card)</Text>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {isHelpNeeded && (
          <>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Original Amount:</Text>
              <Text style={styles.totalAmount}>Rs. {originalAmount.toFixed(2)}</Text>
            </View>
            <Text style={styles.discountText}>10% Assistance Discount Applied (-Rs. {(originalAmount * 0.1).toFixed(2)})</Text>
          </>
        )}
        <View style={[styles.totalRow, styles.finalTotal]}>
          <Text style={styles.totalLabel}>Final Amount:</Text>
           {/* <Text style={styles.totalAmount}>Rs. 314.42</Text> */}
          <Text style={styles.totalAmount}>Rs. {totalAmount.toFixed(2)}</Text>
          {/* <Text style={styles.totalAmount}>Rs. {(totalAmount - 34.94).toFixed(2)}</Text> */}
        </View>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity 
        style={styles.proceedButton}
        onPress={handleProceedToPayment}
      >
        <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  discountText: {
    color: 'green',
    fontSize: 14,
    marginVertical: 8,
    fontWeight: '500'
  },
  finalTotal: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 8
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#32325d',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#32325d',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    flex: 2,
    fontSize: 16,
  },
  itemQuantity: {
    flex: 1,
    textAlign: 'center',
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '500',
  },
  addressContainer: {
    marginTop: 8,
  },
  addressText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a4a4a',
  },
  paymentMethod: {
    fontSize: 16,
    color: '#4a4a4a',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32325d',
  },
  proceedButton: {
    backgroundColor: '#064D65',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  // WebView styles
  webview: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#5469d4',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ReviewPaymentPage;


// //works with stripe
// import React, { useState, useEffect } from 'react';
// import { View, Text, Modal, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
// import axios from 'axios';
// import CONFIG from './config';

// const ReviewPaymentPage = ({ route, navigation }) => {
//   const [loading, setLoading] = useState(true);
//   const [paymentUrl, setPaymentUrl] = useState(null);
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // Fetch the current cart and total amount
//   const fetchCart = async () => {
//     try {
//       const response = await axios.get(`${CONFIG.backendUrl}/api/cart/current`);
//       const total = parseFloat(response.data.Total[0]); // Assuming the total is in response.data.Total[0]
//       setTotalAmount(total);
//       fetchPaymentUrl(total); // Fetch payment URL after getting the total
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       setLoading(false);
//     }
//   };

//   // Fetch the payment URL using the total amount
//   const fetchPaymentUrl = async (amount) => {
//     try {
//       const response = await axios.post(`${CONFIG.backendUrl}/api/create-payment-intent`, {
//         amount: amount,
//       });

//       const { clientSecret } = response.data;
//       const url = `${CONFIG.backendUrl}/checkout?clientSecret=${clientSecret}`;
//       console.log('Payment URL:', url); // Debugging
//       setPaymentUrl(url);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching payment URL:', error);
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setIsPaymentSuccess(false);
//     navigation.navigate("Search");
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//         <Text>Loading payment details...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {paymentUrl && (
//         <WebView
//         key="webViewKey"
//         source={{ uri: paymentUrl }}
//         style={styles.webview}
//         onNavigationStateChange={navState => {
//           if (
//             navState.url.includes('/payment-completed') ||
//             (navState.url.includes('/success') &&
//               navState.url.includes('redirect_status=succeeded'))
//           ) {
//             setIsPaymentSuccess(true);
//           }
//         }}
//           onError={(error) => {
//             console.error('WebView Error:', error);
//             // Don't show error alert if we're actually succeeding
//             if (!error.nativeEvent.url?.includes('redirect_status=succeeded')) {
//               Alert.alert('Error', 'Failed to load payment page. Please try again.');
//             }
//           }}
//           onHttpError={(error) => {
//             console.error('WebView HTTP Error:', error);
//             // Don't show error alert if we're actually succeeding
//             if (!error.nativeEvent.url?.includes('redirect_status=succeeded')) {
//               Alert.alert('Error', 'Failed to load payment page. Please try again.');
//             }
//           }}
//         />
//       )}

//       {/* Modal to show payment success */}
//       <Modal
//         visible={isPaymentSuccess}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.successTitle}>Done!</Text>
//             <Text style={styles.successMessage}>
//               Payment Successfully Processed
//             </Text>
//             <TouchableOpacity style={styles.backButton} onPress={closeModal}>
//               <Text style={styles.backButtonText}>Back To Home</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   webview: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: '#6b7c93',
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 30,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '80%',
//     maxWidth: 400,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   successTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#32325d',
//     marginBottom: 10,
//   },
//   successMessage: {
//     fontSize: 16,
//     color: '#6b7c93',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   backButton: {
//     backgroundColor: '#5469d4',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 6,
//   },
//   backButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default ReviewPaymentPage;


