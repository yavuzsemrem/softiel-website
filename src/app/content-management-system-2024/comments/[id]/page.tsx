"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  User,
  ThumbsUp,
  Reply,
  X,
  AlertTriangle,
  FileText
} from "lucide-react"
import { Comment as CommentType, CommentWithAdminReplies, AdminReply, getAllComments, getMainComments, getCommentForDetailPage, approveComment, deleteComment, likeComment, createComment, createAdminReply, deleteAdminReply } from "@/lib/comment-service"
import { getBlog } from "@/lib/blog-service"
import { doc, updateDoc, Timestamp, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"

const commentsCollection = collection(db, 'comments')
import { ModalReplyItem } from "@/components/modal-reply-item"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function CommentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const commentId = params.id as string

  const [comment, setComment] = useState<CommentWithAdminReplies | null>(null)
  const [loading, setLoading] = useState(true)
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const [blogData, setBlogData] = useState<{ title: string; slug: string } | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [replyingTo, setReplyingTo] = useState<CommentType | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [submittingReply, setSubmittingReply] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null)

  // Sayfalama mantığı
  // Sadece normal yanıtları getir (admin yanıtları hariç)
  const getNormalReplies = () => {
    if (!comment) return []
    
    const normalReplies = comment.replies || []
    
    // Normal yanıtlardan admin yanıtlarını çıkar (duplicate'leri önlemek için)
    const filteredNormalReplies = normalReplies.filter(reply => reply.authorEmail !== 'admin@softiel.com')
    
    // Debug logları kaldırıldı
    
    return filteredNormalReplies
  }

  // Admin yanıtlarını getir - artık unified system kullanıyoruz
  const getAdminReplies = () => {
    if (!comment) return []
    
    // Artık admin yanıtları da normal replies içinde
    const allReplies = comment.replies || []
    const adminReplies = allReplies.filter(reply => reply.authorEmail === 'admin@softiel.com')
    
    // Debug logları kaldırıldı
    
    return adminReplies as CommentType[]
  }

  // Tüm yanıtları getir - unified sistem
  const getAllReplies = () => {
    if (!comment) return []
    return comment.replies || []
  }

  // Artık gerekli değil - unified sistem zaten düzleştirilmiş veri getiriyor

  // Yanıt seviyelerini analiz et
  const analyzeReplyLevels = (replies: CommentType[]): Record<number, number> => {
    const levelCounts: Record<number, number> = {}
    
    replies.forEach(reply => {
      const level = (reply as any).level || 0
      levelCounts[level] = (levelCounts[level] || 0) + 1
    })
    
    return levelCounts
  }

  // Yanıt yazarlarını analiz et
  const analyzeReplyAuthors = (replies: CommentType[]): Record<string, number> => {
    const authorCounts: Record<string, number> = {}
    
    replies.forEach(reply => {
      const author = reply.authorEmail === 'admin@softiel.com' ? 'Admin' : 'Kullanıcı'
      authorCounts[author] = (authorCounts[author] || 0) + 1
    })
    
    return authorCounts
  }

  // Yorum türlerini analiz et
  const analyzeCommentTypes = (replies: CommentType[]): Record<string, number> => {
    const typeCounts: Record<string, number> = {}
    
    replies.forEach(reply => {
      const isAdmin = reply.authorEmail === 'admin@softiel.com'
      const level = (reply as any).level || 0
      
      let type = ''
      if (level === 0) {
        type = isAdmin ? 'Admin → Ana Yorum' : 'Kullanıcı → Ana Yorum'
      } else if (level === 1) {
        type = isAdmin ? 'Admin → Kullanıcı Yorumu' : 'Kullanıcı → Kullanıcı Yorumu'
      } else {
        type = isAdmin ? 'Admin → Alt Yorum' : 'Kullanıcı → Alt Yorum'
      }
      
      typeCounts[type] = (typeCounts[type] || 0) + 1
    })
    
    return typeCounts
  }

  // Yorum türünü belirle
  const getCommentTypeInfo = (reply: CommentType, parentComment?: CommentType | null) => {
    const isAdmin = reply.authorEmail === 'admin@softiel.com'
    const level = (reply as any).level || 0
    const isParentAdmin = parentComment?.authorEmail === 'admin@softiel.com'
    
    if (level === 0) {
      return {
        type: isAdmin ? 'Admin → Ana Yorum' : 'Kullanıcı → Ana Yorum',
        color: isAdmin ? 'cyan' : 'purple',
        icon: isAdmin ? '👨‍💼' : '👤'
      }
    } else if (level === 1) {
      // Parent'ın türüne göre belirle
      if (isAdmin && isParentAdmin) {
        return {
          type: 'Admin → Admin Yorumu',
          color: 'indigo',
          icon: '🔄'
        }
      } else if (isAdmin && !isParentAdmin) {
        return {
          type: 'Admin → Kullanıcı Yorumu',
          color: 'blue',
          icon: '💬'
        }
      } else if (!isAdmin && isParentAdmin) {
        return {
          type: 'Kullanıcı → Admin Yorumu',
          color: 'orange',
          icon: '💭'
        }
      } else {
        return {
          type: 'Kullanıcı → Kullanıcı Yorumu',
          color: 'green',
          icon: '💭'
        }
      }
    } else {
      // Alt yorumlar için de parent türünü kontrol et
      if (isAdmin && isParentAdmin) {
        return {
          type: 'Admin → Admin Alt Yorumu',
          color: 'indigo',
          icon: '🔄'
        }
      } else if (isAdmin && !isParentAdmin) {
        return {
          type: 'Admin → Kullanıcı Alt Yorumu',
          color: 'blue',
          icon: '💬'
        }
      } else if (!isAdmin && isParentAdmin) {
        return {
          type: 'Kullanıcı → Admin Alt Yorumu',
          color: 'orange',
          icon: '💭'
        }
      } else {
        return {
          type: 'Kullanıcı → Kullanıcı Alt Yorumu',
          color: 'green',
          icon: '💭'
        }
      }
    }
  }

  // Pagination fonksiyonları
  const getTotalPages = () => {
    if (!comment) return 0
    const allReplies = comment.replies || []
    const totalPages = Math.ceil(allReplies.length / itemsPerPage)
    
    
    return totalPages
  }

  const getPaginatedReplies = () => {
    if (!comment) return []
    
    // Artık tüm yanıtlar (normal + admin) unified system'de geliyor
    const allReplies = comment.replies || []
    
    
    // Yorum türlerini analiz et
    const commentTypeAnalysis = analyzeCommentTypes(allReplies)
    
    
    // Tarihe göre sırala (zaten service'de sıralanmış ama emin olmak için)
    const sortedReplies = [...allReplies].sort((a, b) => {
      const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt ? new Date(a.createdAt as any).getTime() : 0)
      const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt ? new Date(b.createdAt as any).getTime() : 0)
      return aTime - bTime // Eski önce
    })
    
    // Pagination uygula
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedReplies = sortedReplies.slice(startIndex, endIndex)
    
    
    return paginatedReplies as CommentType[]
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Sayfa değiştiğinde en üste scroll et
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Sayfalama kaldırıldı


  // Modal için yanıtları organize et
  const organizeRepliesForModal = (replies: CommentType[], allComments: CommentType[]): CommentType[] => {
    return replies.map(reply => {
      // Bu yanıta direkt yanıt verilen yorumları bul (sadece yanıtları al)
      const subReplies = allComments.filter(subReply => 
        subReply.parentCommentId === reply.id && 
        subReply.id !== reply.id &&
        subReply.isReply === true // Sadece yanıtları al
      )
      
      // Alt yanıtları tarihe göre sırala (en yeni önce)
      subReplies.sort((a, b) => {
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt ? new Date(a.createdAt as any).getTime() : 0)
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt ? new Date(b.createdAt as any).getTime() : 0)
        return bTime - aTime
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

  // Yorumu yükle fonksiyonu
  const loadComment = async () => {
    if (!commentId) return
    
    setLoading(true)
    setCurrentPage(1) // Yeni yorum yüklendiğinde sayfa 1'e dön
    
    try {
      const commentWithReplies = await getCommentForDetailPage(commentId)
      if (!commentWithReplies) {
        setLoading(false)
        return
      }
      
      // Tüm admin yanıtlarını al (filtreleme kaldırıldı - tüm yanıtları göster)
      const commentWithMainAdminReplies = {
        ...commentWithReplies,
        adminReplies: commentWithReplies.adminReplies || []
      }
      
      setComment(commentWithMainAdminReplies)
      
      // Blog bilgisini yükle
      if (commentWithMainAdminReplies.blogId) {
        try {
          const blog = await getBlog(commentWithMainAdminReplies.blogId)
          if (blog) {
            setBlogData({
              title: blog.title,
              slug: blog.slug || commentWithMainAdminReplies.blogId
            })
          }
        } catch (error) {
          // Blog bilgisi yüklenirken hata
        }
      }
    } catch (error) {
      // Yorum yükleme hatası
    } finally {
      setLoading(false)
    }
  }

  // Yorumu yükle - GERÇEK FIREBASE VERİSİ
  useEffect(() => {
    loadComment()
  }, [commentId])

  // URL hash'ini kontrol et ve yoruma scroll yap
  useEffect(() => {
    const scrollToComment = (commentId: string) => {
      console.log('🎯 Scroll to comment in detail page:', commentId)
      
      // Güçlendirilmiş scroll fonksiyonu
      const directScroll = () => {
        const commentElement = document.getElementById(`comment-${commentId}`)
        if (commentElement) {
          console.log('✅ Comment element found in detail page, scrolling...')
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
      if (directScroll()) {
        return
      }
      
      // Bulunamazsa 200ms aralıklarla 10 kez dene
      let retryCount = 0
      const retryInterval = setInterval(() => {
        retryCount++
        console.log(`🔄 Retry attempt ${retryCount}/10 for comment in detail page: ${commentId}`)
        
        if (directScroll()) {
          clearInterval(retryInterval)
          return
        }
        
        if (retryCount >= 10) {
          console.log('❌ Comment not found after 10 retries in detail page:', commentId)
          clearInterval(retryInterval)
        }
      }, 200)
    }

    const handleHashScroll = () => {
      const hash = window.location.hash
      console.log('Hash detected in detail page:', hash)
      
      if (hash && hash.startsWith('#comment-')) {
        const commentId = hash.replace('#comment-', '')
        console.log('Comment ID from hash in detail page:', commentId)
        
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
  }, [comment])

  // Durum değiştir (Onayla/Reddet)
  const handleStatusChange = async (id: string, approved: boolean) => {
    try {
      // Anlık UI güncellemesi - ana yorumu güncelle
      if (comment && comment.id === id) {
        setComment(prev => prev ? { 
          ...prev, 
          isApproved: approved, 
          isRejected: !approved
        } : null)
      }
      
      // Yanıtları güncelle
      if (comment?.replies) {
        const updateReplies = (replies: CommentType[]): CommentType[] => {
          return replies.map(reply => {
            if (reply.id === id) {
              return { ...reply, isApproved: approved, isRejected: !approved }
            }
            if (reply.replies && reply.replies.length > 0) {
              return { ...reply, replies: updateReplies(reply.replies) }
            }
            return reply
          })
        }
        
        const updatedReplies = updateReplies(comment.replies)
        setComment(prev => prev ? { ...prev, replies: updatedReplies } : null)
      }
      
      await approveComment(id, approved)
    } catch (error) {
      // Durum değiştirme hatası
    }
  }


  // Silme modalını aç
  const openDeleteModal = (id: string) => {
    setCommentToDelete(id)
    setIsDeleteModalOpen(true)
  }


  // Silme modalını kapat
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setCommentToDelete(null)
  }

  // Yorumu sil
  const handleDeleteComment = async () => {
    if (!commentToDelete) return
    
    try {
      // Önce UI'dan hemen kaldır (optimistic update)
      if (comment && comment.id === commentToDelete) {
        // Ana yorumu siliniyorsa ana sayfaya yönlendir
        router.push('/dashboard/comments')
        return
      }
      
      // Yanıtı state'den hemen kaldır
      if (comment?.replies) {
        const removeReplyFromState = (replies: CommentType[]): CommentType[] => {
          return replies.filter(reply => {
            if (reply.id === commentToDelete) {
              return false // Silinecek yorumu çıkar
            }
            if (reply.replies && reply.replies.length > 0) {
              return {
                ...reply,
                replies: removeReplyFromState(reply.replies)
              }
            }
            return true
          })
        }
        
        const updatedReplies = removeReplyFromState(comment.replies)
        setComment(prev => prev ? { ...prev, replies: updatedReplies } : null)
      }
      
      // Modal'ı kapat
      closeDeleteModal()
      
      // Backend'den sil
      await deleteComment(commentToDelete)
      
    } catch (error) {
      // Hata durumunda sayfayı yeniden yükle
      if (commentId) {
        try {
          const commentWithReplies = await getCommentForDetailPage(commentId)
          if (commentWithReplies) {
            const commentWithMainAdminReplies = {
              ...commentWithReplies,
              adminReplies: commentWithReplies.adminReplies || []
            }
            setComment(commentWithMainAdminReplies)
          }
        } catch (reloadError) {
          // Yeniden yükleme hatası
        }
      }
    }
  }


  // Beğeni
  const handleLike = async (id: string) => {
    try {
      await likeComment(id, 'anonymous-user-' + Date.now())
      
      // Beğeni durumunu güncelle
      setLikedComments(prev => {
        const newSet = new Set(prev)
        if (newSet.has(id)) {
          newSet.delete(id)
        } else {
          newSet.add(id)
        }
        return newSet
      })
      
      // Ana yorumu güncelle
      if (comment && comment.id === id) {
        setComment(prev => prev ? { 
          ...prev, 
          likes: (prev.likes || 0) + (likedComments.has(id) ? -1 : 1),
          likedBy: likedComments.has(id) 
            ? (prev.likedBy || []).filter(userId => userId !== 'anonymous-user-' + Date.now())
            : [...(prev.likedBy || []), 'anonymous-user-' + Date.now()]
        } : null)
      }
      
      // Yanıtları güncelle
      if (comment?.replies) {
        const updateReplies = (replies: CommentType[]): CommentType[] => {
          return replies.map(reply => {
            if (reply.id === id) {
              return { 
                ...reply, 
                likes: (reply.likes || 0) + (likedComments.has(id) ? -1 : 1),
                likedBy: likedComments.has(id) 
                  ? (reply.likedBy || []).filter(userId => userId !== 'anonymous-user-' + Date.now())
                  : [...(reply.likedBy || []), 'anonymous-user-' + Date.now()]
              }
            }
            if (reply.replies && reply.replies.length > 0) {
              return { ...reply, replies: updateReplies(reply.replies) }
            }
            return reply
          })
        }
        
        const updatedReplies = updateReplies(comment.replies)
        setComment(prev => prev ? { ...prev, replies: updatedReplies } : null)
        
        // Sayfa değişikliği otomatik olarak getPaginatedReplies() ile yönetiliyor
      }
    } catch (error) {
      // Beğeni hatası
    }
  }

  // Yanıtla
  const handleReply = (comment: CommentType) => {
    setReplyingTo(comment)
    setIsReplyModalOpen(true)
  }

  // Yanıt modalını kapat
  const closeReplyModal = () => {
    setIsReplyModalOpen(false)
    setReplyingTo(null)
    setReplyContent("")
  }

  // Admin cevabı gönder - YENİ THREAD YAKLAŞIMI
  const handleSubmitReply = async () => {
    if (!replyContent.trim() || !replyingTo) return

    try {
      setSubmittingReply(true)
      
      // Ana yorumun ID'sini belirle
      let mainCommentId: string
      let parentReplyId: string | undefined = undefined
      
      if (replyingTo.parentCommentId === comment?.id) {
        // Ana yoruma direkt cevap veriliyor
        mainCommentId = comment?.id!
      } else {
        // Başka bir yanıta cevap veriliyor - ana yorum ID'sini bul
        mainCommentId = replyingTo.parentCommentId || comment?.id!
        
        // Eğer replyingTo bir admin yanıtıysa, parentReplyId'yi set et
        if (replyingTo.authorEmail === 'admin@softiel.com') {
          parentReplyId = replyingTo.id!
        }
      }
      
      // Admin cevabı oluştur - yeni thread yapısı
      const adminReplyData = {
        commentId: mainCommentId, // Ana yorumun ID'si
        blogId: replyingTo.blogId,
        content: replyContent,
        parentReplyId: parentReplyId,
        replyChain: [], // createAdminReply fonksiyonu bunu otomatik doldurur
        threadId: '' // createAdminReply fonksiyonu bunu otomatik doldurur
      }
      
      // Admin cevabını oluştur
      const newAdminReply = await createAdminReply(adminReplyData)

      // Modal'ı kapat
      closeReplyModal()

      // Sayfayı yeniden yükle ki admin cevabı doğru şekilde görünsün
      await loadComment()
    } catch (error) {
      // Admin cevabı gönderme hatası
    } finally {
      setSubmittingReply(false)
    }
  }

  // Sayfalama kaldırıldı



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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
              <p className="text-neutral-400">Yorum yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!comment && !loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center">
            <div className="text-center">
            <p className="text-red-400 text-xl mb-4">Yorum bulunamadı</p>
              <button
              onClick={() => router.push('/dashboard/comments')}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Geri Dön
              </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!comment) return null

  return (
    <DashboardLayout>
      <div>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-500/10 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        {/* Header */}
        <div>
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    try {
                      // Önce browser'ın geri butonunu dene
                      if (window.history.length > 1) {
                        router.back()
                      } else {
                        // Eğer geçmiş yoksa yorumlar sayfasına git
                        router.push('/dashboard/comments')
                      }
                    } catch (error) {
                      // Hata durumunda yorumlar sayfasına git
                      router.push('/dashboard/comments')
                    }
                  }}
                  className="group flex items-center space-x-2 px-4 py-2 text-neutral-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 relative z-10"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="text-sm font-medium">Geri Dön</span>
                </button>
                <h1 className="text-2xl font-bold text-white">Yorum Detayları</h1>
              </div>
            </div>
          </div>
        </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Ana Yorum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`glass rounded-xl p-6 border transition-all duration-300 mb-6 relative ${
            comment.isRejected === true
              ? 'border-red-500/50 shadow-red-500/20 opacity-75'
              : comment.authorEmail === 'admin@softiel.com'
              ? 'border-cyan-500/50 shadow-cyan-500/20'
              : 'border-white/20'
          }`}
          style={{
            background: comment.isRejected === true
              ? 'rgba(239, 68, 68, 0.08)'
              : comment.authorEmail === 'admin@softiel.com'
              ? 'rgba(6, 182, 212, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
            boxShadow: comment.isRejected === true
              ? '0 0 20px rgba(239, 68, 68, 0.2)'
              : comment.authorEmail === 'admin@softiel.com'
              ? '0 0 20px rgba(6, 182, 212, 0.2)'
              : undefined
          }}
        >
          {/* Reddedildi Overlay */}
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 ${
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
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    {comment.authorName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
                  <h3 className={`text-base sm:text-lg font-semibold truncate ${
                    comment.authorEmail === 'admin@softiel.com'
                      ? 'text-cyan-300'
                      : 'text-white'
                  }`}>{comment.authorName}</h3>
                  {comment.authorEmail === 'admin@softiel.com' ? (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30 w-fit">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-cyan-300 font-medium">Admin</span>
                    </div>
                  ) : null}
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 truncate">{comment.authorEmail}</p>
                <p className="text-xs text-neutral-500">{formatDate(comment.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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
          {blogData && (
            <div className="mb-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/30">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-slate-300">Kaynak:</span>
                <span className="text-sm text-blue-300 font-medium">
                  {blogData.title}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="mb-6">
            <p className={`text-base leading-relaxed break-words overflow-wrap-anywhere hyphens-auto ${
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


          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {comment.isApproved ? (
                <button
                  onClick={() => handleLike(comment.id!)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    likedComments.has(comment.id!)
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 ${likedComments.has(comment.id!) ? 'fill-current' : ''}`} />
                  <span className="text-sm">{comment.likes || 0}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2 px-4 py-2 text-yellow-300/60">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{comment.likes || 0}</span>
                  <span className="text-xs text-yellow-400/60 ml-2">(Beklemede)</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {comment.isRejected !== true && !comment.isApproved && (
                <button
                  type="button"
                  onClick={() => handleStatusChange(comment.id!, true)}
                  className="flex items-center space-x-1 px-3 py-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Onayla</span>
                </button>
              )}

              {comment.isRejected !== true && !comment.isApproved && (
                <button
                  type="button"
                  onClick={() => handleStatusChange(comment.id!, false)}
                  className="flex items-center space-x-1 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reddet</span>
                </button>
              )}
              

              {comment.isRejected !== true && comment.isApproved && (
              <button
                type="button"
                onClick={() => handleReply(comment)}
                className="flex items-center space-x-1 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-sm"
              >
                <Reply className="h-4 w-4" />
                <span>Yanıtla</span>
              </button>
              )}

              {comment.isApproved && (
              <button
                type="button"
                onClick={() => openDeleteModal(comment.id!)}
                className="flex items-center space-x-1 px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 text-sm"
              >
                <Trash2 className="h-4 w-4" />
                <span>Sil</span>
              </button>
              )}
            </div>
          </div>
        </motion.div>


        {/* Yanıtlar */}
        {getAllReplies().length > 0 ? (
          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-6">
                <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1"></div>
                <span className="text-sm text-neutral-400 px-4 py-2 bg-neutral-800/50 rounded-full border border-cyan-500/20">
                  {getTotalPages() > 1 
                    ? `Bu sayfada ${getPaginatedReplies().length} yanıt (toplam ${comment?.replies?.length || 0})`
                    : `${comment?.replies?.length || 0} yanıt`
                  }
                </span>
                <div className="h-px bg-gradient-to-l from-cyan-500/50 to-transparent flex-1"></div>
            </div>

            <div className="space-y-4">
              {getPaginatedReplies().map((reply, index) => {
                // Parent comment bilgisini bul
                let parentComment = null
                
                if (reply.parentCommentId === comment?.id) {
                  // Ana yoruma direkt cevap veriyor
                  parentComment = comment
                } else {
                  // Başka bir yanıta cevap veriyor - tüm yanıtlar arasında ara
                  const allReplies = getAllReplies()
                  parentComment = allReplies.find(r => r.id === reply.parentCommentId) || null
                  
                  // Eğer parent comment bulunamadıysa, normal yanıtlar arasında ara
                  if (!parentComment) {
                    const normalReplies = comment?.replies || []
                    parentComment = normalReplies.find(r => r.id === reply.parentCommentId) || null
                  }
                }
                
                // Yorum türü bilgisini al
                const typeInfo = getCommentTypeInfo(reply, parentComment)
                
                
                return (
                  <div 
                    key={reply.id}
                    className={`${(reply as any).level > 0 ? 'ml-6 border-l-2 border-cyan-500/20 pl-4' : ''}`}
                    style={{
                      marginLeft: ((reply as any).level || 0) * 24 + 'px'
                    }}
                  >
                    {/* Yorum türü göstergesi */}
                    <div className="mb-2 flex items-center space-x-2">
                      <span className="text-lg">{typeInfo.icon}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        typeInfo.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                        typeInfo.color === 'purple' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        typeInfo.color === 'blue' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        typeInfo.color === 'green' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                        typeInfo.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                        'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      }`}>
                        {typeInfo.type}
                      </span>
                    </div>
                    
                    <ModalReplyItem
                    reply={reply}
                    index={index}
                    parentComment={parentComment}
                    onStatusChange={handleStatusChange}
                    onDelete={openDeleteModal}
                    onLike={handleLike}
                    likedComments={likedComments}
                    formatDate={formatDate}
                    onReply={handleReply}
                  />
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {getTotalPages() > 1 && (
              <div className="mt-8 flex flex-col items-center space-y-4">
                  {/* Sayfa Bilgisi */}
                  <div className="text-sm text-neutral-400">
                    Sayfa {currentPage} / {getTotalPages()}
                    <span className="ml-2 text-cyan-400">
                      (Bu sayfada {getPaginatedReplies().length} yanıt, toplam {comment?.replies?.length || 0} yanıt)
                    </span>
                  </div>
                
                
                {/* Pagination Butonları */}
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  {/* Önceki Sayfa */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative z-20 ${
                      currentPage === 1
                        ? 'text-neutral-500 cursor-not-allowed bg-neutral-800/50'
                        : 'text-cyan-400 hover:bg-cyan-500/20 bg-neutral-800/80 hover:text-cyan-300'
                    }`}
                    style={{ border: 'none', outline: 'none', pointerEvents: 'auto' }}
                  >
                    ← Önceki
                  </button>
                  
                  {/* Sayfa Numaraları */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center relative z-20 ${
                          currentPage === page
                            ? 'bg-cyan-500 text-cyan-100 shadow-lg'
                            : 'text-neutral-300 hover:bg-neutral-700 hover:text-cyan-300 bg-neutral-800/80'
                        }`}
                        style={{ border: 'none', outline: 'none', pointerEvents: 'auto' }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  {/* Sonraki Sayfa */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === getTotalPages()}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative z-20 ${
                      currentPage === getTotalPages()
                        ? 'text-neutral-500 cursor-not-allowed bg-neutral-800/50'
                        : 'text-cyan-400 hover:bg-cyan-500/20 bg-neutral-800/80 hover:text-cyan-300'
                    }`}
                    style={{ border: 'none', outline: 'none', pointerEvents: 'auto' }}
                  >
                    Sonraki →
                  </button>
                </div>
              </div>
            )}
                  </div>
        ) : (
          <div className="mt-8 text-center py-8">
            <p className="text-neutral-400">Bu yoruma henüz yanıt verilmemiş.</p>
          </div>
        )}
      </div>
      </div>

      {/* Yanıt Modal */}
      <AnimatePresence>
        {isReplyModalOpen && replyingTo && (
          <div 
            className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
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
                closeReplyModal()
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-2xl p-6 border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-y-auto mx-4 sm:mx-0"
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                zIndex: 10000
              }}
              onClick={(e) => e.stopPropagation()}
                  >
                  {/* Header */}
            <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Reply className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Yanıt Gönder</h3>
                  <p className="text-sm text-neutral-400">Admin olarak yanıt veriyorsunuz</p>
                </div>
              </div>
              <button
                onClick={closeReplyModal}
                className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Yanıtlanan Yorum */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                  <h4 className="font-medium text-white">{replyingTo.authorName}</h4>
                  <p className="text-xs text-neutral-400">{replyingTo.authorEmail}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-300 break-words overflow-wrap-anywhere hyphens-auto">
                {replyingTo.content}
              </p>
            </div>

            {/* Admin Bilgileri */}
            <div className="mb-6 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <h4 className="font-medium text-cyan-300 mb-2">Admin Bilgileri</h4>
              <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                  <span className="text-neutral-400">Ad:</span>
                  <span className="text-white">Admin</span>
                            </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neutral-400">E-posta:</span>
                  <span className="text-white">admin@softiel.com</span>
                        </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neutral-400">Durum:</span>
                  <span className="text-green-400">Otomatik Onaylı</span>
                      </div>
                    </div>
                  </div>

            {/* Yanıt Formu */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Yanıtınız *
                </label>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Yanıtınızı yazın..."
                  className="w-full h-32 px-4 py-3 bg-white/5 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-y min-h-[120px]"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
                  </div>

              {/* Butonlar */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                      <button
                  onClick={closeReplyModal}
                  className="px-4 py-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  İptal
                          </button>
                          <button
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim() || submittingReply}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {submittingReply ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Reply className="h-4 w-4" />
                      <span>Yanıt Gönder</span>
                        </>
                      )}
                      </button>
                    </div>
                  </div>
                </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Silme Onay Modal */}
      {isDeleteModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}
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
            className="glass rounded-2xl p-6 border border-red-500/20 w-full max-w-md"
            style={{
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Yorumu Sil</h3>
                <p className="text-sm text-neutral-400">Bu işlem geri alınamaz</p>
        </div>
      </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-neutral-300 leading-relaxed">
                Bu yorumu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve yorum kalıcı olarak silinecektir.
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
                onClick={handleDeleteComment}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Sil</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  )
}

