import { useNavigation } from '@react-navigation/native'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View ,StyleSheet, TouchableOpacity} from 'react-native'
import { auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged  } from '../firebase'


  const LoginScreenPro =()=> {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    const handleLogin = () => {
      signInWithEmailAndPassword(auth ,email, password)
        .then(userCredentials => {
          // const user = userCredentials.user;
          console.log(userCredentials);
        })
        .catch ((error)=> {
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
    )}



    return (
      <KeyboardAvoidingView style={styles.container}
      behavior="padding"
      >
       

       <View style={styles.inputContainer}>
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
        onPress={()=>{navigation.navigate('SignUpPro')}}
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


export default LoginScreenPro
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
    color: "black",
    fontSize: 16,
    marginTop: 5,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
 
})