// import React, { useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import CounterContext from '../CounterContext';

// const TransportTraderScreen = ({ navigation }) => {
//   const { t } = useTranslation();
//   const { userData, manufacturerData } = useContext(CounterContext);
// const { setTransportData } = useContext(CounterContext);
//   // Prefill company fields with manufacturerData
//   const [companyName, setCompanyName] = useState('');
//   const [companyLocation, setCompanyLocation] = useState('');
//   const [companyType, setCompanyType] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [logo, setLogo] = useState(manufacturerData?.logo || null);
//   const [personPhoto, setPersonPhoto] = useState(manufacturerData?.photo || null);
//   const [passingLoadWeight, setPassingLoadWeight] = useState('');

//   // Other form fieldshttps
//   const [contactNo, setContactNo] = useState(userData?.phoneNumber || '');
//   const [aadharNo, setAadharNo] = useState('');
//   const [aadharImage, setAadharImage] = useState(null);

//   const [vehicleNo, setVehicleNo] = useState('');
//   const [vehicleName, setVehicleName] = useState('');
//   const [vehicleImage, setVehicleImage] = useState(null);
//   const [vehicleRegNo, setVehicleRegNo] = useState('');
//   const [vehicleExpiry, setVehicleExpiry] = useState('');
//   const [vehicleRegImage, setVehicleRegImage] = useState(null);
//   const [insuranceNo, setInsuranceNo] = useState('');
//   const [insuranceExpiry, setInsuranceExpiry] = useState('');
//   const [insuranceImage, setInsuranceImage] = useState(null);

//   const [driverName, setDriverName] = useState('');
//   const [driverAddress, setDriverAddress] = useState('');
//   const [driverImage, setDriverImage] = useState(null);

//   const [licenseNo, setLicenseNo] = useState('');
//   const [licenseExpiry, setLicenseExpiry] = useState('');
//   const [licenseImage, setLicenseImage] = useState(null);

//   // Load manufacturerData into form on mount
//   useEffect(() => {
//     if (manufacturerData) {
//       setCompanyName(manufacturerData.companyName || '');
//       setCompanyLocation(manufacturerData.companyAddress || '');
//       setCompanyType(manufacturerData.companyType || '');
//       setDesignation(manufacturerData.designation || '');
//       setLogo(manufacturerData.logo || null);
//       setPersonPhoto(manufacturerData.photo || null);
//     }
//   }, [manufacturerData]);

//   const pickImage = (setter) => {
//     launchImageLibrary({}, (response) => {
//       if (!response.didCancel && response.assets?.length > 0) {
//         setter(response.assets[0].uri);
//       }
//     });
//   };

//   const handleSubmit = async () => {
//       if (!companyName || !vehicleNo || !licenseNo) {
//   Alert.alert('Validation Error', 'Please fill all mandatory fields.');
//   return;
// }
//     const formData = new FormData();

//     formData.append('company_name', companyName);
//     formData.append('company_location', companyLocation);
//     formData.append('company_type', companyType);
//     formData.append('designation', designation);

//     if (logo) {
//       formData.append('company_logo', {
//         uri: logo,
//         name: 'logo.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     formData.append('contact_no', contactNo);
//     formData.append('aadhar_no', aadharNo);
//     if (aadharImage) {
//       formData.append('aadhar_image', {
//         uri: aadharImage,
//         name: 'aadhar.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     formData.append('vehicle_number', vehicleNo);
//     formData.append('vehicle_name', vehicleName);
//     if (vehicleImage) {
//       formData.append('vehicle_image', {
//         uri: vehicleImage,
//         name: 'vehicle.jpg',
//         type: 'image/jpeg',
//       });
//     }
//     formData.append('vehicle_registration_number', vehicleRegNo);
//     formData.append('vehicle_registration_expiry_date', vehicleExpiry);
//     if (vehicleRegImage) {
//       formData.append('vehicle_registration_image', {
//         uri: vehicleRegImage,
//         name: 'reg.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     formData.append('insurance_number', insuranceNo);
//     formData.append('insurance_expiry_date', insuranceExpiry);
//     if (insuranceImage) {
//       formData.append('insurance_image', {
//         uri: insuranceImage,
//         name: 'insurance.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     formData.append('driver_name', driverName);
//     formData.append('driver_address', driverAddress);
//     if (driverImage) {
//       formData.append('driver_image', {
//         uri: driverImage,
//         name: 'driver.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     formData.append('license_number', licenseNo);
//     formData.append('license_expiry_date', licenseExpiry);
//     if (licenseImage) {
//       formData.append('license_image', {
//         uri: licenseImage,
//         name: 'license.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     formData.append('passing_load_weight', passingLoadWeight);

