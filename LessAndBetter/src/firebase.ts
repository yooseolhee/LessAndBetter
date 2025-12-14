import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC1V_Zw-92nWrwEGlg4llnxiuUm_bCcWM",
  authDomain: "lessandbetter-cb437.firebaseapp.com",
  projectId: "lessandbetter-cb437",
  storageBucket: "lessandbetter-cb437.firebasestorage.app",
  messagingSenderId: "954639568516",
  appId: "1:954639568516:web:a88c4300192b0ef4023cd1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
