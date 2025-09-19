"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  MessageCircle, 
  User, 
  Calendar, 
  ThumbsUp, 
  Reply, 
  ChevronDown, 
  ChevronUp,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react"
import { getBlogComments, Comment } from "@/lib/comment-service"
import { getBlog } from "@/lib/blog-service"

interface DashboardBlogCommentsProps {
  blogId: string
}

export function DashboardBlogComments({ blogId }: DashboardBlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [showAllComments, setShowAllComments] = useState(false)
  const [totalComments, setTotalComments] = useState(0)

  useEffect(() => {
    loadComments()
  }, [blogId])

  const loadComments = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Önce blog'u getir ve gerçek ID'sini al
      const blog = await getBlog(blogId)
      
      if (!blog || !blog.id) {
        setError("Blog bulunamadı")
        return
      }
      
      // Gerçek blog ID'si ile yorumları getir
      const commentsData = await getBlogComments(blog.id)
      
      // Toplam yorum sayısını hesapla (ana yorumlar + yanıtlar)
      const totalCount = commentsData.reduce((total, comment) => {
        let count = 1 // Ana yorum
        if (comment.replies && comment.replies.length > 0) {
          count += comment.replies.length
        }
        return total + count
      }, 0)
      
      setComments(commentsData)
      setTotalComments(totalCount)
    } catch (err) {
      setError("Yorumlar yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
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

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Tarih yok"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getApprovalStatus = (isApproved: boolean) => {
    if (isApproved) {
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        text: "Onaylandı",
        color: "text-green-400"
      }
    } else {
      return {
        icon: <Clock className="h-4 w-4 text-yellow-400" />,
        text: "Beklemede",
        color: "text-yellow-400"
      }
    }
  }

  const renderComment = (comment: Comment, isReply: boolean = false) => {
    const approvalStatus = getApprovalStatus(comment.isApproved)
    const hasReplies = comment.replies && comment.replies.length > 0
    const isExpanded = expandedReplies.has(comment.id!)

    return (
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass rounded-lg p-3 sm:p-4 border border-white/20 mb-3 ${
          isReply ? 'ml-2 sm:ml-6 border-l-2 border-l-blue-500/30' : ''
        }`}
        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
      >
        {/* Comment Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                <h4 className="font-medium text-white text-sm sm:text-base truncate">{comment.authorName}</h4>
                <span className="text-xs text-neutral-400 truncate">({comment.authorEmail})</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs text-neutral-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {approvalStatus.icon}
                  <span className={approvalStatus.color}>{approvalStatus.text}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comment Stats */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-neutral-400">
            {(comment.likes || 0) > 0 && (
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{comment.likes || 0}</span>
              </div>
            )}
            {hasReplies && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{comment.replies?.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Comment Content */}
        <div className="text-neutral-300 leading-relaxed mb-3 break-words overflow-wrap-anywhere whitespace-pre-wrap text-sm sm:text-base">
          {comment.content}
        </div>

        {/* Comment Actions */}
        {hasReplies && (
          <button
            onClick={() => toggleReplies(comment.id!)}
            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm"
          >
            {isExpanded ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />}
            <span className="truncate">
              {isExpanded ? 'Yanıtları Gizle' : `${comment.replies?.length} Yanıtı Görüntüle`}
            </span>
          </button>
        )}

        {/* Replies */}
        {hasReplies && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2"
          >
            {comment.replies?.map(reply => renderComment(reply, true))}
          </motion.div>
        )}
      </motion.div>
    )
  }

  const displayedComments = showAllComments ? comments : comments.slice(0, 5)

  if (loading) {
    return (
      <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-400 mr-2" />
          <span className="text-neutral-400">Yorumlar yükleniyor...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-6 border border-red-500/20" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
        <div className="flex items-center space-x-2 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Henüz yorum yok</h3>
          <p className="text-neutral-400">Bu blog için henüz hiç yorum yapılmamış.</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 sm:p-6 border border-white/20" 
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">Blog Yorumları</h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              {totalComments} yorum ({comments.length} ana yorum)
            </p>
          </div>
        </div>
        
        {comments.length > 5 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="flex items-center justify-center space-x-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-xs sm:text-sm"
          >
            {showAllComments ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />}
            <span className="truncate">{showAllComments ? 'Daha Az Göster' : 'Tümünü Göster'}</span>
          </button>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {displayedComments.map(comment => renderComment(comment))}
      </div>

      {/* Load More Button */}
      {!showAllComments && comments.length > 5 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllComments(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 text-sm font-medium"
          >
            {comments.length - 5} Yorum Daha Göster
          </button>
        </div>
      )}
    </motion.div>
  )
}
