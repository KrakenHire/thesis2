
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Onboardscreen from './Component/Onboardscreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Choises from './Component/Choises.js';
import AuthSP from './Component/AuthSP.js';
import Authuser from './Component/Authuser.js';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
       <Stack.Navigator>
    
       
        <Stack.Screen options={{headerShown:false}} name="Onboardscreen" component={Onboardscreen} />
        <Stack.Screen name="choises" component={Choises} />
        <Stack.Screen name="AuthSP" component={AuthSP} />
        <Stack.Screen name="Authuser" component={Authuser} />
   
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
