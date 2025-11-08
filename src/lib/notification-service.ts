// Notification service for managing system notifications
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  where,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

export interface Notification {
  id?: string
  title: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  category: 'Blog' | 'SEO' | 'Sistem' | 'Yorum' | 'Güvenlik' | 'Kullanıcı' | 'Genel'
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  actionType?: string
  createdAt: Timestamp
  userId?: string
  metadata?: Record<string, any>
}

// Notification collection
const notificationsCollection = collection(db, 'notifications')

// Create new notification
export async function createNotification(notificationData: Omit<Notification, 'id' | 'createdAt'>): Promise<string> {
  try {
    const notificationWithTimestamp = {
      ...notificationData,
      createdAt: Timestamp.now()
    }
    
    const docRef = await addDoc(notificationsCollection, notificationWithTimestamp)
    return docRef.id
  } catch (error) {
    throw new Error(`Bildirim oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Get notifications
export async function getNotifications(limitCount: number = 50): Promise<Notification[]> {
  try {
    const q = query(
      notificationsCollection,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    
    const snapshot = await getDocs(q)
    const notifications: Notification[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      notifications.push({
        id: doc.id,
        ...doc.data()
      } as Notification)
    }
    
    return notifications
  } catch (error) {
    console.error('Bildirimler getirilemedi:', error)
    return []
  }
}

// Get unread notifications count
export async function getUnreadNotificationsCount(): Promise<number> {
  try {
    const q = query(
      notificationsCollection,
      where('isRead', '==', false)
    )
    
    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error('Okunmamış bildirim sayısı getirilemedi:', error)
    return 0
  }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  try {
    const notificationRef = doc(notificationsCollection, notificationId)
    await updateDoc(notificationRef, {
      isRead: true
    })
  } catch (error) {
    throw new Error(`Bildirim okundu olarak işaretlenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    const q = query(notificationsCollection, where('isRead', '==', false))
    const snapshot = await getDocs(q)
    
    const updatePromises = snapshot.docs.map(doc => 
      updateDoc(doc.ref, { isRead: true })
    )
    
    await Promise.all(updatePromises)
  } catch (error) {
    throw new Error(`Tüm bildirimler okundu olarak işaretlenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Delete notification
export async function deleteNotification(notificationId: string): Promise<void> {
  try {
    const notificationRef = doc(notificationsCollection, notificationId)
    await deleteDoc(notificationRef)
  } catch (error) {
    throw new Error(`Bildirim silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Delete all notifications
export async function deleteAllNotifications(): Promise<void> {
  try {
    const snapshot = await getDocs(notificationsCollection)
    
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
  } catch (error) {
    throw new Error(`Tüm bildirimler silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Filter notifications by type
export async function getNotificationsByType(type: Notification['type']): Promise<Notification[]> {
  try {
    const q = query(
      notificationsCollection,
      where('type', '==', type),
      orderBy('createdAt', 'desc')
    )
    
    const snapshot = await getDocs(q)
    const notifications: Notification[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      notifications.push({
        id: doc.id,
        ...doc.data()
      } as Notification)
    }
    
    return notifications
  } catch (error) {
    console.error('Türe göre bildirimler getirilemedi:', error)
    return []
  }
}

// Filter notifications by category
export async function getNotificationsByCategory(category: Notification['category']): Promise<Notification[]> {
  try {
    const q = query(
      notificationsCollection,
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    )
    
    const snapshot = await getDocs(q)
    const notifications: Notification[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      notifications.push({
        id: doc.id,
        ...doc.data()
      } as Notification)
    }
    
    return notifications
  } catch (error) {
    console.error('Kategoriye göre bildirimler getirilemedi:', error)
    return []
  }
}

