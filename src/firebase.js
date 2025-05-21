import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCQjqXL5tgUa-QUnT5rwhtTtvs6fVACbcU",
  authDomain: "mvp-app-kz.firebaseapp.com",
  projectId: "mvp-app-kz",
  storageBucket: "mvp-app-kz.firebasestorage.app",
  messagingSenderId: "64330542854",
  appId: "1:64330542854:web:22a60e50f74d84613f3887",
  measurementId: "G-FKNW5RLNWS",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider, signInWithPopup}
