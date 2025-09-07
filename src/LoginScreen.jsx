

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CounterContext from '../CounterContext';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUserData } = useContext(CounterContext);
const BASE_URL = "https://e00ed9322d4b.ngrok-free.app"; 

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter both email and password.');
    return;
  }

  setLoading(true);

  try {
    // 1. LOGIN
    const loginRes = await axios.post(
      'https://e00ed9322d4b.ngrok-free.app/api/accounts/login/',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
   
  console.log('Full Login Response:', JSON.stringify(loginRes.data, null, 2));



    const accessToken = loginRes?.data?.access_token;
    const refreshToken = loginRes?.data?.refresh_token;

    if (!accessToken) {
      throw new Error('Access token missing from login response');
    }

    // Store tokens for later use
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    // 2. FETCH PROFILE
    const profileRes = await axios.get(
      'https://e00ed9322d4b.ngrok-free.app/api/accounts/profile/',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('Profile Response:', profileRes.data);

    const profile = profileRes.data;
    console.log("👤 Profile Data from API:", profile);
    if (profile.person_photo && profile.person_photo.startsWith('/')) {
  profile.person_photo = `${BASE_URL}${profile.person_photo}`;
}



setUserData(profile);

    // Store profile in AsyncStorage
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));





    if (profile.user_type === 'industrial_owner') {
  navigation.reset({
    index: 0,
    routes: [{ name: 'HomeScreen' }],  // Manufacturer screen
  });
} else if (profile.user_type === 'vehicle_owner') {
  navigation.reset({
    index: 0,
    routes: [{ name: 'HomeTScreen' }], // Transport provider screen
  });
} else {
  Alert.alert('Error', 'Unknown user type');
}



    // Update global context
    setUserData(profile);

    // Alert.alert('Success', 'Logged in successfully!');
  

  } catch (error) {
    console.log('Login Error Full Object:', JSON.stringify(error, null, 2));
    if (error.response) {
      console.log('Login Error Response:', JSON.stringify(error.response.data, null, 2));
      const message = error.response.data.message || 'Invalid email or password. Please try again.';
      Alert.alert('Login Failed', message);
    } else {
      console.error('Unexpected Error:', error.message);
      Alert.alert('Login Failed', 'Something went wrong. Please try again later.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image
          source={require('../assets/wel.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />

        <TouchableOpacity onPress={() => {}} style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signUpButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 260,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#888',
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: '#003366',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;


