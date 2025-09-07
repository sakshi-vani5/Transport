import React, { useContext, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert
} from 'react-native';
import CounterContext from '../../CounterContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
const EditTScreen = ({ navigation }) => {
  const { userData, setUserData, TransportData, setTransportData } = useContext(CounterContext);
 const [profileImage, setProfileImage] = useState(userData.profileImage || '');
  const [contactNo, setContactNo] = useState(userData?.phoneNumber || '');
  const [aadharNo, setAadharNo] = useState(TransportData.aadharNo || '');
  const [passingLoadWeight, setPassingLoadWeight] = useState(TransportData.passingLoadWeight || '');

  const [vehicleNo, setVehicleNo] = useState(TransportData.vehicleNo || '');
  const [vehicleName, setVehicleName] = useState(TransportData.vehicleName || '');
  const [vehicleRegNo, setVehicleRegNo] = useState(TransportData.vehicleRegNo || '');
  const [vehicleExpiry, setVehicleExpiry] = useState(TransportData.vehicleExpiry || '');

  const [insuranceNo, setInsuranceNo] = useState(TransportData.insuranceNo || '');
  const [insuranceExpiry, setInsuranceExpiry] = useState(TransportData.insuranceExpiry || '');

  const [driverName, setDriverName] = useState(TransportData.driverName || '');
  const [driverAddress, setDriverAddress] = useState(TransportData.driverAddress || '');

  const [licenseNo, setLicenseNo] = useState(TransportData.licenseNo || '');
  const [licenseExpiry, setLicenseExpiry] = useState(TransportData.licenseExpiry || '');
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

      const payload = {
        contact_no: contactNo,
        aadhar_no: aadharNo,
        passing_load_weight: passingLoadWeight,
        vehicle_no: vehicleNo,
        vehicle_name: vehicleName,
        vehicle_reg_no: vehicleRegNo,
        vehicle_expiry: vehicleExpiry,
        insurance_no: insuranceNo,
        insurance_expiry: insuranceExpiry,
        driver_name: driverName,
        driver_address: driverAddress,
        license_no: licenseNo,
        license_expiry: licenseExpiry,
      };

      const response = await axios.put(
        'https://e00ed9322d4b.ngrok-free.app/api/transport-provider/update/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Transport Provider Updated:', response.data);

      const updatedUserData = {
        ...userData,
        phoneNumber: contactNo,
      };

      const updatedTransportData = {
        ...TransportData,
        aadharNo,
        passingLoadWeight,
        vehicleNo,
        vehicleName,
        vehicleRegNo,
        vehicleExpiry,
        insuranceNo,
        insuranceExpiry,
        driverName,
        driverAddress,
        licenseNo,
        licenseExpiry,
      };

      setUserData(updatedUserData);
      setTransportData(updatedTransportData);

      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUserData));
      await AsyncStorage.setItem('transportData', JSON.stringify(updatedTransportData));

      Alert.alert('Success', 'Transport provider profile updated successfully!');
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
               source={profileImage ? { uri: profileImage } : require('../../assets/profile.jpg')}
               style={styles.profileImage}
             />
             <Text style={styles.changePhotoText}>Change Photo</Text>
           </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Contact No" value={contactNo} onChangeText={setContactNo} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Aadhar No" value={aadharNo} onChangeText={setAadharNo} />
      <TextInput style={styles.input} placeholder="Passing Load Weight" value={passingLoadWeight} onChangeText={setPassingLoadWeight} />

      <TextInput style={styles.input} placeholder="Vehicle No" value={vehicleNo} onChangeText={setVehicleNo} />
      <TextInput style={styles.input} placeholder="Vehicle Name" value={vehicleName} onChangeText={setVehicleName} />
      <TextInput style={styles.input} placeholder="Vehicle Reg No" value={vehicleRegNo} onChangeText={setVehicleRegNo} />
      <TextInput style={styles.input} placeholder="Vehicle Expiry" value={vehicleExpiry} onChangeText={setVehicleExpiry} />

      <TextInput style={styles.input} placeholder="Insurance No" value={insuranceNo} onChangeText={setInsuranceNo} />
      <TextInput style={styles.input} placeholder="Insurance Expiry" value={insuranceExpiry} onChangeText={setInsuranceExpiry} />

      <TextInput style={styles.input} placeholder="Driver Name" value={driverName} onChangeText={setDriverName} />
      <TextInput style={styles.input} placeholder="Driver Address" value={driverAddress} onChangeText={setDriverAddress} />

      <TextInput style={styles.input} placeholder="License No" value={licenseNo} onChangeText={setLicenseNo} />
      <TextInput style={styles.input} placeholder="License Expiry" value={licenseExpiry} onChangeText={setLicenseExpiry} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditTScreen;

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
