import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CONFIG from './config.js';

export default function DrugInteractionScreen() {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkInteraction = async () => {
    if (!drug1.trim() || !drug2.trim()) {
      Alert.alert('Error', 'Please enter both medications');
      return;
    }

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

      if (!response.ok) {
        console.log("HELP");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to check drug interaction. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <LinearGradient
      colors={['#d2eefa', '#FFFFFF']}
      style={styles.gradientBackground}
    >

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Drug Interaction Checker
        </Text>

        <Text style={styles.instruction}>
          Enter two medications to check their compatibility
        </Text>
        

        <View style={styles.inputContainer}>
          <View style={styles.drugInputRow}>
            <TextInput
              style={styles.input}
              placeholder="Medication 1"
              value={drug1}
              onChangeText={setDrug1}
              placeholderTextColor="#666"
            />
            <MaterialIcons name="add" size={32} color="#064D65" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Medication 2"
              value={drug2}
              onChangeText={setDrug2}
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity
            style={styles.checkButton}
            onPress={checkInteraction}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                <MaterialIcons name="search" size={15} color="#fff" /> Check Interaction
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {result && (
          <View
            style={[
              styles.resultContainer,
              result.found ? styles.warningResult : styles.safeResult,
            ]}
          >
            {result.found ? (
              <>
                <Text style={styles.warningText}>
                  ⚠️ Interaction Found
                </Text>
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
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#064D65',
  },
  instruction:{
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
    color: '#064D65',
  },

  inputContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  drugInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f5f5f5',
    backgroundColor: '#f8fbfd',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    flex: 1,
  },
  icon: {
    marginHorizontal: "5%",
    marginTop: "1%"

  },
  checkButton: {
    backgroundColor: '#064D65',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  warningResult: {
    backgroundColor: '#ffebee',
    borderColor: '#ef5350',
    borderWidth: 1,
  },
  safeResult: {
    backgroundColor: '#e8f5e9',
    borderColor: '#66bb6a',
    borderWidth: 1,
  },
  warningText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 10,
  },
  safeText: {
    fontSize: 18,
    color: '#4caf50',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  interactionType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
