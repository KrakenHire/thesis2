import React, { useState } from 'react';
import {
SafeAreaView,
Image,
View,
Text,
StyleSheet,
Alert,
TouchableOpacity,
Pressable,
ImageBackground,
ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Confirmation = () => {
  const navigation=useNavigation()

const [isPayPressed, setIsPayPressed] = useState(false);
const randomDate = new Date().toLocaleDateString();
const randomWorkingHours = Math.floor(Math.random() * 10) + 1; // generates a random number between 1 and 10 for working hours
const startingPrice = 20; // starting price
const totalPrice = randomWorkingHours * startingPrice;

const handlePayPress = () => {
setIsPayPressed(true);
Alert.alert('Payment Successful!');
};

return (
  <ScrollView>
<SafeAreaView style={styles.container}>
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Image
        source={{uri: 'https://lirp.cdn-website.com/820dbce4/dms3rep/multi/opt/Gas+Plumbing+services+in+texas-640w.jpg'}}
        style={styles.cardHeaderImage}
      />
      <Text style={styles.cardTitle}>Confirmation</Text>
    </View>
    <View style={styles.cardBody}>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Address :</Text>
        <Text style={styles.sectionValue}>Cebalat Ben Ammar/Gouvernorat de l'Ariana/Tunisia</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>PhoneNumber :</Text>
        <Text style={styles.sectionValue}>+216 51 343 854</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Service :</Text>
        <Text style={styles.sectionValue}>Plumber</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Date :</Text>
        <Text style={styles.sectionValue}>3/13/2023</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Time :</Text>
        <Text style={styles.sectionValue}>08:00 AM</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Working hours :</Text>
        <Text style={styles.sectionValue}>3</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Worker Price :</Text>
        <Text style={styles.sectionValue}>$120</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Total Price :</Text>
        <Text style={styles.sectionValue}>${120*3}</Text>
      </View>
    </View>
    <Pressable
      style={[styles.payButton, isPayPressed && styles.payButtonPressed]}
      onPress={() =>navigation.navigate("Pay")}
    >
      <Text style={styles.payButtonText}>Pay ${totalPrice.toFixed(2)}</Text>
    </Pressable>
  </View>
</SafeAreaView>
</ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardHeader: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  cardHeaderImage: {
    height: 120,
    resizeMode: 'cover',

  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 32,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#666',
  },
  sectionValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  payButton: {
    backgroundColor: '#7210FF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#666',
    alignItems: 'center',
    marginTop:20
  },
  payButtonPressed: {
    backgroundColor: '9a54ff',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardHeader: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    height: 300,
  },
  cardHeaderImage: {
    height: 400,
    resizeMode: 'cover',
  
  },
});





export default Confirmation