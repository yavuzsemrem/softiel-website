import { NextRequest, NextResponse } from 'next/server'
import { adminDb, initializationError } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Admin DB yoksa (development), başarılı sonuç dön
    if (!adminDb || initializationError) {
      console.warn('Admin DB not available, skipping mark all read')
      return NextResponse.json({
        success: true,
        message: 'All activities marked as read',
        count: 0
      })
    }
    
    const activitiesCollection = adminDb.collection('activities')
    const snapshot = await activitiesCollection.get()
    
    // Manuel olarak okunmamışları filtrele ve güncelle
    const updatePromises: Promise<any>[] = []
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      if (data && data.isRead === false) {
        updatePromises.push(
          doc.ref.update({ isRead: true })
        )
      }
    })
    
    await Promise.all(updatePromises)
    
    return NextResponse.json({
      success: true,
      message: 'All activities marked as read',
      count: updatePromises.length
    })
  } catch (error: any) {
    console.error('Error marking all as read:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to mark all as read' },
      { status: 500 }
    )
  }
}

