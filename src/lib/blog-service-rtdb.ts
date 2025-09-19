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
    return { id: blogId, slug: slug }
  } catch (error) {
    throw new Error(`Blog oluşturulamadı: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog güncelle
export async function updateBlog(id: string, blogData: Partial<BlogPost>): Promise<void> {
  try {
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const updateData = {
      ...blogData,
      updatedAt: Date.now(),
      publishedAt: blogData.status === 'published' ? Date.now() : null
    }
    
    await set(blogRef, updateData)
  } catch (error) {
    throw new Error(`Blog güncellenemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Blog sil
export async function deleteBlog(id: string): Promise<void> {
  try {
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    await remove(blogRef)
  } catch (error) {
    throw new Error(`Blog silinemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}

// Tek blog getir
export async function getBlog(id: string): Promise<BlogPost | null> {
  try {
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const snapshot = await get(blogRef)
    
    if (snapshot.exists()) {
      const blogData = snapshot.val()
      
      // Görüntülenme sayısını artır
      const updatedViews = (blogData.views || 0) + 1
      await set(ref(rtdb, `blogs/${id}/views`), updatedViews)
      
      return {
        ...blogData,
        views: updatedViews
      } as BlogPost
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
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const snapshot = await get(blogRef)
    
    if (snapshot.exists()) {
      const currentViews = snapshot.val().views || 0
      await set(ref(rtdb, `blogs/${id}/views`), currentViews + 1)
    }
  } catch (error) {
  }
}

// Blog beğeni sayısını güncelle
export async function updateBlogLikes(id: string, increment: boolean): Promise<void> {
  try {
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const snapshot = await get(blogRef)
    
    if (snapshot.exists()) {
      const currentLikes = snapshot.val().likes || 0
      const newLikes = increment ? currentLikes + 1 : Math.max(0, currentLikes - 1)
      
      await set(ref(rtdb, `blogs/${id}/likes`), newLikes)
    }
  } catch (error) {
  }
}

// Blog yorum sayısını güncelle
export async function updateBlogComments(id: string, increment: boolean): Promise<void> {
  try {
    
    const blogRef = ref(rtdb, `blogs/${id}`)
    const snapshot = await get(blogRef)
    
    if (snapshot.exists()) {
      const currentComments = snapshot.val().comments || 0
      const newComments = increment ? currentComments + 1 : Math.max(0, currentComments - 1)
      
      await set(ref(rtdb, `blogs/${id}/comments`), newComments)
    }
  } catch (error) {
  }
}

// Kategorileri getir
export async function getCategories(): Promise<string[]> {
  try {
    
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
    return result
  } catch (error) {
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
    
    return stats
  } catch (error) {
    throw new Error(`Blog istatistikleri getirilemedi: ${(error as any)?.message || 'Bilinmeyen hata'}`)
  }
}
