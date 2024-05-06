import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAWE7bM-_ZzZ9G1XRhA1CN18r0q9YlRrkM",
  authDomain: "miniblog-d0643.firebaseapp.com",
  projectId: "miniblog-d0643",
  storageBucket: "miniblog-d0643.appspot.com",
  messagingSenderId: "506739415680",
  appId: "1:506739415680:web:9cd34fbfa3003308cae465",
  measurementId: "G-YHP50LR7L3"
};

const app = initializeApp(firebaseConfig);

const data = getFirestore(app);

export { data };