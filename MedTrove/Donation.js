import React from "react";
import  { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MakeDonation from "./MakeDonation";

const Donation = () => {
    //const [modalVisible, setModalVisible] = useState(false);
    //const [toggleModal,setToggle]=useState(false);

        const [modalVisible, setModalVisible] = useState(false);
        const navigation = useNavigation();
        const toggleModal = () => {
          setModalVisible(!modalVisible);
        };
        const handleNavigation = () => {
            navigation.navigate("MakeDonation"); 
          };

  return (
    <View style={styles.container}>
      {/* Icon */}
     <Image source={require('./assets/donation.png')} 
     resizeMode="contain" style={styles.icon} />

      {/* Title */}
      <Text style={styles.title}>Donate to MedTrove</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Info about how we run on donations and how good it is to donate
        {"\n"}Bla bla bla bla bla bla
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Donate Now</Text>
      </TouchableOpacity>

  {/* Modal */}
  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Icon */}
            <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {/* Payment Options */}
            <Text style={styles.modalTitle}>Payment Methods</Text>
            <TouchableOpacity onPress={handleNavigation}>
            <View style={styles.paymentCard}>
            
              <Image
                source={
                require('./assets/jazzcash.png') // Replace with actual payment icon
                }
                style={styles.paymentIcon}
                resizeMode="contain"
              />
             
              <View>
             
                <Text style={styles.paymentText}>JazzCash</Text>
                <Text style={styles.paymentDetails}>Amanda Morgan</Text>
                <Text style={styles.paymentDetails}>0330 4527937</Text>
              </View>
            </View>
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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  icon: {
    width: "50%",
    height: "20%",
    marginBottom: "5%",

  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#064D65",
    marginBottom: "5%",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    color: "black",
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#064D65", // Teal color
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    top:"35%",
    padding: "10%",
    width: "100%",
   // alignItems: "center",
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "5%",
    alignContent:"center"
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: "5%",
    borderRadius: 12,
    width: "100%",
  },
  paymentIcon: {
    width: "30%",
    height: "70%",
    marginRight: "5%",
  },
  paymentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  paymentDetails: {
    fontSize: 14,
    color: "#666666",
  },
});

export default Donation;
