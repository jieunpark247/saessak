import 'react-native-gesture-handler';
import * as React from 'react';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CameraRoll, BarcodeScanner, Board, Ranking} from './src/screen';
import LoginScreen from './src/screen/LoginScreen';
import SplashScreen from './src/screen/SplashScreen';
//import SplashScreen from 'react-native-splash-screen';

const navOptionHandler = () => ({
  headerShown: false,
});

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="SplashScreen">
        <StackApp.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <StackApp.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Board"
          component={Board}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="CameraRoll"
          component={CameraRoll}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="BarcodeScanner"
          component={BarcodeScanner}
          options={navOptionHandler}
        />
        <StackApp.Screen
          name="Ranking"
          component={Ranking}
          options={navOptionHandler}
        />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
