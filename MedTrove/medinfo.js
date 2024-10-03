import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CONFIG from './config.js';

const MedicineDetails = ({ route }) => {
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);
  //const id = '66e1df80bc0ca5e347fadc70';
  const { id } = route.params;
  console.log("Medinfo "+ id);

  useEffect(() => {
    const fetchMedicineAndPrice = async () => {
      try {
        const medicineResponse = await axios.get(`${CONFIG.backendUrl}/api/medici/${id}`);
        setMedicine(medicineResponse.data);

        // Fetch price from PakPrices
        const pakPriceResponse = await axios.get(`${CONFIG.backendUrl}/api/pak-prices/${medicineResponse.data.drug_name}`);
        if (pakPriceResponse.data) {
          setPrice(parsePakPrice(pakPriceResponse.data.MRP));
        } else {
          // If not found in PakPrices, fetch from IndiaPrices
          const indiaPriceResponse = await axios.get(`${CONFIG.backendUrl}/api/india-prices/${medicineResponse.data.drug_name}`);
          if (indiaPriceResponse.data) {
            setPrice(convertToPackRupees(indiaPriceResponse.data['price(₹)']));
          } else {
            setPrice(12345); // Default price if not found in both databases
          }
        }
      } catch (error) {
        //console.error('Error fetching medicine or price:', error);
        setPrice(12345); // Set default price in case of any error
      } finally {
        setLoading(false);
      }
    };

    fetchMedicineAndPrice();
  }, [id]);

  const parsePakPrice = (priceString) => {
    // Remove "Rs. " and any commas, then parse to float
    return parseFloat(priceString.replace('Rs. ', '').replace(',', ''));
  };

  const convertToPackRupees = (indianPrice) => {
    // Assuming 1 Indian Rupee = 3.5 Pakistani Rupees (you should use real-time exchange rates)
    const exchangeRate = 3.5;
    return indianPrice * exchangeRate;
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1b3c74" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medicine Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.drugName}>{medicine.drug_name}</Text>
          <Text style={styles.genericName}>Generic: {medicine.generic_name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>PKR {price.toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                onPress={decrementQuantity} 
                style={styles.quantityButton}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity 
                onPress={incrementQuantity} 
                style={styles.quantityButton}
                activeOpacity={0.7}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.sectionContent}>Condition: {medicine.medical_condition}</Text>
            <Text style={styles.sectionContent}>Side Effects: {medicine.side_effects}</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    price: {
        fontSize: 22,
        fontWeight: '500',
        color: '#5fd3b0',
    },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 50,  // Increased top padding
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#252828',
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  card: {
    margin: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  drugName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252828',
    marginBottom: 5,
  },
  genericName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: '500',
    color: '#5fd3b0',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 5,
  },
  quantityButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b3c74',
  },
  quantity: {
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#252828',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#1b3c74',
    borderRadius: 24,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default MedicineDetails;