import { useNavigation } from '@react-navigation/native'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View ,StyleSheet, TouchableOpacity} from 'react-native'
import { auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged  } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios'
  const SignUpUser =()=> {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);
   
   

    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace("Home")
        
        }
      })
    
      return unsubscribe;
    }, [auth, navigation]);
    
    const handleSubmit = async () => {
        try {
          const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
          const userr = userCredentials._tokenResponse.localId;
          console.log(userCredentials, "firebase");
    
          await AsyncStorage.setItem("userr", JSON.stringify(userCredentials._tokenResponse.localId));
          await axios.post('http:///192.168.11.206:3000/user', {
            iduser: userr,
            username: userName,
           
         
          });
          console.log(response.data, "responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
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
          console.log(error, "errorrrrrrrrrrrrrrrrrrrrrrrrr");
        }
       
      };



      return (
        <KeyboardAvoidingView style={styles.container}
        behavior="padding"
        >
         <View style={styles.inputContainer}>
        
         <TextInput
           placeholder='userName'
           value={userName}
           onChangeText={setUserName}
           style={styles.input}
           />
           <TextInput
           placeholder='email'
           value={email}
           onChangeText={text => setEmail(text)}
           style={styles.input}
           />
           <TextInput
           placeholder='password'
           value={password}
           onChangeText={text => setPassword(text)}
           style={styles.input}
           secureTextEntry
           />
         </View>
         {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
         <View  style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button , styles.buttonOutLine]}
          >
           <Text style={styles.buttonOutLineText}>SignUp !</Text>
          </TouchableOpacity>
         </View>
        </KeyboardAvoidingView>
      )
    }
  
  
  export default SignUpUser
  const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
    },
    inputContainer:{
     width:"80%"
    },
    input:{
      backgroundColor:"white",
      paddingHorizontal: 15,
      paddingVertical :10,
      borderRadius :10,
      marginTop: 5,
    },
    buttonContainer:{
     width:"60%",
     justifyContent:"center",
     alignItems:"center",
     marginTop:40,
    },
    button:{
      backgroundColor: '#7210FF',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutLine:{
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#7210FF',
      borderWidth: 2,
    },
    buttonOutLineText:{
      color: '#7210FF',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonText:{
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
  
    },
    forgotPassword: {
      color: "#7210FF",
      fontSize: 16,
      marginTop: 5,
      textAlign: 'right',
      textDecorationLine: 'underline',
    },
  })

