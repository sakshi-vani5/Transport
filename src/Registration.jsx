import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import axios from 'axios';
import CounterContext from '../CounterContext';

const Registration = ({ route, navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const { phoneNumber } = route.params;
  const { setUserData } = useContext(CounterContext);

  useEffect(() => {
    const isValid =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '';
    setIsFormValid(isValid);
  }, [firstName, lastName, email, password]);

  const handleFunction = async () => {
    try {
      const response = await axios.post(
        'https://e00ed9322d4b.ngrok-free.app/api/accounts/register/user-details/',
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log('User registered:', response.data);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
  };

  const handlePress = () => {
    handleFunction();
    setUserData({ firstName, lastName, email, phoneNumber });
   
    navigation.navigate('OTPAuthentication', {
      email,
      phoneNumber,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>EASYSHIP</Text>

        <View style={styles.phoneRow}>
          <Image
            source={{ uri: 'https://flagcdn.com/w40/in.png' }}
            style={styles.flagIcon}
          />
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PhoneLoginScreen')}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="First name"
            placeholderTextColor="#888"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.inputBox}
          />
          <TextInput
            placeholder="Last name"
            placeholderTextColor="#888"
            value={lastName}
            onChangeText={setLastName}
            style={styles.inputBox}
          />
        </View>

        <TextInput
          placeholder="Email Id"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          style={styles.inputFull}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          style={styles.inputFull}
          secureTextEntry
        />

        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: isFormValid ? '#154c79' : '#ccc' },
          ]}
          onPress={handlePress}
          disabled={!isFormValid}
        >
          <Text style={styles.nextText}>NEXT</Text>
        </TouchableOpacity>

        <Text style={styles.noteText}>
          A one time password (OTP) will be sent to this number for verification.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
  container: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#f2f4f7',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#154c79',
    marginBottom: 30,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    marginBottom: 25,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 10,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  changeText: {
    color: '#005fcc',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputFull: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  nextButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noteText: {
    fontSize: 13,
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
    width: '100%',
  },
});


export default Registration;
