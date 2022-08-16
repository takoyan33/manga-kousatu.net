// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPeRaWhW7Wy-_o3JNz-RZrMV8BxyXW04U",
  authDomain: "next-auth-app-2aa40.firebaseapp.com",
  projectId: "next-auth-app-2aa40",
  storageBucket: "next-auth-app-2aa40.appspot.com",
  messagingSenderId: "169902391099",
  appId: "1:169902391099:web:686cd1adf94cc44653011e",
  // databaseURL: "<your-database-url>",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const storage = getStorage(app);
