
import React, { useContext, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Image, Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import CounterContext from '../CounterContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditProfileScreen = ({ navigation }) => {
  const { userData, setUserData, manufacturerData, setManufacturerData } = useContext(CounterContext);

  const [profileImage, setProfileImage] = useState(userData.profileImage || '');
  const [name, setName] = useState(userData.first_name || '');
  const [phone, setPhone] = useState(userData.contact_no || '');
  const [email, setEmail] = useState(userData.email || '');

  const [designation, setDesignation] = useState(manufacturerData.designation || '');
  const [companyName, setCompanyName] = useState(manufacturerData.companyName || '');
  const [companyLocation, setCompanyLocation] = useState(manufacturerData.companyAddress || '');
  const [companyType, setCompanyType] = useState(manufacturerData.companyType || '');
  const [registrationNo, setRegistrationNo] = useState(manufacturerData.companyRegNo || '');

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.errorCode && response.assets?.length) {
        const uri = response.assets[0].uri;
        setProfileImage(uri);
      }
    });
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      // Payload to send in PUT request
      const payload = {
        companyname: companyName,
        companyaddress: companyLocation,
        companyregno: registrationNo,
        designation: designation,
      };

      const response = await axios.put(
        'https://e00ed9322d4b.ngrok-free.app/api/accounts/industrial-owners/update/', // ✅ Change this to your actual base URL
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Industrial Owner Updated:', response.data);

      // Update local context & storage
      const updatedUserData = {
        ...userData,
        first_name: name,
        contact_no: phone,
        email: email,
        profileImage,
      };

      const updatedManufacturerData = {
        ...manufacturerData,
        designation,
        companyName,
        companyAddress: companyLocation,
        companyType,
        companyRegNo: registrationNo,
      };

      setUserData(updatedUserData);
      setManufacturerData(updatedManufacturerData);

      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserData));
      await AsyncStorage.setItem('manufacturerData', JSON.stringify(updatedManufacturerData));

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('❌ Update Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>

      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <TextInput style={styles.input} placeholder="Designation" value={designation} onChangeText={setDesignation} />
      <TextInput style={styles.input} placeholder="Company Name" value={companyName} onChangeText={setCompanyName} />
      <TextInput style={styles.input} placeholder="Company Location" value={companyLocation} onChangeText={setCompanyLocation} />
      <TextInput style={styles.input} placeholder="Company Type" value={companyType} onChangeText={setCompanyType} />
      <TextInput style={styles.input} placeholder="Registration No." value={registrationNo} onChangeText={setRegistrationNo} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 8,
  },
  changePhotoText: {
    color: '#007bff',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
