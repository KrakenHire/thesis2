import { StyleSheet, Text, View,Image, SafeAreaView,TextInput,TouchableOpacity,ScrollView,ActivityIndicator,} from 'react-native';
import NavBar from './NavBar.js';
import React, { useEffect,useState } from 'react';
import icons from '../assets/icons/index';
import Search from './Search';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config.js';

import Swiper from 'react-native-swiper';
import SimpleLottie from '../Component/SimpleLottie';




function Home() {


  const [providers, setProviders] = useState([]);
 
  const navigation=useNavigation();
  const [userr, setUserr] = useState(null);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const[update,setUpdate]=useState(false)
 
   
 
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
          setName(response.data);
          setIsLoading(false);
          axios.get(`${config}/provider`)
              .then(response => {
              setProviders(response.data);
                console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk",response.data);
    })
      .catch(error => console.error(error))
        } 
        catch (error) {
          console.log(error);
          setIsLoading(true);
        }
      } else {
        setIsLoading(!isLoading);
      }
    };
    
    fetchData();
  },[userr,providers.length,isLoading]);
  
  const press = () => {
    navigation.navigate("UserProfile");
  };

  if (isLoading) {
    // Render a loading indicator
    return (
      <SimpleLottie/>
    );
  }


  const handleIconClick = (service) => {
  const filteredProviders = providers.filter(provider => provider.service=== service);

    navigation.navigate('list', { providers: filteredProviders ,service:service , source: icons[`${service}`] });};
 
 
    
   
    return (
      <ScrollView>
        {console.log("hello",providers)}
        {console.log(name,"nnnnnnnnnnnnnnnnnnnnnnnnnnnnn")}
      <View style={styles.container}>
        <SafeAreaView  >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
        <Image style={styles.profile} source={icons.profile}/>

        </TouchableOpacity>
        <View style={styles.name} >
        <Text >Welcome<Image style={styles.img} source={icons.greeting}/></Text>
       {name? <Text style={{fontWeight: 'bold', fontSize:18}}>{name.username} </Text>:<Text style={{fontWeight: 'bold', fontSize:18}}>test</Text>}
         </View>
        <View style={styles.icon}>
        <Image style={styles.notification} source={icons.notification}/>
        <Image style={styles.notification} source={icons.bookMark}/>
      </View>
      </View>
      </SafeAreaView>
     <Search/>
     {/* <Image style={styles.home} source={icons.homeh}/> */}
     

    <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={true}
          height={200}
          activeDotColor="gray">
          <View style={styles.slide}>
            <Image
              source={icons.service3}
              resizeMode="cover"
            style={styles.home}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={icons.homeh}
              resizeMode="cover"
              style={styles.home}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={icons.service2}
              resizeMode="cover"
              style={styles.home}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={icons.service4}
              resizeMode="cover"
            style={styles.home}
            />
          </View>
      
        </Swiper>
      </View> 



     <View style={styles.service} >
      <Text style={styles.bold}>Services</Text>
      <TouchableOpacity onPress={() => navigation.navigate("See ALL")}>
      <Text style={{fontSize:18, color: '#7210FF',   fontWeight: 'bold' }}>See All</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.categories}>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Cleaning')} >
         <Image style={styles.ic} source={icons.Cleaning} />
         <Text style={styles.text}> Cleaning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Repairing')} >
        <View style={styles.color}>
        <Image style={styles.ic} source={icons.Repairing} />
        </View>
        <Text style={styles.text}> Reparing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Painting')} >
        <Image style={styles.ic} source={icons.Painting}/>
        <Text style={styles.text}> Panting</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categories2}>
      <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Electrical')} >
        <Image style={styles.ic} source={icons.Electrical }/>
        <Text style={styles.text}> Electrical </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Plumbing')} >
        <Image style={styles.ic} source={icons.Plumbing}/>
        <Text style={styles.text}> Plumbing </Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Hairdressing')} >
        <Image style={styles.ic} source={icons.Hairdressing}/>
        <Text style={styles.text}> Haidressing </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.tit} >
      <Text  style={styles.tet}>Most Popular Services</Text>
       </View>
       <NavBar/>
        </View>
        </ScrollView>
    )
  }
  
  export default Home
  const styles = StyleSheet.create({
    container: {
    flex: 1,
    width:400,
    backgroundColor:"#fff"
    },
    cont :{
      fontSize:20,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between' ,
        alignItems:'center',
        paddingTop:10,
      },
      profile:{
        // marginTop:70,
        // marginRight:20,
        height:50 ,
        width: 50,
        borderRadius: 40,
      },
      notification: {
        paddingHorizontal:10,
        height:30,
        width: 30,
        marginLeft:15,
      },
      name:{
        marginRight:120,
      },
      icon:{
        flexDirection: 'row',
        justifyContent: 'space-between' ,
      },
      home:{
        height:200 ,
        width: 390,
        borderRadius: 15,
        backgroundColor:'#7210FF',
        justifyContent:'center',
        marginLeft:7,
      },
      img:{
        height:30,
        width:30,
      },
      service:{
        paddingTop:15,
       flexDirection: 'row',
       flex: 1,
       paddingHorizontal:4,
       marginBottom:30
      },
      services:{
       flexDirection: 'row',
       flex: 3,
       paddingHorizontal:1,
      },
      bold: {
        marginRight:245,
        fontWeight: 'bold',
        fontSize:18
      },
      tit:{
        paddingBottom:20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      tet:{
        fontSize:20,
        fontWeight:'bold',
      },
      class:{
        marginBottom:30,
      },
      categories: {
        paddingBottom:40,
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal:7,
        paddingLeft:20,
        justifyContent: 'space-around'
      },
      categories2: {
          flexDirection: 'row',
          flex: 1,
          paddingHorizontal:7,
          paddingLeft:20,
          justifyContent: 'space-around',
          paddingBottom:40,
        },
        bar:{
          flexDirection: 'row',
          flex: 1,
          paddingHorizontal:7,
          paddingLeft:20,
          justifyContent: 'space-around',
          backgroundColor:'#E5E5E5',
          borderRadius:20,
        },
        item:{
          justifyContent: 'center',
          alignItems: 'center'
        },
      ic:{
        paddingLeft:25,
        width:35,
        height:35,
        // backgroundColor:'#F3EBCF',
        // borderRadius:40
        backgroundColor:'#FFFBED',
        borderRadius:4
      },
      text:{
     fontSize:15,
     marginTop:10,
    //  marginRight:10,
      },
      sliderContainer: {
        height:200 ,
        width: 390,
        borderRadius: 15,
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        
      },
      wrapper: {},
      slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
      },
    
  });