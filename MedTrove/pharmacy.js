import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity,KeyboardAvoidingView,Platform, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import axios from 'axios';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibGl6aXNpLTAzIiwiYSI6ImNtM2twancwajBldG4ycnM5ZDZzOXNuNTYifQ.FbBkAJ1yYNVQ-n1UzGglHg';

const Pharmacy = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [routeGeoJson, setRouteGeoJson] = useState(null);

  // Get user's location on load
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need location permissions to show nearby results.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
    })();
  }, []);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.length > 2 && userLocation) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?proximity=${userLocation.longitude},${userLocation.latitude}&access_token=${MAPBOX_ACCESS_TOKEN}`;
      try {
        const response = await axios.get(url);
        setSearchResults(response.data.features);
      } catch (error) {
        console.error('Error fetching nearby search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation({ coordinates: location.center, place_name: location.place_name });
    setSearchText(location.place_name);
    setSearchResults([]);
    fetchRoute({ coordinates: location.center });
  };

  const fetchRoute = async (destination) => {
    if (!userLocation) return;

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${destination.coordinates[0]},${destination.coordinates[1]}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

    try {
      const response = await axios.get(url);
      const route = response.data.routes[0].geometry;
      setRouteGeoJson(route);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css" rel="stylesheet" />
        <style>
          body, html { margin: 0; padding: 0; height: 100%; width: 100%; }
          #map { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js"></script>
        <script>
          mapboxgl.accessToken = '${MAPBOX_ACCESS_TOKEN}';
          const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [${userLocation ? userLocation.longitude : 73.0479}, ${userLocation ? userLocation.latitude : 33.6844}],
            zoom: 12
          });

          new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([${userLocation ? userLocation.longitude : 73.0479}, ${userLocation ? userLocation.latitude : 33.6844}])
            .setPopup(new mapboxgl.Popup().setText('Your Location'))
            .addTo(map);

          ${selectedLocation ? `
            new mapboxgl.Marker({ color: 'red' })
              .setLngLat([${selectedLocation.coordinates[0]}, ${selectedLocation.coordinates[1]}])
              .setPopup(new mapboxgl.Popup().setText('${selectedLocation.place_name}'))
              .addTo(map);
          ` : ''}

          ${routeGeoJson ? `
            map.on('load', () => {
              map.addSource('route', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: ${JSON.stringify(routeGeoJson)}
                }
              });

              map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#ff0000',
                  'line-width': 4
                }
              });
            });
          ` : ''}
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Wrap Search and Dropdown inside KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <SearchBar
          placeholder="Search for nearby places..."
          onChangeText={handleSearch}
          value={searchText}
          lightTheme
          round
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
        />
      </KeyboardAvoidingView>
  
      {/* Dropdown Menu placed absolutely to appear on top */}
      {searchResults.length > 0 && (
        <View style={styles.dropdown}>
          {searchResults.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.resultItem}
              onPress={() => handleSelectLocation(item)}
            >
              <Text>{item.place_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
  
      {/* Map Rendering in WebView */}
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    top:"25%",
    marginBottom: 10,
    paddingBottom:"5%"
  },
  searchBarInput: {
    backgroundColor: '#f1f1f1',
  },
  dropdown: {
    position: 'absolute',
    top: "10%",
    left: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  webView: {
    flex: 1,
    paddingTop:"10%",
  },
});

export default Pharmacy;
