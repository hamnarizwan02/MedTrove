import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import CONFIG from './config';
import ProfileManagement from './profilemangement';
import { useNavigation } from '@react-navigation/native';

// const MedicationListScreen = ({ navigation }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [medications, setMedications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('Today');
//   const [weeklyMedications, setWeeklyMedications] = useState([]);
//   const [monthlyMedications, setMonthlyMedications] = useState({});
//   const [selectedMonth, setSelectedMonth] = useState(new Date());
//   const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
//   const [calendarMedications, setCalendarMedications] = useState([]);

//   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   useEffect(() => {
//     if (selectedTab === 'Month') {
//       fetchMonthlyMedications();
//     }
//   }, [selectedMonth, selectedTab]);

//   useEffect(() => {
//     if (selectedTab === 'Today') {
//       fetchMedicationsForDate(new Date());
//     } else if (selectedTab === 'Week') {
//       fetchWeeklyMedications();
//     } else if (selectedTab === 'Month') {
//       fetchMonthlyMedications();
//     }
//   }, [selectedTab]);

//   const fetchMedicationsForDate = async (date) => {
//     setLoading(true);
//     try {
//       const formattedDate = date.toISOString().split('T')[0];
//       const response = await axios.get(`${CONFIG.backendUrl}/api/medications/date?date=${formattedDate}`);
      
//       if (response.data.success) {
//         if (selectedTab === 'Today') {
//           setMedications(response.data.data);
//         } else {
//           setCalendarMedications(response.data.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching medications:', error);
//       Alert.alert('Error', 'Failed to fetch medications');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const fetchWeeklyMedications = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const currentDate = new Date();
//   //     const startOfWeek = new Date(currentDate);
//   //     startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//   //     const endOfWeek = new Date(startOfWeek);
//   //     endOfWeek.setDate(startOfWeek.getDate() + 6);

//   //     const formattedStartDate = startOfWeek.toISOString().split('T')[0];
//   //     const formattedEndDate = endOfWeek.toISOString().split('T')[0];

//   //     const response = await axios.get(
//   //       `${CONFIG.backendUrl}/api/medications/week?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
//   //     );

//   //     if (response.data.success) {
//   //       setWeeklyMedications(response.data.data);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching weekly medications:', error);
//   //     Alert.alert('Error', 'Failed to fetch weekly medications');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchWeeklyMedications = async () => {
//     setLoading(true);
//     try {
//       const currentDate = new Date();
      
//       // Get start of week (Sunday)
//       const startOfWeek = new Date(currentDate);
//       startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      
//       // Get end of week (Saturday)
//       const endOfWeek = new Date(startOfWeek);
//       endOfWeek.setDate(startOfWeek.getDate() + 6);
  
//       const formattedStartDate = startOfWeek.toISOString().split('T')[0];
//       const formattedEndDate = endOfWeek.toISOString().split('T')[0];
  
//       const response = await axios.get(
//         `${CONFIG.backendUrl}/api/medications/week?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
//       );
  
//       if (response.data.success) {
//         setWeeklyMedications(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching weekly medications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   const fetchMonthlyMedications = async () => {
//     setLoading(true);
//     try {
//       const year = selectedMonth.getFullYear();
//       const month = selectedMonth.getMonth() + 1;

//       const response = await axios.get(
//         `${CONFIG.backendUrl}/api/medications/month?year=${year}&month=${month}`
//       );

//       if (response.data.success) {
//         setMonthlyMedications(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching monthly medications:', error);
//       Alert.alert('Error', 'Failed to fetch monthly medications');
//     } finally {
//       setLoading(false);
//     }
//   };


//   const MedicationCard = ({ medication }) => (
//     <TouchableOpacity 
//       style={styles.medicationCard}
//       // onPress={() => navigation.navigate('MedicationDetails', { medication })}
//     >
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
//           {medication.times_a_day > 0 && (
//             <View style={styles.timingChip}>
//               <Text style={styles.timingText}>
//                 {medication.frequency}x per day
//               </Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const MonthlyCalendar = () => {
//     const daysInMonth = new Date(
//       selectedMonth.getFullYear(),
//       selectedMonth.getMonth() + 1,
//       0
//     ).getDate();

