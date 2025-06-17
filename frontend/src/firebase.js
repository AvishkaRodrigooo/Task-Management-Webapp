// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzxWbrTDlu9tyAX5wQmLMpx0h04xvRn5U",
  authDomain: "task-manager-4e6d9.firebaseapp.com",
  projectId: "task-manager-4e6d9",
    storageBucket: "task-manager-4e6d9.firebasestorage.app",
 messagingSenderId: "583939501664",
appId: "1:583939501664:web:251cab1e183351a4115d05",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
