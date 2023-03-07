import { StyleSheet, Text, View,Image, SafeAreaView,TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import icons from '../assets/icons/index';
import Search from './Search';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Home() {
  const navigation=useNavigation();
  const [userr, setUserr] = useState(null);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userr = await AsyncStorage.getItem("userr");
        if (userr !== null) {
          setUserr(JSON.parse(userr));
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
          const response = await axios.get(`http://192.168.225.182:3000/user/${userId}`);
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
  
  const press = () => {
    navigation.navigate("UserProfile");
  };

  if (isLoading) {
    // Render a loading indicator
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={press}>
            <Image style={styles.profile} source={icons.profile} />
          </TouchableOpacity>
          <View style={styles.name}>
            <Text>HELLO <Image style={styles.img} source={icons.greeting} /></Text>
            {name !== null && <Text style={{ fontWeight: 'bold' }}>{name}</Text>}
          </View>
          <View style={styles.icon}>
         
    
          </View>
        </View>
      </SafeAreaView>
 
      <Search />
      <Image style={styles.home} source={icons.homeh} />
  
      <View style={styles.service}>
        <Text style={styles.bold}>Services</Text>
        <Text style={{ fontSize: 18, color: '#7210FF', fontWeight: 'bold' }}>See All</Text>
      </View>
  
      <View style={styles.categories}>
        <TouchableOpacity style={styles.item} onPress={() =>
          navigation.navigate("ProviderProfile")
        } >
          <Image style={styles.ic} source={icons.cleaning} />
          <Text style={styles.text}> Cleaning</Text>
        </TouchableOpacity>
        <View style={styles.item}>
          <Image style={styles.ic} source={icons.repair} />
          <Text style={styles.text}> Reparing</Text>
        </View>
        <View style={styles.item}>
          <Image style={styles.ic} source={icons.painting} />
          <Text style={styles.text}> Panting</Text>
        </View>
      </View>

    
    <View style={styles.categories2}>
      <View style={styles.item}>
      <Image style={styles.ic} source={icons.elec}/>
      <Text style={styles.text}> Electricity </Text>
      </View>
      <View style={styles.item}>
      <Image style={styles.ic} source={icons.plumbing}/>
      <Text style={styles.text}> Plumbing </Text>
      </View>
      <View style={styles.item}>
      <Image style={styles.ic} source={icons.hair}/>
      <Text style={styles.text}> Haidressing </Text>
      </View>
      </View>

      <View style={styles.tit} >
    <Text  style={styles.tet}>Most Popular Services</Text>
     </View>

      <View style={styles.bar}>
      <View style={styles.item}>
     
      </View>
      <TouchableOpacity
                onPress={() => 
                  navigation.navigate("Chat")
                  
                }
            >
       <View style={styles.item}>
      
      </View>
      </TouchableOpacity>
      <View style={styles.item}>
     
      </View>
      <View style={styles.item}>
     
      </View>
      </View>
   
      </View>
  
   
  )
}

export default Home
const styles = StyleSheet.create({ 
  container: {
  flex: 1,
  width:400,
  
  },
  cont :{
    fontSize:20,
  },

  header:{
      flexDirection: 'row',
      justifyContent: 'space-between' ,
      alignItems:'center',
      paddingTop:60,  
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
      fontWeight:'bold'
    },
    class:{
      marginBottom:20,

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
    }, 
    text:{
   fontSize:15,
   marginTop:10,
  //  marginRight:10,
    },
   
   
});
