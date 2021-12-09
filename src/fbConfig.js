import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
initializeApp({
  apiKey: "AIzaSyDTkjrZh3VI0vPaPE__WC-U7Z7Kf9d1_Dw",
  authDomain: "sharable-to-do-list.firebaseapp.com",
  projectId: "sharable-to-do-list",
  storageBucket: "sharable-to-do-list.appspot.com",
  messagingSenderId: "916475841085",
  appId: "1:916475841085:web:67b9bfdf437d9a0798b854",
  measurementId: "${config.measurementId}"
});

// Initialize Firebase
const db = getFirestore();
export default db