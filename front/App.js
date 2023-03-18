import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';

import ProviderProfile from './Component/ProviderProfile.js';
// import icons from './assets/icons/index';
// import Zendesk from 'react-native-zendesk-messaging';
// const CHANNEL_KEY = 'eyJzZXR0aW5nc191cmwiOiJodHRwczovL2doYWRhMjI2Ny56ZW5kZXNrLmNvbS9tb2JpbGVfc2RrX2FwaS9zZXR0aW5ncy8wMUdURUJRUVQ4Sk00UTY5MDVTNlpFWTM5NS5qc29uIn0=';
import Onboardscreen from './Component/Onboardscreen.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Choises from './Component/Choises.js';
import LoginScreenPro from './Component/LoginScreenPro.js';
import LoginScreenUser from './Component/LoginScreenUser.js';
import forgetPass from "./Component/forgetPass.js"
import SignUpPro from "./Component/SignUpPro.js"
// import HomeScreenPro from './component/Home.js';
import Home from './Component/Home.js'
import Calendar from './Component/Calendar.js';
import UserProfile from './Component/UserProfile.js'; 
import Chat from './Component/Chat.js';
import Mapplocation from './Component/Mapplocation.js'
import ProviderList from './Component/ProviderList.js';
import SignUpUser from "./Component/SignUpUser.js"
import Confirmation from './Component/Confirmation.js';
import Pay from './Component/Pay.js'
import Categories from './Component/Categories.js';
import ServiceProProfile from './Component/ServiceProProfile.js'
import ProviderSetting from './Component/ProviderSetting.js'

const Stack = createNativeStackNavigator();

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
 
//     <View style={styles.container}>
//       {/* <Home/>  */}
//    <ProviderProfile/> 
     
//      <StatusBar style="auto" /> 
//      {/* {ChatBotbn()} */}
//     </View>
// );
//       }

    <NavigationContainer style={styles.container}>
       <Stack.Navigator>


      
       
      
         <Stack.Screen options={{headerShown:false}} name="Onboardscreen" component={Onboardscreen} />
        <Stack.Screen  name="choises" component={Choises} />
        <Stack.Screen  name="LoginScreenPro" component={LoginScreenPro} />
        <Stack.Screen name="forgetPass" component={forgetPass} />
        <Stack.Screen name="SignUpPro" component={SignUpPro} />
        <Stack.Screen  options={{headerShown:false}} name="Home" component={Home} /> 
        <Stack.Screen name="list" component={ProviderList} /> 
         <Stack.Screen name="ProviderProfile" component={ProviderProfile} />  
        <Stack.Screen name="Booking Details" component={Calendar} />
       
        <Stack.Screen name="Chat" component={Chat} /> 
        <Stack.Screen name="See ALL" component={Categories} /> 
        <Stack.Screen name="Rev" component={Confirmation} /> 
        <Stack.Screen name="Pay" component={Pay} /> 

       <Stack.Screen name="LoginScreenUser" component={LoginScreenUser} />
       <Stack.Screen name="SignUpUser" component={SignUpUser} />
       <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Map" component={Mapplocation} /> 
          
        <Stack.Screen   options={{headerShown:false}} name="ServiceProProfile" component={ServiceProProfile} /> 
           
        <Stack.Screen name="ProviderSetting" component={ProviderSetting} /> 
   
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
    justifyContent: 'center'
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
  }
  
)
