// import React, { useContext } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import CounterContext from '../CounterContext';

// const HeaderProfile = () => {
//   const { userData } = useContext(CounterContext);
//   const { firstName, phoneNumber, profileImage } = userData;

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftContainer}>
//         <Text style={styles.mobile}>{phoneNumber}</Text>
//       </View>

//       <View style={styles.rightContainer}>
//         <Image
//           source={profileImage ? { uri: profileImage } : require('../assets/tractor.png')}
//           style={styles.profileImage}
//         />
//         <Text style={styles.name}>{firstName}</Text>
//       </View>
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
   
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   leftContainer: {
//     flex: 1,
//   },
//   mobile: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   rightContainer: {
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#ccc',
//   },
//   name: {
//     marginTop: 6,
//     fontSize: 14,
//     color: '#333',
//   },
// });
// export default HeaderProfile






import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CounterContext from '../CounterContext';

const HeaderProfile = () => {
  const { userData } = useContext(CounterContext);
 const { first_name, contact_no, person_photo } = userData;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{first_name || 'User'}</Text>
          <Text style={styles.mobile}>{contact_no || 'N/A'}</Text>
        </View>
        <Image
          source={person_photo? { uri: person_photo } : require('../assets/profile.jpg')}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0047AB',
  },
  mobile: {
    fontSize: 14,
    color: '#555',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
});

export default HeaderProfile;
