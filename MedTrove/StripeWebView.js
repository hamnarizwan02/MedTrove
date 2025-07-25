import React, { useState, useRef } from 'react';
import { View, ActivityIndicator, Modal, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios'; // Add this import
import CONFIG from './config'; // Make sure path is correct for your config file

// const StripeWebView = ({ route, navigation }) => {
//   const { paymentUrl, userId } = route.params;
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleNavigationStateChange = (navState) => {
//     // Check for success URL patterns
//     if (navState.url.includes('/payment-completed') ||
//         (navState.url.includes('/success') && navState.url.includes('redirect_status=succeeded'))) {
//       setIsPaymentSuccess(true);
//       clearCart(userId);
//     }
    
//     // Check for failure/cancellation
//     if (navState.url.includes('/cancel') || navState.url.includes('failure')) {
//       navigation.goBack();
//     }
//   };

//   const clearCart = async (userId) => {
//     try {
//       console.log('Clearing cart for user:', userId);
//       await axios.post(`${CONFIG.backendUrl}/api/cart/clear`, { userId });
//       console.log('Cart cleared successfully');
      
//       // Dispatch an event that the cart has been cleared
//       // You can use React Navigation's event system for this
//       navigation.dispatch(
//         CommonActions.setParams({
//           cartCleared: true,
//           timestamp: new Date().getTime() // Add timestamp to ensure it's seen as a new event
//         })
//       );
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <WebView
//         source={{ uri: paymentUrl }}
//         style={styles.webview}
//         onNavigationStateChange={handleNavigationStateChange}
//         onLoadStart={() => setIsLoading(true)}
//         onLoadEnd={() => setIsLoading(false)}
//       />

//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       )}

//       <Modal
//         visible={isPaymentSuccess}
//         transparent={true}
//         animationType="fade"
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.successTitle}>Payment Successful!</Text>
//             <Text style={styles.successMessage}>
//               Your payment has been processed successfully
//             </Text>
//             <TouchableOpacity 
//               style={styles.backButton} 
//               onPress={() => navigation.navigate("homepagetest")}
//             >
//               <Text style={styles.backButtonText}>Back to Home</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

const StripeWebView = ({ route, navigation }) => {
  const { paymentUrl, userId } = route.params;
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);

  const handleNavigationStateChange = (navState) => {
    // Check for success URL patterns
    if (navState.url.includes('/payment-completed') ||
        (navState.url.includes('/success') && navState.url.includes('redirect_status=succeeded'))) {
      
      // Stop the WebView from loading further
      webViewRef.current?.stopLoading();
      
      // Set payment as successful
      setIsPaymentSuccess(true);
      clearCart(userId);
      
      // Return false to prevent the WebView from navigating to the URL
      return false;
    }
    
    // Check for failure/cancellation
    if (navState.url.includes('/cancel') || navState.url.includes('failure')) {
      navigation.goBack();
    }
    
    return true;
  };

  const clearCart = async (userId) => {
    try {
      console.log('Clearing cart for user:', userId);
      await axios.post(`${CONFIG.backendUrl}/api/cart/clear`, { userId });
      console.log('Cart cleared successfully');
      
      // Dispatch an event that the cart has been cleared
      navigation.dispatch(
        CommonActions.setParams({
          cartCleared: true,
          timestamp: new Date().getTime() // Add timestamp to ensure it's seen as a new event
        })
      );
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: paymentUrl }}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleNavigationStateChange}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <Modal
        visible={isPaymentSuccess}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successMessage}>
              Your payment has been processed successfully
            </Text>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.navigate("homepagetest")}
            >
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#548605',
  },
  successMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  backButton: {
    backgroundColor: '#064D65',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StripeWebView;