import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

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

    // Get all users
    const usersCollection = collection(db, 'users')
    const snapshot = await getDocs(usersCollection)

    // Find user by email or username
    let foundUser: any = null
    let foundUserId: string = ''

    if (Array.isArray(snapshot.docs)) {
      if (identifier.includes('@')) {
        // Email search
        const identifierLower = identifier.toLowerCase()
        snapshot.docs.forEach((doc: any) => {
          const data = doc.data() as User
          if (data.email && data.email.toLowerCase() === identifierLower) {
            foundUser = data
            foundUserId = doc.id
          }
        })
      } else {
        // Username search
        snapshot.docs.forEach((doc: any) => {
          const data = doc.data() as User
          if (data.name === identifier) {
            foundUser = data
            foundUserId = doc.id
          }
        })
      }
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

