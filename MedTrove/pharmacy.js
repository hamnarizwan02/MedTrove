// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, FlatList, Text, TouchableOpacity,KeyboardAvoidingView,Platform, Alert } from 'react-native';
// import { SearchBar } from 'react-native-elements';
// import { WebView } from 'react-native-webview';
// import * as Location from 'expo-location';
// import axios from 'axios';

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWxpemEyNCIsImEiOiJjbTgwNjVzdmkwb2xpMmtzYWl3MTF0bzd3In0.xwMUIU3Dnfpyo9fZ_laDUA';

// const Pharmacy = () => {
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [routeGeoJson, setRouteGeoJson] = useState(null);

//   // Get user's location on load
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'We need location permissions to show nearby results.');
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;
//       setUserLocation({ latitude, longitude });
//     })();
//   }, []);

//   // const handleSearch = async (text) => {
//   //   setSearchText(text);
//   //   if (text.length > 2 && userLocation) {
//   //     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?proximity=${userLocation.longitude},${userLocation.latitude}&access_token=${MAPBOX_ACCESS_TOKEN}`;
//   //     try {
//   //       const response = await axios.get(url);
//   //       setSearchResults(response.data.features);
//   //     } catch (error) {
//   //       console.error('Error fetching nearby search results:', error);
//   //     }
//   //   } else {
//   //     setSearchResults([]);
//   //   }
//   // };

//   // const handleSelectLocation = (location) => {
//   //   setSelectedLocation({ coordinates: location.center, place_name: location.place_name });
//   //   setSearchText(location.place_name);
//   //   setSearchResults([]);
//   //   fetchRoute({ coordinates: location.center });
//   // };

//   // const handleSearch = async (text) => {
//   //   setSearchText(text);
//   //   if (text.length > 2 && userLocation) {
//   //     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?proximity=${userLocation.longitude},${userLocation.latitude}&access_token=${MAPBOX_ACCESS_TOKEN}`;
//   //     try {
//   //       const response = await axios.get(url);
//   //       setSearchResults(response.data.features);
//   //     } catch (error) {
//   //       console.error('Error fetching nearby search results:', error);
//   //     }
//   //   } else {
//   //     setSearchResults([]);
//   //   }
//   // };

//   const handleSearch = async (text) => {
//     setSearchText(text);
//     if (text.length > 2 && userLocation) {
//       const { latitude, longitude } = userLocation;
      
//       // Use "poi" filter to get businesses like pharmacies
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?proximity=${userLocation.longitude},${userLocation.latitude}&access_token=${MAPBOX_ACCESS_TOKEN}`;

  
//       try {
//         const response = await axios.get(url);
//         setSearchResults(response.data.features);
//       } catch (error) {
//         console.error('Error fetching nearby search results:', error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };
  

//   const handleSelectLocation = (location) => {
//     setSelectedLocation({ coordinates: location.center, place_name: location.place_name });
//     setSearchText(location.place_name);
//     setSearchResults([]);
//     fetchRoute({ coordinates: location.center });
//   };

//   const fetchRoute = async (destination) => {
//     if (!userLocation) return;

//     const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${destination.coordinates[0]},${destination.coordinates[1]}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

//     try {
//       const response = await axios.get(url);
//       const route = response.data.routes[0].geometry;
//       setRouteGeoJson(route);
//     } catch (error) {
//       console.error('Error fetching route:', error);
//     }
//   };

//   const mapHtml = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css" rel="stylesheet" />
//         <style>
//           body, html { margin: 0; padding: 0; height: 100%; width: 100%; }
//           #map { width: 100%; height: 100%; }
//         </style>
//       </head>
//       <body>
//         <div id="map"></div>
//         <script src="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js"></script>
//         <script>
//           mapboxgl.accessToken = '${MAPBOX_ACCESS_TOKEN}';
//           const map = new mapboxgl.Map({
//             container: 'map',
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [${userLocation ? userLocation.longitude : 73.0479}, ${userLocation ? userLocation.latitude : 33.6844}],
//             zoom: 12
//           });

//           new mapboxgl.Marker({ color: 'blue' })
//             .setLngLat([${userLocation ? userLocation.longitude : 73.0479}, ${userLocation ? userLocation.latitude : 33.6844}])
//             .setPopup(new mapboxgl.Popup().setText('Your Location'))
//             .addTo(map);

//           ${selectedLocation ? `
//             new mapboxgl.Marker({ color: 'red' })
//               .setLngLat([${selectedLocation.coordinates[0]}, ${selectedLocation.coordinates[1]}])
//               .setPopup(new mapboxgl.Popup().setText('${selectedLocation.place_name}'))
//               .addTo(map);
//             new mapboxgl.Marker({ color: 'red' })
//               .setLngLat([${selectedLocation.coordinates[0]}, ${selectedLocation.coordinates[1]}])
//               .setPopup(new mapboxgl.Popup().setText('${selectedLocation.place_name}'))
//               .addTo(map);
//           ` : ''}

