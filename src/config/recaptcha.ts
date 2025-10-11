/**
 * ReCAPTCHA Configuration
 * Production'da çalışır, localhost'ta devre dışı
 */

export const RECAPTCHA_CONFIG = {
  // Site Key - Environment'tan al veya fallback
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  
  // Secret Key - Environment'tan al veya fallback
  secretKey: process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
  
  // ReCAPTCHA Version
  version: 'v3' as const,
  
  // Theme (v2 için)
  theme: 'light' as const,
  
  // Size (v2 için)
  size: 'invisible' as const,
  
  // Minimum Score (v3 için)
  minScore: 0.5,
  
  // Environment kontrolü - Sadece gerçek production'da çalışır
  isEnabled: false, // Firebase hosting'de devre dışı
} as const

// ReCAPTCHA Actions (v3 için)
export const RECAPTCHA_ACTIONS = {
  CONTACT_FORM: 'contact_form',
  NEWSLETTER: 'newsletter',
  LOGIN: 'login',
  REGISTER: 'register',
  BLOG_COMMENT: 'blog_comment',
} as const

// ReCAPTCHA Hook için tip tanımları
export interface ReCAPTCHAProps {
  action: keyof typeof RECAPTCHA_ACTIONS
  onVerify: (token: string) => void
  onError?: (error: Error) => void
}

// Environment kontrolü için yardımcı fonksiyon
export const isReCAPTCHAEnabled = (): boolean => {
  // Server-side rendering sırasında false döndür
  if (typeof window === 'undefined') {
    return false
  }
  
  // Localhost kontrolü
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.includes('localhost') ||
                     window.location.hostname.includes('192.168.') ||
                     window.location.hostname.includes('10.0.') ||
                     window.location.hostname.includes('172.')
  
  // Firebase Hosting kontrolü (devre dışı)
  const isFirebaseHosting = window.location.hostname.includes('web.app') ||
                           window.location.hostname.includes('firebaseapp.com') ||
                           window.location.hostname.includes('softielwebsite.web.app')
  
  // Sadece gerçek production domain'lerde aktif
  const isRealProduction = window.location.hostname.includes('softiel.com') ||
                          window.location.hostname.includes('softiel.dev')
  
  // ReCAPTCHA sadece gerçek production'da aktif, Firebase hosting'de devre dışı
  return !isLocalhost && !isFirebaseHosting && isRealProduction
}

// Development modunda sadece temel durum bilgisi (güvenlik için site key gizli)
if (typeof window !== 'undefined' && typeof process !== 'undefined' && process.env?.NODE_ENV === 'development' && process.env?.NEXT_PUBLIC_DEBUG_RECAPTCHA === 'true') {
  console.log('🔒 ReCAPTCHA durumu:', isReCAPTCHAEnabled() ? 'Aktif' : 'Devre dışı (Development modu)')
  console.log('🌐 Hostname:', window.location.hostname)
  // Site key güvenlik nedeniyle asla konsola yazdırılmıyor
}
