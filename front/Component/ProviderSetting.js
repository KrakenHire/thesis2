
import { View, SafeAreaView, StyleSheet, TouchableOpacity,Text } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  TextInput,} from 'react-native-paper';
import { MaterialCommunityIcons, AntDesign, MaterialIcons, FontAwesome, FontAwesome5, Ionicons, Entypo } from '@expo/vector-icons';
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import axios from 'axios';
import React, { useState,useEffect} from 'react';
import SimpleLottie from '../Component/SimpleLottie';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {
  const navigation = useNavigation()
 

  const[update,setUpdate]=useState(false)
  const [providerId, setProviderId] = useState(null);
  const [name, setName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show1, setShow1] = useState(true)
  const [show2, setShow2] = useState(true)
  const [show0, setShow0] = useState(true)
  const [show3, setShow3] = useState(true)
  const [show4, setShow4] = useState(true)
  const [show5, setShow5] = useState(true)
  const [show6, setShow6] = useState(true)
  const[service,setService]=useState("")
   const[username,setUsername]=useState("")
  const[experience,setExperience]=useState("")
  const[age,setAge]=useState(0)
  const[adresse,setAdresse]=useState("")
  const[price,setPrice]=useState(0)
  const[aboutMe,setAboutMe]=useState("")

  useEffect(() => {
    const getProviderId = async () => {
      try {
        const providerId = await AsyncStorage.getItem("providerId");
        if (providerId !== null) {
         setProviderId(JSON.parse(providerId));
          console.log("hello im a providerId id ",providerId);
          return JSON.parse(providerId);
          
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    
    const fetchData = async () => {
      const providerIdd = await getProviderId();
      if (providerIdd !== null) {
        try {
          const response = await axios.get(`${config}/provider/${providerIdd}`);
          setName(response.data);
          
         
        } 
        catch (error) {
          console.log(error);
         
        }
      } 
    };
    
    fetchData();
  },[update]);



 
  
  // const [userr, setUserr] = useState(null);
 
  // const { Upper1} = route.params
  // const { Upper2 } = route.params
  // const { Upper3 } = route.params
  
  // const getUser = async () => {
  //   try {
  //     const userr = await AsyncStorage.getItem("userr");
  //     if (userr !== null) {
  //       setUserr(JSON.parse(userr));
  //       console.log("hello im a user id ",userr);
  //       return JSON.parse(userr);
      
  //     }
  //     return null;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };
 
  

 
  const oppp0 = async (x) => {
    console.log(service, "le user name");
    try {
    console.log(name,"aa");
   
      const res = await axios.put(`${config}/provider/${name.idproviders}`,{service:service});
      console.log("testetsstettst",{service:service}, "messssssssssssssss");
      setUpdate(!update)
      setShow0(!show0)
  
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  
  };
 
  const oppp1 = async (x) => {
    console.log(username, "le user name");
    try {
    console.log(name,"aa");
   
      const res = await axios.put(`${config}/provider/${name.idproviders}`,{username:username});
      console.log("testetsstettst",{username:username}, "messssssssssssssss");
      setUpdate(!update)
    
      setShow1(!show1)
     
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  
  };
  const oppp2 = async (x) => {
    console.log(age, "le user name");
    try {
    console.log(name,"aa");
   
      const res = await axios.put(`${config}/provider/${name.idproviders}`,{age:age});
      console.log("testetsstettst",{age:age}, "messssssssssssssss");
      setUpdate(!update)
      setShow2(!show2)
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  
  };
  
  const oppp3 = async (x) => {
    console.log(experience, "le user name");
    try {
    console.log(name,"aa");
   
      const res = await axios.put(`${config}/provider/${name.idproviders}`,{experience:experience});
      console.log("testetsstettst",{experience:experience}, "messssssssssssssss");
      setUpdate(!update)
      setShow3(!show3)
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  
  };

  const oppp4 = async (x) => {
    console.log(adresse, "le user name");
    try {
    console.log(name,"aa");
   
      const res = await axios.put(`${config}/provider/${name.idproviders}`,{adresse:adresse});
      console.log("testetsstettst",{adresse:adresse}, "messssssssssssssss");
      setUpdate(!update)
      setShow4(!show4)
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  
  };

  const oppp5 = async (x) => {
    console.log(price, "le user name");
    try {
    console.log(name,"aa");
   
      const res = await axios.put(`${config}/provider/${name.idproviders}`,{price:price});
      console.log("testetsstettst",{price:price}, "messssssssssssssss");
      setUpdate(!update)
      setShow5(!show5)
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  
  };

  const oppp6 = async (x) => {
    console.log(aboutMe, "le user name");
    try {
    console.log(name,"aa");
   
      const res = await axios.put(`${config}/provider/${name.idproviders}`,{aboutMe:aboutMe});
      console.log("testetsstettst",{aboutMe:aboutMe}, "messssssssssssssss");
      setUpdate(!update)
      setShow6(!show6)
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  
  };


  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        AsyncStorage.clear()
        navigation.replace("choises")
      })
      .catch(error => alert(error.message))
  }
  // const onchange0 = (e) => {
  //   console.log(e);
  //   setUsername(e)
  // }
  // const onchange1 = (e) => {
  //   setFirstName(e)
  // }
  // const onchange2 = (e) => {
  //   setLastName(e.target.value)
  // }
  // const onchange3 = (e) => {
  //   setAge(e.target.value)
  // }
 
  const statu0 = () => {
    setShow0(false)
  }
  const statu1 = () => {
    setShow1(false)
  }
  const statu2 = () => {
    setShow2(false)
  }
  const statu3 = () => {
    setShow3(false)
  }
  const statu4 = () => {
    setShow4(false)
  }

  const statu5 = () => {
    setShow5(false)
  }
  const statu6 = () => {
    setShow6(false)
  }
  // const up0 = () => {
  //   oppp(username,name.userId)
  //   setShow0(true)
  // }
  // const up1 = () => {
  //   Upper1(firstName)
  //   setShow1(true)
  // }
  // const up2 = () => {
  //   Upper2(lastName)
  //   setShow2(true)
  // }
  // const up3 = () => {
  //   Upper3(age)
  //   setShow3(true)
  // }
  // const up4 = () => {
  //   Upper4(quantity, props.item.id)
  //   setShow(true)
  // }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: 'https://freepngimg.com/thumb/man/22654-6-man-thumb.png',
            }}
            size={120} style={{ marginTop: 40, marginLeft: 120 }}
          />

        </View>
        <View style={{ marginLeft: 100 }}>
          
          {/* <Title style={[styles.title, {
            marginTop: 50,
            marginBottom: 5,

          }]}>ines debbichi</Title> */}
          {/* <Caption style={styles.caption}>@j_doe</Caption> */}
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={{ marginTop: 20, padding: 20, backgroundColor: "#fff", borderRadius: 20 }}>
          <View style={{ color: "#7210ff", flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginTop: 10, borderBottomColor: "#eee", borderBottomWidth: 2 }} >
            <View style={{ flexDirection: 'row' }} >

            <MaterialIcons name="miscellaneous-services" size={24} color="black" />
              <Text style={{ color: "#777777", marginLeft: 15, fontSize: 20 }}>{name.service}</Text>
              </View>
            <FontAwesome name="edit" size={20} style={{ color: "#7210ff" }} onPress={statu0} />
          </View>
          {!show0 && <TextInput onChangeText={newText => setService(newText) } style={{borderRadius:10}} placeholder="UserName"/>}
            {!show0 && <TouchableOpacity onPress={()=>oppp0()}><Text style={{ color: "green" , marginLeft:90}}>tap here to check</Text></TouchableOpacity>}

          <View style={{ color: "#7210ff", flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginTop: 10, borderBottomColor: "#eee", borderBottomWidth: 2 }} >
            <View style={{ flexDirection: 'row' }} ><FontAwesome5 name="user" size={20} style={{ color: "#000" }} />
            <Text style={{ color: "#777777", marginLeft: 15, fontSize: 20 }}>{name.username}</Text></View>
            <FontAwesome name="edit" size={20} style={{ color: "#7210ff" }} onPress={statu1} />
          </View>
          {!show1 && <TextInput onChangeText={newText => setUsername(newText) } style={{borderRadius:10}} placeholder="FirstNAme"/>}
            {!show1 && <TouchableOpacity onPress={()=>oppp1()}><Text style={{ color: "green" , marginLeft:90}}>tap here to check</Text></TouchableOpacity>}


          <View style={{ color: "#7210ff", flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginTop: 10, borderBottomColor: "#eee", borderBottomWidth: 2 }} >
            <View style={{ flexDirection: 'row' }} ><MaterialIcons name="cake" size={20} color="black" />
            <Text style={{ color: "#777777", marginLeft: 15, fontSize: 20 }}>{name.age}</Text></View>
            <FontAwesome name="edit" size={20} style={{ color: "#7210ff" }} onPress={statu2} />
         
          </View>
          {!show2 && <TextInput onChangeText={newText => setAge(newText) } style={{borderRadius:10}} placeholder="LastName" />}
            {!show2 && <TouchableOpacity onPress={()=>oppp2()}><Text style={{ color: "green", marginLeft:90 }}>tap here to check</Text></TouchableOpacity>}


          <View style={{ color: "#7210ff", flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginTop: 10, borderBottomColor: "#eee", borderBottomWidth: 2 }} >
            <View style={{ flexDirection: 'row' }} ><MaterialIcons name="home-repair-service" size={20} color="black" />
            <Text style={{ color: "#777777", marginLeft: 15, fontSize: 20 }} >{name.experience}</Text></View>
            <FontAwesome name="edit" size={20} style={{ color: "#7210ff" }} onPress={statu3} />
           
          </View>
          {!show3 && <TextInput onChangeText={newText => setExperience(newText) } style={{borderRadius:10}} placeholder="Age"/>}
            {!show3 && <TouchableOpacity onPress={()=>oppp3()}><Text style={{ color: "green", marginLeft:90 }}>tap here to check</Text></TouchableOpacity>}
           
            <View style={{ color: "#7210ff", flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginTop: 10, borderBottomColor: "#eee", borderBottomWidth: 2 }} >
            <View style={{ flexDirection: 'row' }} ><Entypo name="address" size={20} color="black" />
            <Text style={{ color: "#777777", marginLeft: 15, fontSize: 20 }} >{name.adresse}</Text></View>
            <FontAwesome name="edit" size={20} style={{ color: "#7210ff" }} onPress={statu4} />
           
          </View>
          {!show4 && <TextInput onChangeText={newText => setAdresse(newText) } style={{borderRadius:10}} placeholder="Adress"/>}
            {!show4 && <TouchableOpacity onPress={()=>oppp4()}><Text style={{ color: "green", marginLeft:90 }}>tap here to check</Text></TouchableOpacity>}
        

            <View style={{ color: "#7210ff", flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginTop: 10, borderBottomColor: "#eee", borderBottomWidth: 2 }} >
            <View style={{ flexDirection: 'row' }} ><Entypo name="price-tag" size={20} color="black" /> 
            <Text style={{ color: "#777777", marginLeft: 15, fontSize: 20 }} >{name.price}</Text></View>
            <FontAwesome name="edit" size={20} style={{ color: "#7210ff" }} onPress={statu5} />
           
          </View>
          {!show5 && <TextInput onChangeText={newText => setPrice(newText) } style={{borderRadius:10}} placeholder="Price"/>}
            {!show5 && <TouchableOpacity onPress={()=>oppp5()}><Text style={{ color: "green", marginLeft:90 }}>tap here to check</Text></TouchableOpacity>}
          
            <View style={{ color: "#7210ff", flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginTop: 10, borderBottomColor: "#eee", borderBottomWidth: 2 }} >
            <View style={{ flexDirection: 'row' }} ><FontAwesome name="address-book" size={20} color="black" /> 
            <Text style={{ color: "#777777", marginLeft: 15, fontSize: 20 }} >{name.aboutMe}</Text></View>
            <FontAwesome name="edit" size={20} style={{ color: "#7210ff" }} onPress={statu6} />
           
          </View>
          {!show6 && <TextInput onChangeText={newText => setAboutMe(newText) } style={{borderRadius:10}} placeholder="AboutMe"/>}
            {!show6 && <TouchableOpacity onPress={()=>oppp6()}><Text style={{ color: "green", marginLeft:90 }}>tap here to check</Text></TouchableOpacity>}


        </View>

        

      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ProfileScreen;
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
    marginLeft: 90,
  },
});