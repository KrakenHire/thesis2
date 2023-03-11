import React,{useState} from 'react';
import MapView, { Marker,Callout, Circle , PROVIDER_GOOGLE, CalloutSubview} from 'react-native-maps';
import { Dimensions, StyleSheet, View,Text, TouchableOpacity,Button} from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

import { GOOGLE_API_KEY } from '../envirment';



export default function Mapplocation() {
 const [pin, setpin] = React.useState({ latitude: 36.8189700,
  longitude: 10.1657900,})
  const[adresse, setAdresse] =React.useState("")


  var addressComponent;
  onChangeValue = pin =>{
    
     setpin({
    pin
   
  })
  Geocoder.init(GOOGLE_API_KEY)
   Geocoder.from(pin)
  .then(json => {
         addressComponent = json.results[0].address_components[3];
         console.log(json,"json");
    console.log(json.results[0].address_components);
    alert(addressComponent.long_name)
    setAdresse(addressComponent.long_name)
   
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
<Button title={ 'Facebook' }  />
     
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
<Button title={ 'Facebook' }  />

    <View style={styles.searchContainer}>
  <GooglePlacesAutocomplete
      placeholder='Search'
    
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
    /> 

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
    width:"100%",
    backgroundColor:"white",
    shadowColor:"black",
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5,
    shadowRadius:4,
    elevation:4,
    padding:8,
    borderRadius:8,
    bottom:0,

  },
  input:{
    borderColor:"#888",
    borderWidth:1,

  }
})


