
import { View, ScrollView, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import icons from '../assets/icons';
import config from '../config';

// const providers = [
//     {
//         username: 'rania',
//         image:
//           'https://fac.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Ffac.2F2022.2F08.2F29.2F9fecc4ef-2adb-4778-8987-0bd19806480d.2Ejpeg/1200x900/quality/80/crop-from/center/focus-point/1016%2C797/4-sites-pour-trouver-une-femme-de-menage.jpeg',
//        review:22,
//        price:' 20',
//       service: 'Cleaning',
//       adress:'133 tboulba Monastir'
//         },
//     {
//         username: 'ines',
//         image:
//           'https://www.shutterstock.com/image-photo/young-african-woman-degergent-basket-260nw-2054513045.jpg',
//        review:22,
//        price:' 30 ',
//       service: 'Cleaning'
//         },
//     {
//         username: 'farouk',
//         image:
//           'https://www.plumbingbyjake.com/wp-content/uploads/2015/11/VIGILANT-plumber-fixing-a-sink-shutterstock_132523334-e1448389230378.jpg',
//        review:22,
//        price:' 20 DNT',
//        service: 'Plumbing'
//         },
//     {
//         username: 'amine',
//         image:
//           'https://www.benjaminfranklinplumbing.com/images/blog/10-Reasons-Why-a-Professional-Plumber-Is-Better-Than-DIY-_-Katy-TX.jpg',
//        review:22,
//        price:' 20 DNT',
//        service: 'Plumbing'
//         },
//     {
//         username: 'yosra',
//         image:
//           'https://www.o2.fr/documents/20124/2048897/choisir-femme-de-menage-p.jpg/92b09923-a6aa-37fd-d528-404d5d4d2995?t=1633956700178',
//        review:22,
//        price:' 20 DNT',
//        service: 'Cleaning'
//         },
  
//   ];


function Categories() {
    const navigation=useNavigation();
    const [providers, setProviders] = useState([]);


    useEffect(() => {
        axios.get(`${config}/provider`)
          .then(response => {setProviders(response.data);
          console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk",response.data);})
          .catch(error => console.error(error))
      }, []);

   const handleIconClick = (service) => {
  const filteredProviders = providers.filter(provider => provider.service=== service);

    navigation.navigate('list', { providers: filteredProviders ,service:service , source: icons[`${service}`] });};
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
         
          
         <Card.Title style={{fontSize:22,} } >
                   All SERVICES
          </Card.Title> 

          <Card.Divider />
    
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
          
        <View style={styles.categories2}>
       
      <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Security')} >
        <Image style={styles.ic} source={icons.Security }/>
        <Text style={styles.text}> Security </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Renovation')} >
        <Image style={{height:40, width:40,backgroundColor:'#FFFBED',}} source={icons.Renovation}/>
        <Text style={styles.text}> Renovation</Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Roofing')} >
        <Image style={styles.ic} source={icons.Roofing}/>
        <Text style={styles.text}> Roofing </Text>
        </TouchableOpacity >
        </View>
        <View style={styles.categories2}>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Gardening')} >
        <Image style={styles.ic} source={icons.Gardening }/>
        <Text style={styles.text}>Gardening </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Welding')} >
        <Image style={{height:40, width:45,backgroundColor:'#FFFBED',}} source={icons.Welding}/>
        <Text style={styles.text}>Welding</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Woodman')} >
        <Image style={{height:40, width:45,backgroundColor:'#FFFBED',}} source={icons.Woodman}/>
        <Text style={styles.text}>Wood man</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.categories2}>
        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Design')} >
        <Image style={styles.ic} source={icons.Design }/>
        <Text style={styles.text}> Design </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}  onPress={() => handleIconClick('Wallpapering')} >
        <Image style={{height:38, width:35,backgroundColor:'#FFFBED',}} source={icons.Wallpapering}/>
        <Text style={styles.text}> Wallpapering</Text>
        </TouchableOpacity>
        </View>

        </Card>
        </View>
        </ScrollView>
  )
}

export default Categories
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fonts: {
      marginBottom: 8,
    },
    user: {
      flexDirection: 'row',
      marginBottom: 6,
      justifyContent: 'space-between'
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 10,
      borderRadius:10
    },
    name: {
      fontSize: 16,
      marginTop: 5,
      
    },
    // ic:{
    //    marginRight:25,
    //     width:35,
    //     height:35,
    //   },
      categories: {
        paddingBottom:50,
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal:7,
        paddingLeft:20,
        justifyContent: 'space-around',
        marginTop:40
      },
      categories2: {
          flexDirection: 'row',
          flex: 1,
          paddingHorizontal:7,
          paddingLeft:20,
          justifyContent: 'space-around',
          paddingBottom:50,
        },
        item:{
            justifyContent: 'center',
            alignItems: 'center'
          },
        ic:{
          paddingLeft:25,
          width:40,
          height:40,
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
    });