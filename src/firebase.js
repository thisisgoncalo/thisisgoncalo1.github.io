// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv2qlDkzIdJmeo53toiy6qYlDkxkM1fbA",
  authDomain: "goncalomusic-444444.firebaseapp.com",
  databaseURL: "https://goncalomusic-444444-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "goncalomusic-444444",
  storageBucket: "goncalomusic-444444.appspot.com",
  messagingSenderId: "140920485614",
  appId: "1:140920485614:web:e5513401cdac6b66aba5ff",
  measurementId: "G-DFRGQRBXNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
