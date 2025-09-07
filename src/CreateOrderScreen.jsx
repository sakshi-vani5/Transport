import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const CreateOrderScreen = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [goodsDescription, setGoodsDescription] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    if (
      !pickupLocation ||
      !deliveryLocation ||
      !pickupDate ||
      !vehicleType ||
      !goodsDescription ||
      !weight
    ) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Here you'd normally send this data to your backend!
    Alert.alert(
      'Order Created',
      `Your order has been created successfully!`
    );

    // Clear form
    setPickupLocation('');
    setDeliveryLocation('');
    setPickupDate('');
    setVehicleType('');
    setGoodsDescription('');
    setWeight('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Order</Text>

      <Text style={styles.label}>Pickup Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pickup address"
        value={pickupLocation}
        onChangeText={setPickupLocation}
      />

      <Text style={styles.label}>Delivery Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter delivery address"
        value={deliveryLocation}
        onChangeText={setDeliveryLocation}
      />

      <Text style={styles.label}>Pickup Date</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 2025-07-10"
        value={pickupDate}
        onChangeText={setPickupDate}
      />

      <Text style={styles.label}>Vehicle Type</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Truck, Van"
        value={vehicleType}
        onChangeText={setVehicleType}
      />

      <Text style={styles.label}>Goods Description</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Electronics, Furniture"
        value={goodsDescription}
        onChangeText={setGoodsDescription}
      />

      <Text style={styles.label}>Weight / Volume</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 500kg, 2m³"
        value={weight}
        onChangeText={setWeight}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#003366',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateOrderScreen;
