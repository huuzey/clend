// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "mandeya-5a114.firebaseapp.com",
  projectId: "mandeya-5a114",
  storageBucket: "mandeya-5a114.appspot.com",
  messagingSenderId: "1095945479138",
  appId: "1:1095945479138:web:90ffe98cb9a50e566bcfbb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
