import { NextRequest, NextResponse } from 'next/server'
import { adminDb, initializationError } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Admin DB yoksa (development), başarılı ama boş sonuç dön
    if (!adminDb || initializationError) {
      console.warn('Admin DB not available, returning 0 count')
      return NextResponse.json({
        success: true,
        count: 0
      })
    }
    
    const activitiesCollection = adminDb.collection('activities')
    const snapshot = await activitiesCollection.get()
    
    // Manuel olarak okunmamışları say
    let unreadCount = 0
    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      if (data && data.isRead === false) {
        unreadCount++
      }
    })
    
    return NextResponse.json({
      success: true,
      count: unreadCount
    })
  } catch (error: any) {
    console.error('Error getting unread count:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get unread count', count: 0 },
      { status: 500 }
    )
  }
}

