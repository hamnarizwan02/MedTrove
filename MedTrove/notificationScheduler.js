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
// export const getAllScheduledNotifications = async () => {
//   try {
//     return await Notifications.getAllScheduledNotificationsAsync();
//   } catch (error) {
//     console.error('Error getting scheduled notifications:', error);
//     return [];
//   }
// };

// Modified scheduleAllNotifications function
// Completely revised notification scheduling function
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
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // First, schedule immediate notifications for each future time today
    for (const time of notificationTimes) {
      const todaysDayName = daysOfWeek[currentDay];
      const isTodaySelected = selectedDays[todaysDayName];
      
      if (isTodaySelected) {
        // Check if this time is in the future today
        const notificationTime = new Date();
        notificationTime.setHours(time.hour, time.minute, 0, 0);
        
        // Only schedule if it's at least 2 minutes in the future
        const timeUntilNotification = notificationTime.getTime() - currentDate.getTime();
        const twoMinutesInMs = 2 * 60 * 1000;
        
        if (timeUntilNotification > twoMinutesInMs) {
          // Schedule single notification for today with specific date
          const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
              title: `Time to take ${name}`,
              body: `Take ${dosage.amount} ${dosage.unit} ${dosage.notes ? '(' + dosage.notes + ')' : ''}`,
              data: { medicationId: medicationData.id },
            },
            trigger: {
              date: notificationTime,
            },
          });
          
          notificationIds.push(notificationId);
          console.log(`Scheduled today's notification for ${time.hour}:${time.minute}`);
        } else {
          console.log(`Skipped today's notification for ${time.hour}:${time.minute} - too soon`);
        }
      }
    }
    
    // Now schedule future recurring notifications starting from tomorrow
    for (const time of notificationTimes) {
      for (const day of selectedDaysArray) {
        const dayIndex = daysOfWeek.indexOf(day);
        
        // Skip scheduling recurring notification for today since we handled that above
        if (dayIndex === currentDay) {
          continue;
        }
        
        // Calculate the date for the next occurrence of this day
        const daysUntilNext = (dayIndex - currentDay + 7) % 7;
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysUntilNext);
        nextDate.setHours(time.hour, time.minute, 0, 0);
        
        // If the calculated next date is today but in the past, add 7 days
        if (daysUntilNext === 0 && nextDate <= currentDate) {
          nextDate.setDate(nextDate.getDate() + 7);
        }
        
        // Schedule with exact date for the first occurrence, then weekly repeats
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: `Time to take ${name}`,
            body: `Take ${dosage.amount} ${dosage.unit} ${dosage.notes ? '(' + dosage.notes + ')' : ''}`,
            data: { medicationId: medicationData.id },
          },
          trigger: {
            // For the first occurrence, use the specific date
            date: nextDate,
            // Then repeat weekly
            repeats: true,
            intervalMs: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
          },
        });
        
        notificationIds.push(notificationId);
        console.log(`Scheduled recurring notification for ${day} at ${time.hour}:${time.minute}`);
      }
    }
    
    return notificationIds;
  } catch (error) {
    console.error('Error scheduling notifications:', error);
    throw error;
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
