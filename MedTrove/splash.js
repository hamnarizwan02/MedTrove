import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

export default class Splash extends React.Component {
  render() {
    return (
      <ImageBackground source={require('./assets/splash.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.logo}>MedTrove</Text>
          <Text style={styles.welcome}>Always here for you!</Text>

          <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.loginText}>Let's get started</Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.loginLabel}>I already have an account ➜</Text>
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
    marginLeft: 30,
    marginTop: 180
  },
  welcome: {
    alignSelf: 'flex-start',
    marginLeft: -40,
    marginTop: -35,
    margin: 40,
    marginLeft: 100,
    marginBottom: 30
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
  loginLabel: {
    color: "blue",
    fontSize: 15,
    marginTop: 20
  },
  loginText: {
    color: "white",
    fontSize: 15
  }
});