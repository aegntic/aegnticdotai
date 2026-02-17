import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvc_H3mRkMXr-9-Xmng8YKpmrlGB21OSw",
    authDomain: "aegntic-newsletter.firebaseapp.com",
    projectId: "aegntic-newsletter",
    storageBucket: "aegntic-newsletter.firebasestorage.app",
    messagingSenderId: "22947185787",
    appId: "1:22947185787:web:66d659af791dda6d80cede"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
