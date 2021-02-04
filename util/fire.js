import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAlWnCoIVHMOonR4raqJq7OZz-hQoc5-E",
    authDomain: "whack-a-mole-55681.firebaseapp.com",
    projectId: "whack-a-mole-55681",
    storageBucket: "whack-a-mole-55681.appspot.com",
    messagingSenderId: "805858031830",
    appId: "1:805858031830:web:da54a7e87a6135426d7177"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;
export default fire; 
