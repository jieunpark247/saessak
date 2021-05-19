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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';

async function onGoogleButtonPress() {
  // Get the users ID token
  try {
    console.log('Signed in with Google! 1');
    const {idToken} = await GoogleSignin.signIn();

    console.log('Signed in with Google! 2');
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredential);

    console.log('Signed in with Google! 3');

    const user = auth().currentUser;

    console.log('Signed in with Google! 4' + user.uid);

    AsyncStorage.setItem('email', user.email);
    AsyncStorage.setItem('uid', user.uid);
    //    AsyncStorage.setItem('email', user.email);

    AsyncStorage.getItem('email', (err, result) => {
      //user_id에 담긴 아이디 불러오기
      console.log(result); // result에 담김 //불러온거 출력
    });

    return idToken;

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

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '352605031231-8mnkgp0h4kslqn9h2legb3mjs40ioe5l.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  forceConsentPrompt: true,
});

function LoginScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [district, setDistrict] = useState('');
  const [inputText, setInputText] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let userToken = null;

  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');

    userToken = AsyncStorage.getItem('uid');
    console.log('변수' + userToken.uid);

    AsyncStorage.getItem('district', (err, result) => {
      setDistrict(result);
      console.log(district);
      //user_id에 담긴 아이디 불러오기
    });

    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  if (!userToken) {
    return (
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/images/background-up.png')}
          resizeMode="contain" // logoSettingRow
          style={styles.backImage}>
          <View style={styles.logoSettingRow}>
            <Image
              source={require('../assets/images/saessak_logo.png')}
              resizeMode="contain"
              style={styles.loginLoge}></Image>
          </View>
          <View>
            <Text style={styles.logoStyle}>새싹</Text>
          </View>
          <View>
            <Text style={styles.textStyle}>지역구를 입력하세요.</Text>
          </View>
          <View style={styles.root}>
            <TextInput
              style={styles.TextInput}
              placeholder={district}
              value={inputText}
              onChangeText={value => setInputText(value)}
              //autoCapitalize="none"
              //returnKeyType="next"
              //    onSubmitEditing={
              //    () => console.log('erroe else ' + error.code)
              //    passwordInputRef.current && passwordInputRef.current.focus()
              //   }
              //blurOnSubmit={false}
            />
          </View>
          <View>
            <Button
              title="Google Sign-In"
              onPress={() =>
                onGoogleButtonPress().then(() => console.log('Signed Google!'))
              }
            />
          </View>
        </ImageBackground>
        <View style={styles.levelImg}>
          <Button
            title="Google Sign-In"
            onPress={() => AsyncStorage.setItem('district', inputText)}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <View title="Login">
              <Button
                title="시작하기"
                onPress={() => navigation.navigate('Board')}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    // marginTop: 400,
    // marginLeft: -180,
    //left: 0,
    //top: 400,
  },
  TextInput: {
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: 'green',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    height: 40,
    width: 200,
    position: 'absolute',
    //  marginTop: 400,
    //   marginLeft: -180,
    // left: 0,
    // top: 400,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  image: {
    top: 0,
    width: 450,
    height: 200,
    position: 'absolute',
    left: -1,
    flexDirection: 'row',
  },
  backImage: {
    //top: -300,
    width: '100%',
    height: '55%',
    left: -1,
    flexDirection: 'row',
  },
  image_imageStyle: {},
  imageSetting: {
    height: 28,
    width: 28,
    marginTop: -7,
    marginLeft: -2,
  },
  saessakLogo: {
    height: 40,
    width: 40,
    marginLeft: 320,
    marginTop: -8,
  },
  imageSettingRow: {
    height: 40,
    flexDirection: 'row',
    flex: 1,
    marginRight: 14,
    marginLeft: 12,
    marginTop: 150,
  },
  logoSettingRow: {
    top: 182,
    left: 161,
    //height: 470,
    //width: 300,
    flexDirection: 'column',
    alignItems: 'center',
  },
  firstBoard: {
    top: 182,
    left: 21,
    width: 365,
    height: 180,
    position: 'absolute',
    backgroundColor: 'rgba(230,230,230,0.6)',
    borderRadius: 15,
  },
  whiteBoard: {
    width: 320,
    height: 140,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 15,
    flexDirection: 'row',
    marginTop: 17,
    marginLeft: 20,
  },
  levelImg: {
    width: 105,
    height: 116,
  },
  myLevel: {
    fontFamily: 'roboto-700',
    color: 'rgba(34,39,31,1)',
    height: 32,
    width: 101,
    fontSize: 22,
    marginTop: 15,
  },
  areaImg: {
    width: 75,
    height: 75,
    marginLeft: 13,
    marginTop: 2,
  },
  whiteBoardView: {
    height: 116,
    flexDirection: 'row',
    flex: 1,
    marginRight: 11,
    marginTop: 4,
  },
  image9_imageStyle: {},
  n건: {
    fontFamily: 'calibri-bold',
    color: '#121212',
    height: 22,
    width: 34,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 32,
    marginLeft: 19,
  },
  startArea: {
    fontFamily: 'calibri-bold',
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
  },
  button: {
    top: 290,
    left: 170,
    width: 160,
    height: 50,
    alignItems: 'center',
    backgroundColor: '#7cc594',
    padding: 10,
    position: 'absolute',
    borderRadius: 40,
  },
  image9: {
    top: 220,
    //left: 145,
    width: 85,
    textAlign: 'center',
    height: 85,
    position: 'absolute',
  },
  image9Stack: {
    top: 0,
    left: 0,
    width: 140,
    height: 108,
    position: 'absolute',
  },
  logoStyle: {
    top: 280,
    left: 81,
    fontFamily: 'roboto-700',
    color: 'rgba(27,100,50,1)',
    height: '100%',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textStyle: {
    top: 340,
    left: -10,
    fontFamily: 'roboto-700',
    color: 'rgba(60,130,70,1)',
    height: '100%',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 15,
  },
  image9StackStack: {
    width: 171,
    height: 108,
    marginTop: 5,
    marginLeft: 14,
  },
  imageStack: {
    top: 0,
    left: 0,
    width: 380,
    height: 437,
    position: 'absolute',
  },
  secondBoard: {
    top: 370,
    left: 21,
    width: 365,
    height: 180,
    position: 'absolute',
    backgroundColor: 'rgba(239,249,236,1)',
    borderRadius: 15,
  },
  secondWhiteBoard: {
    width: 330,
    height: 115,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 15,
    marginTop: 5,
    marginLeft: 15,
  },
  envTitleRow: {
    height: 20,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  title_01: {
    width: 70,
    height: 20,
    fontFamily: 'roboto-700',
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 20,
  },

  loginLoge: {
    alignItems: 'center',
  },
  title_01_water: {
    width: 100,
    height: 40,
    fontFamily: 'roboto-700',
    color: 'rgba(158,158,158,1)',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 3,
    marginLeft: 5,
  },
  envTitleRes: {
    height: 20,
    flexDirection: 'row',
    marginTop: 6,
    marginLeft: 20,
    marginRight: 20,
  },
  res_01: {
    width: 70,
    height: 20,
    fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 20,
  },
  res_01_red: {
    width: 70,
    height: 20,
    fontFamily: 'roboto-regular',
    color: 'red',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 20,
  },
  listBox: {
    width: 380,
    height: 545,
    marginTop: -52,
    marginLeft: 1,
  },
  districtBox: {
    fontFamily: 'roboto-regular',
    left: -50,
    top: 400,
    width: 200,
    height: 50,
    //backgroundColor: 'rgba(255 ,255,255,0.6)',
    //borderRadius: 15,
    fontSize: 20,
    textAlign: 'left',
  },
  barcodeText: {
    top: 400,
    left: -200,
    width: 200,
    fontFamily: 'roboto-regular',
    color: 'rgba(0,0,0,1)',
    backgroundColor: 'rgba(255,255,255,0.6)',
    textAlign: 'left',
    fontSize: 15,
    marginLeft: 7,
  },
  barcodeColumn: {
    width: 130,
    marginTop: 1,
  },
  recycleImg: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
  },
  recycleCount: {
    fontFamily: 'roboto-regular',
    color: 'rgba(249,6,6,1)',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
  recycleImgRow: {
    height: 40,
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 35,
  },
  dateImg: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    marginLeft: 12,
    marginBottom: 5,
  },
  dateText: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 7,
    marginTop: 46,
    marginBottom: 9,
  },
  image16: {
    height: 65,
    width: 65,
    marginLeft: 35,
  },
  listItem: {
    height: 73,
    flexDirection: 'row',
    marginTop: 13,
    marginLeft: 5,
    marginRight: 15,
  },
});

export default LoginScreen;
