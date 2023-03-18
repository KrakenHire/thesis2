
import {View, SafeAreaView, StyleSheet,TouchableOpacity,Text} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  
  TouchableRipple,
  TextInput
  
} from 'react-native-paper';
import { MaterialCommunityIcons,AntDesign,MaterialIcons,FontAwesome,FontAwesome5 ,Ionicons ,Entypo} from '@expo/vector-icons';
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react';
const ProviderSetting = ({route}) => {
  const navigation = useNavigation()
 const {provider}=route.params;
 
  const[show,setShow]=useState(true)
  
   const[service,setService]=useState("")
   const[username,setUsername]=useState("")
   const[age,setAge]=useState("")
   const[experience,setExperience]=useState("")
   const[adresse,setAdresse]=useState("")
   const[price,setPrice]=useState(0)
   const[aboutMe,setAboutMe]=useState("")
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        AsyncStorage.clear()
        navigation.replace("choises")
      })
      .catch(error => alert(error.message))
  }
  const onchange0=(e)=>{
    setService(e.target.value)
}

const onchange1=(e)=>{
  setUsername(e.target.value)
}
const onchange2=(e)=>{
  setAge(e.target.value)
}
const onchange3=(e)=>{
  setExperience(e.target.value)
}
const onchange4=(e)=>{
  setAdresse(e.target.value)
}
const onchange5=(e)=>{
  setAboutMe(e.target.value)
}
  const statu=()=>{
    setShow(false)
}
const update0=()=>{
  Upper(service,provider.providerId)
  setShow(true)
}
const update1=()=>{
  Upper(username,provider.providerId)
  setShow(true)
}
const update2=()=>{
  props.Upper(age,provider.providerId)
  setShow(true)
}
const update3=()=>{
  props.Upper(experience,provider.providerId)
  setShow(true)
}
const update4=()=>{
  props.Upper(adresse,provider.providerId)
  setShow(true)
}
const update5=()=>{
  props.Upper(price,provider.providerId)
  setShow(true)
}
const update6=()=>{
  props.Upper(aboutMe,provider.providerId)
  setShow(true)
}
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Avatar.Image
          source={{
            uri: 'https://img.lovepik.com/free-png/20220126/lovepik-cleaning-man-holding-sponge-brush-and-cleaning-png-image_401866658_wh1200.png',
          }}
          size={120}style={{marginTop:40,marginLeft:120}}
        />
      
      </View>
      <View style={{marginLeft: 100}}>
          <Title style={[styles.title, {
            marginTop:50,
            marginBottom: 5,

          }]}>ines debbichi</Title>
          <Caption style={styles.caption}>@j_doe</Caption>
        </View>
    </View>
    <View style={styles.userInfoSection}>
      <View style={{marginTop:20 ,padding:20,backgroundColor:"#fff",borderRadius:20}}>
      <View  style={{color:"#7210ff",flexDirection: 'row', alignItems: 'center',justifyContent:"space-between",marginTop:8,borderBottomColor:"#eee",borderBottomWidth:2}} >
           <View style={{flexDirection: 'row'}} ><MaterialIcons name="miscellaneous-services" size={20} color="black" /><Text style={{color:"#777777",marginLeft:15,fontSize:20}}>{provider.service}</Text></View>
           <FontAwesome name="edit" size={20} style={{color:"#7210ff" }}  onPress={statu}/>
           {!show&&<TextInput onChange={onchange0}/>}
           {!show&&<TouchableOpacity onClick={update0}>upp</TouchableOpacity>}
      </View>
      <View  style={{color:"#7210ff",flexDirection: 'row', alignItems: 'center',justifyContent:"space-between",marginTop:8,borderBottomColor:"#eee",borderBottomWidth:2}} >
           <View style={{flexDirection: 'row'}} ><FontAwesome5 name="user-alt" size={20} style={{color:"#000"}} /><Text style={{color:"#777777",marginLeft:15,fontSize:20}}>{provider.username}</Text></View>
           <FontAwesome name="edit" size={20} style={{color:"#7210ff" }}  onPress={statu}/>
           {!show&&<TextInput onChange={onchange1}/>}
           {!show&&<TouchableOpacity onClick={update1}>upp</TouchableOpacity>}
      </View>
      
      <View  style={{color:"#7210ff",flexDirection: 'row', alignItems: 'center',justifyContent:"space-between",marginTop:8,borderBottomColor:"#eee",borderBottomWidth:2}} >
           <View style={{flexDirection: 'row'}} ><FontAwesome5 name="user" size={20} style={{color:"#000"}} /><Text style={{color:"#777777",marginLeft:15,fontSize:20}}>{provider.age}</Text></View>
           <FontAwesome name="edit" size={20} style={{color:"#7210ff" }}  onPress={statu} />
           {!show&&<TextInput onChange={onchange2}/>}
           {!show&&<TouchableOpacity onClick={update2}>upp</TouchableOpacity>}
      </View>
      
   
      <View  style={{color:"#7210ff",flexDirection: 'row', alignItems: 'center',justifyContent:"space-between",marginTop:8,borderBottomColor:"#eee",borderBottomWidth:2}} >
           <View style={{flexDirection: 'row'}} ><FontAwesome5 name="user-check" size={20} style={{color:"#000"}} /><Text style={{color:"#777777",marginLeft:15,fontSize:20}}>{provider.experience}</Text></View>
           <FontAwesome name="edit" size={20} style={{color:"#7210ff" }}  onPress={statu} />
           {!show&&<TextInput onChange={onchange3}/>}
           {!show&&<TouchableOpacity onClick={update3}>upp</TouchableOpacity>}
      </View>
      <View  style={{color:"#7210ff",flexDirection: 'row', alignItems: 'center',justifyContent:"space-between",marginTop:8,borderBottomColor:"#eee",borderBottomWidth:2}} >
           <View style={{flexDirection: 'row'}} ><AntDesign name="phone" size={20} style={{color:"#000"}} /><Text style={{color:"#777777",marginLeft:15,fontSize:20}}>{provider.adresse}</Text></View>
           <FontAwesome name="edit" size={20} style={{color:"#7210ff" }}  onPress={statu}/>
           {!show&&<TextInput onChange={onchange4}/>}
           {!show&&<TouchableOpacity onClick={update4}>upp</TouchableOpacity>}
      </View>
      <View  style={{color:"#7210ff",flexDirection: 'row', alignItems: 'center',justifyContent:"space-between",marginTop:8,borderBottomColor:"#eee",borderBottomWidth:2}} >
           <View style={{flexDirection: 'row'}} ><AntDesign name="phone" size={20} style={{color:"#000"}} /><Text style={{color:"#777777",marginLeft:15,fontSize:20}}>{provider.AboutMe}</Text></View>
           <FontAwesome name="edit" size={20} style={{color:"#7210ff" }}  onPress={statu}/>
           {!show&&<TextInput onChange={onchange5}/>}
           {!show&&<TouchableOpacity onClick={update5}>upp</TouchableOpacity>}
      </View>
     
      </View>
    
    </View>
    <TouchableOpacity
      onPress={handleSignOut}
      style={styles.button}
    >
      <Text style={{color:"#fff",fontSize:20}}>Sign out</Text>
    </TouchableOpacity>
  </SafeAreaView>
  )
}

export default ProviderSetting


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderTopColor: '#DDDDDD',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#7210ff',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    marginLeft:90,
  },
});