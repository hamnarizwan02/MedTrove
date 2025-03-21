

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   SafeAreaView,
//   Dimensions,
//   Alert,
//   Platform,
//   Linking
// } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { generateMockPharmacies } from './PharmacyData';
// import { StatusBar } from 'expo-status-bar';


// //const GOOGLE_API_KEY = "AIzaSyDVdN0SC0OL3NyrHEMeyh9CcodJZtLZdmg";
// const GOOGLE_API_KEY = "AIzaSyDsTD2yPXDB5czErLyHsR0LI3TMYOCNLok";

// const { width, height } = Dimensions.get('window');

// // FAST University coordinates
// const FAST_UNIVERSITY = {
//   latitude: 33.6518,
//   longitude: 73.0155
// };

// // Specific pharmacies with their coordinates
// const PREDEFINED_PHARMACIES = [
//   {
//     place_id: 'barq_pharmacy',
//     name: 'Barq Pharmacy',
//     vicinity: 'opposite PAEC General Hospital, H-11/4, Islamabad',
//     rating: 4.3,
//     geometry: {
//       location: {
//         lat: 33.6509,
//         lng: 72.9986
//       }
//     }
//   },
//   {
//     place_id: 'al_marwa_pharmacy',
//     name: 'AL Marwa Pharmacy',
//     vicinity: 'near jamia masjid salman farsi, I-10/2, Pakistan town phase 1, Islamabad',
//     rating: 4.1,
//     geometry: {
//       location: {
//         lat: 33.6526,
//         lng: 73.0364
//       }
//     }
//   },
//   {
//     place_id: 'walton_pharmacy',
//     name: 'Walton Pharmacy',
//     vicinity: 'I-10 Markaz, Islamabad',
//     rating: 4.4,
//     geometry: {
//       location: {
//         lat: 33.6508,
//         lng: 73.0370
//       }
//     }
//   },
//   {
//     place_id: 'wecare_pharmacy',
//     name: 'WeCare Pharmacy',
//     vicinity: 'Shop 5,6, Shaukat Plaza, Korang Road, near Faysal Bank, I-10 Markaz, Islamabad',
//     rating: 4.2,
//     geometry: {
//       location: {
//         lat: 33.6506,
//         lng: 73.0385
//       }
//     }
//   },
//   {
//     place_id: 'sk_sons_pharmacy',
//     name: 'SK Son\'s Pharmacy',
//     vicinity: 'G-11 Markaz, Islamabad',
//     rating: 4.5,
//     geometry: {
//       location: {
//         lat: 33.6651,
//         lng: 73.0015
//       }
//     }
//   },
//   {
//     place_id: 'lucky_pharmacy',
//     name: 'Lucky Pharmacy',
//     vicinity: 'Bela Rd, G-10 Markaz, Islamabad',
//     rating: 4.0,
//     geometry: {
//       location: {
//         lat: 33.6748,
//         lng: 73.0136
//       }
//     }
//   },
//   {
//     place_id: 'dwatson_pharmacy',
//     name: 'DWatson Chemist',
//     vicinity: 'G-13/1, Islamabad',
//     rating: 4.6,
//     geometry: {
//       location: {
//         lat: 33.6803,
//         lng: 72.9649
//       }
//     }
//   }
// ];

// const Pharmacy = ({ navigation }) => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [pharmacies, setPharmacies] = useState([]);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const mapRef = useRef(null);

//   // Get user's current location when component mounts
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const { status } = await Location.requestForegroundPermissionsAsync();
        
//         if (status !== 'granted') {
//           setErrorMsg('Permission to access location was denied');
//           setLoading(false);
//           // Set default location to FAST University
//           setDefaultLocation();
//           return;
//         }

//         const currentLocation = await Location.getCurrentPositionAsync({});
//         const userLocation = {
//           latitude: currentLocation.coords.latitude,
//           longitude: currentLocation.coords.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         };
        
//         setLocation(userLocation);
        
//         // Fetch pharmacies near current location
//         fetchNearbyPharmacies(userLocation.latitude, userLocation.longitude);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error getting location:', error);
//         setErrorMsg('Failed to get current location');
//         setLoading(false);
//         // Set default location to FAST University
//         setDefaultLocation();
//       }
//     })();
//   }, []);

