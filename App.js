import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CameraRoll, BarcodeScanner ,Board} from './src/screen';

const navOptionHandler = () => ({
  headerShown: false,
});

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Board">
        <StackApp.Screen name="Board" component={Board} options={navOptionHandler} />
        <StackApp.Screen name="CameraRoll" component={CameraRoll} options={navOptionHandler} />
        <StackApp.Screen name="BarcodeScanner" component={BarcodeScanner} options={navOptionHandler} /> 
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
