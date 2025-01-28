import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEMS_PER_ROW = 4;
const HORIZONTAL_PADDING = 12;
const ITEM_SPACING = 10;
const USABLE_WIDTH = width - (HORIZONTAL_PADDING * 3.8);
const ITEM_WIDTH = (USABLE_WIDTH - (ITEM_SPACING * (ITEMS_PER_ROW - 1))) / ITEMS_PER_ROW;

const ServicesCircleMenu = ({ navigation }) => {
  const services = [
    {
      id: '1',
      category: 'MEDIBOT',
      icon: require('../assets/icons8-chatbot-72.png'),
      type: 'image'
    },
    {
      id: '2', 
      category: 'DDI',
      icon: require('../assets/icons8-drugs-72.png'),
      type: 'image'
    },
    {
      id: '3',
      category: 'REMINDERS', 
      icon: 'notifications-outline',
      type: 'icon'
    },
    {
      id: '4',
      category: 'DONATION', 
      icon: require('../assets/icons8-donation-72.png'),
      type: 'image'
    },
    {
        id: '5',
        category: 'PHARMACY LOCATOR', 
        icon: require('../assets/icons8-pharmacy-location-72.png'),
        type: 'image'
    }
  ];

  const handleCategoryPress = (service) => {
    switch(service.category.toUpperCase()) {
      case 'MEDIBOT':
        console.log('Medibot pressed');
        break;
      case 'DDI':
        navigation.navigate('DrugInteractionScreen');
        break;
      case 'REMINDERS':
        // Navigate to Reminders
        break;
      case 'DONATION':
        break;  
    }
  };

  const renderGrid = () => {
    const allItems = services.map(service => ({
      key: service.id,
      content: (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => handleCategoryPress(service)}
          activeOpacity={0.7}
        >
          <View style={[styles.circle, styles.elevation]}>
          {service.category === 'MEDIBOT' ? (
            <Image 
                source={service.icon} 
                style={{ width: 45, height: 45 }}  // Larger size only for Medibot
                resizeMode="contain"
            />
            ) : service.type === 'icon' ? (
            <Ionicons 
                name={service.icon} 
                size={40}  
                color= "#064D65"
            />
            ) : (
            <Image 
                source={service.icon} 
                style={{ width: 40, height: 40 }}  // Standard size for other images
                resizeMode="contain"
            />
            )}
          </View>
          <Text style={styles.categoryText} numberOfLines={2}>
            {service.category}
          </Text>
        </TouchableOpacity>
      )
    }));

    const rows = [];
    for (let i = 0; i < allItems.length; i += ITEMS_PER_ROW) {
      const rowItems = allItems.slice(i, i + ITEMS_PER_ROW);
      const isLastRow = i + ITEMS_PER_ROW >= allItems.length;
      rows.push(
        <View 
          key={`row-${i}`} 
          style={[
            styles.row, 
            isLastRow && styles.lastRow
          ]}
        >
          {rowItems.map(item => (
            <View key={item.key} style={styles.itemContainer}>
              {item.content}
            </View>
          ))}
        </View>
      );
    }
    
    return rows;
  };

  return (
    <View style={styles.container}>
      {renderGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fbfd',
    paddingVertical: 8,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  lastRow: {
    marginBottom: -14,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    marginRight: 5
  },
  categoryItem: {
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    borderTopColor: 'rgba(255,255,255,0.8)',
    borderLeftColor: 'rgba(255,255,255,0.8)',
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '500',
    height: 32,
    marginTop: 2,
  },
});

export default ServicesCircleMenu;