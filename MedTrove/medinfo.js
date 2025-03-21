
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  Dimensions
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
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const DropdownSection = ({ title, children, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = useSharedValue(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    rotation.value = withTiming(isExpanded ? 0 : 180, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }]
    };
  });

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity 
        style={styles.dropdownHeader} 
        onPress={toggleExpand}
      >
        <View style={styles.dropdownHeaderContent}>
          <View style={styles.dropdownTitleContainer}>
            {icon}
            <Text style={styles.dropdownTitle}>{title}</Text>
          </View>
          <Animated.View style={animatedStyle}>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#064D65" 
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.dropdownContent}>
          {children}
        </View>
      )}
    </View>
  );
};

const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';
const FDA_URL = 'https://api.fda.gov/drug/event.json';
const FDA_API_KEY = 'EW7PHR2gQ7uAALp2drvYmszbSScQRTZSzCVLlslo';

export default function MedInfo({ route, navigation }) {
  const { name } = route.params;
  const [medicine, setMedicine] = useState(null);
  const [price, setPrice] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/300');
  const [medicationDetails, setMedicationDetails] = useState(null);
   const [cartCount, setCartCount] = useState(0); // Add state for cart count
   

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

  const fetchMedicineData = async (name) => {
    try {
      setLoading(true);
      // Fetch local medicine data
      const response = await axios.get(`${CONFIG.backendUrl}/api/medicine-by-name/${name}`);
      setMedicine(response.data);
      
      // Fetch price
      const priceResponse = await axios.get(`${CONFIG.backendUrl}/api/price/${response.data.drug_name}`);
      setPrice(priceResponse.data.price || 'PKR 87.40');
  
      // Fetch drug image
      await fetchDrugImage(response.data.drug_name);

      // Fetch additional medication details from APIs
      await fetchMedicationInfo(response.data.drug_name);
    } catch (error) {
      console.error('Error fetching medicine data:', error);
      setError('Failed to fetch medicine data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicationInfo = async (query) => {
    if (!query.trim()) {
      return;
    }

    try {
      // First, get the RxCUI (unique identifier) for the medication
      const searchResponse = await fetch(
        `${BASE_URL}/drugs.json?name=${encodeURIComponent(query)}`
      );

      if (!searchResponse.ok) {
        throw new Error('Failed to fetch medication information');
      }

      const searchData = await searchResponse.json();
      
      if (searchData.drugGroup?.conceptGroup) {
        const medicationInfo = {
          name: query,
          ingredients: [],
          brands: [],
          sideEffects: [],
          reactionStats: {}
        };

        // Get basic medication information using RxNAV
        for (const group of searchData.drugGroup.conceptGroup) {
          if (group.conceptProperties) {
            for (const prop of group.conceptProperties) {
              const rxcui = prop.rxcui;
              
              // Fetch detailed information
              const detailResponse = await fetch(
                `${BASE_URL}/rxcui/${rxcui}/allrelated.json`
              );
              
              if (detailResponse.ok) {
                const detailData = await detailResponse.json();
                
                if (detailData.allRelatedGroup?.conceptGroup) {
                  detailData.allRelatedGroup.conceptGroup.forEach(group => {
                    if (group.tty === 'IN') { // Ingredients
                      group.conceptProperties?.forEach(prop => {
                        if (!medicationInfo.ingredients.includes(prop.name)) {
                          medicationInfo.ingredients.push(prop.name);
                        }
                      });
                    }
                    else if (group.tty === 'BN') { // Brand names
                      group.conceptProperties?.forEach(prop => {
                        if (!medicationInfo.brands.includes(prop.name)) {
                          medicationInfo.brands.push(prop.name);
                        }
                      });
                    }
                  });
                }
              }
            }
          }
        }

        // Fetch adverse events from FDA API with API key
        try {
          const fdaUrl = new URL(FDA_URL);
          fdaUrl.searchParams.append('api_key', FDA_API_KEY);
          fdaUrl.searchParams.append('search', `patient.drug.medicinalproduct:${encodeURIComponent(query)}`);
          fdaUrl.searchParams.append('limit', '100');

          const fdaResponse = await fetch(fdaUrl.toString());

          if (fdaResponse.ok) {
            const fdaData = await fdaResponse.json();
            
            // Process adverse events
            const reactionCounts = {};
            
            fdaData.results.forEach(result => {
              result.patient?.reaction?.forEach(reaction => {
                const reactionTerm = reaction.reactionmeddrapt;
                if (reactionTerm) {
                  reactionCounts[reactionTerm] = (reactionCounts[reactionTerm] || 0) + 1;
                }
              });
            });

            // Sort reactions by frequency and convert to array
            const sortedReactions = Object.entries(reactionCounts)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 15); // Get top 15 most common reactions

            medicationInfo.sideEffects = sortedReactions.map(([reaction, count]) => ({
              reaction,
              count,
              percentage: ((count / fdaData.results.length) * 100).toFixed(1)
            }));
          }
        } catch (fdaError) {
          console.error('FDA API Error:', fdaError);
        }
        
        setMedicationDetails(medicationInfo);
      }
    } catch (error) {
      console.error('Medication Info Error:', error);
    }
  };

  const fetchDrugImage = async (drugName) => {
    //const apiKey = 'AIzaSyDRmhRhTvXFDMVwJBT1oCrm0a2wstqSxzE';
    const apiKey = `${CONFIG.APIKEY}`;
    const searchEngineId = 'b1f9d3f416bd4494f';
    //`${CONFIG.SE}`;
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(drugName)}&cx=${searchEngineId}&searchType=image&key=${apiKey}`;
    console.log(url);
    try {
      console.log('Fetching image for:', drugName);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      if (response.status === 429) {
        console.log("Rate limited! Waiting before retrying...");
        setTimeout(fetchImages, 5000); // Wait 5 seconds and retry
        return;
      }

      const data = await response.json();
      //console.log('API Response:', JSON.stringify(data, null, 2));

      if (data.items && data.items.length > 0) {
        const firstImageUrl = data.items[0].link;
        console.log('Image URL found:', firstImageUrl);
        setImageUrl(firstImageUrl);
      } else {
        console.log('No images found in the API response.');
        setImageUrl('https://via.placeholder.com/300');
      }
    } catch (error) {
      console.error('Error fetching images:', error.message);
      // if (!error.message.includes("429")) {
      //   console.error("Error fetching images:", error.message);
      // }
      
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      setImageUrl('https://via.placeholder.com/300');
    }
  };

  // const navigateToCart = () => {
  //   try {
  //     console.log('Attempting to navigate to Cart');
  //     navigation.navigate('Cart');
  //   } catch (error) {
  //     console.error('Navigation error:', error);
  //     Alert.alert(
  //       "Navigation Error",
  //       "Unable to access cart at this time. Please try again.",
  //       [{ text: "OK" }]
  //     );
  //   }
  // };

  const navigateToCart = () => {
  console.log('Navigation object existence:', !!navigation);
  console.log('Navigation methods:', Object.keys(navigation));
  
  try {
    // Explicitly log available routes
    console.log('Available routes:', navigation.getState()?.routeNames);
    
    // Use navigation.push instead of navigate as a fallback
    if (navigation.navigate) {
      navigation.navigate('Cart');
    } else if (navigation.push) {
      navigation.push('Cart');
    } else {
      Alert.alert(
        "Navigation Error",
        "Unable to navigate to Cart",
        [{ text: "OK" }]
      );
    }
  } catch (error) {
    console.error('Cart navigation error:', error);
    Alert.alert(
      "Navigation Error",
      `Failed to navigate: ${error.message}`,
      [{ text: "OK" }]
    );
  }
};


  useEffect(() => {
    let isMounted = true;
  
    const loadData = async () => {
      if (isMounted) {
        await fetchMedicineData(name);
      }
    };
  
    // navigation.setOptions({
    //   headerRight: () => (
    //     <TouchableOpacity 
    //       onPress={navigateToCart}
    //       style={styles.cartIconContainer}
    //       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increases touch area
    //     >
    //       <Ionicons 
    //         name="cart-outline" 
    //         size={24} 
    //         color="#064D65"
    //         testID="cart-icon" 
    //       />
    //     </TouchableOpacity>
    //   ),
    // });
  
    
    loadData();
  
    return () => {
      isMounted = false;
    };
  }, [name, navigation]);

  const handleAddToCart = async () => {
    try {
      await axios.post(`${CONFIG.backendUrl}/api/cart/add`, {
        medicine: medicine.drug_name,
        quantity: quantity
      });

      fetchCartCount();
      
      Alert.alert(
        "Added to Cart",
        `${quantity} ${medicine.drug_name} added to your cart`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert(
        "Error",
        "Failed to add item to cart",
        [{ text: "OK" }]
      );
    }
  };

  const handleQuantityChange = (increment) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + increment));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#064D65" />
        <Text style={styles.loadingText}>Loading medication information...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color="#FF6B6B" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!medicine) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="information-circle" size={64} color="#FFD700" />
        <Text style={styles.errorText}>No medicine data available.</Text>
      </View>
    );
  }

  return (
  <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
    <View style={styles.topIcons}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('homepagetest')}
        style={styles.backIconContainer}
      >
        <Ionicons name="arrow-back" size={24} color="#064D65" />
      </TouchableOpacity>

      <TouchableOpacity 
          style={styles.headerIcon}
          onPress={() => {
            fetchCartCount(); // Refresh cart count before navigating
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

      {/* <TouchableOpacity 
        onPress={() => navigation.navigate('Cart')}
        style={styles.cartIconContainer}
      >
        <Ionicons name="cart-outline" size={24} color="#064D65" />
      </TouchableOpacity>
    </View> */}

    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
          onError={() => setImageUrl('https://via.placeholder.com/300')}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{medicine.drug_name}</Text>
        {medicine.generic_name && (
          <Text style={styles.genericName}>{medicine.generic_name}</Text>
        )}
        <Text style={styles.price}>{price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => handleQuantityChange(-1)} 
            style={styles.quantityButton}
          >
            <Ionicons name="remove" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            onPress={() => handleQuantityChange(1)} 
            style={styles.quantityButton}
          >
            <Ionicons name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color="#FFFFFF" style={styles.addToCartIcon} />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        {medicationDetails && (
          <View style={styles.detailsContainer}>
            {/* Active Ingredients Dropdown */}
            {medicationDetails.ingredients.length > 0 && (
              <DropdownSection 
                title="Active Ingredients" 
                icon={<Ionicons name="medical" size={20} color="#064D65" />}
              >
                {medicationDetails.ingredients.map((ingredient, index) => (
                  <Text key={index} style={styles.dropdownItemText}>
                    • {ingredient}
                  </Text>
                ))}
              </DropdownSection>
            )}

            {/* Available Brands Dropdown */}
            {medicationDetails.brands.length > 0 && (
              <DropdownSection 
                title="Available Brands" 
                icon={<Ionicons name="logo-bitcoin" size={20} color="#064D65" />}
              >
                {medicationDetails.brands.map((brand, index) => (
                  <Text key={index} style={styles.dropdownItemText}>
                    • {brand}
                  </Text>
                ))}
              </DropdownSection>
            )}

            {/* Medical Condition Dropdown */}
            {medicine.medical_condition && (
              <DropdownSection 
                title="Medical Condition" 
                icon={<Ionicons name="body" size={20} color="#064D65" />}
              >
                <Text style={styles.dropdownItemText}>
                  {medicine.medical_condition}
                </Text>
              </DropdownSection>
            )}

            {/* Reported Adverse Effects Dropdown */}
            {medicationDetails.sideEffects.length > 0 && (
              <DropdownSection 
                title="Reported Adverse Effects" 
                icon={<Ionicons name="warning" size={20} color="#FF6B6B" />}
              >
                <Text style={styles.disclaimerText}>
                  Based on FDA adverse event reports. These events may not be directly caused by the medication.
                </Text>
                {medicationDetails.sideEffects.map((effect, index) => (
                  <Text key={index} style={styles.dropdownItemText}>
                    • {effect.reaction} ({effect.count} reports, {effect.percentage}% of cases)
                  </Text>
                ))}
              </DropdownSection>
            )}
          </View>
        )}
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: 0,
    top: -3,
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
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#ffffff',
  },
  backIconContainer: {
    padding: 8,
    position: 'relative',
  },
  cartIconContainer: {
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
    //'#f8f9fa',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    borderWidth: 5,
    borderBottomWidth: 10,
    borderColor: '#f8f9fa'
  },
  image: {
    width: '80%',
    height: '60%',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: 
    //'#f1f3f5',
    '#ffffff',
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    marginTop: -25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064D65',
    marginBottom: 5,
  },
  genericName: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#28a745',
    marginBottom: 20,
    textAlign: 'right',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 
    '#ffffff',
    //'#f1f3f5',
    borderRadius: 10,
    padding: 10,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 20,
    color: '#064D65',
  },
  addToCartButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#064D65',
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '95%', 
    marginLeft: 10
  },
  addToCartIcon: {
    marginRight: 10,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 10,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownHeader: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dropdownTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#064D65',
    marginLeft: 10,
  },
  dropdownContent: {
    padding: 15,
    paddingTop: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 15,
    color: '#064D65',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    marginTop: 15,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  cartIconContainer: {
    marginRight: 15,
  },
});