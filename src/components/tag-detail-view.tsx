"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Tag,
  Calendar,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { 
  getTag, 
  updateTag, 
  deleteTag, 
  type Tag as TagType 
} from "@/lib/tag-service"
import { getBlogs, type BlogPost } from "@/lib/blog-service"

interface TagDetailViewProps {
  tagId: string
}

export function TagDetailView({ tagId }: TagDetailViewProps) {
  const searchParams = useSearchParams()
  const backUrl = searchParams.get('from') || '/content-management-system-2024/tags'
  
  const [tag, setTag] = useState<TagType | null>(null)
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    color: "#3b82f6"
  })
  
  // Silme modal state'leri
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  useEffect(() => {
    loadTag()
  }, [tagId])

  const loadTag = async () => {
    try {
      setLoading(true)
      setError("")
      
      const tagData = await getTag(tagId)
      if (tagData) {
        setTag(tagData)
        setEditData({
          name: tagData.name,
          description: tagData.description || "",
          color: tagData.color || "#3b82f6"
        })
        
        // Bu etiketteki yazıları yükle
        await loadBlogs(tagData.name)
      } else {
        setError("Etiket bulunamadı")
      }
    } catch (err) {
      setError("Etiket yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const loadBlogs = async (tagName: string) => {
    try {
      const { blogs } = await getBlogs({ tags: [tagName] }, { page: 1, limit: 50 })
      setBlogs(blogs)
    } catch (err) {
      // Blog yükleme hatası
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!tag) return
    
    try {
      setLoading(true)
      setError("")
      
      await updateTag(tagId, editData)
      await loadTag() // Etiketi yeniden yükle
      setIsEditing(false)
    } catch (err) {
      setError("Etiket güncellenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (tag) {
      setEditData({
        name: tag.name,
        description: tag.description || "",
        color: tag.color || "#3b82f6"
      })
    }
    setIsEditing(false)
  }

  // Silme modalını aç
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  // Silme modalını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  // Etiketi sil
  const confirmDeleteTag = async () => {
    if (!tag) return
    
    try {
      setIsDeleting(true)
      setError("")
      
      await deleteTag(tagId)
      window.location.href = backUrl
    } catch (err) {
      setError("Etiket silinirken bir hata oluştu")
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (date: any) => {
    try {
      if (!date) return 'Tarih bulunamadı'
      
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
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'Tarih hatası'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-neutral-400">Etiket yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-2xl p-8 border border-red-500/20 max-w-md mx-auto" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <Link
            href={backUrl}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Geri Dön
          </Link>
        </div>
      </div>
    )
  }

  if (!tag) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-2xl p-8 border border-white/20 max-w-md mx-auto" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-white text-lg">Etiket bulunamadı</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-4"
      >
        <Link
          href={backUrl}
          className="inline-flex items-center space-x-3 px-4 py-3 text-neutral-300 hover:text-white transition-all duration-300 group glass rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          </div>
          <span className="font-medium">Geri Dön</span>
        </Link>
      </motion.div>

      {/* Tag Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass rounded-2xl p-8 border border-white/20"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: tag.color + '20' }}
            >
              <Tag 
                className="h-8 w-8" 
                style={{ color: tag.color }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{tag.name}</h1>
              <p className="text-neutral-400 text-sm">#{tag.name.toLowerCase().replace(/\s+/g, '-')}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-end sm:justify-start space-x-2 w-full sm:w-auto">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
                >
                  Kaydet
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-neutral-500/20 text-neutral-400 rounded-lg hover:bg-neutral-500/30 transition-all duration-200 whitespace-nowrap"
                >
                  İptal
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={openDeleteModal}
                  className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Etiket Adı</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Etiket adı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Açıklama</label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
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
                  value={editData.color}
                  onChange={(e) => setEditData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-12 h-12 rounded-lg border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={editData.color}
                  onChange={(e) => setEditData(prev => ({ ...prev, color: e.target.value }))}
                  className="flex-1 px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-neutral-300 text-lg">{tag.description || "Açıklama bulunmuyor"}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-neutral-400">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span>{blogs.length} yazı</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="break-words">
                  {formatDate(tag.createdAt)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${tag.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                <span>{tag.isActive ? 'Aktif' : 'Pasif'}</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Blogs with this tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass rounded-2xl p-6 border border-white/20"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-cyan-500" />
          Bu Etiketteki Yazılar ({blogs.length})
        </h2>
        
        {blogs.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-400">Bu etikette henüz yazı bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog, index) => (
              <Link
                key={blog.id}
                href={`/tr/blog/${blog.slug || blog.id}?from=${encodeURIComponent(window.location.pathname)}`}
                className="group block p-4 glass rounded-xl hover:bg-white/20 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              >
                <h3 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                  {blog.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {blog.createdAt.toDate ? blog.createdAt.toDate().toLocaleDateString('tr-TR') : new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{blog.views || 0}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>

      {/* Silme Onay Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
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
                    <h4 className="font-medium text-white">{tag?.name}</h4>
                    <p className="text-sm text-neutral-400">{tag?.description}</p>
                    <p className="text-xs text-neutral-500">#{tag?.name?.toLowerCase().replace(/\s+/g, '-')}</p>
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