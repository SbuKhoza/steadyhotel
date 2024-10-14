import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

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
    const imageRef = ref(storage, `accommodations/${imagePath}`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return '/default-image.jpg'; // Return a default image URL on error
  }
};



// Function to upload profile picture to Firebase Storage and get the download URL
export const uploadProfilePicture = async (file, userId) => {
  if (!file) throw new Error("No file provided for upload");

  const storageRef = ref(storage, `profilePictures/${userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Monitor progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error("Error during image upload:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(error);
        }
      }
    );
  });
};

// Export instances
export { db, auth, storage };