import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help & FAQs</Text>
      <Text style={styles.subtitle}>Get answers to your questions</Text>

      <View style={styles.card}>
        <Icon name="help-circle" size={30} color="#0047AB" />
        <Text style={styles.question}>How do I book a truck?</Text>
        <Text style={styles.answer}>
          Go to 'Book Truck' on the Home screen, fill details and confirm your booking in minutes.
        </Text>
      </View>

      <View style={styles.card}>
        <Icon name="eye" size={30} color="#0047AB" />
        <Text style={styles.question}>How can I track my shipment?</Text>
        <Text style={styles.answer}>
          Use 'Show Order' to see live tracking of all your deliveries.
        </Text>
      </View>

      <View style={styles.card}>
        <Icon name="call" size={30} color="#0047AB" />
        <Text style={styles.question}>Need more help?</Text>
        <Text style={styles.answer}>
          Contact our support team anytime. We’re here 24/7 for you.
        </Text>
      </View>
    </ScrollView>
  );
};

export default HelpScreen;

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
    borderWidth: 1,
    borderColor: '#cce5ff',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0047AB',
    marginTop: 8,
  },
  answer: {
    fontSize: 15,
    color: '#555',
    marginTop: 4,
    lineHeight: 22,
  },
});
