import * as Notifications from 'expo-notifications';

const scheduleNotifications = async (medicationData) => {
  const { name, dosage, frequency, selectedDays, startDate, endDate } = medicationData;
  
  // Get array of selected days
  const activeDays = Object.entries(selectedDays)
    .filter(([_, isSelected]) => isSelected)
    .map(([day]) => day);

  if (activeDays.length === 0) {
    throw new Error('No days selected for medication schedule');
  }

  // Map day strings to day numbers (0 = Sunday, 1 = Monday, etc.)
  const dayMapping = {
    'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
  };

  // Calculate time intervals based on frequency
  const TIME_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const notificationsPerDay = parseInt(frequency);
  
  // Schedule notifications for each day until end date
  const currentDate = new Date(startDate);
  const notifications = [];

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const dayName = Object.keys(dayMapping).find(key => dayMapping[key] === dayOfWeek);
    
    // Check if this is a selected day
    if (selectedDays[dayName]) {
      // Schedule 'frequency' number of notifications for this day
      for (let i = 0; i < notificationsPerDay; i++) {
        const notificationTime = new Date(currentDate);
        notificationTime.setHours(9 + (i * 4)); // Start at 9 AM, then every 4 hours
        notificationTime.setMinutes(0);
        notificationTime.setSeconds(0);

        // Only schedule if the time hasn't passed yet
        if (notificationTime > new Date()) {
          try {
            const notificationId = await Notifications.scheduleNotificationAsync({
              content: {
                title: `Time to take ${name}`,
                body: `Take ${dosage.amount} ${dosage.unit}${dosage.notes ? ` ${dosage.notes}` : ''}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
              },
              trigger: {
                date: notificationTime,
              },
            });
            
            notifications.push({
              id: notificationId,
              time: notificationTime,
              day: dayName,
            });
          } catch (error) {
            console.error('Error scheduling notification:', error);
          }
        }
      }
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return notifications;
};

// Function to cancel all scheduled notifications
const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

// Function to request notification permissions
const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    throw new Error('Permission to send notifications was denied');
  }
  
  return finalStatus;
};

export { scheduleNotifications, cancelAllNotifications, requestNotificationPermissions };