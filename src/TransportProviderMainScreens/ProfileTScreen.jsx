// ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CounterContext from '../../CounterContext';
import { Alert } from 'react-native';

const ProfileTScreen = ({navigation}) => {
  const { userData, manufacturerData ,TransportData} = useContext(CounterContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout Cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('WelcomeScreen'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
  source={
    userData.profileImage
      ? { uri: userData.profileImage }
      : require('../../assets/profile.jpg')
  }
  style={styles.profileImage}
/>

<Text style={styles.name}>{userData.first_name || 'N/A'}</Text>
     

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userData.first_name || 'N/A'}</Text>

        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{userData.contact_no || 'N/A'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email || 'N/A'}</Text>

        <Text style={styles.label}>Designation:</Text>
        <Text style={styles.value}>{manufacturerData.designation || 'N/A'}</Text>

        <Text style={styles.label}>Company Name:</Text>
        <Text style={styles.value}>{manufacturerData.companyName || 'N/A'}</Text>

        <Text style={styles.label}>Company Location:</Text>
        <Text style={styles.value}>{manufacturerData.companyAddress || 'N/A'}</Text>

        <Text style={styles.label}>Company Type:</Text>
        <Text style={styles.value}>{manufacturerData.companyType || 'N/A'}</Text>

        <Text style={styles.label}>Registration No.:</Text>
        <Text style={styles.value}>{manufacturerData.companyRegNo || 'N/A'}</Text>

        <Text style={styles.label}>Vehicle No.:</Text>
        <Text style={styles.value}>{TransportData.vehicleNo || 'N/A'}</Text>

        <Text style={styles.label}>Vehicle Name:</Text>
        <Text style={styles.value}>{TransportData.vehicleName || 'N/A'}</Text>

        <Text style={styles.label}>Vehicle Registration number:</Text>
        <Text style={styles.value}>{TransportData.vehicleRegNo || 'N/A'}</Text>

        <Text style={styles.label}>Vehicle Expiry Date:</Text>
        <Text style={styles.value}>{TransportData.vehicleExpiry || 'N/A'}</Text>

        <Text style={styles.label}>Insurance  No.:</Text>
        <Text style={styles.value}>{TransportData.insuranceNo || 'N/A'}</Text>

        <Text style={styles.label}>Insurance Expiry Date:</Text>
        <Text style={styles.value}>{TransportData.insuranceExpiry || 'N/A'}</Text>

        <Text style={styles.label}>Driver Name:</Text>
        <Text style={styles.value}>{TransportData.driverName || 'N/A'}</Text>

        <Text style={styles.label}>Driver address.:</Text>
        <Text style={styles.value}>{TransportData.driverAddress || 'N/A'}</Text>

        <Text style={styles.label}>License Number:</Text>
        <Text style={styles.value}>{TransportData.licenseNo || 'N/A'}</Text>

        <Text style={styles.label}>License Expiry Date:</Text>
        <Text style={styles.value}>{TransportData.licenseExpiry || 'N/A'}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={()=>navigation.navigate("EditTScreen")}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#F6F6F6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
  },
  value: {
    color: '#666',
    fontSize: 15,
  },
  editButton: {
    backgroundColor: '#fff',
    padding: 12,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginBottom: 10,
  },
  editButtonText: {
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#5C9DFF',
    padding: 12,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProfileTScreen;
