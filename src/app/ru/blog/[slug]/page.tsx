import dynamic from "next/dynamic"
import type { Metadata } from "next"

const BlogDetailClient = dynamic(() => import("@/components/blog-detail-client").then(mod => ({ default: mod.BlogDetailClient })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-black flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/10">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Загрузка блога</h2>
        <p className="text-neutral-400 mb-6">Пожалуйста, подождите...</p>
      </div>
    </div>
  )
})

interface BlogDetailPageProps {
  params: { slug: string }
}

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  
  return {
    title: 'Blog | Softiel',
    description: 'Статьи блога Softiel - Веб-дизайн, SEO и цифровой маркетинг',
    openGraph: {
      title: 'Softiel Blog',
      description: 'Статьи блога Softiel',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Softiel Blog',
    }
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  return <BlogDetailClient slug={slug} />
}
