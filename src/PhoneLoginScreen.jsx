import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const PhoneLoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(true);
   
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

 const handleFunction = async () => {
  console.log("function called")
  setError('');
  setIsRegistered(false);

  try {
    const response = await axios.post(
      "https://e00ed9322d4b.ngrok-free.app/api/accounts/register/initial/",
      { mobile_number: phoneNumber }
    );

    // Success path (assuming 200 OK)
    if (response.data.exists) {
      setError('This mobile number is already registered.');
      setIsRegistered(true);
      return true;
    } else {
      setError('');
      setIsRegistered(false);
      return false;
    }

  // } catch (err) {
  //   console.error('API Error:', err.response?.data || err.message);

  //   // Handle known error message from server
  //   if (err.response && err.response.data) {
  //     if (err.response.data.exists) {
  //       setError('This mobile number is already registered.');
  //       setIsRegistered(true);
  //       return true;
  //     }
  //     if (err.response.data.message) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError('Something went wrong. Please try again.');
  //     }
  //   } else {
  //     setError('Something went wrong. Please try again.');
  //   }

  //   return true;  // Treat as registered to block navigation
  // }
  } catch (err) {
  console.error('API Error:', err.response?.data || err.message);

  const errorData = err.response?.data;

  if (errorData) {
    // ✅ Check for mobile_number array
    if (
      Array.isArray(errorData.mobile_number) &&
      errorData.mobile_number.length > 0
    ) {
      setError(errorData.mobile_number[0]); // shows "Mobile number already registered"
      setIsRegistered(true);
      return true;
    }

    // Fallbacks
    if (errorData.message) {
      setError(errorData.message);
    } else if (errorData.detail) {
      setError(errorData.detail);
    } else {
      setError('Something went wrong. Please try again.');
    }
  } else {
    setError('Something went wrong. Please try again.');
  }

  return true;
}


};



  const handlePress = async () => {
  const exists = await handleFunction();
  if (!exists && phoneNumber.length === 10) {
     console.log('User signup successful');
    navigation.navigate('Registration', { phoneNumber });
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../assets/welcome.png')}
            style={styles.image}
          />

          <View style={styles.card}>
            <Text style={styles.label}>Enter your phone number</Text>
            <Text style={styles.subLabel}>
              Share your phone number and start posting loads
            </Text>

            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="8120636675"
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  setError('');
                  setIsRegistered(false);
                }}
              />
            </View>

            {error !== '' && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isChecked}
                onValueChange={setIsChecked}
              />
              <Text style={styles.checkboxText}>
                Get notifications on <Text style={{ color: 'green' }}>WhatsApp</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor:
                    (phoneNumber.length === 10 && !isRegistered)
                      ? '#154c79'
                      : 'gray',
                },
              ]}
              disabled={isRegistered || phoneNumber.length !== 10}
              onPress={handlePress}
            >
              <Text style={styles.loginText}>Next</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you are agreeing to the{' '}
              <Text style={styles.link}>Terms & Conditions</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#edf0f2',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginTop: 5,
    color: '#002147',
  },
  subLabel: {
    fontSize: 13,
    color: '#555',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f7f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    marginTop: 8,
    color: 'red',
    fontSize: 13,
    alignSelf: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 8,
  },
  loginButton: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#777',
    marginTop: 15,
    textAlign: 'center',
  },
  link: {
    color: '#005fcc',
    textDecorationLine: 'underline',
  },
});

export default PhoneLoginScreen;