//     if (personPhoto) {
//       formData.append('person_photo', {
//         uri: personPhoto,
//         name: 'photo.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     try {
//       await axios.post(
//         'https://637d30779538.ngrok-free.app/api/accounts/register/vehicle-owner/',
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );
//       // SAVE to Context
//    setTransportData({
//    vehicleNo,
//   vehicleName,
//   vehicleRegNo,
//   vehicleExpiry,
//   insuranceNo,
//   insuranceExpiry,
//   aadharNo,
  
//   driverName,
//   driverAddress,
//   licenseNo,
//    licenseExpiry,
// });
     
//       Alert.alert('Success', 'Vehicle Registered Successfully!');
//       console.log("Success', 'Vehicle Registered Successfully!")
//       navigation.navigate('HomeTScreen');
//     } catch (error) {
//       console.error('Axios error:', error);
//       if (error.response) {
//         console.log('Error Status:', error.response.status);
//         console.log('Error Data:', error.response.data);
//       }
//       Alert.alert('Error', 'Failed to register vehicle.');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.sectionTitle}>{t('company_details')}</Text>
//       <View style={styles.companySection}>
//         <View style={styles.inputColumn}>
//           <TextInput placeholder={t('company_name')} style={styles.inputBox} value={companyName} onChangeText={setCompanyName} />
//           <TextInput placeholder={t('company_location')} style={styles.inputBox} value={companyLocation} onChangeText={setCompanyLocation} />
//         </View>
//         <TouchableOpacity onPress={() => pickImage(setLogo)} style={styles.logoBox}>
//           {logo ? <Image source={{ uri: logo }} style={styles.image} /> : <Text style={styles.uploadText}>{t('upload_logo')}</Text>}
//         </TouchableOpacity>
//       </View>

//       <TextInput placeholder={t('company_type')} style={styles.inputFull} value={companyType} onChangeText={setCompanyType} />
//       <TextInput placeholder={t('contact_number')} keyboardType="phone-pad" style={styles.inputFull} value={contactNo} onChangeText={setContactNo} />

//       <Text style={styles.sectionTitle}>{t('contact_details')}</Text>
//       <View style={styles.companySection}>
//         <View style={styles.inputColumn}>
//           <TextInput placeholder={t('Person_name')} style={styles.inputBox} value={userData?.firstName} editable={false} />
//           <TextInput placeholder={t('designation')} style={styles.inputBox} value={designation} onChangeText={setDesignation} />
//         </View>
//         <TouchableOpacity onPress={() => pickImage(setPersonPhoto)} style={styles.logoBox}>
//           {personPhoto ? <Image source={{ uri: personPhoto }} style={styles.image} /> : <Text style={styles.uploadText}>{t('upload_photo')}</Text>}
//         </TouchableOpacity>
//       </View>

//       <TextInput placeholder={t('email')} style={styles.inputFull} value={userData?.email} editable={false} />

