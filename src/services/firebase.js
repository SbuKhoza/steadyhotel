// src/services/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm2BWy4yC5E9KVwvY7YF374tgEJww2gj0",
  authDomain: "steady-4edfa.firebaseapp.com",
  projectId: "steady-4edfa",
  storageBucket: "steady-4edfa.appspot.com",
  messagingSenderId: "353114065302",
  appId: "1:353114065302:web:7000e3e9492d77c03c35b7",
  measurementId: "G-WEXYLZWL4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Function to get download URL for an image from Firebase Storage
export const getImageUrl = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return '/default-image.jpg'; // Return a default image URL on error
  }
};

// Export instances
export { db, auth, storage };