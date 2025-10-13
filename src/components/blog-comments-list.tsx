"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Framer Motion'ı lazy load et - main thread work azaltmak için
const MotionDiv = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.div })), { 
  ssr: false,
  loading: () => <div />
})
const AnimatePresence = dynamic(() => import("framer-motion").then(mod => ({ default: mod.AnimatePresence })), { 
  ssr: false,
  loading: () => <></>
})

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
import { useI18n } from "@/contexts/i18n-context"

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
  const { t, locale } = useI18n()
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

  // Kaybolma özelliği kaldırıldı - yorumlar her zaman görünür kalacak

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
        
        // SADECE hash varsa scroll yap - KESIN ÇÖZÜM
        if (hash && hash.startsWith('#comment-')) {
          const commentId = hash.replace('#comment-', '')
          
          // Güçlendirilmiş scroll fonksiyonu (Optimized - Forced reflow önleme)
          const scrollToComment = () => {
            const commentElement = document.getElementById(`comment-${commentId}`)
            if (commentElement) {
              // RequestAnimationFrame ile reflow'u optimize et
              requestAnimationFrame(() => {
                // Batch DOM reads - tek seferde tüm geometrik özellikleri oku
                const stickyHeader = document.querySelector('.sticky.top-0')
                const headerHeight = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0
                const elementRect = commentElement.getBoundingClientRect()
                const absoluteElementTop = elementRect.top + window.pageYOffset
                const scrollTo = absoluteElementTop - headerHeight - 20
                
                // Batch DOM writes - tek seferde tüm stilleri uygula
                requestAnimationFrame(() => {
                  window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
                  })
                  
                  // CSS class ile styling (style attribute yerine)
                  commentElement.classList.add('comment-highlight')
                  
                  // CSS class ile highlight'ı kaldır
                  setTimeout(() => {
                    commentElement.classList.remove('comment-highlight')
                  }, 3000)
                })
              })
              
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
            
            if (scrollToComment()) {
              clearInterval(retryInterval)
              return
            }
            
            if (retryCount >= 10) {
              clearInterval(retryInterval)
            }
          }, 200)
        } else {
        }
      }, 500) // Yorumlar render edildikten sonra
      
    } catch (err) {
      setError(t('blogDetail.commentsLoadError', 'Yorumlar yüklenirken bir hata oluştu'))
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
      if (!timestamp) return t('blogDetail.noDate', 'Tarih bulunamadı')
      
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
      
      if (isNaN(dateObj.getTime())) return t('blogDetail.noDate', 'Geçersiz tarih')
      
      // Locale'e göre doğru format
      const localeMap: { [key: string]: string } = {
        'tr': 'tr-TR',
        'en': 'en-US',
        'de': 'de-DE',
        'fr': 'fr-FR',
        'ru': 'ru-RU',
        'ar': 'ar-SA'
      }
      
      return dateObj.toLocaleDateString(localeMap[locale] || 'tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return t('blogDetail.noDate', 'Tarih hatası')
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
    try {
      // Geçici kullanıcı ID'si
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
      await likeComment(commentId, userId)
      
      // Aktivite kaydet (sadece beğeni eklendiğinde)
      if (!isCurrentlyLiked) {
        
        // Yorumu bul - TÜM SEVİYELERDE (parent bilgisi ile)
        const commentInfo = findCommentWithParentInfo(comments, commentId)
        
        if (commentInfo.comment) {
          
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
        } else {
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
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 border border-white/20 shadow-modern-lg text-center"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-neutral-400">{t('blogDetail.commentsLoading', 'Yorumlar yükleniyor...')}</p>
      </MotionDiv>
    )
  }

  if (error) {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 border border-red-500/20 shadow-modern-lg text-center"
        style={{ background: 'rgba(239, 68, 68, 0.1)' }}
      >
        <MessageSquare className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Hata</h3>
        <p className="text-red-400">{error}</p>
      </MotionDiv>
    )
  }

  if (comments.length === 0) {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl p-8 border border-white/20 shadow-modern-lg text-center"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <MessageSquare className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Henüz yorum yok</h3>
        <p className="text-neutral-400">İlk yorumu siz yapın!</p>
      </MotionDiv>
    )
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Normal Header - Kaybolmaz, her zaman görünür */}
      <div className="mb-6 bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}>
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {t('blogDetail.commentsTitle', 'Yorumlar')} ({totalComments})
          </h3>
        </div>
      </div>

      {/* Yorumlar Container - Kaybolmaz, her zaman görünür */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <MotionDiv
            key={comment.id}
            id={`comment-${comment.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="space-y-4"
          >
            {/* Ana Yorum */}
            <div className={`glass rounded-xl p-6 border shadow-modern hover:shadow-modern-lg transition-all duration-300 relative ${
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
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-300 ${
                    comment.authorEmail === 'admin@softiel.com' 
                      ? 'ring-2 ring-cyan-500/50 ring-offset-1 sm:ring-offset-2 ring-offset-transparent' 
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
                      <span className="text-white font-semibold text-xs sm:text-sm">
                        {comment.authorName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <h4 className={`font-semibold truncate ${
                        comment.authorEmail === 'admin@softiel.com' 
                          ? 'text-cyan-300' 
                          : 'text-white'
                      }`} title={comment.authorName}>{comment.authorName}</h4>
                      {comment.authorEmail === 'admin@softiel.com' && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30 w-fit flex-shrink-0">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-cyan-300 font-medium">Admin</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-neutral-400">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yorum İçeriği */}
              <div className="mb-4 w-full min-w-0 max-w-full overflow-hidden">
                <p className={`comment-content leading-relaxed break-words overflow-wrap-anywhere ${
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
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handleUniversalLike(comment.id!)
                  }}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    likedComments.has(comment.id!)
                      ? 'text-cyan-400 bg-cyan-500/20' 
                      : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  <ThumbsUp className={`h-3 w-3 ${likedComments.has(comment.id!) ? 'fill-current' : ''}`} />
                  <span className="text-xs font-medium">{comment.likes || 0}</span>
                </button>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setReplyingTo(replyingTo === comment.id ? null : comment.id!)
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200"
                >
                  <Reply className="h-3 w-3" />
                  <span className="text-xs font-medium">
                    {replyingTo === comment.id ? t('blogDetail.cancel', 'İptal') : t('blogDetail.reply', 'Yanıtla')}
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
              <div className="mt-6 space-y-4 relative">
                {/* Yanıtlar Header - Sticky değil, normal */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 bg-neutral-800/30 backdrop-blur-sm py-3 px-4 rounded-lg border border-white/5 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1"></div>
                    <span className="text-xs text-neutral-400 px-3 py-1 bg-neutral-800/50 rounded-full whitespace-nowrap">
                      {countAllReplies(comment.replies)} {t('blogDetail.replies', 'yanıt')}
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
                      className="flex items-center justify-center sm:justify-start space-x-1 px-3 py-1 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 w-full sm:w-auto"
                    >
                      <Eye className="h-3 w-3" />
                      <span className="truncate">
                        {expandedReplies.has(comment.id!) ? 'Gizle' : `Göster (${countAllReplies(comment.replies) - 1} daha)`}
                      </span>
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {expandedReplies.has(comment.id!) ? (
                    // Tüm yanıtları göster
                    comment.replies.map((reply, replyIndex) => (
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
                        t={t}
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
                        t={t}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </MotionDiv>
        ))}
      </div>

      {/* Paging */}
      {totalPages > 1 && (
        <div className="mt-8">
          <div className="text-center mb-4 text-sm text-neutral-400 px-4">
            <div className="block sm:hidden">
              Sayfa {currentPage} / {totalPages}
            </div>
            <div className="hidden sm:block">
              Sayfa {currentPage} / {totalPages} - Bu sayfada {comments.length} yorum - Toplam {totalComments} yorum
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              loadComments(currentPage - 1)
            }}
            disabled={currentPage === 1}
            className="w-full sm:w-auto px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Önceki
          </button>
          
          <div className="flex items-center space-x-1 overflow-x-auto max-w-full">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  loadComments(page)
                }}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 whitespace-nowrap ${
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
            className="w-full sm:w-auto px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sonraki
          </button>
          </div>
        </div>
      )}
    </MotionDiv>
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
  handleReplyLike,
  t
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
  t: (key: string, fallback?: string) => string
}) {
  return (
    <div className="relative" id={`comment-${reply.id}`}>
      {/* Yanıt Çizgisi */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-cyan-500/20 to-transparent"></div>
      
                  <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="ml-6 relative"
      >
        {/* Yanıt Kartı */}
        <div className={`glass rounded-xl p-5 border shadow-modern hover:shadow-modern-lg transition-all duration-300 group relative ${
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
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-300 ${
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
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                  <h5 className={`font-semibold text-sm truncate ${
                    reply.authorEmail === 'admin@softiel.com' 
                      ? 'text-cyan-300' 
                      : 'text-white'
                  }`} title={reply.authorName}>{reply.authorName}</h5>
                  {reply.authorEmail === 'admin@softiel.com' ? (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30 w-fit flex-shrink-0">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-cyan-300 font-medium">Admin</span>
                      </div>
                  ) : (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 w-fit flex-shrink-0">
                      Kullanıcı
                            </span>
                          )}
                </div>
                          <span className="text-xs text-neutral-400">{formatDate(reply.createdAt)}</span>
                        </div>
            </div>
          </div>

          {/* İçerik */}
          <div className="mb-4 w-full min-w-0 max-w-full overflow-hidden">
            <p className={`comment-content text-sm leading-relaxed ${
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
                  {replyingTo === reply.id ? t('blogDetail.cancel', 'İptal') : t('blogDetail.reply', 'Yanıtla')}
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
                t={t}
              />
                ))}
              </div>
            )}
          </MotionDiv>
      </div>
  )
}
