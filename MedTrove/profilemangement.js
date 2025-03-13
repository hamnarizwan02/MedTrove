

//WITHOUT ICONS
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Alert, TouchableOpacity, Image, Modal, FlatList, StyleSheet, SafeAreaView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import CONFIG from './config';

// export default function ProfileManagement({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [isPasswordVisible, setPasswordVisible] = useState(false);

//   const images = [
//     { id: 0, source: require('./pfp/acc1.png') },
//     { id: 1, source: require('./pfp/wmn.png') },
//   ];

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await axios.get(`${CONFIG.backendUrl}/api/user/current`);
//         setCurrentUserId(response.data.userID);

//         const userResponse = await axios.get(`${CONFIG.backendUrl}/api/${response.data.userID}`);
//         const userData = userResponse.data;

//         setEmail(userData.emailaddress);
//         setPassword(userData.password);
//         setPhoneNumber(userData.phonenumber);
        
//         if (userData.avatar !== undefined) {
//           setProfilePicture(images[userData.avatar].source);
//         }
//       } catch (error) {
//         console.error('Error fetching current user:', error);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   const handleChoosePhoto = () => {
//     setModalVisible(true);
//   };

//   const selectPhoto = async (imageObj) => {
//     try {
//       await axios.put(`${CONFIG.backendUrl}/api/avatar`, {
//         userId: currentUserId,
//         avatarId: imageObj.id
//       });

//       setProfilePicture(imageObj.source);
//       setModalVisible(false);

//       Alert.alert('Success', 'Profile picture updated successfully');
//     } catch (error) {
//       console.error('Error updating avatar:', error);
//       Alert.alert('Error', 'Failed to update profile picture');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(`${CONFIG.backendUrl}/user/logout`);
//       Alert.alert('Logout Successful', 'You have been logged out.');
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Logout error:', error);
//       Alert.alert('Logout Failed', 'Unable to log out. Please try again.');
//     }
//   };

