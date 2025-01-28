import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";

const ReviewPaymentPage = ({ route, navigation }) => {
    const paymentMethod = route?.params?.paymentMethod || "Unknown"; // Fallback for undefined paymentMethod
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  
    const paymentLogo =
      paymentMethod === "JazzCash"
        ? require("./assets/jazzcash.png")
        : require("./assets/easypaisa.png");

  const handleConfirmPayment = () => {
    setIsPaymentSuccess(true); // Show the modal
  };

  const closeModal = () => {
    setIsPaymentSuccess(false);
    navigation.navigate("Search"); // Navigate back to the home page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Payment</Text>
      <Image source={paymentLogo} style={styles.logo} />

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value="Rs. 25,050.00"
          editable={false}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>To</Text>
        <Text style={styles.detailText}>MedTrove</Text>
        <Text style={styles.subText}>03306622946</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>From</Text>
        <Text style={styles.detailText}>My {paymentMethod} Account</Text>
        <Text style={styles.subText}>03306622946</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.amount}>Rs. 25,050.00</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#ccc"
        />
        <Text style={styles.resendText}>
          Click <Text style={styles.link}>here</Text> to resend OTP.
        </Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>

      {/* Modal for Payment Success */}
      <Modal
        visible={isPaymentSuccess}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("./assets/paymentsucess.png")}
              style={styles.successImage}
            />
            <Text style={styles.successTitle}>Done!</Text>
            <Text style={styles.successMessage}>
              Your card has been successfully charged
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={closeModal}>
              <Text style={styles.backButtonText}>Back To Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "gray",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#004D40",
  },
  resendText: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
  link: {
    color: "#004D40",
    textDecorationLine: "underline",
  },
  confirmButton: {
    backgroundColor: "#004D40",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  successImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#004D40",
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReviewPaymentPage;
