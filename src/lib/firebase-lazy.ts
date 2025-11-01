// Lazy Firebase configuration - sadece gerektiğinde yükle
let firebaseInstance: any = null;

export const getFirebase = async () => {
  if (firebaseInstance) {
    return firebaseInstance;
  }

  // Firebase'i sadece gerektiğinde import et
  const { initializeApp, getApps } = await import('firebase/app');
  const { getAuth } = await import('firebase/auth');
  const { getFirestore, initializeFirestore, memoryLocalCache, setLogLevel } = await import('firebase/firestore');
  const { getDatabase } = await import('firebase/database');

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

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const auth = getAuth(app);
  
  // Log level'ı ayarla
  try { 
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
      setLogLevel('error');
    }
  } catch {}
  
  // Firestore'u kontrol et ve gerekirse initialize et
  let db;
  try {
    // Önce mevcut instance'ı almayı dene
    db = getFirestore(app);
  } catch (error) {
    // Eğer henüz initialize edilmemişse, memory cache ile initialize et
    db = initializeFirestore(app, { localCache: memoryLocalCache() });
  }
  
  const rtdb = getDatabase(app);

  firebaseInstance = { auth, db, rtdb };
  return firebaseInstance;
};

// Sadece auth için lazy loader
export const getAuth = async () => {
  const firebase = await getFirebase();
  return firebase.auth;
};

// Sadece firestore için lazy loader
export const getFirestore = async () => {
  const firebase = await getFirebase();
  return firebase.db;
};

// Sadece database için lazy loader
export const getDatabase = async () => {
  const firebase = await getFirebase();
  return firebase.rtdb;
};


