import React, { useState,useEffect } from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Choises =()=>{
  const navigation=useNavigation()
  const [providerId, setProviderId] = useState(null);
  const [userr, setUserr] = useState(null);
 
 
  //   const getProviderId = async () => {
  //     try {
  //       const providerId = await AsyncStorage.getItem('providerId');
  //       if (providerId !== null) {
  //         console.log(" provider id ",providerId);
          
  //         setProviderId(JSON.parse(providerId));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     return null;
  //   } 
  //    getProviderId()
   
  //     const getUser = async () => {
  //       try {
  //         const userr = await AsyncStorage.getItem("userr");
  //         if (userr !== null) {
  //           console.log(" user id ",userr);
  //          setUserr(JSON.parse(userr));
          
  //         }
  //         return null;
  //       } catch (error) {
  //         console.log(error);
  //         return null;
  //       }
  //     }
  //  getUser()
   return (
    <View style={styles.con}>
       
        <View>
          <View style={styles.container}>
            <Image source={require('../assets/amic.png')} style={styles.image}/>
            <Text style={styles.text}>If you are looking for a job</Text>
            <Button style={styles.button} onPress={() =>navigation.navigate("LoginScreenPro")}>
              Apply Now
            </Button>
          </View>
          <View style={styles.cont}>
            <Image source={require('../assets/amico.png')} style={styles.image}/>
            <Text style={styles.text}>If you are looking for a service</Text>
            <Button style={styles.button} onPress={() =>navigation.navigate("LoginScreenUser")}>
              Get your service
            </Button>
          </View>
        </View>
    </View>
  )}


const styles = StyleSheet.create({
  con:{
    backgroundColor:'#FFF',
    height:'100%'
  },
  button:{
    marginLeft:230,
    marginTop:50,
    width:200,
   
  },
 text:{
   marginLeft:230,
   marginTop:-140,
   
   fontSize: 17,
   fontWeight: 'bold',
 },
container: {
  marginTop:40,
  width:400,
  height:270,
  backgroundColor:'#FFF',
  Color:'#FFF',
  borderRadius:10,
  shadowOffset: { width: 600, height: 500 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 8,
  
},
cont:{

  marginTop:10,
  width:400,
  height:270,
  backgroundColor:'#FFF',
  Color:'#FFF',
  borderRadius:10,
  shadowColor: '#000',
  shadowOffset: { width: 600, height: 500 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 8,
},
image:{
  width:180,
  height:170,
  marginTop:50,
  marginLeft:20
}

});

export default Choises;