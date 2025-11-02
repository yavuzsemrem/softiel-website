// Firebase Admin SDK for server-side operations
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminApp: App | null = null;
let adminDb: Firestore | null = null;

// Initialize Firebase Admin (only on server-side)
export function getAdminApp(): App {
  if (adminApp) {
    return adminApp;
  }

  try {
    const apps = getApps();
    if (apps.length > 0) {
      adminApp = apps[0];
      return adminApp;
    }

    // Initialize with service account (production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        databaseURL: "https://softielwebsite-default-rtdb.europe-west1.firebasedatabase.app"
      });
    } else {
      // Initialize with project ID only (for development or if service account not available)
      adminApp = initializeApp({
        projectId: "softielwebsite",
        databaseURL: "https://softielwebsite-default-rtdb.europe-west1.firebasedatabase.app"
      });
    }

    console.log('✅ Firebase Admin initialized successfully');
    return adminApp;
  } catch (error) {
    console.error('❌ Firebase Admin initialization error:', error);
    throw error;
  }
}

// Get Firestore Admin instance
export function getAdminFirestore(): Firestore {
  if (adminDb) {
    return adminDb;
  }

  try {
    const app = getAdminApp();
    adminDb = getFirestore(app);
    console.log('✅ Admin Firestore initialized');
    return adminDb;
  } catch (error) {
    console.error('❌ Admin Firestore initialization error:', error);
    throw error;
  }
}

export { adminApp, adminDb };

