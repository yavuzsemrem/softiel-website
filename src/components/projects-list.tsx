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
  AlertTriangle,
  Briefcase,
  Star,
  ExternalLink,
  Github
} from "lucide-react"
import { getProjects, deleteProject, deleteProjects, type Project as ProjectType } from "@/lib/project-service"
import { useToast } from "@/components/toast"

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [selectedStatus, setSelectedStatus] = useState("Tümü")
  const [sortBy, setSortBy] = useState("date")
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    ongoing: 0,
    upcoming: 0
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  
  // Toplu seçim state'leri
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Tek proje silme state'leri
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<ProjectType | null>(null)
  const { showToast } = useToast()

  const categories = ["Tümü", "Web Tasarım", "Web Geliştirme", "Mobil Uygulama", "E-ticaret", "SEO", "Branding", "Otomasyon", "Yapay Zeka"]
  const statuses = ["Tümü", "Tamamlandı", "Devam Ediyor", "Planlanmış"]
  const sortOptions = [
    { value: "date", label: "Tarih" },
    { value: "views", label: "Görüntülenme" },
    { value: "likes", label: "Beğeni" },
    { value: "title", label: "Başlık" }
  ]


  // Proje verilerini yükle
  useEffect(() => {
    loadProjects()
    loadStats()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Önce mevcut projeleri temizle
      setProjects([])
      
      const filters = {
        category: selectedCategory !== "Tümü" ? selectedCategory : undefined,
        status: selectedStatus !== "Tümü" ? 
          (selectedStatus === "Tamamlandı" ? "completed" : 
           selectedStatus === "Devam Ediyor" ? "ongoing" : 
           selectedStatus === "Planlanmış" ? "upcoming" : undefined) : undefined,
        search: searchQuery || undefined,
        sortBy: sortBy as any
      }
      
      const result = await getProjects(filters, projectsPerPage, currentPage > 1 ? (currentPage - 1) * projectsPerPage : undefined)
      
      setProjects(result.projects)
      setTotalPages(Math.ceil(result.projects.length / projectsPerPage))
    } catch (err) {
      console.error('Error loading projects:', err)
      setError('Projeler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const result = await getProjects({})
      const projectList = result.projects
      
      setStats({
        total: projectList.length,
        completed: projectList.filter(p => p.status === 'completed').length,
        ongoing: projectList.filter(p => p.status === 'ongoing').length,
        upcoming: projectList.filter(p => p.status === 'upcoming').length
      })
    } catch (err) {
      // İstatistik yükleme hatası sessizce geç
    }
  }

  // Toplu seçim fonksiyonları
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (isSelectMode) {
      setSelectedProjects(new Set())
    }
  }

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const selectAllProjects = () => {
    const allProjectIds = filteredProjects.map(project => project.id!).filter(Boolean)
    setSelectedProjects(new Set(allProjectIds))
  }

  const clearSelection = () => {
    setSelectedProjects(new Set())
  }

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Mevcut sayfadaki projeleri hesapla
  const getCurrentPageProjects = () => {
    const startIndex = (currentPage - 1) * projectsPerPage
    const endIndex = startIndex + projectsPerPage
    return filteredProjects.slice(startIndex, endIndex)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Tümü")
    setSelectedStatus("Tümü")
    setCurrentPage(1)
  }

  // Toplu silme
  const handleBulkDelete = () => {
    if (selectedProjects.size === 0) return
    setIsBulkDeleteModalOpen(true)
  }

  const confirmBulkDelete = async () => {
    if (selectedProjects.size === 0) return

    try {
      setIsDeleting(true)
      const projectIds = Array.from(selectedProjects)
      const result = await deleteProjects(projectIds)
      
      if (result.success > 0) {
        showToast({ 
          title: 'Başarılı', 
          message: `${result.success} proje silindi${result.failed > 0 ? `, ${result.failed} proje silinemedi` : ''}`, 
          type: 'success' 
        })
      }
      
      if (result.failed > 0) {
        showToast({ 
          title: 'Hata', 
          message: `${result.failed} proje silinemedi`, 
          type: 'error' 
        })
      }
      
      // Seçimleri temizle ve sayfayı yenile
      setSelectedProjects(new Set())
      setIsBulkDeleteModalOpen(false)
      loadProjects()
      loadStats()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Toplu silme işlemi sırasında hata oluştu', type: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  // Filtreler değiştiğinde projeleri yeniden yükle
  useEffect(() => {
    if (!loading) {
      loadProjects()
    }
  }, [selectedCategory, selectedStatus, searchQuery])

  // Filtreler değiştiğinde ilk sayfaya dön
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedStatus, searchQuery])

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

  // Proje silme modal'ını aç
  const openDeleteModal = (project: ProjectType) => {
    setProjectToDelete(project)
    setIsDeleteModalOpen(true)
  }

  // Proje silme modal'ını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setProjectToDelete(null)
  }

  // Proje silme işlemini onayla
  const confirmDeleteProject = async () => {
    if (!projectToDelete) return

    try {
      setIsDeleting(true)
      await deleteProject(projectToDelete.id!)
      setProjects(prev => prev.filter(project => project.id !== projectToDelete.id))
      loadStats() // İstatistikleri güncelle
      showToast({ 
        title: 'Başarılı', 
        message: 'Proje başarıyla silindi', 
        type: 'success' 
      })
      closeDeleteModal()
    } catch (err) {
      showToast({ 
        title: 'Hata', 
        message: 'Proje silinirken bir hata oluştu', 
        type: 'error' 
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "Tümü" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "Tümü" || 
      (selectedStatus === "Tamamlandı" && project.status === "completed") ||
      (selectedStatus === "Devam Ediyor" && project.status === "ongoing") ||
      (selectedStatus === "Planlanmış" && project.status === "upcoming")
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Tarih yok"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "ongoing":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "upcoming":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckSquare className="h-4 w-4" />
      case "ongoing":
        return <Clock className="h-4 w-4" />
      case "upcoming":
        return <Calendar className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
          <span className="text-white">Projeler yükleniyor...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <X className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Hata Oluştu</h3>
        <p className="text-neutral-400 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
          style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
        >
          <span>Tekrar Dene</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Projelerimiz</h1>
          <p className="text-neutral-400 text-sm sm:text-base">
            Tüm projeleri görüntüleyin, düzenleyin ve yönetin
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Selection Mode Controls */}
          {isSelectMode && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={selectAllProjects}
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
              {selectedProjects.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm whitespace-nowrap"
                >
                  <Trash className="h-4 w-4" />
                  <span className="hidden sm:inline">Seçilenleri Sil ({selectedProjects.size})</span>
                  <span className="sm:hidden">Sil ({selectedProjects.size})</span>
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
            
            <Link
              href="/content-management-system-2024/projects/new"
              className="flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 whitespace-nowrap"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <Plus className="h-5 w-5" />
              <span>Yeni Proje</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-neutral-400">Toplam Proje</div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-xs text-neutral-400">Tamamlandı</div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}>
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.ongoing}</div>
              <div className="text-xs text-neutral-400">Devam Ediyor</div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #3b82f6, #1d4ed8)' }}>
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{stats.upcoming}</div>
              <div className="text-xs text-neutral-400">Planlanmış</div>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #f59e0b, #d97706)' }}>
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-6 border border-white/20 mb-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Proje ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="Tümü">Tüm Durumlar</option>
            <option value="Tamamlandı">Tamamlandı</option>
            <option value="Devam Ediyor">Devam Ediyor</option>
            <option value="Planlanmış">Planlanmış</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="Tümü">Tüm Kategoriler</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

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
            <span className="text-white text-lg">Projeler yükleniyor...</span>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {getCurrentPageProjects().map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-6 border border-white/20 overflow-hidden hover:shadow-modern transition-all duration-300 group"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Project Image - En üstte */}
              {project.image && (
                <div className="mb-4 -mx-6 -mt-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                </div>
              )}

              {/* Content Area */}
              <div className="space-y-4">
                {/* Title and Client */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-neutral-400" />
                    <span className="text-sm text-neutral-400">{project.client}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Status and Featured Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span>
                      {project.status === 'completed' ? 'Tamamlandı' : 
                       project.status === 'ongoing' ? 'Devam Ediyor' : 'Planlanmış'}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 text-xs font-medium">
                      <Star className="h-3 w-3" />
                      <span>Öne Çıkan</span>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 bg-white/10 text-neutral-400 rounded-full text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats Row */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1.5 text-neutral-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{formatDate(project.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-neutral-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{project.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isSelectMode && (
                      <button
                        onClick={() => toggleProjectSelection(project.id!)}
                        className="flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all duration-200 hover:scale-110"
                        style={{
                          backgroundColor: selectedProjects.has(project.id!) ? '#06b6d4' : 'transparent',
                          borderColor: selectedProjects.has(project.id!) ? '#06b6d4' : '#6b7280'
                        }}
                      >
                        {selectedProjects.has(project.id!) && (
                          <CheckSquare className="h-3 w-3 text-white" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => openDeleteModal(project)}
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
                  onClick={() => window.location.href = `/content-management-system-2024/projects/${project.slug || project.id}/view?from=${encodeURIComponent(window.location.pathname)}`}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2.5 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <Eye className="h-4 w-4" />
                  <span>Görüntüle</span>
                </button>
                <button 
                  onClick={() => window.location.href = `/content-management-system-2024/projects/${project.slug || project.id}/edit?from=${encodeURIComponent(window.location.pathname)}`}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2.5 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <Edit className="h-4 w-4" />
                  <span>Düzenle</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {getCurrentPageProjects().length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="glass rounded-2xl shadow-modern p-12 border border-white/20 backdrop-blur-lg max-w-lg mx-auto"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-10 w-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Proje bulunamadı
            </h3>
            <p className="text-neutral-400 mb-8 text-lg">
              Arama kriterlerinize uygun proje bulunamadı. Farklı filtreler deneyebilir veya yeni bir proje oluşturabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={clearFilters}
                className="px-6 py-3 text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 border border-white/20"
              >
                Filtreleri Temizle
              </button>
              <Link
                href="/content-management-system-2024/projects/new"
                className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Plus className="h-5 w-5" />
                <span>Yeni Proje Ekle</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Summary */}
      {filteredProjects.length > 0 && (
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <div className="flex items-center space-x-2">
            <span>{filteredProjects.length} proje bulundu</span>
            <span className="text-neutral-500">•</span>
            <span>Sayfa {currentPage} / {totalPages}</span>
            {(searchQuery || selectedCategory !== "Tümü" || selectedStatus !== "Tümü") && (
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
            <span>Görünüm: Kart</span>
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

      {/* Single Project Delete Confirmation Modal */}
      {isDeleteModalOpen && projectToDelete && (
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
                <h3 className="text-lg font-semibold text-white">Projeyi Sil</h3>
                <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
              </div>
            </div>

            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{projectToDelete.title}</h4>
                  <p className="text-sm text-neutral-400">{projectToDelete.description}</p>
                </div>
              </div>
            </div>

            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-sm text-red-300 mt-1">
                Bu proje kalıcı olarak silinecek. Bu işlem geri alınamaz.
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
                onClick={confirmDeleteProject}
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
                <p className="text-sm text-neutral-400">Seçilen projeleri silmek istediğinizden emin misiniz?</p>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-sm text-red-300 mt-1">
                {selectedProjects.size} proje silinecek. Bu işlem geri alınamaz.
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
    </div>
  )
}