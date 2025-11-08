import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url || `https://domain.com${request.nextUrl.pathname}${request.nextUrl.search}`)
    const { searchParams } = url
    const limitCount = parseInt(searchParams.get('limit') || '10')
    
    const activitiesCollection = collection(db, 'activities')
    const snapshot = await getDocs(activitiesCollection)
    
    const activities: any[] = []
    
    if (Array.isArray(snapshot.docs)) {
      snapshot.docs.forEach((doc: any) => {
        const data = doc.data()
        activities.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now()
        })
      })
    }
    
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

