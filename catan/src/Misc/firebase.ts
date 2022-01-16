// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectFirestoreEmulator, collection, getFirestore, getDocs,doc,getDoc } from "firebase/firestore"
import { Tile } from "../Pages/GamePage/load";
import { connectFunctionsEmulator, HttpsCallable, getFunctions,httpsCallable } from "@firebase/functions"
import firebase from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoxMSqqVPIMI3MzVp6_FKKTT6h9nAuohc",
    authDomain: "catan-1c211.firebaseapp.com",
    projectId: "catan-1c211",
    storageBucket: "catan-1c211.appspot.com",
    messagingSenderId: "598087452121",
    appId: "1:598087452121:web:fd812fa04cd623770545c8",
    measurementId: "G-6NP3596KFC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export function initFirebase() {
    if (window.location.hostname === "localhost") {
        connectFunctionsEmulator(getFunctions(app), "localhost", 5001)
        connectFirestoreEmulator(getFirestore(app), "localhost", 8080)
    }
}

export async function addTilesToFirestore(tiles: Tile[]){
    return httpsCallable(getFunctions(app),"syncTable")(tiles)
}