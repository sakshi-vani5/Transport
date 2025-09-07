
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const { width } = Dimensions.get('window');
const CELL_COUNT = 6;

const OTPAuthentication = ({  navigation,route }) => {
  const { phoneNumber, email, initialSessionId } = route.params;

  const [value, setValue] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [sessionId, setSessionId] = useState(initialSessionId);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

//   const handleResendOtp = async () => {
//   if (!email) {
//     Alert.alert('Error', 'Email is missing');
//     return;
//   }

//   try {
//     const response = await axios.post(
//       'https://77b7-2405-201-3009-d013-6e0a-5786-a030-5cd.ngrok-free.app/api/accounts/resend-otp/',
//       { email },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'session_id': sessionId,
//         },
//         withCredentials: true,
//       }
//     );

//     console.log('Resend OTP Response:', response.data);

//     if (response.data.success) {
//       if (response.data.session_id) {
//         setSessionId(response.data.session_id);
//       }

//       setCountdown(60);
//       Alert.alert('Success', 'A new OTP has been sent to your number.');
//     } else {
//       Alert.alert('Error', response.data.message || 'OTP not sent');
//     }
//   } catch (error) {
//     console.log('Resend OTP Error:', error?.response?.data || error.message);
//     Alert.alert('Error', error?.response?.data?.message || 'Failed to resend OTP');
//   }
// };
const handleResendOtp = async () => {
  if (!email) {
    Alert.alert('Error', 'Email is missing');
    return;
  }

  try {
    const response = await axios.post(
      'https://e00ed9322d4b.ngrok-free.app/api/accounts/resend-otp',
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
          'session_id': sessionId,
        },
        withCredentials: true,
      }
    );

    console.log('✅ Resend OTP Full Response:', JSON.stringify(response.data, null, 2));

    const message = response.data.message?.toLowerCase();

    if (message?.includes('otp')) {
      if (response.data.session_id) {
        setSessionId(response.data.session_id);
      }

      setCountdown(60);
      Alert.alert('Success', response.data.message || 'OTP resent.');
    } else {
      Alert.alert('Error', response.data.message || 'Failed to resend OTP');
    }
  } catch (error) {
    console.log('Resend OTP Error:', error?.response?.data || error.message);
    Alert.alert('Error', error?.response?.data?.message || 'Resend request failed');
  }
};


  const handleVerifyOtp = async () => {
    

  if (value.length !== 6) {
    Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP');
    return false;
  }

  try {
    const response = await axios.post(
      'https://e00ed9322d4b.ngrok-free.app/api/accounts/register/verify-otp/',
      {
        email: email,
        otp: value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'session_id': sessionId,
        },
        withCredentials: true,
      }
    );

    console.log('Verify OTP Response:', response.data);
     console.log('✅ API success flag is:', response.data.success);
    console.log('Verify OTP API Response:', JSON.stringify(response.data, null, 2));
    console.log('✅ Full Axios Response:', JSON.stringify(response, null, 2));
   
    
     if (response.data.message?.toLowerCase().includes('verified')) {
    
      return true;
    } else {
      Alert.alert('Error', response.data.message || 'Invalid OTP');
      return false;
    }

  } catch (error) {
    console.log('Verify OTP Error:', error?.response?.data || error.message);
    Alert.alert('Error', error?.response?.data?.message || 'OTP verification failed');
    return false;
  }
};


  const handlePress = async () => {
    const isVerified = await handleVerifyOtp();
    if (isVerified) {
      navigation.navigate('PermissionScreen', { email, phoneNumber });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Authentication</Text>
      <Text style={styles.subtitle}>You will receive the OTP on</Text>
      <Text style={styles.phone}>{phoneNumber}</Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : '')}</Text>
          </View>
        )}
      />

      <Text style={styles.resendText}>
        Didn’t receive the code?{' '}
        {countdown > 0 ? (
          <Text style={{ color: '#999' }}>Resend in {countdown}s</Text>
        ) : (
          <Text style={styles.resendLink} onPress={handleResendOtp}>
            Resend
          </Text>
        )}
      </Text>

      <TouchableOpacity style={styles.confirmButton} onPress={handlePress}>
        <Text style={styles.confirmText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPAuthentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  phone: {
    fontSize: 16,
    marginBottom: 30,
    color: '#000',
  },
  codeFieldRoot: {
    marginBottom: 20,
    justifyContent: 'center',
  },
  cell: {
    width: 45,
    height: 50,
    fontSize: 24,
    borderRadius: 8,
    backgroundColor: '#333',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: '#fff',
    fontSize: 20,
  },
  focusCell: {
    borderColor: '#000',
  },
  resendText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
  },
  resendLink: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#002e6e',
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

