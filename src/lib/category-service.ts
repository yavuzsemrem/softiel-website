// Firestore category service
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

export interface Category {
  id?: string
  name: string
  slug: string
  description: string
  color: string
  postCount: number
  status: 'active' | 'inactive'
  createdAt: Timestamp
  updatedAt: Timestamp
}

const categoriesCollection = collection(db, 'categories')

// Kategori oluştur
export async function createCategory(categoryData: Omit<Category, 'id' | 'postCount' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    
    const now = Timestamp.now()
    const newCategory = {
      ...categoryData,
      postCount: 0,
      status: categoryData.status || 'active',
      createdAt: now,
      updatedAt: now
    }
    
    const docRef = await addDoc(categoriesCollection, newCategory)
    return docRef.id
  } catch (error) {
    throw new Error(`Kategori oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kategori güncelle
export async function updateCategory(id: string, categoryData: Partial<Omit<Category, 'id' | 'postCount' | 'createdAt'>>): Promise<void> {
  try {
    
    const categoryRef = doc(categoriesCollection, id)
    const updateData = {
      ...categoryData,
      updatedAt: Timestamp.now()
    }
    
    await updateDoc(categoryRef, updateData)
  } catch (error) {
    throw new Error(`Kategori güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kategori sil
export async function deleteCategory(id: string): Promise<void> {
  try {
    
    const categoryRef = doc(categoriesCollection, id)
    await deleteDoc(categoryRef)
  } catch (error) {
    throw new Error(`Kategori silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Tüm kategorileri getir
export async function getCategories(): Promise<Category[]> {
  try {
    
    const q = query(categoriesCollection, orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    const categories: Category[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      categories.push({
        id: doc.id,
        ...doc.data()
      } as Category)
    }
    
    return categories
  } catch (error) {
    throw new Error(`Kategoriler getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Aktif kategorileri getir
export async function getActiveCategories(): Promise<Category[]> {
  try {
    
    // Önce tüm kategorileri getir, sonra filtrele ve sırala
    const snapshot = await getDocs(categoriesCollection)
    const categories: Category[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      if (data.status === 'active') {
        categories.push({
          id: doc.id,
          ...data
        } as Category)
      }
    }
    
    // Client-side sıralama
    categories.sort((a, b) => a.name.localeCompare(b.name, 'tr'))
    
    return categories
  } catch (error) {
    throw new Error(`Aktif kategoriler getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kategori getir (ID ile)
export async function getCategory(id: string): Promise<Category | null> {
  try {
    
    const categoryRef = doc(categoriesCollection, id)
    const snapshot = await getDoc(categoryRef)
    
    if (snapshot.exists()) {
      const category = {
        id: snapshot.id,
        ...snapshot.data()
      } as Category
      return category
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Kategori getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kategori slug ile getir
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    
    const q = query(categoriesCollection, where('slug', '==', slug))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      const category = {
        id: doc.id,
        ...doc.data()
      } as Category
      return category
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Kategori getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kategori post sayısını güncelle (kategori adı ile)
export async function updateCategoryPostCount(categoryName: string, increment: boolean): Promise<void> {
  try {
    
    // Kategori adı ile kategoriyi bul
    const q = query(categoriesCollection, where('name', '==', categoryName))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      const categoryDoc = snapshot.docs[0]
      const categoryData = categoryDoc.data()
      const currentCount = categoryData.postCount || 0
      const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1)
      
      await updateDoc(categoryDoc.ref, {
        postCount: newCount,
        updatedAt: Timestamp.now()
      })
    } else {
    }
  } catch (error) {
    throw new Error(`Kategori post sayısı güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kategori post sayısını gerçek zamanlı hesapla
export async function calculateCategoryPostCount(categoryName: string): Promise<number> {
  try {
    
    // Blog koleksiyonundan bu kategoriye ait blogları say
    const blogsCollection = collection(db, 'blogs')
    const q = query(blogsCollection, where('category', '==', categoryName))
    const snapshot = await getDocs(q)
    
    const count = snapshot.size
    
    return count
  } catch (error) {
    return 0
  }
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

// Slug oluştur
export function generateSlug(name: string): string {
  return turkishToEnglish(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Toplu kategori silme
export async function deleteCategories(categoryIds: string[]): Promise<{ success: number; failed: number; errors: string[] }> {
  try {
    
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }
    
    // Her kategoriyi tek tek sil
    for (const categoryId of categoryIds) {
      try {
        await deleteCategory(categoryId)
        results.success++
      } catch (error) {
        results.failed++
        const errorMessage = `Kategori ${categoryId} silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`
        results.errors.push(errorMessage)
      }
    }
    
    return results
  } catch (error) {
    throw new Error(`Toplu kategori silme işlemi başarısız: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}




