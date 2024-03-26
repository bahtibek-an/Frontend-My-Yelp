import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBTwNRSZixL2th5XHr2r2N3I_A5Pq9hmhI",
  authDomain: "my-yelp-89253.firebaseapp.com",
  projectId: "my-yelp-89253",
  storageBucket: "my-yelp-89253.appspot.com",
  messagingSenderId: "1009957839283",
  appId: "1:1009957839283:web:4a43dae71f98e3e4432bc6",
};

const app = initializeApp(firebaseConfig);
const restaurantsDB = getFirestore(app)
export {restaurantsDB}