import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mmcourier.firebaseapp.com",
  projectId: "mmcourier",
  storageBucket: "mmcourier.firebasestorage.app",
  messagingSenderId: "878840697169",
  appId: "1:878840697169:web:b86d9e453a61b30c754370"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database for use in AdminDashboard
export const db = getFirestore(app);
