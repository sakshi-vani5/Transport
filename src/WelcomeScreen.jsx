import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/truk.png')}  // change this path as needed
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>EasyShip</Text>
        <Text style={styles.subtitle}>
          Welcome To EasyShip by E-transport!
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
       

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('PhoneLoginScreen')}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>





        






      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor:"white",
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    
    flex:1,
     resizeMode:'cover'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#003366',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    borderColor: '#003366',
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 58,
    borderRadius: 30,
    
  },
  signUpButtonText: {
    color: '#4B3DB2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
