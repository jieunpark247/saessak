import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Animated,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

//import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, Component} from 'react';
//import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

async function onGoogleButtonPress(inputText) {
  // Get the users ID token
  try {
    // GoogleSignin을 통해 토큰 얻어오기
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);

    const user = auth().currentUser; // 현재 유저 데이터 가져오기

    console.log('erroe 1 ' + user.uid);
    console.log('erroe 2 ' + user.email);
    console.log('erroe 3 ' + inputText);

    AsyncStorage.setItem(
      'users',
      JSON.stringify({
        userId: user.uid,
        email: user.email,
        guName: inputText,
      }),
    ); // 유저스에 데이터 넣기 , 유저아이디는 구글에서 얻어고, 지역구값은 ui에서 얻어온다.

    AsyncStorage.getItem('users', (err, result) => {
      const UserInfo = JSON.parse(result);
      console.log('1 : ' + UserInfo.userId); // 출력 => 닉네임 : User1
      console.log('2 : ' + UserInfo.email); //  출력 => 휴대폰 : 010-xxxx-xxxx
      console.log('3 : ' + UserInfo.guName); //  출력 => 휴대폰 : 010-xxxx-xxxx
    });

    AsyncStorage.setItem('session', 'login', () => {
      console.log('세션');
    });

    return idToken; // 토큰값 리턴

    // Sign-in the user with the credential
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('erroe 1 ' + statusCodes.SIGN_IN_CANCELLED);
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('erroe 2 ' + statusCodes.IN_PROGRESS);
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('erroe 3 ' + statusCodes.PLAY_SERVICES_NOT_AVAILABLE);
      // play services not available or outdated
    } else {
      console.log('erroe else ' + error.code);
      // some other error happened
    }
  }
}

import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '352605031231-8mnkgp0h4kslqn9h2legb3mjs40ioe5l.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  forceConsentPrompt: true,
});

function LoginScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [inputText, setInputText] = useState('');
  let distData = [
    {value: '강남구'},
    {value: '강동구'},
    {value: '강북구'},
    {value: '강서구'},
    {value: '관악구'},
    {value: '광진구'},
    {value: '구로구'},
    {value: '금천구'},
    {value: '노원구'},
    {value: '도봉구'},
    {value: '동대문구'},
    {value: '동작구'},
    {value: '마포구'},
    {value: '서대문구'},
    {value: '서초구'},
    {value: '성동구'},
    {value: '성북구'},
    {value: '송파구'},
    {value: '양천구'},
    {value: '영등포구'},
    {value: '용산구'},
    {value: '은평구'},
    {value: '종로구'},
    {value: '중구'},
    {value: '중랑구'},
  ];
  // const [value, setValue] = useState('');
  const values = [{age: 'option1', name: 'option2'}];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let userToken = null;

  useEffect(() => {
    userToken = AsyncStorage.getItem('uid');
    //console.log('변수' + userToken.uid);
    AsyncStorage.getItem('users', (err, result) => {
      const UserInfo = JSON.parse(result);
      if (UserInfo) {
        setInputText(UserInfo.guName);
      }
    });
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/saessak_head.png')}
        resizeMode="contain"
        style={styles.topBackImage}></ImageBackground>
      <View style={styles.logoImage}>
        <Image
          source={require('../assets/images/saessak-logo-03.png')}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.logoName}>새싹</Text>
        </View>
      </View>

      <Animated.View style={styles.dropBoxView}>
        <Dropdown
          style={styles.dropBox}
          placeholder="지역구를 선택하세요"
          data={distData}
          onChangeText={value => setInputText(value)}
        />
      </Animated.View>
      <View style={styles.googleLoginRoot}>
        <TouchableOpacity
          disabled={inputText ? false : true}
          onPress={() =>
            onGoogleButtonPress(inputText).then(() =>
              navigation.navigate('Board'),
            )
          }
          style={styles.googleLoginImgView}>
          {inputText ? (
            <Image
              source={require('../assets/images/google.login.png')}
              style={styles.googleLoginImg}
            />
          ) : (
            <Image
              source={require('../assets/images/google.login_gray.png')}
              style={styles.googleLoginImg}
            />
          )}
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../assets/images/saessak_bottom.png')}
        style={styles.bottomBackImage}></ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  topBackImage: {
    top: wp(-15),
    width: wp('100'),
    height: hp('30'),
    alignItems: 'center',
  },
  bottomBackImage: {
    top: wp(10),
    alignItems: 'center',
    //bottom: -250,
    width: wp('100'),
    height: hp('30'),
  },
  logoRoot: {
    //top: wp(0),
    alignItems: 'center',
  },
  logoImage: {
    top: wp(-10), //-110
    //left: wp(-1),
    //left: 20, // 20
    width: wp('100%'),
    height: hp('10%'),
    alignItems: 'center',
  },
  logoName: {
    top: wp(2), //-110
    //\\\left: wp(-1),
    textAlign: 'center',
    fontFamily: 'roboto-700',
    color: 'rgba(27,100,50,1)',
    fontWeight: 'bold',
    fontSize: wp(7),
  },
  dropBoxView: {
    margin: hp(10),
    // top: hp(20),
    //left: hp(26),
    alignItems: 'center',
    textAlign: 'center',
    // borderWidth: 2,
    //backgroundColor: 'blue',
    //color: 'black',
    //borderColor: 'green',
    height: hp(5),
    width: wp(45),

    //height: 5,
    //width: 300,
  },
  dropBox: {
    //top: -100,
    //left: 58,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'green',
    height: hp(5),
    width: wp(45),

    //height: 5,
    //width: 300,
  },
  googleLoginRoot: {
    top: hp(-5),
    flex: 1,
    alignItems: 'center',
  },
  googleLoginImgView: {
    alignItems: 'center',
    //left: hp(18),
    width: wp(51),
    height: hp(10),
    borderRadius: 40,
    position: 'absolute',
  },
  googleLoginImg: {
    //  alignItems: 'center',
    width: wp(51),
    height: hp(10),
  },
});

export default LoginScreen;
