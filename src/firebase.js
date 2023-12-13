import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGuv7PIoBH1jDVA3QkZB4LGqR4LCU_fYs",
  authDomain: "my-yelp-1.firebaseapp.com",
  databaseURL: "https://my-yelp-1-default-rtdb.firebaseio.com",
  projectId: "my-yelp-1",
  storageBucket: "my-yelp-1.appspot.com",
  messagingSenderId: "140367169138",
  appId: "1:140367169138:web:0fc954b24967fab1c364eb"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

const storage = firebase.storage();
const auth = firebase.auth();

export { database, storage, auth };
export default firebase;
