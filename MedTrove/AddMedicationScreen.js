// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import { Alert } from 'react-native';
// import CONFIG from './config';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { scheduleNotifications, requestNotificationPermissions } from './notificationScheduler';

// // Add this test function in your AddMedicationScreen
// const testQuickNotification = async () => {
//   const fifteenSecondsFromNow = new Date();
//   fifteenSecondsFromNow.setSeconds(fifteenSecondsFromNow.getSeconds() + 15);

//   try {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: `Time to take ${name}`,
//         body: `Take ${dosage.amount} ${dosage.unit}`,
//       },
//       trigger: {
//         date: fifteenSecondsFromNow,
//       },
//     });
    
//     Alert.alert('Test notification scheduled', 'You should receive a notification in 15 seconds');
//   } catch (error) {
//     console.error('Error scheduling test notification:', error);
//     Alert.alert('Error', 'Failed to schedule test notification');
//   }
// };

// const AddMedicationScreen = ({ navigation }) => {
//   const [currentUserId, setCurrentUserId] = useState(null);  
//   const [name, setName] = useState('');
//   const [dosage, setDosage] = useState({
//     amount: '',
//     unit: 'pill',
//     notes: ''
//   });
//   const [frequency, setFrequency] = useState('');
//   const [selectedDays, setSelectedDays] = useState({
//     Sun: false,
//     Mon: false,
//     Tue: false,
//     Wed: false,
//     Thu: false,
//     Fri: false,
//     Sat: false
//   });
//   const [duration, setDuration] = useState('');
//   const [startDate, setStartDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [times, setTimes] = useState([new Date()]);

//   const units = [
//     { label: 'Tablet', value: 'tablet' },
//     { label: 'Pill', value: 'pill' },
//     { label: 'ML', value: 'ml' },
//     { label: 'Puff', value: 'puff' },
//     { label: 'Pump', value: 'pump' },
//     { label: 'Application', value: 'application' }
//   ];

//   useEffect(() => {
//     fetchCurrentUser();
//   }, []);

//   const fetchCurrentUser = async () => {
//     try {
//       const response = await axios.get(`${CONFIG.backendUrl}/api/user/current`);
//       if (response.data.success) {
//         setCurrentUserId(response.data.userID);
//       }
//     } catch (error) {
//       console.error('Error fetching current user:', error);
//     }
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setStartDate(selectedDate);
//     }
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // const handleSave = async () => {
//   //   if (!currentUserId) {
//   //       Alert.alert('Error', 'User not found. Please try again.');
//   //       return;
//   //   }

//   //   try {
//   //       const medicationData = {
//   //           userId: currentUserId, 
//   //           name,
//   //           dosage,
//   //           frequency: parseInt(frequency),
//   //           times_a_day: times.length,
//   //           selectedDays,
//   //           duration: parseInt(duration),
//   //           startDate,
//   //           endDate: new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000),
//   //           isActive: true
//   //         };
  
//   //     const response = await axios.post(`${CONFIG.backendUrl}/api/medications`, medicationData);
  
//   //     if (response.data.success) {
//   //       Alert.alert('Success', 'Medication added successfully');
//   //       navigation.goBack();
//   //     }
//   //   } catch (error) {
//   //     console.error('Error saving medication:', error);
//   //     Alert.alert('Error', 'Failed to save medication');
//   //   }
//   // };

//   const handleSave = async () => {
//     if (!currentUserId) {
//       Alert.alert('Error', 'User not found. Please try again.');
//       return;
//     }
  
//     try {
//       // Request notification permissions first
//       await requestNotificationPermissions();
  
//       const medicationData = {
//         userId: currentUserId,
//         name,
//         dosage,
//         frequency: parseInt(frequency),
//         times_a_day: times.length,
//         selectedDays,
//         duration: parseInt(duration),
//         startDate,
//         endDate: new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000),
//         isActive: true
//       };
  