//   // Function to fetch nearby pharmacies
//   const fetchNearbyPharmacies = async (latitude, longitude) => {
//     try {
//       setLoading(true);
      
//       // Use fixed radius of 5km (5000 meters)
//       const radiusInMeters = 5000;
      
//       const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&type=pharmacy&key=${GOOGLE_API_KEY}`;
      
//       const response = await fetch(placesUrl);
//       const data = await response.json();
      
//       if (data.status === 'OK') {
//         setPharmacies(data.results);
//       } else {
//         console.log('Error finding pharmacies:', data.status);
//         // Create mock data if the API fails
//         const mockData = generateMockPharmacies(latitude, longitude, 5); // Fixed 5km radius
//         setPharmacies(mockData);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching nearby pharmacies:', error);
//       // Generate mock data on error
//       const mockData = generateMockPharmacies(latitude, longitude, 5); // Fixed 5km radius
//       setPharmacies(mockData);
//       setLoading(false);
//     }
//   };

//   // Function to select a pharmacy without showing directions on the map
//   const selectPharmacy = (pharmacy) => {
//     setSelectedPharmacy(pharmacy);
    
//     if (!location) {
//       Alert.alert('Location error', 'Unable to get your current location. Please try again later.');
//       return;
//     }
    
//     // Just focus the map on the pharmacy location
//     const pharmacyCoords = {
//       latitude: pharmacy.geometry.location.lat,
//       longitude: pharmacy.geometry.location.lng,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01
//     };
    
//     mapRef.current?.animateToRegion(pharmacyCoords, 1000);
//   };

//   // Function to refresh and search for pharmacies at current location
//   const refreshPharmacies = async () => {
//     if (!location) {
//       Alert.alert('Location error', 'Unable to get your current location. Please try again later.');
//       return;
//     }
    
//     try {
//       setLoading(true);
      
//       // Get updated current location
//       const currentLocation = await Location.getCurrentPositionAsync({});
//       const userLocation = {
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       };
      
//       setLocation(userLocation);
      
//       // Center map on current location
//       mapRef.current?.animateToRegion(userLocation, 1000);
      
//       // Fetch pharmacies near current location
//       await fetchNearbyPharmacies(userLocation.latitude, userLocation.longitude);
      
//     } catch (error) {
//       console.error('Error refreshing:', error);
//       Alert.alert('Refresh error', 'Unable to refresh. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to open Google Maps for navigation
//   const navigateToPharmacy = () => {
//     if (!selectedPharmacy || !location) {
//       Alert.alert('Please select a pharmacy first',
//                   'Select a pharmacy before navigating.');
//       return;
//     }
    
//     const { lat, lng } = selectedPharmacy.geometry.location;
//     const startLat = location.latitude;
//     const startLng = location.longitude;
    
//     // Create a web URL that works across all platforms
//     const webUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${lat},${lng}&travelmode=driving`;
    
//     // Attempt to open the URL
//     Linking.canOpenURL(webUrl)
//       .then(supported => {
//         if (supported) {
//           return Linking.openURL(webUrl);
//         } else {
//           // If that fails, try the app-specific URLs as fallback
//           const appUrl = Platform.select({
//             ios: `maps://app?saddr=${startLat},${startLng}&daddr=${lat},${lng}`,
//             android: `google.navigation:q=${lat},${lng}&saddr=${startLat},${startLng}`
//           });
          
//           return Linking.openURL(appUrl).catch(err => {
//             console.error('Failed to open maps app:', err);
//             Alert.alert('Could not open maps application', 
//                        'Please make sure you have Google Maps installed.');
//           });
//         }
//       })
//       .catch(error => {
//         console.error('Error opening maps app:', error);
//         Alert.alert('Navigation error', 
//                   'Could not open the maps application. Please try again later.');
//       });
//   };

//   // Render pharmacy item for the FlatList
//   const renderPharmacyItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.pharmacyItem,
//         selectedPharmacy && selectedPharmacy.place_id === item.place_id && styles.selectedPharmacyItem
//       ]}
//       onPress={() => selectPharmacy(item)}
//     >
//       <Text style={styles.pharmacyName}>{item.name}</Text>
//       <Text style={styles.pharmacyAddress}>{item.vicinity}</Text>
//       <Text style={styles.pharmacyRating}>
//         Rating: {item.rating ? `${item.rating} ⭐` : 'No rating'}
//       </Text>
//     </TouchableOpacity>
//   );

