// Mock blog service - Firebase sorunu çözülene kadar kullanılacak
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
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
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
  lastDoc?: any
}

// Mock data
const mockBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'Web Geliştirme Trendleri 2024',
    excerpt: '2024 yılında web geliştirme dünyasında öne çıkan trendler ve teknolojiler.',
    content: 'Web geliştirme dünyası sürekli olarak gelişiyor ve 2024 yılında da birçok yeni trend karşımıza çıkıyor...',
    author: 'Ahmet Yılmaz',
    category: 'Teknoloji',
    readTime: '5',
    status: 'published',
    tags: ['web', 'trend', '2024'],
    image: 'https://via.placeholder.com/800x400',
    views: 150,
    likes: 25,
    comments: 8,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    publishedAt: new Date('2024-01-15'),
    slug: 'web-gelistirme-trendleri-2024'
  },
  {
    id: '2',
    title: 'React 18 Yeni Özellikleri',
    excerpt: 'React 18 ile gelen yeni özellikler ve performans iyileştirmeleri.',
    content: 'React 18, web geliştirme dünyasında büyük bir devrim yarattı...',
    author: 'Mehmet Kaya',
    category: 'React',
    readTime: '7',
    status: 'published',
    tags: ['react', 'javascript', 'frontend'],
    image: 'https://via.placeholder.com/800x400',
    views: 200,
    likes: 35,
    comments: 12,
    featured: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    publishedAt: new Date('2024-01-10'),
    slug: 'react-18-yeni-ozellikleri'
  },
  {
    id: '3',
    title: 'TypeScript ile Daha İyi Kod',
    excerpt: 'TypeScript kullanarak daha güvenli ve sürdürülebilir kod yazma teknikleri.',
    content: 'TypeScript, JavaScript\'in üzerine tip güvenliği ekleyen güçlü bir araçtır...',
    author: 'Ayşe Demir',
    category: 'TypeScript',
    readTime: '6',
    status: 'published',
    tags: ['typescript', 'javascript', 'programming'],
    image: 'https://via.placeholder.com/800x400',
    views: 120,
    likes: 18,
    comments: 5,
    featured: false,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    publishedAt: new Date('2024-01-05'),
    slug: 'typescript-ile-daha-iyi-kod'
  }
]

// Mock functions
export async function createBlog(blogData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'comments'>): Promise<{ id: string; slug: string }> {
  
  // Slug oluştur
  const slug = blogData.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
  
  const newBlog: BlogPost = {
    ...blogData,
    id: Date.now().toString(),
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: blogData.status === 'published' ? new Date() : undefined,
    slug: slug
  }
  
  mockBlogs.unshift(newBlog)
  return { id: newBlog.id, slug: slug }
}

export async function updateBlog(id: string, blogData: Partial<BlogPost>): Promise<void> {
  
  const index = mockBlogs.findIndex(blog => blog.id === id)
  if (index !== -1) {
    mockBlogs[index] = {
      ...mockBlogs[index],
      ...blogData,
      updatedAt: new Date()
    }
  } else {
    throw new Error('Blog bulunamadı')
  }
}

export async function deleteBlog(id: string): Promise<void> {
  
  const index = mockBlogs.findIndex(blog => blog.id === id)
  if (index !== -1) {
    mockBlogs.splice(index, 1)
  } else {
    throw new Error('Blog bulunamadı')
  }
}

export async function getBlog(id: string): Promise<BlogPost | null> {
  
  const blog = mockBlogs.find(blog => blog.id === id)
  if (blog) {
    // Görüntülenme sayısını artır
    blog.views += 1
  }
  
  return blog || null
}

export async function getBlogs(
  filters: BlogFilters = {},
  pagination: BlogPagination = { page: 1, limit: 10 }
): Promise<{ blogs: BlogPost[], total: number, hasMore: boolean }> {
  
  let filteredBlogs = [...mockBlogs]
  
  // Filtreler
  if (filters.category) {
    filteredBlogs = filteredBlogs.filter(blog => blog.category === filters.category)
  }
  
  if (filters.status) {
    filteredBlogs = filteredBlogs.filter(blog => blog.status === filters.status)
  }
  
  if (filters.featured !== undefined) {
    filteredBlogs = filteredBlogs.filter(blog => blog.featured === filters.featured)
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filteredBlogs = filteredBlogs.filter(blog => 
      filters.tags!.some(tag => blog.tags.includes(tag))
    )
  }
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredBlogs = filteredBlogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm)
    )
  }
  
  if (filters.author) {
    filteredBlogs = filteredBlogs.filter(blog => 
      blog.author.toLowerCase().includes(filters.author!.toLowerCase())
    )
  }
  
  // Sıralama
  filteredBlogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  
  // Sayfalama
  const startIndex = (pagination.page - 1) * pagination.limit
  const endIndex = startIndex + pagination.limit
  const blogs = filteredBlogs.slice(startIndex, endIndex)
  
  
  return {
    blogs,
    total: filteredBlogs.length,
    hasMore: endIndex < filteredBlogs.length
  }
}

export async function getPublishedBlogs(
  filters: Omit<BlogFilters, 'status'> = {},
  pagination: BlogPagination = { page: 1, limit: 10 }
): Promise<{ blogs: BlogPost[], total: number, hasMore: boolean }> {
  return getBlogs({ ...filters, status: 'published' }, pagination)
}

export async function incrementBlogViews(id: string): Promise<void> {
  
  const blog = mockBlogs.find(blog => blog.id === id)
  if (blog) {
    blog.views += 1
  }
}

export async function updateBlogLikes(id: string, increment: boolean): Promise<void> {
  
  const blog = mockBlogs.find(blog => blog.id === id)
  if (blog) {
    blog.likes += increment ? 1 : -1
    if (blog.likes < 0) blog.likes = 0
  }
}

export async function updateBlogComments(id: string, increment: boolean): Promise<void> {
  
  const blog = mockBlogs.find(blog => blog.id === id)
  if (blog) {
    blog.comments += increment ? 1 : -1
    if (blog.comments < 0) blog.comments = 0
  }
}

export async function getCategories(): Promise<string[]> {
  
  const categories = [...new Set(mockBlogs.map(blog => blog.category))]
  
  return categories.sort()
}

export async function getTags(): Promise<string[]> {
  
  const tags = [...new Set(mockBlogs.flatMap(blog => blog.tags))]
  
  return tags.sort()
}

export async function getBlogStats(): Promise<{
  total: number
  published: number
  draft: number
  archived: number
  totalViews: number
  totalLikes: number
  totalComments: number
}> {
  
  const stats = {
    total: mockBlogs.length,
    published: mockBlogs.filter(blog => blog.status === 'published').length,
    draft: mockBlogs.filter(blog => blog.status === 'draft').length,
    archived: mockBlogs.filter(blog => blog.status === 'archived').length,
    totalViews: mockBlogs.reduce((sum, blog) => sum + blog.views, 0),
    totalLikes: mockBlogs.reduce((sum, blog) => sum + blog.likes, 0),
    totalComments: mockBlogs.reduce((sum, blog) => sum + blog.comments, 0)
  }
  
  
  return stats
}

