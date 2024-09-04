import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzEyEyQYGje42NDs9Imw__w69pqJ8Z_os",
  authDomain: "posts-4b88e.firebaseapp.com",
  projectId: "posts-4b88e",
  storageBucket: "posts-4b88e.appspot.com",
  messagingSenderId: "593158218105",
  appId: "1:593158218105:web:e37cb3ed914117550ccfa8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };