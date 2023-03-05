<<<<<<< HEAD
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';
import Home from './components/Home.js'
import ProviderProfile from './components/ProviderProfile.js';
// import icons from './assets/icons/index';
// import Zendesk from 'react-native-zendesk-messaging';
// const CHANNEL_KEY = 'eyJzZXR0aW5nc191cmwiOiJodHRwczovL2doYWRhMjI2Ny56ZW5kZXNrLmNvbS9tb2JpbGVfc2RrX2FwaS9zZXR0aW5ncy8wMUdURUJRUVQ4Sk00UTY5MDVTNlpFWTM5NS5qc29uIn0=';
=======



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
>>>>>>> 26ba19683e57e548a738f8f4122c5882f421ab85

export default function App() {

  // useEffect(() => {
  // // Zendesk.initialize({ channelKey: CHANNEL_KEY })
  // //     .then(() =>  "success" )
  // //     .catch((error) => error);
  // }
  // , []);
  
  //   const handlePressOpenButton = () => {
  //     // Zendesk.openMessagingView();
  //   };
  // const ChatBotbn=()=>(
  //   <TouchableOpacity 
  //   onPress={()=>alert('well pressed')}
  //   style={styles.btn}>
  //     <Image style={styles.bot} source={icons.chatB}/>

  //   </TouchableOpacity>
  // )

  return (
<<<<<<< HEAD
 
    <View style={styles.container}>
      {/* <Home/>  */}
   <ProviderProfile/> 
     
     <StatusBar style="auto" /> 
     {/* {ChatBotbn()} */}
    </View>
);
      }

=======
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
>>>>>>> 26ba19683e57e548a738f8f4122c5882f421ab85
//hello
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    margin:0,
    alignItems: 'center',
    justifyContent: 'center',
<<<<<<< HEAD
 
   
  }, 
    
    btn :{
      position: 'absolute',
      botton:20,
      right: 10,
      height:60 ,
      width: 60,
      backgroundColor: 'white',
      borderRadius: 30,
          }
        ,
        bot : {
          height:50 ,
      width: 50,
      
        }
=======
  },
  
>>>>>>> 26ba19683e57e548a738f8f4122c5882f421ab85
});
