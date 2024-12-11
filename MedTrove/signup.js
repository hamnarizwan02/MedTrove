// import React from 'react'; 
// import { StyleSheet, Text, TextInput, Alert, TouchableOpacity, View, ImageBackground } from 'react-native';
// import axios from 'axios'; 
// import CONFIG from './config.js'; 

// export default class SignUp extends React.Component {
//   state = {
//     email: "",
//     password: "",
//     phone: ""
//   }

//   checkTextInput = () => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?&]{8,}$/;
//     const phonePattern = /^\d{10}$/; // Updated pattern for phone number

//     if (this.state.email !== '') {
//         if (emailPattern.test(this.state.email)) {
//             if (this.state.password !== '') {
//                 if (passwordPattern.test(this.state.password)) {
//                     // Check phone number after other validations
//                     if (this.state.phone !== '') {
//                         if (phonePattern.test(this.state.phone)) {
//                             this.signUpUser(); // Call the signUpUser function
//                         } else {
//                             Alert.alert('Invalid Phone Number', 'Please enter a valid phone number in the format XXXXXXXXXX');
//                         }
//                     } else {
//                         // Phone number optional, handle as needed (e.g., no alert)
//                     }
//                 } else {
//                     Alert.alert(
//                         'Invalid Password',
//                         'Password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, and one number'   
//                     );
//                 }
//             } else {
//                 Alert.alert('Please enter password');
//             }
//         } else {
//             Alert.alert('Please enter a valid email address');
//         }
//     } else {
//         Alert.alert('Please enter email address');
//     }
// }
//   // Function to sign up the user
//   signUpUser = () => {
//     axios.post(`${CONFIG.backendUrl}/api/signup`, {
//       email: this.state.email,
//       password: this.state.password,
//       phone: this.state.phone,
//     })
//     .then(response => {
//       Alert.alert(response.data.message);
//       this.setState({ email: '', password: '', phone: '' }); // Clear inputs
//     })
//     .catch(error => {
//       Alert.alert('Error', error.response.data.message || 'Something went wrong');
//     });
//   }

//   render() {
//     return (
//       <ImageBackground source={require('./assets/login.png')} style={styles.backgroundImage}>
//         <View style={styles.container}>
//           <Text style={styles.logo}>Sign Up</Text>
//           <Text style={styles.welcome}>Welcome to MedTrove!</Text>

//           <View style={styles.inputView}>
//             <TextInput 
//               style={styles.inputText} 
//               placeholder="Please enter your email address"
//               placeholderTextColor="grey" 
//               onChangeText={text => this.setState({ email: text })} 
//             />
//           </View>

//           <View style={styles.inputViews}>
//             <TextInput 
//               secureTextEntry 
//               style={styles.inputText}
//               placeholder="Please enter your password" 
//               onChangeText={text => this.setState({ password: text })}
//               placeholderTextColor="grey" 
//             />
//           </View>

//           <View style={styles.inputViews}>
//             <TextInput 
//               style={styles.inputText} 
//               placeholder="Please enter your phone number" 
//               onChangeText={text => this.setState({ phone: text })}
//               placeholderTextColor="grey" 
//             />
//           </View>

//           <TouchableOpacity>
//             <Text style={styles.forgotLabel}>Forgot Password?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.signUpBtn} onPress={this.checkTextInput}>
//             <Text style={styles.signUpText}>Sign Up</Text>
//           </TouchableOpacity>

//           <Text style={styles.or}>or</Text>

//           <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
//             <Text style={styles.loginLabel}>Login</Text>
//           </TouchableOpacity>

          
           
//             <View style={styles.disclaimer}>
//             <Text style={styles.disctext}>By signing up you agree that MedTrove is not a replacement for medical professionals. </Text>
//             </View>
         
//         </View>
//       </ImageBackground>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//  disclaimer:{
//     height:"10%",
//     width:"90%",