//   const handleNavigateToCart = () => {
//     navigation.navigate('Cart');
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       await axios.put(`${CONFIG.backendUrl}/api/update`, {
//         userId: currentUserId,
//         email,
//         password,
//         phoneNumber
//       });

//       Alert.alert('Profile Updated', 'Your profile details have been updated successfully');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Update Failed', 'Unable to update profile. Please try again.');
//     }
//   };
  
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>Profile</Text>
//         <TouchableOpacity onPress={handleNavigateToCart} style={styles.cartIconContainer}>
//           <Ionicons name="cart-outline" size={24} color="#064D65" />
//         </TouchableOpacity>
//       </View>

//       {/* Profile Picture */}
//       <View style={styles.profileSection}>
//         <TouchableOpacity onPress={handleChoosePhoto} style={styles.profilePicContainer}>
//           <Image
//             source={profilePicture || require('./assets/default-profile.png')}
//             style={styles.profilePic}
//           />
//           <View style={styles.editIconContainer}>
//             <Ionicons name="camera" size={16} color="white" />
//           </View>
//         </TouchableOpacity>
//         <Text style={styles.profileName}>My Profile</Text>
//       </View>

//       {/* Modal for Selecting an Image */}
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Select a Photo</Text>
//           <FlatList
//             data={images}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity onPress={() => selectPhoto(item)} style={styles.modalImageContainer}>
//                 <Image source={item.source} style={styles.modalImage} />
//               </TouchableOpacity>
//             )}
//             numColumns={3}
//             contentContainerStyle={styles.modalImageGrid}
//           />
//           <TouchableOpacity 
//             style={styles.modalCloseButton} 
//             onPress={() => setModalVisible(false)}
//           >
//             <Text style={styles.modalCloseButtonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {/* Input Fields */}
//       <View style={styles.inputContainer}>
//         <View style={styles.inputWrapper}>
//           <Ionicons name="mail-outline" size={20} color="#064D65" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             placeholderTextColor="#888"
//           />
//         </View>

//         <View style={styles.inputWrapper}>
//           <Ionicons name="lock-closed-outline" size={20} color="#064D65" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!isPasswordVisible}
//             placeholderTextColor="#888"
//           />
//           <TouchableOpacity 
//             style={styles.passwordVisibilityIcon}
//             onPress={() => setPasswordVisible(!isPasswordVisible)}
//           >
//             <Ionicons 
//               name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
//               size={20} 
//               color="#064D65" 
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.inputWrapper}>
//           <Ionicons name="call-outline" size={20} color="#064D65" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Phone Number"
//             value={phoneNumber ? phoneNumber.toString() : ''}
//             onChangeText={(text) => setPhoneNumber(text)}
//             keyboardType="phone-pad"
//             placeholderTextColor="#888"
//           />
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionButtonContainer}>
//         <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
//           <Text style={styles.updateButtonText}>UPDATE PROFILE</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>LOGOUT</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#064D65',
//   },
//   cartIconContainer: {
//     padding: 10,
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   profilePicContainer: {
//     position: 'relative',
//   },
//   profilePic: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     borderWidth: 3,
//     borderColor: '#064D65',
//   },
//   editIconContainer: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#064D65',
//     borderRadius: 20,
//     padding: 6,
//   },
//   profileName: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   inputContainer: {
//     paddingHorizontal: 20,
//     marginTop: 20,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   inputIcon: {
//     marginLeft: 15,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     color: '#333',
//   },
//   passwordVisibilityIcon: {
//     marginRight: 15,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 20,
//     color: '#064D65',
//   },
//   modalImageGrid: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalImageContainer: {
//     margin: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   modalImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   modalCloseButton: {
//     marginTop: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     backgroundColor: '#064D65',
//     borderRadius: 10,
//   },
//   modalCloseButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   actionButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginTop: 30,
//   },
//   updateButton: {
//     flex: 1,
//     backgroundColor: '#064D65',
//     paddingVertical: 15,
//     borderRadius: 10,
//     marginRight: 10,
//     alignItems: 'center',
//   },
//   updateButtonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   logoutButton: {
//     flex: 1,
//     backgroundColor: '#FF4D4D',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   logoutButtonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, Modal, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import CONFIG from './config';

export default function ProfileManagement({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const images = [
    { id: 0, source: require('./pfp/acc1.png') },
    { id: 1, source: require('./pfp/wmn.png') },
  ];

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const response = await axios.get(`${CONFIG.backendUrl}/api/user/current`);
  //       setCurrentUserId(response.data.userID);

  //       const userResponse = await axios.get(`${CONFIG.backendUrl}/api/${response.data.userID}`);
  //       const userData = userResponse.data;

  //       setEmail(userData.emailaddress);
  //       setPassword(userData.password);
  //       setPhoneNumber(userData.phonenumber);
        
  //       if (userData.avatar !== undefined) {
  //         setProfilePicture(images[userData.avatar].source);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching current user:', error);
  //     }
  //   };

  //   fetchCurrentUser();
  // }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${CONFIG.backendUrl}/api/user/current`);
        const userData = response.data;

        if (userData.success) {
          setCurrentUserId(userData.userID);
          setEmail(userData.emailaddress);
          setPassword(userData.password);
          setPhoneNumber(userData.phonenumber);
          
          if (userData.avatar !== undefined) {
            setProfilePicture(images[userData.avatar].source);
          }
        } else {
          console.error('Failed to fetch user data:', userData.message);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        if (error.response) {
          console.error('Server response:', error.response.data);
        }
      }
    };

    fetchCurrentUser();
  }, []);
  
  const handleChoosePhoto = () => {
    setModalVisible(true);
  };

  const selectPhoto = async (imageObj) => {
    try {
      await axios.put(`${CONFIG.backendUrl}/api/avatar`, {
        userId: currentUserId,
        avatarId: imageObj.id
      });

      setProfilePicture(imageObj.source);
      setModalVisible(false);

      Alert.alert('Success', 'Profile picture updated successfully');
    } catch (error) {
      console.error('Error updating avatar:', error);
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${CONFIG.backendUrl}/user/logout`);
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


  const handleNavigateToReminder = () => {
 
    navigation.navigate('MedicationListScreen');
  };


  



  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${CONFIG.backendUrl}/api/update`, {
        userId: currentUserId,
        email,
        password,
        phoneNumber
      });

      Alert.alert('Profile Updated', 'Your profile details have been updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Update Failed', 'Unable to update profile. Please try again.');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
         {/* Icons Container */}
        <View style={styles.iconGroup}>
          {/* Reminders Icon */}
          <TouchableOpacity onPress={handleNavigateToReminder} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#064D65" />
          </TouchableOpacity>

          {/* Order History Icon */}
          {/* <TouchableOpacity onPress={() => Alert.alert('Order History')} style={styles.iconButton}>
            <Ionicons name="document-text-outline" size={24} color="#064D65" />
          </TouchableOpacity> */}

          {/* Cart Icon */}
          <TouchableOpacity onPress={handleNavigateToCart} style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="#064D65" />
          </TouchableOpacity>
        </View>
      </View>


      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.profilePicContainer}>
          <Image
            source={profilePicture || require('./assets/default-profile.png')}
            style={styles.profilePic}
          />
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={16} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.profileName}>My Profile</Text>
      </View>

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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectPhoto(item)} style={styles.modalImageContainer}>
                <Image source={item.source} style={styles.modalImage} />
              </TouchableOpacity>
            )}
            numColumns={3}
            contentContainerStyle={styles.modalImageGrid}
          />
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#064D65" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#064D65" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#888"
          />
          <TouchableOpacity 
            style={styles.passwordVisibilityIcon}
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons 
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#064D65" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={20} color="#064D65" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber ? phoneNumber.toString() : ''}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
            placeholderTextColor="#888"
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>UPDATE PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: "10%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#064D65',
  },
  cartIconContainer: {
    padding: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
    top:30
  },
  profilePicContainer: {
    position: 'relative',
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#064D65',
  },
  iconGroup: {
    flexDirection: 'row', // Align icons horizontally
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#064D65',
    borderRadius: 20,
    padding: 6,
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    top:20
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginLeft: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 12,

    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  passwordVisibilityIcon: {
    marginRight: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#064D65',
  },
  modalImageGrid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#064D65',
    borderRadius: 10,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#064D65',
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: '#FF4D4D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});