// //WITHOUT API KEY 
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';

// const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';
// const FDA_URL = 'https://api.fda.gov/drug/event.json';

// const MedicationInfo = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [medicationData, setMedicationData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchMedicationInfo = async (query) => {
//     if (!query.trim()) {
//       Alert.alert('Error', 'Please enter a medication name');
//       return;
//     }

//     setLoading(true);

//     try {
//       // First, get the RxCUI (unique identifier) for the medication
//       const searchResponse = await fetch(
//         `${BASE_URL}/drugs.json?name=${encodeURIComponent(query)}`
//       );

//       if (!searchResponse.ok) {
//         throw new Error('Failed to fetch medication information');
//       }

//       const searchData = await searchResponse.json();
      
//       if (searchData.drugGroup?.conceptGroup) {
//         const medicationInfo = {
//           name: query,
//           synonym: '',
//           ingredients: [],
//           brands: [],
//           sideEffects: [], // Will store FDA adverse events
//           reactionStats: {} // Will store reaction frequency statistics
//         };

//         // Get basic medication information using RxNAV
//         for (const group of searchData.drugGroup.conceptGroup) {
//           if (group.conceptProperties) {
//             for (const prop of group.conceptProperties) {
//               const rxcui = prop.rxcui;
              
//               // Fetch detailed information
//               const detailResponse = await fetch(
//                 `${BASE_URL}/rxcui/${rxcui}/allrelated.json`
//               );
              
//               if (detailResponse.ok) {
//                 const detailData = await detailResponse.json();
                
//                 if (detailData.allRelatedGroup?.conceptGroup) {
//                   detailData.allRelatedGroup.conceptGroup.forEach(group => {
//                     if (group.tty === 'IN') { // Ingredients
//                       group.conceptProperties?.forEach(prop => {
//                         if (!medicationInfo.ingredients.includes(prop.name)) {
//                           medicationInfo.ingredients.push(prop.name);
//                         }
//                       });
//                     }
//                     else if (group.tty === 'BN') { // Brand names
//                       group.conceptProperties?.forEach(prop => {
//                         if (!medicationInfo.brands.includes(prop.name)) {
//                           medicationInfo.brands.push(prop.name);
//                         }
//                       });
//                     }
//                   });
//                 }
//               }
//             }
//           }
//         }

//         // Fetch adverse events from FDA API
//         try {
//           const fdaResponse = await fetch(
//             `${FDA_URL}?search=patient.drug.medicinalproduct:${encodeURIComponent(query)}&limit=100`
//           );

//           if (fdaResponse.ok) {
//             const fdaData = await fdaResponse.json();
            
//             // Process adverse events
//             const reactionCounts = {};
            
//             fdaData.results.forEach(result => {
//               result.patient?.reaction?.forEach(reaction => {
//                 const reactionTerm = reaction.reactionmeddrapt;
//                 if (reactionTerm) {
//                   reactionCounts[reactionTerm] = (reactionCounts[reactionTerm] || 0) + 1;
//                 }
//               });
//             });

//             // Sort reactions by frequency and convert to array
//             const sortedReactions = Object.entries(reactionCounts)
//               .sort(([, a], [, b]) => b - a)
//               .slice(0, 15); // Get top 15 most common reactions

//             medicationInfo.sideEffects = sortedReactions.map(([reaction, count]) => ({
//               reaction,
//               count,
//               percentage: ((count / fdaData.results.length) * 100).toFixed(1)
//             }));
//           }
//         } catch (fdaError) {
//           console.error('FDA API Error:', fdaError);
//           // Continue without FDA data if there's an error
//         }
        
//         setMedicationData(medicationInfo);
//       } else {
//         Alert.alert('Not Found', 'No medication found with that name');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Enter medication name"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           placeholderTextColor="#666"
//         />
//         <TouchableOpacity
//           style={styles.searchButton}
//           onPress={() => fetchMedicationInfo(searchQuery)}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>Search</Text>
//         </TouchableOpacity>
//       </View>

//       {loading && (
//         <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
//       )}

//       {medicationData && !loading && (
//         <ScrollView style={styles.infoContainer}>
//           <View style={styles.card}>
//             <Text style={styles.title}>{medicationData.name}</Text>
            
//             {medicationData.ingredients.length > 0 && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Active Ingredients:</Text>
//                 {medicationData.ingredients.map((ingredient, index) => (
//                   <Text key={index} style={styles.listItem}>• {ingredient}</Text>
//                 ))}
//               </View>
//             )}

