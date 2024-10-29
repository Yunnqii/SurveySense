import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4p3QAoSguLmzJXT7y6b9O0UzbLoYdKNA",
  authDomain: "surveysense-daa64.firebaseapp.com",
  projectId: "surveysense-daa64",
  storageBucket: "surveysense-daa64.appspot.com",
  messagingSenderId: "179156700980",
  appId: "1:179156700980:web:184bd1314bed06b6ec9f61",
  measurementId: "G-2JESL0K51L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
