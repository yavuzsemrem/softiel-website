// Firestore tag service
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

export interface Tag {
  id?: string
  name: string
  slug: string
  description: string
  color: string
  postCount: number
  isActive: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

const tagsCollection = collection(db, 'tags')

// Etiket oluştur
export async function createTag(tagData: Omit<Tag, 'id' | 'postCount' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    
    const now = Timestamp.now()
    const newTag = {
      ...tagData,
      postCount: 0,
      isActive: true,
      createdAt: now,
      updatedAt: now
    }
    
    const docRef = await addDoc(tagsCollection, newTag)
    return docRef.id
  } catch (error) {
    throw new Error(`Etiket oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Etiket güncelle
export async function updateTag(id: string, tagData: Partial<Omit<Tag, 'id' | 'postCount' | 'createdAt'>>): Promise<void> {
  try {
    
    const tagRef = doc(tagsCollection, id)
    const updateData = {
      ...tagData,
      updatedAt: Timestamp.now()
    }
    
    await updateDoc(tagRef, updateData)
  } catch (error) {
    throw new Error(`Etiket güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Etiket sil
export async function deleteTag(id: string): Promise<void> {
  try {
    
    const tagRef = doc(tagsCollection, id)
    await deleteDoc(tagRef)
  } catch (error) {
    throw new Error(`Etiket silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Tüm etiketleri getir
export async function getTags(): Promise<Tag[]> {
  try {
    
    const q = query(tagsCollection, orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    const tags: Tag[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      tags.push({
        id: doc.id,
        ...doc.data()
      } as Tag)
    }
    
    return tags
  } catch (error) {
    throw new Error(`Etiketler getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Aktif etiketleri getir
export async function getActiveTags(): Promise<Tag[]> {
  try {
    
    // Önce tüm etiketleri getir, sonra filtrele ve sırala
    const snapshot = await getDocs(tagsCollection)
    const tags: Tag[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      if (data.isActive === true) {
        tags.push({
          id: doc.id,
          ...data
        } as Tag)
      }
    }
    
    // Client-side sıralama
    tags.sort((a, b) => a.name.localeCompare(b.name, 'tr'))
    
    return tags
  } catch (error) {
    throw new Error(`Aktif etiketler getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Etiket getir (ID ile)
export async function getTag(id: string): Promise<Tag | null> {
  try {
    
    const tagRef = doc(tagsCollection, id)
    const snapshot = await getDoc(tagRef)
    
    if (snapshot.exists()) {
      const tag = {
        id: snapshot.id,
        ...snapshot.data()
      } as Tag
      return tag
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Etiket getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Etiket slug ile getir
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    
    const q = query(tagsCollection, where('slug', '==', slug))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      const tag = {
        id: doc.id,
        ...doc.data()
      } as Tag
      return tag
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Etiket getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Etiket post sayısını güncelle (etiket adı ile)
export async function updateTagPostCount(tagName: string, increment: boolean): Promise<void> {
  try {
    
    // Etiket adı ile etiketi bul
    const q = query(tagsCollection, where('name', '==', tagName))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      const tagDoc = snapshot.docs[0]
      const tagData = tagDoc.data()
      const currentCount = tagData.postCount || 0
      const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1)
      
      await updateDoc(tagDoc.ref, {
        postCount: newCount,
        updatedAt: Timestamp.now()
      })
    } else {
    }
  } catch (error) {
    throw new Error(`Etiket post sayısı güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Etiket post sayısını gerçek zamanlı hesapla
export async function calculateTagPostCount(tagName: string): Promise<number> {
  try {
    
    // Blog koleksiyonundan bu etikete ait blogları say
    const blogsCollection = collection(db, 'blogs')
    const q = query(blogsCollection, where('tags', 'array-contains', tagName))
    const snapshot = await getDocs(q)
    
    const count = snapshot.size
    
    return count
  } catch (error) {
    return 0
  }
}

// Slug oluştur
export function generateSlug(name: string): string {
  return turkishToEnglish(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Türkçe karakterleri İngilizce karşılıklarına çevir
function turkishToEnglish(text: string): string {
  const turkishChars: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U'
  }
  
  return text.replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => turkishChars[char] || char)
}

// Toplu etiket silme
export async function deleteTags(tagIds: string[]): Promise<{ success: number; failed: number; errors: string[] }> {
  try {
    
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }
    
    // Her etiketi tek tek sil
    for (const tagId of tagIds) {
      try {
        await deleteTag(tagId)
        results.success++
      } catch (error) {
        results.failed++
        const errorMessage = `Etiket ${tagId} silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`
        results.errors.push(errorMessage)
      }
    }
    
    return results
  } catch (error) {
    throw new Error(`Toplu etiket silme işlemi başarısız: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}




