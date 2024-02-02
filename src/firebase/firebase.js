import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqRVx3dGPjGWQSArwdCljM07GZJcW4FB8",
  authDomain: "instagram-97e21.firebaseapp.com",
  projectId: "instagram-97e21",
  storageBucket: "instagram-97e21.appspot.com",
  messagingSenderId: "964970104785",
  appId: "1:964970104785:web:72c9102aa000254d0142f0",
  measurementId: "G-TSTH5DKTFS"
};

const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);
