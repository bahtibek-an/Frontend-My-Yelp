
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf0jmMeufKYvLgyuMDmGEuxNYfvWDKX-M",
  authDomain: "yelp-5b1bb.firebaseapp.com",
  projectId: "yelp-5b1bb",
  storageBucket: "yelp-5b1bb.appspot.com",
  messagingSenderId: "580557143986",
  appId: "1:580557143986:web:b347046d5938542b456eab",
  measurementId: "G-GCKRMZYWFX"
};

const app = initializeApp(firebaseConfig);
export default app

export const db = getFirestore(app)