//       // Schedule notifications
//       const scheduledNotifications = await scheduleNotifications(medicationData);
      
//       // Save medication data along with notification IDs
//       const response = await axios.post(`${CONFIG.backendUrl}/api/medications`, {
//         ...medicationData,
//         notificationIds: scheduledNotifications.map(n => n.id)
//       });
  
//       if (response.data.success) {
//         Alert.alert('Success', 'Medication and notifications added successfully');
//         navigation.goBack();
//       }
//     } catch (error) {
//       console.error('Error saving medication:', error);
//       Alert.alert('Error', error.message || 'Failed to save medication');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Add New Medicine</Text>
//         </View>

//         <View style={styles.form}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Medicine Name</Text>
//             <TextInput
//               style={styles.input}
//               value={name}
//               onChangeText={setName}
//               placeholder="Enter medicine name"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Dosage</Text>
//             <View style={styles.dosageContainer}>
//               <TextInput
//                 style={[styles.input, styles.dosageAmount]}
//                 value={dosage.amount}
//                 onChangeText={(value) => setDosage({ ...dosage, amount: value })}
//                 keyboardType="numeric"
//                 placeholder="Amount"
//               />
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={dosage.unit}
//                   onValueChange={(value) => setDosage({ ...dosage, unit: value })}
//                   style={styles.picker}
//                 >
//                   {units.map((unit) => (
//                     <Picker.Item 
//                       key={unit.value} 
//                       label={unit.label} 
//                       value={unit.value} 
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             </View>
//             <TextInput
//               style={styles.input}
//               value={dosage.notes}
//               onChangeText={(value) => setDosage({ ...dosage, notes: value })}
//               placeholder="Additional notes (e.g., with water)"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Start Date</Text>
//             <TouchableOpacity 
//               style={styles.dateButton}
//               onPress={() => setShowDatePicker(true)}
//             >
//               <Text style={styles.dateButtonText}>
//                 {formatDate(startDate)}
//               </Text>
//             </TouchableOpacity>
//             {showDatePicker && (
//               <DateTimePicker
//                 value={startDate}
//                 mode="date"
//                 display="default"
//                 onChange={handleDateChange}
//                 minimumDate={new Date()}
//               />
//             )}
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Frequency (times per day)</Text>
//             <TextInput
//               style={styles.input}
//               value={frequency}
//               onChangeText={setFrequency}
//               keyboardType="numeric"
//               placeholder="How many times per day?"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Days of Week</Text>
//             <View style={styles.daysContainer}>
//               {Object.keys(selectedDays).map((day) => (
//                 <TouchableOpacity
//                   key={day}
//                   style={[
//                     styles.dayButton,
//                     selectedDays[day] && styles.selectedDayButton
//                   ]}
//                   onPress={() => setSelectedDays({
//                     ...selectedDays,
//                     [day]: !selectedDays[day]
//                   })}
//                 >
//                   <Text style={[
//                     styles.dayButtonText,
//                     selectedDays[day] && styles.selectedDayButtonText
//                   ]}>{day}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Duration (days)</Text>
//             <TextInput
//               style={styles.input}
//               value={duration}
//               onChangeText={setDuration}
//               keyboardType="numeric"
//               placeholder="Enter number of days"
//             />
//           </View>

//           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//             <Text onPress={testQuickNotification} style={styles.saveButtonText}>Save Medicine</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   dateButton: {
//     padding: 12,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: '#333',
//   },
//     container: {
//       flex: 1,
//       backgroundColor: '#FFFFFF',
//     },
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: 20,
//       borderBottomWidth: 1,
//       borderBottomColor: '#F0F0F0',
//     },
//     backButton: {
//       fontSize: 24,
//       marginRight: 15,
//       color: '#064D65',
//       padding: 5,
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       color: '#000000',
//     },
//     form: {
//       padding: 20,
//     },
//     inputGroup: {
//       marginBottom: 24,
//     },
//     label: {
//       fontSize: 16,
//       fontWeight: '500',
//       marginBottom: 8,
//       color: '#333333',
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: '#DDDDDD',
//       borderRadius: 8,
//       padding: 12,
//       fontSize: 16,
//       backgroundColor: '#FFFFFF',
//       color: '#333333',
//     },
//     dosageContainer: {
//       flexDirection: 'row',
//       gap: 10,
//       marginBottom: 10,
//     },
//     dosageAmount: {
//       flex: 1,
//     },
//     pickerContainer: {
//       flex: 2,
//       borderWidth: 1,
//       borderColor: '#DDDDDD',
//       borderRadius: 8,
//       overflow: 'hidden',
//       backgroundColor: '#FFFFFF',
//     },
//     picker: {
//       height: 50,
//       backgroundColor: '#FFFFFF',
//     },
//     daysContainer: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       gap: 10,
//       marginTop: 5,
//     },
//     dayButton: {
//       paddingHorizontal: 16,
//       paddingVertical: 10,
//       borderRadius: 20,
//       backgroundColor: '#F0F0F0',
//       minWidth: 45,
//       alignItems: 'center',
//     },
//     selectedDayButton: {
//       backgroundColor: '#007AFF',
//     },
//     dayButtonText: {
//       fontSize: 14,
//       color: '#666666',
//       fontWeight: '500',
//     },
//     selectedDayButtonText: {
//       color: '#FFFFFF',
//     },
//     timesContainer: {
//       marginTop: 10,
//     },
//     timeButton: {
//       backgroundColor: '#F0F0F0',
//       padding: 12,
//       borderRadius: 8,
//       marginBottom: 10,
//     },
//     timeButtonText: {
//       fontSize: 16,
//       color: '#333333',
//       textAlign: 'center',
//     },
//     addTimeButton: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 12,
//       borderRadius: 8,
//       backgroundColor: '#E8E8E8',
//       marginTop: 10,
//     },
//     addTimeButtonText: {
//       color: '#007AFF',
//       fontSize: 16,
//       fontWeight: '500',
//       marginLeft: 8,
//     },
//     notesInput: {
//       borderWidth: 1,
//       borderColor: '#DDDDDD',
//       borderRadius: 8,
//       padding: 12,
//       fontSize: 16,
//       minHeight: 80,
//       textAlignVertical: 'top',
//       marginTop: 10,
//     },
//     saveButton: {
//       backgroundColor: '#064D65',
//       padding: 16,
//       borderRadius: 8,
//       alignItems: 'center',
//       marginTop: 30,
//       marginBottom: 30,
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 3.84,
//       elevation: 5,
//     },
//     saveButtonText: {
//       color: '#FFFFFF',
//       fontSize: 18,
//       fontWeight: '600',
//     },
//     errorText: {
//       color: '#FF3B30',
//       fontSize: 14,
//       marginTop: 4,
//     },
//     timePickerContainer: {
//       backgroundColor: '#FFFFFF',
//       padding: 20,
//       borderRadius: 12,
//       marginBottom: 15,
//     },
//     timePickerLabel: {
//       fontSize: 16,
//       fontWeight: '500',
//       marginBottom: 10,
//       color: '#333333',
//     },
//     freqInputContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 10,
//     },
//     freqInput: {
//       flex: 1,
//       borderWidth: 1,
//       borderColor: '#DDDDDD',
//       borderRadius: 8,
//       padding: 12,
//       fontSize: 16,
//     },
//     freqUnit: {
//       fontSize: 16,
//       color: '#666666',
//     },
//     durationContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 10,
//     },
//     durationInput: {
//       flex: 1,
//       borderWidth: 1,
//       borderColor: '#DDDDDD',
//       borderRadius: 8,
//       padding: 12,
//       fontSize: 16,
//     },
//     durationUnit: {
//       fontSize: 16,
//       color: '#666666',
//       marginLeft: 8,
//     },
//     calendar: {
//       marginTop: 10,
//       borderWidth: 1,
//       borderColor: '#DDDDDD',
//       borderRadius: 8,
//       padding: 10,
//     },
//     divider: {
//       height: 1,
//       backgroundColor: '#F0F0F0',
//       marginVertical: 20,
//     },
//     warningText: {
//       color: '#FF9500',
//       fontSize: 14,
//       marginTop: 4,
//     },
//     requiredStar: {
//       color: '#FF3B30',
//       marginLeft: 4,
//     },
//     pickerItem: {
//       fontSize: 16,
//     },
//     modalContainer: {
//       backgroundColor: '#FFFFFF',
//       padding: 20,
//       borderRadius: 12,
//       marginHorizontal: 20,
//     },
//     modalTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 15,
//       textAlign: 'center',
//     },
//     modalButton: {
//       padding: 15,
//       borderRadius: 8,
//       alignItems: 'center',
//       marginTop: 10,
//     },
//     modalButtonConfirm: {
//       backgroundColor: '#007AFF',
//     },
//     modalButtonCancel: {
//       backgroundColor: '#FF3B30',
//     },
//     modalButtonText: {
//       color: '#FFFFFF',
//       fontSize: 16,
//       fontWeight: '500',
//     }
//   });

