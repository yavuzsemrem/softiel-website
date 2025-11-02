"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { BlogPost, getBlog } from "@/lib/blog-service"
import { useRouter } from "next/navigation"

const Header = dynamic(() => import("@/components/header").then(mod => ({ default: mod.Header })), {
  ssr: true,
  loading: () => <div className="h-16 bg-slate-800 animate-pulse" />
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  ssr: true,
  loading: () => <div className="h-32 bg-slate-800 animate-pulse" />
})

const BlogDetailHero = dynamic(() => import("@/components/blog-detail-hero").then(mod => ({ default: mod.BlogDetailHero })), {
  ssr: false,
  loading: () => <div className="min-h-[50vh] bg-slate-800 animate-pulse" />
})

const BlogDetailContent = dynamic(() => import("@/components/blog-detail-content").then(mod => ({ default: mod.BlogDetailContent })), {
  ssr: false,
  loading: () => <div className="min-h-[60vh] bg-slate-800 animate-pulse" />
})

const BlogCommentsSection = dynamic(() => import("@/components/blog-comments-section").then(mod => ({ default: mod.BlogCommentsSection })), {
  ssr: false,
  loading: () => <div className="min-h-[30vh] bg-slate-800/50 rounded-xl animate-pulse" />
})

const RelatedPosts = dynamic(() => import("@/components/related-posts").then(mod => ({ default: mod.RelatedPosts })), {
  ssr: false,
  loading: () => <div className="min-h-[40vh] bg-slate-800/50 rounded-xl animate-pulse" />
})

interface BlogDetailClientProps {
  slug: string
}

export function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const [blogData, setBlogData] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true
    
    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        console.log('🔵 Fetching blog with slug:', slug)
        
        // Direkt client-side Firebase SDK kullan (incrementViews: true)
        const data = await getBlog(slug, true)
        
        if (!data) {
          console.warn('❌ Blog not found:', slug)
          // 404 - not found sayfasına yönlendir
          router.push('/404')
          return
        }
        
        console.log('✅ Blog loaded successfully:', data.title)
        
        if (isMounted) {
          setBlogData(data)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('❌ Blog fetch error:', err)
        
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Blog yüklenemedi')
          setIsLoading(false)
          
          // Otomatik retry (max 3 kez)
          if (retryCount < 3) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1)
            }, 2000 * (retryCount + 1)) // Exponential backoff
          }
        }
      }
    }

    fetchBlog()
    
    return () => {
      isMounted = false
    }
  }, [slug, retryCount, router])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-black flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Blog Yükleniyor
          </h2>
          
          <p className="text-neutral-400 mb-6">
            {retryCount > 0 ? `Yeniden deneniyor... (${retryCount}/3)` : 'Lütfen bekleyin...'}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !blogData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-black flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Blog Yüklenemedi
          </h2>
          
          <p className="text-neutral-400 mb-6">
            {error || 'Blog yazısı bulunamadı'}
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setRetryCount(prev => prev + 1)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Tekrar Dene
            </button>
            
            <button
              onClick={() => router.back()}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Geri Dön
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Success - render blog
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <BlogDetailHero slug={slug} blogData={blogData} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-16">
            <BlogDetailContent slug={slug} blogData={blogData} />
            <BlogCommentsSection slug={slug} />
          </div>
        </div>
        
        <RelatedPosts currentSlug={slug} />
      </main>
      <Footer />
    </div>
  )
}

