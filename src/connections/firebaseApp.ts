// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKiBrvJlJfPs9ovNuGYn9FqFJQWvWg0AQ",
  authDomain: "restaurants-menu-833c4.firebaseapp.com",
  projectId: "restaurants-menu-833c4",
  storageBucket: "restaurants-menu-833c4.firebasestorage.app",
  messagingSenderId: "213585278020",
  appId: "1:213585278020:web:061fa11126851c8862b811",
  measurementId: "G-8KZHKEJVKD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
export const auth = getAuth(app);
auth.useDeviceLanguage();
