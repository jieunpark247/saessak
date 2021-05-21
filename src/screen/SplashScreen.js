// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
//import {
// widthPercentageToDP as wp,
// heightPercentageToDP as hp,
//} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    console.log('Signed in with Google! agsdsa');
    setTimeout(() => {
      // setAnimating(false);
      //console.log('Signeasdas');
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen  LoginScreen Boar

      <View>
        <Image
          source={require('../assets/images/background-up.png')}
          style={{width: 55, resizeMode: 'contain', margin: 30}}
        />
      </View>;
      //  <ActivityIndicator
      //    animating={animating}
      //    color="#6990F7"
      //    size="large"
      //    style={styles.activityIndicator}
      //  />
    }, 5000);
    /*
    AsyncStorage.getItem('uid').then(value =>
      value === null
        ? navigation.navigate('LoginScreen')LoginScreen
        : navigation.navigate('Board'),Board
    );
    */
    /*
    AsyncStorage.getItem('uid').then(value =>
      value === null
        ? navigation.navigate('Board')
        : navigation.navigate('LoginScreen'),
    );
    */

    navigation.navigate('LoginScreen');
  });

  return (
    <View style={styles.container}>
      {/*} <Image
        source={require('./src/assets/images/background-up.png')}
        style={{width: wp(55), resizeMode: 'contain', margin: 30}}
  /> */}
      <ActivityIndicator
        animating={animating}
        color="#6990F7"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
