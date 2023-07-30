import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApMTQnxafO5f7ZdjLRQ8SxphGSWDY4Ksw",
  authDomain: "makemytrip-1f9a8.firebaseapp.com",
  projectId: "makemytrip-1f9a8",
  storageBucket: "makemytrip-1f9a8.appspot.com",
  messagingSenderId: "872552221019",
  appId: "1:872552221019:web:d54cfe10a121e690a7727e",
  measurementId: "G-G9NM4QT5ZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};

export default app;
