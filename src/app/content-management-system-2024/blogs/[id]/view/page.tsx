"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  Calendar,
  User,
  Tag,
  FolderOpen,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react"
import { getBlog } from "@/lib/blog-service"
import { BlogPost } from "@/lib/blog-service"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardBlogComments } from "@/components/dashboard-blog-comments"

export default function BlogViewPage() {
  const params = useParams()
  const router = useRouter()
  const blogId = params.id as string

  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const blogData = await getBlog(blogId)
        if (blogData) {
          setBlog(blogData)
        } else {
          setError("Blog bulunamadı")
        }
      } catch (err) {
        setError("Blog yüklenirken bir hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Tarih yok"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "draft":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "archived":
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4" />
      case "draft":
        return <Clock className="h-4 w-4" />
      case "archived":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Yayınlandı"
      case "draft":
        return "Taslak"
      case "archived":
        return "Arşivlendi"
      default:
        return "Bilinmiyor"
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-neutral-400">Blog yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !blog) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Hata</h2>
            <p className="text-neutral-400 mb-6">{error || "Blog bulunamadı"}</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Geri Dön
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Blog Görüntüle
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Blog yazısını görüntüleyin ve düzenleyin
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="glass rounded-xl p-6 border border-white/20 mb-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Geri Dön</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => router.push(`/dashboard/blogs/${blog?.slug || blogId}/edit`)}
                  className="flex items-center justify-center space-x-2 px-6 py-2 text-white rounded-xl hover:opacity-90 transition-all duration-200 group"
                  style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
                >
                  <Edit className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Düzenle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Blog Info */}
          <div className="glass rounded-xl p-6 border border-white/20 mb-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(blog.status)}`}>
                {getStatusIcon(blog.status)}
                <span className="text-sm font-medium">{getStatusText(blog.status)}</span>
              </div>
              {blog.featured && (
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
                  <span className="text-sm font-medium">Öne Çıkan</span>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h2>
            
            <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-6 border border-white/20 mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            {/* Blog Image */}
            {blog.image && (
              <div className="mb-8">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Blog Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-neutral-300">Etiketler:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Blog Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{blog.views || 0}</p>
                  <p className="text-sm text-neutral-400">Görüntülenme</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <ThumbsUp className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{blog.likes || 0}</p>
                  <p className="text-sm text-neutral-400">Beğeni</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{blog.comments || 0}</p>
                  <p className="text-sm text-neutral-400">Yorum</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{blog.readTime}</p>
                  <p className="text-sm text-neutral-400">Okuma Süresi</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Blog Detayları</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-neutral-400">Yazar</p>
                    <p className="text-white font-medium">{blog.author}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FolderOpen className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-sm text-neutral-400">Kategori</p>
                    <p className="text-white font-medium">{blog.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-neutral-400">Oluşturulma Tarihi</p>
                    <p className="text-white font-medium">{formatDate(blog.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-neutral-400">Güncellenme Tarihi</p>
                    <p className="text-white font-medium">{formatDate(blog.updatedAt)}</p>
                  </div>
                </div>

                {blog.publishedAt && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-neutral-400">Yayın Tarihi</p>
                      <p className="text-white font-medium">{formatDate(blog.publishedAt)}</p>
                    </div>
                  </div>
                )}

                {blog.slug && (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-neutral-400">Slug:</span>
                    <code className="text-xs bg-slate-700/50 px-2 py-1 rounded text-cyan-300">
                      {blog.slug}
                    </code>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Blog Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <DashboardBlogComments blogId={blogId} />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
