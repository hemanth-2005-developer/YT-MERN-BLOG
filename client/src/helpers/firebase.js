import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getEvn } from "./getEnv";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:getEvn('VITE_FIREBASE_API'),
    authDomain: "yt-mern-blog-4bec6.firebaseapp.com",
    projectId: "yt-mern-blog-4bec6",
    storageBucket: "yt-mern-blog-4bec6.firebasestorage.app",
    messagingSenderId: "134888209001",
    appId: "1:134888209001:web:d65df7d99ff70b697f80f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }