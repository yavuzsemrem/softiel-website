"use client"

import React, { useState, useEffect } from "react"
import { BlogCommentForm } from "@/components/blog-comment-form"
import { BlogCommentsList } from "@/components/blog-comments-list"
import { getBlog } from "@/lib/blog-service"
import { useI18n } from "@/contexts/i18n-context"

interface BlogCommentsSectionProps {
  slug: string
}

export function BlogCommentsSection({ slug }: BlogCommentsSectionProps) {
  const { t } = useI18n()
  const [blogId, setBlogId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const fetchBlogId = async () => {
      try {
        const blog = await getBlog(slug)
        if (blog && blog.id) {
          setBlogId(blog.id)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    fetchBlogId()
  }, [slug])

  // URL hash'ini kontrol et ve yoruma scroll yap - Güçlendirilmiş versiyon
  useEffect(() => {
    const scrollToComment = (commentId: string) => {
      
      // Önce direkt scroll yapmaya çalış
      const directScroll = () => {
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
          
          return true
        }
        return false
      }
      
      // Hemen dene
      if (directScroll()) {
        return
      }
      
      // Bulunamazsa Intersection Observer ile bekle
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            })
            
            // Yorumu vurgula
            const element = entry.target as HTMLElement
            element.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
            element.style.border = '2px solid rgba(59, 130, 246, 0.3)'
            element.style.borderRadius = '8px'
            element.style.transition = 'all 0.3s ease'
            
            setTimeout(() => {
              element.style.backgroundColor = ''
              element.style.border = ''
            }, 3000)
            
            observer.disconnect()
          }
        })
      }, {
        threshold: 0.1
      })

      // Yorumu bul ve observer'a ekle
      const commentElement = document.getElementById(`comment-${commentId}`)
      if (commentElement) {
        observer.observe(commentElement)
      } else {
        // Yorum bulunamazsa 500ms aralıklarla 5 kez dene
        let retryCount = 0
        const retryInterval = setInterval(() => {
          retryCount++
          
          if (directScroll()) {
            clearInterval(retryInterval)
            return
          }
          
          if (retryCount >= 5) {
            clearInterval(retryInterval)
          }
        }, 500)
      }
    }

    const handleHashScroll = () => {
      const hash = window.location.hash
      
      if (hash && hash.startsWith('#comment-')) {
        const commentId = hash.replace('#comment-', '')
        
        // Hemen scroll yapmaya çalış
        scrollToComment(commentId)
      }
    }

    // Sayfa yüklendiğinde hash kontrol et
    setTimeout(() => {
      handleHashScroll()
    }, 1000)

    // Hash değişikliklerini dinle
    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [])

  const handleCommentSubmit = () => {
    // Mevcut scroll pozisyonunu kaydet - KESIN ÇÖZÜM
    const currentScrollY = window.scrollY
    
    setRefreshKey(prev => prev + 1)
    
    // Scroll pozisyonunu koru - birden fazla deneme
    setTimeout(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' })
    }, 50)
    
    setTimeout(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' })
    }, 200)
    
    setTimeout(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' })
    }, 500)
  }

  // Yorumlar yüklendiğinde hash kontrolü yap
  useEffect(() => {
    if (!loading && blogId) {
      const hash = window.location.hash
      if (hash && hash.startsWith('#comment-')) {
        const commentId = hash.replace('#comment-', '')
        
        // 2 saniye bekle ki yorumlar tamamen yüklensin
        setTimeout(() => {
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
            // 1 saniye sonra tekrar dene
            setTimeout(() => {
              const retryElement = document.getElementById(`comment-${commentId}`)
              if (retryElement) {
                retryElement.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'center'
                })
                retryElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                retryElement.style.border = '2px solid rgba(59, 130, 246, 0.3)'
                retryElement.style.borderRadius = '8px'
                setTimeout(() => {
                  retryElement.style.backgroundColor = ''
                  retryElement.style.border = ''
                }, 3000)
              }
            }, 1000)
          }
        }, 2000)
      }
    }
  }, [loading, blogId])

  if (loading) {
    return (
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-neutral-400">{t('blogDetail.commentsLoading', 'Yorum bölümü yükleniyor...')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="comments-section" className="relative">
      {/* Yorum Yazma Formu - Sticky olmadan */}
      <div className="mb-8">
        <BlogCommentForm blogSlug={slug} onCommentSubmit={handleCommentSubmit} />
      </div>
      
      {/* Yorum Listesi - Proper sticky container */}
      <div className="relative">
        <BlogCommentsList key={refreshKey} blogSlug={slug} blogId={blogId || undefined} />
      </div>
    </div>
  )
}
