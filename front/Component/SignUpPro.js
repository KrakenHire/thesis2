import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView ,TouchableOpacity } from 'react-native';
import { auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged  } from '../firebase'

const SignUpPro = () => {
  const [service, setService] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [adresse, setAdresse] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation=useNavigation()

    useEffect (() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace("Home")
          navigation.replace("Home")
        }
      })
    
      return unsubscribe;
    }, [auth, navigation]);


  const handleSubmit = () => {
    
    createUserWithEmailAndPassword( auth,email, password)
    .then(userCredentials => {
      const user = userCredentials._tokenResponse.localId;
      console.log( userCredentials,"firebase");
      axios.post('http://192.168.43.169:3000/provider', {

      idproviders:user,
      service:service,
      username:username,
      age:age,
      experience:experience,
      adresse:adresse,
      image:image,
      bio:bio,
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
    <ScrollView contentContainerStyle={styles.container}>
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
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Experience"
        value={experience}
        onChangeText={setExperience}
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
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />

      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
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