import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const GpsOffScreen = () => {
  const handleGpsEnable = () => {
    Alert.alert('GPS', 'Redirecting to enable GPS...');
    // Here, use a native module or package like react-native-permissions or react-native-geolocation-service
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/GpsTruck.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>GPS is turned off</Text>
      <Text style={styles.subtitle}>
        Allow EasyShip Transport to turn on your GPS for terr truc recommendation
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGpsEnable}>
        <Text style={styles.buttonText}>TURN ON GPS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GpsOffScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 30,
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
   
    color: '#444',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#002D62',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
