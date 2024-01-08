import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_zjMNBWyQ4K9OW2c0dIS3ffulvWa7HJA",
  authDomain: "my-yelp-123.firebaseapp.com",
  projectId: "my-yelp-123",
  storageBucket: "my-yelp-123.appspot.com",
  messagingSenderId: "592155492675",
  appId: "1:592155492675:web:92cfde2d76eb5beeab6ff6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);
