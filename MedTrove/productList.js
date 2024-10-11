import React from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import CONFIG from './config';

export default class ProductList extends React.Component {
  state = {
    mainMedicine: null,
    alternatives: [],
    sortBy: 'name',
    loading: true,
    error: null,
    searchQuery: '',
    wishlist: new Set(),
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  }

  componentDidMount() {
    const { id } = this.props.route.params;
   // const id = '66e1df80bc0ca5e347fadf71';  //benadryl
    this.fetchMedicineData(id);
  }

  fetchMedicineData = async (medicineId) => {
    try {
      const mainMedicineResponse = await axios.get(`${CONFIG.backendUrl}/api/medici/${medicineId}`);
      const mainMedicine = mainMedicineResponse.data;

      let alternatives = [];
      try {
        const alternativesResponse = await axios.get(`${CONFIG.backendUrl}/api/alternatives/${mainMedicine.drug_name}`);
        alternatives = alternativesResponse.data;
      } catch (alternativesError) {
        console.log('No alternatives found or error fetching alternatives:', alternativesError);
        alternatives = [];
      }

      mainMedicine.price = await this.fetchPrice(mainMedicine.drug_name);
      mainMedicine.image = await this.fetchDrugImage(mainMedicine.drug_name);

      alternatives = await Promise.all(alternatives.map(async (alt) => {
        const price = await this.fetchPrice(alt);
        const existsData = await this.checkMedicineExists(alt);
        const image = await this.fetchDrugImage(alt);
        return {
          name: alt.toLowerCase(),
          price,
          exists: existsData.exists,
          id: existsData.id,
          image
        };
      }));

      // Remove duplicates based on name
      alternatives = Array.from(new Set(alternatives.map(a => a.name)))
        .map(name => alternatives.find(a => a.name === name));

      this.setState({
        mainMedicine: {
          ...mainMedicine,
          drug_name: mainMedicine.drug_name.toLowerCase()
        },
        alternatives,
        loading: false
      }, this.sortAlternatives);
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'Failed to fetch data', loading: false });
    }
  }

  fetchDrugImage = async (drugName) => {
   // const apiKey = 'AIzaSyDE6AOUqSxH5E6xUD4IlU2Sn2Cbdffazvo';
    const apiKey = `${CONFIG.APIKEY}`;
    const searchEngineId = 'e7a8780e6245241cf';
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(drugName)}&cx=${searchEngineId}&searchType=image&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        return data.items[0].link;
      } else {
        return 'https://via.placeholder.com/100';
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      return 'https://via.placeholder.com/100';
    }
  }

   checkMedicineExists = async (medicineName) => {
    try {
      const response = await axios.get(`${CONFIG.backendUrl}/api/medicine-exists/${medicineName}`);
      return response.data;
    } catch (error) {
      //console.error('Error checking medicine existence:', error);
      return { exists: false, id: null };
    }
  }

  fetchPrice = async (medicineName) => {
    try {
      const response = await axios.get(`${CONFIG.backendUrl}/api/price/${medicineName}`);
      return response.data.price;
    } catch (error) {
      //console.error('Error fetching price:', error);
      //return 'Price unavailable setting PKR 123455';
      return 'PKR 602.34';
    }
  }

  sortAlternatives = () => {
    const { alternatives, sortBy } = this.state;
    const sorted = [...alternatives].sort((a, b) => {
      if (sortBy === 'price') {
        return this.extractPrice(a.price) - this.extractPrice(b.price);
      }
      return a.name.localeCompare(b.name);
    });
    this.setState({ alternatives: sorted });
  };

  extractPrice = (priceString) => {
    const match = priceString.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  }

  handleSortChange = (criteria) => {
    this.setState({ sortBy: criteria }, this.sortAlternatives);
  };

  console = (id) => {
    console.log("shifting to medinfo id "+ id);
  }

  handleAddToWishlist = (itemName) => {
    this.setState(prevState => {
      const newWishlist = new Set(prevState.wishlist);
      if (newWishlist.has(itemName)) {
        newWishlist.delete(itemName);
      } else {
        newWishlist.add(itemName);
      }
      return { wishlist: newWishlist };
    });
  }

  handleAlternativePress = (alternativeName) => {
    navigation.navigate('MedInfo', { medicineName: alternativeName });
  };

  renderMainMedicine = () => {
    const { mainMedicine } = this.state;
    if (!mainMedicine) return null;

    return (
      <View style={styles.mainMedicineContainer}>
        <Image source={{ uri: mainMedicine.image }} style={styles.mainMedicineImage} />
        <View style={styles.mainMedicineInfo} >
          <View style={{ marginTop: 14}}>
          <Text style={styles.productName}>{mainMedicine.drug_name}</Text>
          <Text style={styles.productPrice}>{mainMedicine.price}</Text>
          
          <TouchableOpacity 
            style={styles.productButton}
            onPress={() => {
              //this.props.navigation.navigate('MedInfo', { id: mainMedicine._id });
              this.props.navigation.navigate('MedInfo', { name: mainMedicine.drug_name });
            }}
          >
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  // renderAlternative = ({ item }) => (
  //   <View style={styles.alternativeContainer}>
  //     <Image source={{ uri: item.image }} style={styles.alternativeImage} />
  //     <View style={styles.alternativeInfo}>
  //       <Text style={styles.productName}>{item.name}</Text>
  //       <Text style={styles.productPrice}>{item.price}</Text>
  //     </View>
  //     <View style={{ marginTop: 14, alignItems: 'center' }}>
  //       <TouchableOpacity 
  //         style={styles.productButton}
  //         onPress={() => {
  //           this.console(item.name + item.id);
  //           this.props.navigation.navigate('MedInfo', { id: item.id });
  //         }}
  //       >
  //         <Text style={styles.buttonText}>Details</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
  
  renderAlternative = ({ item }) => (
    <View style={styles.alternativeContainer}>
      <Image source={{ uri: item.image }} style={styles.alternativeImage} />
      <View style={styles.alternativeInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <View style={{ marginTop: 14, alignItems: 'center' }}>
        {item.exists ? (
          <TouchableOpacity 
            style={styles.productButton}
            onPress={() => {
              this.console('moving to alternative ' + item.id + " " + item.name);
              this.props.navigation.navigate('MedInfo', { name: item.name });
              //this.props.navigation.navigate(handleAlternativePress(item.name));
            }}
          >
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
          style={[
            styles.productButton,
            styles.wishlistButton,
            this.state.wishlist.has(item.name) && styles.greyButton
          ]}
            onPress={() => this.handleAddToWishlist(item.name)}
          >
            <Text style={styles.buttonText}>
              {this.state.wishlist.has(item.name) ? 'Added to Wishlist' : 'Add to Wishlist'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );


  renderSortDropdown() {
    return (
      <Picker
        selectedValue={this.state.sortBy}
        onValueChange={this.handleSort}
        style={styles.picker}
      >
        <Picker.Item label="Sort by name" value="name" />
        <Picker.Item label="Sort by price" value="price" />
      </Picker>
    );
  }
  
  render() {
    const { alternatives, loading, error, searchQuery } = this.state;

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    const filteredMainMedicine = this.state.mainMedicine && 
      this.state.mainMedicine.drug_name.toLowerCase().includes(searchQuery.toLowerCase()) 
      ? [this.state.mainMedicine] : [];

    const filteredAlternatives = alternatives.filter(alt => 
      alt.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const allMedicines = [...filteredMainMedicine, ...filteredAlternatives];
  
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Product List</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines..."
            placeholderTextColor="#a0a0a0"
            value={searchQuery}
            onChangeText={this.handleSearch}
          />
        </View>
        {searchQuery ? (
         <FlatList
                   data={allMedicines}
                   renderItem={({ item }) => 
                     item.drug_name ? this.renderMainMedicine() : this.renderAlternative({ item })
                   }
                   keyExtractor={(item, index) => index.toString()}
                   contentContainerStyle={styles.productList}
                 />
        ) : (
          <>
            {this.renderMainMedicine()}
            <View style={styles.subHeaderContainer}>
              <View style = {{marginLeft: 15}}>
                 <Text style={styles.subHeader}>Alternatives</Text>
              </View>
              {this.renderSortDropdown()}
            </View>
            <FlatList
              data={alternatives}
              renderItem={this.renderAlternative}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.productList}
            />
          </>
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  greyButton: {
    backgroundColor: '#A0A0A0',
  },
  productButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100, // Increased minimum width
  },
  wishlistButton: {
    minWidth: 150, // Even wider for the wishlist button
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    textAlign: 'right',
    marginRight: 20, // Add some right margin to move it more to the right
  },
  picker: {
    height: 40,
    width: 180,
    color: '#333333',
    backgroundColor: 'transparent', // Remove any background color
  },
  searchContainer: {
    backgroundColor: '#3B5998', // Light blue background for search
    padding: 10,
    paddingTop: 5,
    paddingBottom: 15,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 25,
    fontSize: 16,
    color: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Lighter background for overall UI
  },
  headerContainer: {
    backgroundColor: '#3B5998', 
    padding: 15
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 25
  },
  mainMedicineContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  mainMedicineImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  mainMedicineInfo: {
    flex: 1,
  },
  alternativeContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  alternativeImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  alternativeInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  productPrice: {
    fontSize: 14,
    color: '#32CD32', // Green for price
    marginVertical: 5,
  },
  productButton: {
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 5,
    width: 70,
    alignItems: 'center', // Center the button text
    position: 'absolute', // Move the button up
    right: 10,
    top: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align the dropdown with the alternatives heading
    margin: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',  // Dark gray for subheader
  },
  sortDropdown: {
    height: 40,
    width: 150,
    backgroundColor: '#FFD700', // Gold background for dropdown
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  productList: {
    paddingBottom: 20,
  },
});



