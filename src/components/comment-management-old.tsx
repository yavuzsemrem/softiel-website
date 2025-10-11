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
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalComments, setTotalComments] = useState(0)
  const commentsPerPage = 20
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    replies: 0
  })
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const { showToast } = useToast()

  // Format date helper
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Tarih yok'
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'Tarih formatı hatası'
    }
  }

  // Like handler
  const handleLike = async (commentId: string) => {
    try {
      // Geçici olarak 'admin' userId kullanıyoruz
      await likeComment(commentId, 'admin')
      setLikedComments(prev => {
        const newSet = new Set(prev)
        if (newSet.has(commentId)) {
          newSet.delete(commentId)
        } else {
          newSet.add(commentId)
        }
        return newSet
      })
      loadComments() // Refresh to update like counts
    } catch (error) {
      console.error('Beğeni hatası:', error)
    }
  }

  // Yorumları yükle
  useEffect(() => {
    loadComments()
    loadStats()
  }, [])

  const loadComments = async (page: number = 1) => {
    try {
      setLoading(true)
      setError("")
      // Tüm yorumları getir (limit yok)
      const allComments = await getAllComments()
      
      // Sadece ana yorumları filtrele (yanıtları hariç tut)
      const mainComments = allComments.filter(comment => !comment.isReply)
      
      // Paging hesaplama
      const total = mainComments.length
      const totalPages = Math.ceil(total / commentsPerPage)
      const startIndex = (page - 1) * commentsPerPage
      const endIndex = startIndex + commentsPerPage
      const paginatedComments = mainComments.slice(startIndex, endIndex)
      
      setComments(paginatedComments)
      setTotalPages(totalPages)
      setTotalComments(total)
      setCurrentPage(page)
    } catch (err) {
      console.error('Yorumlar yükleme hatası:', err)
      setError("Yorumlar yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  // Çok seviyeli yanıtları düzenle
  const organizeReplies = (replies: CommentType[], allReplies: CommentType[]): CommentType[] => {
    return replies.map(reply => {
      // Bu yanıta direkt yanıt verilen yorumları bul
      const subReplies = allReplies.filter(subReply => 
        subReply.parentCommentId === reply.id && 
        subReply.id !== reply.id
      )
      
      // Alt yanıtları da organize et (recursive)
      const organizedSubReplies = subReplies.length > 0 
        ? organizeReplies(subReplies, allReplies)
        : []
      
      return {
        ...reply,
        replies: organizedSubReplies
      }
    })
  }


  const loadStats = async () => {
    try {
      const statsData = await getCommentStats()
      setStats(statsData)
    } catch (err) {
      console.error('İstatistikler yükleme hatası:', err)
    }
  }

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "Tümü" || 
                         (statusFilter === "Onaylandı" && comment.isApproved) ||
                         (statusFilter === "Beklemede" && !comment.isApproved && !comment.isReply)
    
    return matchesSearch && matchesStatus
  })

  const sortedComments = [...filteredComments].sort((a, b) => {
    switch (sortBy) {
      case "newest": {
        const dateB = b.createdAt && typeof b.createdAt === 'object' && 'toDate' in b.createdAt 
          ? b.createdAt.toDate() 
          : new Date(b.createdAt)
        const dateA = a.createdAt && typeof a.createdAt === 'object' && 'toDate' in a.createdAt 
          ? a.createdAt.toDate() 
          : new Date(a.createdAt)
        return dateB.getTime() - dateA.getTime()
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

  const handleStatusChange = async (commentId: string, approved: boolean) => {
    try {
      await approveComment(commentId, approved)
      
      // Yorumları yenile
      await loadComments()
      await loadStats()
      
      showToast({
        type: 'success',
        title: approved ? 'Yorum Onaylandı' : 'Yorum Reddedildi',
        message: approved ? 'Yorum başarıyla onaylandı ve yayınlandı.' : 'Yorum reddedildi ve gizlendi.'
      })
    } catch (err) {
      console.error('Yorum durumu güncelleme hatası:', err)
      showToast({
        type: 'error',
        title: 'Hata',
        message: 'Yorum durumu güncellenirken bir hata oluştu.'
      })
    }
  }

  const handleDeleteComment = (commentId: string) => {
    setCommentToDelete(commentId)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteComment = async () => {
    if (!commentToDelete) return
    
    try {
      await deleteComment(commentToDelete)
      
      // Yorumları yenile
      await loadComments()
      await loadStats()
      
      showToast({
        type: 'success',
        title: 'Yorum Silindi',
        message: 'Yorum başarıyla silindi.'
      })
    } catch (err) {
      console.error('Yorum silme hatası:', err)
      showToast({
        type: 'error',
        title: 'Hata',
        message: 'Yorum silinirken bir hata oluştu.'
      })
    } finally {
      setIsDeleteModalOpen(false)
      setCommentToDelete(null)
    }
  }

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  const getStatusColor = (isApproved: boolean, isReply: boolean) => {
    if (isReply) return "text-purple-400 bg-purple-500/20"
    if (isApproved) return "text-green-400 bg-green-500/20"
    return "text-yellow-400 bg-yellow-500/20"
  }

  const getStatusText = (isApproved: boolean, isReply: boolean) => {
    if (isReply) return "Yanıt"
    if (isApproved) return "Onaylandı"
    return "Beklemede"
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-neutral-400">Yorumlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-2xl p-8 border border-red-500/20 max-w-md mx-auto" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Yorum İstatistikleri</h2>
            <p className="text-sm text-neutral-400">Toplam yorum sayıları ve durumları</p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center space-x-4">
            <div className="glass rounded-xl p-4 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-neutral-400">Toplam Yorum</div>
            </div>
            <div className="glass rounded-xl p-4 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
              <div className="text-xs text-neutral-400">Onaylandı</div>
            </div>
            <div className="glass rounded-xl p-4 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
              <div className="text-xs text-neutral-400">Beklemede</div>
            </div>
            <div className="glass rounded-xl p-4 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="text-2xl font-bold text-purple-400">{stats.replies}</div>
              <div className="text-xs text-neutral-400">Yanıtlar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="glass rounded-xl p-6 border border-white/20 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Yorum ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="Tümü">Tüm Durumlar</option>
            <option value="Onaylandı">Onaylandı</option>
            <option value="Beklemede">Beklemede</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="author">Yazara Göre</option>
          </select>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === "list" 
                  ? "bg-cyan-500/20 text-cyan-400" 
                  : "text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-lg transition-all duration-200 ${
                viewMode === "grid" 
                  ? "bg-cyan-500/20 text-cyan-400" 
                  : "text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            
            {/* Yenile Butonu */}
            <button
              onClick={() => {
                loadComments()
                loadStats()
              }}
              className="p-3 text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200"
              title="Yorumları Yenile"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
        <AnimatePresence>
          {sortedComments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={`glass rounded-xl p-6 border transition-all duration-300 hover:shadow-modern-lg hover:scale-[1.02] ${
                comment.authorEmail === 'admin@softiel.com'
                  ? 'border-cyan-500/50 shadow-cyan-500/20 hover:shadow-cyan-500/30'
                  : 'border-white/20'
              }`}
              style={{ 
                background: comment.authorEmail === 'admin@softiel.com' 
                  ? 'rgba(6, 182, 212, 0.1)' 
                  : 'rgba(255, 255, 255, 0.1)',
                boxShadow: comment.authorEmail === 'admin@softiel.com' 
                  ? '0 0 20px rgba(6, 182, 212, 0.2)' 
                  : undefined
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
                      : 'linear-gradient(to right, #06b6d4, #3b82f6)'
                  }}>
                    {comment.authorEmail === 'admin@softiel.com' ? (
                      <img 
                        src="/transparent.webp" 
                        alt="Admin" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white font-semibold text-sm">
                        {comment.authorName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-sm font-semibold ${
                        comment.authorEmail === 'admin@softiel.com' 
                          ? 'text-cyan-300' 
                          : 'text-white'
                      }`}>{comment.authorName}</h3>
                      {comment.authorEmail === 'admin@softiel.com' ? (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-cyan-300 font-medium">Admin</span>
                        </div>
                      ) : comment.isReply ? (
                        <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                          Yanıt
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-neutral-400">{comment.authorEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comment.isApproved, comment.isReply)}`}>
                    {getStatusText(comment.isApproved, comment.isReply)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className={`text-sm leading-relaxed ${
                  comment.authorEmail === 'admin@softiel.com' 
                    ? 'text-cyan-100 font-medium' 
                    : 'text-neutral-300'
                }`}>{comment.content}</p>
           {comment.authorEmail === 'admin@softiel.com' && (
             <div className="mt-2">
               <span className="text-xs text-cyan-400">Resmi Yanıt</span>
             </div>
           )}
              </div>

              {/* Post Info */}
              <div className="mb-4 p-3 glass rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center space-x-2 text-xs text-neutral-400">
                  <FileText className="h-3 w-3" />
                  <span>Blog ID: {comment.blogId}</span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{comment.likes || 0} beğeni</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                {!comment.isApproved && !comment.isReply && (
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
                
                {comment.isApproved && !comment.isReply && (
                  <button
                    onClick={() => handleStatusChange(comment.id!, false)}
                    className="flex items-center space-x-1 px-3 py-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-all duration-200 text-sm"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Bekletmeye Al</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedComment(comment)
                    setIsReplyModalOpen(true)
                  }}
                  className="flex items-center space-x-1 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <Reply className="h-4 w-4" />
                  <span>Yanıtla</span>
                </button>

                <button
                  onClick={() => router.push(`/content-management-system-2024/comments/${comment.id}`)}
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
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {sortedComments.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="glass rounded-2xl shadow-modern p-12 border border-white/50 max-w-md mx-auto"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <MessageSquare className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Yorum bulunamadı
            </h3>
            <p className="text-neutral-400 mb-6">
              Arama kriterlerinize uygun yorum bulunamadı.
            </p>
          </div>
        </motion.div>
      )}

      {/* Paging */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button
            onClick={() => loadComments(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Önceki
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => loadComments(page)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                    page === currentPage
                      ? 'bg-cyan-500 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>
          
          <button
            onClick={() => loadComments(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sonraki
          </button>
        </div>
      )}

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <ReplyModal
          isOpen={isReplyModalOpen}
          onClose={() => {
            setIsReplyModalOpen(false)
            setSelectedComment(null)
          }}
          comment={selectedComment}
          onReplySubmit={() => {
            loadComments()
            loadStats()
          }}
        />
      )}


      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-modern"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/20 mb-4">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                Yorumu Sil
              </h3>
              
              <p className="text-neutral-300 mb-6">
                Bu yorumu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false)
                    setCommentToDelete(null)
                  }}
                  className="flex-1 px-4 py-3 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  İptal
                </button>
                <button
                  onClick={confirmDeleteComment}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium"
                >
                  Sil
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

// Reply Item Component (Recursive)
function ReplyItem({ 
  reply, 
  parentComment, 
  onStatusChange, 
  onDelete, 
  onReply, 
  formatDate 
}: {
  reply: CommentType & { replies?: CommentType[] }
  parentComment: CommentType
  onStatusChange: (id: string, approved: boolean) => void
  onDelete: (id: string) => void
  onReply: (reply: CommentType) => void
  formatDate: (timestamp: any) => string
}) {
  return (
    <div className="relative">
      {/* Yanıt Çizgisi */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-cyan-500/20 to-transparent"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="ml-6 relative"
      >
        {/* Yanıt Kartı */}
        <div className={`glass rounded-xl p-5 border shadow-modern hover:shadow-modern-lg transition-all duration-300 group ${
          reply.authorEmail === 'admin@softiel.com' 
            ? 'border-cyan-500/50 shadow-cyan-500/20 hover:shadow-cyan-500/30' 
            : 'border-white/10'
        }`}
             style={{ 
               background: reply.authorEmail === 'admin@softiel.com' 
                 ? 'rgba(6, 182, 212, 0.1)' 
                 : 'rgba(255, 255, 255, 0.03)',
               boxShadow: reply.authorEmail === 'admin@softiel.com' 
                 ? '0 0 15px rgba(6, 182, 212, 0.15)' 
                 : undefined
             }}>
          
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                reply.authorEmail === 'admin@softiel.com' 
                  ? 'ring-2 ring-cyan-500/50 ring-offset-1 ring-offset-transparent' 
                  : ''
              }`} 
                   style={{ background: reply.authorEmail === 'admin@softiel.com' 
                     ? 'rgba(6, 182, 212, 0.1)' 
                     : 'linear-gradient(to right, #8b5cf6, #a855f7)' }}>
                {reply.authorEmail === 'admin@softiel.com' ? (
                  <img 
                    src="/transparent.webp" 
                    alt="Admin" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h5 className={`font-semibold text-sm ${
                    reply.authorEmail === 'admin@softiel.com' 
                      ? 'text-cyan-300' 
                      : 'text-white'
                  }`}>{reply.authorName}</h5>
                  {reply.authorEmail === 'admin@softiel.com' ? (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-cyan-300 font-medium">Admin</span>
                    </div>
                  ) : (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                      Kullanıcı
                    </span>
                  )}
                  {reply.authorEmail !== 'admin@softiel.com' && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reply.isApproved 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {reply.isApproved ? 'Onaylandı' : 'Beklemede'}
                    </span>
                  )}
                </div>
                <span className="text-xs text-neutral-400">{formatDate(reply.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* İçerik */}
          <div className="mb-4">
            <p className={`text-sm leading-relaxed ${
              reply.authorEmail === 'admin@softiel.com' 
                ? 'text-cyan-100 font-medium' 
                : 'text-neutral-200'
            }`}>{reply.content}</p>
                 {reply.authorEmail === 'admin@softiel.com' && (
                   <div className="mt-2">
                     <span className="text-xs text-cyan-400">Resmi Yanıt</span>
                   </div>
                 )}
          </div>

          {/* Aksiyonlar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {reply.authorEmail !== 'admin@softiel.com' && (
                <>
                  {!reply.isApproved && (
                    <>
                      <button
                        onClick={() => onStatusChange(reply.id!, true)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-green-400 hover:bg-green-500/20 rounded-lg text-xs transition-all duration-200"
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span className="font-medium">Onayla</span>
                      </button>
                      <button
                        onClick={() => onStatusChange(reply.id!, false)}
                        className="flex items-center space-x-1 px-3 py-1.5 text-red-400 hover:bg-red-500/20 rounded-lg text-xs transition-all duration-200"
                      >
                        <XCircle className="h-3 w-3" />
                        <span className="font-medium">Reddet</span>
                      </button>
                    </>
                  )}
                  
                  {reply.isApproved && (
                    <button
                      onClick={() => onStatusChange(reply.id!, false)}
                      className="flex items-center space-x-1 px-3 py-1.5 text-yellow-400 hover:bg-yellow-500/20 rounded-lg text-xs transition-all duration-200"
                    >
                      <XCircle className="h-3 w-3" />
                      <span className="font-medium">Bekletmeye Al</span>
                    </button>
                  )}
                </>
              )}
              
              <button
                onClick={() => onReply(reply)}
                className="flex items-center space-x-1 px-3 py-1.5 text-cyan-400 hover:bg-cyan-500/20 rounded-lg text-xs transition-all duration-200"
              >
                <Reply className="h-3 w-3" />
                <span className="font-medium">Yanıtla</span>
              </button>
              
              <button
                onClick={() => onDelete(reply.id!)}
                className="flex items-center space-x-1 px-3 py-1.5 text-red-400 hover:bg-red-500/20 rounded-lg text-xs transition-all duration-200"
              >
                <Trash2 className="h-3 w-3" />
                <span className="font-medium">Sil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alt Yanıtlar - Recursive */}
        {reply.replies && reply.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {reply.replies.map((subReply) => (
              <ReplyItem
                key={subReply.id}
                reply={subReply}
                parentComment={parentComment}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                onReply={(subReply) => onReply(subReply)}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Reply Modal Component
function ReplyModal({ isOpen, onClose, comment, onReplySubmit }: { 
  isOpen: boolean, 
  onClose: () => void, 
  comment: CommentType | null,
  onReplySubmit?: () => void 
}) {
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment || !replyContent.trim()) return

    setIsSubmitting(true)
    try {
      // Yanıtı Firestore'a kaydet
      await createComment({
        blogId: comment.blogId,
        authorName: "Admin",
        authorEmail: "admin@softiel.com",
        content: replyContent.trim(),
        isApproved: true, // Admin yanıtı otomatik onaylı
        isReply: true,
        parentCommentId: comment.id // Her zaman yanıt verilen yorumun ID'sini kullan
      })

      showToast({
        type: 'success',
        title: 'Yanıt Gönderildi',
        message: 'Yanıtınız başarıyla gönderildi ve yayınlandı.',
        duration: 3000
      })
      
      setReplyContent("")
      onClose()
      
      // Yorumları yenile
      if (onReplySubmit) {
        onReplySubmit()
      }
    } catch (err) {
      console.error('Yanıt gönderme hatası:', err)
      showToast({
        type: 'error',
        title: 'Hata',
        message: 'Yanıt gönderilirken bir hata oluştu!'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !comment) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass rounded-2xl p-8 w-full max-w-2xl border border-white/20 backdrop-blur-lg"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {comment.isReply ? 'Yanıta Yanıt Yaz' : 'Yanıt Yaz'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Original Comment */}
        <div className="mb-6 p-4 glass rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-white">{comment.authorName}</span>
            <span className="text-xs text-neutral-400">{comment.authorEmail}</span>
          </div>
          <p className="text-sm text-neutral-300">{comment.content}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">Yanıtınız</label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 border border-white/20 resize-none min-h-[120px]"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="Yanıtınızı buraya yazınız..."
              required
            />
            <p className="text-xs text-neutral-400 mt-2">
              En az 5 karakter olmalıdır ({replyContent.length}/5)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 order-2 sm:order-1"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || replyContent.trim().length < 5}
              className="flex items-center justify-center space-x-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-modern disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Gönderiliyor...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Yanıt Gönder</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

// Comment Detail Modal Component
function CommentDetailModal({
  isOpen,
  onClose,
  comment,
  onStatusChange,
  onDelete,
  onLike,
  likedComments,
  formatDate,
  onReply
}: {
  isOpen: boolean
  onClose: () => void
  comment: CommentType
  onStatusChange: (id: string, approved: boolean) => void
  onDelete: (id: string) => void
  onLike: (id: string) => void
  likedComments: Set<string>
  formatDate: (timestamp: any) => string
  onReply?: (comment: CommentType) => void
}) {
  const [modalComment, setModalComment] = useState<CommentType | null>(null)
  const [loading, setLoading] = useState(false)

  // Modal için yanıtları organize et
  const organizeRepliesForModal = (replies: CommentType[], allComments: CommentType[]): CommentType[] => {
    return replies.map(reply => {
      // Bu yanıta direkt yanıt verilen yorumları bul (isReply kontrolü olmadan)
      const subReplies = allComments.filter(subReply => 
        subReply.parentCommentId === reply.id && 
        subReply.id !== reply.id
      )
      
      // Alt yanıtları tarihe göre sırala (en yeni önce)
      subReplies.sort((a, b) => {
        const dateA = a.createdAt && typeof a.createdAt === 'object' && 'toDate' in a.createdAt 
          ? a.createdAt.toDate() 
          : new Date(a.createdAt)
        const dateB = b.createdAt && typeof b.createdAt === 'object' && 'toDate' in b.createdAt 
          ? b.createdAt.toDate() 
          : new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
      
      // Alt yanıtları da organize et (recursive)
      const organizedSubReplies = subReplies.length > 0 
        ? organizeRepliesForModal(subReplies, allComments)
        : []
      
      return {
        ...reply,
        replies: organizedSubReplies
      }
    })
  }

  // Popup açıkken body scroll'unu engelle
  useEffect(() => {
    if (isOpen) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Keyboard scroll engelleme
      const preventScroll = (e: Event) => {
        e.preventDefault()
      }
      
      // Scroll engelleme event'leri
      document.addEventListener('wheel', preventScroll, { passive: false })
      document.addEventListener('touchmove', preventScroll, { passive: false })
      document.addEventListener('keydown', (e) => {
        // Page Up, Page Down, Home, End, Arrow keys
        if ([33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault()
        }
      })
      
      return () => {
        // Event listener'ları temizle
        document.removeEventListener('wheel', preventScroll)
        document.removeEventListener('touchmove', preventScroll)
      }
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
    
    // Cleanup function
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Modal açıldığında yorumu ve yanıtlarını yükle
  useEffect(() => {
    if (isOpen && comment?.id) {
      setLoading(true)
      
      // Tüm yorumları getir ve client-side'da organize et
      getAllComments()
        .then(allComments => {
          // Ana yorumu bul
          const mainComment = allComments.find(c => c.id === comment.id)
          if (!mainComment) {
            console.error('Ana yorum bulunamadı:', comment.id)
            setModalComment(comment)
            return
          }
          
          // Bu ana yoruma ait TÜM yanıtları bul (recursive)
          const getAllRepliesRecursively = (parentId: string): CommentType[] => {
            const directReplies = allComments.filter(c => c.parentCommentId === parentId)
            let allReplies: CommentType[] = []
            
            for (const reply of directReplies) {
              allReplies.push(reply)
              // Bu yanıtın alt yanıtlarını da ekle (recursive)
              allReplies = allReplies.concat(getAllRepliesRecursively(reply.id!))
            }
            
            return allReplies
          }
          
          const allReplies = getAllRepliesRecursively(comment.id!)
          
          console.log('=== YANIT FİLTRELEME DEBUG ===')
          console.log('Ana yorum ID:', comment.id)
          console.log('Tüm yorumlar sayısı:', allComments.length)
          console.log('TÜM yanıtlar sayısı (recursive):', allReplies.length)
          console.log('TÜM yanıtlar:', allReplies.map(r => ({ id: r.id, parentCommentId: r.parentCommentId, authorName: r.authorName })))
          
          // Yanıtları tarihe göre sırala (en yeni önce)
          allReplies.sort((a, b) => {
            const dateA = a.createdAt && typeof a.createdAt === 'object' && 'toDate' in a.createdAt 
              ? a.createdAt.toDate() 
              : new Date(a.createdAt)
            const dateB = b.createdAt && typeof b.createdAt === 'object' && 'toDate' in b.createdAt 
              ? b.createdAt.toDate() 
              : new Date(b.createdAt)
            return dateB.getTime() - dateA.getTime()
          })
          
          // Yanıtları organize et (recursive)
          const organizedReplies = organizeRepliesForModal(allReplies, allComments)
          
          const commentWithReplies = {
            ...mainComment,
            replies: organizedReplies
          }
          
          setModalComment(commentWithReplies)
        })
        .catch(error => {
          console.error('Modal yorum yükleme hatası:', error)
          setModalComment(comment) // Fallback olarak orijinal yorumu kullan
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isOpen, comment?.id])

  if (!isOpen || !comment) return null

  const displayComment = modalComment || comment

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
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
          onClose()
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="glass rounded-2xl p-6 border border-white/20 shadow-modern max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Yorum Detayları</h2>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            <span className="ml-3 text-neutral-400">Yorum yükleniyor...</span>
          </div>
        )}

        {/* Content */}
        {!loading && displayComment && (
          <>

        {/* Ana Yorum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`glass rounded-xl p-6 border transition-all duration-300 mb-6 ${
            displayComment.authorEmail === 'admin@softiel.com'
              ? 'border-cyan-500/50 shadow-cyan-500/20'
              : 'border-white/20'
          }`}
          style={{
            background: displayComment.authorEmail === 'admin@softiel.com'
              ? 'rgba(6, 182, 212, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
            boxShadow: displayComment.authorEmail === 'admin@softiel.com'
              ? '0 0 20px rgba(6, 182, 212, 0.2)'
              : undefined
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
                displayComment.authorEmail === 'admin@softiel.com' 
                  ? 'ring-2 ring-cyan-500/50 ring-offset-2 ring-offset-transparent' 
                  : ''
              }`} style={{ 
                background: displayComment.authorEmail === 'admin@softiel.com' 
                  ? 'rgba(6, 182, 212, 0.1)' 
                  : 'linear-gradient(to right, #06b6d4, #3b82f6)'
              }}>
                {displayComment.authorEmail === 'admin@softiel.com' ? (
                  <img 
                    src="/transparent.webp" 
                    alt="Admin" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {displayComment.authorName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className={`text-lg font-semibold ${
                    displayComment.authorEmail === 'admin@softiel.com'
                      ? 'text-cyan-300'
                      : 'text-white'
                  }`}>{displayComment.authorName}</h3>
                  {displayComment.authorEmail === 'admin@softiel.com' ? (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-cyan-300 font-medium">Admin</span>
                    </div>
                  ) : displayComment.isReply ? (
                    <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                      Yanıt
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-neutral-400">{displayComment.authorEmail}</p>
                <p className="text-xs text-neutral-500">{formatDate(displayComment.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                displayComment.isApproved ? 'text-green-400 bg-green-500/20' : 'text-yellow-400 bg-yellow-500/20'
              }`}>
                {displayComment.isApproved ? 'Onaylandı' : 'Beklemede'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className={`text-base leading-relaxed ${
              displayComment.authorEmail === 'admin@softiel.com'
                ? 'text-cyan-100 font-medium'
                : 'text-neutral-300'
            }`}>{displayComment.content}</p>
            {displayComment.authorEmail === 'admin@softiel.com' && (
              <div className="mt-2">
                <span className="text-xs text-cyan-400">Resmi Yanıt</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onLike(displayComment.id!)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  likedComments.has(displayComment.id!)
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${likedComments.has(displayComment.id!) ? 'fill-current' : ''}`} />
                <span className="text-sm">{displayComment.likes || 0}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {!displayComment.isApproved && !displayComment.isReply && (
                <>
                  <button
                    onClick={() => onStatusChange(displayComment.id!, true)}
                    className="flex items-center space-x-1 px-3 py-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Onayla</span>
                  </button>
                  <button
                    onClick={() => onStatusChange(displayComment.id!, false)}
                    className="flex items-center space-x-1 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reddet</span>
                  </button>
                </>
              )}
              
              {displayComment.isApproved && !displayComment.isReply && (
                <button
                  onClick={() => onStatusChange(displayComment.id!, false)}
                  className="flex items-center space-x-1 px-3 py-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Bekletmeye Al</span>
                </button>
              )}

              {onReply && (
                <button
                  onClick={() => onReply(displayComment)}
                  className="flex items-center space-x-1 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <Reply className="h-4 w-4" />
                  <span>Yanıtla</span>
                </button>
              )}

              <button
                onClick={() => onDelete(displayComment.id!)}
                className="flex items-center space-x-1 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
              >
                <Trash2 className="h-4 w-4" />
                <span>Sil</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Yanıtlar */}
        {displayComment.replies && displayComment.replies.length > 0 ? (
          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1"></div>
              <span className="text-sm text-neutral-400 px-4 py-2 bg-neutral-800/50 rounded-full border border-cyan-500/20">
                {displayComment.replies.length} yanıt
              </span>
              <div className="h-px bg-gradient-to-l from-cyan-500/50 to-transparent flex-1"></div>
            </div>

            <div className="space-y-6">
              {displayComment.replies.map((reply, index) => (
                <ModalReplyItem
                  key={reply.id}
                  reply={reply}
                  index={index}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                  onLike={onLike}
                  likedComments={likedComments}
                  formatDate={formatDate}
                  onReply={onReply}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center py-8">
            <p className="text-neutral-400">Bu yoruma henüz yanıt verilmemiş.</p>
          </div>
        )}
          </>
        )}
      </motion.div>
    </div>
  )
}