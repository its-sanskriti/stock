// src/components/firebase.js



import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ-8VuwCkrUEI1bkAdwOLqXOfnpeeMDF8",
  authDomain: "stock-analyzer-94ad0.firebaseapp.com",
  projectId: "stock-analyzer-94ad0",
  storageBucket: "stock-analyzer-94ad0.appspot.app",
  messagingSenderId: "249474623096",
  appId: "1:249474623096:web:4980844de2638631b52f8d",
  measurementId: "G-H5TXSSB6S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);




const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export { auth, database, db, app };
