// Firestore project service
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
import { createSlug } from './slug-utils'
import { logProjectActivity } from './activity-service'

// Yardımcı fonksiyon: Proje verisinden slug oluştur
function getProjectSlug(data: any, docId: string): string {
  return data.slug || createSlug(data.title) || docId
}

export interface Project {
  id?: string
  title: string
  description: string
  content: string
  client: string
  duration: string
  endDate?: string
  status: 'completed' | 'ongoing' | 'upcoming'
  category: string
  technologies: string[]
  features: string[]
  image: string
  gallery: string[]
  liveUrl?: string
  githubUrl?: string
  views: number
  likes: number
  featured: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  publishedAt?: Timestamp
  slug?: string
}

export interface ProjectFilters {
  category?: string
  status?: string
  search?: string
  sortBy?: 'newest' | 'oldest' | 'title' | 'views' | 'likes'
  featured?: boolean
}

// Proje oluştur
export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'slug'>): Promise<string> {
  try {
    const now = Timestamp.now()
    
    // Slug oluştur
    const slug = createSlug(data.title)
    
    const projectData = {
      ...data,
      slug,
      views: 0,
      likes: 0,
      createdAt: now,
      updatedAt: now,
      publishedAt: data.status === 'completed' ? now : null
    }

    const docRef = await addDoc(collection(db, 'projects'), projectData)
    
    // Slug'ı güncelle (docId ile birlikte)
    await updateDoc(docRef, {
      slug: getProjectSlug(projectData, docRef.id)
    })

    // Activity log
    await logProjectActivity(docRef.id, 'created', {
      title: data.title,
      status: data.status
    })

    return docRef.id
  } catch (error) {
    console.error('Error creating project:', error)
    throw new Error('Proje oluşturulurken bir hata oluştu')
  }
}

// Proje güncelle
export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  try {
    const now = Timestamp.now()
    
    const updateData = {
      ...data,
      updatedAt: now,
      publishedAt: data.status === 'completed' ? now : data.publishedAt
    }

    await updateDoc(doc(db, 'projects', id), updateData)

    // Activity log
    await logProjectActivity(id, 'updated', {
      title: data.title || 'Unknown',
      status: data.status || 'Unknown'
    })
  } catch (error) {
    console.error('Error updating project:', error)
    throw new Error('Proje güncellenirken bir hata oluştu')
  }
}

// Proje sil
export async function deleteProject(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'projects', id))

    // Activity log
    await logProjectActivity(id, 'deleted', {
      title: 'Deleted Project',
      status: 'deleted'
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    throw new Error('Proje silinirken bir hata oluştu')
  }
}

// Toplu proje sil
export async function deleteProjects(ids: string[]): Promise<{ success: number, failed: number }> {
  let success = 0
  let failed = 0

  for (const id of ids) {
    try {
      await deleteProject(id)
      success++
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error)
      failed++
    }
  }

  return { success, failed }
}

// Proje getir
export async function getProject(id: string): Promise<Project | null> {
  try {
    const docRef = doc(db, 'projects', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project
    }
    return null
  } catch (error) {
    console.error('Error getting project:', error)
    throw new Error('Proje getirilirken bir hata oluştu')
  }
}

// Slug ile proje getir
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const q = query(
      collection(db, 'projects'),
      where('slug', '==', slug)
    )
    
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() } as Project
    }
    
    // Eğer slug ile bulunamadıysa, tüm projeleri kontrol et ve slug oluştur
    const allProjectsQuery = query(collection(db, 'projects'))
    const allProjectsSnapshot = await getDocs(allProjectsQuery)
    
    for (const docSnapshot of allProjectsSnapshot.docs) {
      const data = docSnapshot.data()
      const projectSlug = createSlug(data.title)
      
      if (projectSlug === slug) {
        // Slug'ı güncelle
        await updateDoc(doc(db, 'projects', docSnapshot.id), {
          slug: projectSlug
        })
        
        return { id: docSnapshot.id, ...data, slug: projectSlug } as Project
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting project by slug:', error)
    throw new Error('Proje getirilirken bir hata oluştu')
  }
}

