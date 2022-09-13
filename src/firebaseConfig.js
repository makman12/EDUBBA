import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCOdsK9ndzEnRMb0bc5NmkaKKnmHJx_tU",
  authDomain: "cuneiform-hittites.firebaseapp.com",
  databaseURL:
    "https://cuneiform-hittites-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cuneiform-hittites",
  storageBucket: "cuneiform-hittites.appspot.com",
  messagingSenderId: "254547324020",
  appId: "1:254547324020:web:0e304d92f7b0f46f0cf521",
  measurementId: "G-S49H3LK55F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
