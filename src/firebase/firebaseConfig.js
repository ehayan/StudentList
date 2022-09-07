import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage';
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyD01NYWERGQjwO2rLVXQl2RGvc7gFAZxGk",
    authDomain: "student-test001.firebaseapp.com",
    databaseURL: "https://student-test001-default-rtdb.firebaseio.com",
    projectId: "student-test001",
    storageBucket: "student-test001.appspot.com",
    messagingSenderId: "351583751847",
    appId: "1:351583751847:web:b07d2cd83722157ba09582"
});

firebase.auth().languageCode = 'ko'

const auth = firebase.auth()
const firestore = firebase.firestore()
const functions = firebase.app().functions('asia-northeast3')

export {auth, firestore, functions, firebase}






