
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   SafeAreaView,
//   Dimensions,
//   Alert,
//   Platform,
//   Linking
// } from 'react-native';
// import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';

// // Replace with your actual Google Maps API key
// // Make sure this key has the following APIs enabled:
// // - Maps SDK for Android/iOS
// // - Places API
// // - Directions API
// // - Geocoding API

// //const GOOGLE_API_KEY = "YOUR_API_KEY_HERE";

// const { width, height } = Dimensions.get('window');

// const Pharmacy = ({ navigation }) => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchLocation, setSearchLocation] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [pharmacies, setPharmacies] = useState([]);
//   const [selectedPharmacy, setSelectedPharmacy] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [radiusKm, setRadiusKm] = useState(5); // Default radius in km
//   const [directionsPolyline, setDirectionsPolyline] = useState(null);
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
//           return;
//         }

//         const currentLocation = await Location.getCurrentPositionAsync({});
//         setLocation({
//           latitude: currentLocation.coords.latitude,
//           longitude: currentLocation.coords.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error getting location:', error);
//         setErrorMsg('Failed to get current location');
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Function to handle search input changes
//   const handleSearchInput = (text) => {
//     setSearchQuery(text);
    
//     // Simple local suggestion for demo purposes
//     if (text.length >= 3) {
//       // Create some mock suggestions based on input text
//       // This avoids API rate limits/permissions issues
//       const mockSuggestions = [
//         {
//           place_id: 'place_1',
//           description: `${text} in Islamabad`,
//           structured_formatting: {
//             main_text: text,
//             secondary_text: 'Islamabad, Pakistan'
//           }
//         },
//         {
//           place_id: 'place_2',
//           description: `${text} in Rawalpindi`,
//           structured_formatting: {
//             main_text: text,
//             secondary_text: 'Rawalpindi, Pakistan'
//           }
//         },
//         {
//           place_id: 'place_3', 
//           description: `${text} in Lahore`,
//           structured_formatting: {
//             main_text: text,
//             secondary_text: 'Lahore, Pakistan'
//           }
//         }
//       ];
      
//       setSuggestions(mockSuggestions);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   // Function to select a place from suggestions
//   const selectPlace = async (placeId, description) => {
//     setSearchQuery(description);
//     setShowSuggestions(false);
    
//     try {
//       setLoading(true);
      
//       // For demo purposes, we'll use geocoding API directly with the description
//       // This is more likely to work than the places API which requires specific permissions
//       const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(description)}&key=${GOOGLE_API_KEY}`;
//       const response = await fetch(geocodingUrl);
//       const data = await response.json();
      
//       if (data.status === 'OK' && data.results.length > 0) {
//         const { lat, lng } = data.results[0].geometry.location;
//         const newLocation = {
//           latitude: lat,
//           longitude: lng,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         };
        
//         setSearchLocation(newLocation);
        
//         // Animate map to the searched location
//         mapRef.current?.animateToRegion(newLocation, 1000);
        
//         // Search for pharmacies near this location
//         fetchNearbyPharmacies(lat, lng);
//       } else {
//         // If the geocoding API fails, fall back to a simple simulation
//         // This ensures the demo still works even with API issues
//         simulateLocationSearch(description);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error getting location:', error);
//       // Fall back to simulation on error
//       simulateLocationSearch(description);
//       setLoading(false);
//     }
//   };
  
//   // Fallback function if API fails
//   const simulateLocationSearch = (description) => {
//     // Extract city name from description
//     const cityMatch = description.match(/(in|near)\s+([A-Za-z\s]+)/);
//     let location;
    
//     if (cityMatch && cityMatch[2]) {
//       const city = cityMatch[2].trim();
      
//       // Predefined coordinates for common Pakistani cities
//       switch(city.toLowerCase()) {
//         case 'islamabad':
//           location = { latitude: 33.6844, longitude: 73.0479 };
//           break;
//         case 'rawalpindi':
//           location = { latitude: 33.5651, longitude: 73.0169 };
//           break;
//         case 'lahore':
//           location = { latitude: 31.5204, longitude: 74.3587 };
//           break;
//         default:
//           // Default to Islamabad
//           location = { latitude: 33.6844, longitude: 73.0479 };
//       }
//     } else {
//       // Default to Islamabad
//       location = { latitude: 33.6844, longitude: 73.0479 };
//     }
    
