// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   Dimensions,
//   Alert,
//   Keyboard,
//   Image
// } from 'react-native';
// import { 
//   Ionicons, 
//   FontAwesome, 
//   MaterialCommunityIcons,
//   FontAwesome5,
//   AntDesign
// } from '@expo/vector-icons';
// import axios from 'axios';
// import CONFIG from './config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');
// const featureButtonWidth = (width - 64) / 3; // 3 buttons per row with padding

// const MedTroveHomePage = (props) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userId, setUserId] = useState(null);
//   const navigation = props.navigation || useNavigation();

//   // Handle search submission (migrated from search.js)
//   const handleSearchSubmit = async () => {
//     Keyboard.dismiss();
//     console.log('Search term:', searchQuery);
    
//     try {
//       const response = await axios.get(`${CONFIG.backendUrl}/api/medicines/${searchQuery}`);
      
//       if (response.status === 404) {
//         console.log('Medicine not found');
//         return;
//       }
      
//       const medicines = response.data;
      
//       if (Array.isArray(medicines) && medicines.length > 0) {
//         console.log('Found medicines:', medicines);
//         const firstMedicine = medicines[0]; // Get the first medicine from the array
//         if (firstMedicine._id) {
//           console.log(`Navigating to product with ID: ${firstMedicine._id}`);
//           navigation.navigate('ProductList', { id: firstMedicine._id });
//         } else {
//           console.error('Medicine ID not found in first result:', firstMedicine);
//         }
//       } else {
//         console.error('No medicines found or unexpected response format:', medicines);
//       }
//     } catch (error) {
//       console.error('Error fetching medicine:', error);
//     }
//   };

//   // Function to fetch medicine by name (migrated from search.js)
//   const fetchMedicine = async (medicine) => {
//     try {
//       const response = await axios.get(`${CONFIG.backendUrl}/api/medicines/${medicine}`);
//       const medicineData = response.data;
      
//       if (typeof medicineData === 'object' && medicineData !== null && medicineData._id) {
//         navigation.navigate('MedInfo', { id: medicineData._id });
//       } else {
//         console.error('Medicine ID not found in response:', medicineData);
//       }
//     } catch (error) {
//       console.error('Error fetching medicine:', error);
//     }
//   };

//   // Feature button component for reusability
//   const FeatureButton = ({ title, icon, color, onPress }) => (
//     <TouchableOpacity 
//       style={styles.featureButton}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View style={[styles.iconContainer, { backgroundColor: color }]}>
//         {icon}
//       </View>
//       <Text style={styles.featureButtonText}>{title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
//       {/* Header with profile and cart icons */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.headerIcon} 
//           onPress={() => navigation.navigate('ProfileManagement')}
//         >
//           <FontAwesome name="user-circle" size={28} color="#2c3e50" />
//         </TouchableOpacity>
        
//         <Text style={styles.logo}>MedTrove</Text>
        
//         <TouchableOpacity 
//           style={styles.headerIcon}
//           onPress={() => navigation.navigate('Cart')}
//         >
//           <FontAwesome name="shopping-cart" size={24} color="#2c3e50" />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search" size={20} color="#7d7d7d" style={styles.searchIcon} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search alternative medicines..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             returnKeyType="search"
//             onSubmitEditing={handleSearchSubmit}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Ionicons name="close-circle" size={20} color="#7d7d7d" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Main Content */}
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Welcome message */}
//         <View style={styles.welcomeSection}>
//           <Text style={styles.welcomeTitle}>Hello!</Text>
//           <Text style={styles.welcomeSubtitle}>Find your alternative medicine needs</Text>
//         </View>

//         {/* Services Section Title */}
//         <Text style={styles.sectionTitle}>Our Services</Text>
        
