// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "decogenius-2nke7.firebaseapp.com",
  projectId: "decogenius-2nke7",
  storageBucket: "decogenius-2nke7.appspot.com",
  messagingSenderId: "988660329620",
  appId: "1:988660329620:web:42f292f259280160585881"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
