"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// MotionDiv direkt import edilerek ref sorunları önleniyor
const MotionDiv = motion.div

import { useRouter } from "next/navigation"
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Search, 
  Filter,
  MessageSquare,
  User,
  Calendar,
  Eye,
  MoreVertical,
  X,
  Reply,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Clock,
  FileText,
  ChevronDown,
  SortAsc,
  Grid,
  List,
  RefreshCw,
  Loader2,
  Send,
  AlertTriangle,
  CheckSquare,
  Square,
  Trash
} from "lucide-react"
import { 
  getComments, 
  getAllComments,
  getMainComments,
  approveComment, 
  deleteComment, 
  deleteComments,
  createComment,
  createAdminReply,
  getCommentStats,
  likeComment,
  getComment,
  Comment as CommentType 
} from "@/lib/comment-service"
import { getBlog } from "@/lib/blog-service"
import { useToast } from "@/components/toast"
import { ModalReplyItem } from "@/components/modal-reply-item"

export function CommentManagementV2() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tümü")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null)
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(null)
  const [replyingToReply, setReplyingToReply] = useState<string | null>(null)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [comments, setComments] = useState<CommentType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    replies: 0
  })
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const [blogData, setBlogData] = useState<Map<string, { title: string; slug: string }>>(new Map())
  const [replyContent, setReplyContent] = useState("")
  const [replyAuthorName, setReplyAuthorName] = useState("")
  const [replyAuthorEmail, setReplyAuthorEmail] = useState("")
  const [submittingReply, setSubmittingReply] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalComments, setTotalComments] = useState(0)
  const commentsPerPage = 10
  const { showToast } = useToast()
  
  // Toplu seçim state'leri
  const [selectedComments, setSelectedComments] = useState<Set<string>>(new Set())
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Scroll to comment functionality
  const scrollToComment = (commentId: string) => {
    
    const commentElement = document.getElementById(`comment-${commentId}`)
    if (commentElement) {
      commentElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
      
      // Yorumu vurgula
      commentElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
      commentElement.style.border = '2px solid rgba(59, 130, 246, 0.3)'
      commentElement.style.borderRadius = '8px'
      commentElement.style.transition = 'all 0.3s ease'
      
      setTimeout(() => {
        commentElement.style.backgroundColor = ''
        commentElement.style.border = ''
      }, 3000)
    } else {
    }
  }

  // URL hash'ini kontrol et ve yoruma scroll yap
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash
      
      if (hash && hash.startsWith('#comment-')) {
        const commentId = hash.replace('#comment-', '')
        
        // Yorumlar yüklendikten sonra scroll yap
        setTimeout(() => {
          scrollToComment(commentId)
        }, 1000)
      }
    }

    // Sayfa yüklendiğinde hash kontrol et
    setTimeout(() => {
      handleHashScroll()
    }, 2000)

    // Hash değişikliklerini dinle
    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [comments])

  // Blog bilgilerini yükle
  const loadBlogData = async (blogIds: string[]) => {
    try {
      const blogMap = new Map<string, { title: string; slug: string }>()
      
      for (const blogId of blogIds) {
        if (!blogData.has(blogId)) {
          try {
            // Blog ID kontrolü
            if (!blogId || typeof blogId !== 'string') {
              blogMap.set(blogId || 'unknown', {
                title: 'Bilinmeyen Blog',
                slug: 'unknown'
              })
              continue
            }
            
            const blog = await getBlog(blogId)
            if (blog) {
              blogMap.set(blogId, {
                title: blog.title || 'Başlıksız Blog',
                slug: blog.slug || blogId
              })
            } else {
              // Blog bulunamadı
              blogMap.set(blogId, {
                title: `Blog ${blogId}`,
                slug: blogId
              })
            }
          } catch (error) {
            // Hata durumunda blogId'yi kullan
            blogMap.set(blogId, {
              title: `Blog ${blogId}`,
              slug: blogId
            })
          }
        }
      }
      
      if (blogMap.size > 0) {
        setBlogData(prev => new Map([...prev, ...blogMap]))
      }
    } catch (error) {
    }
  }

  // Firebase bağlantısını test et
  const testFirebaseConnection = async () => {
    try {
      // Basit bir test sorgusu
      const { collection, getDocs } = await import('firebase/firestore')
      const { db } = await import('@/lib/firebase')
      const testCollection = collection(db, 'comments')
      const snapshot = await getDocs(testCollection)
      return true
    } catch (error) {
      return false
    }
  }

  // Yorumları yükle
  const loadComments = async (page: number = 1) => {
    try {
      setLoading(true)
      
      // Firebase bağlantısını test et
      const isConnected = await testFirebaseConnection()
      if (!isConnected) {
        showToast({ title: 'Hata', message: 'Veritabanı bağlantısı kurulamadı', type: 'error' })
        setComments([])
        setLoading(false)
        return
      }
      
      // Tüm yorumları getir - hata yakalama ile
      let allComments = []
      try {
        allComments = await getAllComments()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
        setError(`Yorumlar yüklenirken hata oluştu: ${errorMessage}`)
        showToast({ title: 'Hata', message: 'Yorumlar yüklenirken hata oluştu', type: 'error' })
        setComments([])
        setLoading(false)
        return
      }
      
      // Sadece ana yorumları filtrele (yanıtları hariç tut) - onay durumu fark etmez
      const mainComments = allComments.filter(comment => !comment.isReply)
      
      // Filtrelenmiş yorumları al (arama ve durum filtresi)
      const filteredComments = mainComments.filter(comment => {
        const matchesSearch = comment.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             comment.content.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesStatus = statusFilter === "Tümü" || 
                             (statusFilter === "Onaylandı" && comment.isApproved && comment.isRejected !== true) ||
                             (statusFilter === "Beklemede" && !comment.isApproved && comment.isRejected !== true) ||
                             (statusFilter === "Reddedildi" && comment.isRejected === true)
        
        return matchesSearch && matchesStatus
      })
      
      
      // Paging hesaplama - filtrelenmiş yorumlar üzerinden
      const total = filteredComments.length
      const totalPages = Math.ceil(total / commentsPerPage)
      const startIndex = (page - 1) * commentsPerPage
      const endIndex = startIndex + commentsPerPage
      const paginatedComments = filteredComments.slice(startIndex, endIndex)
      
      
      setComments(paginatedComments)
      setTotalPages(totalPages)
      setTotalComments(total)
      setCurrentPage(page)
      setError(null) // Başarılı yükleme sonrası hatayı temizle
      
      // Blog bilgilerini yükle
      const uniqueBlogIds = [...new Set(paginatedComments.map(comment => comment.blogId))]
      await loadBlogData(uniqueBlogIds)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
      setError(`Ana yorumlar yüklenirken hata oluştu: ${errorMessage}`)
      showToast({ title: 'Hata', message: 'Ana yorumlar yüklenirken hata oluştu', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // İstatistikleri yükle
  const loadStats = async () => {
    try {
      const statsData = await getCommentStats()
      setStats({
        total: statsData.total,
        approved: statsData.approved,
        pending: statsData.pending,
        rejected: statsData.rejected,
        replies: statsData.replies
      })
    } catch (error) {
    }
  }

  // Sayfa değiştir
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    loadComments(page)
  }

  // Scroll engelleme - Reply modal açıkken
  useEffect(() => {
    if (isReplyModalOpen) {
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
      document.addEventListener('keydown', (e) => {
        // Space tuşunu textarea içindeyken engelleme
        if (e.keyCode === 32 && e.target instanceof HTMLTextAreaElement) {
          return // Space tuşuna izin ver
        }
        // Diğer navigasyon tuşlarını engelle
        if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault()
        }
      })
      
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
  }, [isReplyModalOpen])

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

  // Bulk delete modal scroll engelleme
  useEffect(() => {
    if (isBulkDeleteModalOpen) {
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
  }, [isBulkDeleteModalOpen])

  // Genişlik kontrolü - Sayfa genişlemesini önle (Optimized - Forced reflow önleme)
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout
    let mutationTimeout: NodeJS.Timeout
    
    const enforceViewportWidth = () => {
      // RequestAnimationFrame ile reflow'u optimize et
      requestAnimationFrame(() => {
        // Sadece problematik elementleri kontrol et (performans için)
        const problematicSelectors = [
          '.dashboard-container',
          '.comment-management-container',
          '.modal-container',
          '[class*="modal"]',
          'main',
          '.main-content',
          '.container'
        ]
        
        problematicSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector)
          elements.forEach(element => {
            const htmlElement = element as HTMLElement
            // offsetWidth yerine CSS ile kontrol et
            const computedStyle = window.getComputedStyle(htmlElement)
            const width = parseFloat(computedStyle.width)
            
            if (width > window.innerWidth) {
              // Batch DOM updates
              htmlElement.style.setProperty('max-width', '100vw', 'important')
              htmlElement.style.setProperty('width', '100%', 'important')
              htmlElement.style.setProperty('overflow-x', 'hidden', 'important')
            }
          })
        })
      })
    }

    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(enforceViewportWidth, 100)
    }

    // Debounced mutation handler
    const handleMutation = () => {
      clearTimeout(mutationTimeout)
      mutationTimeout = setTimeout(enforceViewportWidth, 50)
    }

    // İlk yüklemede kontrol et
    enforceViewportWidth()

    // Resize olayında kontrol et
    window.addEventListener('resize', handleResize)
    
    // MutationObserver ile DOM değişikliklerini izle (daha az agresif)
    const observer = new MutationObserver(handleMutation)
    observer.observe(document.body, {
      childList: true,
      subtree: false, // Sadece direct children
      attributes: false // Style değişikliklerini izleme
    })

    return () => {
      clearTimeout(resizeTimeout)
      clearTimeout(mutationTimeout)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    loadComments()
    loadStats()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Arama ve filtreleme değişikliklerinde yorumları yeniden yükle
  useEffect(() => {
    loadComments(1) // Arama/filtreleme değiştiğinde 1. sayfaya git
  }, [searchQuery, statusFilter, sortBy]) // eslint-disable-line react-hooks/exhaustive-deps

  // Durum değiştir (Onayla/Reddet)
  const handleStatusChange = async (id: string, approved: boolean) => {
    try {
      
      // Anlık UI güncellemesi
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === id 
            ? { 
                ...comment, 
                isApproved: approved, 
                isRejected: !approved
              }
            : comment
        )
      )
      
      await approveComment(id, approved)
      showToast({ title: 'Başarılı', message: approved ? 'Yorum onaylandı' : 'Yorum reddedildi', type: 'success' })
      
      // Onaylama işlemi tamamlandı
      
      // Veritabanından güncel veriyi al
      loadComments(currentPage)
      loadStats()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Durum değiştirilirken hata oluştu', type: 'error' })
      
      // Hata durumunda UI'ı geri al
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === id 
            ? { 
                ...comment, 
                isApproved: !approved, 
                isRejected: approved
              }
            : comment
        )
      )
    }
  }


  // Yorumu sil
  const handleDeleteComment = async (id: string) => {
    setCommentToDelete(id)
    setIsDeleteModalOpen(true)
  }

  // Silme onayı
  const confirmDeleteComment = async () => {
    if (!commentToDelete) return

    try {
      await deleteComment(commentToDelete)
      showToast({ title: 'Başarılı', message: 'Yorum silindi', type: 'success' })
      loadComments(currentPage)
      loadStats()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Yorum silinirken hata oluştu', type: 'error' })
    } finally {
      setIsDeleteModalOpen(false)
      setCommentToDelete(null)
    }
  }

  // Beğeni
  const handleLike = async (id: string) => {
    try {
      await likeComment(id, 'anonymous-user-' + Date.now())
      setLikedComments(prev => {
        const newSet = new Set(prev)
        if (newSet.has(id)) {
          newSet.delete(id)
        } else {
          newSet.add(id)
        }
        return newSet
      })
      loadComments(currentPage)
    } catch (error) {
      showToast({ title: 'Hata', message: 'Beğeni işlemi sırasında hata oluştu', type: 'error' })
    }
  }

  // Yanıtla
  const handleReply = (comment: CommentType) => {
    setSelectedComment(comment)
    setReplyingTo(comment.id!)
    setReplyingToReply(null)
    setIsReplyModalOpen(true)
  }

  // Toplu seçim fonksiyonları
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (isSelectMode) {
      setSelectedComments(new Set())
    }
  }

  const toggleCommentSelection = (commentId: string) => {
    setSelectedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  const selectAllComments = () => {
    const allCommentIds = sortedComments.map(comment => comment.id!).filter(Boolean)
    setSelectedComments(new Set(allCommentIds))
  }

  const clearSelection = () => {
    setSelectedComments(new Set())
  }

  // Toplu silme
  const handleBulkDelete = () => {
    if (selectedComments.size === 0) return
    setIsBulkDeleteModalOpen(true)
  }

  const confirmBulkDelete = async () => {
    if (selectedComments.size === 0) return

    try {
      setIsDeleting(true)
      const commentIds = Array.from(selectedComments)
      const result = await deleteComments(commentIds)
      
      if (result.success > 0) {
        showToast({ 
          title: 'Başarılı', 
          message: `${result.success} yorum silindi${result.failed > 0 ? `, ${result.failed} yorum silinemedi` : ''}`, 
          type: 'success' 
        })
      }
      
      if (result.failed > 0) {
        showToast({ 
          title: 'Hata', 
          message: `${result.failed} yorum silinemedi`, 
          type: 'error' 
        })
      }
      
      // Seçimleri temizle ve sayfayı yenile
      setSelectedComments(new Set())
      setIsBulkDeleteModalOpen(false)
      loadComments(currentPage)
      loadStats()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Toplu silme işlemi sırasında hata oluştu', type: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  // Admin cevabı gönder
  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      showToast({ title: 'Uyarı', message: 'Lütfen yanıtınızı yazın', type: 'error' })
      return
    }

    if (!selectedComment) return

    try {
      setSubmittingReply(true)
      // Admin cevabı oluştur - yeni yapı
      const adminReplyData = {
        commentId: replyingToReply || selectedComment.id!,
        blogId: selectedComment.blogId,
        content: replyContent,
        replyChain: [],
        threadId: `${selectedComment.id!}_${selectedComment.blogId}`
      }
      
      await createAdminReply(adminReplyData)

      showToast({ title: 'Başarılı', message: 'Admin cevabı gönderildi', type: 'success' })
      setIsReplyModalOpen(false)
      setReplyContent("")
      setSelectedComment(null)
      setReplyingTo(null)
      setReplyingToReply(null)
      loadComments(currentPage)
      loadStats()
    } catch (error) {
      showToast({ title: 'Hata', message: 'Admin cevabı gönderilirken hata oluştu', type: 'error' })
    } finally {
      setSubmittingReply(false)
    }
  }

  // Tarih formatla
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Bilinmeyen tarih'
    
    let date: Date
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate()
    } else {
      date = new Date(timestamp)
    }
    
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Sıralanmış yorumlar (filtreleme artık loadComments içinde yapılıyor)
  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        const aTime = a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt as any).getTime()
        const bTime = b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt as any).getTime()
        return bTime - aTime
      case "oldest":
        const aTimeOld = a.createdAt.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt as any).getTime()
        const bTimeOld = b.createdAt.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt as any).getTime()
        return aTimeOld - bTimeOld
      case "author":
        return a.authorName.localeCompare(b.authorName)
      default:
        return 0
    }
  })

  // Error durumunda gösterilecek UI
  if (error) {
    return (
      <div className="space-y-6 w-full max-w-none">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Hata Oluştu</h3>
          <p className="text-neutral-300 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setError(null)
                loadComments(1)
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Tekrar Dene
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="space-y-6 w-full max-w-full overflow-hidden comment-management-container"
      style={{
        maxWidth: '100vw',
        width: '100%',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleSelectMode}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                isSelectMode 
                  ? 'bg-cyan-500/30 text-cyan-300' 
                  : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
              }`}
            >
              {isSelectMode ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
              <span className="hidden sm:inline">{isSelectMode ? 'Seçim Modu' : 'Seçim Modu'}</span>
            </button>
            
            <button
              onClick={() => {
                loadComments(currentPage)
                loadStats()
              }}
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all duration-200 text-sm"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Yenile</span>
            </button>
          </div>
        </div>
        
        {/* Selection Controls - Mobile Responsive */}
        {isSelectMode && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={selectAllComments}
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
              {selectedComments.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm"
                >
                  <Trash className="h-4 w-4" />
                  <span>Seçilenleri Sil ({selectedComments.size})</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 w-full max-w-full overflow-hidden"
        style={{
          maxWidth: '100vw',
          width: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Toplam Yorum</p>
              <p className="text-lg sm:text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 flex-shrink-0" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Onaylandı</p>
              <p className="text-lg sm:text-2xl font-bold text-green-400">{stats.approved}</p>
            </div>
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-400 flex-shrink-0" />
          </div>
        </div>
          
        <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Beklemede</p>
              <p className="text-lg sm:text-2xl font-bold text-yellow-400">{stats.pending}</p>
            </div>
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
          </div>
        </div>

        <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Reddedildi</p>
              <p className="text-lg sm:text-2xl font-bold text-red-400">{stats.rejected}</p>
            </div>
            <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-400 flex-shrink-0" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-3 sm:p-4 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-neutral-400 truncate">Yanıtlar</p>
              <p className="text-lg sm:text-2xl font-bold text-purple-400">{stats.replies}</p>
            </div>
            <Reply className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div 
        className="glass rounded-xl p-4 sm:p-6 border border-white/20 w-full max-w-full overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
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
                placeholder="Yorum ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base transition-all duration-300 hover:bg-white/8"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative min-w-0 sm:min-w-[140px] group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white/5 rounded-lg px-3 sm:px-4 py-2.5 pr-8 text-white focus:outline-none focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base transition-all duration-300 hover:bg-white/8"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <option value="Tümü">Tümü</option>
              <option value="Onaylandı">Onaylandı</option>
              <option value="Beklemede">Beklemede</option>
              <option value="Reddedildi">Reddedildi</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-cyan-400 pointer-events-none transition-colors duration-200" />
          </div>

          {/* Sort */}
          <div className="relative min-w-0 sm:min-w-[140px] group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white/5 rounded-lg px-3 sm:px-4 py-2.5 pr-8 text-white focus:outline-none focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/20 text-sm sm:text-base transition-all duration-300 hover:bg-white/8"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="author">Yazara Göre</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-cyan-400 pointer-events-none transition-colors duration-200" />
          </div>
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-4" />
            <p className="text-neutral-400">Yorumlar yükleniyor...</p>
          </div>
        </div>
      ) : sortedComments.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Yorum bulunamadı</h3>
          <p className="text-neutral-400">Arama kriterlerinize uygun yorum bulunmuyor.</p>
        </div>
      ) : (
        <div 
          className="space-y-4 w-full max-w-full overflow-hidden"
          style={{
            maxWidth: '100vw',
            width: '100%',
            overflowX: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {sortedComments.map((comment) => (
            <MotionDiv
              key={comment.id}
              id={`comment-${comment.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass rounded-xl p-4 sm:p-6 border transition-all duration-300 relative w-full max-w-full break-words overflow-hidden ${
                comment.isRejected === true
                  ? 'border-red-500/60 shadow-red-500/30 opacity-90'
                  : comment.authorEmail === 'admin@softiel.com'
                  ? 'border-cyan-500/30 shadow-cyan-500/10'
                  : 'border-white/10'
              }`}
              style={{ 
                background: comment.isRejected === true
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.1) 100%)'
                  : comment.authorEmail === 'admin@softiel.com'
                  ? 'rgba(6, 182, 212, 0.05)'
                  : 'rgba(255, 255, 255, 0.02)',
                maxWidth: '100vw',
                width: '100%',
                overflowX: 'hidden',
                boxSizing: 'border-box'
              }}
            >

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  {isSelectMode && (
                    <button
                      onClick={() => toggleCommentSelection(comment.id!)}
                      className="flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 hover:scale-110 flex-shrink-0"
                      style={{
                        backgroundColor: selectedComments.has(comment.id!) ? '#06b6d4' : 'transparent',
                        borderColor: selectedComments.has(comment.id!) ? '#06b6d4' : '#6b7280'
                      }}
                    >
                      {selectedComments.has(comment.id!) && (
                        <CheckSquare className="h-3 w-3 text-white" />
                      )}
                    </button>
                  )}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 ${
                    comment.authorEmail === 'admin@softiel.com' 
                      ? 'ring-2 ring-cyan-500/50 ring-offset-2 ring-offset-transparent' 
                      : ''
                  }`} style={{ 
                    background: comment.authorEmail === 'admin@softiel.com' 
                      ? 'rgba(6, 182, 212, 0.1)' 
                      : 'linear-gradient(to right, #8b5cf6, #a855f7)'
                  }}>
                    {comment.authorEmail === 'admin@softiel.com' ? (
                      <img 
                        src="/transparent.webp" 
                        alt="Admin" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <h3 className={`font-semibold text-sm sm:text-base truncate ${
                        comment.authorEmail === 'admin@softiel.com'
                          ? 'text-cyan-300' 
                          : 'text-white'
                      }`}>{comment.authorName}</h3>
                      {comment.authorEmail === 'admin@softiel.com' ? (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30 w-fit">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-cyan-300 font-medium">Admin</span>
                        </div>
                      ) : (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 w-fit">
                          Kullanıcı
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 truncate">{comment.authorEmail}</p>
                    <p className="text-xs text-neutral-500">{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end sm:justify-start">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    comment.isRejected === true
                      ? 'text-red-400 bg-red-500/20' 
                      : comment.isApproved 
                      ? 'text-green-400 bg-green-500/20' 
                      : 'text-yellow-400 bg-yellow-500/20'
                  }`}>
                    {comment.isRejected === true ? 'Reddedildi' : comment.isApproved ? 'Onaylandı' : 'Beklemede'}
                  </span>
                </div>
              </div>

              {/* Blog Source */}
              {blogData.has(comment.blogId) && (
                <div className="mb-4 p-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/30">
                  <div className="flex items-center space-x-2 min-w-0">
                    <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-300 flex-shrink-0">Kaynak:</span>
                    <span className="text-xs sm:text-sm text-blue-300 font-medium truncate">
                      {blogData.get(comment.blogId)?.title}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="mb-4 w-full min-w-0 max-w-full overflow-hidden">
                <p className={`text-sm sm:text-base leading-relaxed break-words overflow-wrap-anywhere hyphens-auto w-full max-w-full ${
                  comment.isRejected === true
                    ? 'text-red-200/90'
                    : comment.authorEmail === 'admin@softiel.com'
                    ? 'text-cyan-100 font-medium' 
                    : 'text-neutral-200'
                }`}>{comment.content}</p>
                {comment.authorEmail === 'admin@softiel.com' && (
             <div className="mt-2">
               <span className="text-xs text-cyan-400">Resmi Yanıt</span>
             </div>
           )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {comment.isRejected !== true && comment.isApproved && (
                    <button
                      onClick={() => handleLike(comment.id!)}
                      className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        likedComments.has(comment.id!)
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${likedComments.has(comment.id!) ? 'fill-current' : ''}`} />
                      <span className="text-xs sm:text-sm">{comment.likes || 0}</span>
                    </button>
                  )}
                  
                  {comment.isRejected === true && (
                    <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-red-300/60">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">{comment.likes || 0}</span>
                      <span className="text-xs text-red-400/60 ml-1 sm:ml-2 hidden sm:inline">(Deaktif)</span>
                    </div>
                  )}

                  {!comment.isApproved && comment.isRejected !== true && (
                    <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-yellow-300/60">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">{comment.likes || 0}</span>
                      <span className="text-xs text-yellow-400/60 ml-1 sm:ml-2 hidden sm:inline">(Beklemede)</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  {comment.isRejected === true ? (
                    // Reddedilmiş yorumlar için sadece sil butonu
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment.id!)}
                      className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Sil</span>
                    </button>
                  ) : (
                    // Diğer yorumlar için normal butonlar
                    <>
                      {!comment.isApproved && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(comment.id!, true)}
                            className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Onayla</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(comment.id!, false)}
                            className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
                          >
                            <XCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">Reddet</span>
                          </button>
                        </>
                      )}

                      {comment.isApproved && (
                        <button
                          type="button"
                          onClick={() => handleReply(comment)}
                          className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 text-sm"
                        >
                          <Reply className="h-4 w-4" />
                          <span className="hidden sm:inline">Yanıtla</span>
                        </button>
                      )}

                      {comment.isApproved && (
                        <button
                          type="button"
                          onClick={() => router.push(`/content-management-system-2024/comments/${comment.id}`)}
                          className="flex items-center space-x-1 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Detayları Gör</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment.id!)}
                        className="flex items-center space-x-1 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Sil</span>
                      </button>
                    </>
                  )}
                </div>
                    </div>
            </MotionDiv>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div 
          className="mt-8 w-full max-w-full overflow-hidden"
          style={{
            maxWidth: '100vw',
            width: '100%',
            overflowX: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <div className="text-center mb-4 text-xs sm:text-sm text-neutral-400 px-4">
            <div className="block sm:hidden">
              Sayfa {currentPage} / {totalPages}
            </div>
            <div className="hidden sm:block">
              Sayfa {currentPage} / {totalPages} - Bu sayfada {sortedComments.length} yorum - Toplam {totalComments} yorum
            </div>
          </div>
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 w-full max-w-full overflow-hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">← Önceki</span>
              <span className="sm:hidden">←</span>
            </button>
            
            <div className="flex items-center space-x-1 overflow-x-auto max-w-full min-w-0">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg transition-all duration-200 whitespace-nowrap ${
                    currentPage === page
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Sonraki →</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {isReplyModalOpen && selectedComment && (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
            setIsReplyModalOpen(false)
            setSelectedComment(null)
          setReplyingTo(null)
          setReplyingToReply(null)
      setReplyContent("")
        }
      }}
    >
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass rounded-2xl p-4 sm:p-6 border border-white/20 shadow-modern max-w-2xl w-full mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto"
        style={{ 
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white">Yanıt Gönder</h2>
          <button
                onClick={() => {
                  setIsReplyModalOpen(false)
                  setSelectedComment(null)
                  setReplyingTo(null)
                  setReplyingToReply(null)
                  setReplyContent("")
                }}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

            <div className="space-y-4">
              {/* Admin Bilgileri */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
          </div>
                  <div className="min-w-0">
                    <p className="text-cyan-400 font-medium text-sm sm:text-base">Admin Yanıtı</p>
                    <p className="text-neutral-400 text-xs sm:text-sm truncate">admin@softiel.com</p>
                  </div>
                </div>
        </div>

          <div>
                <label className="block text-sm font-medium text-white mb-2">Yanıtınız</label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 bg-white/5 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-y min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  placeholder="Yanıtınızı yazın..."
                />
          </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
            <button
                  onClick={() => {
                    setIsReplyModalOpen(false)
                    setSelectedComment(null)
                    setReplyingTo(null)
                    setReplyingToReply(null)
                    setReplyContent("")
                  }}
                  className="px-4 py-2 text-neutral-400 hover:text-white transition-colors text-sm sm:text-base"
            >
              İptal
            </button>
            <button
                  onClick={handleSubmitReply}
                  disabled={submittingReply}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {submittingReply ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                  <Send className="h-4 w-4" />
              )}
                  <span>{submittingReply ? 'Gönderiliyor...' : 'Gönder'}</span>
            </button>
          </div>
            </div>
      </MotionDiv>
    </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsDeleteModalOpen(false)
          setCommentToDelete(null)
        }
      }}
    >
      <MotionDiv
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
              <div className="p-2 bg-red-500/20 rounded-full flex-shrink-0">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
        </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">Yorumu Sil</h3>
          </div>
            
            <p className="text-neutral-300 mb-6 text-sm sm:text-base">
              Bu yorumu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  setCommentToDelete(null)
                }}
                className="px-4 py-2 text-neutral-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                İptal
              </button>
                  <button
                onClick={confirmDeleteComment}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
              >
                Sil
              </button>
          </div>
        </MotionDiv>
          </div>
        )}

      {/* Bulk Delete Confirmation Modal */}
      {isBulkDeleteModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsBulkDeleteModalOpen(false)
            }
          }}
        >
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-4 sm:p-6 border border-white/20 shadow-modern max-w-md w-full"
            style={{ 
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Trash className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-white">Toplu Silme Onayı</h3>
                <p className="text-xs sm:text-sm text-neutral-400">Seçilen yorumları silmek istediğinizden emin misiniz?</p>
              </div>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">Uyarı</span>
              </div>
              <p className="text-xs sm:text-sm text-red-300 mt-1">
                {selectedComments.size} yorum silinecek. Bu işlem geri alınamaz.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setIsBulkDeleteModalOpen(false)}
                className="px-4 py-2 text-neutral-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                İptal
              </button>
              <button
                onClick={confirmBulkDelete}
                disabled={isDeleting}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
                <span>{isDeleting ? 'Siliniyor...' : 'Sil'}</span>
              </button>
            </div>
          </MotionDiv>
        </div>
      )}
    </div>
  )
}
