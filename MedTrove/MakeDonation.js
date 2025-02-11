import React, { useState, useEffect } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Modal,Platform,
ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
  } from "react-native";
import { KeyboardAvoidingView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Search from "./search";
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CONFIG from './config';

export default function MakeDonation() {
    const [donationAmount, setDonationAmount] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();
    
    const [totalAmount, setTotalAmount] = useState(0);
    const { paymentMethod } = "Debit";
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
      Promise.all([fetchCart()]).finally(() => setLoading(false));
    }, []);

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${CONFIG.backendUrl}/api/cart/current`);
        if (response.data && response.data.Medicine) {
          // Map the items using the single Total value
          const items = response.data.Medicine.map((medicine, index) => ({
            name: medicine,
            quantity: response.data.Quantity[index],
            total: parseFloat(response.data.Total) / response.data.Medicine.length // Distribute total evenly if needed
          }));
          setCartItems(items);
          
          // Set total amount directly from the Total field
          setTotalAmount(parseFloat(response.data.Total));
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        Alert.alert('Error', 'Failed to load cart details');
      }
    };

    const handleProceedToPayment = async () => {
      try {
        const response = await axios.post(`${CONFIG.backendUrl}/api/create-payment-intent`, {
          amount: totalAmount,
        });
        const { clientSecret } = response.data;
        navigation.navigate('StripeWebView', { 
          paymentmethod: paymentMethod, paymentUrl: `${CONFIG.backendUrl}/checkout?clientSecret=${clientSecret}`
        });
      } catch (error) {
        console.error('Error creating payment:', error);
        Alert.alert('Error', 'Unable to process payment. Please try again.');
      }
    };

    const handleDonate = () => {
      // Simulate a successful donation process
      if (donationAmount ) {
        setIsModalVisible(true);
      }
      else{
        setErrorMessage("Please enter amount!");
      return;
      }
      setErrorMessage("");
    };
  
    const handleBackToHome = () => {
      setIsModalVisible(false);
      setDonationAmount("");
      setAccountNumber("");
      // Navigate to Home screen 
      handleProceedToPayment();
    };

  return (
    <KeyboardAvoidingView style={styles.container}>

      <Text style={styles.header}>Donations</Text>
      <Text style={styles.subHeader}>Please enter amount</Text>


      <TextInput
        style={styles.input}
        placeholder="Donation Amount"
        placeholderTextColor="#999"
        value={donationAmount}
        onChangeText={setDonationAmount}
        keyboardType="numeric"
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Account Number"
        placeholderTextColor="#999"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      /> */}

      <TouchableOpacity style={styles.button} onPress={handleDonate}>
        <Text style={styles.buttonText}>Donate</Text>
      </TouchableOpacity>

       {/* Modal for Thank You message */}
       <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={30} color="#fff" />
            </View>
            <Text style={styles.modalHeader}>Thank You!</Text>
            <Text style={styles.modalSubHeader}>
              Please enter card details.
            </Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToHome}
            >
              <Text style={styles.backButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#fff",
  },
  header: {
    top:"10%",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "5%",
  },
  subHeader: {
    top:"11%",
    fontSize: 16,
    color: "#666",
    marginBottom: "10%",
  },
  input: {
    top:"10%",
    height: "6%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: "10%",
    marginBottom: "5%",
    backgroundColor: "#f8f9fa",
  },
  button: {
    top:"15%",
    backgroundColor: "#003f5c",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#003f5c",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubHeader: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
  },
});
