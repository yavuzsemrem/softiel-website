import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const activitiesCollection = collection(db, 'activities')
    const snapshot = await getDocs(activitiesCollection)
    
    // Manuel olarak okunmamışları filtrele ve güncelle
    const updatePromises: Promise<void>[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const docSnapshot of docs) {
      const data = docSnapshot.data()
      if (data && data.isRead === false) {
        updatePromises.push(
          updateDoc(doc(db, 'activities', docSnapshot.id), { isRead: true })
        )
      }
    }
    
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

