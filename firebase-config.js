// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTaMRDuj1vH77w9F1Up3qOHjjcuGbtEQM",
  authDomain: "bugetapp-9a017.firebaseapp.com",
  projectId: "bugetapp-9a017",
  storageBucket: "bugetapp-9a017.firebasestorage.app",
  messagingSenderId: "125492438064",
  appId: "1:125492438064:web:dbbc65206e0f0004a9f9f5",
  measurementId: "G-T5QECT9VXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