//           ${routeGeoJson ? `
//             map.on('load', () => {
//               map.addSource('route', {
//                 type: 'geojson',
//                 data: {
//                   type: 'Feature',
//                   geometry: ${JSON.stringify(routeGeoJson)}
//                 }
//               });
//             map.on('load', () => {
//               map.addSource('route', {
//                 type: 'geojson',
//                 data: {
//                   type: 'Feature',
//                   geometry: ${JSON.stringify(routeGeoJson)}
//                 }
//               });

//               map.addLayer({
//                 id: 'route',
//                 type: 'line',
//                 source: 'route',
//                 layout: {
//                   'line-join': 'round',
//                   'line-cap': 'round'
//                 },
//                 paint: {
//                   'line-color': '#ff0000',
//                   'line-width': 4
//                 }
//               });
//             });
//               map.addLayer({
//                 id: 'route',
//                 type: 'line',
//                 source: 'route',
//                 layout: {
//                   'line-join': 'round',
//                   'line-cap': 'round'
//                 },
//                 paint: {
//                   'line-color': '#ff0000',
//                   'line-width': 4
//                 }
//               });
//             });
//           ` : ''}
//         </script>
//       </body>
//     </html>
//   `;

//   return (
//     <View style={styles.container}>
//       {/* Wrap Search and Dropdown inside KeyboardAvoidingView */}
//       {/* <KeyboardAvoidingView
//         behavior={Platform.OS === "android" ? "padding" : "height"}
//         style={styles.keyboardView}
//       >
//         <SearchBar
//           placeholder="Search for nearby places..."
//           onChangeText={handleSearch}
//           value={searchText}
//           lightTheme
//           round
//           containerStyle={styles.searchBarContainer}
//           inputContainerStyle={styles.searchBarInput}
//         />
//       </KeyboardAvoidingView> */}
  
//       {/* Dropdown Menu placed absolutely to appear on top */}
//       {/* {searchResults.length > 0 && (
//         <View style={styles.dropdown}>
//           {searchResults.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               style={styles.resultItem}
//               onPress={() => handleSelectLocation(item)}
//             >
//               <Text>{item.place_name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//        */}
  
//       {/* Map Rendering in WebView */}
//       {/* Wrap Search and Dropdown inside KeyboardAvoidingView */}
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "android" ? "padding" : "height"}
//         style={styles.keyboardView}
//       >
//         <SearchBar
//           placeholder="Search for nearby places..."
//           onChangeText={handleSearch}
//           value={searchText}
//           lightTheme
//           round
//           containerStyle={styles.searchBarContainer}
//           inputContainerStyle={styles.searchBarInput}
//         />
//       </KeyboardAvoidingView>
  
