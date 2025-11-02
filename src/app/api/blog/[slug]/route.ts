import { NextRequest, NextResponse } from 'next/server'
import { getBlog } from '@/lib/blog-service'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET /api/blog/[slug] - Tek blog getir
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('🔵 Blog API route called')
    const { slug } = await params
    console.log('🔵 Slug:', slug)
    
    if (!slug) {
      console.error('❌ No slug provided')
      return NextResponse.json(
        { error: 'Slug gerekli' },
        { status: 400 }
      )
    }

    // Blog'u getir (view count artırma)
    const incrementViews = request.nextUrl.searchParams.get('incrementViews') === 'true'
    console.log('🔵 Increment views:', incrementViews)
    console.log('🔵 Calling getBlog...')
    const blog = await getBlog(slug, incrementViews)
    console.log('🔵 getBlog returned:', blog ? 'Blog found' : 'Blog is null')
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog bulunamadı' },
        { status: 404 }
      )
    }

    // Güvenli Timestamp serializasyon helper
    const serializeTimestamp = (timestamp: any): string | undefined => {
      if (!timestamp) return undefined
      try {
        if (typeof timestamp.toDate === 'function') {
          return timestamp.toDate().toISOString()
        }
        if (timestamp instanceof Date) {
          return timestamp.toISOString()
        }
        if (typeof timestamp === 'string') {
          return timestamp
        }
        return undefined
      } catch (err) {
        console.warn('Timestamp serialization error:', err)
        return undefined
      }
    }

    // Blog verisini serialize et (Timestamp -> string)
    const serializedBlog = {
      ...blog,
      createdAt: serializeTimestamp(blog.createdAt),
      updatedAt: serializeTimestamp(blog.updatedAt),
      publishedAt: serializeTimestamp(blog.publishedAt),
    }

    return NextResponse.json(serializedBlog, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (error: any) {
    console.error('❌ Blog API error:', error)
    console.error('❌ Error message:', error?.message)
    console.error('❌ Error code:', error?.code)
    console.error('❌ Error stack:', error?.stack)
    console.error('❌ Full error object:', JSON.stringify(error, null, 2))
    
    return NextResponse.json(
      { 
        error: 'Blog getirilemedi',
        message: error?.message || 'Bilinmeyen hata',
        code: error?.code,
        details: error?.stack
      },
      { status: 500 }
    )
  }
}

