import { doc, getDoc, updateDoc, setDoc, DocumentReference } from 'firebase/firestore';

/**
 * Güvenli belge güncelleme fonksiyonu
 * Her zaman setDoc kullanır (merge: true ile)
 */
export async function safeUpdateDoc(
  docRef: DocumentReference,
  data: any,
  createIfNotExists: boolean = true
): Promise<{ success: boolean; created: boolean; error?: string }> {
  try {
    // Her zaman setDoc kullan (merge: true ile)
    // Bu şekilde belge yoksa oluşturur, varsa günceller
    await setDoc(docRef, data, { merge: true });
    return { success: true, created: true };
  } catch (error) {
    console.error('Safe update error:', error);
    return { 
      success: false, 
      created: false, 
      error: (error as Error).message 
    };
  }
}

/**
 * Belge varlığını kontrol eden yardımcı fonksiyon
 */
export async function documentExists(docRef: DocumentReference): Promise<boolean> {
  try {
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists;
  } catch (error) {
    console.error('Document existence check error:', error);
    return false;
  }
}
