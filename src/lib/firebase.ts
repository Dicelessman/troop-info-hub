
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBofskY5y_scMtgRnQi2WXHoyUyO2522CM",
  authDomain: "appreparto-ce9f3.firebaseapp.com",
  projectId: "appreparto-ce9f3",
  storageBucket: "appreparto-ce9f3.firebasestorage.app",
  messagingSenderId: "456787780780",
  appId: "1:456787780780:web:860f2b52f6b1c636ce2b09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
