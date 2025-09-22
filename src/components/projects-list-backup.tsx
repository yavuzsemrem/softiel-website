"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  Calendar,
  User,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  Briefcase,
  CheckSquare,
  Square,
  Trash,
  AlertTriangle,
  FileText
} from "lucide-react"
import Link from "next/link"
import { getProjects, deleteProject, deleteProjects, type Project as ProjectType } from "@/lib/project-service"

export function ProjectsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  // Modal state'leri
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<ProjectType | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Yeni state'ler blog listesi gibi
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set())
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    ongoing: 0,
    upcoming: 0
  })

  // Firestore'dan projeleri yükle
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        setError("")
        const result = await getProjects({})
        setProjects(result.projects)
        calculateStats(result.projects)
      } catch (error) {
        console.error('Error loading projects:', error)
        setError('Projeler yüklenirken bir hata oluştu')
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

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

  // Component unmount olduğunda scroll'u etkinleştir
  useEffect(() => {
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [])

  // İstatistikleri hesapla
  const calculateStats = (projectList: ProjectType[]) => {
    const newStats = {
      total: projectList.length,
      completed: projectList.filter(p => p.status === 'completed').length,
      ongoing: projectList.filter(p => p.status === 'ongoing').length,
      upcoming: projectList.filter(p => p.status === 'upcoming').length
    }
    setStats(newStats)
  }

  // Seçim modu fonksiyonları
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (isSelectMode) {
      setSelectedProjects(new Set())
    }
  }

  const selectAllProjects = () => {
    setSelectedProjects(new Set(filteredProjects.map(p => p.id)))
  }

  const clearSelection = () => {
    setSelectedProjects(new Set())
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
        // Başarılı silinen projeleri listeden çıkar
        setProjects(prev => prev.filter(p => !selectedProjects.has(p.id!)))
        calculateStats(projects.filter(p => !selectedProjects.has(p.id!)))
      }
      
      // Seçimleri temizle ve modal'ı kapat
      setSelectedProjects(new Set())
      setIsBulkDeleteModalOpen(false)
    } catch (error) {
      console.error('Bulk delete error:', error)
      setError('Toplu silme işlemi sırasında hata oluştu')
    } finally {
      setIsDeleting(false)
    }
  }

  const closeBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(false)
    setIsDeleting(false)
  }

  const toggleProjectSelection = (projectId: string) => {
    const newSelected = new Set(selectedProjects)
    if (newSelected.has(projectId)) {
      newSelected.delete(projectId)
    } else {
      newSelected.add(projectId)
    }
    setSelectedProjects(newSelected)
  }

  // Proje silme modalını aç
  const openDeleteModal = (project: ProjectType) => {
    setProjectToDelete(project)
    setIsDeleteModalOpen(true)
  }

  // Proje silme modalını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setProjectToDelete(null)
    setIsDeleting(false)
  }

  // Proje silme onayı
  const confirmDeleteProject = async () => {
    if (!projectToDelete) return

    try {
      setIsDeleting(true)
      await deleteProject(projectToDelete.id!)
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id))
      closeDeleteModal()
    } catch (error) {
      console.error('Error deleting project:', error)
      setError('Proje silinirken bir hata oluştu')
    } finally {
      setIsDeleting(false)
    }
  }

  const categories = ["Tümü", "Web Tasarım", "Web Geliştirme", "Mobil Uygulama", "E-ticaret", "SEO", "Branding"]

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Tarih formatı
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Tarih yok'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('tr-TR')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "ongoing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "upcoming":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "ongoing":
        return "Devam Ediyor"
      case "upcoming":
        return "Yakında"
      default:
        return "Bilinmiyor"
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto mb-4" />
          <p className="text-white text-lg">Projeler yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-12 w-12 text-red-500" />
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Projelerimiz
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base">
              Projelerinizi yönetin ve düzenleyin
            </p>
          </div>
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
              className="flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Proje</span>
          </Link>
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
            <Briefcase className="h-6 w-6 text-cyan-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400">Tamamlandı</p>
              <p className="text-xl font-bold text-green-400">{stats.completed}</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400">Devam Ediyor</p>
              <p className="text-xl font-bold text-yellow-400">{stats.ongoing}</p>
            </div>
            <Clock className="h-6 w-6 text-yellow-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400">Yakında</p>
              <p className="text-xl font-bold text-blue-400">{stats.upcoming}</p>
            </div>
            <AlertCircle className="h-6 w-6 text-blue-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-400">Öne Çıkan</p>
              <p className="text-xl font-bold text-purple-400">{projects.filter(p => p.featured).length}</p>
                    </div>
            <Star className="h-6 w-6 text-purple-400" />
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
            <option value="completed">Tamamlandı</option>
            <option value="ongoing">Devam Ediyor</option>
            <option value="upcoming">Yakında</option>
          </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="all">Tüm Kategoriler</option>
                        {categories.map(category => (
              <option key={category} value={category === "Tümü" ? "all" : category}>{category}</option>
                  ))}
                </select>
                    </div>
                  </div>


      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`group glass rounded-xl p-6 border border-white/20 overflow-hidden hover:shadow-modern transition-all duration-300 ${
              isSelectMode ? 'cursor-pointer' : ''
            }`}
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            onClick={isSelectMode ? () => toggleProjectSelection(project.id!) : undefined}
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
                <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${
                  project.status === 'completed' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
                  project.status === 'ongoing' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' :
                  'text-blue-400 bg-blue-400/10 border-blue-400/20'
                }`}>
                  {getStatusIcon(project.status)}
                  <span>{getStatusText(project.status)}</span>
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
                    onClick={(e) => {
                      e.stopPropagation()
                      openDeleteModal(project)
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
              <Link
                href={`/content-management-system-2024/projects/${project.slug || project.id}/view`}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2.5 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <Eye className="h-4 w-4" />
                <span>Görüntüle</span>
              </Link>
              <Link
                href={`/content-management-system-2024/projects/${project.slug || project.id}/edit`}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2.5 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <Edit className="h-4 w-4" />
                <span>Düzenle</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Proje Bulunamadı
          </h3>
          <p className="text-neutral-400 mb-6 max-w-md mx-auto">
            Aradığınız kriterlere uygun proje bulunamadı. Filtreleri değiştirmeyi deneyin.
          </p>
          <button
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setCategoryFilter("all")
            }}
            className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
            style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
          >
            <span>Filtreleri Sıfırla</span>
          </button>
        </motion.div>
      )}

      {/* Proje Silme Onay Modal */}
      <AnimatePresence>
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

      {/* Toplu Silme Onay Modal */}
      <AnimatePresence>
        {isBulkDeleteModalOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeBulkDeleteModal()
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
                  <Trash className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Projeleri Sil</h3>
                  <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
                </div>
              </div>

              <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{selectedProjects.size} Proje Seçildi</h4>
                    <p className="text-sm text-neutral-400">Seçilen projeler kalıcı olarak silinecek</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Uyarı</span>
                </div>
                <p className="text-sm text-red-300 mt-1">
                  Seçilen {selectedProjects.size} proje kalıcı olarak silinecek. Bu işlem geri alınamaz.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={closeBulkDeleteModal}
                  className="px-4 py-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
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
      </AnimatePresence>
    </div>
  )
}
