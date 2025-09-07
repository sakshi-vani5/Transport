import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Linking,
    Image,
} from 'react-native';


const PermissionsScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header with icon */}
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.header}>ShipEasy Transport</Text>
                    <Text style={styles.subHeader}>Need permission to</Text>
                </View>

                <Image
                    source={require('../assets/tractor.png')}
                    style={styles.truckImage}
                />
            </View>

            {/* Location permission */}
            <View style={styles.permissionItem}>
                <Image
                    source={require('../assets/location-iconn.png')}
                    style={styles.image}>


                </Image>

                <View style={styles.textBlock}>
                    <Text style={styles.title}>Store your location</Text>
                    <Text style={styles.description}>
                        ShipEasy transport stores your location data to update your profile
                        with location. This will help the truck owners in your current
                        location connect with you for business.
                    </Text>
                </View>
            </View>

            {/* Manage calls */}
            <View style={styles.permissionItem}>
                <Image
                    source={require('../assets/call-iconn.png')}
                    style={styles.image}>


                </Image>
                <View style={styles.textBlock}>
                    <Text style={styles.title}>Manage phone calls</Text>
                    <Text style={styles.description}>
                        ShipEasy Transport needs to manage your phone calls to help you
                        call truck owners with one tap from the app.
                    </Text>
                </View>
            </View>

            {/* Store call logs */}
            <View style={styles.permissionItem}>
                <Image
                    source={require('../assets/call-iconn.png')}
                    style={styles.image}>


                </Image>
                <View style={styles.textBlock}>
                    <Text style={styles.title}>Store your call logs</Text>
                    <Text style={styles.description}>
                        ShipEasy Transport store your call log data to sync your call
                        history ans show caller ID. This will help your identity a ShipEasy
                        truck owner.
                    </Text>
                </View>
            </View>
            

            {/* Privacy policy text */}
            <Text style={styles.privacyText}>
                To know more about how we collect and use your data, please read our{' '}
                <Text
                    style={styles.link}
                    onPress={() => Linking.openURL('https://example.com/privacy')}>
                    Privacy Policy
                </Text>
            </Text>

            <Text style={styles.privacyText}>
                By selecting “Agree” you confirm that you have read and agree to the{' '}
                <Text
                    style={styles.link}
                    onPress={() => Linking.openURL('https://example.com/privacy')}>
                    Privacy Policy
                </Text>
            </Text>

            {/* Agree button */}
            <TouchableOpacity style={styles.agreeButton} onPress={() => navigation.navigate('LanguageSelectionScreen')}>
                <Text style={styles.agreeText}>AGREE</Text>
            </TouchableOpacity>

            {/* Disagree text */}
            <TouchableOpacity>
                <Text style={styles.disagreeText}>DISAGREE</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    truckImage: {
        width: 170,
        height: 80,
        resizeMode: 'contain',
    },

    image: {
        width: 30,
        height: 28,

    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 16,
    },
    permissionItem: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    textBlock: {
        marginLeft: 10,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    privacyText: {
        fontSize: 13,
        color: '#333',
        marginBottom: 20,
    },
    link: {
        color: '#0066cc',
        textDecorationLine: 'underline',
    },
    agreeButton: {
        backgroundColor: '#003366',
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
        marginVertical: 12,
    },
    agreeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    disagreeText: {
        color: '#999',
        textAlign: 'center',
        fontSize: 14,
    },
});
