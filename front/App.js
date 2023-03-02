import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';
import Home from './components/Home.js'
// import icons from './assets/icons/index';
// import * as Zendesk from 'react-native-zendesk-messaging';
// const CHANNEL_KEY = 'eyJzZXR0aW5nc191cmwiOiJodHRwczovL2doYWRhMjI2Ny56ZW5kZXNrLmNvbS9tb2JpbGVfc2RrX2FwaS9zZXR0aW5ncy8wMUdURUJRUVQ4Sk00UTY5MDVTNlpFWTM5NS5qc29uIn0=';

export default function App() {

//  useEffect(() => {
//   Zendesk.initialize({ channelKey: CHANNEL_KEY })
//       .then(() =>  "success" )
//       .catch((error) => error);
//   }, []);
  
//     const handlePressOpenButton = () => {
//       Zendesk.openMessagingView();
//     };
//   const ChatBotbn=()=>(
//     <TouchableOpacity 
//     onPress={handlePressOpenButton}
//     style={styles.btn}>
//       <Image style={styles.bot} source={icons.chatB}/>

//     </TouchableOpacity>
//   )

  return (
    <View style={styles.container}>
      <Home/>
      <Text style={styles.cont}>hello</Text>
      <StatusBar style="auto" />
      {/* {ChatBotbn()} */}
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
});
