"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  User,
  Mail,
  Shield,
  Calendar,
  Eye,
  MoreVertical,
  X,
  CheckCircle,
  XCircle,
  UserPlus,
  Loader2,
  CheckSquare,
  Square,
  Trash,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { 
  createUser, 
  updateUser, 
  deleteUser, 
  deleteUsers,
  getUsers, 
  getUser,
  updateUserStatus,
  updateUserRole,
  getUserStats,
  calculateUserPostCount,
  type User as UserType 
} from "@/lib/user-service"
import { useToast } from "@/components/toast"

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("Tümü")
  const [statusFilter, setStatusFilter] = useState("Tümü")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [users, setUsers] = useState<UserType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    byRole: {} as Record<string, number>
  })
  
  // Toplu seçim state'leri
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [warning, setWarning] = useState("")
  
  // Tek kullanıcı silme state'leri
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null)
  const { showToast } = useToast()

  // Kullanıcıları yükle
  useEffect(() => {
    loadUsers()
    loadStats()
  }, [])

  // Bulk delete modal açıkken body scroll'unu engelle
  // Bulk delete modal scroll engelleme
  useEffect(() => {
    if (isBulkDeleteModalOpen) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Scroll pozisyonunu geri yükle
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    
    return () => {
      // Cleanup
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isBulkDeleteModalOpen])

  // Delete modal scroll engelleme
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

  const loadUsers = async () => {
    try {
      setIsLoading(true)
      setError("")
      const usersData = await getUsers()
      setUsers(usersData)
    } catch (err) {
      setError("Kullanıcılar yüklenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const statsData = await getUserStats()
      setStats(statsData)
    } catch (err) {
      // İstatistikler yüklenirken hata oluştu
    }
  }

  // Toplu seçim fonksiyonları
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (isSelectMode) {
      setSelectedUsers(new Set())
    }
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const selectAllUsers = () => {
    const allUserIds = filteredUsers.map(user => user.id!).filter(Boolean)
    setSelectedUsers(new Set(allUserIds))
  }

  const clearSelection = () => {
    setSelectedUsers(new Set())
  }

  // Toplu silme
  const handleBulkDelete = () => {
    if (selectedUsers.size === 0) return
    setIsBulkDeleteModalOpen(true)
  }

  const confirmBulkDelete = async () => {
    if (selectedUsers.size === 0) return

    try {
      setIsDeleting(true)
      const userIds = Array.from(selectedUsers)
      const result = await deleteUsers(userIds)
      
      if (result.success > 0) {
        showToast({ 
          title: 'Başarılı', 
          message: `${result.success} kullanıcı silindi${result.failed > 0 ? `, ${result.failed} kullanıcı silinemedi` : ''}`, 
          type: 'success' 
        })
      }
      
      if (result.failed > 0) {
        showToast({ 
          title: 'Hata', 
          message: `${result.failed} kullanıcı silinemedi`, 
          type: 'error' 
        })
      }
      
      // Seçimleri temizle ve sayfayı yenile
      setSelectedUsers(new Set())
      setIsBulkDeleteModalOpen(false)
      loadUsers()
      loadStats()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Toplu silme işlemi sırasında hata oluştu', type: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredUsers = users.filter(user => {
    // Güvenli string kontrolü
    const userName = user.name || ''
    const userEmail = user.email || ''
    
    const matchesSearch = userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === "Tümü" || 
                       (roleFilter === "Admin" && user.role === 'admin') ||
                       (roleFilter === "Editör" && user.role === 'editor') ||
                       (roleFilter === "Yazar" && user.role === 'author') ||
                       (roleFilter === "Görüntüleyici" && user.role === 'viewer')
    
    const matchesStatus = statusFilter === "Tümü" || 
                         (statusFilter === "Aktif" && user.isActive) ||
                         (statusFilter === "Pasif" && !user.isActive)
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleCreateUser = async (userData: any) => {
    try {
      setIsLoading(true)
      setError("")
      
      // Sadece Firestore'da kullanıcı oluştur
      const newUserData = {
        name: userData.name,
        email: userData.email,
        password: userData.password || "",
        role: userData.role,
        bio: userData.bio || "",
        isActive: userData.isActive
      }
      
      await createUser(newUserData)
      await loadUsers()
      await loadStats()
      setIsCreateModalOpen(false)
      
      showToast({ 
        title: 'Başarılı', 
        message: 'Kullanıcı başarıyla oluşturuldu', 
        type: 'success' 
      })
    } catch (err) {
      setError(`Kullanıcı oluşturulurken bir hata oluştu: ${(err as any)?.message || 'Bilinmeyen hata'}`)
      showToast({ 
        title: 'Hata', 
        message: `Kullanıcı oluşturulurken bir hata oluştu: ${(err as any)?.message || 'Bilinmeyen hata'}`, 
        type: 'error' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = async (userData: any) => {
    if (!selectedUser?.id) return
    
    try {
      setIsLoading(true)
      setError("")
      
      const updateData: any = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        bio: userData.bio || "",
        isActive: userData.isActive
      }
      
      // Eğer şifre girilmişse, şifreyi de güncelle
      if (userData.password && userData.password.trim() !== "") {
        updateData.password = userData.password
      }
      
      await updateUser(selectedUser.id, updateData)
      await loadUsers()
      await loadStats()
      setIsEditModalOpen(false)
      setSelectedUser(null)
      
      showToast({ 
        title: 'Başarılı', 
        message: 'Kullanıcı başarıyla güncellendi', 
        type: 'success' 
      })
    } catch (err) {
      setError("Kullanıcı güncellenirken bir hata oluştu")
      showToast({ 
        title: 'Hata', 
        message: `Kullanıcı güncellenirken bir hata oluştu: ${(err as any)?.message || 'Bilinmeyen hata'}`, 
        type: 'error' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Silme modalını aç
  const openDeleteModal = (user: UserType) => {
    setUserToDelete(user)
    setIsDeleteModalOpen(true)
  }

  // Silme modalını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
  }

  // Kullanıcıyı sil
  const confirmDeleteUser = async () => {
    if (!userToDelete) return
    
    try {
      setIsDeleting(true)
      setError("")
      
      // Firestore'dan sil
      await deleteUser(userToDelete.id!)
      
      showToast({ 
        title: 'Başarılı', 
        message: 'Kullanıcı başarıyla silindi', 
        type: 'success' 
      })
      
      await loadUsers()
      await loadStats()
      closeDeleteModal()
    } catch (err) {
      showToast({ 
        title: 'Hata', 
        message: `Kullanıcı silinirken bir hata oluştu: ${(err as any)?.message || 'Bilinmeyen hata'}`, 
        type: 'error' 
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleStatus = async (userId: string) => {
    try {
      setIsLoading(true)
      setError("")
      
      const user = users.find(u => u.id === userId)
      if (!user) return

      // Eğer pasif yapılmaya çalışılıyorsa kontrol et
      if (user.isActive) {
        try {
          const postCount = await calculateUserPostCount(user.email, user.name)
          if (postCount > 0) {
            // Uyarı göster
            setWarning(`Bu kullanıcı ${postCount} yazıda kullanılıyor. Pasif yapmak için önce bu yazılardan kullanıcıyı kaldırın.`)
            // 5 saniye sonra uyarıyı temizle
            setTimeout(() => setWarning(""), 5000)
            return
          }
        } catch (error) {
          // Hata durumunda da uyarı göster
          setWarning(`Bu kullanıcının yazı sayısı kontrol edilemedi. Pasif yapmak için önce yazıları kontrol edin.`)
          setTimeout(() => setWarning(""), 5000)
          return
        }
      }

      await updateUserStatus(userId, !user.isActive)
      await loadUsers()
      await loadStats()
    } catch (err) {
      setError("Kullanıcı durumu güncellenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }


  const handleRoleChange = async (userId: string, newRole: UserType['role']) => {
    try {
      setIsLoading(true)
      setError("")
      
      await updateUserRole(userId, newRole)
      await loadUsers()
    } catch (err) {
      setError("Kullanıcı rolü güncellenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
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
                onClick={selectAllUsers}
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
              {selectedUsers.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm whitespace-nowrap"
                >
                  <Trash className="h-4 w-4" />
                  <span className="hidden sm:inline">Seçilenleri Sil ({selectedUsers.size})</span>
                  <span className="sm:hidden">Sil ({selectedUsers.size})</span>
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
              <UserPlus className="h-5 w-5" />
              <span>Yeni Kullanıcı</span>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Toplam</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <User className="h-8 w-8 text-cyan-400" />
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
        
        <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Yönetici</p>
              <p className="text-2xl font-bold text-red-400">{stats.byRole.admin || 0}</p>
            </div>
            <Shield className="h-8 w-8 text-red-400" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="Tümü">Tüm Roller</option>
            <option value="Admin">Yönetici</option>
            <option value="Editör">Editör</option>
            <option value="Yazar">Yazar</option>
            <option value="Görüntüleyici">Görüntüleyici</option>
          </select>

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

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeleton
          [...Array(6)].map((_, index) => (
            <div key={index} className="glass rounded-xl p-6 border border-white/20 animate-pulse" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-slate-700/40 rounded-2xl"></div>
                  <div>
                    <div className="h-5 bg-white/20 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-32"></div>
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
          filteredUsers.map((user, index) => (
            <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-6 border border-white/20 overflow-hidden hover:shadow-modern transition-all duration-300 group"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  {isSelectMode && (
                    <button
                      onClick={() => toggleUserSelection(user.id!)}
                      className="flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 hover:scale-110 flex-shrink-0"
                      style={{
                        backgroundColor: selectedUsers.has(user.id!) ? '#06b6d4' : 'transparent',
                        borderColor: selectedUsers.has(user.id!) ? '#06b6d4' : '#6b7280'
                      }}
                    >
                      {selectedUsers.has(user.id!) && (
                        <CheckSquare className="h-3 w-3 text-white" />
                      )}
                    </button>
                  )}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-700/80 to-slate-800/90 shadow-lg border border-slate-600/50 flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {(user.name || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                      {user.name || 'İsimsiz Kullanıcı'}
                    </h3>
                    <p className="text-sm text-neutral-400 truncate">{user.email || 'E-posta yok'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <button
                    onClick={() => handleToggleStatus(user.id!)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      user.isActive 
                        ? 'text-green-400 hover:bg-green-500/20' 
                        : 'text-red-400 hover:bg-red-500/20'
                    }`}
                    title={user.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                  >
                    <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user)
                      setIsEditModalOpen(true)
                    }}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Role */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                  <Shield className="h-3 w-3 mr-1" />
                  {getRoleLabel(user.role)}
                </span>
              </div>

              {/* Bio */}
              {user.bio && (
                <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
                  {user.bio}
                </p>
              )}

              {/* Stats */}
              <div className="space-y-2 text-sm text-neutral-400 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <Link
                  href={`/dashboard/users/${user.id}?from=${encodeURIComponent(window.location.pathname)}`}
                  className="flex items-center justify-center space-x-2 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <Eye className="h-4 w-4" />
                  <span>Görüntüle</span>
                </Link>
                <button 
                  onClick={() => {
                    setSelectedUser(user)
                    setIsEditModalOpen(true)
                  }}
                  className="flex items-center justify-center space-x-2 px-3 py-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm"
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
      {filteredUsers.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="glass rounded-2xl shadow-modern p-12 border border-white/50 max-w-md mx-auto"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <User className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <UserPlus className="h-5 w-5" />
              <span>Yeni Kullanıcı Ekle</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <UserModal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false)
            setIsEditModalOpen(false)
            setSelectedUser(null)
          }}
          onSubmit={isCreateModalOpen ? handleCreateUser : handleEditUser}
          user={selectedUser}
          isEdit={isEditModalOpen}
        />
      )}

      {/* Bulk Delete Confirmation Modal */}
      {isBulkDeleteModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          style={{ 
            overflow: 'hidden',
            touchAction: 'none',
            overscrollBehavior: 'none'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsBulkDeleteModalOpen(false)
            }
          }}
        >
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <Trash className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Toplu Silme Onayı</h3>
                <p className="text-sm text-neutral-400">Seçilen kullanıcıları silmek istediğinizden emin misiniz?</p>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-sm text-red-300 mt-1">
                {selectedUsers.size} kullanıcı silinecek. Bu işlem geri alınamaz.
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

      {/* Tek Kullanıcı Silme Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && userToDelete && (
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
                    <h4 className="font-medium text-white">{userToDelete.name}</h4>
                    <p className="text-sm text-neutral-400">{userToDelete.email}</p>
                    <p className="text-xs text-neutral-500">{userToDelete.role}</p>
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

// User Modal Component
function UserModal({ isOpen, onClose, onSubmit, user, isEdit }: any) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "viewer",
    bio: user?.bio || "",
    isActive: user?.isActive !== undefined ? user.isActive : true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [warning, setWarning] = useState("")

  // Form açıldığında uyarıyı temizle ve form verilerini sıfırla
  useEffect(() => {
    if (isOpen) {
      setWarning("")
      // Yeni kullanıcı oluştururken form verilerini sıfırla
      if (!isEdit) {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "viewer",
          bio: "",
          isActive: true
        })
      } else {
        // Düzenleme modunda mevcut kullanıcı verilerini yükle
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          password: "",
          role: user?.role || "viewer",
          bio: user?.bio || "",
          isActive: user?.isActive !== undefined ? user.isActive : true
        })
      }
    }
  }, [isOpen, isEdit, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({ name: "", email: "", password: "", role: "viewer", bio: "", isActive: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = async (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

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

  // Pasif durumu kontrol et
  const checkInactiveStatus = async (isActive: boolean) => {
    if (!isActive && user?.id) {
      try {
        // Kullanıcının post sayısını kontrol et
        const postCount = await calculateUserPostCount(user.email, user.name)
        if (postCount > 0) {
          setWarning(`Bu kullanıcı ${postCount} yazıda kullanılıyor. Pasif yapmak için önce bu yazılardan kullanıcıyı kaldırın.`)
          return false
        }
      } catch (error) {
        setWarning(`Bu kullanıcının yazı sayısı kontrol edilemedi. Pasif yapmak için önce yazıları kontrol edin.`)
        return false
      }
    }
    setWarning("")
    return true
  }

  const handleStatusChange = async (value: string) => {
    const isActive = value === "true"
    
    // Pasif durumu kontrol et
    const canSetInactive = await checkInactiveStatus(isActive)
    if (!canSetInactive) {
      // Pasif yapılamıyorsa aktif olarak geri döndür
      setFormData(prev => ({
        ...prev,
        isActive: true
      }))
      return
    }
    
    setFormData(prev => ({
      ...prev,
      isActive: isActive
    }))
  }


  if (!isOpen) return null

  // Body scroll'unu engelle
  useEffect(() => {
    if (isOpen) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Scroll pozisyonunu geri yükle
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    
    return () => {
      // Cleanup
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      style={{ 
        overflow: 'hidden',
        touchAction: 'none',
        overscrollBehavior: 'none'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-md mx-4 sm:mx-0 border border-white/20"
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
            {isEdit ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
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
            <label className="block text-sm font-medium text-neutral-300 mb-2">Kullanıcı Adı *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="Kullanıcı adı girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">E-posta *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="ornek@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {isEdit ? 'Yeni Şifre (Değiştirmek istemiyorsanız boş bırakın)' : 'Şifre *'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder={isEdit ? "Yeni şifre girin (opsiyonel)" : "En az 6 karakter"}
              required={!isEdit}
              minLength={isEdit ? 0 : 6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Rol *</label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              required
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
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="Kullanıcı hakkında kısa bilgi"
            />
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
                  onChange={(e) => handleStatusChange(e.target.value)}
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
                  onChange={(e) => handleStatusChange(e.target.value)}
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




