


import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import HeaderProfile from './HeaderProfile';
import RatingsScreen from './RatingsScreen';
import CreateOrderScreen from './CreateOrderScreen';
import ShowOrderScreen from './ShowOrderScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => (
   
  <ScrollView >
     <HeaderProfile />
  <View style={styles.container}>
    <Text style={styles.title}>EasyShip E-Transport</Text>
    <Text style={styles.subtitle}>Fast. Reliable. Hassle-Free Transport Booking.</Text>

    <Text style={styles.body}>
      Welcome to EasyShip E-Transport!
      Whether you're a manufacturer sending stock or a transporter looking for your next delivery, our platform makes it simple.
      Book a truck, track your shipment, manage orders, and connect with professional drivers — all in one place.
      {'\n'}
      Save time, reduce costs, and keep your business moving with our easy-to-use mobile app.
    </Text>

    <RatingsScreen />

    <Text style={styles.sectionTitle}>Your Quick Actions</Text>

    <View style={styles.cardGrid}>
      <TransportCard
        icon="cube-outline"
        label="Book Truck"
        onPress={() => navigation.navigate('CreateOrderScreen')}
      />
      <TransportCard
        icon="call-outline"
        label="Support"
        onPress={() => navigation.navigate('SupportScreen')}
      />
      <TransportCard
        icon="eye-outline"
        label="Show Order"
        onPress={() => navigation.navigate('ShowOrderScreen')}
      />
      <TransportCard
        icon="help-circle-outline"
        label="Help"
        onPress={() => navigation.navigate('HelpScreen')}
      />
    </View>

    <View style={styles.bullets}>
      <Text style={styles.bullet}>✅ Book Transport in Minutes</Text>
      <Text style={styles.bullet}>✅ Send Stock Securely</Text>
      <Text style={styles.bullet}>✅ Track Live Deliveries</Text>
      <Text style={styles.bullet}>✅ View Order History</Text>
      <Text style={styles.bullet}>✅ Get Help Anytime</Text>
    </View>
   </View> 
  </ScrollView>
);

const TransportCard = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Icon name={icon} size={30} color="#0047AB" />
    <Text style={styles.cardLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function App() {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Create') iconName = 'add-circle-outline';
            else if (route.name === 'Orders') iconName = 'list-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0047AB',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create" component={CreateOrderScreen} />
        <Tab.Screen name="Orders" component={ShowOrderScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
   
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#0047AB', marginTop: 20 },
  subtitle: { fontSize: 16, marginBottom: 15, color: '#555' },
  body: { fontSize: 15, lineHeight: 22, color: '#333', marginBottom: 20 },
  bullets: { marginTop: 20, marginBottom: 50 },
  bullet: { fontSize: 15, marginVertical: 5, color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0047AB', marginVertical: 20 },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#f5faff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#cce5ff',
    borderWidth: 1,
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 15,
    color: '#0047AB',
    textAlign: 'center',
  },
});





