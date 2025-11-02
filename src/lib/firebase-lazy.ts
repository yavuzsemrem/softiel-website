// Re-export Firebase from the main firebase.ts file
// This file is kept for backward compatibility
import { auth as firebaseAuth, db as firebaseDb, rtdb as firebaseRtdb } from './firebase';

// Export as async functions for backward compatibility with lazy loading code
export const getAuth = async () => {
  return firebaseAuth;
};

export const getFirestore = async () => {
  return firebaseDb;
};

export const getDatabase = async () => {
  return firebaseRtdb;
};

// Legacy getFirebase function
export const getFirebase = async () => {
  return {
    auth: firebaseAuth,
    db: firebaseDb,
    rtdb: firebaseRtdb
  };
};


