"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  Tag, 
  Loader2,
  BookOpen,
  Image as ImageIcon,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { getBlog, deleteBlog, BlogPost } from "@/lib/blog-service"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { BlogCommentsSection } from "@/components/blog-comments-section"

interface BlogDetailViewProps {
  blogId: string
}

export function BlogDetailView({ blogId }: BlogDetailViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Geri dönülecek sayfa - URL parametresinden al veya varsayılan olarak blog listesi
  const backUrl = searchParams.get('from') || '/dashboard/blogs'
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Blog verisini yükle
  useEffect(() => {
    loadBlog()
  }, [blogId])

  // Delete modal scroll engelleme
  useEffect(() => {
    if (isDeleteModalOpen) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY
      
      // Body'yi sabitle
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Scroll engelleme event listener'ları
      const preventScroll = (e: Event) => {
        e.preventDefault()
      }
      
      document.addEventListener('wheel', preventScroll, { passive: false })
      document.addEventListener('touchmove', preventScroll, { passive: false })
      
      return () => {
        // Scroll pozisyonunu geri yükle
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
        
        // Event listener'ları kaldır
        document.removeEventListener('wheel', preventScroll)
        document.removeEventListener('touchmove', preventScroll)
      }
    }
  }, [isDeleteModalOpen])

  const loadBlog = async () => {
    try {
      setLoading(true)
      setError("")
      
      const blogData = await getBlog(blogId)
      if (blogData) {
        setBlog(blogData)
      } else {
        setError("Blog yazısı bulunamadı")
      }
    } catch (err) {
      setError("Blog yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  // Silme modalını aç
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  // Silme modalını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  // Blog silme onayı
  const confirmDeleteBlog = async () => {
    try {
      setIsDeleting(true)
      await deleteBlog(blogId)
      router.push("/dashboard/blogs")
    } catch (err) {
      setError("Blog silinirken bir hata oluştu")
    } finally {
      setIsDeleting(false)
      closeDeleteModal()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          <span className="text-white text-lg">Blog yükleniyor...</span>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-white mb-4">Hata</h1>
        <p className="text-neutral-400 mb-8">{error || "Blog yazısı bulunamadı"}</p>
        <Link href="/dashboard/blogs" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
          <ArrowLeft className="h-4 w-4" />
          <span>Blog Listesine Dön</span>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-white/20 shadow-modern-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href={backUrl}
              className="flex items-center space-x-2 px-4 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 border border-white/20 group"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Geri Dön</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                blog.status === 'published' 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : blog.status === 'draft'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
              }`}>
                {blog.status === 'published' ? 'Yayınlandı' : 
                 blog.status === 'draft' ? 'Taslak' : 'Arşivlendi'}
              </span>
              {blog.featured && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-medium">
                  Öne Çıkan
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href={`/dashboard/blogs/${blogId}/edit`}
              className="flex items-center space-x-2 px-4 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 border border-white/20 group"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Edit className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              <span>Düzenle</span>
            </Link>
            <button
              onClick={openDeleteModal}
              disabled={isDeleting}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4" />
              <span>Sil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Blog Header */}
          <div className="glass rounded-2xl p-8 border border-white/20 shadow-modern-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="space-y-6">
              {/* Category */}
              <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 text-sm font-semibold text-cyan-400"
                   style={{ background: 'rgba(6, 182, 212, 0.2)' }}>
                <BookOpen className="h-4 w-4" />
                <span>{blog.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg text-neutral-300 leading-relaxed">
                {blog.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {blog.createdAt ? (
                      blog.createdAt.toDate ? 
                        blog.createdAt.toDate().toLocaleDateString('tr-TR') : 
                        new Date(blog.createdAt as any).toLocaleDateString('tr-TR')
                    ) : 'Tarih yok'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime} okuma</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{blog.views || 0} görüntüleme</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>{blog.likes || 0} beğeni</span>
                </div>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-lg border border-cyan-500/30"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Blog Image */}
          {blog.image ? (
            <div className="glass rounded-2xl overflow-hidden border border-white/20 shadow-modern-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 border border-white/20 shadow-modern-lg text-center" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="h-10 w-10 text-neutral-500" />
              </div>
              <p className="text-neutral-500 text-lg">Bu blog yazısında görsel bulunmuyor</p>
            </div>
          )}

          {/* Blog Content */}
          <div className="glass rounded-2xl p-8 border border-white/20 shadow-modern-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div 
              className="prose prose-lg max-w-none text-white"
              style={{
                color: 'white',
                lineHeight: '1.7'
              }}
              dangerouslySetInnerHTML={{ 
                __html: blog.content
                  .replace(/<h([1-6])/g, '<h$1 class="text-white font-bold mb-4 mt-6" style="color: white !important;"')
                  .replace(/<h1/g, '<h1 class="text-4xl font-bold text-white mb-6 mt-8" style="color: white !important;"')
                  .replace(/<h2/g, '<h2 class="text-3xl font-bold text-white mb-5 mt-7" style="color: white !important;"')
                  .replace(/<h3/g, '<h3 class="text-2xl font-bold text-white mb-4 mt-6" style="color: white !important;"')
                  .replace(/<h4/g, '<h4 class="text-xl font-bold text-white mb-3 mt-5" style="color: white !important;"')
                  .replace(/<h5/g, '<h5 class="text-lg font-bold text-white mb-3 mt-4" style="color: white !important;"')
                  .replace(/<h6/g, '<h6 class="text-base font-bold text-white mb-2 mt-4" style="color: white !important;"')
                  .replace(/<p/g, '<p class="text-white mb-4 leading-relaxed" style="color: white !important;"')
                  .replace(/<strong/g, '<strong class="font-bold text-white" style="color: white !important;"')
                  .replace(/<em/g, '<em class="italic text-gray-300" style="color: #d1d5db !important;"')
                  .replace(/<ul/g, '<ul class="list-disc list-inside text-white mb-4 ml-4" style="color: white !important;"')
                  .replace(/<ol/g, '<ol class="list-decimal list-inside text-white mb-4 ml-4" style="color: white !important;"')
                  .replace(/<li/g, '<li class="text-white mb-2" style="color: white !important;"')
                  .replace(/<blockquote/g, '<blockquote class="border-l-4 border-cyan-500 pl-4 py-2 my-4 text-cyan-200 italic bg-gray-800/50 rounded-r" style="color: #a5f3fc !important;"')
                  .replace(/<code/g, '<code class="bg-gray-800 px-2 py-1 rounded text-green-400 font-mono text-sm" style="background-color: #1f2937 !important; color: #4ade80 !important;"')
                  .replace(/<pre/g, '<pre class="bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm text-green-400 overflow-x-auto" style="background-color: #1f2937 !important; color: #4ade80 !important;"')
                  .replace(/<a/g, '<a class="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer" style="color: #22d3ee !important;"')
                  .replace(/<img/g, '<img class="max-w-full h-auto rounded-lg my-4 shadow-lg" style="max-width: 100% !important; height: auto !important;"')
              }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Blog Stats */}
          <div className="glass rounded-2xl p-6 border border-white/20 shadow-modern-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-lg font-bold text-white mb-4">İstatistikler</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Görüntülenme</span>
                <span className="text-white font-semibold">{blog.views || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Beğeni</span>
                <span className="text-white font-semibold">{blog.likes || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Yorum</span>
                <span className="text-white font-semibold">{blog.comments || 0}</span>
              </div>
            </div>
          </div>

          {/* Blog Info */}
          <div className="glass rounded-2xl p-6 border border-white/20 shadow-modern-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-lg font-bold text-white mb-4">Blog Bilgileri</h3>
            <div className="space-y-3">
              <div>
                <span className="text-neutral-400 text-sm">Durum</span>
                <p className="text-white font-medium">
                  {blog.status === 'published' ? 'Yayınlandı' : 
                   blog.status === 'draft' ? 'Taslak' : 'Arşivlendi'}
                </p>
              </div>
              <div>
                <span className="text-neutral-400 text-sm">Kategori</span>
                <p className="text-white font-medium">{blog.category}</p>
              </div>
              <div>
                <span className="text-neutral-400 text-sm">Yazar</span>
                <p className="text-white font-medium">{blog.author}</p>
              </div>
              <div>
                <span className="text-neutral-400 text-sm">Okuma Süresi</span>
                <p className="text-white font-medium">{blog.readTime}</p>
              </div>
              <div>
                <span className="text-neutral-400 text-sm">Oluşturulma Tarihi</span>
                <p className="text-white font-medium">
                  {(() => {
                    try {
                      if (!blog.createdAt) return 'Tarih yok'
                      
                      let date: Date
                      if (typeof blog.createdAt === 'object' && blog.createdAt.toDate) {
                        // Firestore Timestamp
                        date = blog.createdAt.toDate()
                      } else if (typeof blog.createdAt === 'number') {
                        // Unix timestamp
                        date = new Date(blog.createdAt as any)
                      } else if (typeof blog.createdAt === 'string') {
                        // String date
                        date = new Date(blog.createdAt as any)
                      } else {
                        // Fallback
                        date = new Date(blog.createdAt as any)
                      }
                      
                      if (isNaN(date.getTime())) return 'Geçersiz tarih'
                      
                      return date.toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    } catch (error) {
                      return 'Tarih hatası'
                    }
                  })()}
                </p>
              </div>
              {blog.updatedAt && (
                <div>
                  <span className="text-neutral-400 text-sm">Son Güncelleme</span>
                  <p className="text-white font-medium">
                    {(() => {
                      try {
                        if (!blog.updatedAt) return 'Tarih yok'
                        
                        let date: Date
                        if (typeof blog.updatedAt === 'object' && blog.updatedAt.toDate) {
                          // Firestore Timestamp
                          date = blog.updatedAt.toDate()
                        } else if (typeof blog.updatedAt === 'number') {
                          // Unix timestamp
                          date = new Date(blog.updatedAt)
                        } else if (typeof blog.updatedAt === 'string') {
                          // String date
                          date = new Date(blog.updatedAt)
                        } else {
                          // Fallback
                          date = new Date(blog.updatedAt as any)
                        }
                        
                        if (isNaN(date.getTime())) return 'Geçersiz tarih'
                        
                        return date.toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      } catch (error) {
                        return 'Tarih hatası'
                      }
                    })()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6 border border-white/20 shadow-modern-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-lg font-bold text-white mb-4">Hızlı İşlemler</h3>
            <div className="space-y-3">
              <Link
                href={`/dashboard/blogs/${blogId}/edit`}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all duration-200 border border-cyan-500/30"
              >
                <Edit className="h-4 w-4" />
                <span>Düzenle</span>
              </Link>
              <button
                onClick={openDeleteModal}
                disabled={isDeleting}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="h-4 w-4" />
                <span>Sil</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Yorumlar Bölümü */}
      <div className="mt-12">
        <BlogCommentsSection slug={blogId} />
      </div>

      {/* Blog Silme Onay Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && blog && (
          <div 
            className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 overflow-hidden"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
              zIndex: 9999
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeDeleteModal()
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-2xl p-6 border border-red-500/20 w-full max-w-md mx-4 sm:mx-0"
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25)',
                zIndex: 10000
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Blog Yazısını Sil</h3>
                  <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
                </div>
              </div>

              {/* Blog Bilgileri */}
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{blog.title}</h4>
                    <p className="text-sm text-neutral-400">{blog.excerpt}</p>
                    <p className="text-xs text-neutral-500">{blog.author} • {blog.category}</p>
                  </div>
                </div>
              </div>

              {/* Uyarı */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Uyarı</span>
                </div>
                <p className="text-sm text-red-300 mt-1">
                  Bu blog yazısı kalıcı olarak silinecek. Bu işlem geri alınamaz.
                </p>
              </div>

              {/* Butonlar */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  İptal
                </button>
                <button
                  onClick={confirmDeleteBlog}
                  disabled={isDeleting}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Siliniyor...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Sil</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}