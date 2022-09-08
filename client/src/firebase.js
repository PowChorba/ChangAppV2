// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { fire_apiKey, fire_authDomain, fire_projectId, fire_storageBucket, fire_messagingSenderId, fire_appId} from './Secret/Secret.js'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: fire_apiKey,
  authDomain: fire_authDomain,
  projectId: fire_projectId,
  storageBucket: fire_storageBucket,
  messagingSenderId: fire_messagingSenderId,
  appId: fire_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
