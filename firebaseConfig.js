// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPeRaWhW7Wy-_o3JNz-RZrMV8BxyXW04U",
  authDomain: "next-auth-app-2aa40.firebaseapp.com",
  projectId: "next-auth-app-2aa40",
  storageBucket: "next-auth-app-2aa40.appspot.com",
  messagingSenderId: "169902391099",
  appId: "1:169902391099:web:686cd1adf94cc44653011e",
  databaseURL: "<your-database-url>",
};

//https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/posts

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
