"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  Bell, 
  Search, 
  Calendar,
  Clock,
  User,
  FileText,
  MessageSquare,
  CheckCircle,
  BarChart3,
  List,
  RefreshCw,
  Loader2,
  Eye,
  EyeOff,
  Filter,
  SortAsc,
  ChevronDown,
  ArrowUpWideNarrow,
  ArrowDownWideNarrow,
  Trash2,
  X,
  CheckSquare,
  Square,
  AlertTriangle
} from "lucide-react"
import { 
  getRecentActivities, 
  Activity as ActivityType,
  deleteActivity,
  deleteActivities,
  toggleActivityReadStatus,
  markAllActivitiesAsRead
} from "@/lib/activity-service"
import { useToast } from "./toast"
// Date formatting utilities

export function NotificationsManagement() {
  const router = useRouter()
  const { showToast } = useToast()
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tümü")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalActivities, setTotalActivities] = useState(0)
  const activitiesPerPage = 10
  const [stats, setStats] = useState({
    total: 0,
    blogLiked: 0,
    commentAdded: 0,
    commentLiked: 0
  })
  
  // Silme işlemleri için state'ler
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Yorum onaylama fonksiyonu - Sadece yönlendirme yapar
  const handleApproveComment = (activity: ActivityType) => {
    // Kontroller
    if (activity.type !== 'comment_added') {
      return
    }
    
    // TargetId'yi al
    const commentId = activity.metadata?.targetId || activity.targetId
    
    if (!commentId) {
      return
    }
    
    const isReply = activity.metadata?.isReply || false
    const parentCommentId = activity.metadata?.parentCommentId
    
    // Sadece yönlendirme yap - onaylama işlemi yorumlar sayfasında yapılacak
    if (isReply && parentCommentId) {
      // Cevap yorumu - yorum detay sayfasına git
      window.location.href = `/dashboard/comments/${parentCommentId}#comment-${commentId}`
    } else {
      // Ana yorum - yorumlar sayfasına git
      window.location.href = `/dashboard/comments#comment-${commentId}`
    }
  }

  // Tekil silme fonksiyonu
  const handleDeleteActivity = (activityId: string) => {
    setActivityToDelete(activityId)
    setIsDeleteModalOpen(true)
  }

  // Aktivite okunma durumunu toggle et
  const handleToggleReadStatus = async (activityId: string) => {
    try {
      const activity = activities.find(a => a.id === activityId)
      if (!activity) return

      const currentStatus = activity.isRead || false
      const newStatus = await toggleActivityReadStatus(activityId, currentStatus)
      
      // Local state'i güncelle
      setActivities(prev => prev.map(a => 
        a.id === activityId ? { ...a, isRead: newStatus } : a
      ))
      
      // Notification count'u güncelle
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('notification-updated'))
      }
      
      showToast({ 
        title: 'Başarılı', 
        message: newStatus ? 'Aktivite okundu olarak işaretlendi' : 'Aktivite okunmamış olarak işaretlendi', 
        type: 'success' 
      })
      
    } catch (error) {
      console.error('❌ Aktivite durumu değiştirilemedi:', error)
      showToast({ title: 'Hata', message: 'Aktivite durumu değiştirilemedi', type: 'error' })
    }
  }

  // Tümünü okundu işaretle
  const handleMarkAllAsRead = async () => {
    try {
      await markAllActivitiesAsRead()
      
      // Local state'i güncelle
      setActivities(prev => prev.map(a => ({ ...a, isRead: true })))
      
      // Notification count'u güncelle
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('notification-updated'))
      }
      
      showToast({ title: 'Başarılı', message: 'Tüm aktiviteler okundu olarak işaretlendi', type: 'success' })
      
    } catch (error) {
      console.error('❌ Tüm aktiviteler işaretlenemedi:', error)
      showToast({ title: 'Hata', message: 'Tüm aktiviteler işaretlenemedi', type: 'error' })
    }
  }

  // Silme onayı
  const confirmDeleteActivity = async () => {
    if (!activityToDelete) return

    try {
      setDeleting(true)
      
      // Veritabanından sil
      await deleteActivity(activityToDelete)
      
      // Local state'i güncelle
      setActivities(prev => prev.filter(activity => activity.id !== activityToDelete))
      setTotalActivities(prev => prev - 1)
      setTotalPages(Math.ceil((totalActivities - 1) / activitiesPerPage))
      
      // İstatistikleri güncelle
      const deletedActivity = activities.find(a => a.id === activityToDelete)
      if (deletedActivity) {
        setStats(prev => ({
          ...prev,
          total: prev.total - 1,
          [deletedActivity.type === 'blog_liked' ? 'blogLiked' : 
           deletedActivity.type === 'comment_added' ? 'commentAdded' : 
           deletedActivity.type === 'comment_liked' ? 'commentLiked' : 'total']: 
          prev[deletedActivity.type === 'blog_liked' ? 'blogLiked' : 
               deletedActivity.type === 'comment_added' ? 'commentAdded' : 
               deletedActivity.type === 'comment_liked' ? 'commentLiked' : 'total'] - 1
        }))
      }
      
      showToast({ title: 'Başarılı', message: 'Aktivite silindi', type: 'success' })
      
      // Notification count'u güncelle
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('notification-updated'))
      }
      
    } catch (error) {
      console.error('❌ Aktivite silme hatası:', error)
      showToast({ title: 'Hata', message: 'Aktivite silinirken hata oluştu', type: 'error' })
    } finally {
      setIsDeleteModalOpen(false)
      setActivityToDelete(null)
      setDeleting(false)
    }
  }

  // Toplu silme fonksiyonu
  const handleBulkDelete = () => {
    if (selectedActivities.size === 0) return
    setIsBulkDeleteModalOpen(true)
  }

  // Toplu silme onayı
  const confirmBulkDelete = async () => {
    try {
      setDeleting(true)
      
      // Seçili aktivite ID'lerini al
      const activityIds = Array.from(selectedActivities)
      
      // Veritabanından sil
      await deleteActivities(activityIds)
      
      // Local state'i güncelle
      setActivities(prev => prev.filter(activity => activity.id && !selectedActivities.has(activity.id)))
      setTotalActivities(prev => prev - selectedActivities.size)
      setTotalPages(Math.ceil((totalActivities - selectedActivities.size) / activitiesPerPage))
      
      // Seçimleri temizle
      setSelectedActivities(new Set())
      setIsSelectMode(false)
      
      showToast({ title: 'Başarılı', message: `${activityIds.length} aktivite silindi`, type: 'success' })
      
      // Notification count'u güncelle
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('notification-updated'))
      }
      
    } catch (error) {
      console.error('❌ Toplu silme hatası:', error)
      showToast({ title: 'Hata', message: 'Aktiviteler silinirken hata oluştu', type: 'error' })
    } finally {
      setIsBulkDeleteModalOpen(false)
      setDeleting(false)
    }
  }

  // Seçim işlemleri
  const toggleActivitySelection = (activityId: string) => {
    setSelectedActivities(prev => {
      const newSet = new Set(prev)
      if (newSet.has(activityId)) {
        newSet.delete(activityId)
      } else {
        newSet.add(activityId)
      }
      return newSet
    })
  }

  // Yorumlar sayfasındaki gibi seçim fonksiyonları
  const selectAllActivities = () => {
    const allActivityIds = filteredActivities.map(activity => activity.id!).filter(Boolean)
    setSelectedActivities(new Set(allActivityIds))
  }

  const clearSelection = () => {
    setSelectedActivities(new Set())
  }

  // Aktiviteleri yükle
  useEffect(() => {
    loadActivities()
  }, [currentPage, statusFilter, sortBy])

  // Modal açıkken scroll'u engelle - GÜÇLENDİRİLMİŞ VERSİYON
  useEffect(() => {
    if (isDeleteModalOpen || isBulkDeleteModalOpen) {
      // Body scroll'unu engelle
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
      
      // HTML element'ini de engelle
      document.documentElement.style.overflow = 'hidden'
      
      // Touch scroll'u da engelle (mobil için)
      document.body.style.touchAction = 'none'
    } else {
      // Scroll'u geri yükle
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }

    // Cleanup
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isDeleteModalOpen, isBulkDeleteModalOpen])

  // ESC tuşu ile modal'ları kapat
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isDeleteModalOpen) {
          setIsDeleteModalOpen(false)
        }
        if (isBulkDeleteModalOpen) {
          setIsBulkDeleteModalOpen(false)
        }
      }
    }

    if (isDeleteModalOpen || isBulkDeleteModalOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDeleteModalOpen, isBulkDeleteModalOpen])

  // Sayfa focus olduğunda sadece notification count'u güncelle, aktiviteleri yeniden yükleme
  useEffect(() => {
    const handleFocus = () => {
      // Sadece notification count'u güncelle, aktiviteleri yeniden yükleme
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('notification-updated'))
      }
    }

    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // Arama için debounce - sadece filtreleme yap, API çağrısı yapma
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Sadece sayfa 1'e git, API çağrısı yapma
      setCurrentPage(1)
    }, 500) // 500ms bekle

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const loadActivities = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const activitiesData = await getRecentActivities(100)
      
      // Yorum aktivitelerini kontrol et ve onay durumunu güncelle
      const updatedActivities = await Promise.all(activitiesData.map(async (activity) => {
        if (activity.type === 'comment_added') {
          try {
            // Yorumun onay durumunu kontrol et
            const { getComment } = await import('@/lib/comment-service')
            const commentId = activity.metadata?.targetId || activity.targetId
            
            if (commentId) {
              const comment = await getComment(commentId)
              if (comment) {
                return {
                  ...activity,
                  metadata: {
                    ...activity.metadata,
                    isApproved: comment.isApproved || false
                  }
                }
              }
            }
          } catch (error) {
          }
        }
        return activity
      }))
      
      setActivities(updatedActivities)
      setTotalActivities(updatedActivities.length)
      setTotalPages(Math.ceil(updatedActivities.length / activitiesPerPage))
      
      // İstatistikleri hesapla
      const statsData = {
        total: updatedActivities.length,
        blogLiked: updatedActivities.filter(a => a.type === 'blog_liked').length,
        commentAdded: updatedActivities.filter(a => a.type === 'comment_added').length,
        commentLiked: updatedActivities.filter(a => a.type === 'comment_liked').length
      }
      setStats(statsData)
      
    } catch (err) {
      setError("Aktiviteler yüklenirken bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  // Filtrelenmiş aktiviteler
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesStatus = true
    if (statusFilter !== "Tümü") {
      switch (statusFilter) {
        case "Blog Beğenildi":
          matchesStatus = activity.type === 'blog_liked'
          break
        case "Yorum Eklendi":
          matchesStatus = activity.type === 'comment_added'
          break
        case "Yorum Beğenildi":
          matchesStatus = activity.type === 'comment_liked'
          break
      }
    }
    
    return matchesSearch && matchesStatus
  })

  // Sıralama
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return a.createdAt.seconds - b.createdAt.seconds
      case "newest":
      default:
        return b.createdAt.seconds - a.createdAt.seconds
    }
  })

  // Sayfalama
  const startIndex = (currentPage - 1) * activitiesPerPage
  const endIndex = startIndex + activitiesPerPage
  const paginatedActivities = sortedActivities.slice(startIndex, endIndex)

  // Aktivite türü ikonu - Dashboard'daki emoji ikonları
  const getActivityIcon = (type: string) => {
    const activityInfo = {
      blog_created: { icon: '📝', bgColor: 'bg-green-100 dark:bg-green-900/20' },
      blog_updated: { icon: '✏️', bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
      blog_published: { icon: '🚀', bgColor: 'bg-purple-100 dark:bg-purple-900/20' },
      blog_deleted: { icon: '🗑️', bgColor: 'bg-red-100 dark:bg-red-900/20' },
      category_created: { icon: '📁', bgColor: 'bg-orange-100 dark:bg-orange-900/20' },
      comment_added: { icon: '💬', bgColor: 'bg-cyan-100 dark:bg-cyan-900/20' },
      user_login: { icon: '🔐', bgColor: 'bg-indigo-100 dark:bg-indigo-900/20' },
      seo_optimized: { icon: '🔍', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' },
      blog_liked: { icon: '❤️', bgColor: 'bg-pink-100 dark:bg-pink-900/20' },
      comment_liked: { icon: '👍', bgColor: 'bg-emerald-100 dark:bg-emerald-900/20' }
    }
    
    const info = activityInfo[type as keyof typeof activityInfo] || { icon: '📋', bgColor: 'bg-gray-100 dark:bg-gray-900/20' }
    
    return (
      <div className={`w-8 h-8 ${info.bgColor} rounded-full flex items-center justify-center`}>
        <span className="text-sm">{info.icon}</span>
      </div>
    )
  }

  // Aktivite türü rengi
  const getActivityColor = (type: string) => {
    switch (type) {
      case "blog_created":
      case "blog_updated":
      case "blog_published":
        return "border-blue-500/30 bg-blue-500/5"
      case "comment_added":
        return "border-green-500/30 bg-green-500/5"
      case "blog_liked":
        return "border-pink-500/30 bg-pink-500/5"
      case "comment_liked":
        return "border-purple-500/30 bg-purple-500/5"
      case "user_login":
        return "border-cyan-500/30 bg-cyan-500/5"
      case "seo_optimized":
        return "border-yellow-500/30 bg-yellow-500/5"
      default:
        return "border-white/20 bg-white/5"
    }
  }

  // Tarih formatı
  const formatDate = (timestamp: any) => {
    try {
      const date = new Date(timestamp.seconds * 1000)
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
      
      if (diffInSeconds < 60) {
        return "Az önce"
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} dakika önce`
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} saat önce`
      } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400)
        return `${days} gün önce`
      } else {
        return date.toLocaleDateString('tr-TR')
      }
    } catch (error) {
      return "Bilinmeyen tarih"
    }
  }

  // Aktivite tıklama
  const handleActivityClick = (activity: ActivityType) => {
    // Onaylanmamış yorumlar için tıklama devre dışı
    if (activity.type === 'comment_added' && !activity.metadata?.isApproved) {
      return // Hiçbir şey yapma
    }
    
    if (activity.metadata?.targetUrl) {
      if (activity.type === 'comment_added') {
        // Onaylanmış yorumlar için - blog detay sayfasına git
        window.location.href = activity.metadata.targetUrl
      } else if (activity.type === 'comment_liked') {
        // Yorum beğenme - ana yorum ise blog detay, cevap ise yorum detay sayfasına git
        const isReply = activity.metadata.isReply
        if (isReply) {
          // Cevap yorumu - yorum detay sayfasına git (dashboard'da kal)
          window.location.href = activity.metadata.targetUrl
        } else {
          // Ana yorum - blog detay sayfasına git (yeni sekmede aç)
          window.open(activity.metadata.targetUrl, '_blank')
        }
      } else {
        // Diğer aktiviteler - yeni sekmede aç
        window.open(activity.metadata.targetUrl, '_blank')
      }
    }
  }

  // Sayfa değiştirme
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-4" />
          <p className="text-neutral-400">Aktiviteler yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-xl p-8 border border-red-500/20 backdrop-blur-lg">
          <div className="text-red-400 mb-4">
            <Bell className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Hata Oluştu</h3>
            <p className="text-neutral-400">{error}</p>
          </div>
          <button
            onClick={loadActivities}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* İstatistikler */}
      <div className="relative">
        {/* Action Buttons - İstatistiklerin üstünde */}
        <div className="flex justify-end gap-2 mb-4">
          {/* Seçim Modu Butonu */}
          <button
            onClick={() => {
              setIsSelectMode(!isSelectMode)
              if (isSelectMode) {
                setSelectedActivities(new Set())
              }
            }}
            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
              isSelectMode 
                ? 'bg-cyan-500/30 text-cyan-300' 
                : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
            }`}
          >
            {isSelectMode ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
            <span className="hidden sm:inline">{isSelectMode ? 'Seçim Modu' : 'Seçim Modu'}</span>
          </button>

          {/* Mark All as Read Button */}
          <button
            onClick={handleMarkAllAsRead}
            disabled={loading}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Tümünü Okundu İşaretle</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={loadActivities}
            disabled={loading}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{loading ? 'Yenileniyor...' : 'Yenile'}</span>
          </button>
        </div>

        {/* Selection Controls - Seçim modu açıkken */}
        {isSelectMode && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={selectAllActivities}
                className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-200 text-sm"
              >
                <CheckSquare className="h-4 w-4" />
                <span>Tümünü Seç</span>
              </button>
              <button
                onClick={clearSelection}
                className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-all duration-200 text-sm"
              >
                <Square className="h-4 w-4" />
                <span>Seçimi Temizle</span>
              </button>
              {selectedActivities.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Seçilenleri Sil ({selectedActivities.size})</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats - 4 items grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-full overflow-hidden" style={{ maxWidth: '100vw', width: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
          <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Toplam Aktivite</p>
              <p className="text-lg sm:text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 flex-shrink-0" />
          </div>
        </div>
          
        <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Blog Beğenildi</p>
              <p className="text-lg sm:text-2xl font-bold text-pink-400">{stats.blogLiked}</p>
            </div>
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400 flex-shrink-0" />
          </div>
        </div>

        <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Yorum Eklendi</p>
              <p className="text-lg sm:text-2xl font-bold text-green-400">{stats.commentAdded}</p>
            </div>
            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-green-400 flex-shrink-0" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Yorum Beğenildi</p>
              <p className="text-lg sm:text-2xl font-bold text-purple-400">{stats.commentLiked}</p>
            </div>
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 flex-shrink-0" />
          </div>
        </div>
        </div>
      </div>

      {/* Filtreler */}
      <div 
        className="glass rounded-xl p-4 sm:p-6 border border-white/10 w-full max-w-full overflow-hidden"
        style={{
          maxWidth: '100vw',
          width: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-full"
          style={{
            maxWidth: '100%',
            width: '100%',
            overflowX: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Search */}
          <div className="flex-1 min-w-0">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-cyan-400 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Aktivitelerde ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base transition-all duration-300 hover:bg-white/8"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative min-w-0 sm:min-w-[140px] group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white/5 rounded-lg px-3 sm:px-4 py-2.5 pr-8 text-white focus:outline-none focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base transition-all duration-300 hover:bg-white/8"
            >
              <option value="Tümü">Tüm Aktiviteler</option>
              <option value="Blog Beğenildi">Blog Beğenildi</option>
              <option value="Yorum Eklendi">Yorum Eklendi</option>
              <option value="Yorum Beğenildi">Yorum Beğenildi</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-cyan-400 pointer-events-none transition-colors duration-200" />
          </div>

          {/* Sort */}
          <div className="relative min-w-0 sm:min-w-[140px] group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white/5 rounded-lg px-3 sm:px-4 py-2.5 pr-8 text-white focus:outline-none focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base transition-all duration-300 hover:bg-white/8"
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-cyan-400 pointer-events-none transition-colors duration-200" />
          </div>

        </div>
      </div>


      {/* Aktivite Listesi */}
      <div className="space-y-4">
        {paginatedActivities.length === 0 ? (
          <div className="glass rounded-xl p-8 border border-white/20 backdrop-blur-lg text-center">
            <Bell className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Aktivite Bulunamadı</h3>
            <p className="text-neutral-400">
              {searchQuery || statusFilter !== "Tümü"
                ? "Arama kriterlerinize uygun aktivite bulunamadı."
                : "Henüz hiç aktivite yok."}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <AnimatePresence>
              {paginatedActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`glass rounded-xl border backdrop-blur-lg transition-all duration-200 hover:shadow-modern-lg ${
                    activity.type === 'comment_added' && activity.metadata?.isApproved !== true 
                      ? 'cursor-default' 
                      : 'cursor-pointer'
                  } ${getActivityColor(activity.type)} ${
                    activity.isRead ? 'opacity-75 border-white/5' : 'border-white/10'
                  }`}
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      {/* Checkbox (Seçim Modunda) */}
                      {isSelectMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (activity.id) {
                              toggleActivitySelection(activity.id)
                            }
                          }}
                          className="flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 hover:scale-110 flex-shrink-0 mt-1"
                          style={{
                            backgroundColor: activity.id && selectedActivities.has(activity.id) ? '#06b6d4' : 'transparent',
                            borderColor: activity.id && selectedActivities.has(activity.id) ? '#06b6d4' : '#6b7280'
                          }}
                        >
                          {activity.id && selectedActivities.has(activity.id) && (
                            <CheckSquare className="h-3 w-3 text-white" />
                          )}
                        </button>
                      )}
                      
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white text-sm sm:text-base">{activity.title}</h3>
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full self-start">
                            {activity.type.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-neutral-300 text-sm leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex-shrink-0 flex gap-2">
                        {/* Toggle Read Status Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (activity.id) {
                              handleToggleReadStatus(activity.id)
                            }
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            activity.isRead 
                              ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30' 
                              : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                          }`}
                          title={activity.isRead ? 'Okunmamış olarak işaretle' : 'Okundu olarak işaretle'}
                        >
                          {activity.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        
                        {/* Silme Butonu */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (activity.id) {
                              handleDeleteActivity(activity.id)
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          title="Aktiviteyi Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Yorum İçeriği Önizlemesi */}
                    {(activity.type === 'comment_added' || activity.type === 'comment_liked') && activity.metadata?.commentContent && (
                      <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MessageSquare className="w-3 h-3 text-cyan-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-neutral-400 mb-1">
                              {activity.type === 'comment_added' ? 'Yorum içeriği:' : 'Beğenilen yorum:'}
                            </p>
                            <p className="text-sm text-neutral-200 leading-relaxed line-clamp-3">
                              "{activity.metadata.commentContent}"
                            </p>
                            {activity.metadata.commentAuthor && (
                              <p className="text-xs text-cyan-400 mt-1">
                                — {activity.metadata.commentAuthor}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-white/10">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-neutral-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(activity.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span className="text-cyan-400">{activity.userName}</span>
                        </div>
                      </div>
                      
                      {/* Onaylanmamış yorumlar için onayla butonu - SADECE comment_added için */}
                      {activity.type === 'comment_added' && activity.metadata?.isApproved !== true ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleApproveComment(activity)
                          }}
                          className="flex items-center justify-center gap-1 text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5 rounded-lg transition-colors w-full sm:w-auto"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Onayla</span>
                        </button>
                      ) : activity.type === 'comment_added' && activity.metadata?.isApproved === true ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleActivityClick(activity)
                          }}
                          className="flex items-center justify-center gap-1 text-xs bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 px-3 py-1.5 rounded-lg transition-colors w-full sm:w-auto"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Tıklayarak görüntüle</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-1 text-xs text-cyan-400 w-full sm:w-auto">
                          <Eye className="w-3 h-3" />
                          <span>Tıklayarak görüntüle</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
                </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2 mt-6 sm:mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            Önceki
          </button>
          
          <div className="flex space-x-1 overflow-x-auto max-w-full">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors whitespace-nowrap ${
                    currentPage === page
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 sm:px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            Sonraki
          </button>
        </div>
      )}

      {/* Alt Bilgi */}
      <div className="text-center text-xs sm:text-sm text-neutral-400 px-4">
        Toplam {totalActivities} aktivite gösteriliyor
      </div>

      {/* Tekil Silme Modal */}
      {isDeleteModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDeleteModalOpen(false)
            }
          }}
        >
          <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Aktiviteyi Sil</h3>
                <p className="text-neutral-400 text-sm">Bu işlem geri alınamaz</p>
              </div>
            </div>
            
            <p className="text-neutral-300 mb-6">
              Bu aktiviteyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={confirmDeleteActivity}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {deleting ? 'Siliniyor...' : 'Sil'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toplu Silme Modal */}
      {isBulkDeleteModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsBulkDeleteModalOpen(false)
            }
          }}
        >
          <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Toplu Silme</h3>
                <p className="text-neutral-400 text-sm">Bu işlem geri alınamaz</p>
              </div>
            </div>
            
            <p className="text-neutral-300 mb-6">
              <strong>{selectedActivities.size}</strong> aktiviteyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsBulkDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={confirmBulkDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {deleting ? 'Siliniyor...' : 'Hepsini Sil'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}