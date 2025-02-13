import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Alert } from 'react-native';
import CONFIG from './config';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddMedicationScreen = ({ navigation }) => {
  const [currentUserId, setCurrentUserId] = useState(null);  
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState({
    amount: '',
    unit: 'pill',
    notes: ''
  });
  const [frequency, setFrequency] = useState('');
  const [selectedDays, setSelectedDays] = useState({
    Sun: false,
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false
  });
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [times, setTimes] = useState([new Date()]);

  const units = [
    { label: 'Tablet', value: 'tablet' },
    { label: 'Pill', value: 'pill' },
    { label: 'ML', value: 'ml' },
    { label: 'Puff', value: 'puff' },
    { label: 'Pump', value: 'pump' },
    { label: 'Application', value: 'application' }
  ];

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${CONFIG.backendUrl}/api/user/current`);
      if (response.data.success) {
        setCurrentUserId(response.data.userID);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSave = async () => {
    if (!currentUserId) {
        Alert.alert('Error', 'User not found. Please try again.');
        return;
    }

    try {
        const medicationData = {
            userId: currentUserId, 
            name,
            dosage,
            frequency: parseInt(frequency),
            times_a_day: times.length,
            selectedDays,
            duration: parseInt(duration),
            startDate,
            endDate: new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000),
            isActive: true
          };
  
      const response = await axios.post(`${CONFIG.backendUrl}/api/medications`, medicationData);
  
      if (response.data.success) {
        Alert.alert('Success', 'Medication added successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving medication:', error);
      Alert.alert('Error', 'Failed to save medication');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add New Medicine</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medicine Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter medicine name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dosage</Text>
            <View style={styles.dosageContainer}>
              <TextInput
                style={[styles.input, styles.dosageAmount]}
                value={dosage.amount}
                onChangeText={(value) => setDosage({ ...dosage, amount: value })}
                keyboardType="numeric"
                placeholder="Amount"
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={dosage.unit}
                  onValueChange={(value) => setDosage({ ...dosage, unit: value })}
                  style={styles.picker}
                >
                  {units.map((unit) => (
                    <Picker.Item 
                      key={unit.value} 
                      label={unit.label} 
                      value={unit.value} 
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <TextInput
              style={styles.input}
              value={dosage.notes}
              onChangeText={(value) => setDosage({ ...dosage, notes: value })}
              placeholder="Additional notes (e.g., with water)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {formatDate(startDate)}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Frequency (times per day)</Text>
            <TextInput
              style={styles.input}
              value={frequency}
              onChangeText={setFrequency}
              keyboardType="numeric"
              placeholder="How many times per day?"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Days of Week</Text>
            <View style={styles.daysContainer}>
              {Object.keys(selectedDays).map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDays[day] && styles.selectedDayButton
                  ]}
                  onPress={() => setSelectedDays({
                    ...selectedDays,
                    [day]: !selectedDays[day]
                  })}
                >
                  <Text style={[
                    styles.dayButtonText,
                    selectedDays[day] && styles.selectedDayButtonText
                  ]}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Duration (days)</Text>
            <TextInput
              style={styles.input}
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
              placeholder="Enter number of days"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Medicine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    backButton: {
      fontSize: 24,
      marginRight: 15,
      color: '#064D65',
      padding: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000000',
    },
    form: {
      padding: 20,
    },
    inputGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      color: '#333333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#DDDDDD',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#FFFFFF',
      color: '#333333',
    },
    dosageContainer: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 10,
    },
    dosageAmount: {
      flex: 1,
    },
    pickerContainer: {
      flex: 2,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#FFFFFF',
    },
    picker: {
      height: 50,
      backgroundColor: '#FFFFFF',
    },
    daysContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 5,
    },
    dayButton: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: '#F0F0F0',
      minWidth: 45,
      alignItems: 'center',
    },
    selectedDayButton: {
      backgroundColor: '#007AFF',
    },
    dayButtonText: {
      fontSize: 14,
      color: '#666666',
      fontWeight: '500',
    },
    selectedDayButtonText: {
      color: '#FFFFFF',
    },
    timesContainer: {
      marginTop: 10,
    },
    timeButton: {
      backgroundColor: '#F0F0F0',
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
    },
    timeButtonText: {
      fontSize: 16,
      color: '#333333',
      textAlign: 'center',
    },
    addTimeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#E8E8E8',
      marginTop: 10,
    },
    addTimeButtonText: {
      color: '#007AFF',
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 8,
    },
    notesInput: {
      borderWidth: 1,
      borderColor: '#DDDDDD',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      minHeight: 80,
      textAlignVertical: 'top',
      marginTop: 10,
    },
    saveButton: {
      backgroundColor: '#064D65',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    errorText: {
      color: '#FF3B30',
      fontSize: 14,
      marginTop: 4,
    },
    timePickerContainer: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 12,
      marginBottom: 15,
    },
    timePickerLabel: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 10,
      color: '#333333',
    },
    freqInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    freqInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
    },
    freqUnit: {
      fontSize: 16,
      color: '#666666',
    },
    durationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    durationInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
    },
    durationUnit: {
      fontSize: 16,
      color: '#666666',
      marginLeft: 8,
    },
    calendar: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      borderRadius: 8,
      padding: 10,
    },
    divider: {
      height: 1,
      backgroundColor: '#F0F0F0',
      marginVertical: 20,
    },
    warningText: {
      color: '#FF9500',
      fontSize: 14,
      marginTop: 4,
    },
    requiredStar: {
      color: '#FF3B30',
      marginLeft: 4,
    },
    pickerItem: {
      fontSize: 16,
    },
    modalContainer: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 12,
      marginHorizontal: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    modalButton: {
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    modalButtonConfirm: {
      backgroundColor: '#007AFF',
    },
    modalButtonCancel: {
      backgroundColor: '#FF3B30',
    },
    modalButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
    }
  });

export default AddMedicationScreen;