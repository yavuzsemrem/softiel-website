"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  User, 
  Calendar,
  ThumbsUp,
  Reply,
  X,
  Eye
} from "lucide-react"
import { getBlogComments, likeComment, Comment as CommentType } from "@/lib/comment-service"
import { logCommentLikeActivity } from "@/lib/simple-activity-logger"
import { BlogCommentReplyForm } from "@/components/blog-comment-reply-form"

interface BlogCommentsListProps {
  blogSlug: string
  blogId?: string
  onLike?: (commentId: string) => void
}

export function BlogCommentsList({ 
  blogSlug,
  blogId,
  onLike
}: BlogCommentsListProps) {
  const [comments, setComments] = useState<CommentType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyingToReply, setReplyingToReply] = useState<string | null>(null)
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalComments, setTotalComments] = useState(0)
  const commentsPerPage = 10

  // Yorumları yükle - sadece blogSlug veya blogId değiştiğinde
  useEffect(() => {
    loadComments()
  }, [blogSlug, blogId])

  const loadComments = async (page: number = 1) => {
    try {
      setLoading(true)
      setError("")
      
      // Eğer blogId varsa onu kullan, yoksa blogSlug ile getBlogComments çağır
      const commentsData = blogId ? await getBlogComments(blogId) : await getBlogComments(blogSlug)
      
      // Toplam yorum sayısını hesapla (ana yorumlar + tüm yanıtlar)
      const totalCommentCount = commentsData.reduce((total, comment) => {
        let count = 1 // Ana yorum
        if (comment.replies && comment.replies.length > 0) {
          count += comment.replies.length // Yanıtlar
        }
        return total + count
      }, 0)
      
      // Paging hesaplama (sadece ana yorumlar için)
      const total = commentsData.length
      const totalPages = Math.ceil(total / commentsPerPage)
      const startIndex = (page - 1) * commentsPerPage
      const endIndex = startIndex + commentsPerPage
      const paginatedComments = commentsData.slice(startIndex, endIndex)
      
      setComments(paginatedComments)
      setTotalPages(totalPages)
      setTotalComments(totalCommentCount) // Toplam yorum sayısı (ana + yanıtlar)
      setCurrentPage(page)
      
      // Yorumlar yüklendikten sonra hash kontrolü yap - SADECE HASH VARSA SCROLL YAP
      setTimeout(() => {
        const hash = window.location.hash
        console.log('🔍 Checking hash in loadComments:', hash)
        
        // SADECE hash varsa scroll yap - KESIN ÇÖZÜM
        if (hash && hash.startsWith('#comment-')) {
          const commentId = hash.replace('#comment-', '')
          console.log('🎯 Comments loaded, checking hash for comment:', commentId)
          
          // Güçlendirilmiş scroll fonksiyonu
          const scrollToComment = () => {
            const commentElement = document.getElementById(`comment-${commentId}`)
            if (commentElement) {
              console.log('✅ Comment found after load, scrolling...')
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
              
              return true
            }
            return false
          }
          
          // Hemen dene
          if (scrollToComment()) {
            return
          }
          
          // Bulunamazsa 200ms aralıklarla 10 kez dene
          let retryCount = 0
          const retryInterval = setInterval(() => {
            retryCount++
            console.log(`🔄 Retry attempt ${retryCount}/10 for comment: ${commentId}`)
            
            if (scrollToComment()) {
              clearInterval(retryInterval)
              return
            }
            
            if (retryCount >= 10) {
              console.log('❌ Comment not found after 10 retries:', commentId)
              clearInterval(retryInterval)
            }
          }, 200)
        } else {
          console.log('🔍 No hash found, no scrolling will occur')
        }
      }, 500) // Yorumlar render edildikten sonra
      
    } catch (err) {
      setError("Yorumlar yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleReplySubmit = () => {
    // Yanıt gönderildikten sonra yorumları yenile
    loadComments()
    setReplyingTo(null)
    setReplyingToReply(null)
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
    try {
      if (!timestamp) return 'Tarih bulunamadı'
      
      let dateObj: Date
      if (typeof timestamp === 'object' && timestamp.toDate) {
        // Firestore Timestamp
        dateObj = timestamp.toDate()
      } else if (typeof timestamp === 'number') {
        // Unix timestamp
        dateObj = new Date(timestamp)
      } else if (typeof timestamp === 'string') {
        // String date
        dateObj = new Date(timestamp)
      } else {
        // Fallback
        dateObj = new Date(timestamp)
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

  // Tüm yanıtları recursive olarak say
  const countAllReplies = (replies: CommentType[]): number => {
    let count = 0
    for (const reply of replies) {
      count += 1 // Bu yanıtı say
      if (reply.replies && reply.replies.length > 0) {
        count += countAllReplies(reply.replies) // Alt yanıtları recursive olarak say
      }
    }
    return count
  }


  const handleLike = async (commentId: string) => {
    try {
      // Geçici kullanıcı ID'si (gerçek uygulamada auth'dan gelecek)
      const userId = 'anonymous-user-' + Date.now()
      
      // Önce local state'i güncelle (optimistic update)
      const isCurrentlyLiked = likedComments.has(commentId)
      
      setLikedComments(prev => {
        const newSet = new Set(prev)
        if (isCurrentlyLiked) {
          newSet.delete(commentId)
        } else {
          newSet.add(commentId)
        }
        return newSet
      })
      
      // Yorumları local olarak güncelle (refresh yapmadan)
      setComments(prevComments => 
        prevComments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: isCurrentlyLiked ? Math.max(0, (comment.likes || 0) - 1) : (comment.likes || 0) + 1
            }
          }
          
          // Yanıtları da kontrol et
          if (comment.replies) {
            const updatedReplies = comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: isCurrentlyLiked ? Math.max(0, (reply.likes || 0) - 1) : (reply.likes || 0) + 1
                }
              }
              return reply
            })
            
            return {
              ...comment,
              replies: updatedReplies
            }
          }
          
          return comment
        })
      )
      
      // Firestore'a kaydet
      await likeComment(commentId, userId)
      
      // Aktivite kaydet (sadece beğeni eklendiğinde)
      if (!isCurrentlyLiked) {
        // Find the comment to get its details - hem ana yorumları hem de yanıtları kontrol et
        let foundComment = comments.find(c => c.id === commentId)
        
        // Eğer ana yorumlarda bulunamadıysa, yanıtlarda ara
        if (!foundComment) {
          for (const comment of comments) {
            if (comment.replies) {
              foundComment = comment.replies.find(r => r.id === commentId)
              if (foundComment) break
            }
          }
        }
        
        if (foundComment) {
          await logCommentLikeActivity(
            foundComment.authorName || 'Bir kullanıcı',
            commentId,
            foundComment.blogId,
            foundComment.content
          )
        }
      }
      
      // Parent component'e bildir
      if (onLike) {
        onLike(commentId)
      }
    } catch (error) {
      // Hata durumunda state'i geri al
      setLikedComments(prev => {
        const newSet = new Set(prev)
        if (likedComments.has(commentId)) {
          newSet.delete(commentId)
        } else {
          newSet.add(commentId)
        }
        return newSet
      })
    }
  }

  // TÜM YORUM TÜRLERİ İÇİN TEK MERKEZİ LIKE HANDLER
  const handleUniversalLike = async (commentId: string) => {
    console.log('🚀 UNIVERSAL LIKE HANDLER called with commentId:', commentId)
    try {
      // Geçici kullanıcı ID'si
      const userId = 'anonymous-user-' + Date.now()
      
      // Önce local state'i güncelle (optimistic update)
      const isCurrentlyLiked = likedComments.has(commentId)
      console.log('🚀 isCurrentlyLiked:', isCurrentlyLiked)
      
      setLikedComments(prev => {
        const newSet = new Set(prev)
        if (isCurrentlyLiked) {
          newSet.delete(commentId)
        } else {
          newSet.add(commentId)
        }
        return newSet
      })
      
      // Yorumları local olarak güncelle (refresh yapmadan) - TÜM SEVİYELER İÇİN
      setComments(prevComments => 
        prevComments.map(comment => {
          // Ana yorumu kontrol et
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: isCurrentlyLiked ? Math.max(0, (comment.likes || 0) - 1) : (comment.likes || 0) + 1
            }
          }
          
          // Yanıtları kontrol et (recursive)
          if (comment.replies) {
            const updatedReplies = updateRepliesRecursively(comment.replies, commentId, isCurrentlyLiked)
            return {
              ...comment,
              replies: updatedReplies
            }
          }
          
          return comment
        })
      )
      
      // Firestore'a kaydet
      console.log('🚀 Calling likeComment with commentId:', commentId, 'userId:', userId)
      await likeComment(commentId, userId)
      console.log('🚀 likeComment completed successfully')
      
      // Aktivite kaydet (sadece beğeni eklendiğinde)
      if (!isCurrentlyLiked) {
        console.log('🚀 Logging activity for comment like')
        
        // Yorumu bul - TÜM SEVİYELERDE (parent bilgisi ile)
        const commentInfo = findCommentWithParentInfo(comments, commentId)
        console.log('🚀 commentInfo:', commentInfo)
        
        if (commentInfo.comment) {
          console.log('🚀 Calling logCommentLikeActivity with:', {
            authorName: commentInfo.comment.authorName,
            commentId,
            blogId: commentInfo.comment.blogId,
            content: commentInfo.comment.content,
            isReply: commentInfo.isReply,
            parentCommentId: commentInfo.parentCommentId
          })
          
          await logCommentLikeActivity(
            commentInfo.comment.authorName || 'Bir kullanıcı',
            commentId,
            commentInfo.comment.blogId,
            commentInfo.comment.content,
            commentInfo.isReply,
            commentInfo.parentCommentId || undefined
          )
          
          // Notification context'i güncelle
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('notification-updated'))
          }
          console.log('🚀 logCommentLikeActivity completed successfully')
        } else {
          console.log('🚀 No comment found for activity logging')
        }
      }
      
      // Parent component'e bildir
      if (onLike) {
        onLike(commentId)
      }
    } catch (error) {
      console.error('🚀 Universal like error:', error)
      // Hata durumunda state'i geri al
      setLikedComments(prev => {
        const newSet = new Set(prev)
        if (likedComments.has(commentId)) {
          newSet.delete(commentId)
        } else {
          newSet.add(commentId)
        }
        return newSet
      })
    }
  }

  // Recursive yanıt güncelleme helper fonksiyonu
  const updateRepliesRecursively = (replies: CommentType[], targetId: string, isCurrentlyLiked: boolean): CommentType[] => {
    return replies.map(reply => {
      if (reply.id === targetId) {
        return {
          ...reply,
          likes: isCurrentlyLiked ? Math.max(0, (reply.likes || 0) - 1) : (reply.likes || 0) + 1
        }
      }
      
      // Recursive olarak alt yanıtları da kontrol et
      if (reply.replies) {
        return {
          ...reply,
          replies: updateRepliesRecursively(reply.replies, targetId, isCurrentlyLiked)
        }
      }
      
      return reply
    })
  }

  // Recursive yorum bulma helper fonksiyonu
  const findCommentById = (comments: CommentType[], targetId: string): CommentType | null => {
    for (const comment of comments) {
      // Ana yorumu kontrol et
      if (comment.id === targetId) {
        return comment
      }
      
      // Yanıtları recursive olarak kontrol et
      if (comment.replies) {
        const found = findCommentInReplies(comment.replies, targetId)
        if (found) return found
      }
    }
    return null
  }

  // Recursive yanıt arama helper fonksiyonu
  const findCommentInReplies = (replies: CommentType[], targetId: string): CommentType | null => {
    for (const reply of replies) {
      if (reply.id === targetId) {
        return reply
      }
      
      // Alt yanıtları da kontrol et
      if (reply.replies) {
        const found = findCommentInReplies(reply.replies, targetId)
        if (found) return found
      }
    }
    return null
  }

  // Yorumun ana yorum mu yoksa cevap mı olduğunu belirle
  const findCommentWithParentInfo = (comments: CommentType[], targetId: string): { comment: CommentType | null, isReply: boolean, parentCommentId: string | null } => {
    for (const comment of comments) {
      // Ana yorumu kontrol et
      if (comment.id === targetId) {
        return { comment, isReply: false, parentCommentId: null }
      }
      
      // Yanıtları recursive olarak kontrol et
      if (comment.replies) {
        const found = findCommentInRepliesWithParent(comment.replies, targetId, comment.id!)
        if (found.comment) return found
      }
    }
    return { comment: null, isReply: false, parentCommentId: null }
  }

  // Recursive yanıt arama helper fonksiyonu (parent bilgisi ile)
  const findCommentInRepliesWithParent = (replies: CommentType[], targetId: string, parentId: string): { comment: CommentType | null, isReply: boolean, parentCommentId: string | null } => {
    for (const reply of replies) {
      if (reply.id === targetId) {
        return { comment: reply, isReply: true, parentCommentId: parentId }
      }
      
      // Alt yanıtları da kontrol et
      if (reply.replies) {
        const found = findCommentInRepliesWithParent(reply.replies, targetId, reply.id!)
        if (found.comment) return found
      }
    }
    return { comment: null, isReply: false, parentCommentId: null }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 border border-white/20 shadow-modern-lg text-center"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-neutral-400">Yorumlar yükleniyor...</p>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 border border-red-500/20 shadow-modern-lg text-center"
        style={{ background: 'rgba(239, 68, 68, 0.1)' }}
      >
        <MessageSquare className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Hata</h3>
        <p className="text-red-400">{error}</p>
      </motion.div>
    )
  }

  if (comments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 border border-white/20 shadow-modern-lg text-center"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <MessageSquare className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Henüz yorum yok</h3>
        <p className="text-neutral-400">İlk yorumu siz yapın!</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}>
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">
          Yorumlar ({totalComments})
        </h3>
      </div>

      <div className="space-y-4">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            id={`comment-${comment.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="space-y-4"
          >
            {/* Ana Yorum */}
            <div className={`glass rounded-xl p-6 border shadow-modern hover:shadow-modern-lg transition-all duration-300 ${
              comment.authorEmail === 'admin@softiel.com' 
                ? 'border-cyan-500/50 shadow-cyan-500/20 hover:shadow-cyan-500/30' 
                : 'border-white/20'
            }`}
                 style={{ 
                   background: comment.authorEmail === 'admin@softiel.com' 
                     ? 'rgba(6, 182, 212, 0.1)' 
                     : 'rgba(255, 255, 255, 0.05)',
                   boxShadow: comment.authorEmail === 'admin@softiel.com' 
                     ? '0 0 20px rgba(6, 182, 212, 0.2)' 
                     : undefined
                 }}>
              {/* Yorum Header */}
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
                        src="/transparent.png" 
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
                      <h4 className={`font-semibold ${
                        comment.authorEmail === 'admin@softiel.com' 
                          ? 'text-cyan-300' 
                          : 'text-white'
                      }`}>{comment.authorName}</h4>
                      {comment.authorEmail === 'admin@softiel.com' && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-cyan-300 font-medium">Admin</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-neutral-400">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yorum İçeriği */}
              <div className="mb-4">
                <p className={`leading-relaxed ${
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

              {/* Yorum Aksiyonları */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleUniversalLike(comment.id!)
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    likedComments.has(comment.id!)
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 ${likedComments.has(comment.id!) ? 'fill-current' : ''}`} />
                  <span className="text-sm">{comment.likes || 0}</span>
                </button>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setReplyingTo(replyingTo === comment.id ? null : comment.id!)
                  }}
                  className="flex items-center space-x-1 px-3 py-2 text-neutral-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200"
                >
                  <Reply className="h-4 w-4" />
                  <span className="text-sm">
                    {replyingTo === comment.id ? 'İptal' : 'Yanıtla'}
                  </span>
                </button>
              </div>

            </div>

            {/* Yanıt Formu */}
            <AnimatePresence>
              {replyingTo === comment.id && blogId && (
                <BlogCommentReplyForm
                  parentCommentId={comment.id!}
                  blogId={blogId}
                  onReplySubmit={handleReplySubmit}
                  onCancel={() => setReplyingTo(null)}
                />
              )}
            </AnimatePresence>

            {/* Yanıtlar */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1"></div>
                    <span className="text-xs text-neutral-400 px-3 py-1 bg-neutral-800/50 rounded-full">
                      {countAllReplies(comment.replies)} yanıt
                    </span>
                    <div className="h-px bg-gradient-to-l from-cyan-500/50 to-transparent flex-1"></div>
                  </div>
                  {countAllReplies(comment.replies) > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleReplies(comment.id!)
                      }}
                      className="flex items-center space-x-1 px-3 py-1 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 ml-4"
                    >
                      <Eye className="h-3 w-3" />
                      <span>
                        {expandedReplies.has(comment.id!) ? 'Gizle' : `Göster (${countAllReplies(comment.replies) - 1} daha)`}
                      </span>
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {expandedReplies.has(comment.id!) ? (
                    // Tüm yanıtları göster
                    comment.replies.map((reply) => (
                      <BlogReplyItem
                        key={reply.id}
                        reply={reply}
                        blogId={blogId}
                        likedComments={likedComments}
                        onLike={handleUniversalLike}
                        handleReplyLike={handleUniversalLike}
                        onReply={(replyId) => setReplyingToReply(replyingToReply === replyId ? null : replyId)}
                        replyingTo={replyingToReply}
                        onReplySubmit={handleReplySubmit}
                        formatDate={formatDate}
                      />
                    ))
                  ) : (
                    // Sadece ilk yanıtı göster
                    comment.replies.slice(0, 1).map((reply) => (
                      <BlogReplyItem
                        key={reply.id}
                        reply={reply}
                        blogId={blogId}
                        likedComments={likedComments}
                        onLike={handleUniversalLike}
                        handleReplyLike={handleUniversalLike}
                        onReply={(replyId) => setReplyingToReply(replyingToReply === replyId ? null : replyId)}
                        replyingTo={replyingToReply}
                        onReplySubmit={handleReplySubmit}
                        formatDate={formatDate}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Paging */}
      {totalPages > 1 && (
        <div className="mt-8">
          <div className="text-center mb-4 text-sm text-neutral-400">
            Sayfa {currentPage} / {totalPages} - Bu sayfada {comments.length} yorum - Toplam {totalComments} yorum
          </div>
          <div className="flex items-center justify-center space-x-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              loadComments(currentPage - 1)
            }}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Önceki
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  loadComments(page)
                }}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  page === currentPage
                    ? 'bg-cyan-500 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              loadComments(currentPage + 1)
            }}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sonraki
          </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Blog Reply Item Component (Recursive)
function BlogReplyItem({ 
  reply, 
  blogId, 
  likedComments, 
  onLike, 
  onReply, 
  replyingTo, 
  onReplySubmit, 
  formatDate,
  handleReplyLike
}: {
  reply: CommentType & { replies?: CommentType[] }
  blogId?: string
  likedComments: Set<string>
  onLike: (commentId: string) => void
  onReply: (replyId: string) => void
  replyingTo: string | null
  onReplySubmit: () => void
  formatDate: (timestamp: any) => string
  handleReplyLike?: (replyId: string) => void
}) {
  return (
    <div className="relative" id={`comment-${reply.id}`}>
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
                    src="/transparent.png" 
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
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              onLike(reply.id!)
                            }}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                              likedComments.has(reply.id!)
                    ? 'text-cyan-400 bg-cyan-500/20' 
                    : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                            }`}
                          >
                            <ThumbsUp className={`h-3 w-3 ${likedComments.has(reply.id!) ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{reply.likes || 0}</span>
              </button>
              
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  onReply(reply.id!)
                }}
                className="flex items-center space-x-1 px-3 py-1.5 text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200"
              >
                <Reply className="h-3 w-3" />
                <span className="text-xs font-medium">
                  {replyingTo === reply.id ? 'İptal' : 'Yanıtla'}
                </span>
                          </button>
                        </div>
                      </div>
                    </div>

        {/* Yanıt Formu - Sabit Genişlik */}
        <AnimatePresence>
          {replyingTo === reply.id && blogId && (
            <div className="mt-4 w-full max-w-2xl">
              <BlogCommentReplyForm
                parentCommentId={reply.id!}
                blogId={blogId}
                onReplySubmit={onReplySubmit}
                onCancel={() => onReply('')}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Alt Yanıtlar - Recursive */}
        {reply.replies && reply.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {reply.replies.map((subReply) => (
              <BlogReplyItem
                key={subReply.id}
                reply={subReply}
                blogId={blogId}
                likedComments={likedComments}
                onLike={handleReplyLike || onLike}
                onReply={onReply}
                replyingTo={replyingTo}
                onReplySubmit={onReplySubmit}
                formatDate={formatDate}
                handleReplyLike={handleReplyLike}
              />
                ))}
              </div>
            )}
          </motion.div>
      </div>
  )
}
