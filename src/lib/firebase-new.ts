// Yeni Firebase configuration
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Yeni Firebase projesi için yapılandırma
const firebaseConfig = {
  // Bu değerleri Firebase Console'dan alın
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Debug için Firebase bağlantısını kontrol et
if (typeof window !== 'undefined') {
  console.log('Yeni Firebase initialized:', {
    projectId: app.options.projectId,
    authDomain: app.options.authDomain,
    databaseURL: app.options.databaseURL,
    apiKey: app.options.apiKey
  });
}

export default app;



