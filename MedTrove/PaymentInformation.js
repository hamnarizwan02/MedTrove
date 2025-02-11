import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";  // Import useNavigation
import axios from 'axios';
import CONFIG from './config';

const PaymentInformation = ({ route }) => {
  const { paymentMethod } = route.params;
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigation = useNavigation();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // const handleProceed = () => {
  //   // Enhanced validation
  //   if (cardName && cardNumber.length >= 16 && expiryDate && cvv.length === 3) {
  //     navigation.navigate("ReviewPaymentPage", { 
  //       paymentMethod, 
  //       cardDetails: { cardName, cardNumber, expiryDate, cvv } 
  //     });
  //   } else {
  //     Alert.alert('Invalid Card Details', 'Please complete all fields correctly');
  //   }
  // };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${CONFIG.backendUrl}/api/user/current`);
        if (response.data.success) {
          setCurrentUserId(response.data.userID);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // const handleProceed = () => {
  //   // Enhanced validation
  //   if (cardName && cardNumber.length >= 16 && expiryDate && cvv.length === 3) {
  //     // Get the userID from AsyncStorage or your authentication context
  //     const userID = '...'; // Replace with actual user ID retrieval method

  //     // Send data to backend
  //     fetch(`${CONFIG.backendUrl}/api/save-payment-method`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userID: currentUserId,
  //         paymentMethod: paymentMethod, // from route params
  //         cardDetails: {
  //           cardName,
  //           cardNumber,
  //           expiryDate,
  //           cvv
  //         }
  //       }),
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.success) {
  //         navigation.navigate("ReviewPaymentPage", { 
  //           paymentMethod, 
  //           cardDetails: { cardName, cardNumber, expiryDate, cvv } 
  //         });
  //       } else {
  //         Alert.alert('Error', data.message || 'Failed to save payment method');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Payment method save error:', error);
  //       Alert.alert('Error', 'Network error. Please try again.');
  //     });
  //   } else {
  //     Alert.alert('Invalid Card Details', 'Please complete all fields correctly');
  //   }
  // };

  const handleProceed = () => {
    // Validate card details first
    if (cardName && cardNumber.length >= 16 && expiryDate && cvv.length === 3) {
      // Determine payment method based on previous screen's selection
      const method = paymentMethod === 'JazzCash' ? 'Credit' : 
                     paymentMethod === 'EasyPaisa' ? 'Debit' : 
                     paymentMethod;
  
      fetch(`${CONFIG.backendUrl}/api/save-payment-method`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: currentUserId,
          paymentMethod: method, // Explicitly set to Credit or Debit
          cardDetails: {
            cardName,
            cardNumber,
            expiryDate,
            cvv
          }
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigation.navigate("ReviewPaymentPage", { 
            paymentMethod: method, 
            cardDetails: { cardName, cardNumber, expiryDate, cvv } 
          });
        } else {
          Alert.alert('Error', data.message || 'Failed to save payment method');
        }
      })
      .catch(error => {
        console.error('Payment method save error:', error);
        Alert.alert('Error', 'Network error. Please try again.');
      });
    } else {
      Alert.alert('Invalid Card Details', 'Please complete all fields correctly');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Information</Text>
      <Text style={styles.subtitle}>Enter Card Details</Text>

      <Text style={styles.label}>Cardholder Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        placeholderTextColor="#ccc"
        value={cardName}
        onChangeText={setCardName}
      />

      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        placeholder="1234 5678 9012 3456"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        maxLength={16}
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <View style={styles.rowContainer}>
        <View style={styles.halfWidthContainer}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            placeholderTextColor="#ccc"
            // keyboardType="numeric"
            maxLength={5}
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
        </View>

        <View style={styles.halfWidthContainer}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry={true}
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleProceed}
      >
        <Text style={styles.saveButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 25,
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
   
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#004D40",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentInformation;
