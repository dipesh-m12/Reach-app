// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {collection,getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGoQKLPoMFw28YnOf7OCUrENUjOhgjBZ8",
    authDomain: "zoom-clone-e96f9.firebaseapp.com",
    projectId: "zoom-clone-e96f9",
    storageBucket: "zoom-clone-e96f9.appspot.com",
    messagingSenderId: "573599795805",
    appId: "1:573599795805:web:871613f9a71487b24bdbb4",
    measurementId: "G-YBEMMFHHXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth =getAuth(app)
export const firebaseDB = getFirestore(app)

export const userRef = collection(firebaseDB,"users")
export const meetingsRef = collection(firebaseDB,"meetings")