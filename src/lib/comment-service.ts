// Firestore comment service
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  doc,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { createSimpleActivity } from './simple-activity-logger'
import { getBlog } from './blog-service'

export interface Comment {
  id?: string
  blogId: string
  authorName: string
  authorEmail: string
  content: string
  isApproved: boolean
  isRejected?: boolean
  isReply: boolean
  parentCommentId?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  likes?: number
  likedBy?: string[]
  replies?: Comment[]
}

export interface AdminReply {
  id?: string
  commentId: string // Hangi yoruma cevap verildiği
  blogId: string
  content: string
  createdAt: Timestamp
  updatedAt: Timestamp
  isApproved?: boolean
  parentReplyId?: string // Hangi admin yanıtına cevap verildiği (thread için)
  replyChain: string[] // Yanıt zinciri (thread takibi için)
  threadId: string // Thread ID'si
  subReplies?: AdminReply[] // Recursive alt yanıtlar
}

export interface CommentWithAdminReplies extends Comment {
  adminReplies?: AdminReply[]
}

export interface CommentFilters {
  blogId?: string
  isApproved?: boolean
  isReply?: boolean
  parentCommentId?: string
}

export interface CommentPagination {
  page: number
  limit: number
  lastKey?: string
}

// Comments koleksiyonu
const commentsCollection = collection(db, 'comments')
// Admin replies koleksiyonu
const adminRepliesCollection = collection(db, 'admin_replies')

