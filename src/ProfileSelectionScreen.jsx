

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ProfileSelectionScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  const handleSelect = async (type) => {
    setSelected(type);

    // Map type to user_type expected by API
    const userType =
      type === 'manufacturer' ? 'industrial_owner' : 'vehicle_owner';

    try {
      const response = await axios.post(
        'https://e00ed9322d4b.ngrok-free.app/api/accounts/register/user-type/',
        {
          user_type: userType,
        },
        {
          headers: {
            'Content-Type': 'application/json',
           
          },
        }
      );

      console.log('User type registered:', response.data);
      if (type === 'manufacturer') {
        navigation.navigate('ManufacturerScreen');
        console.log("Manufacturer Screen calls",response.data)
      } else {
        navigation.navigate('TransportTraderScreen');
        console.log("Transport Provider Screen calls")
      }

    } catch (error) {
  if (error.response) {
    console.error('API Error:', error.response.data);
    Alert.alert('Server Error', JSON.stringify(error.response.data));
  } else if (error.request) {
    console.error('No response:', error.request);
    Alert.alert('Network Error', 'No response from server.');
  } else { 
    console.error('Error:', error.message);
    Alert.alert('Error', error.message);
   }
}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('find_transport_solution')}</Text>
      <Text style={styles.subtitle}>{t('select_profile')}</Text>

      {/* Manufacturer/Trader card */}
      <TouchableOpacity
        style={[styles.card, selected === 'manufacturer' && styles.cardSelected]}
        onPress={() => handleSelect('manufacturer')}
      >
        <View style={styles.cardContent}>
          <View style={styles.textWrapper}>
            <Text style={styles.cardTitle}>{t('manufacturer_trader')}</Text>
            <Text style={styles.cardDescription}>{t('post_transportation')}</Text>
          </View>
          <Image
            source={require('../assets/factory-icon.png')}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>

      {/* Transport Provider card */}
      <TouchableOpacity
        style={[styles.card, selected === 'provider' && styles.cardSelected]}
        onPress={() => handleSelect('provider')}
      >
        <View style={styles.cardContent}>
          <View style={styles.textWrapper}>
            <Text style={styles.cardTitle}>{t('transport_provider')}</Text>
            <Text style={styles.cardDescription}>{t('receive_offers')}</Text>
            <Text style={styles.cardDescription}>{t('provider')}</Text>
          </View>
          <Image
            source={require('../assets/truck-icon.png')}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  cardSelected: {
    borderColor: '#003366',
    backgroundColor: '#f0f6ff',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  cardDescription: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  icon: {
    width: 40,
    height: 45,
  },
});

export default ProfileSelectionScreen;
