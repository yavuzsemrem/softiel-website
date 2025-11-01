// Firebase configuration
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore, 
  persistentLocalCache,
  persistentSingleTabManager,
  setLogLevel,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
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

// Persistent cache kullan - connection issues için daha iyi
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentSingleTabManager({
        forceOwnership: true
      })
    })
  });
} catch (error) {
  // Eğer persistent cache başarısız olursa, fallback olarak memory cache kullan
  console.warn('Persistent cache başlatılamadı, memory cache kullanılıyor');
  const { memoryLocalCache } = require('firebase/firestore');
  db = initializeFirestore(app, { localCache: memoryLocalCache() });
}

rtdb = getDatabase(app);

// Network durumunu izle ve bağlantı koptuğunda yeniden bağlan
if (typeof window !== 'undefined') {
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 3;

  window.addEventListener('online', async () => {
    console.log('İnternet bağlantısı geri geldi, Firebase yeniden bağlanıyor...');
    try {
      await enableNetwork(db);
      reconnectAttempts = 0;
    } catch (error) {
      console.error('Firebase network yeniden etkinleştirilemedi:', error);
    }
  });

  window.addEventListener('offline', async () => {
    console.log('İnternet bağlantısı kesildi, Firebase offline moda geçiyor...');
    try {
      await disableNetwork(db);
    } catch (error) {
      console.error('Firebase network devre dışı bırakılamadı:', error);
    }
  });

  // Visibility change - sayfa geri geldiğinde bağlantıyı kontrol et
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && navigator.onLine) {
      try {
        await enableNetwork(db);
        reconnectAttempts = 0;
      } catch (error) {
        // Hata durumunda retry
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          setTimeout(async () => {
            try {
              await enableNetwork(db);
              reconnectAttempts = 0;
            } catch {}
          }, 1000 * reconnectAttempts);
        }
      }
    }
  });
}

export { auth, db, rtdb };

// App Check'i devre dışı bırak (development için)
if (typeof window !== 'undefined') {
  // App Check debug token'ı ayarla
  (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

export default app;