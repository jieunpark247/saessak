import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, BarcodeScanner ,Board, Ranking} from './src/screen';

const navOptionHandler = () => ({
  headerShown: false,
});

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Board">
        <StackApp.Screen name="Board" component={Board} options={navOptionHandler} />
        <StackApp.Screen name="Home" component={Home} options={navOptionHandler} />
        <StackApp.Screen name="BarcodeScanner" component={BarcodeScanner} options={navOptionHandler} /> 
        <StackApp.Screen name="Ranking" component={Ranking} options={navOptionHandler} /> 
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