//         {/* Simple 3-column Grid Layout */}
//         <View style={styles.servicesGrid}>
//           <FeatureButton 
//             title="MediBot"
//             icon={<FontAwesome5 name="robot" size={18} color="#fff" />}
//             color="#3498db"
//             onPress={() => navigation.navigate('Medibot')}
//           />
//           <FeatureButton 
//             title="Pharmacy"
//             icon={<FontAwesome5 name="map-marker-alt" size={18} color="#fff" />}
//             color="#2ecc71"
//             onPress={() => navigation.navigate('Pharmacy')}
//           />
//           <FeatureButton 
//             title="Reminder"
//             icon={<AntDesign name="clockcircle" size={18} color="#fff" />}
//             color="#9b59b6"
//             onPress={() => navigation.navigate('MedicationListScreen')}
//             // onPress={() => Alert.alert('AddMedicationScreen')}
//           />
//           <FeatureButton 
//             title="Profile"
//             icon={<FontAwesome name="user" size={18} color="#fff" />}
//             color="#34495e"
//             onPress={() => navigation.navigate('ProfileManagement')}
//           />
//           <FeatureButton 
//             title="Interact"
//             icon={<MaterialCommunityIcons name="pill" size={18} color="#fff" />}
//             color="#e74c3c"
//             onPress={() => navigation.navigate('DrugInteractionScreen')}
//           />
//           <FeatureButton 
//             title="Donate"
//             icon={<FontAwesome name="heart" size={18} color="#fff" />}
//             color="#f39c12"
//             onPress={() => navigation.navigate('Donation')}
//           />
//         </View>

//         {/* Popular or Recommended Section */}
//         <Text style={styles.sectionTitle}>Recommended for You</Text>
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           style={styles.recommendedSection}
//         >
  
//            <TouchableOpacity 
//               key="panadol" 
//               style={styles.recommendedItem}
//               onPress={() => navigation.navigate('MedInfo', { name: "panadol" })}
//             >
//               <Image 
//                 source={require('./assets/panadol.jpeg')} 
//                 style={styles.recommendedImage} 
//                 resizeMode="cover"
//               />
//               <Text style={styles.recommendedTitle}>Panadol</Text>
//               <Text style={styles.recommendedPrice}>PKR 87.34</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             key="flagyl" 
//             style={styles.recommendedItem}
//             onPress={() => navigation.navigate('MedInfo', { name: "flagyl" })}
//           >
//             <Image 
//               source={require('./assets/flagyl.jpeg')} 
//               style={styles.recommendedImage} 
//               resizeMode="cover"
//             />
//             <Text style={styles.recommendedTitle}>Flagyl</Text>
//             <Text style={styles.recommendedPrice}>PKR 87.40</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//            key="benadryl" 
//             style={styles.recommendedItem}
//             onPress={() => navigation.navigate('MedInfo', { name: "benadryl" })}
//           >
//           <Image 
//             source={require('./assets/benad.jpeg')} 
//             style={styles.recommendedImage} 
//             resizeMode="contain"
//           />
//           <Text style={styles.recommendedTitle}>Benadryl</Text>
//           <Text style={styles.recommendedPrice}>PKR 430.50</Text>
//         </TouchableOpacity>
          
//         <TouchableOpacity 
//            key="Buscopan" 
//             style={styles.recommendedItem}
//             onPress={() => navigation.navigate('MedInfo', { name: "Buscopan" })}
//           >
//           <Image 
//             source={require('./assets/busopan.png')} 
//             style={styles.recommendedImage} 
//             resizeMode="contain"
//           />
//           <Text style={styles.recommendedTitle}>Buscopan</Text>
//           <Text style={styles.recommendedPrice}>PKR 138.25</Text>
//         </TouchableOpacity>

//         </ScrollView>

//         {/* Trending Categories */}
//         {/* <Text style={styles.sectionTitle}>Trending Categories</Text>
//         <View style={styles.categoriesContainer}>
//           {['Ayurvedic', 'Homeopathy', 'Herbal', 'Aromatherapy'].map((category, index) => (
//             <TouchableOpacity 
//               key={index} 
//               style={styles.categoryItem}
//               onPress={() => console.log(`Category ${category} pressed`)}
//             >
//               <Text style={styles.categoryText}>{category}</Text>
//             </TouchableOpacity>
//           ))}
//         </View> */}
        
