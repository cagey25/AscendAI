import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsjWyHB_aAT0ChGeIop0rZuo66AUVnSEM",
  authDomain: "ascend-ai-1e5b7.firebaseapp.com",
  projectId: "ascend-ai-1e5b7",
  storageBucket: "ascend-ai-1e5b7.firebasestorage.app",
  messagingSenderId: "591912019318",
  appId: "1:591912019318:web:b9a71ad7111ede8c88c657",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);