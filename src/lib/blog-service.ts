// Firestore blog service
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
import { db, auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { updateCategoryPostCount } from './category-service'
import { updateTagPostCount } from './tag-service'
import { createSlug } from './slug-utils'
import { logBlogActivity } from './activity-service'

// Yardımcı fonksiyon: Blog verisinden slug oluştur
function getBlogSlug(data: any, docId: string): string {
  return data.slug || createSlug(data.title) || docId
}

// Retry utility fonksiyonu - bağlantı hatalarında yeniden dene (GÜÇLENDİRİLMİŞ)
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 5, // 3'ten 5'e çıkarıldı
  baseDelay: number = 2000, // 1000'den 2000'e çıkarıldı
  timeout: number = 30000 // 10000'den 30000'e çıkarıldı (30 saniye)
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Timeout ile Promise.race kullan
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
      });
      
      const result = await Promise.race([fn(), timeoutPromise]);
      return result;
    } catch (error: any) {
      const isLastAttempt = attempt === maxRetries - 1;
      const isConnectionError = error?.message?.includes('Connection closed') || 
                                 error?.message?.includes('timeout') ||
                                 error?.message?.includes('network') ||
                                 error?.message?.includes('ECONNRESET') ||
                                 error?.message?.includes('fetch failed') ||
                                 error?.code === 'unavailable' ||
                                 error?.code === 'ECONNREFUSED';
      
      if (isLastAttempt) {
        throw error;
      }
      
      if (!isConnectionError) {
        // Connection error değilse retry yapma
        throw error;
      }
      
      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Max retries exceeded');
}

export interface BlogPost {
  id?: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  readTime: string
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  image?: string
  views: number
  likes: number
  comments: number
  featured: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  publishedAt?: Timestamp
  slug?: string
}

export interface BlogFilters {
  category?: string
  status?: string
  tags?: string[]
  search?: string
  featured?: boolean
  author?: string
}

export interface BlogPagination {
  page: number
  limit: number
  lastKey?: string
}

