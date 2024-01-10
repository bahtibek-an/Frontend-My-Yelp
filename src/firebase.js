import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBkmYdO0DZZ1QlLK6GKqSmIyyaexfdhZ60",
  authDomain: "my-yelp-a87ed.firebaseapp.com",
  projectId: "my-yelp-a87ed",
  storageBucket: "my-yelp-a87ed.appspot.com",
  messagingSenderId: "863149100388",
  appId: "1:863149100388:web:fe7606074a2cbee096fe71"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const database = {
  folders: firestore.collection("folders"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

const auth = firebase.auth();
const storage = firebase.storage();

export { database, storage, auth };
export default firebase;
