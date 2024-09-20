// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYadAxRp0EIbltR-o13_2R6HeA-bYvGZA",
  authDomain: "voltaic-383203.firebaseapp.com",
  projectId: "voltaic-383203",
  storageBucket: "voltaic-383203.appspot.com",
  messagingSenderId: "938802392806",
  appId: "1:938802392806:web:26cae772528577886ed527",
  measurementId: "G-HKW5LYZ76W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);





export const storage = getStorage();



