import { useNavigation } from '@react-navigation/native'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View ,StyleSheet, TouchableOpacity} from 'react-native'
import { auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged  } from '../firebase'
import axios from 'axios'
  const LoginScreenUser =()=> {
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




    const handleSubmit = () => {
    
        createUserWithEmailAndPassword( auth,email, password)
        .then(userCredentials => {
          const userr = userCredentials._tokenResponse.localId;
          console.log( userCredentials,"firebase");


          axios.post('http://192.168.136.182:3000/user', {
            iduser:userr,
            username:userName,
           
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

      const handleLogin = async () => {
        try {
          await signInWithEmailAndPassword(auth ,email, password);
        } catch (error) {
          switch (error.code) {
            case 'auth/invalid-email':
              setErrorMessage('Invalid email address');
              break;
            case 'auth/user-disabled':
              setErrorMessage('Your account has been disabled');
              break;
            case 'auth/user-not-found':
              setErrorMessage('Account not found');
              break;
            case 'auth/wrong-password':
              setErrorMessage('Incorrect password');
              break;
            default:
              setErrorMessage('An unknown error occurred');
              break;
          }
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
        onPress={handleLogin}
        style={styles.button}
        >
         
         <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button , styles.buttonOutLine]}
        >
         <Text style={styles.buttonOutLineText}>SignUp !</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('forgetPass')}}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

       </View>
      </KeyboardAvoidingView>
    )
  }


export default LoginScreenUser
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