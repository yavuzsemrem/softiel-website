"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  AlertTriangle
} from "lucide-react"
import { 
  getComments, 
  getAllComments,
  getMainComments,
  approveComment, 
  deleteComment, 
  createComment,
  getCommentStats,
  likeComment,
  getComment,
  Comment as CommentType 
} from "@/lib/comment-service"
import { getBlog } from "@/lib/blog-service"
import { useToast } from "@/components/toast"
import { ModalReplyItem } from "@/components/modal-reply-item"

export function CommentManagement() {
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
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    replies: 0
  })
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const [replyContent, setReplyContent] = useState("")
  const [replyAuthorName, setReplyAuthorName] = useState("")
  const [replyAuthorEmail, setReplyAuthorEmail] = useState("")
  const [submittingReply, setSubmittingReply] = useState(false)
  const { showToast } = useToast()

  // Yorumları yükle
  const loadComments = async () => {
    try {
      setLoading(true)
      // Sadece ana yorumları getir (isReply: false ve parentCommentId yok)
      const mainComments = await getMainComments()
      setComments(mainComments)
    } catch (error) {
      console.error('Ana yorumlar yüklenirken hata:', error)
      showToast({ title: 'Ana yorumlar yüklenirken hata oluştu', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // İstatistikleri yükle
  const loadStats = async () => {
    try {
      const statsData = await getCommentStats()
      setStats(statsData)
    } catch (error) {
      console.error('İstatistikler yüklenirken hata:', error)
    }
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

  useEffect(() => {
    loadComments()
    loadStats()
  }, [])

  // Durum değiştir
  const handleStatusChange = async (id: string, approved: boolean) => {
    try {
      await approveComment(id, approved)
      showToast({ title: approved ? 'Yorum onaylandı' : 'Yorum reddedildi', type: 'success' })
      loadComments()
      loadStats()
    } catch (error) {
      console.error('Durum değiştirme hatası:', error)
      showToast({ title: 'Durum değiştirilirken hata oluştu', type: 'error' })
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
      showToast({ title: 'Yorum silindi', type: 'success' })
      loadComments()
      loadStats()
    } catch (error) {
      console.error('Yorum silme hatası:', error)
      showToast({ title: 'Yorum silinirken hata oluştu', type: 'error' })
    } finally {
      setIsDeleteModalOpen(false)
      setCommentToDelete(null)
    }
  }

  // Beğeni
  const handleLike = async (id: string) => {
    try {
      await likeComment(id, 'admin-user')
      setLikedComments(prev => {
        const newSet = new Set(prev)
        if (newSet.has(id)) {
          newSet.delete(id)
        } else {
          newSet.add(id)
        }
        return newSet
      })
      loadComments()
    } catch (error) {
      console.error('Beğeni hatası:', error)
      showToast({ title: 'Beğeni işlemi sırasında hata oluştu', type: 'error' })
    }
  }

  // Yanıtla
  const handleReply = (comment: CommentType) => {
    setSelectedComment(comment)
    setReplyingTo(comment.id!)
    setReplyingToReply(null)
    setIsReplyModalOpen(true)
  }

  // Yanıt gönder
  const handleSubmitReply = async () => {
    if (!replyContent.trim() || !replyAuthorName.trim() || !replyAuthorEmail.trim()) {
      showToast({ title: 'Lütfen tüm alanları doldurun', type: 'error' })
      return
    }

    if (!selectedComment) return

    try {
      setSubmittingReply(true)
      await createComment({
        blogId: selectedComment.blogId,
        authorName: replyAuthorName,
        authorEmail: replyAuthorEmail,
        content: replyContent,
        parentCommentId: replyingToReply || selectedComment.id!,
        isReply: true,
        isApproved: true
      })

      showToast({ title: 'Yanıt gönderildi', type: 'success' })
      setIsReplyModalOpen(false)
      setReplyContent("")
      setReplyAuthorName("")
      setReplyAuthorEmail("")
      setSelectedComment(null)
      setReplyingTo(null)
      setReplyingToReply(null)
      loadComments()
      loadStats()
    } catch (error) {
      console.error('Yanıt gönderme hatası:', error)
      showToast({ title: 'Yanıt gönderilirken hata oluştu', type: 'error' })
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

  // Filtrelenmiş yorumlar
  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "Tümü" ||
                         (statusFilter === "Onaylandı" && comment.isApproved && !comment.isReply) ||
                         (statusFilter === "Beklemede" && !comment.isApproved && !comment.isReply)
    
    return matchesSearch && matchesStatus
  })

  const sortedComments = [...filteredComments].sort((a, b) => {
    switch (sortBy) {
      case "newest": {
        const dateB = a.createdAt && typeof a.createdAt === 'object' && 'toDate' in a.createdAt 
          ? a.createdAt.toDate() 
          : new Date(a.createdAt)
        const dateA = b.createdAt && typeof b.createdAt === 'object' && 'toDate' in b.createdAt 
          ? b.createdAt.toDate() 
          : new Date(b.createdAt)
        return dateA.getTime() - dateB.getTime()
      }
      case "oldest": {
        const dateA = a.createdAt && typeof a.createdAt === 'object' && 'toDate' in a.createdAt 
          ? a.createdAt.toDate() 
          : new Date(a.createdAt)
        const dateB = b.createdAt && typeof b.createdAt === 'object' && 'toDate' in b.createdAt 
          ? b.createdAt.toDate() 
          : new Date(b.createdAt)
        return dateA.getTime() - dateB.getTime()
      }
      case "author":
        return a.authorName.localeCompare(b.authorName)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Yorumlar</h1>
          <p className="text-neutral-400">Tüm yorumları yönetin ve moderasyon yapın</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              loadComments()
              loadStats()
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Yenile</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Toplam Yorum</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-cyan-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Onaylandı</p>
              <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Beklemede</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Yanıtlar</p>
              <p className="text-2xl font-bold text-purple-400">{stats.replies}</p>
            </div>
            <Reply className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Yorum ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            >
              <option value="Tümü">Tümü</option>
              <option value="Onaylandı">Onaylandı</option>
              <option value="Beklemede">Beklemede</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            >
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="author">Yazara Göre</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
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
        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass rounded-xl p-6 border transition-all duration-300 ${
                comment.authorEmail === 'admin@softiel.com'
                  ? 'border-cyan-500/30 shadow-cyan-500/10'
                  : 'border-white/10'
              }`}
              style={{
                background: comment.authorEmail === 'admin@softiel.com'
                  ? 'rgba(6, 182, 212, 0.05)'
                  : 'rgba(255, 255, 255, 0.02)'
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${
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
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold ${
                        comment.authorEmail === 'admin@softiel.com'
                          ? 'text-cyan-300'
                          : 'text-white'
                      }`}>{comment.authorName}</h3>
                      {comment.authorEmail === 'admin@softiel.com' ? (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-cyan-300 font-medium">Admin</span>
                        </div>
                      ) : (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                          Kullanıcı
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-400">{comment.authorEmail}</p>
                    <p className="text-xs text-neutral-500">{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    comment.isApproved ? 'text-green-400 bg-green-500/20' : 'text-yellow-400 bg-yellow-500/20'
                  }`}>
                    {comment.isApproved ? 'Onaylandı' : 'Beklemede'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className={`text-base leading-relaxed ${
                  comment.authorEmail === 'admin@softiel.com'
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {comment.isApproved ? (
                    <button
                      onClick={() => handleLike(comment.id!)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        likedComments.has(comment.id!)
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${likedComments.has(comment.id!) ? 'fill-current' : ''}`} />
                      <span className="text-sm">{comment.likes || 0}</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 px-3 py-2 text-yellow-300/60">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{comment.likes || 0}</span>
                      <span className="text-xs text-yellow-400/60 ml-2">(Beklemede)</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {comment.isRejected === true ? (
                    // Reddedilmiş yorumlar için sadece sil butonu
                    <button
                      onClick={() => handleDeleteComment(comment.id!)}
                      className="flex items-center space-x-1 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Sil</span>
                    </button>
                  ) : (
                    // Diğer yorumlar için normal butonlar
                    <>
                      {!comment.isApproved && (
                        <>
                          <button
                            onClick={() => handleStatusChange(comment.id!, true)}
                            className="flex items-center space-x-1 px-3 py-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Onayla</span>
                          </button>
                          <button
                            onClick={() => handleStatusChange(comment.id!, false)}
                            className="flex items-center space-x-1 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Reddet</span>
                          </button>
                        </>
                      )}
                      
                      {comment.isApproved && (
                        <button
                          onClick={() => handleStatusChange(comment.id!, false)}
                          className="flex items-center space-x-1 px-3 py-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-all duration-200 text-sm"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Beklet</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleReply(comment)}
                        className="flex items-center space-x-1 px-3 py-2 text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 text-sm"
                      >
                        <Reply className="h-4 w-4" />
                        <span>Yanıtla</span>
                      </button>

                      <button
                        onClick={() => router.push(`/dashboard/comments/${comment.id}`)}
                        className="flex items-center space-x-1 px-3 py-2 text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 text-sm"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Detayları Gör</span>
                      </button>

                      <button
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
            </motion.div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {isReplyModalOpen && selectedComment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-6 border border-white/20 shadow-modern max-w-2xl w-full"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Yanıt Gönder</h2>
              <button
                onClick={() => {
                  setIsReplyModalOpen(false)
                  setSelectedComment(null)
                  setReplyingTo(null)
                  setReplyingToReply(null)
                  setReplyContent("")
                  setReplyAuthorName("")
                  setReplyAuthorEmail("")
                }}
                className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Adınız</label>
                <input
                  type="text"
                  value={replyAuthorName}
                  onChange={(e) => setReplyAuthorName(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  placeholder="Adınızı girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">E-posta</label>
                <input
                  type="email"
                  value={replyAuthorEmail}
                  onChange={(e) => setReplyAuthorEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  placeholder="E-posta adresinizi girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Yanıtınız</label>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-y min-h-[100px]"
                  placeholder="Yanıtınızı yazın..."
                />
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsReplyModalOpen(false)
                    setSelectedComment(null)
                    setReplyingTo(null)
                    setReplyingToReply(null)
                    setReplyContent("")
                    setReplyAuthorName("")
                    setReplyAuthorEmail("")
                  }}
                  className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleSubmitReply}
                  disabled={submittingReply}
                  className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-4 sm:p-6 border border-white/20 shadow-modern max-w-md w-full mx-4 sm:mx-0"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Yorumu Sil</h3>
            </div>
            
            <p className="text-neutral-300 mb-6">
              Bu yorumu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  setCommentToDelete(null)
                }}
                className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
              >
                İptal
              </button>
              <button
                onClick={confirmDeleteComment}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Sil
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

