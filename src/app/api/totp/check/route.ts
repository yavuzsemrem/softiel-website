import { NextRequest, NextResponse } from 'next/server'

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
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email gerekli' },
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

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Veritabanı bağlantısı kurulamadı' },
        { status: 500 }
      )
    }

    // Check if TOTP setup exists
    const emailKey = email.toLowerCase().replace(/[.@]/g, '_')
    const snapshot = await db.ref(`totp/${emailKey}`).once('value')

    if (snapshot.exists()) {
      const totpData = snapshot.val()
      
      // TOTP kurulumu var
      return NextResponse.json({
        success: true,
        hasSetup: true,
        isVerified: totpData.isVerified || false
      })
    } else {
      // TOTP kurulumu yok
      return NextResponse.json({
        success: true,
        hasSetup: false
      })
    }

  } catch (error: any) {
    console.error('TOTP check error:', error)
    return NextResponse.json(
      { success: false, error: `Sunucu hatası: ${error.message}` },
      { status: 500 }
    )
  }
}


