"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Search,
  Filter,
  Plus,
  FileText,
  Grid,
  List,
  SortAsc,
  Heart,
  MessageCircle,
  Clock,
  TrendingUp,
  BookOpen,
  ChevronDown,
  X,
  Loader2,
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  Square,
  Trash,
  AlertTriangle
} from "lucide-react"
import { getBlogs, deleteBlog, deleteBlogs, getBlogStats, BlogPost } from "@/lib/blog-service"
import { useToast } from "@/components/toast"


export function BlogList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [selectedStatus, setSelectedStatus] = useState("Tümü")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("date")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  
  // Toplu seçim state'leri
  const [selectedBlogs, setSelectedBlogs] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Tek blog silme state'leri
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null)
  const { showToast } = useToast()

  const categories = ["Tümü", "Web Tasarım", "SEO", "Teknoloji", "E-ticaret", "Mobil", "Pazarlama", "Web Geliştirme", "Güvenlik"]
  const statuses = ["Tümü", "Yayınlandı", "Taslak", "Arşivlendi"]
  const sortOptions = [
    { value: "date", label: "Tarih" },
    { value: "views", label: "Görüntülenme" },
    { value: "likes", label: "Beğeni" },
    { value: "title", label: "Başlık" }
  ]

  // Tüm tagları topla
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])))

  // Blog verilerini yükle
  useEffect(() => {
    loadBlogs()
    loadStats()
  }, [])

  const loadBlogs = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Önce mevcut blogları temizle
      setBlogs([])
      
      const filters = {
        category: selectedCategory !== "Tümü" ? selectedCategory : undefined,
        status: selectedStatus !== "Tümü" ? 
          (selectedStatus === "Yayınlandı" ? "published" : 
           selectedStatus === "Taslak" ? "draft" : 
           selectedStatus === "Arşivlendi" ? "archived" : undefined) : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        search: searchQuery || undefined
      }

      const result = await getBlogs(filters, { page: 1, limit: 1000 })
      
      setBlogs(result.blogs)
      
      // Toplam sayfa sayısını hesapla
      const totalPages = Math.ceil(result.blogs.length / postsPerPage)
      setTotalPages(totalPages)
      
      // İlk sayfaya dön
      setCurrentPage(1)
    } catch (err) {
      setError("Bloglar yüklenirken bir hata oluştu")
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const statsData = await getBlogStats()
      setStats(statsData)
    } catch (err) {
      // İstatistik yükleme hatası sessizce geç
    }
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
      const result = await deleteBlogs(blogIds)
      
      if (result.success > 0) {
        showToast({ 
          title: 'Başarılı', 
          message: `${result.success} blog silindi${result.failed > 0 ? `, ${result.failed} blog silinemedi` : ''}`, 
          type: 'success' 
        })
      }
      
      if (result.failed > 0) {
        showToast({ 
          title: 'Hata', 
          message: `${result.failed} blog silinemedi`, 
          type: 'error' 
        })
      }
      
      // Seçimleri temizle ve sayfayı yenile
      setSelectedBlogs(new Set())
      setIsBulkDeleteModalOpen(false)
      loadBlogs()
      loadStats()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Toplu silme işlemi sırasında hata oluştu', type: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  // Filtreler değiştiğinde blogları yeniden yükle
  useEffect(() => {
    if (!loading) {
      loadBlogs()
    }
  }, [selectedCategory, selectedStatus, selectedTags, searchQuery])

  // Filtreler değiştiğinde ilk sayfaya dön
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedStatus, selectedTags, searchQuery])

  // Modal açıkken scroll engelleme
  useEffect(() => {
    if (isDeleteModalOpen || isBulkDeleteModalOpen) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY
      
      // Body'yi sabitle
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Cleanup function
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isDeleteModalOpen, isBulkDeleteModalOpen])

  // Blog silme modal'ını aç
  const openDeleteModal = (blog: BlogPost) => {
    setBlogToDelete(blog)
    setIsDeleteModalOpen(true)
  }

  // Blog silme modal'ını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setBlogToDelete(null)
  }

  // Blog silme işlemini onayla
  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return

    try {
      setIsDeleting(true)
      await deleteBlog(blogToDelete.id!)
      setBlogs(prev => prev.filter(blog => blog.id !== blogToDelete.id))
      loadStats() // İstatistikleri güncelle
      showToast({ 
        title: 'Başarılı', 
        message: 'Blog yazısı başarıyla silindi', 
        type: 'success' 
      })
      closeDeleteModal()
    } catch (err) {
      showToast({ 
        title: 'Hata', 
        message: 'Blog silinirken bir hata oluştu', 
        type: 'error' 
      })
    } finally {
      setIsDeleting(false)
    }
  }


  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchQuery === "" || 
                         blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "Tümü" || blog.category === selectedCategory
    
    const matchesStatus = selectedStatus === "Tümü" || 
                         (selectedStatus === "Yayınlandı" && blog.status === "published") ||
                         (selectedStatus === "Taslak" && blog.status === "draft") ||
                         (selectedStatus === "Arşivlendi" && blog.status === "archived")
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => (blog.tags || []).includes(tag))
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTags
  }).sort((a, b) => {
    switch (sortBy) {
      case "views":
        return (b.views || 0) - (a.views || 0)
      case "likes":
        return (b.likes || 0) - (a.likes || 0)
      case "title":
        return a.title.localeCompare(b.title)
      case "date":
      default:
        return new Date(b.createdAt?.toDate?.() || b.createdAt || 0).getTime() - 
               new Date(a.createdAt?.toDate?.() || a.createdAt || 0).getTime()
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "draft":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "archived":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Tümü")
    setSelectedStatus("Tümü")
    setSelectedTags([])
    setCurrentPage(1)
  }

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Mevcut sayfadaki blogları hesapla
  const getCurrentPageBlogs = () => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return filteredBlogs.slice(startIndex, endIndex)
  }


  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-neutral-400">Toplam Yazı</div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">{stats.published}</div>
              <div className="text-xs text-neutral-400">Yayınlandı</div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}>
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{stats.draft}</div>
              <div className="text-xs text-neutral-400">Taslak</div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #f59e0b, #d97706)' }}>
              <Edit className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-400">{stats.archived}</div>
              <div className="text-xs text-neutral-400">Arşivlendi</div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #6b7280, #374151)' }}>
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="space-y-6">
        {/* Search and Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-80 lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-cyan-400 z-10" />
            <input
              type="text"
              placeholder="Blog ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 backdrop-blur-lg text-lg"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          {/* Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-6 py-4 rounded-2xl text-white font-medium transition-all duration-300"
            style={{ 
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
              boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">Filtreler</span>
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </div>
          </motion.button>
        </div>

        {/* Selection Controls Row */}
        {isSelectMode && (
          <div className="p-4 glass rounded-xl border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={selectAllBlogs}
                className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200 text-sm"
              >
                <CheckSquare className="h-4 w-4" />
                <span>Tümünü Seç</span>
              </button>
              <button
                onClick={clearSelection}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-all duration-200 text-sm"
              >
                <Square className="h-4 w-4" />
                <span>Seçimi Temizle</span>
              </button>
              {selectedBlogs.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm"
                >
                  <Trash className="h-4 w-4" />
                  <span>Seçilenleri Sil ({selectedBlogs.size})</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* View Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleSelectMode}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                isSelectMode 
                  ? 'bg-cyan-500/30 text-cyan-300' 
                  : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
              }`}
              style={{ background: isSelectMode ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255, 255, 255, 0.1)' }}
            >
              {isSelectMode ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
              <span className="hidden sm:inline">{isSelectMode ? 'Seçim Modu' : 'Seçim Modu'}</span>
            </button>
            
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 appearance-none cursor-pointer border border-white/20 pr-8"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex glass rounded-xl border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-l-xl transition-all duration-200 ${
                  viewMode === "grid" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-r-xl transition-all duration-200 ${
                  viewMode === "list" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* New Blog Button */}
          <Link
            href="/content-management-system-2024/blogs/new"
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl w-full lg:w-auto"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Blog</span>
          </Link>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative"
            >
              {/* Filter Panel Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-purple-500/5 rounded-2xl"></div>
              
              <div className="relative glass rounded-2xl p-8 border border-white/10 backdrop-blur-xl"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                     boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                      <label className="text-sm font-semibold text-white uppercase tracking-wider">Kategori</label>
                    </div>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 appearance-none cursor-pointer text-sm font-medium"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {categories.map(category => (
                          <option key={category} value={category} className="bg-slate-800 text-white">
                            {category}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-cyan-400" />
                      </div>
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <label className="text-sm font-semibold text-white uppercase tracking-wider">Durum</label>
                    </div>
                    <div className="relative">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 appearance-none cursor-pointer text-sm font-medium"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {statuses.map(status => (
                          <option key={status} value={status} className="bg-slate-800 text-white">
                            {status}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-purple-400" />
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <motion.button
                      onClick={clearFilters}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full px-6 py-4 rounded-xl text-neutral-400 hover:text-white transition-all duration-300 overflow-hidden"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-2">
                        <X className="h-4 w-4" />
                        <span className="font-medium">Filtreleri Temizle</span>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="mt-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                    <label className="text-sm font-semibold text-white uppercase tracking-wider">Etiketler</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <motion.button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          selectedTags.includes(tag)
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
                            : "bg-white/10 text-neutral-400 hover:text-white hover:bg-white/20"
                        }`}
                        style={{ 
                          boxShadow: selectedTags.includes(tag) 
                            ? '0 4px 16px rgba(6, 182, 212, 0.2)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            <span className="text-white text-lg">Bloglar yükleniyor...</span>
          </div>
        </div>
      )}

      {/* Blog List */}
      {!loading && (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "grid grid-cols-1 gap-4"}>
          <AnimatePresence>
          {getCurrentPageBlogs().map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative flex flex-col ${
                viewMode === "grid" 
                  ? "glass rounded-2xl border border-white/20 backdrop-blur-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 h-full" 
                  : "glass rounded-xl border border-white/20 backdrop-blur-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
              }`}
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Selection Checkbox */}
              {isSelectMode && (
                <div className="absolute top-4 left-4 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBlogSelection(blog.id!)
                    }}
                    className="flex items-center justify-center w-6 h-6 rounded border-2 transition-all duration-200 hover:scale-110"
                    style={{
                      backgroundColor: selectedBlogs.has(blog.id!) ? '#06b6d4' : 'transparent',
                      borderColor: selectedBlogs.has(blog.id!) ? '#06b6d4' : '#6b7280'
                    }}
                  >
                    {selectedBlogs.has(blog.id!) && (
                      <CheckSquare className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>
              )}

              {/* Blog Content Link */}
              <Link
                href={`/content-management-system-2024/blogs/${blog.slug || blog.id}?from=${encodeURIComponent(window.location.pathname)}`}
                className="block flex-1"
              >

              {/* Featured Badge */}
              {blog.featured && (
                <div className={`absolute top-4 z-10 ${isSelectMode ? 'left-12' : 'left-4'}`}>
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    Öne Çıkan
                  </span>
                </div>
              )}

              {/* Popular Badge */}
              {blog.views && blog.views > 500 && (
                <div className={`absolute top-4 z-10 ${isSelectMode ? (blog.featured ? 'left-32' : 'left-12') : (blog.featured ? 'left-28' : 'left-4')}`}>
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    Popüler
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-neutral-500 mx-auto mb-2" />
                      <p className="text-neutral-500 text-sm">Görsel Yok</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(blog.status)}`}>
                    {getStatusText(blog.status)}
                  </span>
              </div>

            </div>

            {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Category */}
              <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full border border-cyan-500/30">
                    {blog.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-white/10 text-neutral-400 text-xs rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="text-xs text-neutral-500">
                      +{blog.tags.length - 3} daha
                    </span>
                  )}
              </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span className="text-xs">{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs">
                        {blog.createdAt ? (
                          blog.createdAt.toDate ? 
                            blog.createdAt.toDate().toLocaleDateString('tr-TR') : 
                            new Date(blog.createdAt).toLocaleDateString('tr-TR')
                        ) : 'Tarih yok'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">{blog.readTime}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-xs">{blog.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">{blog.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">{blog.comments}</span>
                    </div>
                  </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.location.href = `/content-management-system-2024/blogs/${blog.id}?from=${encodeURIComponent(window.location.pathname)}`
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all duration-200 text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Görüntüle</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.location.href = `/content-management-system-2024/blogs/${blog.id}/edit?from=${encodeURIComponent(window.location.pathname)}`
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all duration-200 text-sm font-medium"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Düzenle</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openDeleteModal(blog)
                    }}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
              </div>
            </div>
              </Link>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State */}
      {getCurrentPageBlogs().length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="glass rounded-2xl shadow-modern p-12 border border-white/20 backdrop-blur-lg max-w-lg mx-auto"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Blog bulunamadı
            </h3>
            <p className="text-neutral-400 mb-8 text-lg">
              Arama kriterlerinize uygun blog yazısı bulunamadı. Farklı filtreler deneyebilir veya yeni bir blog yazısı oluşturabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={clearFilters}
                className="px-6 py-3 text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 border border-white/20"
              >
                Filtreleri Temizle
              </button>
              <Link
                href="/content-management-system-2024/blogs/new"
                className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
              <Plus className="h-5 w-5" />
              <span>Yeni Blog Ekle</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Summary */}
      {filteredBlogs.length > 0 && (
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <div className="flex items-center space-x-2">
            <span>{filteredBlogs.length} blog yazısı bulundu</span>
            <span className="text-neutral-500">•</span>
            <span>Sayfa {currentPage} / {totalPages}</span>
            {(searchQuery || selectedCategory !== "Tümü" || selectedStatus !== "Tümü" || selectedTags.length > 0) && (
              <>
                <span className="text-neutral-500">•</span>
                <button
                  onClick={clearFilters}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Filtreleri temizle
                </button>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span>Görünüm: {viewMode === "grid" ? "Kart" : "Liste"}</span>
            <span>Sıralama: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="glass rounded-2xl p-4 shadow-modern border border-white/20 backdrop-blur-lg"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-4 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Önceki</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                      page === currentPage
                        ? 'text-white shadow-lg'
                        : 'glass text-white hover:bg-white/10'
                    }`}
                    style={page === currentPage 
                      ? { background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }
                      : { background: 'rgba(255, 255, 255, 0.1)' }
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-4 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <span>Sonraki</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-6 border border-white/20 shadow-modern max-w-md w-full"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <Trash className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Toplu Silme Onayı</h3>
                <p className="text-sm text-neutral-400">Seçilen blog yazılarını silmek istediğinizden emin misiniz?</p>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-sm text-red-300 mt-1">
                {selectedBlogs.size} blog yazısı silinecek. Bu işlem geri alınamaz.
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
      {isDeleteModalOpen && blogToDelete && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-hidden"
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
            className="glass rounded-2xl p-4 sm:p-6 border border-red-500/20 shadow-modern max-w-md w-full mx-4 sm:mx-0"
            style={{ background: 'rgba(15, 23, 42, 0.95)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Blog Yazısını Sil</h3>
                <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
              </div>
            </div>

            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{blogToDelete.title}</h4>
                  <p className="text-sm text-neutral-400">{blogToDelete.excerpt}</p>
                </div>
              </div>
            </div>

            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-sm text-red-300 mt-1">
                Bu blog yazısı kalıcı olarak silinecek. Bu işlem geri alınamaz.
              </p>
            </div>

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
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                <span>{isDeleting ? 'Siliniyor...' : 'Sil'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
