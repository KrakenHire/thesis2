import React, { useState,useEffect } from 'react';
import { StyleSheet, View,Image,Text,ScrollView,TouchableOpacity ,TextInput ,Button} from 'react-native';
import icons from '../assets/icons/index';
import { FontAwesome,Feather } from 'react-native-vector-icons';
import Ratings from './Ratings.js';
import Comments from './Comments.js';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar'
import { CheckBox } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLottie from './SimpleLottie';

import axios from 'axios';
function ProviderProfile({route}) {
  const navigation=useNavigation()
  const [checked, setChecked] = useState(true);
  const [userr, setUserr] = useState(null);
  const [name, setName] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allReviews, setAllReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [upReviews, setUpReviews] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  const { provider } = route.params;


  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };



  useEffect(() => {
    const getUser = async () => {
      try {
        const userr = await AsyncStorage.getItem("userr");
        if (userr !== null) {
          setUserr(JSON.parse(userr));
          console.log("hello im a user id ",userr);
          return JSON.parse(userr);
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    
    const fetchData = async () => {
      const userId = await getUser();
      if (userId !== null) {
        try {
          const response = await axios.get(`${config}/user/${userId}`);
          setName(response.data.username);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [userr]);
  



  const handleSubmit = () => {
    console.log("im here");
  //   console.log({
  //    users_iduser:JSON.parse(userId),
  //  },"mehdiiiiiiiiiiiiiiiiiiiiiiiiiiii");
     axios.post(`${config}/reviews`,{
      content:reviews ,
      users_iduser: userr,
      providers_idproviders: provider.idproviders
     })
     .then((res) => {
      setUpReviews(!upReviews)
      
       
       setReviews('');
       // setComments('');
 
     })
     .catch((error) => {
       console.error(error);
     });
   };


 


  useEffect(() => {
    axios.get(`${config}/reviews/include/${provider.idproviders}`)
      .then((res) => {
        console.log(res.data,"res2");
        setAllReviews(res.data);
      })
      .catch((error) => {
        console.error(error);
      }); 
  }, [upReviews]);


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
      <View style={styles.namee}>
      <Text style={styles.service}>{provider.username}   </Text>
    <Text>  <FontAwesome name="star" solid style={{ color: '#ffc107', fontSize: 25 }} />  {}(55 Reviews) </Text>
      </View>
    <View style={styles.adress}>
        <Image style={styles.adressic} source={icons.adress}/>
        <Text style={{fontSize: 15, marginBottom:10}}>{provider.adresse} </Text>
    </View>
    <View style={styles.about}>
   
       <Text style={styles.price}> {provider.price} DNT <Text style={{fontSize:15,color:'black'}}> (visit price)</Text> </Text>   
    <View style={{paddingLeft:10, paddingTop:10}}>
    <Text style={{fontSize:25, fontWeight:'bold' ,paddingBottom:10}}>About me </Text>
    <Text> {provider.aboutMe}
    </Text>
</View>
<View>
  <Text style={{fontSize:25, fontWeight:'bold', marginBottom:10}}>Photos & Videos</Text>
  <View style={styles.albumContainer}>
    <Image style={styles.bigAlbumImage} source={icons.clean1} />
    <View style={styles.sideAlbumContainer}>
      <Image style={styles.sideAlbumImage} source={icons.clean2} />
      <Image style={styles.sideAlbumImage} source={icons.clean2} />
    </View>
  </View>
</View>

<View style={styles.rate}>
 <Ratings provider={provider}/>

</View>
 


<View style>
  


{/* <View style={styles.containerrr}>
  {allReviews.map((review, i) => (
    <View key={i} style={styles.review}>
      <Text style={styles.content}>{review.content}</Text>
      <Text style={styles.name}>{review.user.username}</Text>
      <Image style={styles.photo} source={{uri:"https://th.bing.com/th/id/OIP.pZXdFEuHenvMQcex1XAHAAHaE8?pid=ImgDet&rs=1"}} />
    </View>
  ))}
</View> */}
<View style={styles.containerrr}>
<Text style={{fontSize:15, fontWeight:'bold',marginLeft:10,marginBottom:15,textDecorationLine: 'underline'}}>{allReviews.length} Reviews</Text>
      {allReviews.slice(0, showAllReviews ? allReviews.length : 3).map((review, i) => (
        <View key={i} style={styles.review}>
           <Image style={styles.photo} source={{uri:review.user.image}} />
          <View style={styles.info}>

          <Text style={styles.name}>{review.user.username}</Text>
          <Text style={styles.content}>{review.content}</Text>
          </View>
          
        </View>
      ))}
      {allReviews.length > 3 && (
        <TouchableOpacity onPress={toggleShowAllReviews}>
          <Text style={styles.showMoreLessButton}>{showAllReviews ? "Show Less" : "Show More"}</Text>
        </TouchableOpacity>
      )}
       
    </View>

 <View style={styles.buttons}>
 {/* <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>MESSAGE</Text>
   </TouchableOpacity> */}
   <View style={styles.inputBlock}>
  <TextInput
    style={styles.input}
    value={reviews}
    onChangeText={text => setReviews(text)}
    placeholder="Enter your review"
    placeholderTextColor="#A6A6A6"
    multiline={true}
    numberOfLines={4}
  />
  <TouchableOpacity
    style={styles.sendButton}
    onPress={handleSubmit}
  >
   <Feather name="send" size={24} color="black" />
  </TouchableOpacity>
</View>

</View>
  <View style={styles.buttons}>
  <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate("Booking Details")}>
        <Text style={styles.buttonText}>BOOK NOW</Text>
   </TouchableOpacity>
  </View>
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
    info:{
    
      paddingHorizontal: 10,
      
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
  namee:{
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
// bigAlbumImage: {
//   width: '66.66%',
//   height: 240,
//   margin: 5,
// },
// sideAlbumContainer: {
//   flexDirection: 'row',
//   width: '33.33%',
//   height: 120,
// },
// sideAlbumImage: {
//   width: '50%',
//   height: 120,
//   margin: 5,
// },
// albumContainer: {
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   justifyContent: 'center',
//   marginHorizontal: -5,
// },
// albumImage: {
//   width: '33.33%',
//   height: 120,
//   margin: 5,
// },
albumContainer: {
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
},
bigAlbumImage: {
  width: '60%',
  height: 240,
  margin: 5,
},
sideAlbumContainer: {
  width: '33.33%',
  height: 240,
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
},
sideAlbumImage: {
  width: '100%',
  height: 118,
  marginBottom: 5,
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
},

sendButton: {
  marginLeft:7,
  marginBottom:10
},
input: {
 
  width: '70%',
  height: 50,
  borderWidth: 1,
  borderColor: '#A6A6A6',
  borderRadius: 10, // added border radius
  padding: 10,
  fontSize: 16,
  color: '#333333',
  textAlignVertical: 'top',
  marginTop: 10,
  marginBottom: 20
},
inputBlock:{
flex:1,
flexDirection:"row",
alignItems:"center",
justifyContent:"center"
},
containerrr: {
  backgroundColor: "#f5f5f5",
  padding: 20,
  borderRadius: 10,
  marginBottom: 20,
},
review: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center'
},
content: {
  flex: 1,
  fontSize: 16,
  lineHeight: 20,
  marginBottom: 5,
  marginLeft: 3,
  width:280
},
name: {
  fontWeight: "bold",
  fontSize: 14,
  marginBottom: 5,
  marginRight: 5,
  marginTop:10
},
photo: {
  width: 50,
  height: 50,
  borderRadius: 25,
  resizeMode: "cover",
},
showMoreLessButton: {
  alignSelf: "center",
  marginTop: 10,
  fontSize: 14,
  fontWeight: "bold",
  color: "#007aff",
  textDecorationLine: "underline",
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