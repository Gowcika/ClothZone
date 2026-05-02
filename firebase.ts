import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔑 Your config
const firebaseConfig = {
  apiKey: "AIzaSyDLxUtmSyiD_M9-85Fm_9_UXJrtxm0Vggw",
  authDomain: "clothzone-95f1d.firebaseapp.com",
  projectId: "clothzone-95f1d",
  storageBucket: "clothzone-95f1d.firebasestorage.app",
  messagingSenderId: "646176372701",
  appId: "1:646176372701:web:3fc00427d19aeacacea834",
  measurementId: "G-B917BCJ47F"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);   // ⭐ ADD THIS