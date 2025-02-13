// //MedicationListScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const MedicationListScreen = ({ navigation }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [medications, setMedications] = useState([]);
  
//   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const currentDay = new Date().getDay();
  
//   const getDayStyle = (index) => ({
//     ...styles.dayButton,
//     backgroundColor: index === currentDay ? '#007AFF' : '#F0F0F0'
//   });

//   const MedicationCard = ({ medication }) => (
//     <View style={styles.medicationCard}>
//       <View style={styles.medIconContainer}>
//         <View style={[styles.medIcon, { backgroundColor: '#FFE4E1' }]}>
//           <Text style={styles.medIconText}>💊</Text>
//         </View>
//       </View>
//       <View style={styles.medInfo}>
//         <Text style={styles.medName}>{medication.name}</Text>
//         <Text style={styles.medDosage}>
//           {medication.dosage.amount} {medication.dosage.unit}
//           {medication.dosage.notes && ` • ${medication.dosage.notes}`}
//         </Text>
//         <View style={styles.timingContainer}>
//           <View style={styles.timingChip}>
//             <Text style={styles.timingText}>Before Lunch</Text>
//           </View>
//           <View style={styles.timingChip}>
//             <Text style={styles.timingText}>After Dinner</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Your Medicines Reminder</Text>
//         <TouchableOpacity onPress={() => {}} style={styles.profileButton}>
//           <Text style={styles.profileButtonText}>👤</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
//         {weekDays.map((day, index) => (
//           <TouchableOpacity key={day} style={getDayStyle(index)}>
//             <Text style={styles.dayDate}>{index + 6}</Text>
//             <Text style={[styles.dayText, index === currentDay && styles.selectedDayText]}>
//               {day}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <View style={styles.tabContainer}>
//         <TouchableOpacity style={[styles.tab, styles.activeTab]}>
//           <Text style={[styles.tabText, styles.activeTabText]}>Today</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tab}>
//           <Text style={styles.tabText}>Week</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tab}>
//           <Text style={styles.tabText}>Month</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.medicationsList}>
//         {medications.map((med) => (
//           <MedicationCard key={med._id} medication={med} />
//         ))}
//       </ScrollView>

//       <TouchableOpacity 
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AddMedicationScreen')}
//       >
//         <Text style={styles.addButtonText}>+ Add Medicine</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   profileButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F0F0F0',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   calendar: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   dayButton: {
//     width: 60,
//     height: 70,
//     borderRadius: 30,
//     marginRight: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dayDate: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   dayText: {
//     fontSize: 14,
//   },
//   selectedDayText: {
//     color: '#FFFFFF',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   tab: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginRight: 10,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#007AFF',
//   },
//   tabText: {
//     color: '#666666',
//   },
//   activeTabText: {
//     color: '#007AFF',
//     fontWeight: '500',
//   },
//   medicationsList: {
//     padding: 20,
//   },
//   medicationCard: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   medIconContainer: {
//     marginRight: 15,
//   },
//   medIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   medIconText: {
//     fontSize: 24,
//   },
//   medInfo: {
//     flex: 1,
//   },
//   medName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   medDosage: {
//     fontSize: 14,
//     color: '#666666',
//     marginBottom: 8,
//   },
//   timingContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   timingChip: {
//     backgroundColor: '#F0F0F0',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 15,
//   },
//   timingText: {
//     fontSize: 12,
//     color: '#666666',
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 25,
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '500',
//   },
// });

// export default MedicationListScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import CONFIG from './config';

const MedicationListScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedTab, setSelectedTab] = useState('Today');
  const [weeklyMedications, setWeeklyMedications] = useState([]);
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = new Date().getDay();

  useEffect(() => {
    fetchMedicationsForDate(selectedDate);
  }, [selectedDate]);

  const fetchMedicationsForDate = async (date) => {
    setLoading(true);
    try {
      const formattedDate = date.toISOString().split('T')[0];
      console.log('Fetching medications for date:', formattedDate); // Debug log
  
      const response = await axios.get(`${CONFIG.backendUrl}/api/medications/date?date=${formattedDate}`);
      console.log('API Response:', response.data); // Debug log
      
      if (response.data.success) {
        setMedications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching medications:', error);
      Alert.alert('Error', 'Failed to fetch medications');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyMedications = async () => {
    setLoading(true);
    try {
      // Get start and end of current week
      const currentDate = new Date();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
  
      const formattedStartDate = startOfWeek.toISOString().split('T')[0];
      const formattedEndDate = endOfWeek.toISOString().split('T')[0];
  
      const response = await axios.get(`${CONFIG.backendUrl}/api/medications/week?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      
      if (response.data.success) {
        setWeeklyMedications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching weekly medications:', error);
      Alert.alert('Error', 'Failed to fetch weekly medications');
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyMedications = async () => {
    setLoading(true);
    try {
      // Get start and end of the current month
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
      const formattedStartDate = startOfMonth.toISOString().split('T')[0];
      const formattedEndDate = endOfMonth.toISOString().split('T')[0];
  
      const response = await axios.get(
        `${CONFIG.backendUrl}/api/medications/month?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
  
      if (response.data.success) {
        setMedications(response.data.data); // Reuse the `medications` state here to display the fetched monthly data
      }
    } catch (error) {
      console.error('Error fetching monthly medications:', error);
      Alert.alert('Error', 'Failed to fetch monthly medications');
    } finally {
      setLoading(false);
    }
  };
  

  const getDayStyle = (index) => ({
    ...styles.dayButton,
    backgroundColor: index === selectedDate.getDay() ? '#007AFF' : '#F0F0F0'
  });

  // const handleDateSelect = (dayIndex) => {
  //   const newDate = new Date();
  //   newDate.setDate(newDate.getDate() - (newDate.getDay() - dayIndex));
  //   setSelectedDate(newDate);
  // };

  const handleDateSelect = (dayIndex) => {
    const newDate = new Date();
    // Adjust the date to the selected day
    const diff = dayIndex - newDate.getDay();
    newDate.setDate(newDate.getDate() + diff);
    // Set to midnight to avoid timezone issues
    newDate.setHours(0, 0, 0, 0);
    console.log('Selected date:', newDate.toISOString());
    setSelectedDate(newDate);
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const MedicationCard = ({ medication }) => (
    <TouchableOpacity 
      style={styles.medicationCard}
      onPress={() => navigation.navigate('MedicationDetails', { medication })}
    >
      <View style={styles.medIconContainer}>
        <View style={[styles.medIcon, { backgroundColor: '#FFE4E1' }]}>
          <Text style={styles.medIconText}>💊</Text>
        </View>
      </View>
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{medication.name}</Text>
        <Text style={styles.medDosage}>
          {medication.dosage.amount} {medication.dosage.unit}
          {medication.dosage.notes && ` • ${medication.dosage.notes}`}
        </Text>
        <View style={styles.timingContainer}>
          {medication.times_a_day > 0 && (
            <View style={styles.timingChip}>
              <Text style={styles.timingText}>
                {medication.times_a_day}x per day
              </Text>
            </View>
          )}
          {medication.frequency > 1 && (
            <View style={styles.timingChip}>
              <Text style={styles.timingText}>
                Every {medication.frequency} days
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Medicines Reminder</Text>
        <TouchableOpacity onPress={() => {}} style={styles.profileButton}>
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
        {weekDays.map((day, index) => (
          <TouchableOpacity 
            key={day} 
            style={getDayStyle(index)}
            onPress={() => handleDateSelect(index)}
          >
            <Text style={styles.dayDate}>
              {new Date(selectedDate.getTime() - ((selectedDate.getDay() - index) * 86400000)).getDate()}
            </Text>
            <Text style={[styles.dayText, index === selectedDate.getDay() && styles.selectedDayText]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.tabContainer}>
  <TouchableOpacity 
    style={[styles.tab, selectedTab === 'Today' && styles.activeTab]}
    onPress={() => {
      setSelectedTab('Today');
      fetchMedicationsForDate(selectedDate);
    }}
  >
    <Text style={[styles.tabText, selectedTab === 'Today' && styles.activeTabText]}>
      Today
    </Text>
  </TouchableOpacity>
  <TouchableOpacity 
    style={[styles.tab, selectedTab === 'Week' && styles.activeTab]}
    onPress={() => {
      setSelectedTab('Week');
      fetchWeeklyMedications();
    }}
  >
    <Text style={[styles.tabText, selectedTab === 'Week' && styles.activeTabText]}>
      Week
    </Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={[styles.tab, selectedTab === 'Month' && styles.activeTab]}
      onPress={() => {
        setSelectedTab('Month');
        fetchMonthlyMedications(); 
      }}
    >
      <Text style={styles.tabText}>Month</Text>
    </TouchableOpacity>
  </View>


{/* <ScrollView style={styles.medicationsList}>
  {loading ? (
    <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
  ) : (
    <>
      {selectedTab === 'Today' ? (
        // Daily view
        medications.map((med) => (
          <MedicationCard key={med._id} medication={med} />
        ))
      ) : selectedTab === 'Week' ? (
        // Weekly view
        weeklyMedications.map((med) => (
          <View key={med._id}>
            {Object.entries(med.selectedDays)
              .filter(([day, isSelected]) => isSelected)
              .map(([day]) => (
                <View key={day} style={styles.weeklyMedicationContainer}>
                  <Text style={styles.weekDay}>{day}</Text>
                  <MedicationCard medication={med} />
                </View>
              ))}
          </View>
        ))
      ) : (
        // Month view (to be implemented)
        <Text style={styles.comingSoonText}>Monthly view coming soon</Text>
      )}
      
      {selectedTab === 'Today' && medications.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.noMedicationsText}>
            No medications scheduled for today
          </Text>
        </View>
      )}
      
      {selectedTab === 'Week' && weeklyMedications.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.noMedicationsText}>
            No medications scheduled for this week
          </Text>
        </View>
      )}
    </>
  )}
</ScrollView> */}

<ScrollView style={styles.medicationsList}>
  {loading ? (
    <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
  ) : (
    <>
      {selectedTab === 'Today' ? (
        // Daily view
        medications.map((med) => (
          <MedicationCard key={med._id} medication={med} />
        ))
      ) : selectedTab === 'Week' ? (
        // Weekly view
        weeklyMedications.map((med) => (
          <View key={med._id}>
            {Object.entries(med.selectedDays)
              .filter(([day, isSelected]) => isSelected)
              .map(([day]) => (
                <View key={day} style={styles.weeklyMedicationContainer}>
                  <Text style={styles.weekDay}>{day}</Text>
                  <MedicationCard medication={med} />
                </View>
              ))}
          </View>
        ))
      ) : selectedTab === 'Month' ? (
        // Monthly view
        medications.map((med) => (
          <MedicationCard key={med._id} medication={med} />
        ))
      ) : (
        <Text style={styles.comingSoonText}>Monthly view coming soon</Text>
      )}

      {selectedTab === 'Today' && medications.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.noMedicationsText}>
            No medications scheduled for today
          </Text>
        </View>
      )}

      {selectedTab === 'Week' && weeklyMedications.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.noMedicationsText}>
            No medications scheduled for this week
          </Text>
        </View>
      )}

      {selectedTab === 'Month' && medications.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.noMedicationsText}>
            No medications scheduled for this month
          </Text>
        </View>
      )}
    </>
  )}
</ScrollView>


      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMedicationScreen')}
      >
        <Text style={styles.addButtonText}>+ Add Medicine</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  weeklyMedicationContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 15,
  },
  weekDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  comingSoonText: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 20,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonText: {
    fontSize: 20,
  },
  calendar: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  dayButton: {
    width: 60,
    height: 70,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dayDate: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  dayText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#666666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  medicationsList: {
    flex: 1,
    padding: 20,
  },
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medIconContainer: {
    marginRight: 15,
  },
  medIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medIconText: {
    fontSize: 24,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  medDosage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  timingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timingChip: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  timingText: {
    fontSize: 12,
    color: '#666666',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
  loader: {
    marginTop: 50,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  noMedicationsText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  }
});

export default MedicationListScreen;