// Blog koleksiyonu
const blogsCollection = collection(db, 'blogs')


  // Yeni blog oluştur
  export async function createBlog(blogData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'comments'>): Promise<{ id: string; slug: string }> {
    try {
      
      // Görsel boyutunu kontrol et
      if (blogData.image && blogData.image.length > 1048487) {
        throw new Error('Görsel dosyası çok büyük! Maksimum 1MB olmalı.')
      }
      
      // Slug oluştur ve benzersizlik kontrolü yap
      let baseSlug = createSlug(blogData.title)
      
      // Benzersiz slug oluştur
      let slug = baseSlug
      let counter = 1
      
      // Mevcut slug'ları kontrol et
      const existingSlugs = await getDocs(blogsCollection)
      const usedSlugs = new Set()
      
      existingSlugs.docs.forEach(doc => {
        const data = doc.data()
        if (data.slug) {
          usedSlugs.add(data.slug)
        }
      })
      
      // Benzersiz slug bul
      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${counter}`
        counter++
      }
      
      const blogDataWithTimestamps = {
        ...blogData,
        views: 0,
        likes: 0,
        comments: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        publishedAt: blogData.status === 'published' ? Timestamp.now() : null,
        slug: slug
      }
      
    
    const docRef = await addDoc(blogsCollection, blogDataWithTimestamps)
    const blogId = docRef.id
    
    
    // Kategori post sayısını güncelle
    try {
      await updateCategoryPostCount(blogData.category, true)
    } catch (categoryError) {
      // Bu hata blog oluşturmayı engellemez
    }
    
    // Etiket post sayılarını güncelle
    if (blogData.tags && blogData.tags.length > 0) {
      try {
        await Promise.all(
          blogData.tags.map(async (tag: string) => {
            await updateTagPostCount(tag, true)
          })
        )
      } catch (tagError) {
        // Bu hata blog oluşturmayı engellemez
      }
    }
    
    // Oluşturulan blogu doğrula
    const verifyDoc = await getDoc(docRef)
    if (!verifyDoc.exists) {
      throw new Error('Blog oluşturuldu ama doğrulanamadı!')
    }
    
    // Aktivite kaydet
    try {
      await logBlogActivity(
        'blog_created',
        'Yeni blog yazısı eklendi',
        `Admin tarafından "${blogData.title}" başlıklı yazı oluşturuldu`,
        'admin',
        'Admin',
        blogId,
        {
          blogTitle: blogData.title,
          blogId,
          userRole: 'admin',
          actionType: 'blog_create',
          targetUrl: `/blog/${slug}`
        }
      )
    } catch (activityError) {
      // Aktivite kaydetme hatası blog oluşturmayı engellemez
    }
    
    return { id: blogId, slug: slug }
  } catch (error) {
    throw new Error(`Blog oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog güncelle (id veya slug ile)
export async function updateBlog(identifier: string, blogData: Partial<BlogPost>): Promise<void> {
  try {
    // Önce ID ile dene
    const blogRef = doc(blogsCollection, identifier)
    const snapshot = await getDoc(blogRef)
    
    let actualBlogId = identifier
    
    if (snapshot.exists()) {
      // ID ile bulundu
      actualBlogId = identifier
    } else {
      // Slug ile ara
      const allBlogs = await getDocs(blogsCollection)
      let found = false
      
      for (const docSnapshot of allBlogs.docs) {
        const data = docSnapshot.data()
        const slug = getBlogSlug(data, docSnapshot.id)
        
        if (slug === identifier) {
          actualBlogId = docSnapshot.id
          found = true
          break
        }
      }
      
      if (!found) {
        throw new Error(`Blog bulunamadı: ${identifier}`)
      }
    }
    
    // Güncelleme verilerini hazırla
    const updateData: any = {
      ...blogData,
      updatedAt: Timestamp.now()
    }
    
    // Eğer status published ise publishedAt'i güncelle
    if (blogData.status === 'published') {
      updateData.publishedAt = Timestamp.now()
    }
    
    // Eğer title değiştiyse slug'ı güncelle
    if (blogData.title) {
      updateData.slug = createSlug(blogData.title)
    }
    
    // Blog'u güncelle
    const actualBlogRef = doc(blogsCollection, actualBlogId)
    await updateDoc(actualBlogRef, updateData)
    
    // Aktivite kaydet
    try {
      const activityType = blogData.status === 'published' ? 'blog_published' : 'blog_updated'
      const activityTitle = blogData.status === 'published' ? 'Blog yazısı yayınlandı' : 'Blog yazısı güncellendi'
      const activityDescription = blogData.status === 'published' 
        ? `${blogData.title || 'Blog yazısı'} yayına alındı`
        : `${blogData.title || 'Blog yazısı'} güncellendi`
      
      await logBlogActivity(
        activityType,
        activityTitle,
        activityDescription,
        'admin',
        'Admin',
        actualBlogId
      )
    } catch (activityError) {
      // Aktivite kaydetme hatası blog güncellemeyi engellemez
    }
    
  } catch (error) {
    throw new Error(`Blog güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog sil (id veya slug ile)
export async function deleteBlog(identifier: string): Promise<void> {
  try {
    // Önce ID ile dene
    const blogRef = doc(blogsCollection, identifier)
    const blogDoc = await getDoc(blogRef)
    
    let actualBlogId = identifier
    let blogData: any = null
    
    if (blogDoc.exists()) {
      // ID ile bulundu
      actualBlogId = identifier
      blogData = blogDoc.data()
    } else {
      // Slug ile ara
      const allBlogs = await getDocs(blogsCollection)
      let found = false
      
      for (const docSnapshot of allBlogs.docs) {
        const data = docSnapshot.data()
        const slug = getBlogSlug(data, docSnapshot.id)
        
        if (slug === identifier) {
          actualBlogId = docSnapshot.id
          blogData = data
          found = true
          break
        }
      }
      
      if (!found) {
        throw new Error(`Blog bulunamadı: ${identifier}`)
      }
    }
    
    if (!blogData) {
      throw new Error('Blog verisi bulunamadı')
    }
    
    const category = blogData.category
    
    // Blogu sil
    const actualBlogRef = doc(blogsCollection, actualBlogId)
    await deleteDoc(actualBlogRef)
    
    // Aktivite kaydet
    try {
      await logBlogActivity(
        'blog_deleted',
        'Blog yazısı silindi',
        `${blogData.title || 'Blog yazısı'} silindi`,
        'admin',
        'Admin',
        actualBlogId
      )
    } catch (activityError) {
      // Aktivite kaydetme hatası blog silmeyi engellemez
    }
    
    // Kategori post sayısını güncelle
    try {
      await updateCategoryPostCount(category, false)
    } catch (categoryError) {
      // Bu hata blog silmeyi engellemez
    }
    
    // Etiket post sayılarını güncelle
    if (blogData.tags && blogData.tags.length > 0) {
      try {
        await Promise.all(
          blogData.tags.map(async (tag: string) => {
            await updateTagPostCount(tag, false)
          })
        )
      } catch (tagError) {
        // Bu hata blog silmeyi engellemez
      }
    }
  } catch (error) {
    throw new Error(`Blog silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Tek blog getir (id veya slug ile) - view count artırma olmadan
export async function getBlog(identifier: string, incrementViews: boolean = false): Promise<BlogPost | null> {
  return retryWithBackoff(async () => {
    try {
      // Identifier kontrolü
      if (!identifier || typeof identifier !== 'string') {
        return null
      }
      
      // Firestore bağlantısını kontrol et
      if (!blogsCollection) {
        throw new Error('Firestore blogs collection bulunamadı')
      }
      
      // Önce id ile dene
      try {
        const blogRef = doc(blogsCollection, identifier)
        const snapshot = await getDoc(blogRef)
        
        if (snapshot.exists()) {
          const blogData = snapshot.data()
          
          // Veri doğrulama
          if (!blogData) {
            return null
          }
          
          // Sadece incrementViews true ise görüntülenme sayısını artır
          if (incrementViews) {
            try {
              const updatedViews = (blogData.views || 0) + 1
              await updateDoc(blogRef, { views: updatedViews })
              blogData.views = updatedViews
            } catch (updateError) {
              // Hata olursa devam et
            }
          }
          
          return {
            id: snapshot.id,
            ...blogData,
            views: blogData.views || 0
          } as BlogPost
        }
      } catch (idError) {
        // ID ile bulunamadı, slug ile dene
      }
      
      // Eğer id ile bulunamadıysa, slug ile ara
      const snapshot2 = await getDocs(blogsCollection)
      
      for (const docSnapshot of snapshot2.docs) {
        const data = docSnapshot.data()
        const slug = getBlogSlug(data, docSnapshot.id)
        
        if (slug === identifier) {
          // Sadece incrementViews true ise görüntülenme sayısını artır
          if (incrementViews) {
            try {
              const updatedViews = (data.views || 0) + 1
              await updateDoc(docSnapshot.ref, { views: updatedViews })
              return {
                id: docSnapshot.id,
                ...data,
                views: updatedViews
              } as BlogPost
            } catch (updateError) {
              // Hata olursa view count'u artırmadan devam et
              return {
                id: docSnapshot.id,
                ...data,
                views: data.views || 0
              } as BlogPost
            }
          }
          
          return {
            id: docSnapshot.id,
            ...data,
            views: data.views || 0
          } as BlogPost
        }
      }
      
      return null
    } catch (error) {
      // Connection closed hatalarını yakala
      if ((error as any)?.message?.includes('Connection closed') ||
          (error as any)?.message?.includes('timeout') ||
          (error as any)?.code === 'unavailable') {
        throw error; // Retry mekanizması devreye girsin
      }
      
      throw new Error(`Blog getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
    }
  }, 5, 2000, 30000); // 5 retry, 2 saniye base delay, 30 saniye timeout
}

// Blog getir (sadece slug ile)
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!slug || typeof slug !== 'string') {
      return null
    }
    
    if (!blogsCollection) {
      throw new Error('Firestore blogs collection bulunamadı')
    }
    
    // Slug ile ara
    const snapshot = await getDocs(blogsCollection)
    
    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data()
      const blogSlug = getBlogSlug(data, docSnapshot.id)
      
      if (blogSlug === slug) {
        // Görüntülenme sayısını artır
        const updatedViews = (data.views || 0) + 1
        await updateDoc(docSnapshot.ref, { views: updatedViews })
        
        return {
          id: docSnapshot.id,
          ...data,
          views: updatedViews
        } as BlogPost
      }
    }
    
    return null
  } catch (error) {
    throw new Error(`Blog getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog listesi getir
export async function getBlogs(
  filters: BlogFilters = {},
  pagination: BlogPagination = { page: 1, limit: 10 }
): Promise<{ blogs: BlogPost[], total: number, hasMore: boolean }> {
  try {
    // Firestore bağlantısını kontrol et
    if (!blogsCollection) {
      throw new Error('Firestore blogs collection bulunamadı')
    }
    
    // Firebase bağlantısını kontrol et
    if (!db) {
      throw new Error('Firebase Firestore bağlantısı bulunamadı')
    }
    
    // Tüm blogları getir (basit sorgu)
    const snapshot = await getDocs(blogsCollection)
    let blogs: BlogPost[] = []
    
    if (snapshot.empty) {
      return {
        blogs: [],
        total: 0,
        hasMore: false
      }
    }
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      // Slug yoksa otomatik oluştur
      const slug = getBlogSlug(data, doc.id)
      
      
      blogs.push({
        id: doc.id,
        ...data,
        slug: slug
      } as BlogPost)
    }
    
    
    // Client-side filtreler
    if (filters.status) {
      blogs = blogs.filter(blog => blog.status === filters.status)
    }
    
    if (filters.category) {
      blogs = blogs.filter(blog => blog.category === filters.category)
    }
    
    if (filters.featured !== undefined) {
      blogs = blogs.filter(blog => blog.featured === filters.featured)
    }
    
    if (filters.tags && filters.tags.length > 0) {
      blogs = blogs.filter(blog => 
        filters.tags!.some(tag => blog.tags.includes(tag))
      )
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      blogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm)
      )
    }
    
    if (filters.author) {
      blogs = blogs.filter(blog => 
        blog.author.toLowerCase().includes(filters.author!.toLowerCase())
      )
    }
    
    // Tarihe göre sırala (en yeni önce)
    blogs.sort((a, b) => {
      const aTime = a.createdAt.toDate ? a.createdAt.toDate().getTime() : (a.createdAt as any).toDate().getTime()
      const bTime = b.createdAt.toDate ? b.createdAt.toDate().getTime() : (b.createdAt as any).toDate().getTime()
      return bTime - aTime
    })
    
    // Sayfalama
    const startIndex = (pagination.page - 1) * pagination.limit
    const endIndex = startIndex + pagination.limit
    const paginatedBlogs = blogs.slice(startIndex, endIndex)
    
    
    return {
      blogs: paginatedBlogs,
      total: blogs.length,
      hasMore: endIndex < blogs.length
    }
  } catch (error) {
    throw new Error(`Blog listesi getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Yayınlanmış blogları getir (public)
export async function getPublishedBlogs(
  filters: Omit<BlogFilters, 'status'> = {},
  pagination: BlogPagination = { page: 1, limit: 10 }
): Promise<{ blogs: BlogPost[], total: number, hasMore: boolean }> {
  return getBlogs({ ...filters, status: 'published' }, pagination)
}

// Blog görüntülenme sayısını artır (id veya slug ile)
export async function incrementBlogViews(identifier: string): Promise<void> {
  try {
    
    // Önce id ile dene
    const blogRef = doc(blogsCollection, identifier)
    const snapshot = await getDoc(blogRef)
    
    if (snapshot.exists()) {
      const data = snapshot.data()
      if (data) {
        const currentViews = data.views || 0
        await updateDoc(blogRef, { views: currentViews + 1 })
        return
      }
    }
    
    // Eğer id ile bulunamadıysa, slug ile ara
    const snapshot2 = await getDocs(blogsCollection)
    for (const docSnapshot of snapshot2.docs) {
      const data = docSnapshot.data()
      const slug = getBlogSlug(data, docSnapshot.id)
      
      if (slug === identifier) {
        const currentViews = data.views || 0
        await updateDoc(docSnapshot.ref, { views: currentViews + 1 })
        return
      }
    }
  } catch (error) {
  }
}

// Helper function to get current user info
async function getCurrentUserInfo() {
  try {
    // Check localStorage for user info
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId')
      const userName = localStorage.getItem('userName')
      
      if (userId && userName) {
        return { userId, userName }
      }
    }
    
    // Fallback to anonymous user
    return { userId: 'anonymous', userName: 'Ziyaretçi' }
  } catch (error) {
    return { userId: 'anonymous', userName: 'Ziyaretçi' }
  }
}

// Blog beğeni sayısını güncelle (id veya slug ile)
export async function updateBlogLikes(identifier: string, increment: boolean): Promise<void> {
  try {
    // Get current user info
    const { userId, userName } = await getCurrentUserInfo()
    
    // Önce id ile dene
    const blogRef = doc(blogsCollection, identifier)
    const snapshot = await getDoc(blogRef)
    
    if (snapshot.exists()) {
      const data = snapshot.data()
      if (data) {
        const currentLikes = data.likes || 0
        const newLikes = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1)
        
        await updateDoc(blogRef, { likes: newLikes })
        
        // Aktivite kaydet (sadece beğeni eklendiğinde)
        if (increment) {
          try {
            await logBlogActivity(
              'blog_liked',
              'Blog yazısı beğenildi',
              `${data.title || 'Blog yazısı'} beğenildi`,
              userId,
              userName,
              identifier
            )
            
            // Notification context'i güncelle
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('notification-updated'))
            }
          } catch (activityError) {
            // Aktivite kaydetme hatası beğeniyi engellemez
          }
        }
        
        return
      }
    }
    
    // Eğer id ile bulunamadıysa, slug ile ara
    const snapshot2 = await getDocs(blogsCollection)
    for (const docSnapshot of snapshot2.docs) {
      const data = docSnapshot.data()
      const slug = getBlogSlug(data, docSnapshot.id)
      
      if (slug === identifier) {
        const currentLikes = data.likes || 0
        const newLikes = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1)
        
        await updateDoc(docSnapshot.ref, { likes: newLikes })
        
        // Aktivite kaydet (sadece beğeni eklendiğinde)
        if (increment) {
          try {
            await logBlogActivity(
              'blog_liked',
              'Blog yazısı beğenildi',
              `${data.title || 'Blog yazısı'} beğenildi`,
              userId,
              userName,
              docSnapshot.id
            )
            
            // Notification context'i güncelle
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('notification-updated'))
            }
          } catch (activityError) {
            // Aktivite kaydetme hatası beğeniyi engellemez
          }
        }
        
        return
      }
    }
  } catch (error) {
  }
}

// Blog yorum sayısını güncelle
export async function updateBlogComments(id: string, increment: boolean): Promise<void> {
  try {
    const blogRef = doc(blogsCollection, id)
    const snapshot = await getDoc(blogRef)
    
    if (snapshot.exists()) {
      const data = snapshot.data()
      if (data) {
        const currentComments = data.comments || 0
        const newComments = increment ? currentComments + 1 : Math.max(0, currentComments - 1)
        
        await updateDoc(blogRef, { comments: newComments })
      }
    }
  } catch (error) {
    // Sessizce hata yok sayılır
  }
}

// Kategorileri getir
export async function getCategories(): Promise<string[]> {
  try {
    
    const snapshot = await getDocs(blogsCollection)
    const categories = new Set<string>()
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      if (data.category) {
        categories.add(data.category)
      }
    }
    
    const result = Array.from(categories).sort()
    return result
  } catch (error) {
    throw new Error(`Kategoriler getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Etiketleri getir
export async function getTags(): Promise<string[]> {
  try {
    
    const snapshot = await getDocs(blogsCollection)
    const tags = new Set<string>()
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => tags.add(tag))
      }
    }
    
    const result = Array.from(tags).sort()
    return result
  } catch (error) {
    throw new Error(`Etiketler getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog istatistikleri
export async function getBlogStats(): Promise<{
  total: number
  published: number
  draft: number
  archived: number
  totalViews: number
  totalLikes: number
  totalComments: number
}> {
  try {
    
    const snapshot = await getDocs(blogsCollection)
    let total = 0
    let published = 0
    let draft = 0
    let archived = 0
    let totalViews = 0
    let totalLikes = 0
    let totalComments = 0
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      total++
      
      if (data.status === 'published') published++
      else if (data.status === 'draft') draft++
      else if (data.status === 'archived') archived++
      
      totalViews += data.views || 0
      totalLikes += data.likes || 0
      totalComments += data.comments || 0
    }
    
    const stats = {
      total,
      published,
      draft,
      archived,
      totalViews,
      totalLikes,
      totalComments
    }
    
    return stats
  } catch (error) {
    throw new Error(`Blog istatistikleri getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}// Tüm blogları getir
export async function getAllBlogs(filters?: BlogFilters): Promise<BlogPost[]> {
  try {
    let q = query(blogsCollection)
    
    // Filtreleri uygula
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status))
    }
    
    if (filters?.category) {
      q = query(q, where('category', '==', filters.category))
    }
    
    if (filters?.featured !== undefined) {
      q = query(q, where('featured', '==', filters.featured))
    }
    
    if (filters?.author) {
      q = query(q, where('author', '==', filters.author))
    }
    
    // Tarihe göre sırala (en yeni önce)
    q = query(q, orderBy('createdAt', 'desc'))
    
    const snapshot = await getDocs(q)
    let blogs: BlogPost[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      
      // Slug yoksa otomatik oluştur
      const slug = getBlogSlug(data, doc.id)
      
      blogs.push({
        id: doc.id,
        ...data,
        slug: slug
      } as BlogPost)
    }
    
    // Arama filtresi uygula (client-side)
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase()
      blogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.author.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm)
      )
    }
    
    // Etiket filtresi uygula (client-side)
    if (filters?.tags && filters.tags.length > 0) {
      blogs = blogs.filter(blog => 
        blog.tags && blog.tags.some(tag => filters.tags!.includes(tag))
      )
    }
    
    return blogs
  } catch (error) {
    throw new Error(`Bloglar getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Featured blogları getir
export async function getFeaturedBlogs(limit: number = 5): Promise<BlogPost[]> {
  try {
    
    const snapshot = await getDocs(blogsCollection)
    let blogs: BlogPost[] = []
    
    // Use snapshot.docs array to avoid forEach serialization issues in production
    const docs = snapshot.docs || []
    for (const doc of docs) {
      const data = doc.data()
      if (data.featured === true && data.status === 'published') {
        // Slug yoksa otomatik oluştur
        const slug = getBlogSlug(data, doc.id)
        
        blogs.push({
          id: doc.id,
          ...data,
          slug: slug
        } as BlogPost)
      }
    }
    
    // Tarihe göre sırala (en yeni önce)
    blogs.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt as any).toDate()
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt as any).toDate()
      return dateB.getTime() - dateA.getTime()
    })
    
    // Limit uygula
    blogs = blogs.slice(0, limit)
    
    return blogs
  } catch (error) {
    throw new Error(`Featured bloglar getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Toplu blog silme
export async function deleteBlogs(blogIds: string[]): Promise<{ success: number; failed: number; errors: string[] }> {
  try {
    
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }
    
    // Her blogu tek tek sil
    for (const blogId of blogIds) {
      try {
        await deleteBlog(blogId)
        results.success++
      } catch (error) {
        results.failed++
        const errorMessage = `Blog ${blogId} silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`
        results.errors.push(errorMessage)
      }
    }
    
    return results
  } catch (error) {
    throw new Error(`Toplu blog silme işlemi başarısız: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}


  