//     const firstDayOfMonth = new Date(
//       selectedMonth.getFullYear(),
//       selectedMonth.getMonth(),
//       1
//     ).getDay();

//     const renderCalendarDays = () => {
//       const days = [];
      
//       for (let i = 0; i < firstDayOfMonth; i++) {
//         days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
//       }

//       for (let day = 1; day <= daysInMonth; day++) {
//         const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
//         const dateStr = date.toISOString().split('T')[0];
//         const hasMedications = monthlyMedications[dateStr]?.length > 0;
//         const isSelected = selectedCalendarDate && 
//           selectedCalendarDate.toDateString() === date.toDateString();

//         days.push(
//           <TouchableOpacity
//             key={day}
//             style={[
//               styles.calendarDay,
//               hasMedications && styles.calendarDayWithMeds,
//               isSelected && styles.selectedCalendarDay
//             ]}
//             onPress={() => {
//               setSelectedCalendarDate(date);
//               fetchMedicationsForDate(date);
//             }}
//           >
//             <Text style={[
//               styles.calendarDayText,
//               isSelected && styles.selectedCalendarDayText
//             ]}>{day}</Text>
//             {hasMedications && (
//               <View style={styles.medicationDot} />
//             )}
//           </TouchableOpacity>
//         );
//       }

//       return days;
//     };

//     return (
//       <View style={styles.monthlyCalendar}>
//         <View style={styles.monthHeader}>
//           <TouchableOpacity
//             onPress={() => {
//               const newDate = new Date(selectedMonth);
//               newDate.setMonth(newDate.getMonth() - 1);
//               setSelectedMonth(newDate);
//               setSelectedCalendarDate(null);
//               setCalendarMedications([]);
//             }}
//           >
//             <Text style={styles.monthArrow}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.monthTitle}>
//             {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
//           </Text>
//           <TouchableOpacity
//             onPress={() => {
//               const newDate = new Date(selectedMonth);
//               newDate.setMonth(newDate.getMonth() + 1);
//               setSelectedMonth(newDate);
//               setSelectedCalendarDate(null);
//               setCalendarMedications([]);
//             }}
//           >
//             <Text style={styles.monthArrow}>→</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.weekDayHeader}>
//           {weekDays.map(day => (
//             <Text key={day} style={styles.weekDayText}>{day}</Text>
//           ))}
//         </View>
//         <View style={styles.calendarGrid}>
//           {renderCalendarDays()}
//         </View>
//       </View>
//     );
//   };

//   const groupMedicationsByDay = (medications) => {
//     const grouped = {
//       Sun: [], Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: []
//     };
    
//     medications.forEach(med => {
//       Object.entries(med.selectedDays).forEach(([day, isSelected]) => {
//         if (isSelected) {
//           grouped[day].push(med);
//         }
//       });
//     });
    
//     return grouped;
//   };
  

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Your Reminders</Text>
//         <TouchableOpacity 
//           style={styles.profileButton} 
//           onPress={() => navigation.navigate("ProfileManagement")}
//         >
//           <Text style={styles.profileButtonText}>👤</Text>
//         </TouchableOpacity>

//       </View>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
//           {weekDays.map((day, index) => {
//             const currentDate = new Date();
//             const thisDate = new Date(currentDate);
//             thisDate.setDate(currentDate.getDate() - (currentDate.getDay() - index));
            
//             const isSelected = selectedDate && 
//               thisDate.toDateString() === selectedDate.toDateString();
            