//     const newLocation = {
//       ...location,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     };
    
//     setSearchLocation(newLocation);
//     mapRef.current?.animateToRegion(newLocation, 1000);
//     fetchNearbyPharmacies(newLocation.latitude, newLocation.longitude);
//   };

//   // Function to fetch nearby pharmacies
//   const fetchNearbyPharmacies = async (latitude, longitude) => {
//     try {
//       setLoading(true);
      
//       // Convert radius from km to meters for the API
//       const radiusInMeters = radiusKm * 1000;
      
//       const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&type=pharmacy&key=${GOOGLE_API_KEY}`;
      
//       const response = await fetch(placesUrl);
//       const data = await response.json();
      
//       if (data.status === 'OK') {
//         setPharmacies(data.results);
//       } else {
//       //  console.log('Error finding pharmacies:', data.status);
//         // Create mock data if the API fails
//         generateMockPharmacies(latitude, longitude, radiusKm);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching nearby pharmacies:', error);
//       // Generate mock data on error
//       generateMockPharmacies(latitude, longitude, radiusKm);
//       setLoading(false);
//     }
//   };
  
//   // Generate mock pharmacy data if API fails
//   const generateMockPharmacies = (latitude, longitude, radius) => {
//     const mockPharmacies = [];
//     const pharmacyNames = [
//       'MedPoint Pharmacy',
//       'HealthCare Pharmacy',
//       'City Pharmacy',
//       'Family Pharmacy',
//       'Care Plus Pharmacy',
//       'Metro Pharmacy',
//       'Wellness Pharmacy',
//       'Community Pharmacy',
//       'Life Aid Pharmacy',
//       'Green Cross Pharmacy'
//     ];
    
//     // Generate random coordinates within the radius
//     for (let i = 0; i < 10; i++) {
//       // Random distance within radius (in km)
//       const distance = Math.random() * radius;
//       // Random angle
//       const angle = Math.random() * 2 * Math.PI;
      
//       // Convert distance to lat/lng differences (rough approximation)
//       // 1 degree latitude is approximately 111 km
//       const latOffset = (distance / 111) * Math.cos(angle);
//       const lngOffset = (distance / (111 * Math.cos(latitude * Math.PI / 180))) * Math.sin(angle);
      
//       mockPharmacies.push({
//         place_id: `mock_pharmacy_${i}`,
//         name: pharmacyNames[i],
//         vicinity: `Near ${Math.floor(distance * 1000)}m from location`,
//         rating: (3 + Math.random() * 2).toFixed(1),
//         geometry: {
//           location: {
//             lat: latitude + latOffset,
//             lng: longitude + lngOffset
//           }
//         }
//       });
//     }
    
//     setPharmacies(mockPharmacies);
//   };

//   // Function to select a pharmacy and show directions
//   const selectPharmacy = async (pharmacy) => {
//     setSelectedPharmacy(pharmacy);
    
//     // Always use the searchLocation as the origin for directions
//     // This ensures directions start from the searched location, not the user's current location
//     if (!searchLocation) {
//       Alert.alert('Select a location first', 'Please search and select a location before getting directions to a pharmacy.');
//       return;
//     }
    
//     const originLat = searchLocation.latitude;
//     const originLng = searchLocation.longitude;
    
//     // Fetch directions from Google Directions API
//     try {
//       const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${pharmacy.geometry.location.lat},${pharmacy.geometry.location.lng}&mode=driving&key=${GOOGLE_API_KEY}`;
      
//       const response = await fetch(directionsUrl);
//       const data = await response.json();
      
//       if (data.status === 'OK' && data.routes.length > 0) {
//         // Decode the polyline
//         const points = decodePolyline(data.routes[0].overview_polyline.points);
//         setDirectionsPolyline(points);
        
//         // Fit the map to show both points and the route
//         const coordinates = [
//           { latitude: originLat, longitude: originLng },
//           { latitude: pharmacy.geometry.location.lat, longitude: pharmacy.geometry.location.lng }
//         ];
        
//         mapRef.current?.fitToCoordinates(coordinates, {
//           edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
//           animated: true,
//         });
//       } else {
//         console.log('Error fetching directions:', data.status);
//         // Generate a mock route
//         generateMockRoute(originLat, originLng, pharmacy.geometry.location.lat, pharmacy.geometry.location.lng);
//       }
//     } catch (error) {
//       console.error('Error fetching directions:', error);
//       // Generate a mock route on error
//       generateMockRoute(originLat, originLng, pharmacy.geometry.location.lat, pharmacy.geometry.location.lng);
//     }
//   };
  
