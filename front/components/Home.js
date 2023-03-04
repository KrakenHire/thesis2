
import { StyleSheet, Text, View,Image, SafeAreaView,TextInput, TouchableOpacity } from 'react-native';
import icons from '../assets/icons/index';
import Search from './Search';


function Home() {

  
  return (
    <View style={styles.container}>
      <SafeAreaView  >
    <View style={styles.header}>
      <Image style={styles.profile} source={icons.profile}/>
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
      <View style={styles.item}>
      <Image style={styles.ic} source={icons.cleaning}/>
      <Text style={styles.text}> Cleaning</Text>
      </View>
      <View style={styles.item}>
      <Image style={styles.ic} source={icons.repair}/>
      <Text style={styles.text}> Reparing</Text>
      </View>
      <View style={styles.item}>
      <Image style={styles.ic} source={icons.painting}/>
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
      <Image style={styles.ic} source={icons.home}/>
      </View>
       <View style={styles.item}>
      <Image style={styles.ic} source={icons.imbox}/>
      </View>
      <View style={styles.item}>
      <Image style={styles.ic} source={icons.calender}/>
      </View>
      <View style={styles.item}>
      <Image style={styles.ic} source={icons.avatar}/>
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
