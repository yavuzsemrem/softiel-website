// Firebase Admin SDK for server-side operations
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;
let adminDb: Firestore | null = null;
let initializationError: Error | null = null;

// Initialize Firebase Admin
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    adminApp = getApps()[0];
    adminDb = getFirestore(adminApp);
    return { adminApp, adminDb };
  }

  try {
    // Production - Render.com ortamı için environment variable'dan al
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        databaseURL: "https://softielwebsite-default-rtdb.europe-west1.firebasedatabase.app"
      });
      
      adminDb = getFirestore(adminApp);
      
      // Firestore settings
      adminDb.settings({
        ignoreUndefinedProperties: true,
      });

      console.log('✅ Firebase Admin initialized successfully (Production)');
    } else {
      // Development - Firebase Admin'i başlatma, client-side SDK kullanılacak
      console.warn('⚠️ Firebase Admin SDK credentials not found. Using client-side SDK for development.');
      initializationError = new Error('Firebase Admin SDK not configured for development');
      return { adminApp: null, adminDb: null };
    }
  } catch (error: any) {
    console.error('❌ Firebase Admin initialization error:', error.message);
    initializationError = error;
    return { adminApp: null, adminDb: null };
  }

  return { adminApp, adminDb };
}

// Initialize on module load
const { adminApp: app, adminDb: db } = initializeFirebaseAdmin();

// Safe export - null check yapılmalı
export { app as adminApp, db as adminDb, initializationError };
export default db;
