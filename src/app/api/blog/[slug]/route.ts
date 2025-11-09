import { NextRequest, NextResponse } from 'next/server'
import { adminDb, initializationError } from '@/lib/firebase-admin'

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
    const { slug } = await params
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug gerekli' },
        { status: 400 }
      )
    }

    const incrementViews = request.nextUrl.searchParams.get('incrementViews') === 'true'
    
    // Admin DB yoksa (development), 404 dön
    if (!adminDb || initializationError) {
      console.warn('Admin DB not available for blog fetch')
      return NextResponse.json(
        { error: 'Blog service not available in development mode' },
        { status: 503 }
      )
    }
    
    // Admin Firestore kullan
    const blogsCollection = adminDb.collection('blogs')
    
    // Önce ID ile dene
    try {
      const blogDoc = await blogsCollection.doc(slug).get()
      
      if (blogDoc.exists) {
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
      // ID ile bulunamadı, slug ile dene
    }
    
    // Slug ile ara
    const snapshot = await blogsCollection.get()
    
    for (const doc of snapshot.docs) {
      const data = doc.data()
      const blogSlug = data.slug || createSlug(data.title) || doc.id
      
      if (blogSlug === slug) {
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
    
    return NextResponse.json(
      { error: 'Blog bulunamadı' },
      { status: 404 }
    )
  } catch (error: any) {
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

