// Simple activity logger for testing
import { 
  collection, 
  addDoc, 
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

export interface SimpleActivity {
  id?: string
  type: string
  title: string
  description: string
  userId: string
  userName: string
  targetId?: string
  metadata?: Record<string, any>
  createdAt: Timestamp
  isRead?: boolean // Okunma durumu
}

const activitiesCollection = collection(db, 'activities')

// Simple activity creation
export async function createSimpleActivity(activityData: Omit<SimpleActivity, 'id' | 'createdAt'>): Promise<string> {
  console.log('📝 createSimpleActivity called with:', activityData)
  try {
    // undefined değerleri temizle
    const cleanMetadata = activityData.metadata ? 
      Object.fromEntries(
        Object.entries(activityData.metadata).filter(([_, value]) => value !== undefined)
      ) : {}
    
    const activityWithTimestamp = {
      ...activityData,
      metadata: cleanMetadata,
      createdAt: Timestamp.now(),
      isRead: false // Yeni aktiviteler okunmamış olarak başlar
    }
    
    console.log('📝 Adding to Firestore with data:', activityWithTimestamp)
    const docRef = await addDoc(activitiesCollection, activityWithTimestamp)
    console.log('📝 Activity added to Firestore with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('📝 Activity creation failed:', error)
    throw new Error(`Activity oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Log blog like activity
export async function logBlogLikeActivity(blogTitle: string, blogId: string): Promise<void> {
  try {
    const userId = typeof window !== 'undefined' 
      ? localStorage.getItem('userId') || 'anonymous'
      : 'anonymous'
    const userName = typeof window !== 'undefined' 
      ? localStorage.getItem('userName') || 'Ziyaretçi'
      : 'Ziyaretçi'
    const userRole = typeof window !== 'undefined' 
      ? localStorage.getItem('userRole') || 'viewer'
      : 'viewer'
    
    const roleText = userRole === 'admin' ? 'Admin' : userRole === 'editor' ? 'Editör' : userRole === 'author' ? 'Yazar' : 'Kullanıcı'
    
    // Blog slug'ını al
    let blogSlug = blogId
    try {
      const { getBlog } = await import('./blog-service')
      const blog = await getBlog(blogId)
      if (blog && blog.slug) {
        blogSlug = blog.slug
      }
    } catch (error) {
      console.error('Blog slug alınamadı:', error)
    }
    
    await createSimpleActivity({
      type: 'blog_liked',
      title: 'Blog yazısı beğenildi',
      description: `"${blogTitle}" sayfası beğenildi`,
      userId,
      userName,
      targetId: blogId,
      metadata: { 
        blogTitle, 
        blogId,
        blogSlug: blogSlug,
        userRole,
        actionType: 'blog_like',
        targetUrl: `/blog/${blogSlug}`
      }
    })
  } catch (error) {
    console.error('Failed to log blog like activity:', error)
  }
}

// Log comment like activity
export async function logCommentLikeActivity(commentAuthor: string, commentId: string, blogId?: string, commentContent?: string, isReply?: boolean, parentCommentId?: string): Promise<void> {
  console.log('🚀 logCommentLikeActivity called with:', { commentAuthor, commentId, blogId, commentContent, isReply, parentCommentId })
  try {
    const userId = typeof window !== 'undefined' 
      ? localStorage.getItem('userId') || 'anonymous'
      : 'anonymous'
    const userName = typeof window !== 'undefined' 
      ? localStorage.getItem('userName') || 'Ziyaretçi'
      : 'Ziyaretçi'
    const userRole = typeof window !== 'undefined' 
      ? localStorage.getItem('userRole') || 'viewer'
      : 'viewer'
    
    console.log('🚀 User info:', { userId, userName, userRole })
    
    const roleText = userRole === 'admin' ? 'Admin' : userRole === 'editor' ? 'Editör' : userRole === 'author' ? 'Yazar' : 'Kullanıcı'
    const shortComment = commentContent ? (commentContent.length > 50 ? commentContent.substring(0, 50) + '...' : commentContent) : 'yorum'
    
    // Navigasyon URL'sini belirle - Blog slug'ını al
    let targetUrl: string | undefined
    if (blogId) {
      try {
        // getBlog fonksiyonunu import et
        const { getBlog } = await import('./blog-service')
        const blog = await getBlog(blogId)
        if (blog && blog.slug) {
          targetUrl = `/blog/${blog.slug}#comment-${commentId}`
        } else {
          // Fallback olarak blog ID kullan
          targetUrl = `/blog/${blogId}#comment-${commentId}`
        }
      } catch (error) {
        console.error('Blog slug alınamadı:', error)
        // Fallback URL
        targetUrl = `/blog/${blogId}#comment-${commentId}`
      }
    }
    
    // Blog bilgilerini al
    let blogTitle = 'Bilinmeyen Blog'
    let blogSlug = blogId || 'unknown'
    if (blogId) {
      try {
        const { getBlog } = await import('./blog-service')
        const blog = await getBlog(blogId)
        if (blog) {
          blogTitle = blog.title || 'Bilinmeyen Blog'
          blogSlug = blog.slug || blogId
        }
      } catch (error) {
        console.error('Blog bilgileri alınamadı:', error)
      }
    }

    // Aktivite açıklamasını oluştur - daha kısa ve temiz
    let description = ''
    if (isReply && parentCommentId) {
      description = `"${blogTitle}" sayfasında yorum cevabı beğenildi`
    } else {
      description = `"${blogTitle}" sayfasında yorum beğenildi`
    }

    const activityData = {
      type: 'comment_liked',
      title: 'Yorum beğenildi',
      description: description,
      userId,
      userName,
      targetId: commentId,
      metadata: { 
        commentAuthor, 
        commentId, 
        blogId: blogId || null,
        blogTitle: blogTitle,
        blogSlug: blogSlug,
        commentContent: commentContent || null,
        userRole,
        actionType: 'comment_like',
        isReply: isReply || false,
        parentCommentId: parentCommentId || null,
        targetUrl: targetUrl || null
      }
    }
    
    console.log('🚀 Creating activity with data:', activityData)
    
    await createSimpleActivity(activityData)
    console.log('🚀 Activity created successfully!')
  } catch (error) {
    console.error('🚀 Failed to log comment like activity:', error)
  }
}

