import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogDetailHero } from "@/components/blog-detail-hero"
import { BlogDetailContent } from "@/components/blog-detail-content"
import { BlogDetailSidebar } from "@/components/blog-detail-sidebar"
import { RelatedPosts } from "@/components/related-posts"
import { BlogCommentsSection } from "@/components/blog-comments-section"
import { getBlog } from "@/lib/blog-service"

interface BlogDetailPageProps {
  params: {
    slug: string
  }
}

// generateStaticParams kaldırıldı - normal Next.js server ile çalışacak

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  
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
        
        <BlogDetailHero slug={slug} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BlogDetailContent slug={slug} />
            </div>
            <div className="lg:col-span-1">
              <BlogDetailSidebar currentSlug={slug} />
            </div>
          </div>
        </div>

        {/* Yorum Bölümü */}
        <BlogCommentsSection slug={slug} />
        
        <RelatedPosts />
      </main>
      <Footer />
    </div>
  )
}
