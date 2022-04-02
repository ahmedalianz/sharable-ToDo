import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

initializeApp({
  apiKey: "AIzaSyDdcG23VDI647aJVf7-RWFDDBoBlYLQNes",
  authDomain: "shareble-todos.firebaseapp.com",
  projectId: "shareble-todos",
  storageBucket: "shareble-todos.appspot.com",
  messagingSenderId: "224636763063",
  appId: "1:224636763063:web:a3fd218963c98f38424632",
});

// Initialize Firebase
const db = getFirestore();
export default db;
