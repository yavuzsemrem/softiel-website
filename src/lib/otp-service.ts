// OTP (One-Time Password) Service
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc, 
  getDocs,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'
// EmailJS REST fallback
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send'
const EMAILJS_TO = process.env.EMAILJS_TO || 'info@softiel.com'
// EmailJS config is only used for template settings, not for sending
const EMAILJS_CONFIG = {
  otpTemplate: {
    toEmail: 'info@softiel.com',
    fromName: 'Softiel Admin',
    replyTo: 'info@softiel.com',
    subject: 'Admin Dashboard - Verification Code',
    companyName: 'Softiel'
  },
  otpSettings: {
    length: 6,
    expiryMinutes: 5,
    maxAttempts: 3,
    resendCooldown: 60
  }
}

export interface OTPRecord {
  id: string
  email: string
  code: string
  expiresAt: Timestamp
  attempts: number
  maxAttempts: number
  createdAt: Timestamp
  isUsed: boolean
}

export interface OTPSendResult {
  success: boolean
  error?: string
  otpId?: string
  otpCode?: string // Client-side EmailJS gönderimi için
  userName?: string // Client-side EmailJS template'inde kullanım için
  expiresIn?: number
}

export interface OTPVerifyResult {
  success: boolean
  error?: string
  isValid?: boolean
}

// Generate 6-digit OTP code
function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Check if user exists in Firestore
export async function checkUserExists(email: string): Promise<{ exists: boolean; user?: any }> {
  try {
    const usersCollection = collection(db, 'users')
    const emailLower = email.toLowerCase()
    
    // Query kullanmadan tüm collection'ı çek ve manuel filtrele (server-side bug workaround)
    const snapshot = await getDocs(usersCollection)
    
    // Manuel olarak email ile eşleşen kullanıcıyı bul
    let foundUser: any = null
    let foundDocId: string = ''
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      if (data.email && data.email.toLowerCase() === emailLower) {
        foundUser = data
        foundDocId = doc.id
        break
      }
    }
    
    if (!foundUser) {
      return { exists: false }
    }
    
    return { 
      exists: true, 
      user: {
        id: foundDocId,
        ...foundUser
      }
    }
  } catch (error) {
    console.error('Error checking user existence:', error)
    return { exists: false }
  }
}

// Send OTP via EmailJS REST API (Render ortamı için en güvenilir, ücretsiz)
export async function sendOTPEmail(email: string, otpCode: string, userName: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Development modunda log
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment) {
      console.log(`[DEV MODE] OTP Code for ${email}: ${otpCode}`)
      console.log(`[DEV MODE] Email would be sent to: ${EMAILJS_TO}`)
    }

    // Render'da SMTP çalışmaz; direkt EmailJS REST API kullan (ücretsiz, domain kontrolü yok)
    const result = await sendViaEmailJS(email, otpCode, userName)
    return result
    
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'E-posta gönderilirken hata oluştu' 
    }
  }
}


async function sendViaEmailJS(email: string, otpCode: string, userName: string): Promise<{ success: boolean; error?: string }> {
  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) {
      return { success: false, error: 'EmailJS config missing' }
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: EMAILJS_TO,
        from_name: 'Softiel Admin',
        reply_to: EMAILJS_TO,
        user_name: userName,
        user_email: email,
        otp_code: otpCode,
        message: `Your OTP code is ${otpCode}`,
        date: new Date().toISOString()
      }
    }

    // Origin header yok - ücretsiz planda domain eklenemiyor, domain kontrolü yok
    const res = await fetch(EMAILJS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const text = await res.text()
    if (!res.ok) {
      return { success: false, error: `EmailJS error: ${text || res.statusText}` }
    }
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e?.message || 'EmailJS request failed' }
  }
}