//         {/* Pharmacy Locator */}
//         <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Pharmacy Locator</Text>
//         <TouchableOpacity 
//           style={styles.mapContainer}
//           onPress={() => navigation.navigate('Pharmacy')}
//         >
//           <View style={styles.mapPlaceholder}>
//             <FontAwesome5 name="map-marker-alt" size={30} color="#fff" />
//             <Text style={styles.mapText}>Find Nearby Pharmacies</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Spacer at bottom for better scrolling experience */}
//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   recommendedImage: {
//     width: 120,  // Adjust size based on your UI
//     height: 100,
//     borderRadius: 8, // Optional rounded corners
//     marginBottom: 8, // Space between image and text
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f6fa',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   headerIcon: {
//     padding: 8,
//   },
//   logo: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//   },
//   searchContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#ffffff',
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f1f3f6',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//     paddingVertical: 0,
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   welcomeSection: {
//     marginBottom: 20,
//   },
//   welcomeTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 4,
//   },
//   welcomeSubtitle: {
//     fontSize: 16,
//     color: '#7f8c8d',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 16,
//     marginTop: 8,
//   },
//   servicesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },
//   featureButton: {
//     width: featureButtonWidth,
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 8,
//     marginBottom: 12,
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   iconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   featureButtonText: {
//     fontSize: 11,
//     fontWeight: '500',
//     color: '#2c3e50',
//     textAlign: 'center',
//   },
//   recommendedSection: {
//     marginBottom: 20,
//   },
//   recommendedItem: {
//     width: 150,
//     marginRight: 16,
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   recommendedImagePlaceholder: {
//     height: 100,
//     backgroundColor: '#3498db',
//     borderRadius: 8,
//     marginBottom: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   recommendedTitle: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#2c3e50',
//     marginBottom: 4,
//   },
//   recommendedPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#27ae60',
//   },
//   categoriesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   categoryItem: {
//     width: '48%',
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//     alignItems: 'center',
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#2c3e50',
//   },
//   mapContainer: {
//     marginBottom: 20,
//   },
//   mapPlaceholder: {
//     height: 150,
//     backgroundColor: '#3498db',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   mapText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop: 8,
//   },
// });

// export default MedTroveHomePage;






//UI IMPROVED CODE
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
  Image,
  ImageBackground
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
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const featureButtonWidth = (width - 64) / 3; // 3 buttons per row with padding

const MedTroveHomePage = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState(null);
  const [cartCount, setCartCount] = useState(0); // Add state for cart count
  const navigation = props.navigation || useNavigation();

  // Add useEffect to fetch cart count when component mounts
  // useEffect(() => {
  //   fetchCartCount();
  // }, []);

  useEffect(() => {
    // Fetch initial cart count when component mounts
    fetchCartCount();
    
    // Set up a listener for when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('HomePage focused - refreshing cart count');
      fetchCartCount();
    });
    
    // Clean up the listener on unmount
    return unsubscribe;
  }, [navigation]);

  // Function to fetch cart count
  const fetchCartCount = async () => {
    try {
      const response = await axios.get(`${CONFIG.backendUrl}/api/cart/current`);
      const formattedCart = {
        ...response.data,
        Quantity: response.data.Quantity.map(qty => parseInt(qty, 10)),
      };

      // Calculate total items in cart by summing quantities
      const totalItems = formattedCart.Quantity 
        ? formattedCart.Quantity.reduce((sum, qty) => sum + qty, 0)
        : 0;
      
      setCartCount(totalItems);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0); // Set to 0 if there's an error
    }
  };

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
          onPress={() => {
            //fetchCartCount(); // Refresh cart count before navigating
            navigation.navigate('Cart');
          }}
        >
          <FontAwesome name="shopping-cart" size={24} color="#2c3e50" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Rest of the component remains unchanged */}
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
            onPress={() => navigation.navigate('MedicationListScreen')}
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
          contentContainerStyle={styles.recommendedContainer}
        >
          <TouchableOpacity 
            key="panadol" 
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('MedInfo', { name: "panadol" })}
          >
            <View style={styles.recommendedImageContainer}>
              <Image 
                source={require('./assets/panadol.jpeg')} 
                style={styles.recommendedImage} 
                resizeMode="cover"
              />
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>15% OFF</Text>
              </View>
            </View>
            <View style={styles.recommendedContent}>
              <Text style={styles.recommendedTitle}>Panadol</Text>
              <Text style={styles.recommendedDesc}>Pain Relief</Text>
              <Text style={styles.recommendedPrice}>PKR 87.34</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            key="flagyl" 
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('MedInfo', { name: "flagyl" })}
          >
            <View style={styles.recommendedImageContainer}>
              <Image 
                source={require('./assets/flagyl.jpeg')} 
                style={styles.recommendedImage} 
                resizeMode="cover"
              />
            </View>
            <View style={styles.recommendedContent}>
              <Text style={styles.recommendedTitle}>Flagyl</Text>
              <Text style={styles.recommendedDesc}>Antibiotic</Text>
              <Text style={styles.recommendedPrice}>PKR 87.40</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            key="benadryl" 
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('MedInfo', { name: "benadryl" })}
          >
            <View style={styles.recommendedImageContainer}>
              <Image 
                source={require('./assets/benad.jpeg')} 
                style={styles.recommendedImage} 
                resizeMode="contain"
              />
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>10% OFF</Text>
              </View>
            </View>
            <View style={styles.recommendedContent}>
              <Text style={styles.recommendedTitle}>Benadryl</Text>
              <Text style={styles.recommendedDesc}>Allergy Relief</Text>
              <Text style={styles.recommendedPrice}>PKR 430.50</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            key="Buscopan" 
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('MedInfo', { name: "Buscopan" })}
          >
            <View style={styles.recommendedImageContainer}>
              <Image 
                source={require('./assets/busopan.png')} 
                style={styles.recommendedImage} 
                resizeMode="contain"
              />
            </View>
            <View style={styles.recommendedContent}>
              <Text style={styles.recommendedTitle}>Buscopan</Text>
              <Text style={styles.recommendedDesc}>Stomach Relief</Text>
              <Text style={styles.recommendedPrice}>PKR 138.25</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Pharmacy Locator */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Pharmacy Locator</Text>
        <TouchableOpacity 
          style={styles.mapContainer}
          //onPress={() => navigation.navigate('Pharmacy')}
        >
          <ImageBackground 
            source={require('./assets/map_background.jpg')}
            style={styles.mapBackground}
            imageStyle={styles.mapBackgroundImage}
          >
            <LinearGradient
              colors={['rgba(5, 46, 74, 0.7)', 'rgba(70, 119, 152, 0.9)']}
              style={styles.mapGradient}
            >
              <View style={styles.mapIconContainer}>
                <FontAwesome5 name="map-marker-alt" size={34} color="#fff" />
              </View>
              <Text style={styles.mapText}>Find Nearby Pharmacies</Text>
              <View style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Explore Now</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
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
    backgroundColor: '#f0f5fa',
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerIcon: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 4, // Increased for more dimension
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 40, // Increased size
    height: 40, // Increased size
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  featureButtonText: {
    fontSize: 12,
    fontWeight: '600', // Made bolder
    color: '#2c3e50',
    textAlign: 'center',
  },
  recommendedSection: {
    marginBottom: 20,
  },
  recommendedContainer: {
    paddingRight: 16,
    paddingBottom: 8, // Added padding to prevent cutoff
  },
  recommendedItem: {
    width: 160, // Wider for more content
    height: 220, // Fixed height to prevent cutoff
    marginRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 5, // Increased for more dimension
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    overflow: 'hidden', // Prevents content from spilling out
  },
  recommendedImageContainer: {
    position: 'relative',
    height: 120, // Fixed height for image section
  },
  recommendedImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recommendedContent: {
    padding: 10,
    height: 100, // Fixed height for content section
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 2,
  },
  recommendedDesc: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 6,
  },
  recommendedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden', // Ensures the child's border radius is respected
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  mapBackground: {
    height: 160,
    width: '100%',
  },
  mapBackgroundImage: {
    borderRadius: 12,
  },
  mapGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mapIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  mapButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  mapButtonText: {
    color: '#3498db',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default MedTroveHomePage;