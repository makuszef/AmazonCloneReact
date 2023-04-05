import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAA1uqhviO1-ql3AksPFIF_KYdHvXMtFfw",
  authDomain: "clone-8608f.firebaseapp.com",
  databaseURL: "https://clone-8608f.firebaseio.com",
  projectId: "clone-8608f",
  storageBucket: "clone-8608f.appspot.com",
  messagingSenderId: "94771409641",
  appId: "1:94771409641:web:6d3c27f82ac760a15ef678",
  measurementId: "G-C3SF5QWZS1",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
