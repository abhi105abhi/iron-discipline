import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3zUkXcT-oQjvCpMLb3caIYsmSWoGWPDY",
  authDomain: "sudhar-ja.firebaseapp.com",
  projectId: "sudhar-ja",
  storageBucket: "sudhar-ja.firebasestorage.app",
  messagingSenderId: "893000798529",
  appId: "1:893000798529:web:5e70481b524802dae0d1c0",
  measurementId: "G-XG6F9M46GB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
