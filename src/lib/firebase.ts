// Firebase configuration
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache, setLogLevel } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyDT23p3KDd3pQf13UiQOuIjmemyBlMYPBg",
  authDomain: "softielwebsite.firebaseapp.com",
  databaseURL: "https://softielwebsite-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "softielwebsite",
  storageBucket: "softielwebsite.firebasestorage.app",
  messagingSenderId: "876968672828",
  appId: "1:876968672828:web:b0f7ab34322bf14a044d39",
  measurementId: "G-GHEMBDDCZP"
};

// Initialize Firebase (avoid duplicate initialization)
let app: any = null;
let auth: any = null;
let db: any = null;
let rtdb: any = null;

// Firebase'i her zaman başlat
app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
auth = getAuth(app);
// Prod'da Firestore log seviyesini düşür
if (typeof window !== 'undefined' ? process.env.NODE_ENV === 'production' : true) {
  try { setLogLevel('error') } catch {}
}

// BloomFilter uyarılarını azaltmak için memory cache kullan
db = initializeFirestore(app, { localCache: memoryLocalCache() });
rtdb = getDatabase(app);

export { auth, db, rtdb };

// App Check'i devre dışı bırak (development için)
if (typeof window !== 'undefined') {
  // App Check debug token'ı ayarla
  (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export default app;