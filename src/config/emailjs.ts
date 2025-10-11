/**
 * EmailJS Configuration for Admin Dashboard
 * OTP (One-Time Password) email sending configuration
 */

export const EMAILJS_CONFIG = {
  // EmailJS Service Configuration
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_OTP_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_OTP_PUBLIC_KEY || '',
  
  // OTP Email Template Configuration
  otpTemplate: {
    toEmail: 'info@softiel.com',
    fromName: 'Softiel Admin',
    replyTo: 'info@softiel.com',
    subject: 'Admin Dashboard - Verification Code',
    companyName: 'Softiel'
  },
  
  // OTP Settings
  otpSettings: {
    length: 6,
    expiryMinutes: 5,
    maxAttempts: 3,
    resendCooldown: 60 // seconds
  },
  
  // Environment kontrolü - Development'ta da çalışır
  isEnabled: Boolean(process.env.NEXT_PUBLIC_EMAILJS_OTP_SERVICE_ID && process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID && process.env.NEXT_PUBLIC_EMAILJS_OTP_PUBLIC_KEY),
} as const

// EmailJS Actions
export const EMAILJS_ACTIONS = {
  OTP_SEND: 'otp_send',
  OTP_RESEND: 'otp_resend',
  LOGIN_NOTIFICATION: 'login_notification',
  SECURITY_ALERT: 'security_alert',
} as const

// EmailJS Template Parameters Interface
export interface EmailJSTemplateParams {
  to_email: string
  to_name: string
  otp_code: string
  expiry_minutes: number
  user_name: string
  date: string
  company_name: string
  from_name: string
  reply_to: string
  subject?: string
  message?: string
}

// Environment kontrolü için yardımcı fonksiyon
export const isEmailJSEnabled = (): boolean => {
  // Server-side rendering sırasında false döndür
  if (typeof window === 'undefined') {
    return false
  }
  
  // EmailJS konfigürasyonu kontrolü
  const hasConfig = Boolean(EMAILJS_CONFIG.serviceId && 
                           EMAILJS_CONFIG.templateId && 
                           EMAILJS_CONFIG.publicKey)
  
  return hasConfig
}

// Development modunda sadece temel durum bilgisi
if (typeof window !== 'undefined' && typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
  console.log('📧 EmailJS durumu:', isEmailJSEnabled() ? 'Aktif' : 'Devre dışı (Development modu)')
  console.log('🌐 Hostname:', window.location.hostname)
  console.log('🔧 OTP Service ID:', EMAILJS_CONFIG.serviceId ? 'Ayarlanmış' : 'Ayarlanmamış')
  console.log('📝 OTP Template ID:', EMAILJS_CONFIG.templateId ? 'Ayarlanmış' : 'Ayarlanmamış')
  console.log('🔑 OTP Public Key:', EMAILJS_CONFIG.publicKey ? 'Ayarlanmış' : 'Ayarlanmamış')
}




