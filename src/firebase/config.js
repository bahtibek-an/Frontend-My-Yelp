import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDY1V56Up35HI1te6EJskSFo53pvOpBzM",
  authDomain: "my-yelp-44a49.firebaseapp.com",
  projectId: "my-yelp-44a49",
  storageBucket: "my-yelp-44a49.appspot.com",
  messagingSenderId: "921114632488",
  appId: "1:921114632488:web:85c25caef34cd30493301d"
};

const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);
