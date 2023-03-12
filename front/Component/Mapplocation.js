import React,{useState} from 'react';

import MapView, { Marker,Callout, Circle , PROVIDER_GOOGLE,} from 'react-native-maps';
import { Dimensions, StyleSheet, View,Text, Button, } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';


import { GOOGLE_API_KEY } from '../envirment';

import { useNavigation } from '@react-navigation/native';


export default function Mapplocation() {
  const navigation=useNavigation()
  const[loc,setLoc] =React.useState({streetAddress:"",city:"",state:"",country:""})
 const [pin, setpin] = React.useState({ latitude: 36.8189700,
  longitude: 10.1657900,})
  var addressComponent;

  
  onChangeValue = pin =>{
    
     setpin({
    pin
   
  })
  Geocoder.init(GOOGLE_API_KEY)
  Geocoder.from(pin)
  .then(json => {
    const addressComponents = json.results[0].address_components;
    let streetNumber, streetName, city, state, country;

    // Loop through the address components to extract the relevant information
    addressComponents.forEach(component => {
      const types = component.types;
      if (types.includes('street_number')) {
        streetNumber = component.long_name;
      } else if (types.includes('route')) {
        streetName = component.long_name;
      } else if (types.includes('locality')) {
        city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        state = component.long_name;
      } else if (types.includes('country')) {
        country = component.long_name;
      }
  })
  const streetAddress = `${streetNumber} ${streetName}`;
    console.log(`Street Address: ${streetAddress}`);
    console.log(`City: ${city}`);
    console.log(`State/Province: ${state}`);
    console.log(`Country: ${country}`);
    setLoc({streetAddress: `${streetAddress}`,city: `${city}`,state: `${state}`,country: `${country}`})
  })
  .catch(error => {console.warn(error)
        alert(error)})
}
  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setpin({ 
        latitude:location.coords.latitude,
        longitude: location.coords.longitude}) 
    
  })();
}, []);
  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map} 
      provider={PROVIDER_GOOGLE}
   
      initialRegion={{
          latitude: 36.8189700,
          longitude: 10.1657900,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0005,
    }}
    showsUserLocation={true}
   
    onRegionChangeComplete ={(e)=>onChangeValue(e)}
   
    >
      
     
      <Marker 
        coordinate={pin} 
        draggable={true}
        onDragStart={(e)=>{
          console.log("Drag Srart",e.nativeEvent.coordinate);}}
        onDragEnd={(e)=>{
          console.log("Drag End",e.nativeEvent.coordinate);
          setpin({ 
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude})}}
          
       >
       <Callout>
        <Text> hello </Text>
        
       </Callout>
       </Marker>
       <Circle
        center={pin}
          radius={100}
          />
       
    </MapView>
   
     <View style={styles.searchContainer}>
    <GooglePlacesAutocomplete
      placeholder='Search'
    
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
    />
     

    </View> 
    <View style={{position:'absolute' ,bottom:50,zIndex:1,left:110,borderRadius:70,}}>
         <Button title='confirm your position ' onPress={()=>navigation.navigate('Pay',{adresse:loc})} >
        </Button>
        
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer:{
    position:"absolute",
    width:"50%",
    backgroundColor:"white",
    shadowColor:"black",
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5,
    shadowRadius:4,
    elevation:4,
    padding:8,
    borderRadius:40,
    top:10,
    

  },
  input:{
    borderColor:"#888",
    borderWidth:1,

  }
})


