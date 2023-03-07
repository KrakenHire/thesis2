import React from 'react'
import { StyleSheet, Text, View,Image,  TouchableOpacity } from 'react-native';
import icons from '../assets/icons/index';
import { useNavigation } from '@react-navigation/native';


function NavBar() {
const navigation=useNavigation()
  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.item}  onPress={() =>  navigation.navigate("Home")}>
      <Image style={styles.ic} source={icons.home}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() =>  navigation.navigate("Chat")}>
      <Image style={styles.ic} source={icons.imbox}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
      <Image style={styles.ic} source={icons.calender}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
      <Image style={styles.ic} source={icons.avatar}/>
      </TouchableOpacity>
      </View>
   
  )
}

export default NavBar
const styles = StyleSheet.create({
bar:{
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal:7,
    paddingLeft:20,
    justifyContent: 'space-around',
    backgroundColor:'#E5E5E5',
    borderRadius:20,
    height:60
    
  },
  item:{
    justifyContent: 'center',
    alignItems: 'center'
  },
ic:{
  paddingLeft:25,
  width:30,
  height:30,
}, 
text:{
fontSize:15,
marginTop:10,
//  marginRight:10,
},
})

