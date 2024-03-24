// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjcYV3h5AS5WfyQoHnRQ0SWn87gfArcww",
  authDomain: "extreme-signer-412708.firebaseapp.com",
  projectId: "extreme-signer-412708",
  storageBucket: "extreme-signer-412708.appspot.com",
  messagingSenderId: "245093885633",
  appId: "1:245093885633:web:6918df083837e9bad89640",
  measurementId: "G-WL8WHBEERK"
};

const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
