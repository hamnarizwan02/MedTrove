// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import CONFIG from './config';

// export default function MedInfo({ route, navigation }) {
//   //const id = '66e1df80bc0ca5e347fadc6a';
//   const { id } = route.params;
//   const [medicine, setMedicine] = useState(null);
//   const [price, setPrice] = useState('Loading...');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/300'); // Add this state

//   useEffect(() => {
//     const fetchMedicineData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${CONFIG.backendUrl}/api/medici/${id}`);
//         setMedicine(response.data);
        
//         const priceResponse = await axios.get(`${CONFIG.backendUrl}/api/price/${response.data.drug_name}`);
//         setPrice(priceResponse.data.price || 'Price not available');

//         await fetchDrugImage(response.data.drug_name); // Fetch drug image

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching medicine data:', error);
//         setError('Failed to fetch medicine data. Please try again.');
//         setLoading(false);
//       }
//     };

//     fetchMedicineData();
//   }, [id]);
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import CONFIG from './config';

export default function MedInfo({ route, navigation }) {
  const { name } = route.params;
  const [medicine, setMedicine] = useState(null);
  const [price, setPrice] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/300');

  useEffect(() => {
    console.log("nameeee " + name);
    const fetchMedicineData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${CONFIG.backendUrl}/api/medicine-by-name/${name}`);
        setMedicine(response.data);

        console.log(response.data);
        
        const priceResponse = await axios.get(`${CONFIG.backendUrl}/api/price/${response.data.drug_name}`);
        setPrice(priceResponse.data.price || 'Price not available');

        await fetchDrugImage(response.data.drug_name);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching medicine data:', error);
        setError('Failed to fetch medicine data. Please try again.');
        setLoading(false);
      }
    };

    fetchMedicineData();
  }, [name]);

  // const fetchDrugImage = async (drugName) => {
  //   const apiKey = 'AIzaSyDE6AOUqSxH5E6xUD4IlU2Sn2Cbdffazvo'; // Replace with your API key
  //   const searchEngineId = 'e7a8780e6245241cf'; // Replace with your Search Engine ID
  //   const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(drugName)}&cx=${searchEngineId}&searchType=image&key=${apiKey}`;

  //   try {
  //       const response = await fetch(url);
  //       const data = await response.json();

  //       // Check if there are items in the response
  //       if (data.items && data.items.length > 0) {
  //           const firstImageUrl = data.items[0].link; // Get the link of the first image
  //           setImageUrl(firstImageUrl); // Update the state with the image URL
  //           console.log(firstImageUrl); // You can use this URL in your application
  //       } else {
  //           console.log('No images found.');
  //           setImageUrl('https://via.placeholder.com/300'); // Fallback image
  //       }
  //   } catch (error) {
  //       console.error('Error fetching images:', error);
  //       setImageUrl('https://via.placeholder.com/300'); // Fallback image
  //   }
  // };

  const fetchDrugImage = async (drugName) => {
    const apiKey = 'AIzaSyDRmhRhTvXFDMVwJBT1oCrm0a2wstqSxzE';
   //const apiKey = `${CONFIG.APIKEY}`;
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
      
      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));

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
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      setImageUrl('https://via.placeholder.com/300');
    }
  };

  const handleQuantityChange = (increment) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + increment));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${medicine.drug_name} to cart`);
    // Implement actual add to cart functionality here
  };

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>;
  }

  if (!medicine) {
    return <View style={styles.container}><Text>No medicine data available.</Text></View>;
  }

  const renderSection = (title, content) => {
    if (!content || content.trim() === '') return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionText}>{content}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
            source={{ uri: imageUrl }} // Use the imageUrl state here
            style={styles.image}
            resizeMode="contain"
            onError={() => setImageUrl('https://via.placeholder.com/300')} // Fallback in case of error
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{medicine.drug_name}</Text>
        {medicine.generic_name && <Text style={styles.genericName}>{medicine.generic_name}</Text>}
        <Text style={styles.price}>{price}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={styles.quantityButton}>
            <Ionicons name="remove" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(1)} style={styles.quantityButton}>
            <Ionicons name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        {renderSection("Medical Condition", medicine.medical_condition)}
        {renderSection("Side Effects", medicine.side_effects)}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#064D65',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '500',
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: '#064D65',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addToCartButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});