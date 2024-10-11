import React from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios'; 
import CONFIG from './config';

export default class ProductList extends React.Component {
  state = {
    mainMedicine: null,
    alternatives: [],
    sortBy: 'name',
    loading: true,
    error: null,
  };

  componentDidMount() {
    const { id } = this.props.route.params;
    //console.log("productlist id" + id);
    this.fetchMedicineData(id);
  }

  // fetchMedicineData = async (medicineId) => {
  //   try {
  //     //const medicineId = '66e1df80bc0ca5e347fadf71';
  //     //console.log("medicineId" + medicineId);
  //     const mainMedicineResponse = await axios.get(`${CONFIG.backendUrl}/api/medici/${medicineId}`);
  //     const mainMedicine = mainMedicineResponse.data;
  //     //console.log(mainMedicine);

  //     let alternatives = [];
  //     try {
  //       const alternativesResponse = await axios.get(`${CONFIG.backendUrl}/api/alternatives/${mainMedicine.drug_name}`);
  //       alternatives = alternativesResponse.data;
  //     } catch (alternativesError) {
  //       console.log('No alternatives found or error fetching alternatives:', alternativesError);
  //       alternatives = [];
  //     }

  //     mainMedicine.price = await this.fetchPrice(mainMedicine.drug_name);
  //     alternatives = await Promise.all(alternatives.map(async (alt) => ({
  //       name: alt,
  //       price: await this.fetchPrice(alt)
  //     })));

  //     this.setState({
  //       mainMedicine,
  //       alternatives,
  //       loading: false
  //     }, this.sortAlternatives);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     this.setState({ error: 'Failed to fetch data', loading: false });
  //   }
  // }

  // checkMedicineExists = async (medicineName) => {
  //   try {
  //     const response = await axios.get(`${CONFIG.backendUrl}/api/medicine-exists/${medicineName}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error checking medicine existence:', error);
  //     return { exists: false, id: null };
  //   }
  // }

  // fetchPrice = async (medicineName) => {
  //   try {
  //     //console.log('Fetching price for:', medicineName);
  //     const normalizedMedicineName = medicineName.trim().toLowerCase(); // Normalize the name
  //     const response = await axios.get(`${CONFIG.backendUrl}/api/price/${normalizedMedicineName}`);

  //     return response.data.price;
  //   } catch (error) {
  //     //console.error('Error fetching price:', error);
  //     return 'PKR 12345'; // Default price if not found
  //   }
  // }

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
      alternatives = await Promise.all(alternatives.map(async (alt) => {
        const price = await this.fetchPrice(alt);
        const existsData = await this.checkMedicineExists(alt);
        return {
          name: alt,
          price,
          exists: existsData.exists,
          id: existsData.id
        };
      }));

      this.setState({
        mainMedicine,
        alternatives,
        loading: false
      }, this.sortAlternatives);
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'Failed to fetch data', loading: false });
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
      return 'Price unavailable setting PKR 123455';
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

  renderMainMedicine = () => {
    const { mainMedicine } = this.state;
    if (!mainMedicine) return null;

    return (
      <View style={styles.mainMedicineContainer}>
        <View style={styles.imagePlaceholder}></View>
        <Text style={styles.productName}>{mainMedicine.drug_name}</Text>
        <Text style={styles.productPrice}>{mainMedicine.price}</Text>
        <TouchableOpacity 
          style={styles.productButton}
          //onPress={() => this.props.navigation.navigate('MedInfo', { id: mainMedicine.id })}
          onPress={() => {
            
            //this.console(mainMedicine._id); 
            
            this.props.navigation.navigate('MedInfo', { id: mainMedicine._id }); // Use mainMedicine._id if necessary
          }}
          
        >
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // renderAlternative = ({ item }) => (
  //   <View style={styles.productContainer}>
  //     <View style={styles.imagePlaceholder}></View>
  //     <Text style={styles.productName}>{item.name}</Text>
  //     <Text style={styles.productPrice}>{item.price}</Text>
  //     <View style={styles.buttonContainer}>
  //       <TouchableOpacity 
  //         style={styles.productButton}
  //        // onPress={() => this.props.navigation.navigate('MedInfo', { id: item.id })}
  //        onPress={() => {
            
  //         this.console(item._id); 
          
  //         this.props.navigation.navigate('MedInfo', { id: item._id }); // Use mainMedicine._id if necessary
  //       }}
  //       >
  //         <Text style={styles.buttonText}>Details</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

  renderAlternative = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.imagePlaceholder}></View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <View style={styles.buttonContainer}>
        {item.exists && (
          <TouchableOpacity 
            style={styles.productButton}
            onPress={() => {
              console.log("shifting to medinfo id in alternative " + item.id);
              this.props.navigation.navigate('MedInfo', { id: item.id }); 
            }}
          >
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // render() {
  //   const { alternatives, loading, error } = this.state;

  //   if (loading) return <Text>Loading...</Text>;
  //   if (error) return <Text>{error}</Text>;

    // return (
    //   <View style={styles.container}>
    //     <View style={styles.headerContainer}>
    //       <Text style={styles.header}>Medicine Details</Text>
    //     </View>
    //     {this.renderMainMedicine()}
    //     <Text style={styles.subHeader}>Alternatives</Text>
    //     <View style={styles.sortContainer}>
    //       <TouchableOpacity 
    //         style={[styles.sortButton, this.state.sortBy === 'name' && styles.activeSortButton]}
    //         onPress={() => this.handleSortChange('name')}
    //       >
    //         <Text style={styles.sortButtonText}>Sort by Name</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity 
    //         style={[styles.sortButton, this.state.sortBy === 'price' && styles.activeSortButton]}
    //         onPress={() => this.handleSortChange('price')}
    //       >
    //         <Text style={styles.sortButtonText}>Sort by Price</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <FlatList
    //       data={alternatives}
    //       renderItem={this.renderAlternative}
    //       keyExtractor={(item, index) => index.toString()}
    //       contentContainerStyle={styles.productList}
    //     />
    //   </View>
    // );
  // }

  render() {
    const { alternatives, loading, error } = this.state;

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
      <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Medicine Details</Text>
      </View>
        {this.renderMainMedicine()}
        <Text style={styles.subHeader}>Alternatives</Text>
      <View style={styles.sortContainer}>
        <TouchableOpacity 
          style={[styles.sortButton, this.state.sortBy === 'name' && styles.activeSortButton]}
          onPress={() => this.handleSortChange('name')}
        >
          <Text style={styles.sortButtonText}>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sortButton, this.state.sortBy === 'price' && styles.activeSortButton]}
          onPress={() => this.handleSortChange('price')}
        >
          <Text style={styles.sortButtonText}>Sort by Price</Text>
        </TouchableOpacity>
      </View>
        <FlatList
          data={alternatives}
          renderItem={this.renderAlternative}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.productList}
        />
      </View>
    );
  }
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#074d66',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#074d66',
  },
  mainMedicineContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sortButton: {
    backgroundColor: '#074d66',
    borderRadius: 10,
    padding: 10,
    width: '48%',
  },
  activeSortButton: {
    backgroundColor: '#0a6d8a',
  },
  sortButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  productList: {
    paddingBottom: 20,
  },
  productContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: screenWidth * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  productButton: {
    backgroundColor: '#074d66',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});