// Mark activity as read
export async function markSimpleActivityAsRead(activityId: string): Promise<void> {
  try {
    const { doc, updateDoc } = await import('firebase/firestore')
    const activityRef = doc(db, 'activities', activityId)
    await updateDoc(activityRef, { isRead: true })
  } catch (error) {
    console.error('Simple activity okundu olarak işaretlenemedi:', error)
  }
}

// Mark all activities as read
export async function markAllSimpleActivitiesAsRead(): Promise<void> {
  try {
    const q = query(
      activitiesCollection,
      where('isRead', '==', false)
    )
    
    const snapshot = await getDocs(q)
    const { doc, updateDoc } = await import('firebase/firestore')
    
    const updatePromises = snapshot.docs.map(docSnapshot => 
      updateDoc(doc(db, 'activities', docSnapshot.id), { isRead: true })
    )
    
    await Promise.all(updatePromises)
  } catch (error) {
    console.error('Tüm simple aktiviteler okundu olarak işaretlenemedi:', error)
  }
}

// Get unread activities count
export async function getUnreadSimpleActivitiesCount(): Promise<number> {
  try {
    const q = query(
      activitiesCollection,
      where('isRead', '==', false)
    )
    
    const snapshot = await getDocs(q)
    return snapshot.size
  } catch (error) {
    console.error('Okunmamış simple aktivite sayısı getirilemedi:', error)
    return 0
  }
}
