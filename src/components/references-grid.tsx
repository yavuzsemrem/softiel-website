"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Eye, Calendar, User, Tag, ArrowRight, Star, Award, Zap, Loader2, ArrowLeft, Briefcase, XCircle } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"
import Link from "next/link"
import { getProjects, type Project as ProjectType } from "@/lib/project-service"
import { ReferencesFilter } from "@/components/references-filter"

interface Project {
  id?: string
  slug?: string
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  client: string
  createdAt: any
  endDate?: string
  status: "completed" | "ongoing" | "upcoming"
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  testimonial?: {
    text: string
    author: string
    position: string
  }
}

interface ReferencesGridProps {
  filters?: {
    category: string
    search: string
    sortBy: string
  }
  onProjectCountsChange?: (counts: { [category: string]: number }, total: number) => void
}

export function ReferencesGrid({ filters = { category: "all", search: "", sortBy: "newest" }, onProjectCountsChange }: ReferencesGridProps) {
  const { t } = useI18n()
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [projectCounts, setProjectCounts] = useState<{ [category: string]: number }>({})
  
  // Paging state'leri
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(9) // Blog sayfasındaki gibi 9 proje per sayfa
  
  // Filtreler için local state
  const [localFilters, setLocalFilters] = useState(filters)

  // Firestore'dan projeleri yükle
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        setError("")
        const result = await getProjects({}, 1000) // Büyük bir sayı ile tüm projeleri al
        setProjects(result.projects as Project[])
      } catch (error) {
        setError('Projeler yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Tarih formatı
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Tarih yok'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('tr-TR')
  }

  useEffect(() => {
    let filtered = [...projects]

    // Category filter
    if (localFilters.category !== "all") {
      filtered = filtered.filter(project => project.category === localFilters.category)
    }

    // Search filter
    if (localFilters.search) {
      const searchTerm = localFilters.search.toLowerCase()
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
        project.client.toLowerCase().includes(searchTerm)
      )
    }

    // Sort
    switch (localFilters.sortBy) {
      case "newest":
        filtered.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })
        break
      case "oldest":
        filtered.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
          return dateA.getTime() - dateB.getTime()
        })
        break
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "category":
        filtered.sort((a, b) => a.category.localeCompare(b.category))
        break
    }

    setFilteredProjects(filtered)
  }, [projects, localFilters])

  // Kategori sayılarını hesapla
  useEffect(() => {
    const counts: { [category: string]: number } = {}
    projects.forEach(project => {
      counts[project.category] = (counts[project.category] || 0) + 1
    })
    setProjectCounts(counts)
    
    // Parent'a proje sayılarını gönder (kategori kodlarıyla)
    if (onProjectCountsChange) {
      onProjectCountsChange(counts, projects.length)
    }
  }, [projects]) // onProjectCountsChange dependency'sini kaldırdım

  // Paging hesaplamaları
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtre değiştirme fonksiyonu
  const handleFilterChange = (newFilters: typeof localFilters) => {
    setLocalFilters(newFilters)
  }

  // Filtreler değiştiğinde ilk sayfaya dön
  useEffect(() => {
    setCurrentPage(1)
  }, [localFilters.category, localFilters.search, localFilters.sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "from-green-500 to-emerald-500"
      case "ongoing":
        return "from-blue-500 to-cyan-500"
      case "upcoming":
        return "from-orange-500 to-yellow-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return t('references.grid.status.completed')
      case "ongoing":
        return t('references.grid.status.ongoing')
      case "upcoming":
        return t('references.grid.status.upcoming')
      default:
        return t('references.grid.status.completed')
    }
  }

  if (loading) {
    return (
      <section id="references-grid" className="relative py-16 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto mb-4" />
              <p className="text-neutral-400">Projeler yükleniyor...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="references-grid" className="relative py-16 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    )
  }

  return (
    <section id="references-grid" className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Briefcase className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Proje Portföyümüz
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Proje{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Portföyümüz
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Web tasarımından mobil uygulamalara, e-ticaret çözümlerinden yapay zeka entegrasyonlarına kadar geniş bir yelpazede gerçekleştirdiğimiz projelerimizi keşfedin. Her proje, müşteri memnuniyeti ve teknolojik mükemmellik odaklı yaklaşımımızın bir yansımasıdır.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <ReferencesFilter 
            onFilterChange={handleFilterChange} 
            projectCounts={projectCounts}
            totalProjects={projects.length}
          />
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${localFilters.category}-${localFilters.search}-${localFilters.sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group glass rounded-2xl shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:shadow-modern-lg transition-all duration-300 overflow-hidden"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <Link 
                  href={`/tr/projelerimiz/${project.slug || project.id}`} 
                  className="block"
                >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-modern bg-gradient-to-r ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-modern bg-gradient-to-r from-yellow-500 to-orange-500">
                        <Star className="h-3 w-3 mr-1" />
                        {t('references.grid.featured')}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="inline-flex items-center space-x-1 px-4 py-2 bg-white/90 dark:bg-gray-800/90 text-neutral-900 dark:text-white rounded-xl font-medium text-sm shadow-modern hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        <span>{t('references.grid.viewProject')}</span>
                      </motion.div>
                      {project.liveUrl && project.liveUrl.startsWith('http') && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="inline-flex items-center space-x-1 px-4 py-2 bg-white/90 dark:bg-gray-800/90 text-neutral-900 dark:text-white rounded-xl font-medium text-sm shadow-modern hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Canlı Site</span>
                        </motion.button>
                      )}
                      {project.githubUrl && project.githubUrl.startsWith('http') && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="inline-flex items-center space-x-1 px-4 py-2 bg-white/90 dark:bg-gray-800/90 text-neutral-900 dark:text-white rounded-xl font-medium text-sm shadow-modern hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                          }}
                        >
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <ExternalLink className="h-5 w-5 text-neutral-400 group-hover:text-blue-500 transition-colors duration-200" />
                  </div>

                  {/* Project Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-cyan-500/20 text-cyan-600 dark:text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-neutral-500/20 text-neutral-600 dark:text-neutral-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(project.endDate)}</span>
                    </div>
                  </div>

                  {/* Testimonial */}
                  {project.testimonial && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 italic mb-2">
                        "{project.testimonial.text}"
                      </p>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        <span className="font-medium">{project.testimonial.author}</span>
                        <span className="mx-1">-</span>
                        <span>{project.testimonial.position}</span>
                      </div>
                    </div>
                  )}
                </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {currentProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              {t('references.grid.emptyState.title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              {t('references.grid.emptyState.description')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <span>{t('references.grid.emptyState.resetFilters')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="glass rounded-2xl p-4 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="glass rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                        page === currentPage
                          ? 'text-white shadow-modern'
                          : 'glass text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                      style={page === currentPage 
                        ? { background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }
                        : { background: 'rgba(255, 255, 255, 0.1)' }
                      }
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="glass rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
