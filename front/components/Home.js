
import { StyleSheet, Text, View,Image, SafeAreaView,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import icons from '../assets/icons/index';
import Search from './Search';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar.js';
import React, { useEffect,useState } from 'react';
import axios from 'axios';



// const providers = [
//   {
//       name: 'rania',
//       avatar:
//         'https://fac.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Ffac.2F2022.2F08.2F29.2F9fecc4ef-2adb-4778-8987-0bd19806480d.2Ejpeg/1200x900/quality/80/crop-from/center/focus-point/1016%2C797/4-sites-pour-trouver-une-femme-de-menage.jpeg',
//      review:22,
//      price:' 20 DNT',
//     service: 'cleaning'
//       },
//   {
//       name: 'ines',
//       avatar:
//         'https://www.shutterstock.com/image-photo/young-african-woman-degergent-basket-260nw-2054513045.jpg',
//      review:22,
//      price:' 20 DNT',
//     service: 'cleaning'
//       },
//   {
//       name: 'farouk',
//       avatar:
//         'https://www.bossecheztoi.com/wp-content/uploads/2017/02/embaucher-femme-menage-800x500_c.jpg',
//      review:22,
//      price:' 20 DNT',
//      service: 'cleaning'
//       },
//   {
//       name: 'ghada',
//       avatar:
//         'https://st2.depositphotos.com/1177973/10312/i/600/depositphotos_103127808-stock-photo-woman-cleaning-with-mop.jpg',
//      review:22,
//      price:' 20 DNT',
//      service: 'plumbing'
//       },
//   {
//       name: 'amine',
//       avatar:
//         'https://www.o2.fr/documents/20124/2048897/choisir-femme-de-menage-p.jpg/92b09923-a6aa-37fd-d528-404d5d4d2995?t=1633956700178',
//      review:22,
//      price:' 20 DNT',
//       },
// {
// name: 'thot leader',
// avatar:
//   'https://www.tayara.tn/mediaGateway/resize-image?img=6c/6c820727-cbc9-49d2-bb4e-973f841fdf57&w=1000',
// },
// // {
// //   name: 'jsa',
// //   avatar: 'https://uifaces.co/our-content/donated/bUkmHPKs.jpg',
// // },
// {
// name: 'talhaconcepts',
// avatar: 'https://www.tayara.tn/mediaGateway/resize-image?img=6c/6c820727-cbc9-49d2-bb4e-973f841fdf57&w=1000',
// service: 'cleaning'
// },
// // {
// //   name: 'andy vitale',
// //   avatar: 'https://uifaces.co/our-content/donated/NY9hnAbp.jpg',
// // },
// {
// name: 'katy friedson',
// avatar:
//   'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
// },
// ];


function Home() {
  const [providers, setProviders] = useState([]);
  const navigation=useNavigation()

  useEffect(() => {
    axios.get('//xp-j8k.anonymous.front.exp.direct:3000/provider')
      .then(response => {setProviders(response.data);
      console.log(response.data);})
      .catch(error => console.error(error))
  }, []);

  const handleIconClick = (service) => {
  const filteredProviders = providers.filter(provider => provider.service=== service);

    navigation.navigate('list', { providers: filteredProviders ,service:service , source: icons[`${service}`] });};

  return (
    <ScrollView>
      {console.log("hello",providers)}
    <View style={styles.container}>
      <SafeAreaView  >
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
      <Image style={styles.profile} source={icons.profile}/>
      </TouchableOpacity>
      <View style={styles.name} >
      <Text >HELLO <Image style={styles.img} source={icons.greeting}/></Text>
      <Text style={{fontWeight: 'bold'}}>Name </Text>
       </View>
      <View style={styles.icon}>
      <Image style={styles.notification} source={icons.notification}/>
      <Image style={styles.notification} source={icons.bookMark}/>
    
    </View>
    </View>
    </SafeAreaView>    
 
   <Search/>
   <Image style={styles.home} source={icons.homeh}/>

   <View style={styles.service} >
    <Text style={styles.bold}>Services</Text>
    <Text style={{fontSize:18, color: '#7210FF',   fontWeight: 'bold' }}>See All</Text>
    </View>

    <View style={styles.categories}>
      <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('cleaning')} >
       <Image style={styles.ic} source={icons.cleaning} />
       <Text style={styles.text}> Cleaning</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Reparing')} >
      <Image style={styles.ic} source={icons.repair} />
      <Text style={styles.text}> Reparing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('painting')} >
      <Image style={styles.ic} source={icons.painting}/>
      <Text style={styles.text}> Panting</Text>
      </TouchableOpacity>
    </View>
    
    <View style={styles.categories2}>
    <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('electrecity')} >
      <Image style={styles.ic} source={icons.elec}/>
      <Text style={styles.text}> Electricity </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('plumbing')} >
      <Image style={styles.ic} source={icons.plumbing}/>
      <Text style={styles.text}> Plumbing </Text>
      </TouchableOpacity >
      <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Hairdressing')} >
      <Image style={styles.ic} source={icons.hair}/>
      <Text style={styles.text}> Haidressing </Text>
      </TouchableOpacity>
      </View>
      {/* <ProviderList providers={filteredProviders} /> */}
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
      color:'#7210FF'
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
    }, 
    text:{
   fontSize:15,
   marginTop:10,
  //  marginRight:10,
    },
   
   
});
