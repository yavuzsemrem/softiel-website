// Firestore user service
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
import { safeUpdateDoc } from './firestore-utils'
import { db } from './firebase'

export interface User {
  id?: string
  name: string
  email: string
  password?: string
  role: 'admin' | 'editor' | 'author' | 'viewer'
  avatar?: string
  bio?: string
  isActive: boolean
  lastLoginAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

const usersCollection = collection(db, 'users')

// Kullanıcı oluştur
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'lastLoginAt'>): Promise<string> {
  try {
    
    const now = Timestamp.now()
    const newUser = {
      ...userData,
      createdAt: now,
      updatedAt: now
    }
    
    const docRef = await addDoc(usersCollection, newUser)
    return docRef.id
  } catch (error) {
    throw new Error(`Kullanıcı oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kullanıcı güncelle
export async function updateUser(id: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'lastLoginAt'>>): Promise<void> {
  try {
    
    const userRef = doc(usersCollection, id)
    
    const updateData = {
      ...userData,
      updatedAt: Timestamp.now()
    }
    
    await safeUpdateDoc(userRef, updateData)
  } catch (error) {
    throw new Error(`Kullanıcı güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kullanıcı sil
export async function deleteUser(id: string): Promise<void> {
  try {
    
    const userRef = doc(usersCollection, id)
    await deleteDoc(userRef)
  } catch (error) {
    throw new Error(`Kullanıcı silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Tüm kullanıcıları getir
export async function getUsers(): Promise<User[]> {
  try {
    
    const q = query(usersCollection, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const users: User[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      users.push({
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        role: data.role || 'viewer',
        bio: data.bio || '',
        isActive: data.isActive !== undefined ? data.isActive : true,
        lastLoginAt: data.lastLoginAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as User)
    }
    
    return users
  } catch (error) {
    throw new Error(`Kullanıcılar getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Aktif kullanıcıları getir
export async function getActiveUsers(): Promise<User[]> {
  try {
    
    const q = query(usersCollection, where('isActive', '==', true), orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    const users: User[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      users.push({
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        role: data.role || 'viewer',
        bio: data.bio || '',
        isActive: data.isActive !== undefined ? data.isActive : true,
        lastLoginAt: data.lastLoginAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as User)
    }
    
    return users
  } catch (error) {
    throw new Error(`Aktif kullanıcılar getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Yazma yetkisi olan aktif kullanıcıları getir
export async function getWritableUsers(): Promise<User[]> {
  try {
    
    const q = query(usersCollection, where('isActive', '==', true), orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    const users: User[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      const role = data.role || 'viewer'
      
      // Sadece yazma yetkisi olan kullanıcıları ekle
      if (['admin', 'editor', 'author'].includes(role)) {
        users.push({
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          role: role as User['role'],
          bio: data.bio || '',
          isActive: data.isActive !== undefined ? data.isActive : true,
          lastLoginAt: data.lastLoginAt,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as User)
      }
    })
    
    return users
  } catch (error) {
    throw new Error(`Yazma yetkisi olan kullanıcılar getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kullanıcı getir (ID ile)
export async function getUser(id: string): Promise<User | null> {
  try {
    
    const userRef = doc(usersCollection, id)
    const snapshot = await getDoc(userRef)
    
    if (snapshot.exists()) {
      const data = snapshot.data()
      if (data) {
        const user = {
          id: snapshot.id,
          name: data.name || '',
          email: data.email || '',
          password: data.password || '',
          role: data.role || 'viewer',
          bio: data.bio || '',
          isActive: data.isActive !== undefined ? data.isActive : true,
          lastLoginAt: data.lastLoginAt,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } as User
        return user
      }
    }
    return null
  } catch (error) {
    throw new Error(`Kullanıcı getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kullanıcı getir (email ile)
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    
    const q = query(usersCollection, where('email', '==', email))
    const snapshot = await getDocs(q)
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      const data = doc.data()
      const user = {
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        role: data.role || 'viewer',
        bio: data.bio || '',
        isActive: data.isActive !== undefined ? data.isActive : true,
        lastLoginAt: data.lastLoginAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as User
      return user
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Kullanıcı getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kullanıcı durumunu güncelle
export async function updateUserStatus(id: string, isActive: boolean): Promise<void> {
  try {
    
    const userRef = doc(usersCollection, id)
    
    await safeUpdateDoc(userRef, {
      isActive,
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    throw new Error(`Kullanıcı durumu güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kullanıcı rolünü güncelle
export async function updateUserRole(id: string, role: User['role']): Promise<void> {
  try {
    
    const userRef = doc(usersCollection, id)
    
    await safeUpdateDoc(userRef, {
      role,
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    throw new Error(`Kullanıcı rolü güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}


// Kullanıcı istatistikleri
export async function getUserStats(): Promise<{
  total: number
  active: number
  inactive: number
  byRole: Record<string, number>
}> {
  try {
    
    const snapshot = await getDocs(usersCollection)
    const stats = {
      total: 0,
      active: 0,
      inactive: 0,
      byRole: {} as Record<string, number>
    }
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      stats.total++
      
      if (data.isActive) {
        stats.active++
      } else {
        stats.inactive++
      }
      
      const role = data.role || 'unknown'
      stats.byRole[role] = (stats.byRole[role] || 0) + 1
    }
    
    return stats
  } catch (error) {
    throw new Error(`Kullanıcı istatistikleri getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Kullanıcı adı veya email ile kullanıcı getir
export async function getUserByEmailOrName(identifier: string): Promise<User | null> {
  try {
    
    // Önce email ile ara
    const emailQuery = query(usersCollection, where('email', '==', identifier.toLowerCase()))
    const emailSnapshot = await getDocs(emailQuery)
    
    if (!emailSnapshot.empty) {
      const doc = emailSnapshot.docs[0]
      const data = doc.data()
      const user = {
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        role: data.role || 'viewer',
        bio: data.bio || '',
        isActive: data.isActive !== undefined ? data.isActive : true,
        lastLoginAt: data.lastLoginAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as User
      return user
    }
    
    // Email bulunamazsa kullanıcı adı ile ara
    const nameQuery = query(usersCollection, where('name', '==', identifier))
    const nameSnapshot = await getDocs(nameQuery)
    
    if (!nameSnapshot.empty) {
      const doc = nameSnapshot.docs[0]
      const data = doc.data()
      const user = {
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        role: data.role || 'viewer',
        bio: data.bio || '',
        isActive: data.isActive !== undefined ? data.isActive : true,
        lastLoginAt: data.lastLoginAt,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      } as User
      return user
    }
    
    return null
  } catch (error) {
    return null
  }
}

// Toplu kullanıcı silme
export async function deleteUsers(userIds: string[]): Promise<{ success: number; failed: number; errors: string[] }> {
  try {
    
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }
    
    // Her kullanıcıyı tek tek sil
    for (const userId of userIds) {
      try {
        await deleteUser(userId)
        results.success++
      } catch (error) {
        results.failed++
        const errorMessage = `Kullanıcı ${userId} silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`
        results.errors.push(errorMessage)
      }
    }
    
    return results
  } catch (error) {
    throw new Error(`Toplu kullanıcı silme işlemi başarısız: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

export async function calculateUserPostCount(userEmail: string, userName?: string): Promise<number> {
  try {
    
    // Blog koleksiyonundan bu kullanıcıya ait blogları say
    const blogsCollection = collection(db, 'blogs')
    
    // Sadece kullanıcı adı ile arama yap (çünkü blog yazılarında author alanı kullanıcı adı)
    const searchName = userName || userEmail
    const blogQuery = query(blogsCollection, where('author', '==', searchName))
    const snapshot = await getDocs(blogQuery)
    
    const count = snapshot.size
    
    return count
  } catch (error) {
    return 0
  }
}




