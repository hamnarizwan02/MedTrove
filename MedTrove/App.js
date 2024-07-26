import React from 'react';
import { StyleSheet, Text, TextInput, Alert, TouchableOpacity, View, ImageBackground } from 'react-native';

export default class App extends React.Component {

  state = {
    email: "",
    password: ""
  }

  checkTextInput = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (this.state.email != '') {
      if (emailPattern.test(this.state.email)) {
        if (this.state.password != '') {
          if (passwordPattern.test(this.state.password)) {
            Alert.alert('SUCCESS');
          } else {
            Alert.alert(
              'Invalid Password',
              'Password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, one number, and one special character'
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

  render() {
    return (
      <ImageBackground source={require('./assets/login.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.logo}>Login</Text>
          <Text style = {styles.welcomeback}>Good to see you back! </Text>

          <View style={styles.inputView}>
            <TextInput style={styles.inputText} placeholder="Please enter your email address"
              placeholderTextColor="grey" onChangeText={text => this.setState({ email: text })} />
          </View>

          <View style={styles.inputViews}>
            <TextInput secureTextEntry style={styles.inputText}
              placeholder="Please enter your password" onChangeText={text => this.setState({ password: text })}
              placeholderTextColor="grey" />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotLabel}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity  style = {styles.loginBtn} onPress = {this.checkTextInput}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>

          <TouchableOpacity>
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
  welcomeback : {
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
    color: "white",
  },
  forgotLabel: {
    color: "blue",
    fontSize: 12
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
  or:{
    marginTop: 10
  },
  registrationLabel: {
    color: "blue",
    fontSize: 10,
    marginTop: 20
  },
  loginText: {
    color: "white"
  }
});
