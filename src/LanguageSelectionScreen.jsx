import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from './i18n';

const LanguageSelectionScreen = ({navigation}) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिंदी (Hindi)' },
    { id: 'ta', label: 'தமிழ் (Tamil)' },
    { id: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { id: 'te', label: 'తెలుగు (Telugu)' },
  ];

  const handleConfirm = async() => {
    await changeAppLanguage(selectedLanguage);
    navigation.navigate("ProfileSelectionScreen")
  };

  const renderLanguage = ({ item }) => (
    <TouchableOpacity
      style={styles.languageRow}
      onPress={() => setSelectedLanguage(item.id)}
    >
      <View style={styles.checkbox}>
        {selectedLanguage === item.id && (
          <Icon name="check" size={16} color="black" />
        )}
      </View>
      <Text style={styles.languageLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/language.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.subtext}>{t('language_note')}</Text>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={renderLanguage}
      />

      <TouchableOpacity
        style={[styles.confirmButton, { backgroundColor: '#154c79' }]}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmText}>{t('Confirm')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  image: { height: 250, width: '100%', marginBottom: 20 },
  subtext: { textAlign: 'center', marginBottom: 15 },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderColor: '#ccc',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageLabel: { fontSize: 16 },
  confirmButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
