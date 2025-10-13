import dynamic from "next/dynamic"
import { getBlog } from "@/lib/blog-service"
import { BlogPost } from "@/lib/blog-service"

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

// generateStaticParams kaldırıldı - normal Next.js server ile çalışacak

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  
  // Blog verisini bir kez yükle ve view count'u artır
  const blogData = await getBlog(slug, true)
  
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

