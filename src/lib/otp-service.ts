// OTP (One-Time Password) Service
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'
// EmailJS REST fallback
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send'
const EMAILJS_TO = process.env.EMAILJS_TO || 'info@softiel.com'
const PRIMARY_HOST = process.env.NEXT_PUBLIC_PRIMARY_HOST || 'www.softiel.com'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${PRIMARY_HOST}`
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
    const q = query(usersCollection, where('email', '==', email.toLowerCase()))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      return { exists: false }
    }

    const userDoc = snapshot.docs[0]
    const userData = userDoc.data()
    
    return { 
      exists: true, 
      user: {
        id: userDoc.id,
        ...userData
      }
    }
  } catch (error) {
    console.error('Error checking user existence:', error)
    return { exists: false }
  }
}

// Send OTP via Direct SMTP (No API endpoint needed)
export async function sendOTPEmail(email: string, otpCode: string, userName: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development'
    const allowDevBypass = process.env.OTP_ALLOW_DEV === 'true'
    
    // For testing, always try SMTP if configured
    const hasSMTPConfig = process.env.SMTP_USER && process.env.SMTP_PASS
    
    // Development veya explicit bypass modunda SMTP olmadan başarı döndür
    if ((isDevelopment || allowDevBypass) && !hasSMTPConfig) {
      // In development without SMTP config, log the OTP and return success
      console.log(`[DEV MODE] OTP Code for ${email}: ${otpCode}`)
      console.log(`[DEV MODE] Email would be sent to: info@softiel.com`)
      return { success: true }
    }

    // In production, use direct SMTP

    // Import nodemailer dynamically
    const nodemailer = await import('nodemailer')
    
    // Ortak SMTP bilgileriniz
    const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com'
    const smtpUser = process.env.SMTP_USER || 'info@softiel.com'
    const smtpPass = process.env.SMTP_PASS || 'your-email-password'
    const smtpFrom = process.env.SMTP_FROM || smtpUser

    // 1) SSL 465 denemesi (secure: true)
    const ssl465 = {
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: (process.env.SMTP_SECURE || 'true') === 'true',
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: isDevelopment ? 5000 : 15000,
      greetingTimeout: isDevelopment ? 3000 : 10000,
      socketTimeout: isDevelopment ? 5000 : 15000,
      pool: false,
      maxConnections: 1,
      maxMessages: 1
    }

    // 2) STARTTLS 587 fallback (secure: false + requireTLS)
    const starttls587 = {
      host: smtpHost,
      port: 587,
      secure: false,
      requireTLS: true as any,
      auth: { user: smtpUser, pass: smtpPass },
      tls: { ciphers: 'TLSv1.2', rejectUnauthorized: false },
      connectionTimeout: isDevelopment ? 5000 : 15000,
      greetingTimeout: isDevelopment ? 3000 : 10000,
      socketTimeout: isDevelopment ? 5000 : 15000,
      pool: false,
      maxConnections: 1,
      maxMessages: 1
    }
    
    // Validate SMTP configuration
    if (!smtpUser || !smtpPass) {
      console.error('SMTP configuration missing')
      return { success: false, error: 'SMTP configuration missing' }
    }
    
    // Birinci deneme: 465 SSL
    let transporter = nodemailer.createTransport(ssl465 as any)
    if (!isDevelopment) {
      try {
        await transporter.verify()
      } catch (verifyError: any) {
        console.error('SMTP verify (465 SSL) failed:', verifyError?.code || verifyError?.message || verifyError)
        // İkinci deneme: 587 STARTTLS
        try {
          transporter = nodemailer.createTransport(starttls587 as any)
          await transporter.verify()
        } catch (verifyError2: any) {
          console.error('SMTP verify (587 STARTTLS) failed:', verifyError2?.code || verifyError2?.message || verifyError2)
          // SMTP erişimi başarısız; EmailJS REST API fallback dene
          const ej = await sendViaEmailJS(email, otpCode, userName)
          if (ej.success) return { success: true }
          return { success: false, error: `SMTP failed (465/587). ${verifyError2?.message || verifyError2}. EmailJS fallback: ${ej.error || 'failed'}` }
        }
      }
    }
    
    // Create email content with new template
    const currentDate = new Date().toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
    const mailOptions = {
      from: `"Softiel Admin" <${smtpFrom}>`,
      to: 'info@softiel.com', // Always send to info@softiel.com
      subject: '🔐 Softiel Admin - Doğrulama Kodu',
      html: `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Doğrulama Kodu - Softiel Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Nunito:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1e293b; background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); min-height: 100vh; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(14, 165, 233, 0.15); }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%); color: white; padding: 40px 30px; text-align: center; position: relative; }
        .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') opacity: 0.1; }
        .header h1 { font-family: 'Poppins', sans-serif; font-size: 32px; margin: 0 0 12px 0; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2; position: relative; z-index: 1; }
        .header p { font-size: 18px; margin: 0; opacity: 0.95; font-weight: 400; line-height: 1.4; position: relative; z-index: 1; }
        .content { padding: 40px 30px; }
        .otp-section { background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); border-radius: 20px; padding: 32px; margin-bottom: 32px; border: 1px solid rgba(14, 165, 233, 0.2); box-shadow: 0 8px 32px rgba(14, 165, 233, 0.1); text-align: center; }
        .otp-section h2 { font-family: 'Poppins', sans-serif; color: #1e40af; font-size: 24px; margin: 0 0 24px 0; font-weight: 600; letter-spacing: -0.1px; line-height: 1.3; }
        .otp-code { background: white; padding: 30px; border-radius: 20px; border: 2px solid rgba(14, 165, 233, 0.3); margin-bottom: 24px; box-shadow: 0 8px 32px rgba(14, 165, 233, 0.15); }
        .otp-number { font-family: 'Courier New', monospace; font-size: 48px; font-weight: 700; color: #0ea5e9; letter-spacing: 8px; text-shadow: 0 0 20px rgba(14, 165, 233, 0.3); line-height: 1.2; }
        .expiry-info { background: rgba(14, 165, 233, 0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(14, 165, 233, 0.2); }
        .expiry-info div { font-family: 'Inter', sans-serif; color: #0c4a6e; font-size: 16px; font-weight: 500; line-height: 1.5; }
        .user-info { background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); border-radius: 20px; padding: 28px; margin-bottom: 32px; border: 1px solid rgba(14, 165, 233, 0.2); box-shadow: 0 8px 32px rgba(14, 165, 233, 0.1); }
        .user-info h3 { font-family: 'Poppins', sans-serif; color: #1e40af; font-size: 20px; margin: 0 0 20px 0; text-align: center; font-weight: 600; letter-spacing: -0.1px; line-height: 1.3; }
        .info-card { background: white; padding: 20px; border-radius: 16px; border: 1px solid rgba(14, 165, 233, 0.1); margin-bottom: 16px; box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05); }
        .info-label { font-family: 'Inter', sans-serif; font-weight: 500; color: #0c4a6e; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.8; line-height: 1.4; }
        .info-value { font-family: 'Nunito', sans-serif; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5; }
        .security-warning { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 20px; padding: 28px; margin-bottom: 32px; border: 1px solid rgba(245, 158, 11, 0.3); box-shadow: 0 8px 32px rgba(245, 158, 11, 0.1); }
        .security-warning h3 { font-family: 'Poppins', sans-serif; color: #92400e; font-size: 20px; margin: 0 0 16px 0; text-align: center; font-weight: 600; letter-spacing: -0.1px; line-height: 1.3; }
        .security-warning div { font-family: 'Nunito', sans-serif; color: #92400e; line-height: 1.7; font-size: 15px; font-weight: 400; text-align: center; }
        .additional-info { background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); padding: 20px; border-radius: 16px; text-align: center; border: 1px solid rgba(14, 165, 233, 0.1); box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05); }
        .footer { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); color: white; padding: 32px 30px; text-align: center; position: relative; }
        .footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.3) 50%, transparent 100%); }
        .footer h3 { font-family: 'Poppins', sans-serif; font-size: 20px; margin: 0 0 16px 0; color: #f8fafc; font-weight: 600; letter-spacing: -0.1px; line-height: 1.3; }
        .footer p { font-family: 'Inter', sans-serif; color: #94a3b8; margin: 0 0 24px 0; font-size: 15px; font-weight: 400; line-height: 1.5; }
        .contact-info { background: rgba(14, 165, 233, 0.1); border-radius: 16px; padding: 24px; margin-top: 24px; border: 1px solid rgba(14, 165, 233, 0.2); backdrop-filter: blur(10px); }
        .contact-item { margin-bottom: 16px; color: #e2e8f0; font-size: 14px; font-weight: 400; line-height: 1.5; font-family: 'Inter', sans-serif; }
        .contact-item:last-child { margin-bottom: 0; }
        .contact-label { color: #0ea5e9; font-weight: 500; }
        .footer-bottom { margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(14, 165, 233, 0.2); }
        .footer-bottom p { margin: 0; font-size: 12px; color: #64748b; font-weight: 400; line-height: 1.4; font-family: 'Inter', sans-serif; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🔐 Doğrulama Kodu</h1>
            <p>Softiel Admin Dashboard Girişi</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- OTP Section -->
            <div class="otp-section">
                <h2>Güvenlik Kodunuz</h2>
                
                <!-- OTP Code Display -->
                <div class="otp-code">
                    <div class="otp-number">${otpCode}</div>
                </div>
                
                <!-- Expiry Info -->
                <div class="expiry-info">
                    <div>⏰ Bu kod <strong>5 dakika</strong> geçerlidir</div>
                </div>
            </div>
            
            <!-- User Info Section -->
            <div class="user-info">
                <h3>Giriş Bilgileri</h3>
                
                <div class="info-card">
                    <div class="info-label">Kullanıcı Adı</div>
                    <div class="info-value">${userName}</div>
                </div>
                
                <div class="info-card">
                    <div class="info-label">Giriş Yapmaya Çalışan Kullanıcı</div>
                    <div class="info-value">${email}</div>
                </div>
            </div>
            
            <!-- Security Warning -->
            <div class="security-warning">
                <h3>⚠️ Güvenlik Uyarısı</h3>
                <div>
                    • Bu kodu kimseyle paylaşmayın<br>
                    • Softiel ekibi hiçbir zaman sizden doğrulama kodu istemez<br>
                    • Eğer bu girişi siz yapmadıysanız, hemen şifrenizi değiştirin
                </div>
            </div>
            
            <!-- Additional Info -->
            <div class="additional-info">
                <div class="info-label">Kod Oluşturma Tarihi</div>
                <div class="info-value">${currentDate}</div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <h3>Softiel Software</h3>
            <p>Modern ve güvenli web çözümleri</p>
            
            <!-- Contact Info -->
            <div class="contact-info">
                <div class="contact-item">
                    <span class="contact-label">E-posta:</span> info@softiel.com
                </div>
                <div class="contact-item">
                    <span class="contact-label">Telefon:</span> +90 (541) 188 30 45
                </div>
                <div class="contact-item">
                    <span class="contact-label">Adres:</span> İstanbul, Türkiye
                </div>
            </div>
            
            <!-- Bottom Line -->
            <div class="footer-bottom">
                <p>Bu email otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.</p>
            </div>
        </div>
    </div>
</body>
</html>
      `,
      text: `Merhaba ${userName},\n\nGiriş yapmaya çalışan kullanıcı: ${email}\nDoğrulama kodunuz: ${otpCode}\n\nBu kod 5 dakika geçerlidir.\n\nSoftiel Admin Ekibi`
    }
    
    // Send email (SMTP)
    try {
      await transporter.sendMail(mailOptions)
      return { success: true }
    } catch (sendErr: any) {
      console.error('SMTP send failed:', sendErr?.code || sendErr?.message || sendErr)
      const ej = await sendViaEmailJS(email, otpCode, userName)
      if (ej.success) return { success: true }
      return { success: false, error: `SMTP send failed. EmailJS fallback: ${ej.error || 'failed'}` }
    }
    
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

    const res = await fetch(EMAILJS_API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // EmailJS, REST çağrılarında Origin başlığını kontrol edebiliyor.
        'Origin': SITE_URL
      },
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
    const q = query(
      otpCollection, 
      where('email', '==', email.toLowerCase()),
      where('isUsed', '==', false)
    )
    const existingSnapshot = await getDocs(q)

    // Delete existing unused OTPs
    for (const docSnapshot of existingSnapshot.docs) {
      await deleteDoc(docSnapshot.ref)
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

    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otpCode, userName)
    if (!emailResult.success) {
      // If email fails, delete the OTP record
      await deleteDoc(doc(otpCollection, otpId))
      return { success: false, error: emailResult.error }
    }

    return { 
      success: true, 
      otpId,
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
    const q = query(
      otpCollection,
      where('email', '==', email.toLowerCase()),
      where('isUsed', '==', false)
    )
    const snapshot = await getDocs(q)
    
    console.log('Found OTP records:', snapshot.docs.length)

    if (snapshot.empty) {
      console.log('No OTP records found')
      return { success: false, error: 'Geçersiz veya süresi dolmuş OTP kodu', isValid: false }
    }

    const otpDoc = snapshot.docs[0]
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
    const q = query(otpCollection, where('isUsed', '==', false))
    const snapshot = await getDocs(q)
    
    const now = Timestamp.now()
    const expiredOTPs = snapshot.docs.filter(doc => {
      const data = doc.data() as OTPRecord
      return now.toMillis() > data.expiresAt.toMillis()
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
    const q = query(
      otpCollection,
      where('email', '==', email.toLowerCase()),
      where('isUsed', '==', false)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return { hasActiveOTP: false }
    }

    const otpDoc = snapshot.docs[0]
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
