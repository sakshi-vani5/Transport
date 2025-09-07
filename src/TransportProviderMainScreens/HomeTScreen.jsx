import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const products = [
  {
    id: '1',
    name: 'Birla company',
    weight: '500 GMS',
    price: '₹45.00',
    image: require('../../assets/fridge.png'),
  },
  {
    id: '2',
    name: 'Mahindra Company',
    weight: '500 GMS',
    price: '₹38.00',
    image: require('../../assets/fridge.png'),
  },
  {
    id: '3',
    name: 'MI company',
    weight: '500 GMS',
    price: '₹35.00',
    image: require('../../assets/fridge.png'),
  },
  {
    id: '4',
    name: 'Parle Company',
    weight: '500 GMS',
    price: '₹32.00',
    image: require('../../assets/fridge.png'),
  },
];

const ProductCard = ({ item }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.weight}>{item.weight}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

const HomeTScreen = () => {
  const navigation = useNavigation();

  const TabButton = ({ label, icon, navigateTo }) => (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={() => {
        if (navigateTo) {
          navigation.navigate(navigateTo);
        }
      }}
    >
      <Icon name={icon} size={22} color={'gray'} />
      <Text style={styles.tabText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Bookings List</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} />}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>

      <View style={styles.bottomTab}>
        <TabButton label="Home" icon="home-outline" navigateTo="HomeTScreen" />
        <TabButton label="Wallet" icon="wallet-outline" navigateTo="WalletScreen" />
        <TabButton label="Orders" icon="list-outline" navigateTo="OrderTScreen" />
        <TabButton label="Profile" icon="person-outline" navigateTo="ProfileTScreen" />
      </View>
    </View>
  );
};

export default HomeTScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#00BCD4',
    color: '#fff',
    textAlign: 'center',
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  weight: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#e53935',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
    color: 'gray',
  },
});
