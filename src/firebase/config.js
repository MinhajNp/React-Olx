import firebase from "firebase/compat/app";  // Import Firebase
import "firebase/compat/auth";  // Import authentication module
import "firebase/compat/firestore";  // Optionally, you can import Firestore if needed


// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB9S8zpjR77-mZ5pdQyoWZkyMksaf5foBU",
  authDomain: "olx-clone-f33c9.firebaseapp.com",
  projectId: "olx-clone-f33c9",
  storageBucket: "olx-clone-f33c9.appspot.com",
  messagingSenderId: "648120941963",
  appId: "1:648120941963:web:5aff2d2f2df62666bd038e",
};

// Initialize Firebase with the config object
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export the initialized Firebase app to be used in other parts of the application
export default firebaseApp;
