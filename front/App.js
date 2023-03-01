import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Onboardscreen from './Component/Onboardscreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Onboardscreen/>
      
      <StatusBar style="auto" />
    </View>
  );
}
//hello
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // image:{
  //   height:420,
  //   width :'100%' ,
  //   borderBottomLeftRadius:100,
  // }
});