// export default AddMedicationScreen;

















///////IMMEDIATE NOTIFICATIONS
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import CONFIG from './config';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { scheduleNotifications, requestNotificationPermissions, scheduleAllNotifications} from './notificationScheduler';

const AddMedicationScreen = ({ navigation }) => {
  const [currentUserId, setCurrentUserId] = useState(null);  
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState({
    amount: '',
    unit: 'pill',
    notes: ''
  });
  const [frequency, setFrequency] = useState('1');
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
  
  // Notification time management
  const [notificationTimes, setNotificationTimes] = useState([{ 
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    id: '1'
  }]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTimeIndex, setActiveTimeIndex] = useState(0);

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
    // Update notification time slots when frequency changes
    updateNotificationTimeSlots();
  }, [frequency]);

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

  const updateNotificationTimeSlots = () => {
    const freq = parseInt(frequency) || 1;
    
    // If we need more time slots, add them
    if (freq > notificationTimes.length) {
      const newTimes = [...notificationTimes];
      for (let i = notificationTimes.length; i < freq; i++) {
        newTimes.push({
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
          id: (i + 1).toString()
        });
      }
      setNotificationTimes(newTimes);
    } 
    // If we need fewer, remove them
    else if (freq < notificationTimes.length) {
      setNotificationTimes(notificationTimes.slice(0, freq));
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newTimes = [...notificationTimes];
      newTimes[activeTimeIndex] = {
        ...newTimes[activeTimeIndex],
        hour: selectedTime.getHours(),
        minute: selectedTime.getMinutes()
      };
      setNotificationTimes(newTimes);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (hour, minute) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute} ${ampm}`;
  };

  const openTimePicker = (index) => {
    setActiveTimeIndex(index);
    setShowTimePicker(true);
  };

  const testQuickNotification = async () => {
    // Request permissions first
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant notification permissions to receive medication reminders.');
      return;
    }

    const fifteenSecondsFromNow = new Date();
    fifteenSecondsFromNow.setSeconds(fifteenSecondsFromNow.getSeconds() + 15);

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Time to take ${name || 'your medication'}`,
          body: `Take ${dosage.amount || '1'} ${dosage.unit} ${dosage.notes ? '(' + dosage.notes + ')' : ''}`,
        },
        trigger: {
          date: fifteenSecondsFromNow,
        },
      });
      
      Alert.alert('Test notification scheduled', 'You should receive a notification in 15 seconds');
    } catch (error) {
      console.error('Error scheduling test notification:', error);
      Alert.alert('Error', 'Failed to schedule test notification');
    }
  };

  const scheduleAllNotifications = async (medicationData) => {
    try {
      // Request notification permissions first
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Notification permissions are required for medication reminders');
      }
      
      const selectedDaysArray = Object.entries(selectedDays)
        .filter(([day, selected]) => selected)
        .map(([day]) => day);
      
      if (selectedDaysArray.length === 0) {
        throw new Error('Please select at least one day of the week');
      }

      const notificationIds = [];
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      // Calculate end date
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + parseInt(duration || 30));
      
      // Schedule a notification for each selected day and each time slot
      for (const time of notificationTimes) {
        for (const day of selectedDaysArray) {
          const dayIndex = daysOfWeek.indexOf(day);
          
          // Create a trigger for this specific day and time
          const trigger = {
            hour: time.hour,
            minute: time.minute,
            repeats: true,
            weekday: dayIndex + 1, // Expo uses 1-7 for days of the week (Sunday is 1)
          };
          
          // Schedule the notification
          const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
              title: `Time to take ${name}`,
              body: `Take ${dosage.amount} ${dosage.unit} ${dosage.notes ? '(' + dosage.notes + ')' : ''}`,
              data: { medicationId: medicationData.id },
            },
            trigger,
          });
          
          notificationIds.push(notificationId);
        }
      }
      
      return notificationIds;
    } catch (error) {
      console.error('Error scheduling notifications:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!currentUserId) {
      Alert.alert('Error', 'User not found. Please try again.');
      return;
    }
    
    if (!name || !dosage.amount || !frequency || !duration) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }
    
    try {
      const medicationData = {
        userId: currentUserId,
        name,
        dosage,
        frequency: parseInt(frequency),
        times: notificationTimes,
        selectedDays,
        duration: parseInt(duration),
        startDate,
        endDate: new Date(startDate.getTime() + parseInt(duration) * 24 * 60 * 60 * 1000),
        isActive: true
      };
      
      // Schedule all notifications
      const notificationIds = await scheduleAllNotifications(medicationData);
      
      // Save medication data along with notification IDs
      const response = await axios.post(`${CONFIG.backendUrl}/api/medications`, {
        ...medicationData,
        notificationIds
      });
      
      if (response.data.success) {
        Alert.alert('Success', 'Medication and notifications added successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving medication:', error);
      Alert.alert('Error', error.message || 'Failed to save medication');
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
          
          {/* Notification Time Slots */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notification Times</Text>
            {notificationTimes.map((time, index) => (
              <TouchableOpacity
                key={time.id}
                style={styles.timeButton}
                onPress={() => openTimePicker(index)}
              >
                <Text style={styles.timeButtonText}>
                  Dose {index + 1}: {formatTime(time.hour, time.minute)}
                </Text>
              </TouchableOpacity>
            ))}
            {showTimePicker && (
              <DateTimePicker
                value={(() => {
                  const date = new Date();
                  date.setHours(notificationTimes[activeTimeIndex].hour);
                  date.setMinutes(notificationTimes[activeTimeIndex].minute);
                  return date;
                })()}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={handleTimeChange}
              />
            )}
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
          
          <TouchableOpacity style={styles.testButton} onPress={testQuickNotification}>
            <Text style={styles.testButtonText}>Test Notification (0s)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Medicine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    fontSize: 24,
    marginRight: 15,
    color: '#064D65',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#064D65',
  },
  form: {
    padding: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#343a40',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#495057',
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  timeButtonText: {
    fontSize: 16,
    color: '#495057',
  },
  dosageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dosageAmount: {
    flex: 1,
    marginRight: 10,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ced4da',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedDayButton: {
    backgroundColor: '#064D65',
    borderColor: '#064D65',
  },
  dayButtonText: {
    fontSize: 12,
    color: '#495057',
  },
  selectedDayButtonText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#064D65',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  testButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AddMedicationScreen;
