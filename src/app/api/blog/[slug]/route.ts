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
    const { slug } = await params
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug gerekli' },
        { status: 400 }
      )
    }

    // Blog'u getir (view count artırma)
    const incrementViews = request.nextUrl.searchParams.get('incrementViews') === 'true'
    const blog = await getBlog(slug, incrementViews)
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog bulunamadı' },
        { status: 404 }
      )
    }

    // Blog verisini serialize et (Timestamp -> string)
    const serializedBlog = {
      ...blog,
      createdAt: blog.createdAt?.toDate().toISOString(),
      updatedAt: blog.updatedAt?.toDate().toISOString(),
      publishedAt: blog.publishedAt?.toDate().toISOString(),
    }

    return NextResponse.json(serializedBlog, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (error: any) {
    console.error('Blog API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Blog getirilemedi',
        message: error?.message || 'Bilinmeyen hata'
      },
      { status: 500 }
    )
  }
}

