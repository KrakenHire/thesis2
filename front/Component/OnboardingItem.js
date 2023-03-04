import { StyleSheet, Text, View,Image, useWindowDimensions} from 'react-native';
import React from 'react'



export default  OnboardingItem = ({item}) => {
  const {width}= useWindowDimensions();
  console.log(item);
    return (
    <View style={[style.container, {width}]} key={item}>
        <Image source={item.image} style={[style.image,{width,resizeMode:'contain'}]}/>
         <Text style={style.description} >{item.description}</Text>
    </View>
  );  

}
const style = StyleSheet.create({
   container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFF',
    margin:0
   },
   image:{
   
   justifyContent:'center', 
   height:370,
   width :'100%' ,
   borderBottomLeftRadius:200,
  
   },
   description:{
    fontWeight: 'bold',
    fontSize:21,
    color:"#000",
    textAlign:'center',
    paddingHorizontal:64,
    paddingTop:11
   }

});
