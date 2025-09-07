import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';

const SuccessScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Icon name="check" size={40} color="#154c79" />
      </View>

      <Text style={styles.title}>{t('congratulations')}</Text>
      <Text style={styles.subtitle}>{t('registration_success')}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')} // Update to match your login screen
      >
        <Text style={styles.buttonText}>{t('login')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e7e9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconBox: {
    borderWidth: 2,
    borderColor: '#154c79',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#154c79',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#154c79',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#154c79',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SuccessScreen;
