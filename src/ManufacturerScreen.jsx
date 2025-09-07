import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CounterContext from '../CounterContext';


const ManufacturerScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { userData, setManufacturerData ,setUserData } = useContext(CounterContext);

  const [logo, setLogo] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  
  const [companyRegNo, setCompanyRegNo] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [designation, setDesignation] = useState('');

  const pickImage = async (setter) => {
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && response.assets?.length > 0) {
        setter(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    if (!companyName || !companyAddress || !companyRegNo || !designation || !logo || !photo) {
      Alert.alert('Error', 'Please fill all required fields and select images.');
      return;
    }

    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('company_address', companyAddress);
    formData.append('company_reg_no', companyRegNo);
    formData.append('company_type', companyType);
    formData.append('designation', designation);
    formData.append('company_logo', { uri: logo, type: 'image/jpeg', name: 'logo.jpg' });
    formData.append('person_photo', { uri: photo, type: 'image/jpeg', name: 'photo.jpg' });

    try {
       console.log('🚀 Submitting form data...');
  console.log('FormData Details:', {
    companyName,
    companyAddress,
    companyRegNo,
    companyType,
    designation,
    logo,
    photo,
  });
      await axios.post(
        'https://e00ed9322d4b.ngrok-free.app/api/accounts/register/industrial-owner/',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
  console.log('✅ API Success: Data submitted');
      // SAVE to Context
      setManufacturerData({
        companyName,
        companyAddress,
        companyRegNo,
        companyType,
        designation,
        logo,
        photo,
      });
  setUserData(prev => ({
        ...prev,
        profileImage: photo,
      }));
     
      navigation.navigate('SuccessScreen');
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Alert.alert('Registration Failed', JSON.stringify(error.response?.data || error.message));
     if (error.response) {
    console.log('📡 Server responded with status:', error.response.status);
    console.log('🧾 Server error data:', JSON.stringify(error.response.data, null, 2));
  } else if (error.request) {
    console.log('📭 Request made but no response received:', error.request);
  } else {
    console.log('🚨 Other error:', error.message);
  }

  Alert.alert('Error', 'Something went wrong. Check logs for details.');}
    console.log(userData)
  };

  return (
    <ScrollView style={styles.container}>
     
      <Text style={styles.sectionTitle}>{t('company_details')}</Text>
      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('company_name')} value={companyName} onChangeText={setCompanyName} style={styles.inputBox} />
          <TextInput placeholder={t('company_location')} value={companyAddress} onChangeText={setCompanyAddress} style={styles.inputBox} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setLogo)} style={styles.logoBox}>
          {logo ? <Image source={{ uri: logo }} style={styles.image} /> : <Text style={styles.uploadText}>{t('upload_logo')}</Text>}
        </TouchableOpacity>
      </View>

      <TextInput placeholder={t('company_type')} value={companyType} onChangeText={setCompanyType} style={styles.inputFull} />
      <TextInput placeholder={t('Registration no.')} keyboardType="phone-pad" style={styles.inputFull} value={companyRegNo} onChangeText={setCompanyRegNo} />

      <Text style={styles.sectionTitle}>{t('contact_details')}</Text>
      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('Person_name')} style={styles.inputBox} value={userData.firstName} editable={false} />
          <TextInput placeholder={t('designation')} value={designation} onChangeText={setDesignation} style={styles.inputBox} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setPhoto)} style={styles.logoBox}>
          {photo ? <Image source={{ uri: photo }} style={styles.image} /> : <Text style={styles.uploadText}>{t('upload_photo')}</Text>}
        </TouchableOpacity>
      </View>

      <TextInput placeholder={t('email')} style={styles.inputFull} value={userData.email} editable={false} />
      <TextInput placeholder={t('contact_number')} keyboardType="phone-pad" style={styles.inputFull} value={userData.phoneNumber} editable={false} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{t('submit')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#f9f9f9', padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 12, color: '#333' },
  companySection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  inputColumn: { flex: 1, marginRight: 12, marginTop: 10 },
  inputBox: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, elevation: 2 },
  logoBox: { width: 115, height: 115, borderRadius: 8, borderWidth: 1.5, borderColor: '#ccc', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  uploadText: { color: '#aaa', fontSize: 12 },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  inputFull: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginVertical: 8, elevation: 2, marginTop: 0 },
  submitButton: { backgroundColor: '#154c79', padding: 12, borderRadius: 10, marginTop: 10, marginBottom: 30 },
  submitText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});

export default ManufacturerScreen;
