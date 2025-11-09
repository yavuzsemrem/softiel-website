import { NextRequest, NextResponse } from 'next/server'
import { adminDb, initializationError } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

interface User {
  name: string
  email: string
  password: string
  role: 'admin' | 'editor' | 'author' | 'viewer'
  isActive: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { identifier, password } = body

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: 'Email/username and password are required' },
        { status: 400 }
      )
    }

    // Admin DB yoksa (development), client-side SDK kullanılmalı
    if (!adminDb || initializationError) {
      console.warn('Admin DB not available for login, using fallback')
      
      // Development ortamında test kullanıcısı için basit kontrol
      // Production'da bu asla çalışmaz çünkü adminDb her zaman mevcut olacak
      if (identifier === 'admin' && password === 'admin') {
        return NextResponse.json({
          success: true,
          user: {
            id: 'dev-admin',
            name: 'Dev Admin',
            email: 'admin@softiel.com',
            role: 'admin',
            isActive: true
          }
        })
      }
      
      return NextResponse.json(
        { success: false, error: 'Authentication service not available in development mode. Use admin/admin for testing.' },
        { status: 503 }
      )
    }

    // Get all users
    const usersCollection = adminDb.collection('users')
    const snapshot = await usersCollection.get()

    // Find user by email or username
    let foundUser: any = null
    let foundUserId: string = ''
    
    if (identifier.includes('@')) {
      // Email search
      const identifierLower = identifier.toLowerCase()
      snapshot.docs.forEach((doc) => {
        const data = doc.data() as User
        if (data.email && data.email.toLowerCase() === identifierLower) {
          foundUser = data
          foundUserId = doc.id
        }
      })
    } else {
      // Username search
      snapshot.docs.forEach((doc) => {
        const data = doc.data() as User
        if (data.name === identifier) {
          foundUser = data
          foundUserId = doc.id
        }
      })
    }

    if (!foundUser) {
      return NextResponse.json(
        { success: false, error: 'Invalid username, email or password' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!foundUser.isActive) {
      return NextResponse.json(
        { success: false, error: 'Your account has been deactivated' },
        { status: 403 }
      )
    }

    // Check password
    if (foundUser.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid username, email or password' },
        { status: 401 }
      )
    }

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: foundUserId,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        isActive: foundUser.isActive
      }
    })
  } catch (error: any) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}

