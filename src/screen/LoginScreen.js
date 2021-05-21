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

//import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, Component} from 'react';
//import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
//import {createStackNavigator} from '@react-navigation/stack';
//import {Dropdown} from 'react-native-material-dropdown';
//import DropDownPicker from 'react-native-dropdown-picker';
//import {Picker} from '@react-native-community/picker';

import {Picker} from '@react-native-picker/picker';
//import {Dropdown} from 'react-native-material-dropdown-v2';
/*
class Example extends Component {
  render() {
    let data = [
      {
        value: 'Banana',
      },
      {
        value: 'Mango',
      },
      {
        value: 'Pear',
      },
    ];

    return <Dropdown label="Favorite Fruit" data={data} />;
  }
}*/

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
    /*
    console.log('erroe 2 ');
    AsyncStorage.setItem('session', 'login', () => {
      console.log('세션');
    });
    */
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

  // const [value, setValue] = useState('');
  const values = [{age: 'option1', name: 'option2'}];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let userToken = null;

  useEffect(() => {
    // userToken = AsyncStorage.getItem('uid');
    //console.log('변수' + userToken.uid);
    //    AsyncStorage.getItem('users', (err, result) => {
    //    const UserInfo = JSON.parse(result);
    //  if (UserInfo) {
    //  setInputText(UserInfo.guName);
    // }
    //});
    //return () => {
    //  console.log('컴포넌트가 화면에서 사라짐');
    // };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/saessak_head.png')}
        resizeMode="contain"
        style={styles.backImage}>
        <View style={styles.row_01}>
          <View style={styles.logoSettingRow}>
            <Image
              source={require('../assets/images/login_logo_small.png')}
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
        style={styles.inputBox}
        placeholder={inputText}
        value={inputText}
        onChangeText={value => setInputText(value)}
      />
      {/*<Example></Example>*/}
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress(inputText).then(() =>
              navigation.navigate('Board'),
            )
          }
          style={styles.button_01}>
          <Image
            source={require('../assets/images/google.login.png')}
            style={styles.loginImg}
          />
        </TouchableOpacity>

        <ImageBackground
          source={require('../assets/images/saessak_bottom.png')}
          style={styles.imageDown}></ImageBackground>
      </View>
    </SafeAreaView>
  );
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
  row_01: {
    top: 300,
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
    top: -80,
    width: '10%',
    height: '10%',
    alignItems: 'center',
  },
  textStyle: {
    top: 365,
    textAlign: 'center',
    fontFamily: 'roboto-700',
    color: 'rgba(60,130,70,1)',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputBox: {
    top: 225,
    left: 104,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 2,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'green',
    height: 40,
    width: 210,
  },
  root_03: {
    flex: 1,
  },
  button_01: {
    marginTop: 70,
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
    marginTop: 130,
    width: '100%',
    height: 90,
    borderRadius: 40,
    position: 'absolute',
    alignItems: 'center',
  },
  imageDown: {
    alignItems: 'center',
    bottom: -250,
    width: '100%',
    height: 200,
  },
});

export default LoginScreen;
