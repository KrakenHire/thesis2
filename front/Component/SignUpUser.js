
import { useNavigation } from '@react-navigation/native'
import React, { Component, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, View ,StyleSheet, TouchableOpacity,Button,Image} from 'react-native'
import { auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged  } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
  const SignUpUser =()=> {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.cancelled) {
          // Create a FormData object to send the image to the server
          const formData = new FormData();
          // Get the file extension of the selected image
          const fileName = result.uri.split('/').pop();
          const fileType = fileName.split('.').pop().toLowerCase();
          // Append the selected image to the FormData object with the correct MIME type
          formData.append('image', {
            uri: result.uri,
            name: fileName,
            type: `image/${fileType}`,
          });
          // Send the image to the server using fetch()
          const response = await fetch(`${config}/user/uploadImage`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          });
          // Get the ID of the uploaded image from the server's response
          const data = await response.json();
          const iduser = data.iduser;
          // Set the selected image and its ID on the screen
          setSelectedImage({ uri: result.uri, iduser});
        }
      }
    };
    const navigation = useNavigation()
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.navigate("Home")
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
          
       var userrrr={
        iduser: userr,
        username: userName,
        image: selectedImage.uri,
      }
      console.log(userrrr,"hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiedfvrvvvv");
          await axios.post(`${config}/user`,userrrr );
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
        <ScrollView>
        <KeyboardAvoidingView style={styles.container}
        behavior="padding"
        >
         <View style={styles.inputContainer}>
         {selectedImage && (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image source={selectedImage} style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 10 ,borderColor: '#C7C1C0',borderWidth: 2}} />
  </View>
)}
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
         <View style={styles.pick}>
     <TouchableOpacity onPress={pickImage}>
       <Text style={ {color: 'white', fontWeight: '400', fontSize: 16}}>  Choose your profile image</Text>
       </TouchableOpacity>
        </View>
          <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button , styles.buttonOutLine]}
          >
           <Text style={styles.buttonOutLineText}>SignUp !</Text>
          </TouchableOpacity>
         </View>
        </KeyboardAvoidingView>
        </ScrollView>
      )
    }
  export default SignUpUser
  const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      marginTop:100
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
    pick:{
      flex: 1,
      alignItems: 'center',
       justifyContent: 'center' ,
       backgroundColor:"#7210FF",
       height:50,
       borderRadius:10,
       width:250,
       marginBottom:20,
    }
  })