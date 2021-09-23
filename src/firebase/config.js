import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// apiKey: "AIzaSyDMXf17vF_IqMg90rkzCpdfPozUkEMVTpA",

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.React_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.React_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.React_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.React_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.React_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.React_APP_FIREBASE_APP_ID,
//   measurementId: process.env.React_APP_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyDMXf17vF_IqMg90rkzCpdfPozUkEMVTpA",
  authDomain: "crown-db-1f1b5.firebaseapp.com",
  databaseURL: "https://crown-db-1f1b5.firebaseio.com",
  projectId: "crown-db-1f1b5",
  storageBucket: "crown-db-1f1b5.appspot.com",
  messagingSenderId: "389282566880",
  appId: "1:389282566880:web:e14a49488d3516b346f685",
  measurementId: "G-3R5KGZBKY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };