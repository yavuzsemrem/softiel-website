import { NextRequest, NextResponse } from 'next/server'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'

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

export async function POST(request: NextRequest) {
  try {
    const { email, userName } = await request.json()

    console.log('TOTP Setup request:', { email, userName })

    if (!email || !userName) {
      return NextResponse.json(
        { success: false, error: 'Email ve kullanıcı adı gerekli' },
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

    // Check if TOTP already exists for this user
    if (db) {
      const emailKey = email.toLowerCase().replace(/[.@]/g, '_')
      const snapshot = await db.ref(`totp/${emailKey}`).once('value')
      
      if (snapshot.exists()) {
        return NextResponse.json(
          { success: false, error: 'Bu kullanıcı için TOTP zaten kurulmuş. Giriş yapmayı deneyin.' },
          { status: 400 }
        )
      }
    }

    // Generate TOTP secret
    const secret = speakeasy.generateSecret({
      name: `Softiel (${userName})`,
      issuer: 'Softiel',
      length: 32
    })

    console.log('TOTP Secret generated')

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url || '')

    console.log('QR Code generated')

    // Store secret in Firebase Realtime Database
    const totpData = {
      secret: secret.base32,
      email: email.toLowerCase(),
      userName,
      isVerified: false,
      createdAt: new Date().toISOString()
    }

    if (db) {
      const emailKey = email.toLowerCase().replace(/[.@]/g, '_')
      await db.ref(`totp/${emailKey}`).set(totpData)
      console.log('TOTP data saved to Firebase')
    }

    return NextResponse.json({
      success: true,
      qrCode: qrCodeDataUrl,
      secret: secret.base32,
      otpauth_url: secret.otpauth_url
    })

  } catch (error: any) {
    console.error('TOTP setup error:', error)
    return NextResponse.json(
      { success: false, error: `Sunucu hatası: ${error.message}` },
      { status: 500 }
    )
  }
}