//       <View style={styles.companySection}>
//         <View style={styles.inputColumn}>
//           <TextInput placeholder={t('Aadhar no.')} style={styles.inputBox} value={aadharNo} onChangeText={setAadharNo} />
//           <TextInput placeholder={t('contact_number')} style={styles.inputBox} value={contactNo} onChangeText={setContactNo} />
//         </View>
//         <TouchableOpacity onPress={() => pickImage(setAadharImage)} style={styles.logoBox}>
//           {aadharImage ? <Image source={{ uri: aadharImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('Aadhar Photo')}</Text>}
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.sectionTitle}>{t('vehicle_details')}</Text>
//       <View style={styles.companySection}>
//         <View style={styles.inputColumn}>
//           <TextInput placeholder={t('vehicle_no')} style={styles.inputBox} value={vehicleNo} onChangeText={setVehicleNo} />
//           <TextInput placeholder={t('vehicle_name')} style={styles.inputBox} value={vehicleName} onChangeText={setVehicleName} />
//         </View>
//         <TouchableOpacity onPress={() => pickImage(setVehicleImage)} style={styles.logoBox}>
//           {vehicleImage ? <Image source={{ uri: vehicleImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('vehicle_image')}</Text>}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.companySection}>
//         <View style={styles.inputColumn}>
//           <TextInput placeholder={t('vehicle_reg_no')} style={styles.inputBox} value={vehicleRegNo} onChangeText={setVehicleRegNo} />
//           <TextInput placeholder={t('vehicle_expiry')} style={styles.inputBox} value={vehicleExpiry} onChangeText={setVehicleExpiry} />
//         </View>
//         <TouchableOpacity onPress={() => pickImage(setVehicleRegImage)} style={styles.logoBox}>
//           {vehicleRegImage ? <Image source={{ uri: vehicleRegImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('Upload Reg.')}</Text>}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.companySection}>
//         <View style={styles.inputColumn}>
//           <TextInput placeholder={t('insurance_no')} style={styles.inputBox} value={insuranceNo} onChangeText={setInsuranceNo} />
//           <TextInput placeholder={t('insurance_expiry')} style={styles.inputBox} value={insuranceExpiry} onChangeText={setInsuranceExpiry} />
//         </View>
//         <TouchableOpacity onPress={() => pickImage(setInsuranceImage)} style={styles.logoBox}>
//           {insuranceImage ? <Image source={{ uri: insuranceImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('Upload Insurance')}</Text>}
//         </TouchableOpacity>
//       </View>

//       <TextInput
//         placeholder={t('passing_load_weight')}
//         keyboardType="numeric"
//         style={styles.inputFull}
//         value={passingLoadWeight}
//         onChangeText={setPassingLoadWeight}
//       />

//       <Text style={styles.sectionTitle}>{t('driver_details')}</Text>
//       <View style={styles.companySection}>
//         <View style={styles.inputColumn}>
//           <TextInput placeholder={t('driver_name')} style={styles.inputBox} value={driverName} onChangeText={setDriverName} />
//           <TextInput placeholder={t('driver_address')} style={styles.inputBox} value={driverAddress} onChangeText={setDriverAddress} />
//         </View>
//         <TouchableOpacity onPress={() => pickImage(setDriverImage)} style={styles.logoBox}>
//           {driverImage ? <Image source={{ uri: driverImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('Driver Image')}</Text>}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.companySection}>
//         <View style={styles.inputColumn}>
//           <TextInput placeholder={t('license_no')} style={styles.inputBox} value={licenseNo} onChangeText={setLicenseNo} />
//           <TextInput placeholder={t('license_expiry')} style={styles.inputBox} value={licenseExpiry} onChangeText={setLicenseExpiry} />
//         </View>
//         <TouchableOpacity onPress={() => pickImage(setLicenseImage)} style={styles.logoBox}>
//           {licenseImage ? <Image source={{ uri: licenseImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('License Image')}</Text>}
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitText}>{t('submit')}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { backgroundColor: '#f9f9f9', padding: 16 },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 12, color: '#333' },
//   companySection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
//   inputColumn: { flex: 1, marginRight: 12, marginTop: 10 },
//   inputBox: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, elevation: 2 },
//   logoBox: { width: 115, height: 115, borderRadius: 8, borderWidth: 1.5, borderColor: '#ccc', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
//   uploadText: { color: '#aaa', fontSize: 12 },
//   image: { width: '100%', height: '100%', borderRadius: 8 },
//   inputFull: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginVertical: 8, elevation: 2, marginTop: 0 },
//   submitButton: { backgroundColor: '#154c79', padding: 12, borderRadius: 10, marginTop: 10, marginBottom: 30 },
//   submitText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
// });

// export default TransportTraderScreen;


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

const TransportTraderScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { userData, setTransportData } = useContext(CounterContext);

  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [designation, setDesignation] = useState('');
  const [logo, setLogo] = useState(null);
  const [personPhoto, setPersonPhoto] = useState(null);
  const [passingLoadWeight, setPassingLoadWeight] = useState('');

  const [contactNo, setContactNo] = useState(userData?.phoneNumber || '');
  const [aadharNo, setAadharNo] = useState('');
  const [aadharImage, setAadharImage] = useState(null);

  const [vehicleNo, setVehicleNo] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleImage, setVehicleImage] = useState(null);
  const [vehicleRegNo, setVehicleRegNo] = useState('');
  const [vehicleExpiry, setVehicleExpiry] = useState('');
  const [vehicleRegImage, setVehicleRegImage] = useState(null);
  const [insuranceNo, setInsuranceNo] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');
  const [insuranceImage, setInsuranceImage] = useState(null);

  const [driverName, setDriverName] = useState('');
  const [driverAddress, setDriverAddress] = useState('');
  const [driverImage, setDriverImage] = useState(null);

  const [licenseNo, setLicenseNo] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [licenseImage, setLicenseImage] = useState(null);

  const pickImage = (setter) => {
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && response.assets?.length > 0) {
        setter(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    if (!companyName || !vehicleNo || !licenseNo) {
      Alert.alert('Validation Error', 'Please fill all mandatory fields.');
      return;
    }

    const formData = new FormData();

    formData.append('company_name', companyName);
    formData.append('company_location', companyLocation);
    formData.append('company_type', companyType);
    formData.append('designation', designation);

    if (logo) {
      formData.append('company_logo', {
        uri: logo,
        name: 'logo.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('contact_no', contactNo);
    formData.append('aadhar_no', aadharNo);
    if (aadharImage) {
      formData.append('aadhar_image', {
        uri: aadharImage,
        name: 'aadhar.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('vehicle_number', vehicleNo);
    formData.append('vehicle_name', vehicleName);
    if (vehicleImage) {
      formData.append('vehicle_image', {
        uri: vehicleImage,
        name: 'vehicle.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('vehicle_registration_number', vehicleRegNo);
    formData.append('vehicle_registration_expiry_date', vehicleExpiry);
    if (vehicleRegImage) {
      formData.append('vehicle_registration_image', {
        uri: vehicleRegImage,
        name: 'reg.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('insurance_number', insuranceNo);
    formData.append('insurance_expiry_date', insuranceExpiry);
    if (insuranceImage) {
      formData.append('insurance_image', {
        uri: insuranceImage,
        name: 'insurance.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('driver_name', driverName);
    formData.append('driver_address', driverAddress);
    if (driverImage) {
      formData.append('driver_image', {
        uri: driverImage,
        name: 'driver.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('license_number', licenseNo);
    formData.append('license_expiry_date', licenseExpiry);
    if (licenseImage) {
      formData.append('license_image', {
        uri: licenseImage,
        name: 'license.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('passing_load_weight', passingLoadWeight);

    if (personPhoto) {
      formData.append('person_photo', {
        uri: personPhoto,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      await axios.post(
        'https://e00ed9322d4b.ngrok-free.app/api/accounts/register/vehicle-owner/',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setTransportData({
        vehicleNo,
        vehicleName,
        vehicleRegNo,
        vehicleExpiry,
        insuranceNo,
        insuranceExpiry,
        aadharNo,
        driverName,
        driverAddress,
        licenseNo,
        licenseExpiry,
      });

      Alert.alert('Success', 'Vehicle Registered Successfully!');
      navigation.navigate('HomeTScreen');
    } catch (error) {
      console.error('Axios error:', error);
      if (error.response) {
        console.log('Error Status:', error.response.status);
        console.log('Error Data:', error.response.data);
      }
      Alert.alert('Error', 'Failed to register vehicle.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>{t('company_details')}</Text>
      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('company_name')} style={styles.inputBox} value={companyName} onChangeText={setCompanyName} />
          <TextInput placeholder={t('company_location')} style={styles.inputBox} value={companyLocation} onChangeText={setCompanyLocation} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setLogo)} style={styles.logoBox}>
          {logo ? <Image source={{ uri: logo }} style={styles.image} /> : <Text style={styles.uploadText}>{t('upload_logo')}</Text>}
        </TouchableOpacity>
      </View>

      <TextInput placeholder={t('company_type')} style={styles.inputFull} value={companyType} onChangeText={setCompanyType} />
      <TextInput placeholder={t('contact_number')} keyboardType="phone-pad" style={styles.inputFull} value={contactNo} onChangeText={setContactNo} />

      <Text style={styles.sectionTitle}>{t('contact_details')}</Text>
      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('Person_name')} style={styles.inputBox} value={userData?.firstName} editable={false} />
          <TextInput placeholder={t('designation')} style={styles.inputBox} value={designation} onChangeText={setDesignation} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setPersonPhoto)} style={styles.logoBox}>
          {personPhoto ? <Image source={{ uri: personPhoto }} style={styles.image} /> : <Text style={styles.uploadText}>{t('upload_photo')}</Text>}
        </TouchableOpacity>
      </View>

      <TextInput placeholder={t('email')} style={styles.inputFull} value={userData?.email} editable={false} />

      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('Aadhar no.')} style={styles.inputBox} value={aadharNo} onChangeText={setAadharNo} />
          <TextInput placeholder={t('contact_number')} style={styles.inputBox} value={contactNo} onChangeText={setContactNo} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setAadharImage)} style={styles.logoBox}>
          {aadharImage ? <Image source={{ uri: aadharImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('Aadhar Photo')}</Text>}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{t('vehicle_details')}</Text>
      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('vehicle_no')} style={styles.inputBox} value={vehicleNo} onChangeText={setVehicleNo} />
          <TextInput placeholder={t('vehicle_name')} style={styles.inputBox} value={vehicleName} onChangeText={setVehicleName} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setVehicleImage)} style={styles.logoBox}>
          {vehicleImage ? <Image source={{ uri: vehicleImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('vehicle_image')}</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('vehicle_reg_no')} style={styles.inputBox} value={vehicleRegNo} onChangeText={setVehicleRegNo} />
          <TextInput placeholder={t('vehicle_expiry')} style={styles.inputBox} value={vehicleExpiry} onChangeText={setVehicleExpiry} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setVehicleRegImage)} style={styles.logoBox}>
          {vehicleRegImage ? <Image source={{ uri: vehicleRegImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('Upload Reg.')}</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('insurance_no')} style={styles.inputBox} value={insuranceNo} onChangeText={setInsuranceNo} />
          <TextInput placeholder={t('insurance_expiry')} style={styles.inputBox} value={insuranceExpiry} onChangeText={setInsuranceExpiry} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setInsuranceImage)} style={styles.logoBox}>
          {insuranceImage ? <Image source={{ uri: insuranceImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('Upload Insurance')}</Text>}
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder={t('passing_load_weight')}
        keyboardType="numeric"
        style={styles.inputFull}
        value={passingLoadWeight}
        onChangeText={setPassingLoadWeight}
      />

      <Text style={styles.sectionTitle}>{t('driver_details')}</Text>
      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('driver_name')} style={styles.inputBox} value={driverName} onChangeText={setDriverName} />
          <TextInput placeholder={t('driver_address')} style={styles.inputBox} value={driverAddress} onChangeText={setDriverAddress} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setDriverImage)} style={styles.logoBox}>
          {driverImage ? <Image source={{ uri: driverImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('Driver Image')}</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.companySection}>
        <View style={styles.inputColumn}>
          <TextInput placeholder={t('license_no')} style={styles.inputBox} value={licenseNo} onChangeText={setLicenseNo} />
          <TextInput placeholder={t('license_expiry')} style={styles.inputBox} value={licenseExpiry} onChangeText={setLicenseExpiry} />
        </View>
        <TouchableOpacity onPress={() => pickImage(setLicenseImage)} style={styles.logoBox}>
          {licenseImage ? <Image source={{ uri: licenseImage }} style={styles.image} /> : <Text style={styles.uploadText}>{t('License Image')}</Text>}
        </TouchableOpacity>
      </View>

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
  logoBox: {
    width: 115,
    height: 115,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  uploadText: { color: '#aaa', fontSize: 12 },
  image: { width: '100%', height: '100%', borderRadius: 8 },
  inputFull: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
    marginTop: 0,
  },
  submitButton: { backgroundColor: '#154c79', padding: 12, borderRadius: 10, marginTop: 10, marginBottom: 30 },
  submitText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});

export default TransportTraderScreen;

