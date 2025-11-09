// Activity service for tracking user activities
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  where,
  Timestamp,
  doc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore'
import { db } from './firebase'

export interface Activity {
  id?: string
  type: 'blog_created' | 'blog_updated' | 'blog_published' | 'blog_deleted' | 'category_created' | 'comment_added' | 'user_login' | 'seo_optimized' | 'blog_liked' | 'comment_liked' | 'project_created' | 'project_updated' | 'project_deleted' | 'project_liked'
  title: string
  description: string
  userId: string
  userName: string
  targetId?: string // blog id, category id, project id, etc.
  metadata?: Record<string, any>
  createdAt: Timestamp
  isRead?: boolean // Okunma durumu
}

// Activity collection
const getActivitiesCollection = () => {
  return collection(db, 'activities');
}

// Create new activity
export async function createActivity(activityData: Omit<Activity, 'id' | 'createdAt'>): Promise<string> {
  try {
    const activitiesCollection = getActivitiesCollection();
    const activityWithTimestamp = {
      ...activityData,
      createdAt: Timestamp.now(),
      isRead: false // Yeni aktiviteler okunmamış olarak başlar
    }
    
    const docRef = await addDoc(activitiesCollection, activityWithTimestamp)
    return docRef.id
  } catch (error) {
    throw new Error(`Activity oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Get recent activities
export async function getRecentActivities(limitCount: number = 10): Promise<Activity[]> {
  try {
    const activitiesCollection = getActivitiesCollection();
    const q = query(
      activitiesCollection,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    
    const snapshot = await getDocs(q)
    const activities: Activity[] = []
    
    snapshot.forEach(doc => {
      activities.push({
        id: doc.id,
        ...doc.data()
      } as Activity)
    })
    
    return activities
  } catch (error) {
    console.error('Aktiviteler getirilemedi:', error)
    return []
  }
}

// Get unread activities count
export async function getUnreadActivitiesCount(): Promise<number> {
  try {
    const activitiesCollection = getActivitiesCollection();
    const q = query(
      activitiesCollection,
      where('isRead', '==', false)
    )
    
    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error('Okunmamış aktivite sayısı getirilemedi:', error)
    return 0
  }
}

// Mark activity as read
export async function markActivityAsRead(activityId: string): Promise<void> {
  try {
    const activityRef = doc(db, 'activities', activityId)
    const { updateDoc } = await import('firebase/firestore')
    await updateDoc(activityRef, { isRead: true })
  } catch (error) {
    console.error('Aktivite okundu olarak işaretlenemedi:', error)
  }
}

// Mark activity as unread
export async function markActivityAsUnread(activityId: string): Promise<void> {
  try {
    const activityRef = doc(db, 'activities', activityId)
    const { updateDoc } = await import('firebase/firestore')
    await updateDoc(activityRef, { isRead: false })
  } catch (error) {
    console.error('Aktivite okunmamış olarak işaretlenemedi:', error)
  }
}

// Toggle activity read status
export async function toggleActivityReadStatus(activityId: string, currentStatus: boolean): Promise<boolean> {
  try {
    if (currentStatus) {
      await markActivityAsUnread(activityId)
      return false
    } else {
      await markActivityAsRead(activityId)
      return true
    }
  } catch (error) {
    console.error('Aktivite okunma durumu değiştirilemedi:', error)
    return currentStatus
  }
}

// Mark all activities as read
export async function markAllActivitiesAsRead(): Promise<void> {
  try {
    const activitiesCollection = getActivitiesCollection();
    const q = query(
      activitiesCollection,
      where('isRead', '==', false)
    )
    
    const snapshot = await getDocs(q)
    const { updateDoc } = await import('firebase/firestore')
    
    const updatePromises = snapshot.docs.map(docSnapshot => 
      updateDoc(doc(db, 'activities', docSnapshot.id), { isRead: true })
    )
    
    await Promise.all(updatePromises)
  } catch (error) {
    console.error('Tüm aktiviteler okundu olarak işaretlenemedi:', error)
  }
}

// Delete single activity
export async function deleteActivity(activityId: string): Promise<void> {
  try {
    const activityRef = doc(db, 'activities', activityId)
    await deleteDoc(activityRef)
  } catch (error) {
    console.error('❌ Aktivite silinemedi:', error)
    throw new Error(`Aktivite silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Delete multiple activities
export async function deleteActivities(activityIds: string[]): Promise<void> {
  try {
    if (activityIds.length === 0) return
    
    const batch = writeBatch(db)
    
    activityIds.forEach(activityId => {
      const activityRef = doc(db, 'activities', activityId)
      batch.delete(activityRef)
    })
    
    await batch.commit()
  } catch (error) {
    console.error('❌ Aktiviteler silinemedi:', error)
    throw new Error(`Aktiviteler silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Delete all activities
export async function deleteAllActivities(): Promise<void> {
  try {
    const activitiesCollection = getActivitiesCollection();
    const snapshot = await getDocs(activitiesCollection)
    const batch = writeBatch(db)
    
    snapshot.docs.forEach(docSnapshot => {
      batch.delete(docSnapshot.ref)
    })
    
    await batch.commit()
  } catch (error) {
    console.error('Tüm aktiviteler silinemedi:', error)
    throw new Error(`Tüm aktiviteler silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}


// Helper function to create activity for blog operations
export async function logBlogActivity(
  type: Activity['type'],
  title: string,
  description: string,
  userId: string,
  userName: string,
  targetId?: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    await createActivity({
      type,
      title,
      description,
      userId,
      userName,
      targetId,
      metadata
    })
  } catch (error) {
    // Log activity creation errors silently to not break main operations
    console.warn('Activity logging failed:', error)
  }
}

// Get activity type display info
export function getActivityDisplayInfo(type: Activity['type']) {
  const activityInfo = {
    blog_created: {
      icon: '📝',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    blog_updated: {
      icon: '✏️',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    blog_published: {
      icon: '🚀',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    blog_deleted: {
      icon: '🗑️',
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    category_created: {
      icon: '📁',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    comment_added: {
      icon: '💬',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/20'
    },
    user_login: {
      icon: '🔐',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
    },
    seo_optimized: {
      icon: '🔍',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    blog_liked: {
      icon: '❤️',
      color: 'text-pink-500',
      bgColor: 'bg-pink-100 dark:bg-pink-900/20'
    },
    comment_liked: {
      icon: '👍',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20'
    },
    project_created: {
      icon: '🚀',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    project_updated: {
      icon: '✏️',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    project_deleted: {
      icon: '🗑️',
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    project_liked: {
      icon: '❤️',
      color: 'text-pink-500',
      bgColor: 'bg-pink-100 dark:bg-pink-900/20'
    }
  }
  
  return activityInfo[type] || {
    icon: '📋',
    color: 'text-gray-500',
    bgColor: 'bg-gray-100 dark:bg-gray-900/20'
  }
}

// Proje aktiviteleri için yardımcı fonksiyonlar
export async function logProjectActivity(projectId: string, action: 'created' | 'updated' | 'deleted', metadata: { title: string, status: string }): Promise<void> {
  try {
    const activityData = {
      type: `project_${action}` as Activity['type'],
      title: `Proje ${action === 'created' ? 'oluşturuldu' : action === 'updated' ? 'güncellendi' : 'silindi'}`,
      description: `"${metadata.title}" projesi ${action === 'created' ? 'oluşturuldu' : action === 'updated' ? 'güncellendi' : 'silindi'}`,
      userId: 'system', // Gerçek uygulamada current user ID olmalı
      userName: 'System',
      targetId: projectId,
      metadata: {
        projectTitle: metadata.title,
        projectStatus: metadata.status,
        action
      }
    }

    await createActivity(activityData)
  } catch (error) {
    console.error('Error logging project activity:', error)
  }
}
