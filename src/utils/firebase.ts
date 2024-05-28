// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "next-blog-s5.firebaseapp.com",
  projectId: "next-blog-s5",
  storageBucket: "next-blog-s5.appspot.com",
  messagingSenderId: "244352886575",
  appId: "1:244352886575:web:e2a2d4ea70a25f4ee623da",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
