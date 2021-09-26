import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"


/*
const firebaseConfig = 
  {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
    appId:process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MESUREMENT_ID
  };
  */
const firebaseConfig = {
  apiKey: "AIzaSyBukkU97B7vluXcCqGBDJkUyI8lDChx4ZY",
  authDomain: "rerovaji-inventario.firebaseapp.com",
  databaseURL: "https://rerovaji-inventario-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rerovaji-inventario",
  storageBucket: "rerovaji-inventario.appspot.com",
  messagingSenderId: "876754150010",
  appId: "1:876754150010:web:48e84f26a17f6ed7b411c3",
  measurementId: "G-SHD718HJGH"
};

const app = firebase.initializeApp(firebaseConfig);


export default app;
export const auth = app.auth();
export const database = app.firestore();
export const storage=app.storage();
