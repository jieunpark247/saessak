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
 //   AsyncStorage.setItem('users' ,JSON.stringify({ userId: user.uid, 'email': user.email, 'guName': inputText })) //이렇게 넣어줘 
    AsyncStorage.setItem('email', user.email);
    AsyncStorage.setItem('uid', user.uid);

    AsyncStorage.setItem('district', inputText);


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
      <SafeAreaView style={styles.container}>
        <ImageBackground
                source={require('../assets/images/saessak_head.png')}
                resizeMode="contain"
                style={styles.backImage}>
               
          <View style={styles.row_01}>
            <View style={styles.logoSettingRow}>   
              <Image
                source={require('../assets/images/saessak-logo-03.png')}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.logoStyle}>새싹</Text>
            </View>
          </View> 
        <Text style={styles.textStyle}>지역구를 입력하세요.</Text>
      
       </ImageBackground>
       <TextInput
            style = {styles.inputBox}
            placeholder={district}
            value={inputText}
            onChangeText={value => setInputText(value)}
          />
      <View style={styles.root}>
         <TouchableOpacity
              onPress={() =>
                onGoogleButtonPress().then(() => console.log('Signed Google!'))
              }
              style={styles.button_01}>
             <Image
              source={require('../assets/images/google.login.png')}
              style ={styles.loginImg}
            />
        </TouchableOpacity>
       
          <TouchableOpacity
              onPress={() =>
                onGoogleButtonPress().then(() => console.log('Signed Google!'))
              }
              style={styles.button_02}>
              <Image
              source={require('../assets/images/google.login.png')}
              style ={styles.loginImg}
            />
          </TouchableOpacity>

          <ImageBackground
                source={require('../assets/images/saessak_bottom.png')}
                style={styles.imageDown}>
        </ImageBackground>
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
  container: {
    flex: 1,
  },
  root: {
    top: 180,
    flex: 1,
  },
  backImage: {
    top: -52,
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  row_01 : {
    top: 280,
},
  logoStyle: {
    top: 20,
    textAlign: 'center',
    fontFamily: 'roboto-700',
    color: 'rgba(27,100,50,1)',
    fontWeight: 'bold',
    fontSize: 30,
  },
  logoSettingRow: {
    top: 20,
    alignItems: 'center',
  },
  textStyle: {
    top: 315,
    textAlign: 'center',
    fontFamily: 'roboto-700',
    color: 'rgba(60,130,70,1)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputBox: {
    top: 225,
    left : 104,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 2,
    backgroundColor: 'white',
    color : 'black',
    borderColor: 'green',
    height: 40,
    width: 210,
  },
  root_03: {
    flex: 1,
  },
  button_01: {
    marginTop:70,
    width: '100%',
    height: 90,
    borderRadius: 40,
    position: 'absolute',
    alignItems: 'center',
  },
  loginImg: {
    width: 220,
    height: 110,
  },
  button_02: {
    marginTop:130,
    width: '100%',
    height: 90,
    borderRadius: 40,
    position: 'absolute',
    alignItems: 'center',
  },
  imageDown :{
    alignItems: 'center',
    bottom : -250,
    width: '100%',
    height: 200,
  }
});

export default LoginScreen;
