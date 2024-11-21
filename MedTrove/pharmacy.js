import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import axios from 'axios';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibGl6aXNpLTAzIiwiYSI6ImNtM2twancwajBldG4ycnM5ZDZzOXNuNTYifQ.FbBkAJ1yYNVQ-n1UzGglHg';

const Pharmacy = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ coordinates: [73.0479, 33.6844], place_name: 'Default Location' }); // Default to Islamabad
  const [userLocation, setUserLocation] = useState(null);

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
      setSelectedLocation({ coordinates: [longitude, latitude], place_name: 'Your Location' });
    })();
  }, []);

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
            center: [${selectedLocation.coordinates[0]}, ${selectedLocation.coordinates[1]}],
            zoom: 12
          });

          // Add a marker at the selected location
          const marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([${selectedLocation.coordinates[0]}, ${selectedLocation.coordinates[1]}])
            .setPopup(new mapboxgl.Popup().setText('${selectedLocation.place_name}'))
            .addTo(map);

          // Adjust map view to fit the marker when location changes
          map.flyTo({ center: [${selectedLocation.coordinates[0]}, ${selectedLocation.coordinates[1]}], zoom: 14 });
        </script>
      </body>
    </html>
  `;

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
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for nearby places..."
        onChangeText={handleSearch}
        value={searchText}
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectLocation(item)}>
            <Text style={styles.resultItem}>{item.place_name}</Text>
          </TouchableOpacity>
        )}
        style={styles.resultsContainer}
      />

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
    paddingTop: '10%',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInput: {
    backgroundColor: '#f1f1f1',
  },
  resultsContainer: {
    maxHeight: 150,
    backgroundColor: 'white',
  },
  resultItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  webView: {
    flex: 1,
  },
});

export default Pharmacy;
