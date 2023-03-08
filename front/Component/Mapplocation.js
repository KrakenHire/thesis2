import React,{useState} from 'react';
import MapView, { Marker,Callout, Circle,PROVIDER_GOOGLE,Polyline } from 'react-native-maps';
import { Dimensions, StyleSheet,Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function Mapplocation() {
 const [pin, setpin] = React.useState({ latitude: 36.8189700,
  longitude: 10.1657900,})

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
    onUserLocationChange={(e)=>{
      console.log("onUserLocationChange",e.nativeEvent.coordinate);
    }}
   
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
        <Text>I'm here</Text>
        
       </Callout>
       </Marker>
       <Circle
        center={pin}
          radius={100}
          />
    </MapView>
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
  }
})