//   // Initial load of pharmacies using FAST University as default
//   useEffect(() => {
//     if (!pharmacies.length) {
//       const fastUniversityLocation = {
//         latitude: FAST_UNIVERSITY.latitude,
//         longitude: FAST_UNIVERSITY.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       };
      
//       setSearchLocation(fastUniversityLocation);
//       filterPredefinedPharmacies(FAST_UNIVERSITY.latitude, FAST_UNIVERSITY.longitude);
//     }
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="auto" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => {
//             // Handle navigation - check if we can go back
//             if (navigation && navigation.canGoBack && navigation.canGoBack()) {
//               navigation.goBack();
//             } else {
//               console.log('No screen to go back to');
//             }
//           }}
//         >
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Pharmacy Locator</Text>
        
//         {/* Add refresh button to header */}
//         <TouchableOpacity 
//           style={styles.refreshButton}
//           onPress={refreshPharmacies}
//           disabled={loading}
//         >
//           <Ionicons name="refresh" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
      

      
//       {/* Map View */}
//       <View style={styles.mapContainer}>
//         {(location || searchLocation) ? (
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             provider={PROVIDER_GOOGLE}
//             initialRegion={searchLocation || location || {
//               latitude: FAST_UNIVERSITY.latitude,
//               longitude: FAST_UNIVERSITY.longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//             showsUserLocation={true}
//             showsMyLocationButton={true}
//           >
//             {/* Current Location Marker */}
//             {location && (
//               <Marker
//                 coordinate={location}
//                 pinColor="#2196F3"
//                 title="Your Location"
//               />
//             )}
            
//             {/* Pharmacy Markers */}
//             {pharmacies.map((pharmacy) => (
//               <Marker
//                 key={pharmacy.place_id}
//                 coordinate={{
//                   latitude: pharmacy.geometry.location.lat,
//                   longitude: pharmacy.geometry.location.lng
//                 }}
//                 title={pharmacy.name}
//                 description={pharmacy.vicinity}
//                 pinColor={selectedPharmacy && selectedPharmacy.place_id === pharmacy.place_id ? "#FF6347" : "#4CAF50"}
//                 onPress={() => selectPharmacy(pharmacy)}
//               >
//                 <MaterialIcons name="local-pharmacy" size={30} color={selectedPharmacy && selectedPharmacy.place_id === pharmacy.place_id ? "#FF6347" : "#4CAF50"} />
//               </Marker>
//             ))}
//           </MapView>
//         ) : (
//           <View style={styles.loadingContainer}>
//             {errorMsg ? (
//               <Text style={styles.errorText}>{errorMsg}</Text>
//             ) : (
//               <ActivityIndicator size="large" color="#2196F3" />
//             )}
//           </View>
//         )}
//       </View>
      
//       {/* Pharmacy List */}
//       <View style={styles.pharmacyListContainer}>
//         <Text style={styles.pharmacyListTitle}>
//           {pharmacies.length > 0 
//             ? `Found ${pharmacies.length} Pharmacies Nearby`
//             : 'Searching for nearby pharmacies...'}
//         </Text>
        
//         {loading ? (
//           <ActivityIndicator size="large" color="#2196F3" />
//         ) : (
//           <FlatList
//             data={pharmacies}
//             renderItem={renderPharmacyItem}
//             keyExtractor={item => item.place_id}
//             horizontal
//             showsHorizontalScrollIndicator={true}
//             contentContainerStyle={styles.pharmacyList}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2196F3',
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     flex: 1,
//   },
//   refreshButton: {
//     padding: 5,
//   },

//   mapContainer: {
//     flex: 1,
//     margin: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     padding: 10,
//   },
//   pharmacyListContainer: {
//     height: 200,
//     margin: 10,
//   },
//   pharmacyListTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   pharmacyList: {
//     paddingVertical: 5,
//   },
//   pharmacyItem: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     marginRight: 15,
//     width: 250,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//   },
//   selectedPharmacyItem: {
//     backgroundColor: '#e3f2fd',
//     borderColor: '#2196F3',
//     borderWidth: 2,
//   },
//   pharmacyName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   pharmacyAddress: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 5,
//   },
//   pharmacyRating: {
//     fontSize: 14,
//     color: '#FF9800',
//   }
// });

// export default Pharmacy;


import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Alert,
  Platform,
  Linking
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { generateMockPharmacies } from './PharmacyData';
import { StatusBar } from 'expo-status-bar';


const GOOGLE_API_KEY = "AIzaSyDsTD2yPXDB5czErLyHsR0LI3TMYOCNLok";

const { width, height } = Dimensions.get('window');

const Pharmacy = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  // Get user's current location when component mounts
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        const userLocation = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        
        setLocation(userLocation);
        
        // Fetch pharmacies near current location
        fetchNearbyPharmacies(userLocation.latitude, userLocation.longitude);
        
        setLoading(false);
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Failed to get current location');
        setLoading(false);
      }
    })();
  }, []);

  // Function to fetch nearby pharmacies
  const fetchNearbyPharmacies = async (latitude, longitude) => {
    try {
      setLoading(true);
      
      // Use fixed radius of 5km (5000 meters)
      const radiusInMeters = 5000;
      
      // Get pharmacies using our predefined data in PharmacyData.js
      const mockData = generateMockPharmacies(latitude, longitude, 5); // Fixed 5km radius
      setPharmacies(mockData);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nearby pharmacies:', error);
      const mockData = generateMockPharmacies(latitude, longitude, 5); // Fixed 5km radius
      setPharmacies(mockData);
      setLoading(false);
    }
  };

  // Function to select a pharmacy without showing directions on the map
  const selectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    
    // Check if a location is selected
    if (!location) {
      Alert.alert('Location error', 'Unable to get your current location. Please try again later.');
      return;
    }
    
    // Just focus the map on the pharmacy location
    const pharmacyCoords = {
      latitude: pharmacy.geometry.location.lat,
      longitude: pharmacy.geometry.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
    
    mapRef.current?.animateToRegion(pharmacyCoords, 1000);
  };

  // Function to refresh and search for pharmacies at current location
  const refreshPharmacies = async () => {
    if (!location) {
      Alert.alert('Location error', 'Unable to get your current location. Please try again later.');
      return;
    }
    
    try {
      setLoading(true);
      
      // Get updated current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      
      setLocation(userLocation);
      
      // Center map on current location
      mapRef.current?.animateToRegion(userLocation, 1000);
      
      // Fetch pharmacies near current location
      await fetchNearbyPharmacies(userLocation.latitude, userLocation.longitude);
      
    } catch (error) {
      console.error('Error refreshing:', error);
      Alert.alert('Refresh error', 'Unable to refresh. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to open Google Maps for navigation
  const navigateToPharmacy = () => {
    if (!selectedPharmacy || !location) {
      Alert.alert('Please select a pharmacy first',
                  'Select a pharmacy before navigating.');
      return;
    }
    
    const { lat, lng } = selectedPharmacy.geometry.location;
    const startLat = location.latitude;
    const startLng = location.longitude;
    
    // Create a web URL that works across all platforms
    // This is the most reliable way to open Google Maps with directions
    const webUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${lat},${lng}&travelmode=driving`;
    
    // Attempt to open the URL
    Linking.canOpenURL(webUrl)
      .then(supported => {
        if (supported) {
          return Linking.openURL(webUrl);
        } else {
          // If that fails, try the app-specific URLs as fallback
          const appUrl = Platform.select({
            ios: `maps://app?saddr=${startLat},${startLng}&daddr=${lat},${lng}`,
            android: `google.navigation:q=${lat},${lng}&saddr=${startLat},${startLng}`
          });
          
          return Linking.openURL(appUrl).catch(err => {
            console.error('Failed to open maps app:', err);
            Alert.alert('Could not open maps application', 
                       'Please make sure you have Google Maps installed.');
          });
        }
      })
      .catch(error => {
        console.error('Error opening maps app:', error);
        Alert.alert('Navigation error', 
                   'Could not open the maps application. Please try again later.');
      });
  };


  const fetchNearbyPharmacyies = async (latitude, longitude) => {
        try {
          setLoading(true);
          
          // Use fixed radius of 5km (5000 meters)
          const radiusInMeters = 5000;
          
          const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&type=pharmacy&key=${GOOGLE_API_KEY}`;
          
          const response = await fetch(placesUrl);
          const data = await response.json();
          
          if (data.status === 'OK') {
            setPharmacies(data.results);
          } else {
            console.log('Error finding pharmacies:', data.status);
            // Create mock data if the API fails
            const mockData = generateMockPharmacies(latitude, longitude, 5); // Fixed 5km radius
            setPharmacies(mockData);
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error fetching nearby pharmacies:', error);
          // Generate mock data on error
          const mockData = generateMockPharmacies(latitude, longitude, 5); // Fixed 5km radius
          setPharmacies(mockData);
          setLoading(false);
        }
      };

  // Render pharmacy item for the FlatList
  const renderPharmacyItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.pharmacyItem,
        selectedPharmacy && selectedPharmacy.place_id === item.place_id && styles.selectedPharmacyItem
      ]}
      onPress={() => selectPharmacy(item)}
    >
      <Text style={styles.pharmacyName}>{item.name}</Text>
      <Text style={styles.pharmacyAddress}>{item.vicinity}</Text>
      <Text style={styles.pharmacyRating}>
        Rating: {item.rating ? `${item.rating} ⭐` : 'No rating'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            // Handle navigation - check if we can go back
            if (navigation && navigation.canGoBack && navigation.canGoBack()) {
              navigation.goBack();
            } else {
              console.log('No screen to go back to');
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pharmacy Locator</Text>
        
        {/* Add refresh button to header */}
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={refreshPharmacies}
          disabled={loading}
        >
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Map View */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={location}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* Current Location Marker */}
            {location && (
              <Marker
                coordinate={location}
                pinColor="#2196F3"
                title="Your Location"
              />
            )}
            
            {/* Pharmacy Markers */}
            {pharmacies.map((pharmacy) => (
              <Marker
                key={pharmacy.place_id}
                coordinate={{
                  latitude: pharmacy.geometry.location.lat,
                  longitude: pharmacy.geometry.location.lng
                }}
                title={pharmacy.name}
                description={pharmacy.vicinity}
                pinColor={selectedPharmacy && selectedPharmacy.place_id === pharmacy.place_id ? "#FF6347" : "#4CAF50"}
                onPress={() => selectPharmacy(pharmacy)}
              >
                <MaterialIcons name="local-pharmacy" size={30} color={selectedPharmacy && selectedPharmacy.place_id === pharmacy.place_id ? "#FF6347" : "#4CAF50"} />
              </Marker>
            ))}
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            {errorMsg ? (
              <Text style={styles.errorText}>{errorMsg}</Text>
            ) : (
              <ActivityIndicator size="large" color="#2196F3" />
            )}
          </View>
        )}
      </View>
      
      {/* Pharmacy List */}
      <View style={styles.pharmacyListContainer}>
        <Text style={styles.pharmacyListTitle}>
          {pharmacies.length > 0 
            ? `Found ${pharmacies.length} Pharmacies Nearby`
            : 'Searching for nearby pharmacies...'}
        </Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <FlatList
            data={pharmacies}
            renderItem={renderPharmacyItem}
            keyExtractor={item => item.place_id}
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.pharmacyList}
          />
        )}
      </View>
      
      {/* Navigation Button */}
      {selectedPharmacy && (
        <TouchableOpacity 
          style={styles.navigateButton}
          onPress={navigateToPharmacy}
        >
          <Text style={styles.navigateButtonText}>Navigate to {selectedPharmacy.name}</Text>
          <Ionicons name="navigate" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  refreshButton: {
    padding: 5,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  pharmacyListContainer: {
    height: 200,
    margin: 10,
  },
  pharmacyListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pharmacyList: {
    paddingVertical: 5,
  },
  pharmacyItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 250,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  selectedPharmacyItem: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  pharmacyRating: {
    fontSize: 14,
    color: '#FF9800',
  },
  navigateButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default Pharmacy;