// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged,  sendPasswordResetEmail  } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc83j3r28gbgpeo27ol7xJH5q8RGfJ4Y4",
  authDomain: "krakenhireauth.firebaseapp.com",
  projectId: "krakenhireauth",
  storageBucket: "krakenhireauth.appspot.com",
  messagingSenderId: "275786100657",
  appId: "1:275786100657:web:44e2e9322749a61a301790"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore();
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged ,  sendPasswordResetEmail,database };