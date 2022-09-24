import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvOLAjmNvY6rKrl9LLEuR9-IV1RGMgjkA",
    authDomain: "todo-app-8c58f.firebaseapp.com",
    projectId: "todo-app-8c58f",
    storageBucket: "todo-app-8c58f.appspot.com",
    messagingSenderId: "531150295036",
    appId: "1:531150295036:web:9c6278a7bac888c80b2c79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);