"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  Tag,
  FolderOpen,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  FileText,
  CheckSquare,
  Square,
  Trash,
  AlertTriangle,
  Loader2,
  X,
  TrendingUp,
  BookOpen,
  Star
} from "lucide-react"
import { getAllBlogs, deleteBlog, BlogPost, BlogFilters } from "@/lib/blog-service"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function BlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null)
  
  // Toplu seçim state'leri
  const [selectedBlogs, setSelectedBlogs] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [warning, setWarning] = useState("")
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Modal açıldığında body scroll'unu engelle
  useEffect(() => {
    if (showDeleteModal || isBulkDeleteModalOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
      document.body.style.height = 'unset'
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
      document.body.style.height = 'unset'
    }
  }, [showDeleteModal, isBulkDeleteModalOpen])

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const blogsData = await getAllBlogs()
      setBlogs(blogsData)
    } catch (err) {
      setError("Bloglar yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  // İstatistikleri hesapla
  const stats = {
    total: blogs.length,
    published: blogs.filter(blog => blog.status === 'published').length,
    draft: blogs.filter(blog => blog.status === 'draft').length,
    archived: blogs.filter(blog => blog.status === 'archived').length,
    featured: blogs.filter(blog => blog.featured).length
  }

  // Toplu seçim fonksiyonları
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (isSelectMode) {
      setSelectedBlogs(new Set())
    }
  }

  const toggleBlogSelection = (blogId: string) => {
    setSelectedBlogs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(blogId)) {
        newSet.delete(blogId)
      } else {
        newSet.add(blogId)
      }
      return newSet
    })
  }

  const selectAllBlogs = () => {
    const allBlogIds = filteredBlogs.map(blog => blog.id!).filter(Boolean)
    setSelectedBlogs(new Set(allBlogIds))
  }

  const clearSelection = () => {
    setSelectedBlogs(new Set())
  }

  // Toplu silme
  const handleBulkDelete = () => {
    if (selectedBlogs.size === 0) return
    setIsBulkDeleteModalOpen(true)
  }

  const confirmBulkDelete = async () => {
    if (selectedBlogs.size === 0) return

    try {
      setIsDeleting(true)
      const blogIds = Array.from(selectedBlogs)
      
      for (const blogId of blogIds) {
        try {
          await deleteBlog(blogId)
        } catch (err) {
          // Blog silinirken hata oluştu - sessizce devam et
        }
      }
      
      setBlogs(blogs.filter(blog => !selectedBlogs.has(blog.id!)))
      setSelectedBlogs(new Set())
      setIsBulkDeleteModalOpen(false)
    } catch (error) {
      setError("Toplu silme işlemi sırasında hata oluştu")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteBlog = async (blogId: string) => {
    try {
      await deleteBlog(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      setShowDeleteModal(false)
      setBlogToDelete(null)
    } catch (err) {
      setError("Blog silinirken bir hata oluştu")
    }
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || blog.status === statusFilter
    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  // Pagination fonksiyonları
  const getTotalPages = () => {
    return Math.ceil(filteredBlogs.length / itemsPerPage)
  }

  const getPaginatedBlogs = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredBlogs.slice(startIndex, endIndex)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Sayfa değiştiğinde en üste scroll et
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categories = Array.from(new Set(blogs.map(blog => blog.category)))

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Tarih yok"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric"
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
        return <CheckCircle className="h-3 w-3" />
      case "draft":
        return <Clock className="h-3 w-3" />
      case "archived":
        return <XCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
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
            <p className="text-neutral-400">Bloglar yükleniyor...</p>
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
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-500/10 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Blog Yazıları
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Tüm blogları görüntüleyin, düzenleyin ve yönetin
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Selection Mode Controls */}
              {isSelectMode && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={selectAllBlogs}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200 text-sm whitespace-nowrap"
                  >
                    <CheckSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Tümünü Seç</span>
                    <span className="sm:hidden">Tümü</span>
                  </button>
                  <button
                    onClick={clearSelection}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-all duration-200 text-sm whitespace-nowrap"
                  >
                    <Square className="h-4 w-4" />
                    <span className="hidden sm:inline">Seçimi Temizle</span>
                    <span className="sm:hidden">Temizle</span>
                  </button>
                  {selectedBlogs.size > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm whitespace-nowrap"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="hidden sm:inline">Seçilenleri Sil ({selectedBlogs.size})</span>
                      <span className="sm:hidden">Sil ({selectedBlogs.size})</span>
                    </button>
                  )}
                </div>
              )}
              
              {/* Main Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ml-auto">
                <button
                  onClick={toggleSelectMode}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isSelectMode 
                      ? 'bg-cyan-500/30 text-cyan-300' 
                      : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                  }`}
                >
                  {isSelectMode ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                  <span>Seçim Modu</span>
                </button>
                
                <button
                  onClick={() => router.push('/dashboard/blogs/new')}
                  disabled={loading}
                  className="flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
                >
                  <Plus className="h-5 w-5" />
                  <span>Yeni Blog</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Toplam</p>
                  <p className="text-xl font-bold text-white">{stats.total}</p>
                </div>
                <FileText className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
            
            <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Yayınlandı</p>
                  <p className="text-xl font-bold text-green-400">{stats.published}</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
            
            <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Taslak</p>
                  <p className="text-xl font-bold text-yellow-400">{stats.draft}</p>
                </div>
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            
            <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Arşivlendi</p>
                  <p className="text-xl font-bold text-red-400">{stats.archived}</p>
                </div>
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            
            <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400">Öne Çıkan</p>
                  <p className="text-xl font-bold text-purple-400">{stats.featured}</p>
                </div>
                <Star className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="glass rounded-xl p-4 border border-red-500/20 mb-6" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Uyarı Mesajı */}
          {warning && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">Uyarı</span>
                </div>
                <button
                  onClick={() => setWarning("")}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-yellow-300 mt-1">{warning}</p>
            </div>
          )}

          {/* Filters */}
          <div className="glass rounded-xl p-6 border border-white/20 mb-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Blog ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <option value="all">Tüm Durumlar</option>
                <option value="published">Yayınlandı</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşivlendi</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Blog List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              [...Array(6)].map((_, index) => (
                <div key={index} className="glass rounded-xl p-6 border border-white/20 animate-pulse" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
                      <div>
                        <div className="h-4 bg-white/20 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-white/10 rounded w-20"></div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-6 h-6 bg-white/20 rounded"></div>
                      <div className="w-6 h-6 bg-white/20 rounded"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="h-3 bg-white/20 rounded w-16"></div>
                    <div className="h-3 bg-white/20 rounded w-20"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 h-8 bg-white/20 rounded-lg"></div>
                    <div className="flex-1 h-8 bg-white/20 rounded-lg"></div>
                  </div>
                </div>
              ))
            ) : (
              getPaginatedBlogs().map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass rounded-xl p-6 border border-white/20 overflow-hidden hover:shadow-modern transition-all duration-300 group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Blog Image - En üstte */}
                  {blog.image && (
                    <div className="mb-4 -mx-6 -mt-6">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-40 object-cover rounded-t-xl"
                      />
                    </div>
                  )}

                  {/* Content Area */}
                  <div className="space-y-4">
                    {/* Title and Author */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm text-neutral-400">{blog.author}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Status and Featured Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusColor(blog.status)}`}>
                        {getStatusIcon(blog.status)}
                        <span>{getStatusText(blog.status)}</span>
                      </div>
                      {blog.featured && (
                        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 text-xs font-medium">
                          <Star className="h-3 w-3" />
                          <span>Öne Çıkan</span>
                        </div>
                      )}
                      {(blog.views || 0) > 500 && (
                        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-orange-400/20 bg-orange-400/10 text-orange-400 text-xs font-medium">
                          <TrendingUp className="h-3 w-3" />
                          <span>Popüler</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-2.5 py-1 bg-white/10 text-neutral-400 rounded-full text-xs font-medium">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1.5 text-neutral-400">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">{blog.views || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-neutral-400">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{formatDate(blog.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isSelectMode && (
                          <button
                            onClick={() => toggleBlogSelection(blog.id!)}
                            className="flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all duration-200 hover:scale-110"
                            style={{
                              backgroundColor: selectedBlogs.has(blog.id!) ? '#06b6d4' : 'transparent',
                              borderColor: selectedBlogs.has(blog.id!) ? '#06b6d4' : '#6b7280'
                            }}
                          >
                            {selectedBlogs.has(blog.id!) && (
                              <CheckSquare className="h-3 w-3 text-white" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setBlogToDelete(blog.id!)
                            setShowDeleteModal(true)
                          }}
                          className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => router.push(`/dashboard/blogs/${blog.slug || blog.id}/view`)}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2.5 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Görüntüle</span>
                    </button>
                    <button 
                      onClick={() => router.push(`/dashboard/blogs/${blog.slug || blog.id}/edit`)}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2.5 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Düzenle</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Empty State */}
          {filteredBlogs.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="glass rounded-2xl shadow-modern p-12 border border-white/50 max-w-md mx-auto"
                   style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {searchTerm || statusFilter !== "all" || categoryFilter !== "all" 
                    ? "Blog bulunamadı" 
                    : "Henüz blog yok"}
                </h3>
                <p className="text-neutral-400 mb-6">
                  {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                    ? "Arama kriterlerinize uygun blog bulunamadı."
                    : "İlk blogunuzu oluşturmak için 'Yeni Blog' butonuna tıklayın"}
                </p>
                {!searchTerm && statusFilter === "all" && categoryFilter === "all" && (
                  <button
                    onClick={() => router.push('/dashboard/blogs/new')}
                    className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
                    style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
                  >
                    <Plus className="h-5 w-5" />
                    <span>Yeni Blog Ekle</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredBlogs.length > 0 && getTotalPages() > 1 && (
            <div className="mt-8 flex flex-col items-center space-y-4">
              {/* Sayfa Bilgisi */}
              <div className="text-sm text-neutral-400">
                Sayfa {currentPage} / {getTotalPages()}
                <span className="ml-2 text-cyan-400">
                  (Bu sayfada {getPaginatedBlogs().length} blog, toplam {filteredBlogs.length} blog)
                </span>
              </div>
            
              {/* Pagination Butonları */}
              <div className="flex items-center justify-center space-x-2 relative z-10">
                {/* Önceki Sayfa */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative z-20 ${
                    currentPage === 1
                      ? 'text-neutral-500 cursor-not-allowed bg-neutral-800/50'
                      : 'text-cyan-400 hover:bg-cyan-500/20 bg-neutral-800/80 hover:text-cyan-300'
                  }`}
                  style={{ border: 'none', outline: 'none', pointerEvents: 'auto' }}
                >
                  ← Önceki
                </button>
                
                {/* Sayfa Numaraları */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center relative z-20 ${
                        currentPage === page
                          ? 'bg-cyan-500 text-cyan-100 shadow-lg'
                          : 'text-neutral-300 hover:bg-neutral-700 hover:text-cyan-300 bg-neutral-800/80'
                      }`}
                      style={{ border: 'none', outline: 'none', pointerEvents: 'auto' }}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                {/* Sonraki Sayfa */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === getTotalPages()}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative z-20 ${
                    currentPage === getTotalPages()
                      ? 'text-neutral-500 cursor-not-allowed bg-neutral-800/50'
                      : 'text-cyan-400 hover:bg-cyan-500/20 bg-neutral-800/80 hover:text-cyan-300'
                  }`}
                  style={{ border: 'none', outline: 'none', pointerEvents: 'auto' }}
                >
                  Sonraki →
                </button>
              </div>
            </div>
          )}

          {/* Bulk Delete Confirmation Modal */}
          {isBulkDeleteModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass rounded-2xl p-6 border border-white/20 shadow-modern max-w-md w-full"
                style={{ 
                  background: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Trash className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Toplu Silme Onayı</h3>
                    <p className="text-sm text-neutral-400">Seçilen blogları silmek istediğinizden emin misiniz?</p>
                  </div>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Uyarı</span>
                  </div>
                  <p className="text-sm text-red-300 mt-1">
                    {selectedBlogs.size} blog silinecek. Bu işlem geri alınamaz.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setIsBulkDeleteModalOpen(false)}
                    className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    onClick={confirmBulkDelete}
                    disabled={isDeleting}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                    <span>{isDeleting ? 'Siliniyor...' : 'Sil'}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Single Blog Delete Confirmation Modal */}
          {showDeleteModal && blogToDelete && (
            <div 
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowDeleteModal(false)
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass rounded-2xl p-4 sm:p-6 border border-red-500/20 shadow-modern max-w-md w-full mx-4 sm:mx-0"
                style={{ background: 'rgba(15, 23, 42, 0.95)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Blogu Sil</h3>
                    <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Uyarı</span>
                  </div>
                  <p className="text-sm text-red-300 mt-1">
                    Bu blog kalıcı olarak silinecek. Bu işlem geri alınamaz.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    İptal
                  </button>
                  <button
                    onClick={() => blogToDelete && handleDeleteBlog(blogToDelete)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Sil</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}