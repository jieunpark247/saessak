// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      /*
      <View style={styles.container}>
        <View>
          <Image
            source={require('../assets/images/background-up.png')}
            style={{width: 55, resizeMode: 'contain', margin: 30}}
          />
        </View>
        <ActivityIndicator
          animating={animating}
          color="#6990F7"
          size="large"
          style={styles.activityIndicator}
        />
      </View>;*/
      AsyncStorage.getItem('session').then(value =>
        value === null
          ? navigation.navigate('LoginScreen')
          : navigation.navigate('Board'),
      );
    }, 5000);
    /*
    AsyncStorage.getItem('uid').then(value =>
      value === null
        ? navigation.navigate('LoginScreen')LoginScreen
        : navigation.navigate('Board'),Board
    );
    */
    setTimeout(() => {
      AsyncStorage.getItem('session').then(value =>
        value === null
          ? navigation.navigate('LoginScreen')
          : navigation.navigate('Board'),
      );
    }, 3000);
    //navigation.navigate('LoginScreen');
  });

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/images/splash5.png')}
          style={{
            resizeMode: 'cover',
            width: wp(100),
            height: hp(100),
            //margin: 30,
          }}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: 'white',
  },
});
