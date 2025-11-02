import { NextRequest, NextResponse } from 'next/server'
import { getAdminFirestore } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Helper: Blog slug oluştur
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// GET /api/blog/[slug] - Tek blog getir (Firebase Admin SDK ile)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('🔵 Blog API route called (Admin SDK)')
    const { slug } = await params
    console.log('🔵 Slug:', slug)
    
    if (!slug) {
      console.error('❌ No slug provided')
      return NextResponse.json(
        { error: 'Slug gerekli' },
        { status: 400 }
      )
    }

    const incrementViews = request.nextUrl.searchParams.get('incrementViews') === 'true'
    console.log('🔵 Increment views:', incrementViews)
    
    // Admin Firestore kullan
    const db = getAdminFirestore()
    const blogsCollection = db.collection('blogs')
    
    console.log('🔵 Fetching blog from Firestore...')
    
    // Önce ID ile dene
    try {
      const blogDoc = await blogsCollection.doc(slug).get()
      
      if (blogDoc.exists) {
        console.log('✅ Blog found by ID')
        const blogData = blogDoc.data()!
        
        // View count artır
        if (incrementViews) {
          const updatedViews = (blogData.views || 0) + 1
          await blogDoc.ref.update({ views: updatedViews })
          blogData.views = updatedViews
        }
        
        return NextResponse.json({
          id: blogDoc.id,
          ...blogData,
          createdAt: blogData.createdAt?.toDate().toISOString(),
          updatedAt: blogData.updatedAt?.toDate().toISOString(),
          publishedAt: blogData.publishedAt?.toDate().toISOString(),
        })
      }
    } catch (idError) {
      console.warn('⚠️ ID lookup failed, trying slug search')
    }
    
    // Slug ile ara
    console.log('🔍 Searching by slug...')
    const snapshot = await blogsCollection.get()
    console.log(`📄 Total blogs: ${snapshot.size}`)
    
    for (const doc of snapshot.docs) {
      const data = doc.data()
      const blogSlug = data.slug || createSlug(data.title) || doc.id
      
      if (blogSlug === slug) {
        console.log('✅ Blog found by slug')
        
        // View count artır
        if (incrementViews) {
          const updatedViews = (data.views || 0) + 1
          await doc.ref.update({ views: updatedViews })
          data.views = updatedViews
        }
        
        return NextResponse.json({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toISOString(),
          updatedAt: data.updatedAt?.toDate().toISOString(),
          publishedAt: data.publishedAt?.toDate().toISOString(),
        })
      }
    }
    
    console.log('❌ Blog not found')
    return NextResponse.json(
      { error: 'Blog bulunamadı' },
      { status: 404 }
    )
  } catch (error: any) {
    console.error('❌ Blog API error:', error)
    console.error('❌ Error message:', error?.message)
    console.error('❌ Error code:', error?.code)
    
    return NextResponse.json(
      { 
        error: 'Blog getirilemedi',
        message: error?.message || 'Bilinmeyen hata',
        code: error?.code
      },
      { status: 500 }
    )
  }
}

