import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
    apiKey: "AIzaSyC5WX0DmZC47u1BLWvWeBxA1GkLVOJ5zS4",
    authDomain: "react-e-commerce-31.firebaseapp.com",
    projectId: "react-e-commerce-31",
    storageBucket: "react-e-commerce-31.appspot.com",
    messagingSenderId: "248442195994",
    appId: "1:248442195994:web:b9ccc4f7a6a14aa5d301a3",
    measurementId: "G-BJQ7SFYW4R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;