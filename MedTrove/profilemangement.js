import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ProfileManagement() {
  // State variables for email, password, phone number, and profile picture
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  // This function handles the mock profile picture change (just a placeholder for now)
  const handleChoosePhoto = () => {
    alert("Profile Picture Clicked! (Add picker functionality later)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Management</Text>

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

      {/* Update Button */}
      <Button title="Update Profile" onPress={() => alert('Profile Updated!')} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  label: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
});
