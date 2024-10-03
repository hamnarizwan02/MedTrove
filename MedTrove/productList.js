import React from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity, Dimensions } from 'react-native';

export default class ProductList extends React.Component {
  state = {
    products: [
      { id: '1', name: 'Paracetamol', price: 'Rs. 600', description: 'Lorem ipsum dolor sit amet.', image: null },
      { id: '2', name: 'Ibuprofen', price: 'Rs. 210', description: 'Lorem ipsum dolor sit amet.', image: null },
      { id: '3', name: 'Aspirin', price: 'Rs. 500', description: 'Lorem ipsum dolor sit amet.', image: null },
      { id: '4', name: 'Antihistamine', price: 'Rs. 700', description: 'Lorem ipsum dolor sit amet.', image: null },
    ],
    sortedProducts: [],
    sortBy: 'name', // Default sorting criteria
  };

  componentDidMount() {
    this.sortProducts(); // Initial sort
  }

  // Function to sort products based on selected criteria
  sortProducts = () => {
    const { products, sortBy } = this.state;
    const sorted = [...products].sort((a, b) => {
      if (sortBy === 'price') {
        return parseInt(a.price.replace('Rs. ', '')) - parseInt(b.price.replace('Rs. ', ''));
      }
      return a.name.localeCompare(b.name);
    });
    this.setState({ sortedProducts: sorted });
  };

  // Function to handle sorting change
  handleSortChange = (criteria) => {
    this.setState({ sortBy: criteria }, this.sortProducts);
  };

  renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.imagePlaceholder}></View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.productButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productButton}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    const { sortedProducts, products } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Available Medicines</Text>
        {/* Display the first product */}
        {products.length > 0 && (
          <View style={styles.firstProductContainer}>
            <View style={styles.imagePlaceholder}></View>
            <Text style={styles.productName}>{products[0].name}</Text>
            <Text style={styles.productPrice}>{products[0].price}</Text>
            <Text style={styles.productDescription}>{products[0].description}</Text>
          </View>
        )}
        {/* Sort by functionality */}
        <View style={styles.sortContainer}>
          <TouchableOpacity style={styles.sortButton} onPress={() => this.handleSortChange('name')}>
            <Text style={styles.sortButtonText}>Sort by Name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortButton} onPress={() => this.handleSortChange('price')}>
            <Text style={styles.sortButtonText}>Sort by Price</Text>
          </TouchableOpacity>
        </View>
        {/* Display the rest of the products */}
        <FlatList
          data={sortedProducts.slice(1)} // Skip the first product
          renderItem={this.renderProduct}
          keyExtractor={item => item.id}
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#074d66',
    textAlign: 'center', // Centered header
  },
  firstProductContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center', // Center text and image
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  sortButton: {
    backgroundColor: '#074d66',
    borderRadius: 10,
    padding: 10,
    width: '45%', // Button width to fit side by side
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
  },
  productPrice: {
    fontSize: 16,
    color: '#074d66',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productButton: {
    backgroundColor: '#074d66',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});