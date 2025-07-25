

// kinda worksssssssssssss

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import CONFIG from './config';

export default function Cart({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [pricesLoaded, setPricesLoaded] = useState(false); 

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${CONFIG.backendUrl}/api/cart/current`);
      const formattedCart = {
        ...response.data,
        Quantity: response.data.Quantity.map(qty => parseInt(qty, 10)),
      };

      setCartItems(formattedCart);
      setPricesLoaded(false);  // Reset prices loaded state

      // Fetch prices for each medicine
  //     const pricePromises = formattedCart.Medicine.map(medicine =>
  //       axios
  //         .get(`${CONFIG.backendUrl}/api/price/${medicine}`)
  //         .then(priceResponse => priceResponse.data.price || 100) // Default to 100 if no price found
  //         .catch(() => 100) // Handle error gracefully and default to 100
  //     );

  //     const prices = await Promise.all(pricePromises);
  //     const priceMap = formattedCart.Medicine.reduce((acc, medicine, index) => {
  //       acc[medicine] = prices[index];
  //       return acc;
  //     }, {});

  //     setPrices(priceMap);
  //     setLoading(false);

  //   } catch (error) {
  //     console.error('Error fetching cart:', error);
  //     setLoading(false);
  //     Alert.alert("Error", "Failed to load cart items", [{ text: "OK" }]);
  //   }
  // };

  const pricePromises = formattedCart.Medicine.map(medicine =>
    axios
      .get(`${CONFIG.backendUrl}/api/price/${medicine}`)
      .then(priceResponse => {
        const price = priceResponse.data.price;
        return price ? price.toString() : "100";
      })
      .catch(() => "100")
  );

  const prices = await Promise.all(pricePromises);
  const priceMap = formattedCart.Medicine.reduce((acc, medicine, index) => {
    acc[medicine] = prices[index];
    return acc;
  }, {});

  setPrices(priceMap);
  
  // Set a small timeout before marking prices as loaded
  setTimeout(() => {
    setPricesLoaded(true);
    setLoading(false);
  }, 500);

} catch (error) {
  console.error('Error fetching cart:', error);
  setLoading(false);
  setPricesLoaded(false);
  Alert.alert("Error", "Failed to load cart items", [{ text: "OK" }]);
}
};

  const handleRemoveItem = async (medicine) => {
    try {
      await axios.delete(`${CONFIG.backendUrl}/api/cart/remove/${medicine}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert("Error", "Failed to remove item from cart", [{ text: "OK" }]);
    }
  };

  const calculateTotal = () => {
    if (!pricesLoaded || !cartItems.Medicine || !prices) return 0;
  
    return cartItems.Medicine.reduce((total, medicine, index) => {
      const price = parseFloat(prices[medicine].replace(/[^\d.]/g, ''));
      const quantity = cartItems.Quantity[index] || 0;
      return total + (price * quantity);
    }, 0);
  };
  
  const handleUpdateQuantity = async (medicine, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity < 1) {
      handleRemoveItem(medicine);
      return;
    }
  
    try {
      // Calculate total immediately before sending the request
      const total = calculateTotal().toFixed(2);
  
      console.log('Sending update:', { medicine, quantity, total });
  
      await axios.put(`${CONFIG.backendUrl}/api/cart/update`, {
        medicine,
        quantity,
        total
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert("Error", "Failed to update quantity", [{ text: "OK" }]);
    }
  };

  const handleCheckout = () => {
    console.log("Navigation Object:", navigation); // Check if navigation exists
  
    Alert.alert("Checkout", "Proceed to checkout", [
      { text: "Cancel" },
      { text: "Proceed", onPress: () => {
          console.log("Navigating to AddInformation");
          navigation.navigate('AddInformation');
        } 
      }, 
    ]);
  };  

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Cart</Text>

        {cartItems.Medicine?.map((medicine, index) => (
          <View key={index} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.medicineName}>{medicine}</Text>
              <Text style={styles.medicinePrice}>{prices[medicine]}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  onPress={() => handleUpdateQuantity(medicine, Number(cartItems.Quantity[index]) - 1)}
                  style={styles.quantityButton}
                >
                  <Ionicons name="remove" size={24} color="#064D65" />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{cartItems.Quantity[index]}</Text>

                <TouchableOpacity 
                  onPress={() => handleUpdateQuantity(medicine, Number(cartItems.Quantity[index]) + 1)}
                  style={styles.quantityButton}
                >
                  <Ionicons name="add" size={24} color="#064D65" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveItem(medicine)}
            >
              <Ionicons name="trash-outline" size={24} color="#FF4444" />
            </TouchableOpacity>
          </View>
        ))}

        {(!cartItems.Medicine || cartItems.Medicine.length === 0) && (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        )}
      </ScrollView>

      {cartItems.Medicine?.length > 0 && (
        <View style={styles.checkoutBar}>
          <Text style={styles.totalText}>Total: PKR {calculateTotal().toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            // onPress={handleCheckout} // Only trigger checkout once
            onPress={() => {
              cartItems.Medicine?.forEach((medicine, index) => {
                handleUpdateQuantity(medicine, Number(cartItems.Quantity[index]));
              });
              handleCheckout(); // Call checkout after updating quantities
            }}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Ensure space for the checkout bar at the bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: 10,
  },
  emptyCart: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#064D65',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
});



