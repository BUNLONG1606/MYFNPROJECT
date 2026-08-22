// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB03L2ZY40t4L1VGncRApBGD1rkAmuy0Hg",
  authDomain: "longcoffee-98963.firebaseapp.com",
  projectId: "longcoffee-98963",
  storageBucket: "longcoffee-98963.firebasestorage.app",
  messagingSenderId: "1089710138202",
  appId: "1:1089710138202:web:c9d368c0e975d31cc1c963",
  measurementId: "G-PYNHPTJN0X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);