// Generate and store OTP
export async function generateOTP(email: string): Promise<OTPSendResult> {
  try {
    // Check if user exists (temporarily disabled for testing)
    const userCheck = await checkUserExists(email)
    console.log('User check result:', userCheck)
    if (!userCheck.exists) {
      console.log('User not found, but continuing for test...')
      // return { success: false, error: 'Bu e-posta adresi sistemde kayıtlı değil' }
    }

    // Check for existing unused OTP
    const otpCollection = collection(db, 'otp_codes')
    const emailLower = email.toLowerCase()
    
    // Query kullanmadan tüm collection'ı çek (server-side bug workaround)
    const existingSnapshot = await getDocs(otpCollection)

    // Delete existing unused OTPs için email ve isUsed kontrolü
    for (const docSnapshot of existingSnapshot.docs) {
      const data = docSnapshot.data() as OTPRecord
      if (data.email === emailLower && !data.isUsed) {
        await deleteDoc(docSnapshot.ref)
      }
    }

    // Generate new OTP
    const otpCode = generateOTPCode()
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + EMAILJS_CONFIG.otpSettings.expiryMinutes)

    const otpId = `otp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const otpRecord: OTPRecord = {
      id: otpId,
      email: email.toLowerCase(),
      code: otpCode,
      expiresAt: Timestamp.fromDate(expiresAt),
      attempts: 0,
      maxAttempts: EMAILJS_CONFIG.otpSettings.maxAttempts,
      createdAt: Timestamp.now(),
      isUsed: false
    }

    // Store OTP in Firestore
    await setDoc(doc(otpCollection, otpId), otpRecord)

    // Get user name for email (reuse existing userCheck)
    const userName = userCheck.user?.name || 'Admin Kullanıcı'

    // OTP oluşturuldu ve kaydedildi
    // E-posta gönderimi client-side'da yapılacak (EmailJS browser SDK)
    // otpCode'u response'da döndür ki client-side'da kullanılsın
    return { 
      success: true, 
      otpId,
      otpCode, // Client-side'da EmailJS ile gönderilmek için
      userName, // Client-side'da EmailJS template'inde kullanılmak için
      expiresIn: EMAILJS_CONFIG.otpSettings.expiryMinutes * 60
    }
  } catch (error: any) {
    console.error('Error generating OTP:', error)
    return { 
      success: false, 
      error: 'OTP oluşturulurken hata oluştu' 
    }
  }
}

// Verify OTP code
export async function verifyOTP(email: string, code: string): Promise<OTPVerifyResult> {
  try {
    console.log('Verifying OTP for:', email, 'with code:', code)
    
    const otpCollection = collection(db, 'otp_codes')
    const emailLower = email.toLowerCase()
    
    // Query kullanmadan tüm collection'ı çek (server-side bug workaround)
    const snapshot = await getDocs(otpCollection)
    
    console.log('Found OTP records:', snapshot.docs.length)

    // Email ve isUsed ile manuel filtreleme
    const unusedDocs = snapshot.docs.filter(doc => {
      const data = doc.data() as OTPRecord
      return data.email === emailLower && !data.isUsed
    })

    if (unusedDocs.length === 0) {
      console.log('No unused OTP records found')
      return { success: false, error: 'Geçersiz veya süresi dolmuş OTP kodu', isValid: false }
    }

    const otpDoc = unusedDocs[0]
    const otpData = otpDoc.data() as OTPRecord

    // Check if OTP is expired
    const now = Timestamp.now()
    if (now.toMillis() > otpData.expiresAt.toMillis()) {
      // Delete expired OTP
      await deleteDoc(otpDoc.ref)
      return { success: false, error: 'OTP kodu süresi dolmuş', isValid: false }
    }

    // Check attempt limit
    if (otpData.attempts >= otpData.maxAttempts) {
      // Delete OTP after max attempts
      await deleteDoc(otpDoc.ref)
      return { success: false, error: 'Çok fazla hatalı deneme. Yeni OTP kodu alın', isValid: false }
    }

    // Verify code
    if (otpData.code !== code) {
      // Increment attempts
      await setDoc(otpDoc.ref, {
        ...otpData,
        attempts: otpData.attempts + 1
      }, { merge: true })

      const remainingAttempts = otpData.maxAttempts - (otpData.attempts + 1)
      return { 
        success: false, 
        error: `Invalid code. ${remainingAttempts} attempts remaining`, 
        isValid: false 
      }
    }

    // Mark OTP as used
    await setDoc(otpDoc.ref, {
      ...otpData,
      isUsed: true
    }, { merge: true })

    return { success: true, isValid: true }
  } catch (error: any) {
    console.error('Error verifying OTP:', error)
    return { 
      success: false, 
      error: 'OTP doğrulanırken hata oluştu',
      isValid: false
    }
  }
}

// Clean up expired OTPs (can be called periodically)
export async function cleanupExpiredOTPs(): Promise<void> {
  try {
    const otpCollection = collection(db, 'otp_codes')
    const snapshot = await getDocs(otpCollection)
    
    const now = Timestamp.now()
    const expiredOTPs = snapshot.docs.filter(doc => {
      const data = doc.data() as OTPRecord
      return !data.isUsed && now.toMillis() > data.expiresAt.toMillis()
    })

    // Delete expired OTPs
    for (const docSnapshot of expiredOTPs) {
      await deleteDoc(docSnapshot.ref)
    }

    console.log(`Cleaned up ${expiredOTPs.length} expired OTPs`)
  } catch (error) {
    console.error('Error cleaning up expired OTPs:', error)
  }
}

// Get OTP status
export async function getOTPStatus(email: string): Promise<{ 
  hasActiveOTP: boolean; 
  expiresAt?: Date; 
  attempts?: number; 
  maxAttempts?: number 
}> {
  try {
    const otpCollection = collection(db, 'otp_codes')
    const emailLower = email.toLowerCase()
    
    // Query kullanmadan tüm collection'ı çek (server-side bug workaround)
    const snapshot = await getDocs(otpCollection)

    // Email ve isUsed ile manuel filtreleme
    const unusedDocs = snapshot.docs.filter(doc => {
      const data = doc.data() as OTPRecord
      return data.email === emailLower && !data.isUsed
    })

    if (unusedDocs.length === 0) {
      return { hasActiveOTP: false }
    }

    const otpDoc = unusedDocs[0]
    const otpData = otpDoc.data() as OTPRecord

    // Check if expired
    const now = Timestamp.now()
    if (now.toMillis() > otpData.expiresAt.toMillis()) {
      await deleteDoc(otpDoc.ref)
      return { hasActiveOTP: false }
    }

    return {
      hasActiveOTP: true,
      expiresAt: otpData.expiresAt.toDate(),
      attempts: otpData.attempts,
      maxAttempts: otpData.maxAttempts
    }
  } catch (error) {
    console.error('Error getting OTP status:', error)
    return { hasActiveOTP: false }
  }
}
