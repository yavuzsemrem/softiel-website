// Realtime Database blog service
import { 
  ref, 
  push, 
  set, 
  remove, 
  get, 
  query, 
  orderByChild, 
  equalTo, 
  limitToLast,
  startAt,
  endAt
} from 'firebase/database'
import { rtdb } from './firebase'

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
  createdAt: number
  updatedAt: number
  publishedAt?: number
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

// Blog referansı
const blogsRef = ref(rtdb, 'blogs')

// Yeni blog oluştur
export async function createBlog(blogData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'comments'>): Promise<{ id: string; slug: string }> {
  try {
    console.log('Realtime Database: Blog oluşturuluyor...', blogData)
    
    const newBlogRef = push(blogsRef)
    const blogId = newBlogRef.key!
    
    // Slug oluştur
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    const blogDataWithTimestamps = {
      ...blogData,
      id: blogId,
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      publishedAt: blogData.status === 'published' ? Date.now() : null,
      slug: slug
    }
    
    await set(newBlogRef, blogDataWithTimestamps)
    console.log('Realtime Database: Blog oluşturuldu:', blogId)
    return { id: blogId, slug: slug }
  } catch (error) {
    console.error('Realtime Database: Blog oluşturma hatası:', error)
    throw new Error(`Blog oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog güncelle
export async function updateBlog(id: string, blogData: Partial<BlogPost>): Promise<void> {
  try {
    console.log('Realtime Database: Blog güncelleniyor...', id, blogData)
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const updateData = {
      ...blogData,
      updatedAt: Date.now(),
      publishedAt: blogData.status === 'published' ? Date.now() : null
    }
    
    await set(blogRef, updateData)
    console.log('Realtime Database: Blog güncellendi:', id)
  } catch (error) {
    console.error('Realtime Database: Blog güncelleme hatası:', error)
    throw new Error(`Blog güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog sil
export async function deleteBlog(id: string): Promise<void> {
  try {
    console.log('Realtime Database: Blog siliniyor...', id)
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    await remove(blogRef)
    console.log('Realtime Database: Blog silindi:', id)
  } catch (error) {
    console.error('Realtime Database: Blog silme hatası:', error)
    throw new Error(`Blog silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Tek blog getir
export async function getBlog(id: string): Promise<BlogPost | null> {
  try {
    console.log('Realtime Database: Blog getiriliyor...', id)
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const snapshot = await get(blogRef)
    
    if (snapshot.exists()) {
      const blogData = snapshot.val()
      console.log('Realtime Database: Blog getirildi:', blogData.title)
      
      // Görüntülenme sayısını artır
      const updatedViews = (blogData.views || 0) + 1
      await set(ref(rtdb, `blogs/${id}/views`), updatedViews)
      
      return {
        ...blogData,
        views: updatedViews
      } as BlogPost
    }
    
    console.log('Realtime Database: Blog bulunamadı:', id)
    return null
  } catch (error) {
    console.error('Realtime Database: Blog getirme hatası:', error)
    throw new Error(`Blog getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog listesi getir
export async function getBlogs(
  filters: BlogFilters = {},
  pagination: BlogPagination = { page: 1, limit: 10 }
): Promise<{ blogs: BlogPost[], total: number, hasMore: boolean }> {
  try {
    // Basit sorgu - tüm blogları al
    const snapshot = await get(blogsRef)
    let blogs: BlogPost[] = []
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      blogs = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) as BlogPost[]
      
      // Tarihe göre sırala (en yeni önce)
      blogs.sort((a, b) => b.createdAt - a.createdAt)
    }
    
    // Filtreler (client-side)
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
    console.error('Realtime Database: Blog listesi getirme hatası:', error)
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

// Blog görüntülenme sayısını artır
export async function incrementBlogViews(id: string): Promise<void> {
  try {
    console.log('Realtime Database: Görüntülenme sayısı artırılıyor...', id)
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const snapshot = await get(blogRef)
    
    if (snapshot.exists()) {
      const currentViews = snapshot.val().views || 0
      await set(ref(rtdb, `blogs/${id}/views`), currentViews + 1)
      console.log('Realtime Database: Görüntülenme sayısı artırıldı:', currentViews + 1)
    }
  } catch (error) {
    console.error('Realtime Database: Görüntülenme sayısı artırma hatası:', error)
  }
}

// Blog beğeni sayısını güncelle
export async function updateBlogLikes(id: string, increment: boolean): Promise<void> {
  try {
    console.log('Realtime Database: Beğeni sayısı güncelleniyor...', id, increment)
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const snapshot = await get(blogRef)
    
    if (snapshot.exists()) {
      const currentLikes = snapshot.val().likes || 0
      const newLikes = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1)
      
      await set(ref(rtdb, `blogs/${id}/likes`), newLikes)
      console.log('Realtime Database: Beğeni sayısı güncellendi:', newLikes)
    }
  } catch (error) {
    console.error('Realtime Database: Beğeni sayısı güncelleme hatası:', error)
  }
}

// Blog yorum sayısını güncelle
export async function updateBlogComments(id: string, increment: boolean): Promise<void> {
  try {
    console.log('Realtime Database: Yorum sayısı güncelleniyor...', id, increment)
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const snapshot = await get(blogRef)
    
    if (snapshot.exists()) {
      const currentComments = snapshot.val().comments || 0
      const newComments = increment ? currentComments + 1 : Math.max(0, currentComments - 1)
      
      await set(ref(rtdb, `blogs/${id}/comments`), newComments)
      console.log('Realtime Database: Yorum sayısı güncellendi:', newComments)
    }
  } catch (error) {
    console.error('Realtime Database: Yorum sayısı güncelleme hatası:', error)
  }
}

// Kategorileri getir
export async function getCategories(): Promise<string[]> {
  try {
    console.log('Realtime Database: Kategoriler getiriliyor...')
    
    const snapshot = await get(blogsRef)
    const categories = new Set<string>()
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      Object.values(data).forEach((blog: any) => {
        if (blog.category) {
          categories.add(blog.category)
        }
      })
    }
    
    const result = Array.from(categories).sort()
    console.log('Realtime Database: Kategoriler getirildi:', result)
    return result
  } catch (error) {
    console.error('Realtime Database: Kategoriler getirme hatası:', error)
    throw new Error(`Kategoriler getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Etiketleri getir
export async function getTags(): Promise<string[]> {
  try {
    const snapshot = await get(blogsRef)
    const tags = new Set<string>()
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      Object.values(data).forEach((blog: any) => {
        if (blog.tags && Array.isArray(blog.tags)) {
          blog.tags.forEach((tag: string) => tags.add(tag))
        }
      })
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
    console.log('Realtime Database: Blog istatistikleri getiriliyor...')
    
    const snapshot = await get(blogsRef)
    let total = 0
    let published = 0
    let draft = 0
    let archived = 0
    let totalViews = 0
    let totalLikes = 0
    let totalComments = 0
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      Object.values(data).forEach((blog: any) => {
        total++
        
        if (blog.status === 'published') published++
        else if (blog.status === 'draft') draft++
        else if (blog.status === 'archived') archived++
        
        totalViews += blog.views || 0
        totalLikes += blog.likes || 0
        totalComments += blog.comments || 0
      })
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
    
    console.log('Realtime Database: Blog istatistikleri getirildi:', stats)
    return stats
  } catch (error) {
    console.error('Realtime Database: Blog istatistikleri getirme hatası:', error)
    throw new Error(`Blog istatistikleri getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}
