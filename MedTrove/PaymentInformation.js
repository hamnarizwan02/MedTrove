import React from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";  // Import useNavigation

const PaymentInformation = ({ route }) => {
  const { paymentMethod } = route.params;
  const navigation = useNavigation();  // Hook for navigation
  // Determine the appropriate logo based on the selected payment method
  const paymentLogo =
    paymentMethod === "JazzCash"
      ? require("./assets/jazzcash.png")
      : require("./assets/easypaisa.png");

      const handleProceed = () => {
        navigation.navigate("ReviewPaymentPage", { paymentMethod });
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Information</Text>
      <Text style={styles.subtitle}>Add you account number and pin code</Text>

      <View style={styles.logoContainer}>
        <Image source={paymentLogo} style={styles.logo} />
      </View>

      <Text style={styles.label}>Account Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Required"
        placeholderTextColor="#ccc"
      />


        <Text style={styles.label}>Amount</Text>
            <TextInput
                style={styles.input}
                placeholder="Required"
                placeholderTextColor="#ccc"
            />

      <TouchableOpacity style={styles.saveButton} onPress={handleProceed}>
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
