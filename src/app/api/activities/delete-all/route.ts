import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const dynamic = 'force-dynamic'

export async function DELETE(request: NextRequest) {
  try {
    const activitiesCollection = collection(db, 'activities')
    const snapshot = await getDocs(activitiesCollection)
    const batch = writeBatch(db)
    
    if (Array.isArray(snapshot.docs)) {
      snapshot.docs.forEach((docSnapshot: any) => {
        batch.delete(docSnapshot.ref)
      })
    }
    
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

