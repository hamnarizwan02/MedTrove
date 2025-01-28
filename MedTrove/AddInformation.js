
import React, { useState } from "react";
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

const AddInformation = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
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

  const handleProceed = () => {
    navigation.navigate("ChoosePayment");
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
        Town / City <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        placeholder="Enter your city"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>
        Postcode <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        placeholder="Enter your postcode"
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
    backgroundColor: "#007bff",
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

