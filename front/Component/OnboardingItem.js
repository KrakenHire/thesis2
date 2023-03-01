import { StyleSheet, Text, View,Image, useWindowDimensions} from 'react-native';
import React from 'react'



export default  OnboardingItem = ({item}) => {
  const {width}= useWindowDimensions();
  
    return (
    <View style={[style.container, {width}]} key={item}>
        <Image source={item.image} style={[styles.image,{width,resizeMode:'contain'}]}/>
         <Text>{item.description}</Text>
    </View>
  );  

}
const style = StyleSheet.create({
   container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   },
   image:{
    flex:0.7,
    justifyContent:'center',
   },
   description:{
    fontWeight:'800',
    color:"#000",
    textAlign:'center',
    paddingHorizontal:64,
   }

});
