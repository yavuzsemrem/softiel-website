// Fresh Firebase instance - Her kullanımda yeni instance
import { initializeApp, getApps, deleteApp } from 'firebase/app';
import { getFirestore, initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

// Fresh Firestore instance oluştur
export async function getFreshFirestore() {
  try {
    // Unique app name ile yeni instance
    const appName = `fresh-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const app = initializeApp(firebaseConfig, appName);
    
    // Memory-only cache ile Firestore başlat
    const db = initializeFirestore(app, {
      localCache: memoryLocalCache(),
    });
    
    return { app, db };
  } catch (error) {
    console.error('Fresh Firestore oluşturulamadı:', error);
    throw error;
  }
}

// Instance'ı temizle
export async function cleanupFirestoreInstance(app: any) {
  try {
    await deleteApp(app);
  } catch (error) {
    // Ignore cleanup errors
  }
}

// Basit collection getDocs wrapper - Query kullanmadan
export async function getCollectionDocs(collectionName: string) {
  const { app, db } = await getFreshFirestore();
  
  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const col = collection(db, collectionName);
    const snapshot = await getDocs(col);
    
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }));
    
    return docs;
  } finally {
    // Instance'ı temizle
    await cleanupFirestoreInstance(app);
  }
}

