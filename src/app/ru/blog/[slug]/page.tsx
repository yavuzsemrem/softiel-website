import dynamic from "next/dynamic"
import { getBlog } from "@/lib/blog-service"
import { BlogPost } from "@/lib/blog-service"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// TÜM componentleri lazy load et - Main-thread work azaltmak için
const Header = dynamic(() => import("@/components/header").then(mod => ({ default: mod.Header })), {
  ssr: true,
  loading: () => <div className="h-16 bg-slate-800 animate-pulse" />
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  ssr: true,
  loading: () => <div className="h-32 bg-slate-800 animate-pulse" />
})

const BlogDetailHero = dynamic(() => import("@/components/blog-detail-hero").then(mod => ({ default: mod.BlogDetailHero })), {
  ssr: true,
  loading: () => <div className="min-h-[50vh] bg-slate-800 animate-pulse" />
})

const BlogDetailContent = dynamic(() => import("@/components/blog-detail-content").then(mod => ({ default: mod.BlogDetailContent })), {
  ssr: true,
  loading: () => <div className="min-h-[60vh] bg-slate-800 animate-pulse" />
})

const BlogCommentsSection = dynamic(() => import("@/components/blog-comments-section").then(mod => ({ default: mod.BlogCommentsSection })), {
  ssr: false,  // Client-side only - main-thread work azaltmak için
  loading: () => <div className="min-h-[30vh] bg-slate-800/50 rounded-xl animate-pulse" />
})

const RelatedPosts = dynamic(() => import("@/components/related-posts").then(mod => ({ default: mod.RelatedPosts })), {
  ssr: false,  // Client-side only - main-thread work azaltmak için
  loading: () => <div className="min-h-[40vh] bg-slate-800/50 rounded-xl animate-pulse" />
})

interface BlogDetailPageProps {
  params: {
    slug: string
  }
}

// ISR: Runtime'da ilk ziyarette generate et, 60 saniyede bir revalidate et
export const revalidate = 60
export const dynamicParams = true

// Metadata oluştur (SEO ve paylaşım için)
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const blogData = await getBlog(slug, false) // View count artırma
    
    if (!blogData) {
      return {
        title: 'Блог не найден | Softiel',
        description: 'Запрашиваемая статья блога не найдена.'
      }
    }

    return {
      title: `${blogData.title} | Softiel Blog`,
      description: blogData.excerpt || blogData.title,
      keywords: blogData.tags?.join(', '),
      authors: [{ name: blogData.author || 'Admin' }],
      openGraph: {
        title: blogData.title,
        description: blogData.excerpt || blogData.title,
        type: 'article',
        publishedTime: blogData.publishedAt?.toDate().toISOString(),
        modifiedTime: blogData.updatedAt?.toDate().toISOString(),
        authors: [blogData.author || 'Admin'],
        tags: blogData.tags,
        images: blogData.image ? [{ url: blogData.image }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: blogData.title,
        description: blogData.excerpt || blogData.title,
        images: blogData.image ? [blogData.image] : [],
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Blog | Softiel',
      description: 'Softiel Blog'
    }
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  
  // Blog verisini bir kez yükle ve view count'u artır
  let blogData: BlogPost | null = null
  let error: Error | null = null
  
  try {
    blogData = await getBlog(slug, true)
  } catch (err) {
    console.error('Blog fetch error:', err)
    error = err as Error
    
    // Sadece gerçekten bulunamadıysa 404 döndür
    // Connection error'larda retry yap
    if (err && typeof err === 'object' && 'message' in err) {
      const errorMessage = (err as any).message?.toLowerCase() || ''
      
      // Connection error değilse (yani gerçekten blog yoksa) 404 döndür
      if (!errorMessage.includes('connection') && 
          !errorMessage.includes('timeout') &&
          !errorMessage.includes('network')) {
        notFound()
      }
    }
  }
  
  // Blog bulunamadıysa ama connection error varsa, fallback göster
  if (!blogData) {
    // Error page yerine basit bir loading/error state
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content="3" />
        </head>
        <body>
          <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-black flex items-center justify-center">
            <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">
                Загрузка блога
              </h2>
              
              <p className="text-neutral-400 mb-6">
                Статья блога загружается... Повторная попытка через 3 секунды.
              </p>
            </div>
          </div>
        </body>
      </html>
    )
  }
  
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
