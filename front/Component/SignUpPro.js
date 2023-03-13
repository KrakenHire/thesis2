import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView ,TouchableOpacity ,Alert} from 'react-native';
import { auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged  } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import config from '../config';






const SignUpPro = () => {
  const [service, setService] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [adresse, setAdresse] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
 
  const [errorMessage, setErrorMessage] = useState(null);
  const [services, setServices] = useState("services");

  const navigation=useNavigation()

    useEffect (() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace("ServiceProProfile")
        }
      })
    
      return unsubscribe;
    }, [auth, navigation]);


  const handleSubmit = async () => {
    if (!service || !username || !email || !password  || !adresse || !price || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const providerId = userCredentials._tokenResponse.localId;
      console.log(userCredentials, "firebase");
      await AsyncStorage.setItem("providerId", JSON.stringify(userCredentials._tokenResponse.localId));
      const response = await axios.post(`${config}/provider`, {
        idproviders:providerId,
        service:service,
        username:username,
        adresse:adresse,
        price:price,
        phoneNumber:phoneNumber,
        aboutMe:bio,
        image:image,
      });
  
      console.log(response.data, "response");
      Alert.alert('Success', 'Your form has been submitted.');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('Email already in use');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Invalid email address');
          break;
        case 'auth/weak-password':
          setErrorMessage('Password should be at least 6 characters');
          break;
        default:
          setErrorMessage('An unknown error occurred');
          break;
      }
      console.log(error, "error");
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  }
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

     
      <Picker
  style={styles.input}
  selectedValue={services}
  onValueChange={(itemValue) => setService(itemValue)}
>
  <Picker.Item label="Services" value="" enabled={false} />
  <Picker.Item label="Cleaning" value="Cleaning" />
  <Picker.Item label="Plumbing" value="Plumbing" />
  <Picker.Item label="Repairing" value="Repairing" />
  <Picker.Item label="Painting" value="Painting" />
  <Picker.Item label="Electrical" value="Electrical" />
  <Picker.Item label="Hairdressing" value="Hairdressing" />
  <Picker.Item label="Security" value="Security" />
  <Picker.Item label="Roofing" value="Roofing" />
  <Picker.Item label="Design" value="Design" />
  <Picker.Item label="Handyman" value="Handyman" />
  <Picker.Item label="Land scaping" value="Land scaping" />
  <Picker.Item label="Renovation" value="Renovation" />
  <Picker.Item label="Wood man" value="Wood man" />
  <Picker.Item label="Welding" value="Welding" />
  <Picker.Item label="Masonry" value="Masonry" />
  <Picker.Item label="Wallpapering" value="Wallpapering" />
</Picker>



      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={adresse}
        onChangeText={setAdresse}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
       
       <TextInput
        style={styles.input}
        placeholder="PhoneNumber"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="image"
        value={image}
        onChangeText={setImage}
      />

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpPro;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color:"#7210FF",
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#7210FF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    marginBottom:10},
    button: {
      backgroundColor: '#7210FF',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      },
      buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      }
})