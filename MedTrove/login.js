import React from 'react';
import { StyleSheet, Text, TextInput, Alert, TouchableOpacity, View, ImageBackground } from 'react-native';
import CONFIG from './config.js'; 

export default class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  checkTextInput = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (this.state.email !== '') {
      if (emailPattern.test(this.state.email)) {
        if (this.state.password !== '') {
          // Make a fetch request to the server for login
          this.loginUser();
        } else {
          Alert.alert('Please enter password');
        }
      } else {
        Alert.alert('Please enter a valid email address');
      }
    } else {
      Alert.alert('Please enter email address');
    }
  };

  loginUser = async () => {
    const { email, password } = this.state;
    
    try {
      const response = await fetch(`${CONFIG.backendUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      //console.log('Response Data:', data);

      if (response.ok) {
        Alert.alert('Login Successful', 'Welcome back!');
        // Navigate to the search page on successful login
        this.props.navigation.navigate('Search');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  render() {
    return (
      <ImageBackground source={require('./assets/login.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.logo}>Login</Text>
          <Text style={styles.welcomeback}>Good to see you back!</Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Please enter your email address"
              placeholderTextColor="grey"
              onChangeText={text => this.setState({ email: text })}
            />
          </View>

          <View style={styles.inputViews}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Please enter your password"
              onChangeText={text => this.setState({ password: text })}
              placeholderTextColor="grey"
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotLabel}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={this.checkTextInput} >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.registrationLabel}>Sign Up</Text>
          </TouchableOpacity>
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
  logo: {
    fontWeight: "bold",
    fontSize: 60,
    color: "black",
    margin: 40,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 130
  },
  welcomeback: {
    alignSelf: 'flex-start',
    marginLeft: -40,
    marginTop: -35,
    margin: 40,
    marginLeft: 10,
    marginBottom: 20
  },
  inputView: {
    width: 350,
    backgroundColor: "#f8f8f8",
    height: 50,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 80,
    justifyContent: "center",
    padding: 20
  },
  inputViews: {
    width: 350,
    backgroundColor: "#f8f8f8",
    height: 50,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgotLabel: {
    color: "blue",
    fontSize: 15
  },
  loginBtn: {
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
  registrationLabel: {
    color: "blue",
    fontSize: 15,
    marginTop: 20
  },
  loginText: {
    color: "white",
    fontSize: 15
  }
});