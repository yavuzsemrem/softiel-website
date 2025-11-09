// Authentication service using Firebase Realtime Database (Firestore cache bug workaround)
import { ref, get, child } from 'firebase/database'
import { rtdb } from './firebase'

export interface User {
  id: string
  name: string
  email: string
  password?: string
  role: 'admin' | 'editor' | 'author' | 'viewer'
  isActive: boolean
  displayName?: string
  bio?: string
  avatar?: string
  createdAt: any
  updatedAt: any
  lastLoginAt?: any
}

// Get all users from RTDB
export async function getAllUsersRTDB(): Promise<User[]> {
  try {
    const usersRef = ref(rtdb, 'users')
    const snapshot = await get(usersRef)
    
    if (!snapshot.exists()) {
      return []
    }
    
    const data = snapshot.val()
    const users: User[] = []
    
    Object.keys(data).forEach(key => {
      const userData = data[key]
      users.push({
        id: key,
        name: userData.name || '',
        email: userData.email || '',
        password: userData.password || '',
        role: userData.role || 'viewer',
        isActive: userData.isActive !== undefined ? userData.isActive : true,
        displayName: userData.displayName,
        bio: userData.bio || '',
        createdAt: userData.createdAt || new Date().toISOString(),
        updatedAt: userData.updatedAt || new Date().toISOString(),
        lastLoginAt: userData.lastLoginAt
      })
    })
    
    return users
  } catch (error) {
    console.error('RTDB getAllUsers error:', error)
    return []
  }
}

// Login with RTDB (no Firestore query issues)
export async function loginWithRTDB(identifier: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const users = await getAllUsersRTDB()
    
    if (users.length === 0) {
      return { success: false, error: 'No users found' }
    }
    
    // Find user by email or name
    let foundUser: User | null = null
    
    if (identifier.includes('@')) {
      // Email search
      foundUser = users.find(u => u.email.toLowerCase() === identifier.toLowerCase()) || null
    } else {
      // Name search
      foundUser = users.find(u => u.name === identifier) || null
    }
    
    if (!foundUser) {
      return { success: false, error: 'Invalid username, email or password' }
    }
    
    // Check password
    if (foundUser.password !== password) {
      return { success: false, error: 'Invalid username, email or password' }
    }
    
    // Check if active
    if (!foundUser.isActive) {
      return { success: false, error: 'Your account has been deactivated' }
    }
    
    return { success: true, user: foundUser }
  } catch (error) {
    console.error('RTDB login error:', error)
    return { success: false, error: 'Login failed: ' + (error instanceof Error ? error.message : 'Unknown error') }
  }
}

// OTP operations with RTDB
export async function createOTPRTDB(email: string, code: string): Promise<{ success: boolean; error?: string; otpId?: string }> {
  try {
    const { ref, set } = await import('firebase/database')
    
    const otpId = `otp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const expiresAt = Date.now() + (5 * 60 * 1000) // 5 minutes
    
    const otpRef = ref(rtdb, `otp_codes/${otpId}`)
    
    await set(otpRef, {
      id: otpId,
      email: email.toLowerCase(),
      code: code,
      expiresAt: expiresAt,
      attempts: 0,
      maxAttempts: 3,
      createdAt: Date.now(),
      isUsed: false
    })
    
    return { success: true, otpId }
  } catch (error) {
    console.error('RTDB createOTP error:', error)
    return { success: false, error: 'OTP creation failed' }
  }
}

export async function verifyOTPRTDB(email: string, code: string): Promise<{ success: boolean; isValid: boolean; error?: string }> {
  try {
    const { ref, get, update, remove } = await import('firebase/database')
    
    const otpCodesRef = ref(rtdb, 'otp_codes')
    const snapshot = await get(otpCodesRef)
    
    if (!snapshot.exists()) {
      return { success: false, isValid: false, error: 'No OTP codes found' }
    }
    
    const data = snapshot.val()
    const emailLower = email.toLowerCase()
    
    // Find unused OTP for this email
    let foundOtp: any = null
    let foundOtpId: string = ''
    
    Object.keys(data).forEach(key => {
      const otp = data[key]
      if (otp.email === emailLower && !otp.isUsed) {
        foundOtp = otp
        foundOtpId = key
      }
    })
    
    if (!foundOtp) {
      return { success: false, isValid: false, error: 'Geçersiz veya süresi dolmuş OTP kodu' }
    }
    
    // Check expiry
    if (Date.now() > foundOtp.expiresAt) {
      await remove(ref(rtdb, `otp_codes/${foundOtpId}`))
      return { success: false, isValid: false, error: 'OTP kodu süresi dolmuş' }
    }
    
    // Check attempts
    if (foundOtp.attempts >= foundOtp.maxAttempts) {
      await remove(ref(rtdb, `otp_codes/${foundOtpId}`))
      return { success: false, isValid: false, error: 'Çok fazla hatalı deneme' }
    }
    
    // Verify code
    if (foundOtp.code !== code) {
      const newAttempts = foundOtp.attempts + 1
      await update(ref(rtdb, `otp_codes/${foundOtpId}`), {
        attempts: newAttempts
      })
      return { success: false, isValid: false, error: `Geçersiz kod. ${foundOtp.maxAttempts - newAttempts} deneme kaldı` }
    }
    
    // Mark as used
    await update(ref(rtdb, `otp_codes/${foundOtpId}`), {
      isUsed: true
    })
    
    return { success: true, isValid: true }
  } catch (error) {
    console.error('RTDB verifyOTP error:', error)
    return { success: false, isValid: false, error: 'OTP verification failed' }
  }
}

