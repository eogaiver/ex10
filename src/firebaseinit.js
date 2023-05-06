// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADuzqAhsNruccvp0Z2Y-_q9TFUvYCW28A",
  authDomain: "ex10-8faad.firebaseapp.com",
  projectId: "ex10-8faad",
  storageBucket: "ex10-8faad.appspot.com",
  messagingSenderId: "1033972799496",
  appId: "1:1033972799496:web:61ea9f7a34638a3ea359bd",
  measurementId: "G-QRH8SKRP5M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);