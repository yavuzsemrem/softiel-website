// Firestore-based authentication service
import { 
  collection, 
  query, 
  where, 
  getDocs,
  doc,
  getDoc,
  updateDoc,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { User } from './user-service'
import { RECAPTCHA_CONFIG } from '@/config/recaptcha'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'author' | 'viewer'
  isActive: boolean
  lastLoginAt?: Timestamp
}

// Login attempts tracking
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

// ReCAPTCHA doğrulama fonksiyonu
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_CONFIG.secretKey}&response=${token}`
    })
    
    const data = await response.json()
    return data.success && data.score >= 0.5 // Minimum score 0.5
  } catch (error) {
    console.error('ReCAPTCHA verification failed:', error)
    return false
  }
}

// Login user with Firestore
export async function loginUser(
  email: string, 
  password: string
): Promise<{ success: boolean; error?: string; user?: AuthUser }> {
  try {
    // Check rate limiting
    if (!isRateLimited(email)) {
      return { success: false, error: 'Çok fazla giriş denemesi. Lütfen 15 dakika bekleyin.' }
    }

    // Find user by email
    const usersCollection = collection(db, 'users')
    const q = query(usersCollection, where('email', '==', email.toLowerCase()))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      return { success: false, error: 'Invalid email or password' }
    }

    const userDoc = snapshot.docs[0]
    const userData = userDoc.data() as User

    // Check if user is active
    if (!userData.isActive) {
      return { success: false, error: 'Your account has been deactivated' }
    }

    // Check password (simple comparison for now)
    if (userData.password !== password) {
      await incrementLoginAttempts(email)
      return { success: false, error: 'Invalid email or password' }
    }

    // Update last login time
    const userRef = doc(db, 'users', userDoc.id)
    await updateDoc(userRef, {
      lastLoginAt: Timestamp.now()
    })

    // Clear rate limiting
    loginAttempts.delete(email)

    const authUser: AuthUser = {
      id: userDoc.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      isActive: userData.isActive,
      lastLoginAt: Timestamp.now()
    }

    return { success: true, user: authUser }
  } catch (error: any) {
    await incrementLoginAttempts(email)
    return { success: false, error: 'An error occurred during login' }
  }
}

// Login user by username or email
export async function loginUserByUsernameOrEmail(
  identifier: string, 
  password: string,
  recaptchaToken?: string | null
): Promise<{ success: boolean; error?: string; user?: AuthUser }> {
  try {
    // ReCAPTCHA doğrulaması (production'da)
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
      if (!isValidRecaptcha) {
        return { success: false, error: 'Invalid reCAPTCHA verification' }
      }
    }

    // Check rate limiting
    if (!isRateLimited(identifier)) {
      return { success: false, error: 'Çok fazla giriş denemesi. Lütfen 15 dakika bekleyin.' }
    }

    const usersCollection = collection(db, 'users')
    let q
    let snapshot

    // First try to find by email
    if (identifier.includes('@')) {
      q = query(usersCollection, where('email', '==', identifier.toLowerCase()))
      snapshot = await getDocs(q)
    } else {
      // Try to find by name
      q = query(usersCollection, where('name', '==', identifier))
      snapshot = await getDocs(q)
    }
    
    if (snapshot.empty) {
      return { success: false, error: 'Invalid username, email or password' }
    }

    const userDoc = snapshot.docs[0]
    const userData = userDoc.data() as User

    // Check if user is active
    if (!userData.isActive) {
      return { success: false, error: 'Your account has been deactivated' }
    }

    // Check password
    if (userData.password !== password) {
      await incrementLoginAttempts(identifier)
      return { success: false, error: 'Invalid username, email or password' }
    }

    // Update last login time
    const userRef = doc(db, 'users', userDoc.id)
    await updateDoc(userRef, {
      lastLoginAt: Timestamp.now()
    })

    // Clear rate limiting
    loginAttempts.delete(identifier)

    const authUser: AuthUser = {
      id: userDoc.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      isActive: userData.isActive,
      lastLoginAt: Timestamp.now()
    }

    return { success: true, user: authUser }
  } catch (error: any) {
    await incrementLoginAttempts(identifier)
    return { success: false, error: 'An error occurred during login' }
  }
}

// Get user by ID
export async function getUserById(id: string): Promise<AuthUser | null> {
  try {
    const userRef = doc(db, 'users', id)
    const snapshot = await getDoc(userRef)
    
    if (!snapshot.exists()) {
      return null
    }

    const userData = snapshot.data() as User

    return {
      id: snapshot.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      isActive: userData.isActive,
      lastLoginAt: userData.lastLoginAt
    }
  } catch (error) {
    return null
  }
}

// Helper functions
function isRateLimited(identifier: string): boolean {
  const now = Date.now()
  const record = loginAttempts.get(identifier)
  
  if (!record) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now })
    return true
  }

  // Reset if more than 15 minutes have passed
  if (now - record.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now })
    return true
  }

  // Check if exceeded limit
  if (record.count >= 5) {
    return false
  }

  record.count++
  record.lastAttempt = now
  return true
}

async function incrementLoginAttempts(identifier: string): Promise<void> {
  try {
    const now = Date.now()
    const record = loginAttempts.get(identifier)
    
    if (!record) {
      loginAttempts.set(identifier, { count: 1, lastAttempt: now })
    } else {
      record.count++
      record.lastAttempt = now
    }
  } catch (error) {
    // Error incrementing login attempts - silently continue
  }
}
