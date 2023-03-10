import React, { useState } from 'react';
import { StyleSheet, View,Image,Text,ScrollView,TouchableOpacity  } from 'react-native';
import icons from '../assets/icons/index';
import { FontAwesome } from 'react-native-vector-icons';
import Ratings from './Ratings.js';
import Comments from './Comments.js';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar'
import { CheckBox } from '@rneui/themed';




function ProviderProfile({route}) {
  const navigation=useNavigation()
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);

  const { provider } = route.params;

  

  return (
    <ScrollView>
   <View style={styles.container}>
      <Image style={styles.profile} source={{ uri:provider.image}}/>
      <View style={styles.header}>
      <Text style={{fontSize:28, fontWeight:'bold'}}>  {provider.service} Service</Text>
      <CheckBox 
  
        checked={checked}
        checkedIcon="bookmark"
        uncheckedIcon="bookmark-o"
        checkedColor="black"
        onPress={toggleCheckbox}
      />
      </View>
      <View style={styles.name}>
      <Text style={styles.service}>{provider.username}   </Text>
    <Text>  <FontAwesome name="star" solid style={{ color: '#ffc107', fontSize: 25 }} />  4 (55 Reviews) </Text>
      </View>
    <View style={styles.adress}>
        <Image style={styles.adressic} source={icons.adress}/>
        <Text style={{fontSize: 15}}>{provider.adress} </Text>
    </View>
    <View style={styles.about}>
   
       <Text style={styles.price}> {provider.price} DNT <Text style={{fontSize:15,color:'black'}}> (visit price)</Text> </Text>   
    <View style={{paddingLeft:10, paddingTop:10}}>
    <Text style={{fontSize:25, fontWeight:'bold' ,paddingBottom:10}}>About me </Text>
    <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac quam
          vel odio pharetra blandit. Donec nec urna eros. Praesent non erat at
          mauris eleifend vehicula. Fusce nec augue vel erat facilisis dictum
          nec et dui. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Donec ornare urna in est interdum, eu
          dapibus lectus cursus. In ut sapien varius, tincidunt lorem in,
          euismod nisl. Praesent posuere elit elit, eget posuere sapien
          volutpat vel. Proin euismod pulvinar nisl, vel tincidunt arcu
          molestie sit amet. In hac habitasse platea dictumst.
    </Text>
</View>
<View style={styles.post}>
<Text style={{fontSize:25, fontWeight:'bold', marginBottom:10}}>Photos & Videos </Text>
<View tyle={styles.albumContainer} >
<Image style={styles.albumImage} source={icons.clean1}/>
<Image   style={styles.albumImage} source={icons.clean2}/>
<Image   style={styles.albumImage} source={icons.clean2}/>
</View>
</View>

<View style={styles.rate}>
 <Ratings provider={provider}/>
 <Text style={{fontSize:15, fontWeight:'bold'}}>55 Reviews</Text>
</View>
 
 <Comments
 username='ghada'
 profileImage = "icons.profile"
 status="This is' a sample comment" 
  likes={10} 
  onLike={() => console.log('Like pressed')} 
  onEdit={() => console.log('Edit pressed')} 
  onDelete={() => console.log('Delete pressed')} 
/>

 <View style={styles.buttons}>
 {/* <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>MESSAGE</Text>
   </TouchableOpacity> */}
  <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate("Booking Details")}>
        <Text style={styles.buttonText}>BOOK NOW</Text>
   </TouchableOpacity>
  </View>
</View>
<NavBar/>
      </View>  
      </ScrollView>
  )
}

export default ProviderProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:400,  
        backgroundColor:"#fff"
        },
 
    profile: {
        width:420,
        height:300,
      
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between' ,
        alignItems:'center',
        paddingTop:20,  
        width:400,
      
      },
      notification: {
        paddingHorizontal:10,
        height:30,
        width: 30,
        marginLeft:30,
     
      },
      name:{
        flexDirection: 'row',
        // justifyContent: 'space-between' ,
        alignItems:'center',
        paddingTop:10,  
        width:300,
        paddingLeft:20,
       
      },
      adress:{
        flexDirection: 'row',
        paddingTop:10, 
        flex:1, 

      }, 
      adressic: {
        paddingHorizontal:10,
        height:25,
        width: 25,
        marginLeft:10,
     
      },
      service:{
        fontSize:18,
        color:'#7210FF',
         fontWeight:'bold'
      },

      price:{
        fontSize:20,
        color:'#7210FF',
        fontWeight:'bold' ,
         paddingLeft:10,
      },
      about:{ 
        paddingBottom:80,
    },
    post:{
        paddingTop:10,
        paddingLeft:10,

    },
    image:{
        flexDirection: 'row',
        paddingTop:10, 
        flex:1,

    },
  
    rate:{
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:20,
    },
    albumContainer: {
      flexDirection: 'row',
      // flexWrap: 'wrap',
      // justifyContent: 'space-between',
      padding: 10,
    },
    albumImage: {
      width: '50%',
      height: 150,
      marginBottom: 10,
    },
    buttons: {
     marginTop:50,
      borderRadius: 10,
      marginLeft: 10,
      flexDirection: 'row',
      justifyContent: 'space-around' ,
      alignItems:'center',
    },
    button: {
      backgroundColor: '#7210FF',
      borderRadius: 20,
      marginLeft: 10,
      paddingTop:10,
      paddingBottom:10,
      width:180,
      height:50
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft:50,
      marginTop:3
   
},
   
})