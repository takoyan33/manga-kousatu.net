// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}

//https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/posts

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})

export const database = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const firestore = getFirestore(app)