// Projeleri listele
export async function getProjects(filters: ProjectFilters = {}, pageSize: number = 10, lastDoc?: any): Promise<{ projects: Project[], hasMore: boolean, lastDoc: any }> {
  try {
    let q = query(collection(db, 'projects'))

    // Filtreler
    if (filters.category) {
      q = query(q, where('category', '==', filters.category))
    }
    
    if (filters.status) {
      q = query(q, where('status', '==', filters.status))
    }
    
    if (filters.featured !== undefined) {
      q = query(q, where('featured', '==', filters.featured))
    }

    // Sıralama
    let orderField = 'createdAt'
    let orderDirection: 'asc' | 'desc' = 'desc'
    
    switch (filters.sortBy) {
      case 'oldest':
        orderDirection = 'asc'
        break
      case 'title':
        orderField = 'title'
        orderDirection = 'asc'
        break
      case 'views':
        orderField = 'views'
        orderDirection = 'desc'
        break
      case 'likes':
        orderField = 'likes'
        orderDirection = 'desc'
        break
      default:
        orderField = 'createdAt'
        orderDirection = 'desc'
    }

    q = query(q, orderBy(orderField, orderDirection))

    // Sayfalama
    if (lastDoc) {
      q = query(q, startAfter(lastDoc))
    }
    q = query(q, limit(pageSize + 1))

    const querySnapshot = await getDocs(q)
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[]

    const hasMore = projects.length > pageSize
    if (hasMore) {
      projects.pop() // Son elemanı çıkar
    }

    const newLastDoc = hasMore ? querySnapshot.docs[querySnapshot.docs.length - 2] : null

    // Arama filtresi (client-side)
    let filteredProjects = projects
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProjects = projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.client.toLowerCase().includes(searchTerm) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
      )
    }

    return {
      projects: filteredProjects,
      hasMore,
      lastDoc: newLastDoc
    }
  } catch (error) {
    console.error('Error getting projects:', error)
    throw new Error('Projeler getirilirken bir hata oluştu')
  }
}

// Proje görüntülenme sayısını artır
export async function incrementProjectViews(id: string): Promise<void> {
  try {
    const projectRef = doc(db, 'projects', id)
    const projectSnap = await getDoc(projectRef)
    
    if (projectSnap.exists()) {
      const currentViews = projectSnap.data().views || 0
      await updateDoc(projectRef, {
        views: currentViews + 1
      })
    }
  } catch (error) {
    console.error('Error incrementing project views:', error)
  }
}

// Proje beğeni sayısını artır/azalt
export async function toggleProjectLike(id: string): Promise<{ liked: boolean, newCount: number }> {
  try {
    const projectRef = doc(db, 'projects', id)
    const projectSnap = await getDoc(projectRef)
    
    if (projectSnap.exists()) {
      const currentLikes = projectSnap.data().likes || 0
      // Bu basit bir implementasyon - gerçek uygulamada kullanıcı bazlı beğeni sistemi olmalı
      const newLikes = currentLikes + 1
      await updateDoc(projectRef, {
        likes: newLikes
      })
      
      return { liked: true, newCount: newLikes }
    }
    
    return { liked: false, newCount: 0 }
  } catch (error) {
    console.error('Error toggling project like:', error)
    throw new Error('Beğeni işlemi sırasında bir hata oluştu')
  }
}

// Kategorilere göre proje sayılarını getir
export async function getProjectCountsByCategory(): Promise<{ [category: string]: number }> {
  try {
    const q = query(collection(db, 'projects'))
    const querySnapshot = await getDocs(q)
    
    const counts: { [category: string]: number } = {}
    
    querySnapshot.docs.forEach(doc => {
      const category = doc.data().category
      counts[category] = (counts[category] || 0) + 1
    })
    
    return counts
  } catch (error) {
    console.error('Error getting project counts by category:', error)
    return {}
  }
}

// Durumlara göre proje sayılarını getir
export async function getProjectCountsByStatus(): Promise<{ [status: string]: number }> {
  try {
    const q = query(collection(db, 'projects'))
    const querySnapshot = await getDocs(q)
    
    const counts: { [status: string]: number } = {}
    
    querySnapshot.docs.forEach(doc => {
      const status = doc.data().status
      counts[status] = (counts[status] || 0) + 1
    })
    
    return counts
  } catch (error) {
    console.error('Error getting project counts by status:', error)
    return {}
  }
}

