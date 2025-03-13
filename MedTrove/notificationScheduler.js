import * as Notifications from 'expo-notifications';

// Request notification permissions
export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    throw new Error('Permission to receive notifications was denied');
  }
  
  return finalStatus;
};

// Cancel notifications by IDs
export const cancelNotifications = async (notificationIds) => {
  if (!notificationIds || !notificationIds.length) return;
  
  for (const id of notificationIds) {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
    } catch (error) {
      console.error(`Failed to cancel notification ${id}:`, error);
    }
  }
};

// Get all scheduled notifications
export const getAllScheduledNotifications = async () => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
};

// Schedule notifications for a medication
export const scheduleNotifications = async (medicationData) => {
  try {
    // Request permissions
    await requestNotificationPermissions();
    
    const { name, dosage, selectedDays, times } = medicationData;
    
    const selectedDaysArray = Object.entries(selectedDays)
      .filter(([day, selected]) => selected)
      .map(([day]) => day);
    
    if (selectedDaysArray.length === 0) {
      throw new Error('Please select at least one day of the week');
    }
    
    const scheduledNotifications = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Schedule notifications for each time and selected day
    for (const time of times) {
      for (const day of selectedDaysArray) {
        const dayIndex = daysOfWeek.indexOf(day);
        
        // Create trigger for specific day and time
        const trigger = {
          hour: time.hour,
          minute: time.minute,
          repeats: true,
          weekday: dayIndex + 1, // Expo uses 1-7 for days of week (Sunday is 1)
        };
        
        // Schedule the notification
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: `Time to take ${name}`,
            body: `Take ${dosage.amount} ${dosage.unit} ${dosage.notes ? '(' + dosage.notes + ')' : ''}`,
            data: { 
              medicationName: name,
              dosageAmount: dosage.amount,
              dosageUnit: dosage.unit,
              dosageNotes: dosage.notes 
            },
          },
          trigger,
        });
        
        scheduledNotifications.push({
          id,
          day,
          time: { hour: time.hour, minute: time.minute }
        });
      }
    }
    
    return scheduledNotifications;
  } catch (error) {
    console.error('Error scheduling notifications:', error);
    throw error;
  }
};