//   // Generate a simple straight-line route between two points
//   const generateMockRoute = (startLat, startLng, endLat, endLng) => {
//     // Create a simple line with several points between start and end
//     const points = [];
//     const steps = 10; // Number of points in the line
    
//     for (let i = 0; i <= steps; i++) {
//       const fraction = i / steps;
//       points.push({
//         latitude: startLat + (endLat - startLat) * fraction,
//         longitude: startLng + (endLng - startLng) * fraction
//       });
//     }
    
//     setDirectionsPolyline(points);
    
//     // Fit the map to show the route
//     const coordinates = [
//       { latitude: startLat, longitude: startLng },
//       { latitude: endLat, longitude: endLng }
//     ];
    
//     mapRef.current?.fitToCoordinates(coordinates, {
//       edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
//       animated: true,
//     });
//   };

//   // Function to open Google Maps for navigation
//   const navigateToPharmacy = () => {
//     if (!selectedPharmacy || !searchLocation) {
//       Alert.alert('Please select a location and pharmacy first',
//                   'Search for a location and select a pharmacy before navigating.');
//       return;
//     }
    
//     const { lat, lng } = selectedPharmacy.geometry.location;
//     const startLat = searchLocation.latitude;
//     const startLng = searchLocation.longitude;
    
//     // Create a web URL that works across all platforms
//     // This is the most reliable way to open Google Maps with directions
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
//                    'Could not open the maps application. Please try again later.');
//       });
//   };

//   // Helper function to decode Google's polyline encoding
//   const decodePolyline = (encoded) => {
//     if (!encoded) return [];
    
//     const poly = [];
//     let index = 0, lat = 0, lng = 0;
    
//     while (index < encoded.length) {
//       let b, shift = 0, result = 0;
      
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
      
//       const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
//       lat += dlat;
      
//       shift = 0;
//       result = 0;
      
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
      
//       const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
//       lng += dlng;
      
//       const point = {
//         latitude: lat / 1e5,
//         longitude: lng / 1e5
//       };
      
//       poly.push(point);
//     }
    
//     return poly;
//   };

//   // Render place suggestion item
//   const renderSuggestionItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.suggestionItem}
//       onPress={() => selectPlace(item.place_id, item.description)}
//     >
//       <Ionicons name="location-outline" size={20} color="#666" />
//       <Text style={styles.suggestionText} numberOfLines={1}>{item.description}</Text>
//     </TouchableOpacity>
//   );

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
//       </View>
      
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search location (e.g., Phase 8 Islamabad)"
//           value={searchQuery}
//           onChangeText={handleSearchInput}
//         />
//         <TouchableOpacity 
//           style={styles.searchButton}
//           onPress={() => {
//             if (suggestions.length > 0) {
//               selectPlace(suggestions[0].place_id, suggestions[0].description);
//             }
//           }}
//         >
//           <Ionicons name="search" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
      
//       {/* Location Suggestions */}
//       {showSuggestions && suggestions.length > 0 && (
//         <View style={styles.suggestionsContainer}>
//           <FlatList
//             data={suggestions}
//             renderItem={renderSuggestionItem}
//             keyExtractor={item => item.place_id}
//             style={styles.suggestionsList}
//           />
//         </View>
//       )}
      
//       {/* Radius Selector */}
//       <View style={styles.radiusContainer}>
//         <Text style={styles.radiusLabel}>Radius: {radiusKm} km</Text>
//         <View style={styles.radiusButtonContainer}>
//           {[1, 3, 5, 10].map(r => (
//             <TouchableOpacity
//               key={r}
//               style={[
//                 styles.radiusButton,
//                 radiusKm === r && styles.radiusButtonSelected
//               ]}
//               onPress={() => {
//                 setRadiusKm(r);
//                 if (searchLocation) {
//                   fetchNearbyPharmacies(searchLocation.latitude, searchLocation.longitude);
//                 }
//               }}
//             >
//               <Text 
//                 style={[
//                   styles.radiusButtonText,
//                   radiusKm === r && styles.radiusButtonTextSelected
//                 ]}
//               >
//                 {r}km
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
      
