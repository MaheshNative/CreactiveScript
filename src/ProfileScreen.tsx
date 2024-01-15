import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
         <View style={{flexDirection:'row',marginTop:'10%', paddingBottom:20 }}>
         <Image
            source={require('./Assets/Img.png')}
            style={{left:'10%',}}
          />
          <TouchableOpacity>
          <Image
            source={require('./Assets/icon.png')}
            style={{top:'60%', right:'50%'}}
          />
          </TouchableOpacity>
         </View>
           

        <Text style={{color:'#333333', fontWeight:'bold', fontSize:20}}>Merunde Jesus</Text>
        <Text style={{color:'#B3B3B3', paddingBottom:'10%'}}>merum@gmail.com</Text>
      <TouchableOpacity
        onPress={() => Alert.alert('Profile Screen pressed')}
        style={styles.buttonContainer}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require('./Assets/profile.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Account Information</Text>
        </View>
        <Image
          source={require('./Assets/right.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert('Profile Screen pressed')}
        style={styles.buttonContainer}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require('./Assets/shield.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Google Business Profile</Text>
        </View>
        <Image
          source={require('./Assets/right.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert('Profile Screen pressed')}
        style={styles.buttonContainer}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require('./Assets/people.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Team Members</Text>
        </View>
        {/* <Image
          source={require('./Assets/right.png')}
          style={styles.arrowIcon}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    padding: 10,
    borderRadius: 8,
    width: '85%',
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: 'blue',
  },
  buttonText: {
    padding: 10,
  },
  arrowIcon: {
    width: 8,
    height: 15,
    tintColor: 'blue',
  },
});

export default ProfileScreen;
