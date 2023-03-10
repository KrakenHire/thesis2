import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';
import { auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged  } from '../firebase'

const SignUpPro = () => {
  const [service, setService] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation=useNavigation()

    useEffect (() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace("Chat")
        }
      })
    
      return unsubscribe;
    }, [auth, navigation]);


  const handleSubmit = () => {
    
    createUserWithEmailAndPassword( auth,email, password)
    .then(userCredentials => {
      const user = userCredentials._tokenResponse.localId;
      console.log( userCredentials,"firebase");
      axios.post('http://192.168.100.8:3000/provider', {

      idproviders:user,
      service: service,
      username:username,
      firstName:firstName,
      lastName:lastName,
      age:age,
      experience:experience,
      city:city,
      region:region,
      price:price

    })
    .then(function (response) {
      console.log(response.data,"response");
    })
    .catch(function (error) {
      console.log(error,"error");
    });
    })
    .catch( (error)=> {
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
    })
    // Send form data to backend 
  
    
   
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Service"
        value={service}
        onChangeText={setService}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
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
       
      />
      <TextInput
        style={styles.input}
        placeholder="Experience"
        value={experience}
        onChangeText={setExperience}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Region"
        value={region}
        onChangeText={setRegion}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
    </ScrollView>
  );
};

export default SignUpPro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