//       {/* Map View */}
//       <View style={styles.mapContainer}>
//         {location ? (
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             provider={PROVIDER_GOOGLE}
//             initialRegion={location}
//             showsUserLocation={true}
//             showsMyLocationButton={true}
//           >
//             {/* Current/Search Location Marker */}
//             {(searchLocation || location) && (
//               <Marker
//                 coordinate={searchLocation || location}
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
            
//             {/* Directions Polyline */}
//             {directionsPolyline && (
//               <Polyline
//                 coordinates={directionsPolyline}
//                 strokeWidth={5}
//                 strokeColor="#2196F3"
//               />
//             )}
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
//             : 'Search for nearby pharmacies'}
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
      
//       {/* Navigation Button */}
//       {selectedPharmacy && (
//         <TouchableOpacity 
//           style={styles.navigateButton}
//           onPress={navigateToPharmacy}
//         >
//           <Text style={styles.navigateButtonText}>Navigate to {selectedPharmacy.name}</Text>
//           <Ionicons name="navigate" size={24} color="#fff" />
//         </TouchableOpacity>
//       )}
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
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     margin: 10,
//     zIndex: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//   },
//   searchButton: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#2196F3',
//     borderRadius: 5,
//     marginLeft: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//   },
//   suggestionsContainer: {
//     position: 'absolute',
//     top: 130, // Adjust this based on your layout
//     left: 10,
//     right: 10,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     maxHeight: 200,
//     zIndex: 5,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   suggestionsList: {
//     padding: 5,
//   },
//   suggestionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   suggestionText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#333',
//   },
//   radiusContainer: {
//     margin: 10,
//     marginTop: 0,
//   },
//   radiusLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   radiusButtonContainer: {
//     flexDirection: 'row',
//   },
//   radiusButton: {
//     backgroundColor: '#fff',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     marginRight: 10,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//   },
//   radiusButtonSelected: {
//     backgroundColor: '#2196F3',
//   },
//   radiusButtonText: {
//     color: '#333',
//     fontWeight: '500',
//   },
//   radiusButtonTextSelected: {
//     color: '#fff',
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
//   },
//   navigateButton: {
//     flexDirection: 'row',
//     backgroundColor: '#4CAF50',
//     margin: 10,
//     padding: 15,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   navigateButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
// });

// export default Pharmacy;

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
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
import { StatusBar } from 'expo-status-bar';

// Replace with your actual Google Maps API key
// Make sure this key has the following APIs enabled:
// - Maps SDK for Android/iOS
// - Places API
// - Directions API
// - Geocoding API

//const GOOGLE_API_KEY = "YOUR_API_KEY_HERE";

const { width, height } = Dimensions.get('window');

// FAST University coordinates
const FAST_UNIVERSITY = {
  latitude: 33.6518,
  longitude: 73.0155
};

// Specific pharmacies with their coordinates
const PREDEFINED_PHARMACIES = [
  {
    place_id: 'barq_pharmacy',
    name: 'Barq Pharmacy',
    vicinity: 'opposite PAEC General Hospital, H-11/4, Islamabad',
    rating: 4.3,
    geometry: {
      location: {
        lat: 33.6509,
        lng: 72.9986
      }
    }
  },
  {
    place_id: 'al_marwa_pharmacy',
    name: 'AL Marwa Pharmacy',
    vicinity: 'near jamia masjid salman farsi, I-10/2, Pakistan town phase 1, Islamabad',
    rating: 4.1,
    geometry: {
      location: {
        lat: 33.6526,
        lng: 73.0364
      }
    }
  },
  {
    place_id: 'walton_pharmacy',
    name: 'Walton Pharmacy',
    vicinity: 'I-10 Markaz, Islamabad',
    rating: 4.4,
    geometry: {
      location: {
        lat: 33.6508,
        lng: 73.0370
      }
    }
  },
  {
    place_id: 'wecare_pharmacy',
    name: 'WeCare Pharmacy',
    vicinity: 'Shop 5,6, Shaukat Plaza, Korang Road, near Faysal Bank, I-10 Markaz, Islamabad',
    rating: 4.2,
    geometry: {
      location: {
        lat: 33.6506,
        lng: 73.0385
      }
    }
  },
  {
    place_id: 'sk_sons_pharmacy',
    name: 'SK Son\'s Pharmacy',
    vicinity: 'G-11 Markaz, Islamabad',
    rating: 4.5,
    geometry: {
      location: {
        lat: 33.6651,
        lng: 73.0015
      }
    }
  },
  {
    place_id: 'lucky_pharmacy',
    name: 'Lucky Pharmacy',
    vicinity: 'Bela Rd, G-10 Markaz, Islamabad',
    rating: 4.0,
    geometry: {
      location: {
        lat: 33.6748,
        lng: 73.0136
      }
    }
  },
  {
    place_id: 'dwatson_pharmacy',
    name: 'DWatson Chemist',
    vicinity: 'G-13/1, Islamabad',
    rating: 4.6,
    geometry: {
      location: {
        lat: 33.6803,
        lng: 72.9649
      }
    }
  }
];

