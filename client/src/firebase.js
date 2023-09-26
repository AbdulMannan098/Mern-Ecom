// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxTTQAWaj9oCloEuUg3D3g6nzCCIKRs_E",
  authDomain: "mern-c9c6a.firebaseapp.com",
  projectId: "mern-c9c6a",
  storageBucket: "mern-c9c6a.appspot.com",
  messagingSenderId: "313615708348",
  appId: "1:313615708348:web:7000b7dfb9f8f7677860b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export
export const auth=getAuth();
export const googleAuthProvider=new GoogleAuthProvider();