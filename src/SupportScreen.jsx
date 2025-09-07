import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SupportScreen = () => {
  const openDialer = () => {
    Linking.openURL('tel:+919876543210').catch(() =>
      Alert.alert('Error', 'Could not open the dialer.')
    );
  };

  const openEmail = () => {
    Linking.openURL('mailto:support@easyship.com').catch(() =>
      Alert.alert('Error', 'Could not open email client.')
    );
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/919876543210').catch(() =>
      Alert.alert('Error', 'Could not open WhatsApp.')
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Support</Text>
      <Text style={styles.subtitle}>We're here to help 24/7</Text>
      <Text style={styles.subtitle}>Need help with your booking or have a question? Our EasyShip E-Transport support team is here for you 24/7.
Call us anytime for immediate assistance or send us an email and we'll get back to you quickly.Your smooth transport experience is our priority.</Text>
      
      <TouchableOpacity style={styles.card} onPress={openDialer}>
        <Icon name="call" size={32} color="#0047AB" />
        <Text style={styles.cardLabel}>Call Us</Text>
        <Text style={styles.details}>+91 98765 43210</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={openEmail}>
        <Icon name="mail" size={32} color="#0047AB" />
        <Text style={styles.cardLabel}>Email Us</Text>
        <Text style={styles.details}>support@easyship.com</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={openWhatsApp}>
        <Icon name="logo-whatsapp" size={32} color="#0047AB" />
        <Text style={styles.cardLabel}>Chat on WhatsApp</Text>
        <Text style={styles.details}>+91 98765 43210</Text>
      </TouchableOpacity>

      
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0047AB',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f5faff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cce5ff',
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0047AB',
    marginTop: 8,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