//             return (
//               <TouchableOpacity 
//                 key={day} 
//                 style={[
//                   styles.dayButton,
//                   isSelected && {backgroundColor: '#2F6779'}
//                 ]}
//                 onPress={() => {
//                   setSelectedDate(thisDate);
//                   fetchMedicationsForDate(thisDate);
//                 }}
//               >
//                 <Text style={styles.dayDate}>
//                   {thisDate.getDate()}
//                 </Text>
//                 <Text style={[
//                   styles.dayText,
//                   isSelected && styles.selectedDayText
//                 ]}>
//                   {day}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//       </ScrollView>

//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tab, selectedTab === 'Today' && styles.activeTab]}
//           onPress={() => setSelectedTab('Today')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'Today' && styles.activeTabText]}>
//             Today
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.tab, selectedTab === 'Week' && styles.activeTab]}
//           onPress={() => setSelectedTab('Week')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'Week' && styles.activeTabText]}>
//             Week
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.tab, selectedTab === 'Month' && styles.activeTab]}
//           onPress={() => setSelectedTab('Month')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'Month' && styles.activeTabText]}>
//             Month
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView style={styles.medicationsList}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#064D65" style={styles.loader} />
//         ) : (
//           <>
//             {selectedTab === 'Today' && (
//               <>
//                 {medications.length > 0 ? (
//                   medications.map((med, index) => (
//                     <MedicationCard key={`${med._id}-${med.times_a_day}-${index}`} medication={med} />
//                   ))                
//                 ) : (
//                   <View style={styles.emptyState}>
//                     <Text style={styles.noMedicationsText}>
//                       No medications scheduled for today
//                     </Text>
//                   </View>
//                 )}
//               </>
//             )}
            
//             {selectedTab === 'Week' && (
//               <>
//                 {Object.entries(weeklyMedications).length > 0 ? (
//                   Object.entries(weeklyMedications).map(([day, meds]) => (
//                     <View key={day} style={styles.weeklyMedicationContainer}>
//                       <Text style={styles.weekDay}>{day}</Text>
//                       {meds.length > 0 ? (
//                         meds.map((med, index) => (
//                           <MedicationCard key={`${med._id}-${med.times_a_day}-${index}`} medication={med} />
//                         ))                       
//                       ) : (
//                         <Text>No medications scheduled</Text>
//                       )}
//                     </View>
//                   ))
//                 ) : (
//                   <View style={styles.emptyState}>
//                     <Text style={styles.noMedicationsText}>
//                       No medications scheduled for this week
//                     </Text>
//                   </View>
//                 )}
//               </>
//             )}
            
//             {selectedTab === 'Month' && (
//               <>
//                 <MonthlyCalendar />
//                 {selectedCalendarDate && (
//                   <View style={styles.calendarMedicationsList}>
//                     <Text style={styles.selectedDateText}>
//                       Medications for {selectedCalendarDate.toLocaleDateString()}
//                     </Text>
//                     {calendarMedications.length > 0 ? (
//                       calendarMedications.map((med, index) => (
//                         <MedicationCard key={`${med._id}-${med.times_a_day}-${index}`} medication={med} />
//                       ))                     
//                     ) : (
//                       <Text style={styles.noMedicationsText}>
//                         No medications scheduled for this date
//                       </Text>
//                     )}
//                   </View>
//                 )}
//               </>
//             )}
//           </>
//         )}
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

const MedicationListScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Today');
  const [weeklyMedications, setWeeklyMedications] = useState([]);
  const [monthlyMedications, setMonthlyMedications] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [calendarMedications, setCalendarMedications] = useState([]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper function to format date consistently (avoids timezone issues)
  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedTab === 'Month') {
      fetchMonthlyMedications();
    }
  }, [selectedMonth, selectedTab]);

  useEffect(() => {
    if (selectedTab === 'Today') {
      fetchMedicationsForDate(new Date());
    } else if (selectedTab === 'Week') {
      fetchWeeklyMedications();
    } else if (selectedTab === 'Month') {
      fetchMonthlyMedications();
    }
  }, [selectedTab]);

  const fetchMedicationsForDate = async (date) => {
    setLoading(true);
    try {
      // Use local date formatting instead of ISO string
      const formattedDate = formatDateForAPI(date);
      console.log('Fetching medications for date:', formattedDate); // Debug log
      
      const response = await axios.get(`${CONFIG.backendUrl}/api/medications/date?date=${formattedDate}`);
      
      if (response.data.success) {
        console.log('Medications received:', response.data.data); // Debug log
        if (selectedTab === 'Today') {
          setMedications(response.data.data);
        } else {
          setCalendarMedications(response.data.data);
        }
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
      const currentDate = new Date();
      
      // Get start of week (Sunday)
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      
      // Get end of week (Saturday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
  
      const formattedStartDate = formatDateForAPI(startOfWeek);
      const formattedEndDate = formatDateForAPI(endOfWeek);
  
      const response = await axios.get(
        `${CONFIG.backendUrl}/api/medications/week?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
  
      if (response.data.success) {
        setWeeklyMedications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching weekly medications:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchMonthlyMedications = async () => {
    setLoading(true);
    try {
      const year = selectedMonth.getFullYear();
      const month = selectedMonth.getMonth() + 1;

      const response = await axios.get(
        `${CONFIG.backendUrl}/api/medications/month?year=${year}&month=${month}`
      );

      if (response.data.success) {
        setMonthlyMedications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching monthly medications:', error);
      Alert.alert('Error', 'Failed to fetch monthly medications');
    } finally {
      setLoading(false);
    }
  };

  const MedicationCard = ({ medication }) => (
    <TouchableOpacity 
      style={styles.medicationCard}
      // onPress={() => navigation.navigate('MedicationDetails', { medication })}
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
                {medication.frequency}x per day
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const MonthlyCalendar = () => {
    const daysInMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    ).getDay();

    const renderCalendarDays = () => {
      const days = [];
      
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
        const dateStr = formatDateForAPI(date); // Use consistent date formatting
        const hasMedications = monthlyMedications[dateStr]?.length > 0;
        const isSelected = selectedCalendarDate && 
          selectedCalendarDate.toDateString() === date.toDateString();

        days.push(
          <TouchableOpacity
            key={day}
            style={[
              styles.calendarDay,
              hasMedications && styles.calendarDayWithMeds,
              isSelected && styles.selectedCalendarDay
            ]}
            onPress={() => {
              setSelectedCalendarDate(date);
              fetchMedicationsForDate(date);
            }}
          >
            <Text style={[
              styles.calendarDayText,
              isSelected && styles.selectedCalendarDayText
            ]}>{day}</Text>
            {hasMedications && (
              <View style={styles.medicationDot} />
            )}
          </TouchableOpacity>
        );
      }

      return days;
    };

    return (
      <View style={styles.monthlyCalendar}>
        <View style={styles.monthHeader}>
          <TouchableOpacity
            onPress={() => {
              const newDate = new Date(selectedMonth);
              newDate.setMonth(newDate.getMonth() - 1);
              setSelectedMonth(newDate);
              setSelectedCalendarDate(null);
              setCalendarMedications([]);
            }}
          >
            <Text style={styles.monthArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newDate = new Date(selectedMonth);
              newDate.setMonth(newDate.getMonth() + 1);
              setSelectedMonth(newDate);
              setSelectedCalendarDate(null);
              setCalendarMedications([]);
            }}
          >
            <Text style={styles.monthArrow}>→</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weekDayHeader}>
          {weekDays.map(day => (
            <Text key={day} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {renderCalendarDays()}
        </View>
      </View>
    );
  };

  const groupMedicationsByDay = (medications) => {
    const grouped = {
      Sun: [], Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: []
    };
    
    medications.forEach(med => {
      Object.entries(med.selectedDays).forEach(([day, isSelected]) => {
        if (isSelected) {
          grouped[day].push(med);
        }
      });
    });
    
    return grouped;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Reminders</Text>
        <TouchableOpacity 
          style={styles.profileButton} 
          onPress={() => navigation.navigate("ProfileManagement")}
        >
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
          {weekDays.map((day, index) => {
            const currentDate = new Date();
            const thisDate = new Date(currentDate);
            thisDate.setDate(currentDate.getDate() - (currentDate.getDay() - index));
            
            const isSelected = selectedDate && 
              thisDate.toDateString() === selectedDate.toDateString();
            
            return (
              <TouchableOpacity 
                key={day} 
                style={[
                  styles.dayButton,
                  isSelected && {backgroundColor: '#2F6779'}
                ]}
                onPress={() => {
                  setSelectedDate(thisDate);
                  fetchMedicationsForDate(thisDate);
                }}
              >
                <Text style={styles.dayDate}>
                  {thisDate.getDate()}
                </Text>
                <Text style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'Today' && styles.activeTab]}
          onPress={() => setSelectedTab('Today')}
        >
          <Text style={[styles.tabText, selectedTab === 'Today' && styles.activeTabText]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'Week' && styles.activeTab]}
          onPress={() => setSelectedTab('Week')}
        >
          <Text style={[styles.tabText, selectedTab === 'Week' && styles.activeTabText]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'Month' && styles.activeTab]}
          onPress={() => setSelectedTab('Month')}
        >
          <Text style={[styles.tabText, selectedTab === 'Month' && styles.activeTabText]}>
            Month
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.medicationsList}>
        {loading ? (
          <ActivityIndicator size="large" color="#064D65" style={styles.loader} />
        ) : (
          <>
            {selectedTab === 'Today' && (
              <>
                {medications.length > 0 ? (
                  medications.map((med, index) => (
                    <MedicationCard key={`${med._id}-${med.times_a_day}-${index}`} medication={med} />
                  ))                
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.noMedicationsText}>
                      No medications scheduled for today
                    </Text>
                  </View>
                )}
              </>
            )}
            
            {selectedTab === 'Week' && (
              <>
                {Object.entries(weeklyMedications).length > 0 ? (
                  Object.entries(weeklyMedications).map(([day, meds]) => (
                    <View key={day} style={styles.weeklyMedicationContainer}>
                      <Text style={styles.weekDay}>{day}</Text>
                      {meds.length > 0 ? (
                        meds.map((med, index) => (
                          <MedicationCard key={`${med._id}-${med.times_a_day}-${index}`} medication={med} />
                        ))                       
                      ) : (
                        <Text>No medications scheduled</Text>
                      )}
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.noMedicationsText}>
                      No medications scheduled for this week
                    </Text>
                  </View>
                )}
              </>
            )}
            
            {selectedTab === 'Month' && (
              <>
                <MonthlyCalendar />
                {selectedCalendarDate && (
                  <View style={styles.calendarMedicationsList}>
                    <Text style={styles.selectedDateText}>
                      Medications for {selectedCalendarDate.toLocaleDateString()}
                    </Text>
                    {calendarMedications.length > 0 ? (
                      calendarMedications.map((med, index) => (
                        <MedicationCard key={`${med._id}-${med.times_a_day}-${index}`} medication={med} />
                      ))                     
                    ) : (
                      <Text style={styles.noMedicationsText}>
                        No medications scheduled for this date
                      </Text>
                    )}
                  </View>
                )}
              </>
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
  monthlyCalendar: {
    padding: 10,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  monthArrow: {
    fontSize: 24,
    padding: 10,
  },
  weekDayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  calendarDayWithMeds: {
    backgroundColor: '#E3F2FD',
  },
  calendarDayText: {
    fontSize: 16,
  },
  medicationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#064D65',
    marginTop: 2,
  },
  weeklyMedicationContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 15,
  },
  weekDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#064D65',
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
    paddingHorizontal: 6,
    marginVertical: 10,
    marginBottom: -550,
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
    borderBottomColor: '#064D65',
  },
  tabText: {
    color: '#666666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#064D65',
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
    backgroundColor: '#064D65',
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
