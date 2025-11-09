import { DashboardLayout } from "@/components/dashboard-layout"
import { BlogEditForm } from "@/components/blog-edit-form"

interface BlogEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const { id } = await params
  
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-500/10 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlogEditForm blogId={id} />
        </div>
      </div>
    </DashboardLayout>
  )
}