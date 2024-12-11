import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, Modal,FlatList,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import CONFIG from './config';

export default function ProfileManagement({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const images = [
    require('./pfp/acc1.png'),
    require('./pfp/acc2.png'),
    require('./pfp/wmn.png'),
  ];


   const handleChoosePhoto = () => {
    setModalVisible(true);
  };

  const selectPhoto = (photo) => {
    setProfilePicture(photo);
    setModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      console.log('Logout URL:', `${CONFIG.backendUrl}/user/logout`);
      const response = await axios.post(`${CONFIG.backendUrl}/user/logout`);
      console.log('Logout response:', response.data);

      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Unable to log out. Please try again.');
    }
  };

  const handleNavigateToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Profile Management</Text>
        <TouchableOpacity onPress={handleNavigateToCart} style={styles.cartIconContainer}>
          <Ionicons name="cart-outline" size={28} color="#064D65" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
        {/* Profile Picture */}
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.profilePicContainer}>
        <Image
          source={profilePicture || require('./assets/default-profile.png')}
          style={styles.profilePic}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Change Profile Picture</Text>

      {/* Modal for Selecting an Image */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a Photo</Text>
          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectPhoto(item)}>
                <Image source={item} style={styles.modalImage} />
              </TouchableOpacity>
            )}
            numColumns={3}
          />
        </View>
      </Modal>
    

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      {/* Update and Logout Buttons */}
      <TouchableOpacity style={styles.updateButton} onPress={() => Alert.alert('Profile Updated!', 'Your profile details have been updated.')}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cartIconContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064D65',
  },
  profilePicContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#eaeaea',
  },
  label: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  updateButton: {
    backgroundColor: '#064D65',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
