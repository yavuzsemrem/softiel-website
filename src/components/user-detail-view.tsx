"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  User,
  Mail,
  Shield,
  Calendar,
  Eye,
  Loader2,
  CheckCircle,
  XCircle,
  UserPlus,
  FileText,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getUser, updateUser, deleteUser, updateUserStatus, updateUserRole } from "@/lib/user-service"
import type { User as UserType } from "@/lib/user-service"
import { getBlogs, type BlogPost } from "@/lib/blog-service"

interface UserDetailViewProps {
  userId: string
}

export function UserDetailView({ userId }: UserDetailViewProps) {
  const searchParams = useSearchParams()
  const backUrl = searchParams.get('from') || '/content-management-system-2024/users'
  
  const [user, setUser] = useState<UserType | null>(null)
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "viewer" as UserType['role'],
    bio: ""
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
    loadUser()
  }, [userId])

  const loadUser = async () => {
    try {
      setLoading(true)
      setError("")
      
      const userData = await getUser(userId)
      if (userData) {
        setUser(userData)
        setEditData({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          bio: userData.bio || ""
        })
        
        // Bu kullanıcının yazılarını yükle
        await loadBlogs(userData.name)
      } else {
        setError("Kullanıcı bulunamadı")
      }
    } catch (err) {
      setError("Kullanıcı yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const loadBlogs = async (userName: string) => {
    try {
      const { blogs } = await getBlogs({ author: userName }, { page: 1, limit: 50 })
      setBlogs(blogs)
    } catch (err) {
      // Blog yükleme hatası
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError("")
      
      await updateUser(userId, editData)
      await loadUser() // Kullanıcıyı yeniden yükle
      setIsEditing(false)
    } catch (err) {
      setError("Kullanıcı güncellenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setEditData({
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio || ""
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

  // Kullanıcıyı sil
  const confirmDeleteUser = async () => {
    if (!user) return
    
    try {
      setIsDeleting(true)
      setError("")
      
      await deleteUser(userId)
      // Kullanıcı listesine yönlendir
      window.location.href = '/content-management-system-2024/users'
    } catch (err) {
      setError("Kullanıcı silinirken bir hata oluştu")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleStatus = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError("")
      
      await updateUserStatus(userId, !user.isActive)
      await loadUser() // Kullanıcıyı yeniden yükle
    } catch (err) {
      setError("Kullanıcı durumu güncellenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (newRole: UserType['role']) => {
    if (!user) return
    
    try {
      setLoading(true)
      setError("")
      
      await updateUserRole(userId, newRole)
      await loadUser() // Kullanıcıyı yeniden yükle
    } catch (err) {
      setError("Kullanıcı rolü güncellenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  // Tarih formatlama fonksiyonu
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

  // Rol rengi fonksiyonu
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'editor': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'author': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'viewer': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Rol Türkçe çevirisi
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Yönetici'
      case 'editor': return 'Editör'
      case 'author': return 'Yazar'
      case 'viewer': return 'Görüntüleyici'
      default: return role
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500 mx-auto mb-4" />
          <p className="text-neutral-400">Kullanıcı yükleniyor...</p>
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

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-2xl p-8 border border-white/20 max-w-md mx-auto" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <User className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Kullanıcı bulunamadı</h3>
          <p className="text-neutral-400 mb-6">Aradığınız kullanıcı mevcut değil.</p>
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
          className="inline-flex items-center space-x-3 px-4 py-3 text-neutral-300 hover:text-white transition-all duration-300 group glass rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          </div>
          <span className="font-medium">Geri Dön</span>
        </Link>
      </motion.div>

      {/* User Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass rounded-2xl p-6 border border-white/20"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-700/80 to-slate-800/90 shadow-lg border border-slate-600/50">
              <span className="text-white font-bold text-xl">
                {(user.name || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-xl font-bold text-white bg-transparent border-b border-white/30 focus:outline-none focus:border-cyan-500 w-full"
                />
              ) : (
                <h1 className="text-xl font-bold text-white truncate">{user.name || 'İsimsiz Kullanıcı'}</h1>
              )}
              <p className="text-neutral-400 text-sm mt-1 truncate">{user.email || 'E-posta yok'}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-end sm:justify-start space-x-2 w-full sm:w-auto">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200 disabled:opacity-50 text-sm font-medium whitespace-nowrap"
                >
                  Kaydet
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-neutral-500/20 text-neutral-400 rounded-lg hover:bg-neutral-500/30 transition-all duration-200 text-sm font-medium whitespace-nowrap"
                >
                  İptal
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  title="Düzenle"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={openDeleteModal}
                  className="p-2.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                  title="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Status & Info */}
          <div className="space-y-4">
            {/* Role and Status */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {user.role === 'admin' ? 'Yönetici' : 
                   user.role === 'editor' ? 'Editör' : 
                   user.role === 'author' ? 'Yazar' : 'Görüntüleyici'}
                </span>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                user.isActive 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {user.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div>
                <h3 className="text-sm font-medium text-neutral-300 mb-2">Hakkında</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{user.bio}</p>
              </div>
            )}
          </div>

          {/* Right Column - Contact & Dates */}
          <div className="space-y-4">
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-neutral-400" />
                <span className="text-neutral-300">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-neutral-400" />
                <span className="text-neutral-300">
                  Oluşturulma: {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">E-posta</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Rol</label>
              <select
                value={editData.role}
                onChange={(e) => setEditData(prev => ({ ...prev, role: e.target.value as UserType['role'] }))}
                className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <option value="viewer">Görüntüleyici</option>
                <option value="author">Yazar</option>
                <option value="editor">Editör</option>
                <option value="admin">Yönetici</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Hakkında</label>
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Kullanıcı hakkında kısa bilgi"
              />
            </div>
          </div>
        ) : null}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass rounded-2xl p-6 border border-white/20"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
          <Shield className="h-5 w-5 mr-3 text-cyan-500" />
          Hızlı İşlemler
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => handleRoleChange('admin')}
            disabled={user.role === 'admin' || loading}
            className="group p-4 glass rounded-xl hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-cyan-500/30"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          >
            <div className="text-center">
              <Shield className="h-6 w-6 text-red-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-white">Yönetici Yap</p>
            </div>
          </button>
          
          <button
            onClick={() => handleRoleChange('editor')}
            disabled={user.role === 'editor' || loading}
            className="group p-4 glass rounded-xl hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-cyan-500/30"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          >
            <div className="text-center">
              <Edit className="h-6 w-6 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-white">Editör Yap</p>
            </div>
          </button>
          
          <button
            onClick={() => handleRoleChange('author')}
            disabled={user.role === 'author' || loading}
            className="group p-4 glass rounded-xl hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-cyan-500/30"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          >
            <div className="text-center">
              <User className="h-6 w-6 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-white">Yazar Yap</p>
            </div>
          </button>
          
          <button
            onClick={() => handleRoleChange('viewer')}
            disabled={user.role === 'viewer' || loading}
            className="group p-4 glass rounded-xl hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-cyan-500/30"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          >
            <div className="text-center">
              <Eye className="h-6 w-6 text-gray-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-white">Görüntüleyici Yap</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Blogs by this user */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass rounded-2xl p-6 border border-white/20"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-cyan-500" />
          Bu Yazara Ait Yazılar ({blogs.length})
        </h2>
        
        {blogs.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-400">Bu yazara ait henüz yazı bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog, index) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug || blog.id}?from=${encodeURIComponent(window.location.pathname)}`}
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
                  <h3 className="text-xl font-semibold text-white">Kullanıcıyı Sil</h3>
                  <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
                </div>
              </div>

              {/* Kullanıcı Bilgileri */}
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{user?.name}</h4>
                    <p className="text-sm text-neutral-400">{user?.email}</p>
                    <p className="text-xs text-neutral-500">{user?.role}</p>
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
                  Bu kullanıcı kalıcı olarak silinecek. Bu işlem geri alınamaz.
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
                  onClick={confirmDeleteUser}
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