//       {/* Dropdown Menu placed absolutely to appear on top */}
//       {searchResults.length > 0 && (
//         <View style={styles.dropdown}>
//           {searchResults.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               style={styles.resultItem}
//               onPress={() => handleSelectLocation(item)}
//             >
//               <Text>{item.place_name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
      
  
//       {/* Map Rendering in WebView */}
//       <WebView
//         originWhitelist={['*']}
//         source={{ html: mapHtml }}
//         style={styles.webView}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   searchBarContainer: {
//     backgroundColor: 'white',
//     top:"25%",
//     marginBottom: 10,
//     paddingBottom:"5%"
//   },
//   searchBarInput: {
//     backgroundColor: '#f1f1f1',
//   },
//   dropdown: {
//     position: 'absolute',
//     top: "10%",
//     left: 10,
//     right: 10,
//     backgroundColor: 'white',
//     zIndex: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 5,
//     zIndex: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   resultItem: {
//     padding: 10,
//     borderBottomColor: '#ccc',
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   webView: {
//     flex: 1,
//     paddingTop:"10%",
//     paddingTop:"10%",
//   },
// });

// export default Pharmacy;

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import axios from 'axios';

// const HERE_API_KEY = 'SFj0U2-oaHf2ui4Uvb171af0d1aLcfFLdeD5Mno2UBo';

// const Pharmacy = () => {
//     const [location, setLocation] = useState(null);
//     const [pharmacies, setPharmacies] = useState([]);

//     useEffect(() => {
//         (async () => {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 console.error('Permission to access location was denied');
//                 return;
//             }

//             let userLocation = await Location.getCurrentPositionAsync({});
//             setLocation(userLocation.coords);
//             fetchPharmacies(userLocation.coords.latitude, userLocation.coords.longitude);
//         })();
//     }, []);

//     const fetchPharmacies = async (latitude, longitude) => {
//         try {
//             const response = await axios.get(
//                 `https://discover.search.hereapi.com/v1/discover?at=${latitude},${longitude}&q=pharmacy&in=countryCode:PAK&limit=10&apikey=${HERE_API_KEY}`
//             );
//             setPharmacies(response.data.items);
//         } catch (error) {
//             console.error('Error fetching pharmacies:', error);
//         }
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             {location && (
//                 <MapView
//                     style={{ flex: 1 }}
//                     initialRegion={{
//                         latitude: location.latitude,
//                         longitude: location.longitude,
//                         latitudeDelta: 0.05,
//                         longitudeDelta: 0.05,
//                     }}>
//                     <Marker
//                         coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//                         title="You Are Here"
//                     />
//                     {pharmacies.map((pharmacy, index) => (
//                         <Marker
//                             key={index}
//                             coordinate={{
//                                 latitude: pharmacy.position.lat,
//                                 longitude: pharmacy.position.lng,
//                             }}
//                             title={pharmacy.title}
//                             description={pharmacy.address.label}
//                         />
//                     ))}
//                 </MapView>
//             )}
//             <FlatList
//                 data={pharmacies}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity>
//                         <Text>{item.title}</Text>
//                         <Text>{item.address.label}</Text>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     );
// };

// export default Pharmacy;
//const GOOGLE_MAPS_API_KEY = 'AIzaSyBt8fb4IKhorBxziaJzDiSooISW39komQ4';
// App.js
// App.js
// App.js


// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
  Platform,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

//const GOOGLE_MAPS_API_KEY = 'AIzaSyBt8fb4IKhorBxziaJzDiSooISW39komQ4';

const Pharmacy = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeType, setPlaceType] = useState('pharmacy');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // Fetch initial places when location is obtained
      if (location) {
        fetchNearbyPlaces(location, placeType);
      }
      
      setLoading(false);
    })();
  }, []);

  const fetchNearbyPlaces = async (location, type) => {
    try {
      setLoading(true);
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${type}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.status === 'OK') {
        setPlaces(data.results);
      } else {
        console.error('Error fetching places:', data.status);
        setErrorMsg('Failed to fetch nearby places');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg('An error occurred while fetching places');
    } finally {
      setLoading(false);
    }
  };

  const searchPlaces = async () => {
    if (!location) return;
    
    try {
      setLoading(true);
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&location=${latitude},${longitude}&radius=5000&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.status === 'OK') {
        setPlaces(data.results);
      } else {
        console.error('Error searching places:', data.status);
        setErrorMsg('Failed to search places');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg('An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const getDirections = (place) => {
    const { lat, lng } = place.geometry.location;
    const url = Platform.select({
      ios: `maps://app?saddr=${location.coords.latitude},${location.coords.longitude}&daddr=${lat},${lng}`,
      android: `google.navigation:q=${lat},${lng}`
    });
    
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          const browserUrl = `https://www.google.com/maps/dir/?api=1&origin=${location.coords.latitude},${location.coords.longitude}&destination=${lat},${lng}`;
          return Linking.openURL(browserUrl);
        }
      })
      .catch(err => console.error('Error opening maps:', err));
  };

  const changeSearchType = (type) => {
    setPlaceType(type);
    if (location) {
      fetchNearbyPlaces(location, type);
    }
  };

  const renderPlaceItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.placeItem}
        onPress={() => {
          setSelectedPlace(item);
          const { lat, lng } = item.geometry.location;
          mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }, 1000);
        }}
      >
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>{item.name}</Text>
          <Text style={styles.placeAddress}>{item.vicinity || item.formatted_address}</Text>
          <Text style={styles.placeRating}>
            Rating: {item.rating ? `${item.rating}/5` : 'N/A'} 
            ({item.user_ratings_total || 0} reviews)
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.directionsButton}
          onPress={() => getDirections(item)}
        >
          <Ionicons name="navigate" size={24} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const mapRef = React.useRef(null);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a place..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchPlaces}
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={searchPlaces}
        >
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.typeContainer}>
        <TouchableOpacity 
          style={[styles.typeButton, placeType === 'pharmacy' && styles.activeTypeButton]}
          onPress={() => changeSearchType('pharmacy')}
        >
          <Text style={[styles.typeText, placeType === 'pharmacy' && styles.activeTypeText]}>
            Pharmacies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.typeButton, placeType === 'hospital' && styles.activeTypeButton]}
          onPress={() => changeSearchType('hospital')}
        >
          <Text style={[styles.typeText, placeType === 'hospital' && styles.activeTypeText]}>
            Hospitals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.typeButton, placeType === 'doctor' && styles.activeTypeButton]}
          onPress={() => changeSearchType('doctor')}
        >
          <Text style={[styles.typeText, placeType === 'doctor' && styles.activeTypeText]}>
            Doctors
          </Text>
        </TouchableOpacity>
      </View>
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      )}
      
      {location ? (
        <View style={styles.content}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {places.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
                title={place.name}
                description={place.vicinity || place.formatted_address}
                pinColor={placeType === 'pharmacy' ? '#2c8a43' : placeType === 'hospital' ? '#FF0000' : '#0066CC'}
              >
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>{place.name}</Text>
                    <Text>{place.vicinity || place.formatted_address}</Text>
                    {place.opening_hours && (
                      <Text>
                        {place.opening_hours.open_now ? 'Open Now' : 'Closed'}
                      </Text>
                    )}
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
          
          <View style={styles.listContainer}>
            <FlatList
              data={places}
              renderItem={renderPlaceItem}
              keyExtractor={(item, index) => `${item.place_id || index}`}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loadingText}>Getting your location...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTypeButton: {
    backgroundColor: '#0066CC',
  },
  typeText: {
    fontWeight: '500',
    color: '#0066CC',
  },
  activeTypeText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  listContainer: {
    height: '30%',
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
  placeItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  placeRating: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  directionsButton: {
    width: 44,
    height: 44,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginLeft: 10,
  },
  callout: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  errorText: {
    padding: 20,
    color: 'red',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default Pharmacy;