// Yeni yorum oluştur
export async function createComment(commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    // Admin cevapları artık ayrı collection'da tutulacak
    if (commentData.authorEmail === 'admin@softiel.com') {
      throw new Error('Admin cevapları createAdminReply fonksiyonu ile oluşturulmalıdır')
    }
    
    // Veri doğrulama
    if (!commentData.blogId || !commentData.authorName || !commentData.authorEmail || !commentData.content) {
      throw new Error('Eksik veri: blogId, authorName, authorEmail ve content gerekli')
    }
    
    const commentDataWithTimestamps = {
      ...commentData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isApproved: commentData.isApproved !== undefined ? commentData.isApproved : false,
      isReply: commentData.isReply !== undefined ? commentData.isReply : false,
      likes: commentData.likes || 0,
      likedBy: commentData.likedBy || []
    }
    
    const docRef = await addDoc(commentsCollection, commentDataWithTimestamps)
    const commentId = docRef.id
    
    // Aktivite kaydet - KESIN ÇÖZÜM
    try {
      console.log('🚀 Creating comment activity for:', commentData.authorName)
      
      const shortContent = commentData.content.length > 50 ? commentData.content.substring(0, 50) + '...' : commentData.content
      const isReply = commentData.isReply ? 'cevap verildi' : 'yorum yapıldı'
      
      // Blog slug'ını al ve doğru URL oluştur
      let targetUrl = ''
      try {
        const blog = await getBlog(commentData.blogId)
        if (blog && blog.slug) {
          // Hem ana yorumlar hem de cevaplar için blog detay sayfasına yönlendir
          targetUrl = `/tr/blog/${blog.slug}#comment-${commentId}`
        } else {
          // Fallback olarak blog ID kullan
          targetUrl = `/tr/blog/${commentData.blogId}#comment-${commentId}`
        }
      } catch (error) {
        console.error('Blog slug alınamadı:', error)
        // Fallback URL - hem ana yorumlar hem de cevaplar için blog detay sayfasına yönlendir
        targetUrl = `/tr/blog/${commentData.blogId}#comment-${commentId}`
      }

      // Blog bilgilerini al
      let blogTitle = 'Bilinmeyen Blog'
      let blogSlug = commentData.blogId
      try {
        const blog = await getBlog(commentData.blogId)
        if (blog) {
          blogTitle = blog.title || 'Bilinmeyen Blog'
          blogSlug = blog.slug || commentData.blogId
        }
      } catch (error) {
        console.error('Blog bilgileri alınamadı:', error)
      }

      // Aktivite açıklamasını oluştur - daha kısa ve temiz
      let description = ''
      if (commentData.isReply && commentData.parentCommentId) {
        // Cevap yorumu için
        description = `"${blogTitle}" sayfasında yoruma cevap verildi`
      } else {
        // Ana yorum için
        description = `"${blogTitle}" sayfasına yorum yapıldı`
      }

      const activityData = {
        type: 'comment_added',
        title: 'Yeni yorum eklendi',
        description: description,
        userId: commentData.authorEmail,
        userName: commentData.authorName,
        targetId: commentId,
        metadata: { 
          blogId: commentData.blogId,
          blogTitle: blogTitle,
          blogSlug: blogSlug,
          commentContent: commentData.content,
          commentAuthor: commentData.authorName,
          isReply: commentData.isReply || false,
          parentCommentId: commentData.parentCommentId || null,
          isApproved: commentData.isApproved || false,
          actionType: 'comment_add',
          targetUrl: targetUrl
        }
      }
      
      console.log('🚀 Activity data:', activityData)
      
      const activityId = await createSimpleActivity(activityData)
      console.log('🚀 Activity created with ID:', activityId)
      
    } catch (activityError) {
      console.error('🚀 Activity logging failed:', activityError)
      // Aktivite kaydetme hatası yorum oluşturmayı engellemez
    }
    
    return commentId
  } catch (error) {
    throw new Error(`Yorum oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Admin cevabı oluştur - YENİ THREAD YAKLAŞIMI
export async function createAdminReply(replyData: Omit<AdminReply, 'id' | 'createdAt' | 'updatedAt' | 'isApproved'>): Promise<string> {
  try {
    
    // Thread ID oluştur (ana yorum ID'si + blog ID'si)
    const threadId = `${replyData.commentId}_${replyData.blogId}`
    
    // Reply chain oluştur
    let replyChain: string[] = []
    if (replyData.parentReplyId) {
      // Eğer bir admin yanıtına cevap veriliyorsa, o yanıtın chain'ini al
      const parentReply = await getAdminReplyById(replyData.parentReplyId)
      if (parentReply) {
        replyChain = [...parentReply.replyChain, replyData.parentReplyId]
      }
    }
    
    const adminReplyData = {
      blogId: replyData.blogId,
      authorName: 'Admin',
      authorEmail: 'admin@softiel.com',
      content: replyData.content,
      parentCommentId: replyData.commentId,
      parentReplyId: replyData.parentReplyId || null,
      threadId: threadId,
      replyChain: replyChain,
      isReply: true,
      isApproved: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      likes: 0,
      likedBy: []
    }
    
    const docRef = await addDoc(commentsCollection, adminReplyData)
    const replyId = docRef.id
    
    // Aktivite kaydet - Admin cevabı için
    try {
      console.log('🚀 Creating admin reply activity for:', adminReplyData.authorName)
      
      const shortContent = adminReplyData.content.length > 50 ? adminReplyData.content.substring(0, 50) + '...' : adminReplyData.content
      
      // Blog slug'ını al ve doğru URL oluştur
      let targetUrl = ''
      try {
        const blog = await getBlog(adminReplyData.blogId)
        if (blog && blog.slug) {
          targetUrl = `/tr/blog/${blog.slug}#comment-${replyId}`
        } else {
          targetUrl = `/tr/blog/${adminReplyData.blogId}#comment-${replyId}`
        }
      } catch (error) {
        console.error('Blog slug alınamadı:', error)
        targetUrl = `/tr/blog/${adminReplyData.blogId}#comment-${replyId}`
      }

      // Blog bilgilerini al
      let blogTitle = 'Bilinmeyen Blog'
      let blogSlug = adminReplyData.blogId
      try {
        const blog = await getBlog(adminReplyData.blogId)
        if (blog) {
          blogTitle = blog.title || 'Bilinmeyen Blog'
          blogSlug = blog.slug || adminReplyData.blogId
        }
      } catch (error) {
        console.error('Blog bilgileri alınamadı:', error)
      }

      const activityData = {
        type: 'comment_added',
        title: 'Admin cevabı eklendi',
        description: `"${blogTitle}" sayfasında yoruma admin cevabı verildi`,
        userId: adminReplyData.authorEmail,
        userName: adminReplyData.authorName,
        targetId: replyId,
        metadata: { 
          blogId: adminReplyData.blogId,
          blogTitle: blogTitle,
          blogSlug: blogSlug,
          commentContent: adminReplyData.content,
          commentAuthor: adminReplyData.authorName,
          isReply: true,
          parentCommentId: adminReplyData.parentCommentId,
          isApproved: true, // Admin cevapları otomatik onaylı
          actionType: 'admin_reply_add',
          targetUrl: targetUrl
        }
      }
      
      console.log('🚀 Admin reply activity data:', activityData)
      
      const activityId = await createSimpleActivity(activityData)
      console.log('🚀 Admin reply activity created with ID:', activityId)
      
    } catch (activityError) {
      console.error('🚀 Admin reply activity logging failed:', activityError)
      // Aktivite kaydetme hatası admin cevabı oluşturmayı engellemez
    }
    
    return replyId
  } catch (error) {
    throw new Error(`Admin cevabı oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Admin cevabını ID ile getir
export async function getAdminReplyById(replyId: string): Promise<AdminReply | null> {
  try {
    
    const replyRef = doc(commentsCollection, replyId)
    const replySnap = await getDoc(replyRef)
    
    if (!replySnap.exists()) {
      return null
    }
    
    const data = replySnap.data()
    const adminReply: AdminReply = {
      id: replySnap.id,
      commentId: data.commentId || '',
      blogId: data.blogId || '',
      content: data.content || '',
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      isApproved: data.isApproved !== undefined ? data.isApproved : true,
      parentReplyId: data.parentReplyId,
      replyChain: data.replyChain || [],
      threadId: data.threadId || ''
    }
    
    return adminReply
  } catch (error) {
    return null
  }
}

// Admin cevabını güncelle
export async function updateAdminReply(id: string, replyData: Partial<Omit<AdminReply, 'id' | 'createdAt' | 'commentId' | 'blogId'>>): Promise<void> {
  try {
    
    // Geçici olarak comments collection'ında güncelle
    const replyRef = doc(commentsCollection, id)
    await updateDoc(replyRef, {
      content: replyData.content,
      updatedAt: Timestamp.now()
    })
    
  } catch (error) {
    throw new Error(`Admin cevabı güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Admin cevabını sil
export async function deleteAdminReply(id: string): Promise<void> {
  try {
    
    // Geçici olarak comments collection'ından sil
    const replyRef = doc(commentsCollection, id)
    await deleteDoc(replyRef)
    
  } catch (error) {
    throw new Error(`Admin cevabı silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// TÜM YANITLARI RECURSIVE OLARAK GETİR (TÜM SENARYOLAR DESTEKLENİR)
async function getAllRepliesRecursively(parentId: string, level: number = 0): Promise<Comment[]> {
  
  // Bu parent'a direkt verilen yanıtları getir (TÜM TÜRLER)
  const directRepliesQuery = query(
    commentsCollection,
    where('parentCommentId', '==', parentId)
  )
  
  const directRepliesSnapshot = await getDocs(directRepliesQuery)
  const directReplies: Comment[] = []
  
  directRepliesSnapshot.forEach(doc => {
    const data = doc.data()
    const reply: Comment = {
      id: doc.id,
      blogId: data.blogId || '',
      authorName: data.authorName || '',
      authorEmail: data.authorEmail || '',
      content: data.content || '',
      isApproved: data.isApproved !== undefined ? data.isApproved : false,
      isRejected: data.isRejected === true,
      isReply: data.isReply !== undefined ? data.isReply : false,
      parentCommentId: data.parentCommentId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      likes: data.likes || 0,
      likedBy: data.likedBy || []
    }
    
    // Yorum türünü belirle
    const commentType = getCommentType(reply, parentId)
    
    directReplies.push(reply)
  })
  
  
  // Her direkt yanıt için recursive olarak alt yanıtları getir
  const allReplies: Comment[] = []
  
  for (const reply of directReplies) {
    // Sadece onaylanmış yanıtları işle
    if (reply.isApproved) {
      // Bu yanıtı ekle (level bilgisi ile)
      const replyWithLevel = {
        ...reply,
        level: level,
        isFlattened: true,
        commentType: getCommentType(reply, parentId) // Yorum türü bilgisi ekle
      }
      allReplies.push(replyWithLevel)
      
      // Bu yanıtın alt yanıtlarını recursive olarak getir
      const subReplies = await getAllRepliesRecursively(reply.id!, level + 1)
      allReplies.push(...subReplies)
    }
  }
  
  return allReplies
}

// Dashboard için TÜM YANITLARI RECURSIVE OLARAK GETİR (onay durumu fark etmez)
async function getAllRepliesRecursivelyForDashboard(parentId: string, level: number = 0): Promise<Comment[]> {
  
  // Bu parent'a direkt verilen yanıtları getir (TÜM TÜRLER)
  const directRepliesQuery = query(
    commentsCollection,
    where('parentCommentId', '==', parentId)
  )
  
  const directRepliesSnapshot = await getDocs(directRepliesQuery)
  const directReplies: Comment[] = []
  
  directRepliesSnapshot.forEach(doc => {
    const data = doc.data()
    const reply: Comment = {
      id: doc.id,
      blogId: data.blogId || '',
      authorName: data.authorName || '',
      authorEmail: data.authorEmail || '',
      content: data.content || '',
      isApproved: data.isApproved !== undefined ? data.isApproved : false,
      isRejected: data.isRejected === true,
      isReply: data.isReply !== undefined ? data.isReply : false,
      parentCommentId: data.parentCommentId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      likes: data.likes || 0,
      likedBy: data.likedBy || []
    }
    
    // Yorum türünü belirle
    const commentType = getCommentType(reply, parentId)
    
    directReplies.push(reply)
  })
  
  
  // Her direkt yanıt için recursive olarak alt yanıtları getir
  const allReplies: Comment[] = []
  
  for (const reply of directReplies) {
    // Bu yanıtı ekle (level bilgisi ile) - onay durumu fark etmez
    const replyWithLevel = {
      ...reply,
      level: level,
      isFlattened: true,
      commentType: getCommentType(reply, parentId) // Yorum türü bilgisi ekle
    }
    allReplies.push(replyWithLevel)
    
    // Bu yanıtın alt yanıtlarını recursive olarak getir
    const subReplies = await getAllRepliesRecursivelyForDashboard(reply.id!, level + 1)
    allReplies.push(...subReplies)
  }
  
  return allReplies
}

// Yorum türünü belirle
function getCommentType(reply: Comment, parentId: string): string {
  const isAdmin = reply.authorEmail === 'admin@softiel.com'
  const isMainComment = parentId === reply.parentCommentId
  
  if (isMainComment) {
    return isAdmin ? 'Admin → Ana Yorum' : 'Kullanıcı → Ana Yorum'
  } else {
    // Alt yorumlar için parent'ın türünü kontrol et
    return isAdmin ? 'Admin → Alt Yorum' : 'Kullanıcı → Alt Yorum'
  }
}

// Yanıt seviyelerini analiz et
function analyzeReplyLevels(replies: Comment[]): Record<number, number> {
  const levelCounts: Record<number, number> = {}
  
  replies.forEach(reply => {
    const level = (reply as any).level || 0
    levelCounts[level] = (levelCounts[level] || 0) + 1
  })
  
  return levelCounts
}

// Yanıt yazarlarını analiz et
function analyzeReplyAuthors(replies: Comment[]): Record<string, number> {
  const authorCounts: Record<string, number> = {}
  
  replies.forEach(reply => {
    const author = reply.authorEmail === 'admin@softiel.com' ? 'Admin' : 'Kullanıcı'
    authorCounts[author] = (authorCounts[author] || 0) + 1
  })
  
  return authorCounts
}

// Normal yanıtlara verilen admin yanıtlarını getir
async function getAdminRepliesForNormalReplies(normalReplies: Comment[]): Promise<Comment[]> {
  const allAdminReplies: Comment[] = []
  
  for (const reply of normalReplies) {
    const adminRepliesQuery = query(
      commentsCollection,
      where('parentCommentId', '==', reply.id)
    )
    
    const adminRepliesSnapshot = await getDocs(adminRepliesQuery)
    
    adminRepliesSnapshot.forEach(doc => {
      const data = doc.data()
      if (data.authorEmail === 'admin@softiel.com') {
        allAdminReplies.push({
          id: doc.id,
          blogId: data.blogId || '',
          authorName: data.authorName || '',
          authorEmail: data.authorEmail || '',
          content: data.content || '',
          isApproved: data.isApproved !== undefined ? data.isApproved : false,
          isReply: data.isReply !== undefined ? data.isReply : false,
          parentCommentId: data.parentCommentId,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          likes: data.likes || 0,
          likedBy: data.likedBy || []
        })
      }
    })
  }
  
  return allAdminReplies
}

// Belirli bir yoruma ait admin cevaplarını getir
export async function getAdminRepliesForComment(commentId: string): Promise<AdminReply[]> {
  try {
    
    // Tüm yanıtları getir (parentCommentId ile)
    const allRepliesQuery = query(
      commentsCollection,
      where('parentCommentId', '==', commentId)
    )
    
    const allRepliesSnapshot = await getDocs(allRepliesQuery)
    const allReplies = allRepliesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Comment))
    
    
    // Client-side'da admin yanıtlarını filtrele
    const adminReplies = allReplies
      .filter(reply => reply.authorEmail === 'admin@softiel.com')
      .map(reply => ({
        id: reply.id,
        commentId: commentId,
        blogId: reply.blogId,
        content: reply.content,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt,
        isApproved: reply.isApproved !== undefined ? reply.isApproved : true,
        parentReplyId: (reply as any).parentReplyId,
        replyChain: (reply as any).replyChain || [],
        threadId: (reply as any).threadId || ''
      } as AdminReply))
    
    // Normal yanıtları filtrele
    const normalReplies = allReplies.filter(reply => reply.authorEmail !== 'admin@softiel.com')
    const normalReplyIds = normalReplies.map(reply => reply.id)
    
    
    // Her normal yanıta verilen admin cevaplarını getir
    const allAdminReplies = [...adminReplies]
    
    for (const replyId of normalReplyIds) {
      const replyAdminRepliesQuery = query(
        commentsCollection,
        where('parentCommentId', '==', replyId)
      )
      
      const replyAdminRepliesSnapshot = await getDocs(replyAdminRepliesQuery)
      const replyAdminReplies = replyAdminRepliesSnapshot.docs
        .filter(doc => doc.data().authorEmail === 'admin@softiel.com') // Client-side filtreleme
        .map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            commentId: replyId, // Normal yanıtın ID'si
            blogId: data.blogId,
            content: data.content,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            isApproved: data.isApproved !== undefined ? data.isApproved : true,
            parentReplyId: data.parentReplyId,
            replyChain: data.replyChain || [],
            threadId: data.threadId || ''
          } as AdminReply
        })
      
      allAdminReplies.push(...replyAdminReplies)
    }
    
    // Tarihe göre sırala
    allAdminReplies.sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt as any).toDate().getTime()
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt as any).toDate().getTime()
      return aTime - bTime
    })
    
    
    return allAdminReplies
  } catch (error) {
    throw new Error(`Admin cevapları getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Yorum güncelle
export async function updateComment(id: string, commentData: Partial<Omit<Comment, 'id' | 'createdAt' | 'blogId' | 'authorName' | 'authorEmail'>>): Promise<void> {
  try {
    
    const commentRef = doc(commentsCollection, id)
    
    const updateData = {
      ...commentData,
      updatedAt: Timestamp.now()
    }
    
    await updateDoc(commentRef, updateData)
  } catch (error) {
    throw new Error(`Yorum güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Yorum sil - Recursive olarak alt yorumları da sil
export async function deleteComment(id: string): Promise<void> {
  try {
    
    // Önce bu yoruma ait tüm alt yorumları bul ve sil
    await deleteCommentRecursively(id)
    
    // Son olarak ana yorumu sil
    const commentRef = doc(commentsCollection, id)
    await deleteDoc(commentRef)
  } catch (error) {
    throw new Error(`Yorum silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Recursive yorum silme fonksiyonu
async function deleteCommentRecursively(commentId: string): Promise<void> {
  try {
    
    // Bu yoruma direkt yanıt veren yorumları bul
    const repliesQuery = query(
      commentsCollection,
      where('parentCommentId', '==', commentId)
    )
    
    const repliesSnapshot = await getDocs(repliesQuery)
    const replies = repliesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Comment[]
    
    
    // Her alt yorum için recursive olarak sil
    for (const reply of replies) {
      await deleteCommentRecursively(reply.id!)
    }
    
    // Alt yorumları sil
    for (const reply of replies) {
      const replyRef = doc(commentsCollection, reply.id!)
      await deleteDoc(replyRef)
    }
    
  } catch (error) {
    throw new Error(`Alt yorumlar silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Tek yorum getir
export async function getComment(id: string): Promise<Comment | null> {
  try {
    
    const commentRef = doc(commentsCollection, id)
    const commentSnap = await getDoc(commentRef)
    
    if (commentSnap.exists()) {
      const data = commentSnap.data()
      const comment: Comment = {
        id: commentSnap.id,
        blogId: data.blogId || '',
        authorName: data.authorName || '',
        authorEmail: data.authorEmail || '',
        content: data.content || '',
        isApproved: data.isApproved !== undefined ? data.isApproved : false,
        isRejected: data.isRejected === true,
        isReply: data.isReply !== undefined ? data.isReply : false,
        parentCommentId: data.parentCommentId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        likes: data.likes || 0,
        likedBy: data.likedBy || []
      }
      
      // Direkt yanıtları getir (tüm yanıtlar - admin paneli için)
      const directRepliesQuery = query(
        commentsCollection,
        where('parentCommentId', '==', id)
      )
      
      const directRepliesSnapshot = await getDocs(directRepliesQuery)
      const directReplies = directRepliesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[]
      
      // Client-side'da sırala
      directReplies.sort((a, b) => {
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt as any).toDate().getTime()
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt as any).toDate().getTime()
        return aTime - bTime
      })
      
      // Recursive olarak alt yanıtları getir
      const organizedReplies = await getRepliesRecursively(directReplies)
      
      return {
        ...comment,
        replies: organizedReplies
      }
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Yorum getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Yorumları getir (filtreleme ve sayfalama ile)
export async function getComments(filters: CommentFilters = {}, pagination: CommentPagination = { page: 1, limit: 10 }): Promise<{ comments: Comment[], total: number, hasMore: boolean }> {
  try {
    
    // Basit sorgu - sadece createdAt ile sırala (index gerektirmez)
    let q = query(commentsCollection, orderBy('createdAt', 'desc'), limit(pagination.limit))
    
    const snapshot = await getDocs(q)
    const comments: Comment[] = []
    
    snapshot.forEach(doc => {
      const data = doc.data()
      comments.push({
        id: doc.id,
        blogId: data.blogId || '',
        authorName: data.authorName || '',
        authorEmail: data.authorEmail || '',
        content: data.content || '',
        isApproved: data.isApproved !== undefined ? data.isApproved : false,
        isRejected: data.isRejected === true,
        isReply: data.isReply !== undefined ? data.isReply : false,
        parentCommentId: data.parentCommentId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        likes: data.likes || 0,
        likedBy: data.likedBy || []
      } as Comment)
    })
    
    // Client-side filtreleme (index gerektirmez)
    let filteredComments = comments
    
    if (filters.blogId) {
      filteredComments = filteredComments.filter(comment => comment.blogId === filters.blogId)
    }
    
    if (filters.isApproved !== undefined) {
      filteredComments = filteredComments.filter(comment => comment.isApproved === filters.isApproved)
    }
    
    if (filters.isReply !== undefined) {
      filteredComments = filteredComments.filter(comment => comment.isReply === filters.isReply)
    }
    
    if (filters.parentCommentId) {
      filteredComments = filteredComments.filter(comment => comment.parentCommentId === filters.parentCommentId)
    }
    
    return {
      comments: filteredComments,
      total: filteredComments.length,
      hasMore: false // Basit implementasyon
    }
  } catch (error) {
    throw new Error(`Yorumlar getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Tüm yorumları getir (dashboard için)
export async function getAllComments(): Promise<Comment[]> {
  try {
    
    // Firestore bağlantısını kontrol et
    if (!commentsCollection) {
      throw new Error('Firestore comments collection bulunamadı')
    }
    
    // Tüm yorumları getir (limit yok)
    const q = query(commentsCollection, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const comments: Comment[] = []
    
    snapshot.forEach(doc => {
      try {
        const data = doc.data()
        
        // Veri doğrulama
        if (!data) {
          return
        }
        
        const comment: Comment = {
          id: doc.id,
          blogId: data.blogId || '',
          authorName: data.authorName || '',
          authorEmail: data.authorEmail || '',
          content: data.content || '',
          isApproved: data.isApproved !== undefined ? data.isApproved : false,
          isRejected: data.isRejected === true,
          isReply: data.isReply !== undefined ? data.isReply : false,
          parentCommentId: data.parentCommentId,
          createdAt: data.createdAt || { toDate: () => new Date() },
          updatedAt: data.updatedAt || { toDate: () => new Date() },
          likes: data.likes || 0,
          likedBy: data.likedBy || []
        }
        
        comments.push(comment)
      } catch (docError) {
        // Hatalı dokümanı atla ve devam et
      }
    })
    
    return comments
  } catch (error) {
    throw new Error(`Tüm yorumlar getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Sadece ana yorumları getir (admin panel için) - Website mantığını kullan
export async function getMainComments(): Promise<Comment[]> {
  try {
    
    // Website'deki getBlogComments mantığını kullan
    // Tüm yorumları getir
    const allComments = await getAllComments()
    
    // Website'deki gibi filtreleme - sadece ana yorumlar
    const mainComments = allComments.filter(comment => 
      comment.isApproved && 
      !comment.isReply // Sadece isReply: false olanlar
    )
    
    
    return mainComments
  } catch (error) {
    throw new Error(`Ana yorumlar getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog yorumlarını getir (ana yorumlar + cevaplar) - ID veya slug ile
export async function getBlogComments(identifier: string): Promise<Comment[]> {
  try {
    // Tüm yorumları getir (limit artırıldı)
    const allComments = await getAllComments()
    
    // Eğer identifier bir slug ise, önce blog ID'sini bul
    let actualBlogId = identifier
    
    // Identifier'ın bir slug olup olmadığını kontrol et
    // Eğer ID formatında değilse (Firestore ID'leri genellikle 20+ karakter), slug olarak kabul et
    if (identifier.length < 20) {
      // Slug ile blog ID'sini bul
      const { getBlog } = await import('./blog-service')
      const blog = await getBlog(identifier)
      if (blog && blog.id) {
        actualBlogId = blog.id
      } else {
        // Blog bulunamadı, boş array döndür
        return []
      }
    }
    
    // Client-side filtreleme
    const mainComments = allComments.filter(comment => 
      comment.blogId === actualBlogId && 
      comment.isApproved && 
      !comment.isReply
    )
    
    // Her ana yorum için tüm yanıtları (çok seviyeli) ekle
    const commentsWithReplies: Comment[] = []
    
    for (const comment of mainComments) {
      // Ana yoruma direkt yanıt verilen yorumları bul (sadece birinci seviye)
      const directReplies = allComments.filter(reply => 
        reply.parentCommentId === comment.id && 
        reply.isApproved
      )
      
      // Yanıtları seviyelerine göre düzenle
      const organizedReplies = organizeRepliesForBlog(directReplies, allComments)
      
      commentsWithReplies.push({
        ...comment,
        replies: organizedReplies
      })
    }
    
    // Tarihe göre sırala
    commentsWithReplies.sort((a, b) => {
      const dateA = a.createdAt.toDate ? a.createdAt.toDate() : (a.createdAt as any).toDate()
      const dateB = b.createdAt.toDate ? b.createdAt.toDate() : (b.createdAt as any).toDate()
      return dateB.getTime() - dateA.getTime()
    })
    
    return commentsWithReplies
  } catch (error) {
    throw new Error(`Blog yorumları getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Recursive olarak yanıtları getir
async function getRepliesRecursively(replies: Comment[]): Promise<Comment[]> {
  const result: Comment[] = []
  
  for (const reply of replies) {
    // Bu yanıta direkt yanıt verilen yorumları getir (tüm yanıtlar - admin paneli için)
    const subRepliesQuery = query(
      commentsCollection,
      where('parentCommentId', '==', reply.id)
    )
    
    const subRepliesSnapshot = await getDocs(subRepliesQuery)
    const subReplies = subRepliesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Comment[]
    
    // Client-side'da sırala
    subReplies.sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt as any).toDate().getTime()
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt as any).toDate().getTime()
      return aTime - bTime
    })
    
    // Alt yanıtları da recursive olarak getir
    const organizedSubReplies = subReplies.length > 0 
      ? await getRepliesRecursively(subReplies)
      : []
    
    result.push({
      ...reply,
      replies: organizedSubReplies
    })
  }
  
  return result
}

// Thread-based admin yanıtları getir
export async function getAdminRepliesByThread(threadId: string): Promise<AdminReply[]> {
  try {
    
    const q = query(
      commentsCollection,
      where('threadId', '==', threadId),
      where('authorEmail', '==', 'admin@softiel.com'),
      orderBy('createdAt', 'asc')
    )
    
    const snapshot = await getDocs(q)
    const adminReplies: AdminReply[] = []
    
    snapshot.forEach(doc => {
      const data = doc.data()
      const adminReply: AdminReply = {
        id: doc.id,
        commentId: data.commentId || '',
        blogId: data.blogId || '',
        content: data.content || '',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        isApproved: data.isApproved !== undefined ? data.isApproved : true,
        parentReplyId: data.parentReplyId,
        replyChain: data.replyChain || [],
        threadId: data.threadId || ''
      }
      
      // ID kontrolü
      if (!adminReply.id) {
        return
      }
      
      adminReplies.push(adminReply)
    })
    
    return adminReplies
  } catch (error) {
    return []
  }
}

// Admin yanıtlarını thread yapısına göre organize et
function organizeAdminRepliesByThread(adminReplies: AdminReply[]): AdminReply[] {
  
  // Ana yanıtları bul (parentReplyId yok olanlar)
  const rootReplies = adminReplies.filter(reply => !reply.parentReplyId)
  
  // Her ana yanıt için alt yanıtları bul ve organize et
  const organizedReplies = rootReplies.map(rootReply => {
    // ID kontrolü ekle
    if (!rootReply.id) {
      return rootReply
    }
    
    const subReplies = findSubReplies(rootReply.id, adminReplies)
    return {
      ...rootReply,
      subReplies: subReplies
    }
  })
  
  return organizedReplies
}

// Recursive olarak alt yanıtları bul
function findSubReplies(parentId: string, allReplies: AdminReply[]): AdminReply[] {
  const directSubReplies = allReplies.filter(reply => reply.parentReplyId === parentId)
  
  const organizedSubReplies = directSubReplies.map(subReply => {
    // ID kontrolü ekle
    if (!subReply.id) {
      return subReply
    }
    
    const deeperSubReplies = findSubReplies(subReply.id, allReplies)
    return {
      ...subReply,
      subReplies: deeperSubReplies
    }
  })
  
  return organizedSubReplies
}

// Toplam yorum sayısını getir
export async function getTotalCommentsCount(): Promise<number> {
  try {
    const snapshot = await getDocs(commentsCollection)
    return snapshot.size
  } catch (error) {
    throw new Error(`Toplam yorum sayısı getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Detay sayfası için özel yorum getirme fonksiyonu - HYBRID YAKLAŞIM
export async function getCommentForDetailPage(commentId: string): Promise<CommentWithAdminReplies | null> {
  try {
    
    // CommentId kontrolü
    if (!commentId || typeof commentId !== 'string') {
      return null
    }
    
    // Ana yorumu getir
    const commentRef = doc(commentsCollection, commentId)
    const commentSnap = await getDoc(commentRef)
    
    if (!commentSnap.exists()) {
      return null
    }
    
    const mainCommentData = commentSnap.data()
    const mainComment: Comment = {
      id: commentSnap.id,
      blogId: mainCommentData.blogId || '',
      authorName: mainCommentData.authorName || '',
      authorEmail: mainCommentData.authorEmail || '',
      content: mainCommentData.content || '',
      isApproved: mainCommentData.isApproved !== undefined ? mainCommentData.isApproved : false,
      isRejected: mainCommentData.isRejected === true,
      isReply: mainCommentData.isReply !== undefined ? mainCommentData.isReply : false,
      parentCommentId: mainCommentData.parentCommentId,
      createdAt: mainCommentData.createdAt,
      updatedAt: mainCommentData.updatedAt,
      likes: mainCommentData.likes || 0,
      likedBy: mainCommentData.likedBy || []
    }
    
    
    // TÜM YANITLARI RECURSIVE OLARAK GETİR (onay durumu fark etmez - dashboard için)
    const allReplies = await getAllRepliesRecursivelyForDashboard(commentId)
    
    // Tüm yanıtları tarihe göre sırala (hem normal hem admin)
    const sortedAllReplies = allReplies.sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt ? new Date(a.createdAt as any).getTime() : 0)
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt ? new Date(b.createdAt as any).getTime() : 0)
      return aTime - bTime // Eski önce
    })
    
    // Admin yanıtlarını ayrı olarak filtrele (sadece adminReplies için)
    const adminReplies = allReplies.filter(reply => reply.authorEmail === 'admin@softiel.com')
    const sortedAdminReplies = adminReplies.sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt ? new Date(a.createdAt as any).getTime() : 0)
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt ? new Date(b.createdAt as any).getTime() : 0)
      return aTime - bTime // Eski önce
    })
    
    // Sonucu döndür
    const result: CommentWithAdminReplies = {
      ...mainComment,
      replies: sortedAllReplies, // TÜM yanıtlar (normal + admin)
      adminReplies: sortedAdminReplies as unknown as AdminReply[] // Admin yanıtları ayrı da
    }
    
    
    return result
  } catch (error) {
    return null
  }
}


// Recursive yanıt organizasyonu - detay sayfası için
async function organizeRepliesRecursively(replies: Comment[], parentCommentId: string): Promise<Comment[]> {
  const organizedReplies: Comment[] = []
  
  for (const reply of replies) {
    // Bu yanıta direkt yanıt verilen yorumları getir (sadece normal yanıtlar)
    const subRepliesQuery = query(
      commentsCollection,
      where('parentCommentId', '==', reply.id)
    )
    
    const subRepliesSnapshot = await getDocs(subRepliesQuery)
    const subReplies: Comment[] = []
    
    subRepliesSnapshot.forEach(doc => {
      const data = doc.data()
      // Sadece admin olmayan yanıtları ekle
      if (data.authorEmail !== 'admin@softiel.com') {
        subReplies.push({
          id: doc.id,
          blogId: data.blogId || '',
          authorName: data.authorName || '',
          authorEmail: data.authorEmail || '',
          content: data.content || '',
          isApproved: data.isApproved !== undefined ? data.isApproved : false,
          isReply: data.isReply !== undefined ? data.isReply : false,
          parentCommentId: data.parentCommentId,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          likes: data.likes || 0,
          likedBy: data.likedBy || []
        })
      }
    })
    
    // Alt yanıtları da recursive olarak organize et
    const organizedSubReplies = subReplies.length > 0 && reply.id
      ? await organizeRepliesRecursively(subReplies, reply.id)
      : []
    
    organizedReplies.push({
      ...reply,
      replies: organizedSubReplies
    })
  }
  
  return organizedReplies
}

// Blog için çok seviyeli yanıtları düzenle
function organizeRepliesForBlog(replies: Comment[], allComments?: Comment[]): Comment[] {
  // allComments yoksa sadece replies'i döndür (recursive olmadan)
  if (!allComments) {
    return replies
  }
  
  return replies.map(reply => {
    // Bu yanıta direkt yanıt verilen yorumları bul - sadece onaylanmış yanıtları göster
    const subReplies = allComments.filter(subReply => 
      subReply.parentCommentId === reply.id && 
      subReply.id !== reply.id &&
      subReply.isApproved
    )
    
    // Alt yanıtları da organize et (recursive)
    const organizedSubReplies = subReplies.length > 0 
      ? organizeRepliesForBlog(subReplies, allComments)
      : []
    
    return {
      ...reply,
      replies: organizedSubReplies
    }
  })
}

// Yorum onayla/reddet
export async function approveComment(id: string, approved: boolean): Promise<void> {
  try {
    
    const commentRef = doc(commentsCollection, id)
    await updateDoc(commentRef, {
      isApproved: approved,
      isRejected: !approved, // Reddetme durumunu işaretle
      updatedAt: Timestamp.now()
    })
    
  } catch (error) {
    // Yorum onay durumu güncelleme hatası
    throw new Error(`Yorum onay durumu güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Yorum beğen
export async function likeComment(commentId: string, userId: string): Promise<void> {
  try {
    
    const commentRef = doc(commentsCollection, commentId)
    const commentSnap = await getDoc(commentRef)
    
    if (commentSnap.exists()) {
      const data = commentSnap.data()
      const likes = data.likes || 0
      const likedBy = data.likedBy || []
      
      // Kullanıcı daha önce beğenmiş mi?
      const isLiked = likedBy.includes(userId)
      
      if (isLiked) {
        // Beğeniyi kaldır
        const newLikedBy = likedBy.filter((id: string) => id !== userId)
        await updateDoc(commentRef, {
          likes: Math.max(0, likes - 1),
          likedBy: newLikedBy,
          updatedAt: Timestamp.now()
        })
      } else {
        // Beğeni ekle
        await updateDoc(commentRef, {
          likes: likes + 1,
          likedBy: [...likedBy, userId],
          updatedAt: Timestamp.now()
        })
        
        // Aktivite loglama artık component seviyesinde yapılıyor
      }
    }
    
  } catch (error) {
    // Yorum beğeni hatası
    throw new Error(`Yorum beğenilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Yorum istatistikleri
export async function getCommentStats(): Promise<{
  total: number
  approved: number
  pending: number
  rejected: number
  replies: number
}> {
  try {
    
    const allComments = await getAllComments()
    
    const stats = {
      total: allComments.length,
      approved: allComments.filter(c => c.isApproved && c.isRejected !== true).length,
      pending: allComments.filter(c => !c.isApproved && c.isRejected !== true).length,
      rejected: allComments.filter(c => c.isRejected === true).length,
      replies: allComments.filter(c => c.isReply).length
    }
    
    return stats
  } catch (error) {
    throw new Error(`Yorum istatistikleri getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Toplu yorum silme
export async function deleteComments(commentIds: string[]): Promise<{ success: number; failed: number; errors: string[] }> {
  try {
    
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }
    
    // Her yorumu tek tek sil (recursive silme ile)
    for (const commentId of commentIds) {
      try {
        await deleteComment(commentId)
        results.success++
      } catch (error) {
        results.failed++
        const errorMessage = `Yorum ${commentId} silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`
        results.errors.push(errorMessage)
      }
    }
    
    return results
  } catch (error) {
    throw new Error(`Toplu yorum silme işlemi başarısız: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}
