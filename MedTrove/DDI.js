// DrugInteractionScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CONFIG from './config.js'; 

export default function DrugInteractionScreen() {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  // const [drug1] = 'Bivalirudin';
  // const [drug2] = 'Alfuzosin';

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkInteraction = async () => {
    //drug1 = 'Bivalirudin';
    //drug2 = 'Alfuzosin';
    
    if (!drug1.trim() || !drug2.trim()) {
      Alert.alert('Error', 'Please enter both medications');
      return;
    }
    console.log(drug1 + "  "+ drug2);
    setLoading(true);
    try {
      const response = await fetch(`${CONFIG.backendUrl}/api/check-interaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drug1: drug1.trim(),
          drug2: drug2.trim(),
        }),
      });

      const data = await response.json();
      console.log(data);
      
      setResult(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to check drug interaction. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Drug Interaction Checker</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter first medication"
          value={drug1}
          onChangeText={setDrug1}
          placeholderTextColor="#666"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter second medication"
          value={drug2}
          onChangeText={setDrug2}
          placeholderTextColor="#666"
        />

        <TouchableOpacity 
          style={styles.checkButton}
          onPress={checkInteraction}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Check Interaction</Text>
          )}
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultContainer}>
          {result.found ? (
            <>
              <Text style={styles.warningText}>⚠️ Interaction Found</Text>
              <Text style={styles.resultText}>
                An interaction exists between {result.interaction.drug1} and {result.interaction.drug2}
              </Text>
              <Text style={styles.interactionType}>
                Type: {result.interaction.type}
              </Text>
              <Text style={styles.disclaimer}>
                Please consult your healthcare provider for medical advice.
              </Text>
            </>
          ) : (
            <Text style={styles.safeText}>
              ✓ No known interactions found between these medications.
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  checkButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  warningText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 10,
  },
  safeText: {
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  interactionType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

// export default DrugInteractionScreen;