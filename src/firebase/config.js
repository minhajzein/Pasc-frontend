import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCRoHA-sn7f3D-hPJuZyeo9n2nBilnLRSg",
    authDomain: "pasc-27395.firebaseapp.com",
    projectId: "pasc-27395",
    storageBucket: "pasc-27395.appspot.com",
    messagingSenderId: "935209074890",
    appId: "1:935209074890:web:da71ff37edd3720cf93433",
    measurementId: "G-YSRYMCQZYX"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
export const auth = getAuth(app)
export default { app, storage }
