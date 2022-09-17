import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

import { useAuthState } from "react-firebase-hooks/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBCOdsK9ndzEnRMb0bc5NmkaKKnmHJx_tU",
  authDomain: "cuneiform-hittites.firebaseapp.com",
  databaseURL:
    "https://cuneiform-hittites-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cuneiform-hittites",
  storageBucket: "cuneiform-hittites.appspot.com",
  messagingSenderId: "254547324020",
  appId: "1:254547324020:web:0e304d92f7b0f46f0cf521",
  measurementId: "G-S49H3LK55F",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

// Initialize Firebase

export {
  auth,
  firestore,
  analytics,
  useAuthState,
  useCollectionData,
  firebase,
};