//             {medicationData.brands.length > 0 && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Available Brands:</Text>
//                 {medicationData.brands.map((brand, index) => (
//                   <Text key={index} style={styles.listItem}>• {brand}</Text>
//                 ))}
//               </View>
//             )}

//             {medicationData.sideEffects.length > 0 && (
//               <View style={[styles.section, styles.sideEffectsSection]}>
//                 <Text style={styles.sectionTitle}>Reported Adverse Events:</Text>
//                 <Text style={styles.disclaimer}>
//                   Based on FDA adverse event reports. These events may not be directly caused by the medication.
//                 </Text>
//                 {medicationData.sideEffects.map((effect, index) => (
//                   <Text key={index} style={styles.sideEffectItem}>
//                     • {effect.reaction} ({effect.count} reports, {effect.percentage}% of cases)
//                   </Text>
//                 ))}
//               </View>
//             )}
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     marginTop: 40,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginRight: 8,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   searchButton: {
//     backgroundColor: '#0066cc',
//     paddingHorizontal: 20,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   loader: {
//     marginTop: 20,
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//   },
//   section: {
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#444',
//   },
//   listItem: {
//     fontSize: 16,
//     marginBottom: 4,
//     color: '#666',
//     paddingLeft: 8,
//   },
//   sideEffectsSection: {
//     backgroundColor: '#fff5f5',
//     padding: 12,
//     borderRadius: 8,
//     borderLeftWidth: 4,
//     borderLeftColor: '#ff4444',
//   },
//   sideEffectItem: {
//     fontSize: 16,
//     marginBottom: 4,
//     color: '#664',
//     paddingLeft: 8,
//   },
//   disclaimer: {
//     fontSize: 14,
//     fontStyle: 'italic',
//     color: '#666',
//     marginBottom: 8,
//   },
// });

// export default MedicationInfo;





// //WITH API KEY
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';
const FDA_URL = 'https://api.fda.gov/drug/event.json';
const FDA_API_KEY = 'EW7PHR2gQ7uAALp2drvYmszbSScQRTZSzCVLlslo';

const MedicationInfo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [medicationData, setMedicationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMedicationInfo = async (query) => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a medication name');
      return;
    }

    setLoading(true);

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
          synonym: '',
          ingredients: [],
          brands: [],
          sideEffects: [], // Will store FDA adverse events
          reactionStats: {} // Will store reaction frequency statistics
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
          if (fdaError.response?.status === 401) {
            console.error('FDA API Key Invalid:', fdaError);
            Alert.alert('Error', 'Invalid FDA API key. Please check your configuration.');
          } else {
            console.error('FDA API Error:', fdaError);
            Alert.alert('Error', 'Failed to fetch adverse event data');
          }
        }
        
        setMedicationData(medicationInfo);
      } else {
        Alert.alert('Not Found', 'No medication found with that name');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter medication name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => fetchMedicationInfo(searchQuery)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      )}

      {medicationData && !loading && (
        <ScrollView style={styles.infoContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>{medicationData.name}</Text>
            
            {medicationData.ingredients.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Active Ingredients:</Text>
                {medicationData.ingredients.map((ingredient, index) => (
                  <Text key={index} style={styles.listItem}>• {ingredient}</Text>
                ))}
              </View>
            )}

            {medicationData.brands.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Available Brands:</Text>
                {medicationData.brands.map((brand, index) => (
                  <Text key={index} style={styles.listItem}>• {brand}</Text>
                ))}
              </View>
            )}

            {medicationData.sideEffects.length > 0 && (
              <View style={[styles.section, styles.sideEffectsSection]}>
                <Text style={styles.sectionTitle}>Reported Adverse Events:</Text>
                <Text style={styles.disclaimer}>
                  Based on FDA adverse event reports. These events may not be directly caused by the medication.
                </Text>
                {medicationData.sideEffects.map((effect, index) => (
                  <Text key={index} style={styles.sideEffectItem}>
                    • {effect.reaction} ({effect.count} reports, {effect.percentage}% of cases)
                  </Text>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
  infoContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
    color: '#666',
    paddingLeft: 8,
  },
  sideEffectsSection: {
    backgroundColor: '#fff5f5',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff4444',
  },
  sideEffectItem: {
    fontSize: 16,
    marginBottom: 4,
    color: '#664',
    paddingLeft: 8,
  },
  disclaimer: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
});

export default MedicationInfo;