//  }
//  ,
//  disctext:{
//   color: "black",
//   marginLeft: 10,
//   marginTop: 10,
//   marginBottom: 10,
//  }
//   ,
//   logo: {
//     fontWeight: "bold",
//     fontSize: 60,
//     color: "black",
//     margin: 40,
//     alignSelf: 'flex-start', 
//     marginLeft: 5,
//     marginTop: 190
//   },
//   welcome: {
//     alignSelf: 'flex-start',
//     marginLeft: -40,
//     marginTop: -35,
//     margin: 40,
//     marginLeft: 10,
//     marginBottom: 2
//   },
//   inputView: {
//     width: 350,
//     backgroundColor: "#f8f8f8",
//     height: 50,
//     borderRadius: 15,
//     marginBottom: 20,
//     marginTop: 80,
//     justifyContent: "center",
//     padding: 20
//   },
//   inputViews: {
//     width: 350,
//     backgroundColor: "#f8f8f8",
//     height: 50,
//     borderRadius: 15,
//     marginBottom: 20,
//     justifyContent: "center",
//     padding: 20
//   },
//   inputText: {
//     height: 50,
//     color: "black", // Change to black for better visibility
//   },
//   forgotLabel: {
//     color: "blue",
//     fontSize: 15
//   },
//   signUpBtn: {
//     width: 250,
//     backgroundColor: "#074d66",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//     marginBottom: 10
//   },
//   or: {
//     marginTop: 10
//   },
//   loginLabel: {
//     color: "blue",
//     fontSize: 15,
//     marginTop: 15
//   },
//   signUpText: {
//     color: "white",
//     fontSize: 15
//   }
// });


import React from 'react'; 
import { StyleSheet, Text, TextInput, Alert, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; 
import CONFIG from './config.js'; 

export default class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    phone: "",
    isPasswordVisible: false
  }

  checkTextInput = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%?&]{8,}$/;
    const phonePattern = /^\d{10}$/; // Updated pattern for phone number

    if (this.state.email !== '') {
        if (emailPattern.test(this.state.email)) {
            if (this.state.password !== '') {
                if (passwordPattern.test(this.state.password)) {
                    // Check phone number after other validations
                    if (this.state.phone !== '') {
                        if (phonePattern.test(this.state.phone)) {
                            this.signUpUser(); // Call the signUpUser function
                        } else {
                            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number in the format XXXXXXXXXX');
                        }
                    } else {
                        // Phone number optional, handle as needed (e.g., no alert)
                    }
                } else {
                    Alert.alert(
                        'Invalid Password',
                        'Password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, and one number'   
                    );
                }
            } else {
                Alert.alert('Please enter password');
            }
        } else {
            Alert.alert('Please enter a valid email address');
        }
    } else {
        Alert.alert('Please enter email address');
    }
}
  // Function to sign up the user
  signUpUser = () => {
    axios.post(`${CONFIG.backendUrl}/api/signup`, {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
    })
    .then(response => {
      Alert.alert(response.data.message);
      //this.setState({ email: '', password: '', phone: '' }); // Clear inputs
      this.props.navigation.navigate('Search');
    })
    .catch(error => {
      Alert.alert('Error', error.response.data.message || 'Something went wrong');
    });
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible
    }));
  }

  render() {
    return (
      <ImageBackground source={require('./assets/login.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.logo}>Sign Up</Text>
          <Text style={styles.welcome}>Welcome to MedTrove!</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#064D65" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Enter your email address"
                placeholderTextColor="#888" 
                onChangeText={text => this.setState({ email: text })} 
                value={this.state.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#064D65" style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Enter your password" 
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry={!this.state.isPasswordVisible}
                placeholderTextColor="#888" 
              />
              <TouchableOpacity 
                style={styles.passwordVisibilityIcon}
                onPress={this.togglePasswordVisibility}
              >
                <Ionicons 
                  name={this.state.isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#064D65" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#064D65" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Enter your phone number" 
                onChangeText={text => this.setState({ phone: text })}
                value={this.state.phone}
                placeholderTextColor="#888"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotLabel}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpBtn} onPress={this.checkTextInput}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.loginLabel}>Login</Text>
          </TouchableOpacity>
           
          <View style={styles.disclaimer}>
            <Text style={styles.disctext}>By signing up you agree that MedTrove is not a replacement for medical professionals. </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    height: "10%",
    width: "90%",
  },
  disctext: {
    color: "black",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 60,
    color: "black",
    margin: 40,
    alignSelf: 'flex-start', 
    marginLeft: 5,
    marginTop: 250
  },
  welcome: {
    alignSelf: 'flex-start',
    marginLeft: -40,
    marginTop: -35,
    margin: 40,
    marginLeft: 10,
    marginBottom: 2
  },
  inputContainer: {
    width: '90%',
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    marginTop: 2,
    width: '90%'
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
  forgotLabel: {
    color: "blue",
    fontSize: 15,
    marginTop: 10,
  },
  signUpBtn: {
    width: 250,
    backgroundColor: "#074d66",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  or: {
    marginTop: 10
  },
  loginLabel: {
    color: "blue",
    fontSize: 15,
    marginTop: 15,
    marginBottom: 10
  },
  signUpText: {
    color: "white",
    fontSize: 15
  }
});