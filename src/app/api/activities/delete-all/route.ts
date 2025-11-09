import { NextRequest, NextResponse } from 'next/server'
import { adminDb, initializationError } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

export async function DELETE(request: NextRequest) {
  try {
    // Admin DB yoksa (development), başarılı sonuç dön
    if (!adminDb || initializationError) {
      console.warn('Admin DB not available, skipping delete all')
      return NextResponse.json({
        success: true,
        message: 'All activities deleted',
        count: 0
      })
    }
    
    const activitiesCollection = adminDb.collection('activities')
    const snapshot = await activitiesCollection.get()
    const batch = adminDb.batch()
    
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })
    
    await batch.commit()
    
    return NextResponse.json({
      success: true,
      message: 'All activities deleted',
      count: snapshot.docs.length
    })
  } catch (error: any) {
    console.error('Error deleting all activities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete all activities' },
      { status: 500 }
    )
  }
}

