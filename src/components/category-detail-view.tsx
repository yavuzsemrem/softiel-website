"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Folder,
  FileText,
  Calendar,
  Eye,
  Tag,
  Loader2,
  Plus,
  Search,
  Filter,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getCategory, updateCategory, deleteCategory, calculateCategoryPostCount } from "@/lib/category-service"
import { getBlogs } from "@/lib/blog-service"
import type { Category } from "@/lib/category-service"
import type { BlogPost } from "@/lib/blog-service"

interface CategoryDetailViewProps {
  categoryId: string
}

export function CategoryDetailView({ categoryId }: CategoryDetailViewProps) {
  const searchParams = useSearchParams()
  const backUrl = searchParams.get('from') || '/dashboard/categories'
  
  const [category, setCategory] = useState<Category | null>(null)
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [realPostCount, setRealPostCount] = useState(0)
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
    loadCategory()
  }, [categoryId])

  const loadCategory = async () => {
    try {
      setLoading(true)
      setError("")
      
      const categoryData = await getCategory(categoryId)
      if (categoryData) {
        setCategory(categoryData)
        setEditData({
          name: categoryData.name,
          description: categoryData.description,
          color: categoryData.color
        })
        
        // Bu kategoriye ait blogları getir
        const blogsData = await getBlogs({ category: categoryData.name }, { page: 1, limit: 50 })
        setBlogs(blogsData.blogs)
        
        // Gerçek post sayısını hesapla
        const realCount = await calculateCategoryPostCount(categoryData.name)
        setRealPostCount(realCount)
      } else {
        setError("Kategori bulunamadı")
      }
    } catch (err) {
      setError("Kategori yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!category) return
    
    try {
      setLoading(true)
      setError("")
      
      await updateCategory(categoryId, editData)
      await loadCategory() // Kategoriyi yeniden yükle
      setIsEditing(false)
    } catch (err) {
      setError("Kategori güncellenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (category) {
      setEditData({
        name: category.name,
        description: category.description,
        color: category.color
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

  // Kategoriyi sil
  const confirmDeleteCategory = async () => {
    if (!category) return
    
    try {
      setIsDeleting(true)
      setError("")
      
      await deleteCategory(categoryId)
      window.location.href = backUrl
    } catch (err) {
      setError("Kategori silinirken bir hata oluştu")
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500 mx-auto mb-4" />
          <p className="text-neutral-400">Kategori yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-2xl p-8 border border-red-500/20 max-w-md mx-auto" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
          <p className="text-red-400 mb-4">{error}</p>
          <Link
            href={backUrl}
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Geri Dön</span>
          </Link>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-2xl p-8 border border-white/20 max-w-md mx-auto" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <Folder className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Kategori bulunamadı</h3>
          <p className="text-neutral-400 mb-6">Aradığınız kategori mevcut değil.</p>
          <Link
            href={backUrl}
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Geri Dön</span>
          </Link>
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
          className="inline-flex items-center space-x-3 px-4 py-3 text-neutral-300 hover:text-white transition-all duration-300 group glass rounded-xl hover:bg-white/5"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          </div>
          <span className="font-medium">Geri Dön</span>
        </Link>
      </motion.div>

      {/* Category Header */}
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
              style={{ backgroundColor: category.color + '20' }}
            >
              <Folder 
                className="h-8 w-8" 
                style={{ color: category.color }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.name}</h1>
              <p className="text-neutral-400 text-sm">#{category.slug}</p>
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
              <label className="block text-sm font-medium text-neutral-300 mb-2">Kategori Adı</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Kategori adı"
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
                placeholder="Kategori açıklaması"
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
            <p className="text-neutral-300 text-lg">{category.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-neutral-400">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span>{realPostCount} yazı</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="break-words">
                  {category.createdAt.toDate().toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${category.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                <span>{category.status === 'active' ? 'Aktif' : 'Pasif'}</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Blogs in this category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass rounded-2xl p-6 border border-white/20"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-cyan-500" />
          Bu Kategorideki Yazılar ({blogs.length})
        </h2>
        
        {blogs.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-400">Bu kategoride henüz yazı bulunmuyor.</p>
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
                      {blog.createdAt.toDate().toLocaleDateString('tr-TR')}
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
                  <h3 className="text-xl font-semibold text-white">Kategoriyi Sil</h3>
                  <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
                </div>
              </div>

              {/* Kategori Bilgileri */}
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Folder className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{category?.name}</h4>
                    <p className="text-sm text-neutral-400">{category?.description}</p>
                    <p className="text-xs text-neutral-500">#{category?.slug}</p>
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
                  Bu kategori kalıcı olarak silinecek. Bu işlem geri alınamaz.
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
                  onClick={confirmDeleteCategory}
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




