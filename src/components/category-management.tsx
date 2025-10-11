"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Folder,
  FileText,
  Calendar,
  Eye,
  MoreVertical,
  X,
  Loader2,
  CheckSquare,
  Square,
  Trash,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  deleteCategories,
  getCategories, 
  getCategory,
  generateSlug,
  calculateCategoryPostCount,
  type Category 
} from "@/lib/category-service"
import { useToast } from "@/components/toast"

export function CategoryManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tümü")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  })
  
  // Toplu seçim state'leri
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [warning, setWarning] = useState("")
  
  // Tek kategori silme state'leri
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const { showToast } = useToast()

  // Silme modal scroll engelleme ve ESC tuşu ile kapatma
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
      
      // ESC tuşu ile kapatma
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeDeleteModal()
        }
      }
      
      document.addEventListener('wheel', preventScroll, { passive: false })
      document.addEventListener('touchmove', preventScroll, { passive: false })
      document.addEventListener('keydown', handleEscape)
      
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
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isDeleteModalOpen])

  // Kategorileri yükle
  useEffect(() => {
    loadCategories()
  }, [])

  // İstatistikleri hesapla
  useEffect(() => {
    calculateStats()
  }, [categories])

  const calculateStats = () => {
    const total = categories.length
    const active = categories.filter(cat => cat.status === 'active').length
    const inactive = categories.filter(cat => cat.status === 'inactive').length
    
    setStats({
      total,
      active,
      inactive
    })
  }

  const loadCategories = async () => {
    try {
      setIsLoading(true)
      setError("")
      const categoriesData = await getCategories()
      
      // Her kategori için gerçek post sayısını hesapla
      const categoriesWithCounts = await Promise.all(
        categoriesData.map(async (category) => {
          const realCount = await calculateCategoryPostCount(category.name)
          return {
            ...category,
            postCount: realCount
          }
        })
      )
      
      setCategories(categoriesWithCounts)
    } catch (err) {
      setError("Kategoriler yüklenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "Tümü" || 
                         (statusFilter === "Aktif" && category.status === 'active') ||
                         (statusFilter === "Pasif" && category.status === 'inactive')
    
    return matchesSearch && matchesStatus
  })

  // Toplu seçim fonksiyonları
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (isSelectMode) {
      setSelectedCategories(new Set())
    }
  }

  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const selectAllCategories = () => {
    const allCategoryIds = filteredCategories.map(category => category.id!).filter(Boolean)
    setSelectedCategories(new Set(allCategoryIds))
  }

  const clearSelection = () => {
    setSelectedCategories(new Set())
  }

  // Toplu silme
  const handleBulkDelete = () => {
    if (selectedCategories.size === 0) return
    setIsBulkDeleteModalOpen(true)
  }

  const confirmBulkDelete = async () => {
    if (selectedCategories.size === 0) return

    try {
      setIsDeleting(true)
      const categoryIds = Array.from(selectedCategories)
      const result = await deleteCategories(categoryIds)
      
      if (result.success > 0) {
        showToast({ 
          title: 'Başarılı', 
          message: `${result.success} kategori silindi${result.failed > 0 ? `, ${result.failed} kategori silinemedi` : ''}`, 
          type: 'success' 
        })
      }
      
      if (result.failed > 0) {
        showToast({ 
          title: 'Hata', 
          message: `${result.failed} kategori silinemedi`, 
          type: 'error' 
        })
      }
      
      // Seçimleri temizle ve sayfayı yenile
      setSelectedCategories(new Set())
      setIsBulkDeleteModalOpen(false)
      loadCategories()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Toplu silme işlemi sırasında hata oluştu', type: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCreateCategory = async (categoryData: any) => {
    try {
      setIsLoading(true)
      setError("")
      
      const newCategoryData = {
        name: categoryData.name,
        slug: categoryData.slug || generateSlug(categoryData.name),
        description: categoryData.description,
        color: categoryData.color,
        status: categoryData.status
      }
      
      await createCategory(newCategoryData)
      await loadCategories() // Kategorileri yeniden yükle
      setIsCreateModalOpen(false)
    } catch (err) {
      setError("Kategori oluşturulurken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditCategory = async (categoryData: any) => {
    if (!selectedCategory?.id) return
    
    try {
      setIsLoading(true)
      setError("")
      
      const updateData = {
        name: categoryData.name,
        slug: categoryData.slug || generateSlug(categoryData.name),
        description: categoryData.description,
        color: categoryData.color,
        status: categoryData.status
      }
      
      await updateCategory(selectedCategory.id, updateData)
      await loadCategories() // Kategorileri yeniden yükle
      setIsEditModalOpen(false)
      setSelectedCategory(null)
    } catch (err) {
      setError("Kategori güncellenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  // Tek kategori silme modalını aç
  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category)
    setIsDeleteModalOpen(true)
  }

  // Tek kategori silme modalını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setCategoryToDelete(null)
  }

  // Tek kategori silme onayı
  const confirmDeleteCategory = async () => {
    if (!categoryToDelete || !categoryToDelete.id) return
    
    try {
      setIsDeleting(true)
      setError("")
      
      await deleteCategory(categoryToDelete.id)
      await loadCategories() // Kategorileri yeniden yükle
      closeDeleteModal()
    } catch (err) {
      setError("Kategori silinirken bir hata oluştu")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleStatus = async (categoryId: string) => {
    try {
      setIsLoading(true)
      setError("")
      
      const category = categories.find(cat => cat.id === categoryId)
      if (!category) return

      // Eğer pasif yapılmaya çalışılıyorsa kontrol et
      if (category.status === 'active') {
        const postCount = await calculateCategoryPostCount(category.name)
        if (postCount > 0) {
          // Uyarı göster
          setWarning(`Bu kategori ${postCount} yazıda kullanılıyor. Pasif yapmak için önce bu yazılardan kategoriyi kaldırın.`)
          // 5 saniye sonra uyarıyı temizle
          setTimeout(() => setWarning(""), 5000)
          return
        }
      }

      const newStatus = category.status === 'active' ? 'inactive' : 'active'
      await updateCategory(categoryId, { status: newStatus })
      await loadCategories() // Kategorileri yeniden yükle
    } catch (err) {
      setError("Kategori durumu güncellenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  // Tarih formatlama fonksiyonu
  const formatDate = (date: any) => {
    try {
      if (!date) return 'Tarih yok'
      
      let dateObj: Date
      if (typeof date === 'object' && date.toDate) {
        // Firestore Timestamp
        dateObj = date.toDate()
      } else if (typeof date === 'number') {
        // Unix timestamp
        dateObj = new Date(date)
      } else if (typeof date === 'string') {
        // String date
        dateObj = new Date(date)
      } else {
        // Fallback
        dateObj = new Date(date)
      }
      
      if (isNaN(dateObj.getTime())) return 'Geçersiz tarih'
      
      return dateObj.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return 'Tarih hatası'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Selection Mode Controls */}
          {isSelectMode && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={selectAllCategories}
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
              {selectedCategories.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm whitespace-nowrap"
                >
                  <Trash className="h-4 w-4" />
                  <span className="hidden sm:inline">Seçilenleri Sil ({selectedCategories.size})</span>
                  <span className="sm:hidden">Sil ({selectedCategories.size})</span>
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
              onClick={() => setIsCreateModalOpen(true)}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <Plus className="h-5 w-5" />
              <span>Yeni Kategori</span>
            </button>
          </div>
        </div>
      </div>

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Toplam</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Folder className="h-8 w-8 text-cyan-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Aktif</p>
              <p className="text-2xl font-bold text-green-400">{stats.active}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Pasif</p>
              <p className="text-2xl font-bold text-red-400">{stats.inactive}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass rounded-xl p-4 border border-red-500/20" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Kategori ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <option value="Tümü">Tüm Durumlar</option>
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeleton
          [...Array(6)].map((_, index) => (
            <div key={index} className="glass rounded-xl p-6 border border-white/20 animate-pulse" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                  <div>
                    <div className="h-5 bg-white/20 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-16"></div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                </div>
              </div>
              <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="h-4 bg-white/20 rounded w-16"></div>
                <div className="h-4 bg-white/20 rounded w-20"></div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1 h-8 bg-white/20 rounded-lg"></div>
                <div className="flex-1 h-8 bg-white/20 rounded-lg"></div>
              </div>
            </div>
          ))
        ) : (
          filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="glass rounded-xl p-6 border border-white/20 overflow-hidden hover:shadow-modern transition-all duration-300 group"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {isSelectMode && (
                  <button
                    onClick={() => toggleCategorySelection(category.id!)}
                    className="flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 hover:scale-110"
                    style={{
                      backgroundColor: selectedCategories.has(category.id!) ? '#06b6d4' : 'transparent',
                      borderColor: selectedCategories.has(category.id!) ? '#06b6d4' : '#6b7280'
                    }}
                  >
                    {selectedCategories.has(category.id!) && (
                      <CheckSquare className="h-3 w-3 text-white" />
                    )}
                  </button>
                )}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <Folder 
                    className="h-6 w-6" 
                    style={{ color: category.color }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-neutral-400">{category.slug}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => category.id && handleToggleStatus(category.id)}
                  disabled={!category.id}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    category.status === 'active'
                      ? 'text-green-400 hover:bg-green-500/20' 
                      : 'text-red-400 hover:bg-red-500/20'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={category.status === 'active' ? 'Pasif Yap' : 'Aktif Yap'}
                >
                  <div className={`w-2 h-2 rounded-full ${category.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(category)
                    setIsEditModalOpen(true)
                  }}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openDeleteModal(category)}
                  className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
              {category.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{category.postCount} yazı</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(category.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Link
                href={`/content-management-system-2024/categories/${category.id}?from=${encodeURIComponent(window.location.pathname)}`}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm"
              >
                <Eye className="h-4 w-4" />
                <span>Görüntüle</span>
              </Link>
              <button 
                onClick={() => {
                  setSelectedCategory(category)
                  setIsEditModalOpen(true)
                }}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm"
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
      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="glass rounded-2xl shadow-modern p-12 border border-white/50 max-w-md mx-auto"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <Folder className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Kategori bulunamadı
            </h3>
            <p className="text-neutral-400 mb-6">
              Arama kriterlerinize uygun kategori bulunamadı.
            </p>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <Plus className="h-5 w-5" />
              <span>Yeni Kategori Ekle</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <CategoryModal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false)
            setIsEditModalOpen(false)
            setSelectedCategory(null)
          }}
          onSubmit={isCreateModalOpen ? handleCreateCategory : handleEditCategory}
          category={selectedCategory}
          isEdit={isEditModalOpen}
        />
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
                <p className="text-sm text-neutral-400">Seçilen kategorileri silmek istediğinizden emin misiniz?</p>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-sm text-red-300 mt-1">
                {selectedCategories.size} kategori silinecek. Bu işlem geri alınamaz.
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

      {/* Single Category Delete Confirmation Modal */}
      {isDeleteModalOpen && categoryToDelete && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
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
                <h3 className="text-lg font-semibold text-white">Kategoriyi Sil</h3>
                <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
              </div>
            </div>

            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: categoryToDelete.color + '20' }}
                >
                  <Folder className="h-4 w-4" style={{ color: categoryToDelete.color }} />
                </div>
                <div>
                  <h4 className="font-medium text-white">{categoryToDelete.name}</h4>
                  <p className="text-sm text-neutral-400">{categoryToDelete.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-sm text-red-300 mt-1">
                Bu kategori kalıcı olarak silinecek. Bu işlem geri alınamaz.
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
                onClick={confirmDeleteCategory}
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

// Category Modal Component
function CategoryModal({ isOpen, onClose, onSubmit, category, isEdit }: any) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    color: category?.color || "#3b82f6",
    status: category?.status || "active"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [warning, setWarning] = useState("")

  // Scroll engelleme ve dış tıklama ile kapatma
  useEffect(() => {
    if (isOpen) {
      // Uyarıyı temizle
      setWarning("")
      
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY
      
      // Body'ye fixed pozisyon ve scroll pozisyonunu koru
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // ESC tuşu ile kapatma
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        // Scroll pozisyonunu geri yükle
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
        
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

  // Dış tıklama ile kapatma
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Pasif durumu kontrol et
  const checkInactiveStatus = async (status: string) => {
    if (status === 'inactive' && category?.id) {
      try {
        // Kategorinin post sayısını kontrol et
        const postCount = await calculateCategoryPostCount(category.name)
        if (postCount > 0) {
          setWarning(`Bu kategori ${postCount} yazıda kullanılıyor. Pasif yapmak için önce bu yazılardan kategoriyi kaldırın.`)
          return false
        }
      } catch (error) {
        // Post sayısı kontrol hatası - sessizce geç
      }
    }
    setWarning("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({ name: "", slug: "", description: "", color: "#3b82f6", status: "active" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = async (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-generate slug from name
    if (field === "name") {
      const slug = generateSlug(value)
      setFormData(prev => ({
        ...prev,
        slug: slug
      }))
    }

    // Pasif durumu kontrol et
    if (field === "status") {
      const canSetInactive = await checkInactiveStatus(value)
      if (!canSetInactive) {
        // Pasif yapılamıyorsa aktif olarak geri döndür
        setFormData(prev => ({
          ...prev,
          status: "active"
        }))
      }
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-hidden"
      onClick={handleBackdropClick}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-md mx-4 sm:mx-0 border border-white/20 overflow-hidden"
        style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {isEdit ? 'Kategori Düzenle' : 'Yeni Kategori'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Kategori Adı *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="Kategori adını girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">URL Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleInputChange("slug", e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="url-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="Kategori açıklaması"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Renk</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                className="w-12 h-12 rounded-lg border-0 cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                className="flex-1 px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">Durum</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-4 h-4 text-cyan-500 bg-transparent border-2 border-neutral-400 focus:ring-cyan-500 focus:ring-2"
                />
                <span className="text-sm text-neutral-300">Aktif</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-4 h-4 text-cyan-500 bg-transparent border-2 border-neutral-400 focus:ring-cyan-500 focus:ring-2"
                />
                <span className="text-sm text-neutral-300">Pasif</span>
              </label>
            </div>
            {warning && (
              <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Uyarı</span>
                </div>
                <p className="text-sm text-yellow-300 mt-1">{warning}</p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 glass rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isEdit ? 'Güncelle' : 'Oluştur'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
