
// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWsxU2HsFYcL3ntEvoJq76QRsClfn_pW0",
  authDomain: "ai-invoice-444506.firebaseapp.com",
  projectId: "ai-invoice-444506",
  storageBucket: "ai-invoice-444506.firebasestorage.app",
  messagingSenderId: "791980201221",
  appId: "1:791980201221:web:df365ea415f0153cc2136c",
  measurementId: "G-QK2RL7EKSV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
