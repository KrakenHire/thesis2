import { useNavigation } from '@react-navigation/native'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View ,StyleSheet, TouchableOpacity,Image} from 'react-native'
import { auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged  } from '../firebase'


  const LoginScreenPro =()=> {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);

    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace("Chat")
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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.imgContainer}>
          <Image source={require('../assets/reg.png')} style={styles.img} />
        </View>
        <View>
          <Text style={styles.welcome}>Your next job is just a login away. Join us now!</Text>
        </View>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
  
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
  
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
  
        <View style={styles.account}>
          <Text style={styles.acc}>
            Don't have an account?
            <Text
              style={[styles.acc, styles.link]}
              onPress={() => navigation.navigate('SignUpPro')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
  
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('forgetPass');
          }}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
  
  export default LoginScreenPro;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
    },
    img: {
      width: 250,
      height: 250,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    inputContainer: {
      width: '80%',
      alignItems: 'center',
    },
    input: {
      padding: 15,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      fontSize: 18,
      borderRadius: 20,
      width: '100%',
      color: '#333',
      backgroundColor: '#f7f7f7',
    },
    button: {
      backgroundColor: '#7210FF',
      padding: 15,
      borderRadius: 20,
      marginTop: 20,
      width: '80%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    account: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 20,
      fontSize: 18,
    },
    acc: {
      fontWeight: 'bold',
      marginRight: 5,
      color: '#333',
    },
    link: {
      color: '#7210FF',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    forgotPassword: {
      marginTop: 20,
      fontSize: 16,
      color: 'gray',
    },
    errorMessage: {
      color: 'red',
      marginBottom: 20,
    },
  });