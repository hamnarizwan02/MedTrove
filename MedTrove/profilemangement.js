//WITH CART BUTTON 
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import CONFIG from './config';

export default function ProfileManagement({ navigation })  {
  // State variables for email, password, phone number, and profile picture
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleChoosePhoto = () => {
    alert("Profile Picture Clicked! (Add picker functionality later)");
  };

  const handleLogout = async () => {
    try {
      console.log('Logout URL:', `${CONFIG.backendUrl}/user/logout`);
      const response = await axios.post(`${CONFIG.backendUrl}/user/logout`);
      
      console.log('Logout response:', response.data);
      
      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Full logout error:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      console.error('Error message:', error.message);
      
      Alert.alert('Logout Failed', 'Unable to log out. Please try again.');
    }
  };

  const handleNavigateToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Profile Management</Text>
        <TouchableOpacity onPress={handleNavigateToCart} style={styles.cartIconContainer}>
          <Ionicons name="cart-outline" size={24} color="#064D65" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <TouchableOpacity onPress={handleChoosePhoto}>
        <Image
          source={profilePicture ? { uri: profilePicture } : require('./assets/default-profile.jpeg')}
          style={styles.profilePic}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Change Profile Picture</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <View style={styles.updatecontainer}>
      {/* Update Button */}
      <Button title="Update Profile" onPress={() => alert('Profile Updated!')} />
      </View>

      <View style={styles.logoutcontainer}>
        <TouchableOpacity>
          <Button  
            title="Logout" 
            onPress={handleLogout} 
            color="red" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -250
  },
  cartIconContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  logoutcontainer: {
    marginTop: 10
  },
  updatecontainer: {
    marginTop: 10,
    marginBottom: 10
  },
});
