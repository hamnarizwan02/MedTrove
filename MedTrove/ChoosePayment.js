// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// const ChoosePayment = () => {

//     const handleProceed = () => {
//         navigation.navigate("PaymentInformation");
//       };


//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Payment</Text>
//       <Text style={styles.subtitle}>Methods</Text>

//       <TouchableOpacity style={styles.orderHistoryButton}>
//         <Text style={styles.buttonText}>Order History</Text>
//       </TouchableOpacity>

//       <View style={styles.card} onPress={handleProceed}>
//         <Image source={require("./assets/easypaisa.png")} style={styles.logo} />
//         <Text style={styles.name}>AMANDA MORGAN</Text>
//         <Text style={styles.number}>0330 4527937</Text>
//       </View>

//       <View style={styles.card} onPress={handleProceed}>
//         <Image source={require("./assets/jazzcash.png")} style={styles.logo} />
//         <Text style={styles.name}>AMANDA MORGAN</Text>
//         <Text style={styles.number}>0330 4527937</Text>
//       </View>

//      {/* <TouchableOpacity style={styles.button}>
//       <Text style={styles.buttonText}>Next</Text>
//       </TouchableOpacity> */}

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     top: 30,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "gray",
//     marginBottom: 20,
//   },
//   orderHistoryButton: {
//     backgroundColor: "#004D40",
//     padding: 10,
//     borderRadius: 8,
//     alignSelf: "flex-end",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   card: {
//     backgroundColor: "#f7f7f7",
//     padding: 20,
//     borderRadius: 12,
//     marginTop: 15,
//     alignItems: "center",
//   },
//   logo: {
//     width: 100,
//     height: 30,
//     resizeMode: "contain",
//   },
//   name: {
//     marginTop: 10,
//     fontWeight: "bold",
//   },
//   number: {
//     color: "gray",
//   },

// //     button: {
// //     backgroundColor: "#004085",
// //     padding: 12,
// //     borderRadius: 5,
// //     marginTop: 20,
// //     alignItems: "center",
// //   },
// //   buttonText: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// });

// export default ChoosePayment;


import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";  // Import useNavigation

const ChoosePayment = () => {
  const navigation = useNavigation();  // Hook for navigation

  // Navigate to PaymentInformation page
  const handlePaymentSelect = (paymentMethod) => {
    navigation.navigate('PaymentInformation', { paymentMethod });  // Pass the selected payment method to the next screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>Methods</Text>

      <TouchableOpacity style={styles.orderHistoryButton}>
        <Text style={styles.buttonText}>Order History</Text>
      </TouchableOpacity>

      {/* EasyPaisa Option */}
      <TouchableOpacity style={styles.card} onPress={() => handlePaymentSelect('EasyPaisa')}>
        <Image source={require("./assets/easypaisa.png")} style={styles.logo} />
        <Text style={styles.name}>AMANDA MORGAN</Text>
        <Text style={styles.number}>0330 4527937</Text>
      </TouchableOpacity>

      {/* JazzCash Option */}
      <TouchableOpacity style={styles.card} onPress={() => handlePaymentSelect('JazzCash')}>
        <Image source={require("./assets/jazzcash.png")} style={styles.logo} />
        <Text style={styles.name}>AMANDA MORGAN</Text>
        <Text style={styles.number}>0330 4527937</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    top: 30,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  orderHistoryButton: {
    backgroundColor: "#004D40",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f7f7f7",
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: "contain",
  },
  name: {
    marginTop: 10,
    fontWeight: "bold",
  },
  number: {
    color: "gray",
  },
});

export default ChoosePayment;
