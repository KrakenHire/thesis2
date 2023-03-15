
import { View, ScrollView, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { CheckBox } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import icons from '../assets/icons';



function ProviderList({route}) {
    const navigation=useNavigation()
        const { providers } = route.params;
        const { service } = route.params;
        const { source } = route.params;
    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
         
          
         <Card.Title style={{fontSize:22} } >
                   {service} Service  <Image style={styles.ic} source={source}/>
          </Card.Title> 
         
          
      
          <Card.Divider />
    
          {providers.map((u, i) => {
            return (
              <View key={i} style={styles.user}>
                 <TouchableOpacity onPress={() =>  navigation.navigate("ProviderProfile", {provider :u})}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: u.image }}
                />
                 </TouchableOpacity>
                <Text style={styles.name}>
                    <Text style={{ fontWeight: 'bold'}}> {u.username}{'\n'}</Text>
                    <Text style={{ fontWeight: 'bold', color:'#7210FF'}}>{u.price} DNT </Text>{'\n'}
                    <Image style={{width:20,height:20}} source={icons.adress}/> {u.adresse}{'\n'} 
                    <Image  style={{width:20,height:20}} source={icons.star}/>
                    {u.review}  Reviews {'\n'} 
                    
                    </Text>
                    
                    <CheckBox       
        checked={checked}
        checkedIcon="bookmark"
        uncheckedIcon="bookmark-o"
        checkedColor="black"
        onPress={toggleCheckbox}
      />
              </View>
            );
          })}
        </Card>
        </View>
        </ScrollView>
  )
}

export default ProviderList
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
      width: 110,
      height: 110,
      marginRight: 10,
      borderRadius:10
    },
    name: {
      fontSize: 16,
      marginTop: 5,
      marginRight:30
      
    },
    ic:{
       marginRight:25,
        width:35,
        height:35,
      },
     
    });
