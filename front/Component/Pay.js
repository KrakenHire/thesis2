import React from "react";
import {View,Text,StyleSheet} from 'react-native';




const Pay =({route})=>{
 console.log(route.params)
   return <View style={styles.container}>
      
      <Text >{route.params.adresse.streetAddress}/{route.params.adresse.city}/{route.params.adresse.state}/{route.params.adresse.country}</Text>

</View>}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:70
    }})
export default Pay;