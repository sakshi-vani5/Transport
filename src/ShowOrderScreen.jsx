import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const orders = [
  {
    id: '1001',
    pickup: 'London',
    destination: 'Birmingham',
    date: '2023-04-20',
    status: 'Completed',
    vehicle: 'Truck',
  },
  {
    id: '1002',
    pickup: 'London',
    destination: 'Manchester',
    date: '2023-04-15',
    status: 'Completed',
    vehicle: 'Van',
  },
  {
    id: '1003',
    pickup: 'Bristol',
    destination: 'Wednesdayao', // Matches typo in picture
    date: '2023-04-10',
    status: 'Pending',
    vehicle: 'Van',
  },
  {
    id: '1004',
    pickup: 'Pending',
    destination: '',
    date: '',
    status: '',
    vehicle: '',
  },
];

const OrderCard = ({ order }) => {
  const statusColor = order.status === 'Completed' ? 'green' : 'orange';

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>{order.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Pickup:</Text>
        <Text style={styles.value}>{order.pickup}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Destination:</Text>
        <Text style={styles.value}>{order.destination}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{order.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Vehicle:</Text>
        <Text style={styles.value}>{order.vehicle}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, { color: statusColor }]}>{order.status}</Text>
      </View>
    </View>
  );
};

const ShowOrderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Order List</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 13,
    textAlign: 'center',
    marginTop:13
  },
  listContent: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
  },
  value: {
    flex: 1,
  },
});

export default ShowOrderScreen;
