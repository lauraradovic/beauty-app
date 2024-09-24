// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_P_Z-hgBZ5pSzvauY53QN-et6WdO-z9c",
  authDomain: "salon-a95cc.firebaseapp.com",
  projectId: "salon-a95cc",
  storageBucket: "salon-a95cc.appspot.com",
  messagingSenderId: "666101091451",
  appId: "1:666101091451:web:242367cf00da3c8be4e6de",
  measurementId: "G-SY0BZNLHQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };