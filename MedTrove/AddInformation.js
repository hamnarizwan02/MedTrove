
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CONFIG from './config.js'; 
import axios from 'axios';

const AddInformation = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [helpNeeded, setHelpNeeded] = useState(false);
  const navigation = useNavigation();

  const handleHelpToggle = (value) => {
    setHelpNeeded(value);
    if (value) {
      Alert.alert(
        "Need Donation?",
        "This feature is solely intended to help the less fortunate, any donation big or small would go a long way!"
      );
    }
  };

  // const handleProceed = () => {
  //   navigation.navigate("ChoosePayment");
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

  // const handleProceed = async () => {
  //   // Detailed logging
  //   console.log('Form Data:', {
  //     currentUserId,
  //     address,
  //     city,
  //     postcode,
  //     phone,
  //     helpNeeded
  //   });
  
  //   // Comprehensive validation
  //   const validationErrors = [];
    
  //   if (!currentUserId) validationErrors.push('User not authenticated');
  //   if (!address) validationErrors.push('Street address is required');
  //   if (!city) validationErrors.push('City is required');
  //   if (!postcode) validationErrors.push('Postal code is required');
  //   if (!phone) validationErrors.push('Phone number is required');
  
  //   if (validationErrors.length > 0) {
  //     Alert.alert(
  //       'Validation Error', 
  //       validationErrors.join('\n')
  //     );
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`${CONFIG.backendUrl}/api/save-address`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userID: currentUserId,
  //         address: {
  //           street: address,
  //           city: city,
  //           postalCode: postcode,
  //           phone: phone
  //         },
  //         helpNeeded
  //       }),
  //     });
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       navigation.navigate("ChoosePayment");
  //     } else {
  //       Alert.alert('Error', data.message || 'Failed to save address');
  //     }
  //   } catch (error) {
  //     console.error('Address save error:', error);
  //     Alert.alert('Error', 'Network error. Please try again.');
  //   }
  // };
  const handleProceed = async () => {
    try {
      const response = await fetch(`${CONFIG.backendUrl}/api/save-address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: currentUserId,
          address: {
            street: address,
            city: city,
            postalCode: postcode,
            phone: phone
          },
          helpNeeded
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        navigation.navigate("ChoosePayment");
      } else {
        Alert.alert('Error', data.message || 'Failed to save address');
      }
    } catch (error) {
      console.error('Address save error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <Text style={styles.subHeader}>Shipping Address</Text>

      <Text style={styles.label}>
        Country <Text style={styles.required}>*</Text>
      </Text>
      <Text style={styles.country}>Pakistan</Text>

      <Text style={styles.label}>
        Address <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        placeholder="Enter your address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>
        Town/City <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        placeholder="Enter your city"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>
        Postal code <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        placeholder="Enter your postal code"
        style={styles.input}
        value={postcode}
        onChangeText={setPostcode}
        keyboardType="numeric"
      />

      <Text style={styles.label}>
        Phone Number <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        placeholder="Enter your phone number"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <View style={styles.switchContainer}>
        <Switch value={helpNeeded} onValueChange={handleHelpToggle} />
        <Text style={styles.switchLabel}>Need Donation?</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    flex: 1,
    padding: 24,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    color: "#495057",
  },
  required: {
    color: "red",
  },
  country: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ced4da",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 16,
    marginLeft: 10,
    color: "#495057",
  },
  button: {
    backgroundColor: "#064D65",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddInformation;

