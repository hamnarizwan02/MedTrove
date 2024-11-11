import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import CONFIG from './config';

export default function Cart({ navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchCart();
    }, []);
  
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${CONFIG.backendUrl}/api/cart/current`);
        // Convert quantities to numbers when receiving from backend
        const formattedCart = {
          ...response.data,
          Quantity: response.data.Quantity.map(qty => parseInt(qty, 10))
        };
        setCartItems(formattedCart);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
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

  const handleUpdateQuantity = async (medicine, newQuantity) => {
    // Ensure newQuantity is a number
    const quantity = parseInt(newQuantity, 10);
    
    if (quantity < 1) {
      handleRemoveItem(medicine);
      return;
    }
  
    try {
      await axios.put(`${CONFIG.backendUrl}/api/cart/update`, {
        medicine,
        quantity
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert("Error", "Failed to update quantity", [{ text: "OK" }]);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      
      {cartItems.Medicine?.map((medicine, index) => (
        <View key={index} style={styles.cartItem}>
          <View style={styles.itemInfo}>
            <Text style={styles.medicineName}>{medicine}</Text>
            
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
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
});