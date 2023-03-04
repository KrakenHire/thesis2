import React from "react";
import {View,StyleSheet,Text,Image} from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';


const Choises =()=>{
  const navigation=useNavigation()
   return <View style={styles.con}>
      <View style={styles.container}>
      <Image source={require('C:/Users/user/Desktop/thesis2/front/assets/amic.png')} style={styles.image}/>
      <Text style={styles.text}>If you are loking for job</Text>
      <Button style={styles.button} onPress={() =>navigation.navigate("AuthSP")}
      >Apply Now</Button>

</View>
<View style={styles.cont}>

<Image source={require('C:/Users/user/Desktop/thesis2/front/assets/amico.png')} style={styles.image}/>
<Text style={styles.text}>If you are loking for service</Text>
      <Button style={styles.button} onPress={() =>navigation.navigate("Authuser")}
      >Get your service</Button>
</View>
   </View>
  
}


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