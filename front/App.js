


import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Onboardscreen from './Component/Onboardscreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Choises from './Component/Choises.js';
import LoginScreenPro from './Component/LoginScreenPro.js';
import LoginScreenUser from './Component/LoginScreenUser.js';
import forgetPass from "./Component/forgetPass.js"
import SignUpPro from "./Component/SignUpPro.js"
import HomeScreenPro from './Component/HomeScreenPro.js';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
       <Stack.Navigator>
    
       
        <Stack.Screen options={{headerShown:false}} name="Onboardscreen" component={Onboardscreen} />
        <Stack.Screen name="choises" component={Choises} />
        <Stack.Screen name="LoginScreenPro" component={LoginScreenPro} />
        <Stack.Screen name="LoginScreenUser" component={LoginScreenUser} />
        <Stack.Screen name="forgetPass" component={forgetPass} />
        <Stack.Screen name="SignUpPro" component={SignUpPro} />
        <Stack.Screen name="Home" component={HomeScreenPro} />
   
    </Stack.Navigator>
    </NavigationContainer>
  
  );
}
//hello
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    margin:0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
