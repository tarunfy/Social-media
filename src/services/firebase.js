import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8mym7zytgZ77iP5SoNB_c2W2bt_C7IcM",
  authDomain: "social-media-3f6cd.firebaseapp.com",
  projectId: "social-media-3f6cd",
  storageBucket: "social-media-3f6cd.appspot.com",
  messagingSenderId: "179756539200",
  appId: "1:179756539200:web:3776357893167a797c2ea5",
};

// Initialize Firebase
initializeApp(firebaseConfig);

//Initialize services
export const auth = getAuth();
export const db = getFirestore();
