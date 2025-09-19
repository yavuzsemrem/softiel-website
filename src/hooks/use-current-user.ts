import { useState, useEffect } from 'react'
import { getCurrentUser, getCurrentUserData } from '@/lib/auth'
import { getUserByEmail } from '@/lib/user-service'
import { processUserName } from '@/lib/user-name-utils'

export interface CurrentUser {
  uid: string
  email: string
  displayName: string
  role: 'admin' | 'author' | 'moderator' | 'user'
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        // First check localStorage
        const isAuth = localStorage.getItem('isAuthenticated')
        const userRole = localStorage.getItem('userRole')
        const userEmail = localStorage.getItem('userEmail')
        const userName = localStorage.getItem('userName')
        
        if (isAuth === 'true' && userRole && userEmail) {
          // Try to get user data from Firestore users collection
          try {
            const firestoreUser = await getUserByEmail(userEmail)
            if (firestoreUser) {
              setUser({
                uid: firestoreUser.id,
                email: firestoreUser.email,
                displayName: processUserName(firestoreUser.name || 'Admin'),
                role: firestoreUser.role as CurrentUser['role']
              })
            } else {
              // Fallback to localStorage data
              setUser({
                uid: 'local-user',
                email: userEmail,
                displayName: processUserName(userName || 'Admin'),
                role: userRole as CurrentUser['role']
              })
            }
          } catch (firestoreError) {
            // If Firestore fails, use localStorage data
            setUser({
              uid: 'local-user',
              email: userEmail,
              displayName: processUserName(userName || 'Admin'),
              role: userRole as CurrentUser['role']
            })
          }
          setLoading(false)
          return
        }

        // Fallback to Firebase Auth
        const firebaseUser = getCurrentUser()
        if (!firebaseUser) {
          setLoading(false)
          return
        }

        const userData = await getCurrentUserData()
        if (userData) {
          // Try to get user data from Firestore users collection
          try {
            const firestoreUser = await getUserByEmail(userData.email)
            if (firestoreUser) {
              setUser({
                uid: firestoreUser.id,
                email: firestoreUser.email,
                displayName: processUserName(firestoreUser.name || 'Admin'),
                role: firestoreUser.role as CurrentUser['role']
              })
            } else {
              // Fallback to Firebase Auth data
              setUser({
                uid: userData.uid,
                email: userData.email,
                displayName: processUserName(userData.displayName),
                role: userData.role
              })
            }
          } catch (firestoreError) {
            // If Firestore fails, use Firebase Auth data
            setUser({
              uid: userData.uid,
              email: userData.email,
              displayName: processUserName(userData.displayName),
              role: userData.role
            })
          }
        }
      } catch (error) {
        // User load error handled silently
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  return { user, loading }
}


