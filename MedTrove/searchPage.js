import * as React from "react";
import { Image,Text,View, TextInput, Button,TouchableOpacity,ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Keyboard } from 'react-native';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import CONFIG from './config';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import ProfileManagement from './profilemangement';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import DrugInteractionScreen from './DDI';
import Pharmacy from './pharmacy';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: 'Initial search value',
            status: undefined,
            searchHistory: [],
             //userId: null,
            recommendedKeywords: ['Panadol', 'Acefyl', 'Advil', 'Augmentin'], // Example recommended keywords
        };
    }

    async componentDidMount() {
        // Load previously searched items from AsyncStorage
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
            this.setState({ searchHistory: JSON.parse(history) });
        }
    }

    handleSearchSubmit = async () => {
      Keyboard.dismiss();
      const searchTerm = this.state.searchText;
      console.log('Search term:', searchTerm);
    
      try {
        const response = await axios.get(`${CONFIG.backendUrl}/api/medicines/${searchTerm}`);
        
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
            this.props.navigation.navigate('ProductList', { id: firstMedicine._id });
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
    


          

fetchMedicine = async(medicine)=> {
      try {
        const response = await axios.get(`${CONFIG.backendUrl}/api/medicines/${medicine}`);
        const medicine = response.data; // Medicine object from API response
        //console.log('Found medicine:', medicine);
    
        // Check if the medicine is an object and contains the _id
        if (typeof medicine === 'object' && medicine !== null && medicine._id) {
          //console.log(medicine._id);
          this.props.navigation.navigate('MedInfo', { id: medicine._id });
        } else {
          console.error('Medicine ID not found in response:', medicine);
        }
      } catch (error) {
        console.error('Error fetching medicine:', error);
      }
    };

    render() {
      const { searchText, searchHistory, recommendedKeywords } = this.state;

      return (
          <View style={styles.container}>
              <View style={styles.searchContainer}>
                  <TextInput
                      placeholder="Search"
                     // value={searchText}
                      onChangeText={(text) => this.setState({ searchText: text })}
                      onSubmitEditing={this.handleSearchSubmit}
                      style={styles.searchInput}
                  />
                  <TouchableOpacity onPress={this.handleSearchSubmit}>
                      <Ionicons name="search" size={28} color="#064D65" />
                  </TouchableOpacity>
              </View>

              <ScrollView style={styles.scrollContainer}>
                  <View style={styles.recommendations}>
                      <Text style={styles.sectionTitle}>Recommended Keywords</Text>
                      {recommendedKeywords.map((keyword, index) => (
                          <TouchableOpacity key={index} onPress={() => this.fetchMedicine(keyword)}>
                              <Text style={styles.keyword}>{keyword}</Text>
                          </TouchableOpacity>
                      ))}
                  </View>

                  <View style={styles.history}>
                      <Text style={styles.sectionTitle}>Previously Searched</Text>
                      {searchHistory.map((item, index) => (
                          <TouchableOpacity key={index} onPress={() => this.fetchMedicine(item)}>
                              <Text style={styles.historyItem}>{item}</Text>
                          </TouchableOpacity>
                      ))}
                  </View>
              </ScrollView>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f8f8f8', // Light background color
  },
  searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f8fbfd", // Food Panda's red color
      borderRadius: 25,
      paddingHorizontal: "5%",
      paddingVertical: '1%',
      marginTop:'10%',
      marginBottom: '5%',
  },
  searchInput: {
      flex: 1,
      height: "65%",
      color: '#064D65', 
      fontSize: 16,
  },
  scrollContainer: {
      flexGrow: 1,
  },
  recommendations: {
      marginTop: "3%",
     

  },
  history: {
      marginTop: "3%",
  },
  sectionTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: "5%",
  },
  keyword: {
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingVertical: "2.5%",
      paddingHorizontal: "5%",
      marginVertical: "1%",
      color: '#064D65',
      fontSize: 16,
  },
  historyItem: {
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingVertical: "2.5%",
      paddingHorizontal: "5%",
      marginVertical: "1%",
      color: '#555',
      fontSize: 16,
  },
});