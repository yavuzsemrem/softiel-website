import { NextRequest, NextResponse } from 'next/server'
import { adminDb, initializationError } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Admin DB yoksa (development), başarılı ama boş sonuç dön
    if (!adminDb || initializationError) {
      console.warn('Admin DB not available, returning empty activities')
      return NextResponse.json({
        success: true,
        activities: []
      })
    }
    
    const url = new URL(request.url || `https://domain.com${request.nextUrl.pathname}${request.nextUrl.search}`)
    const { searchParams } = url
    const limitCount = parseInt(searchParams.get('limit') || '10')
    
    const activitiesCollection = adminDb.collection('activities')
    const snapshot = await activitiesCollection.get()
    
    const activities: any[] = []
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      activities.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?._seconds ? data.createdAt._seconds * 1000 : Date.now()
      })
    })
    
    // Manuel olarak sırala ve limit uygula
    const sortedActivities = activities
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limitCount)
    
    return NextResponse.json({
      success: true,
      activities: sortedActivities
    })
  } catch (error: any) {
    console.error('Error getting recent activities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get activities', activities: [] },
      { status: 500 }
    )
  }
}