const Pharmacy = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
          // Set default location to FAST University
          setDefaultLocation();
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Failed to get current location');
        setLoading(false);
        // Set default location to FAST University
        setDefaultLocation();
      }
    })();
  }, []);

  // Set default location to FAST University
  const setDefaultLocation = () => {
    const defaultLocation = {
      latitude: FAST_UNIVERSITY.latitude,
      longitude: FAST_UNIVERSITY.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setLocation(defaultLocation);
    setSearchLocation(defaultLocation);
  };

  // Function to handle search input changes
  const handleSearchInput = (text) => {
    setSearchQuery(text);
    
    // Show suggestions if text is 3 or more characters
    if (text.length >= 3) {
      // Filter pharmacies based on input text
      const filteredPharmacies = PREDEFINED_PHARMACIES.filter(pharmacy => 
        pharmacy.name.toLowerCase().includes(text.toLowerCase()) ||
        pharmacy.vicinity.toLowerCase().includes(text.toLowerCase())
      );
      
      // Convert filtered pharmacies to suggestion format
      const pharmacySuggestions = filteredPharmacies.map(pharmacy => ({
        place_id: pharmacy.place_id,
        description: `${pharmacy.name} - ${pharmacy.vicinity}`,
        structured_formatting: {
          main_text: pharmacy.name,
          secondary_text: pharmacy.vicinity
        },
        // Store the original pharmacy data for easy access
        originalPharmacy: pharmacy
      }));
      
      setSuggestions(pharmacySuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Function to select a place from suggestions
  const selectPlace = async (placeId, description, originalPharmacy = null) => {
    setSearchQuery(description);
    setShowSuggestions(false);
    
    try {
      setLoading(true);
      
      // If we have the original pharmacy data (from our filtered list)
      if (originalPharmacy) {
        const { lat, lng } = originalPharmacy.geometry.location;
        const newLocation = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        
        setSearchLocation(newLocation);
        mapRef.current?.animateToRegion(newLocation, 1000);
        
        // Focus on this specific pharmacy and nearby ones
        fetchNearbyPharmacies(lat, lng);
        
        // Pre-select this pharmacy
        setSelectedPharmacy(originalPharmacy);
      } else {
        // For other searches, use the geocoding approach
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(description)}&key=${GOOGLE_API_KEY}`;
        const response = await fetch(geocodingUrl);
        const data = await response.json();
        
        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          const newLocation = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          
          setSearchLocation(newLocation);
          mapRef.current?.animateToRegion(newLocation, 1000);
          fetchNearbyPharmacies(lat, lng);
        } else {
          // If geocoding fails, default to current location or FAST University
          const defaultLocation = location || {
            latitude: FAST_UNIVERSITY.latitude,
            longitude: FAST_UNIVERSITY.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          
          setSearchLocation(defaultLocation);
          mapRef.current?.animateToRegion(defaultLocation, 1000);
          fetchNearbyPharmacies(defaultLocation.latitude, defaultLocation.longitude);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error during place selection:', error);
      // Fall back to current location or FAST University
      const defaultLocation = location || {
        latitude: FAST_UNIVERSITY.latitude,
        longitude: FAST_UNIVERSITY.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      
      setSearchLocation(defaultLocation);
      mapRef.current?.animateToRegion(defaultLocation, 1000);
      fetchNearbyPharmacies(defaultLocation.latitude, defaultLocation.longitude);
      setLoading(false);
    }
  };

  // Function to fetch nearby pharmacies
  const fetchNearbyPharmacies = async (latitude, longitude) => {
    try {
      setLoading(true);
      
      // Fixed radius of 5km (5000 meters) for all searches
      const radiusInMeters = 5000;
      
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&type=pharmacy&key=${GOOGLE_API_KEY}`;
      
      const response = await fetch(placesUrl);
      const data = await response.json();
      
      if (data.status === 'OK') {
        setPharmacies(data.results);
      } else {
        console.log('Error finding pharmacies:', data.status);
        // Use the predefined pharmacies
        filterPredefinedPharmacies(latitude, longitude);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nearby pharmacies:', error);
      // Use the predefined pharmacies
      filterPredefinedPharmacies(latitude, longitude);
      setLoading(false);
    }
  };
  
  // Filter predefined pharmacies based on the search location with fixed 5km radius
  const filterPredefinedPharmacies = (latitude, longitude) => {
    const fixedRadius = 5; // 5km fixed radius
    
    // Calculate distance between two points in km
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      return distance;
    };
    
    // Filter pharmacies within the fixed radius
    const nearbyPharmacies = PREDEFINED_PHARMACIES.filter(pharmacy => {
      const distance = calculateDistance(
        latitude, 
        longitude, 
        pharmacy.geometry.location.lat, 
        pharmacy.geometry.location.lng
      );
      return distance <= fixedRadius;
    });
    
    setPharmacies(nearbyPharmacies.length > 0 ? nearbyPharmacies : PREDEFINED_PHARMACIES);
  };

  // Function to select a pharmacy and immediately navigate to it
  const selectPharmacy = async (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    
    // Open Google Maps for navigation immediately
    navigateToPharmacy(pharmacy);
  };

  // Function to open Google Maps for navigation
  const navigateToPharmacy = (pharmacy = null) => {
    const pharmacyToNavigate = pharmacy || selectedPharmacy;
    
    if (!pharmacyToNavigate) {
      Alert.alert('Please select a pharmacy first', 'Select a pharmacy before navigating.');
      return;
    }
    
    const { lat, lng } = pharmacyToNavigate.geometry.location;
    
    // Use searchLocation if available, otherwise use current location or FAST University
    const startLocation = searchLocation || location || {
      latitude: FAST_UNIVERSITY.latitude,
      longitude: FAST_UNIVERSITY.longitude
    };
    
    const startLat = startLocation.latitude;
    const startLng = startLocation.longitude;
    
    // Create a web URL that works across all platforms
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

  // Render place suggestion item
  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => selectPlace(item.place_id, item.description, item.originalPharmacy)}
    >
      <Ionicons name="medical" size={20} color="#2196F3" />
      <View style={styles.suggestionTextContainer}>
        <Text style={styles.suggestionMainText} numberOfLines={1}>{item.structured_formatting.main_text}</Text>
        <Text style={styles.suggestionSecondaryText} numberOfLines={1}>{item.structured_formatting.secondary_text}</Text>
      </View>
    </TouchableOpacity>
  );

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

  // Initial load of pharmacies using FAST University as default
  useEffect(() => {
    if (!pharmacies.length) {
      const fastUniversityLocation = {
        latitude: FAST_UNIVERSITY.latitude,
        longitude: FAST_UNIVERSITY.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      
      setSearchLocation(fastUniversityLocation);
      filterPredefinedPharmacies(FAST_UNIVERSITY.latitude, FAST_UNIVERSITY.longitude);
    }
  }, []);

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
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search pharmacy name or location"
          value={searchQuery}
          onChangeText={handleSearchInput}
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => {
            if (suggestions.length > 0) {
              selectPlace(
                suggestions[0].place_id, 
                suggestions[0].description, 
                suggestions[0].originalPharmacy
              );
            }
          }}
        >
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Location Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            renderItem={renderSuggestionItem}
            keyExtractor={item => item.place_id}
            style={styles.suggestionsList}
          />
        </View>
      )}
      
      {/* Map View */}
      <View style={styles.mapContainer}>
        {(location || searchLocation) ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={searchLocation || location || {
              latitude: FAST_UNIVERSITY.latitude,
              longitude: FAST_UNIVERSITY.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* Current/Search Location Marker */}
            {(searchLocation || location) && (
              <Marker
                coordinate={searchLocation || location}
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
            : 'Search for nearby pharmacies'}
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
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 130, // Adjust this based on your layout
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    maxHeight: 200,
    zIndex: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  suggestionsList: {
    padding: 5,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionTextContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  suggestionMainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  suggestionSecondaryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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
  }
});

export default Pharmacy;