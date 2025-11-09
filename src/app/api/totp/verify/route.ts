import { NextRequest, NextResponse } from 'next/server'
import speakeasy from 'speakeasy'

// Firebase Admin kullanımı
let admin: any
let db: any

try {
  admin = require('firebase-admin')
  
  if (!admin.apps.length) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    })
  }
  
  db = admin.database()
} catch (error) {
  console.error('Firebase Admin initialization error:', error)
}

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function rateLimit(identifier: string, maxRequests: number = 5, windowMs: number = 5 * 60 * 1000): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()

    console.log('TOTP Verify Request:', { email, tokenLength: token?.length })

    if (!email || !token) {
      return NextResponse.json(
        { success: false, error: 'E-posta adresi ve doğrulama kodu gerekli' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Geçerli bir e-posta adresi girin' },
        { status: 400 }
      )
    }

    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(`${clientIP}_${email}`)) {
      return NextResponse.json(
        { success: false, error: 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin.' },
        { status: 429 }
      )
    }

    // Validate token format (6 digits)
    if (!/^\d{6}$/.test(token)) {
      return NextResponse.json(
        { success: false, error: 'Doğrulama kodu 6 haneli olmalıdır' },
        { status: 400 }
      )
    }

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Veritabanı bağlantısı kurulamadı' },
        { status: 500 }
      )
    }

    // Get TOTP secret from Firebase
    const emailKey = email.toLowerCase().replace(/[.@]/g, '_')
    const snapshot = await db.ref(`totp/${emailKey}`).once('value')

    if (!snapshot.exists()) {
      return NextResponse.json(
        { success: false, error: 'TOTP yapılandırması bulunamadı. Lütfen QR kodu tekrar tarayın.' },
        { status: 404 }
      )
    }

    const totpData = snapshot.val()

    // Verify TOTP token
    const isValid = speakeasy.totp.verify({
      secret: totpData.secret,
      encoding: 'base32',
      token: token,
      window: 2 // Allow 2 time steps before and after (60 seconds tolerance)
    })

    console.log('TOTP Verify Result:', { isValid })

    if (isValid) {
      // Mark as verified
      await db.ref(`totp/${emailKey}`).update({
        isVerified: true,
        lastVerifiedAt: new Date().toISOString()
      })

      return NextResponse.json({
        success: true,
        message: 'Doğrulama başarılı',
        isValid: true
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Geçersiz doğrulama kodu', isValid: false },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('TOTP verify error:', error)
    return NextResponse.json(
      { success: false, error: `Sunucu hatası: ${error.message}` },
      { status: 500 }
    )
  }
}

// Cleanup rate limit store every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)
