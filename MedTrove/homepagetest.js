import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  Keyboard,
} from 'react-native';
import { 
  Ionicons, 
  FontAwesome, 
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign
} from '@expo/vector-icons';
import axios from 'axios';
import CONFIG from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const featureButtonWidth = (width - 64) / 3; // 3 buttons per row with padding

const MedTroveHomePage = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState(null);
  const navigation = props.navigation || useNavigation();

  // Handle search submission (migrated from search.js)
  const handleSearchSubmit = async () => {
    Keyboard.dismiss();
    console.log('Search term:', searchQuery);
    
    try {
      const response = await axios.get(`${CONFIG.backendUrl}/api/medicines/${searchQuery}`);
      
      if (response.status === 404) {
        console.log('Medicine not found');
        return;
      }
      
      const medicines = response.data;
      
      if (Array.isArray(medicines) && medicines.length > 0) {
        console.log('Found medicines:', medicines);
        const firstMedicine = medicines[0]; // Get the first medicine from the array
        if (firstMedicine._id) {
          console.log(`Navigating to product with ID: ${firstMedicine._id}`);
          navigation.navigate('ProductList', { id: firstMedicine._id });
        } else {
          console.error('Medicine ID not found in first result:', firstMedicine);
        }
      } else {
        console.error('No medicines found or unexpected response format:', medicines);
      }
    } catch (error) {
      console.error('Error fetching medicine:', error);
    }
  };

  // Function to fetch medicine by name (migrated from search.js)
  const fetchMedicine = async (medicine) => {
    try {
      const response = await axios.get(`${CONFIG.backendUrl}/api/medicines/${medicine}`);
      const medicineData = response.data;
      
      if (typeof medicineData === 'object' && medicineData !== null && medicineData._id) {
        navigation.navigate('MedInfo', { id: medicineData._id });
      } else {
        console.error('Medicine ID not found in response:', medicineData);
      }
    } catch (error) {
      console.error('Error fetching medicine:', error);
    }
  };

  // Feature button component for reusability
  const FeatureButton = ({ title, icon, color, onPress }) => (
    <TouchableOpacity 
      style={styles.featureButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={styles.featureButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header with profile and cart icons */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerIcon} 
          onPress={() => navigation.navigate('ProfileManagement')}
        >
          <FontAwesome name="user-circle" size={28} color="#2c3e50" />
        </TouchableOpacity>
        
        <Text style={styles.logo}>MedTrove</Text>
        
        <TouchableOpacity 
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Cart')}
        >
          <FontAwesome name="shopping-cart" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#7d7d7d" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search alternative medicines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#7d7d7d" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hello!</Text>
          <Text style={styles.welcomeSubtitle}>Find your alternative medicine needs</Text>
        </View>

        {/* Services Section Title */}
        <Text style={styles.sectionTitle}>Our Services</Text>
        
        {/* Simple 3-column Grid Layout */}
        <View style={styles.servicesGrid}>
          <FeatureButton 
            title="MediBot"
            icon={<FontAwesome5 name="robot" size={18} color="#fff" />}
            color="#3498db"
            onPress={() => navigation.navigate('Medibot')}
          />
          <FeatureButton 
            title="Pharmacy"
            icon={<FontAwesome5 name="map-marker-alt" size={18} color="#fff" />}
            color="#2ecc71"
            onPress={() => navigation.navigate('Pharmacy')}
          />
          <FeatureButton 
            title="Reminder"
            icon={<AntDesign name="clockcircle" size={18} color="#fff" />}
            color="#9b59b6"
            onPress={() => Alert.alert('AddMedicationScreen')}
          />
          <FeatureButton 
            title="Profile"
            icon={<FontAwesome name="user" size={18} color="#fff" />}
            color="#34495e"
            onPress={() => navigation.navigate('ProfileManagement')}
          />
          <FeatureButton 
            title="Interact"
            icon={<MaterialCommunityIcons name="pill" size={18} color="#fff" />}
            color="#e74c3c"
            onPress={() => navigation.navigate('DrugInteractionScreen')}
          />
          <FeatureButton 
            title="Donate"
            icon={<FontAwesome name="heart" size={18} color="#fff" />}
            color="#f39c12"
            onPress={() => navigation.navigate('Donation')}
          />
        </View>

        {/* Popular or Recommended Section */}
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.recommendedSection}
        >
          <TouchableOpacity 
            key="panadol" 
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('MedInfo', { name: "panadol" })}
          >
            <View style={styles.recommendedImagePlaceholder}>
              <MaterialCommunityIcons name="medication" size={30} color="#fff" />
            </View>
            <Text style={styles.recommendedTitle}>Panadol</Text>
            <Text style={styles.recommendedPrice}>$9.99</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            key="flagyl" 
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('MedInfo', { name: "flagyl" })}
          >
            <View style={styles.recommendedImagePlaceholder}>
              <MaterialCommunityIcons name="medication" size={30} color="#fff" />
            </View>
            <Text style={styles.recommendedTitle}>Flagyl</Text>
            <Text style={styles.recommendedPrice}>$14.99</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            key="benadryl" 
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('MedInfo', { name: "benadryl" })}
          >
            <View style={styles.recommendedImagePlaceholder}>
              <MaterialCommunityIcons name="medication" size={30} color="#fff" />
            </View>
            <Text style={styles.recommendedTitle}>Benadryl</Text>
            <Text style={styles.recommendedPrice}>$12.99</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            key="other" 
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('SearchPage')}
          >
            <View style={styles.recommendedImagePlaceholder}>
              <MaterialCommunityIcons name="medication" size={30} color="#fff" />
            </View>
            <Text style={styles.recommendedTitle}>Other Medicine</Text>
            <Text style={styles.recommendedPrice}>$19.99</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Trending Categories */}
        <Text style={styles.sectionTitle}>Trending Categories</Text>
        <View style={styles.categoriesContainer}>
          {['Ayurvedic', 'Homeopathy', 'Herbal', 'Aromatherapy'].map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryItem}
              onPress={() => console.log(`Category ${category} pressed`)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Pharmacy Locator */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Pharmacy Locator</Text>
        <TouchableOpacity 
          style={styles.mapContainer}
          onPress={() => navigation.navigate('Pharmacy')}
        >
          <View style={styles.mapPlaceholder}>
            <FontAwesome5 name="map-marker-alt" size={30} color="#fff" />
            <Text style={styles.mapText}>Find Nearby Pharmacies</Text>
          </View>
        </TouchableOpacity>

        {/* Spacer at bottom for better scrolling experience */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerIcon: {
    padding: 8,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    marginTop: 8,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  featureButton: {
    width: featureButtonWidth,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureButtonText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#2c3e50',
    textAlign: 'center',
  },
  recommendedSection: {
    marginBottom: 20,
  },
  recommendedItem: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recommendedImagePlaceholder: {
    height: 100,
    backgroundColor: '#3498db',
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  recommendedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  mapContainer: {
    marginBottom: 20,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#3498db',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mapText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
});

export default MedTroveHomePage;