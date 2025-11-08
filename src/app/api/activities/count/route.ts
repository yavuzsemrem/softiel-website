import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const activitiesCollection = collection(db, 'activities')
    const snapshot = await getDocs(activitiesCollection)
    
    // Manuel olarak okunmamışları say
    let unreadCount = 0
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      if (data && data.isRead === false) {
        unreadCount++
      }
    }
    
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

