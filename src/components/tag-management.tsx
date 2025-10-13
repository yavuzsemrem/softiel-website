"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Tag,
  FileText,
  Calendar,
  Eye,
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
  createTag, 
  updateTag, 
  deleteTag, 
  deleteTags,
  getTags, 
  getTag,
  generateSlug,
  calculateTagPostCount,
  type Tag as TagType 
} from "@/lib/tag-service"
import { useToast } from "@/components/toast"

export function TagManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tümü")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null)
  const [tags, setTags] = useState<TagType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  })
  
  // Toplu seçim state'leri
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [warning, setWarning] = useState("")
  
  // Tek etiket silme state'leri
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<TagType | null>(null)
  const { showToast } = useToast()

  // Silme modal scroll engelleme
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

  // Etiketleri yükle
  useEffect(() => {
    loadTags()
  }, [])

  // İstatistikleri hesapla
  useEffect(() => {
    calculateStats()
  }, [tags])

  const calculateStats = () => {
    const total = tags.length
    const active = tags.filter(tag => tag.isActive).length
    const inactive = tags.filter(tag => !tag.isActive).length
    
    setStats({
      total,
      active,
      inactive
    })
  }

  const loadTags = async () => {
    try {
      setIsLoading(true)
      setError("")
      const tagsData = await getTags()
      
      // Her etiket için gerçek post sayısını hesapla
      const tagsWithCounts = await Promise.all(
        tagsData.map(async (tag) => {
          const realCount = await calculateTagPostCount(tag.name)
          return {
            ...tag,
            postCount: realCount
          }
        })
      )
      
      setTags(tagsWithCounts)
    } catch (err) {
      setError("Etiketler yüklenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tag.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "Tümü" || 
                         (statusFilter === "Aktif" && tag.isActive) ||
                         (statusFilter === "Pasif" && !tag.isActive)
    
    return matchesSearch && matchesStatus
  })

  // Toplu seçim fonksiyonları
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (isSelectMode) {
      setSelectedTags(new Set())
    }
  }

  const toggleTagSelection = (tagId: string) => {
    setSelectedTags(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tagId)) {
        newSet.delete(tagId)
      } else {
        newSet.add(tagId)
      }
      return newSet
    })
  }

  const selectAllTags = () => {
    const allTagIds = filteredTags.map(tag => tag.id!).filter(Boolean)
    setSelectedTags(new Set(allTagIds))
  }

  const clearSelection = () => {
    setSelectedTags(new Set())
  }

  // Toplu silme
  const handleBulkDelete = () => {
    if (selectedTags.size === 0) return
    setIsBulkDeleteModalOpen(true)
  }

  const confirmBulkDelete = async () => {
    if (selectedTags.size === 0) return

    try {
      setIsDeleting(true)
      const tagIds = Array.from(selectedTags)
      const result = await deleteTags(tagIds)
      
      if (result.success > 0) {
        showToast({ 
          title: 'Başarılı', 
          message: `${result.success} etiket silindi${result.failed > 0 ? `, ${result.failed} etiket silinemedi` : ''}`, 
          type: 'success' 
        })
      }
      
      if (result.failed > 0) {
        showToast({ 
          title: 'Hata', 
          message: `${result.failed} etiket silinemedi`, 
          type: 'error' 
        })
      }
      
      // Seçimleri temizle ve sayfayı yenile
      setSelectedTags(new Set())
      setIsBulkDeleteModalOpen(false)
      loadTags()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Toplu silme işlemi sırasında hata oluştu', type: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCreateTag = async (tagData: any) => {
    try {
      setIsLoading(true)
      setError("")
      
      const newTagData = {
        name: tagData.name,
        slug: tagData.slug || generateSlug(tagData.name),
        description: tagData.description,
        color: tagData.color,
        isActive: tagData.isActive
      }
      
      await createTag(newTagData)
      await loadTags() // Etiketleri yeniden yükle
      setIsCreateModalOpen(false)
    } catch (err) {
      setError("Etiket oluşturulurken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTag = async (tagData: any) => {
    if (!selectedTag?.id) return
    
    try {
      setIsLoading(true)
      setError("")
      
      const updateData = {
        name: tagData.name,
        slug: tagData.slug || generateSlug(tagData.name),
        description: tagData.description,
        color: tagData.color,
        isActive: tagData.isActive
      }
      
      await updateTag(selectedTag.id, updateData)
      await loadTags() // Etiketleri yeniden yükle
      setIsEditModalOpen(false)
      setSelectedTag(null)
    } catch (err) {
      setError("Etiket güncellenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  // Silme modalını aç
  const openDeleteModal = (tag: TagType) => {
    setTagToDelete(tag)
    setIsDeleteModalOpen(true)
  }

  // Silme modalını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setTagToDelete(null)
  }

  // Etiketi sil
  const confirmDeleteTag = async () => {
    if (!tagToDelete) return
    
    try {
      setIsDeleting(true)
      setError("")
      
      await deleteTag(tagToDelete.id!)
      await loadTags() // Etiketleri yeniden yükle
      closeDeleteModal()
    } catch (err) {
      setError("Etiket silinirken bir hata oluştu")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleStatus = async (tagId: string) => {
    try {
      setIsLoading(true)
      setError("")
      
      const tag = tags.find(t => t.id === tagId)
      if (!tag) return

      // Eğer pasif yapılmaya çalışılıyorsa kontrol et
      if (tag.isActive) {
        const postCount = await calculateTagPostCount(tag.name)
        if (postCount > 0) {
          // Uyarı göster
          setWarning(`Bu etiket ${postCount} yazıda kullanılıyor. Pasif yapmak için önce bu yazılardan etiketi kaldırın.`)
          // 5 saniye sonra uyarıyı temizle
          setTimeout(() => setWarning(""), 5000)
          return
        }
      }

      await updateTag(tagId, { isActive: !tag.isActive })
      await loadTags() // Etiketleri yeniden yükle
    } catch (err) {
      setError("Etiket durumu güncellenirken bir hata oluştu")
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
                onClick={selectAllTags}
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
              {selectedTags.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm whitespace-nowrap"
                >
                  <Trash className="h-4 w-4" />
                  <span className="hidden sm:inline">Seçilenleri Sil ({selectedTags.size})</span>
                  <span className="sm:hidden">Sil ({selectedTags.size})</span>
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
              <span>Yeni Etiket</span>
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
            <Tag className="h-8 w-8 text-cyan-400" />
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
              placeholder="Etiket ara..."
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

      {/* Tags Grid */}
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
          filteredTags.map((tag, index) => (
            <motion.div
              key={tag.id}
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
                      onClick={() => toggleTagSelection(tag.id!)}
                      className="flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: selectedTags.has(tag.id!) ? '#06b6d4' : 'transparent',
                        borderColor: selectedTags.has(tag.id!) ? '#06b6d4' : '#6b7280'
                      }}
                    >
                      {selectedTags.has(tag.id!) && (
                        <CheckSquare className="h-3 w-3 text-white" />
                      )}
                    </button>
                  )}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: tag.color + '20' }}
                  >
                    <Tag 
                      className="h-6 w-6" 
                      style={{ color: tag.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {tag.name}
                    </h3>
                    <p className="text-sm text-neutral-400">{tag.slug}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleToggleStatus(tag.id!)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      tag.isActive 
                        ? 'text-green-400 hover:bg-green-500/20' 
                        : 'text-red-400 hover:bg-red-500/20'
                    }`}
                    title={tag.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                  >
                    <div className={`w-2 h-2 rounded-full ${tag.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTag(tag)
                      setIsEditModalOpen(true)
                    }}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(tag)}
                    className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
                {tag.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{tag.postCount} yazı</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(tag.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Link
                  href={`/content-management-system-2024/tags/${tag.id}?from=${encodeURIComponent(window.location.pathname)}`}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <Eye className="h-4 w-4" />
                  <span>Görüntüle</span>
                </Link>
                <button 
                  onClick={() => {
                    setSelectedTag(tag)
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
      {filteredTags.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="glass rounded-2xl shadow-modern p-12 border border-white/50 max-w-md mx-auto"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <Tag className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Etiket bulunamadı
            </h3>
            <p className="text-neutral-400 mb-6">
              Arama kriterlerinize uygun etiket bulunamadı.
            </p>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <Plus className="h-5 w-5" />
              <span>Yeni Etiket Ekle</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <TagModal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false)
            setIsEditModalOpen(false)
            setSelectedTag(null)
          }}
          onSubmit={isCreateModalOpen ? handleCreateTag : handleEditTag}
          tag={selectedTag}
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
            className="glass rounded-2xl p-4 sm:p-6 border border-white/20 shadow-modern max-w-md w-full mx-4 sm:mx-0"
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
                <p className="text-sm text-neutral-400">Seçilen etiketleri silmek istediğinizden emin misiniz?</p>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-sm text-red-300 mt-1">
                {selectedTags.size} etiket silinecek. Bu işlem geri alınamaz.
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

      {/* Tek Etiket Silme Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && tagToDelete && (
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
                  <h3 className="text-xl font-semibold text-white">Etiketi Sil</h3>
                  <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
                </div>
              </div>

              {/* Etiket Bilgileri */}
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{tagToDelete.name}</h4>
                    <p className="text-sm text-neutral-400">{tagToDelete.description}</p>
                    <p className="text-xs text-neutral-500">{tagToDelete.slug}</p>
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
                  Bu etiket kalıcı olarak silinecek. Bu işlem geri alınamaz.
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
                  onClick={confirmDeleteTag}
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
    </div>
  )
}

// Tag Modal Component
function TagModal({ isOpen, onClose, onSubmit, tag, isEdit }: any) {
  const [formData, setFormData] = useState({
    name: tag?.name || "",
    slug: tag?.slug || "",
    description: tag?.description || "",
    color: tag?.color || "#3b82f6",
    isActive: tag?.isActive !== undefined ? tag.isActive : true
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
  const checkInactiveStatus = async (isActive: boolean) => {
    if (!isActive && tag?.id) {
      try {
        // Etiketin post sayısını kontrol et
        const postCount = await calculateTagPostCount(tag.name)
        if (postCount > 0) {
          setWarning(`Bu etiket ${postCount} yazıda kullanılıyor. Pasif yapmak için önce bu yazılardan etiketi kaldırın.`)
          return false
        }
      } catch (error) {
        // Post sayısı kontrol hatası
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
      setFormData({ name: "", slug: "", description: "", color: "#3b82f6", isActive: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = async (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-generate slug from name
    if (field === "name") {
      const slug = generateSlug(value as string)
      setFormData(prev => ({
        ...prev,
        slug: slug
      }))
    }

    // Pasif durumu kontrol et
    if (field === "isActive") {
      const canSetInactive = await checkInactiveStatus(value as boolean)
      if (!canSetInactive) {
        // Pasif yapılamıyorsa aktif olarak geri döndür
        setFormData(prev => ({
          ...prev,
          isActive: true
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
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {isEdit ? 'Etiket Düzenle' : 'Yeni Etiket'}
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
            <label className="block text-sm font-medium text-neutral-300 mb-2">Etiket Adı *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="Etiket adını girin"
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
              placeholder="Etiket açıklaması"
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
                  name="isActive"
                  value="true"
                  checked={formData.isActive === true}
                  onChange={(e) => handleInputChange("isActive", e.target.value === "true")}
                  className="w-4 h-4 text-cyan-500 bg-transparent border-2 border-neutral-400 focus:ring-cyan-500 focus:ring-2"
                />
                <span className="text-sm text-neutral-300">Aktif</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="isActive"
                  value="false"
                  checked={formData.isActive === false}
                  onChange={(e) => handleInputChange("isActive", e.target.value === "true")}
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




