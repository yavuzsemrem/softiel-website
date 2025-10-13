"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Send, 
  User, 
  Mail, 
  MessageSquare, 
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"
import { useRecaptcha } from "@/hooks/useRecaptcha"
import { createComment } from "@/lib/comment-service"
import { getBlog, updateBlogComments } from "@/lib/blog-service"
import { useI18n } from "@/contexts/i18n-context"

interface CommentFormData {
  name: string
  email: string
  comment: string
}

interface BlogCommentFormProps {
  blogSlug: string
  onCommentSubmit?: (comment: CommentFormData) => void
}

export function BlogCommentForm({ blogSlug, onCommentSubmit }: BlogCommentFormProps) {
  const { t } = useI18n()
  const [formData, setFormData] = useState<CommentFormData>({
    name: '',
    email: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { isAvailable, executeRecaptchaAction } = useRecaptcha()

  const handleInputChange = (field: keyof CommentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Hata mesajını temizle
    if (submitStatus === 'error') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Adınızı giriniz')
      setSubmitStatus('error')
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage('E-posta adresinizi giriniz')
      setSubmitStatus('error')
      return false
    }
    if (!formData.email.includes('@')) {
      setErrorMessage('Geçerli bir e-posta adresi giriniz')
      setSubmitStatus('error')
      return false
    }
    if (!formData.comment.trim()) {
      setErrorMessage('Yorumunuzu yazınız')
      setSubmitStatus('error')
      return false
    }
    if (formData.comment.trim().length < 10) {
      setErrorMessage('Yorumunuz en az 10 karakter olmalıdır')
      setSubmitStatus('error')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mevcut scroll pozisyonunu kaydet
    const currentScrollY = window.scrollY
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Blog ID'yi al
      const blog = await getBlog(blogSlug)
      if (!blog || !blog.id) {
        throw new Error(t('blogDetail.notFound', 'Blog bulunamadı'))
      }

      // ReCAPTCHA token al (production'da)
      let recaptchaToken = null
      if (isAvailable) {
        const result = await executeRecaptchaAction('BLOG_COMMENT')
        if (result.success) {
          recaptchaToken = result.token
        }
      }

      // Yorumu Firestore'a kaydet
      const commentData = {
        blogId: blog.id,
        authorName: formData.name.trim(),
        authorEmail: formData.email.trim(),
        content: formData.comment.trim(),
        isApproved: false, // Admin onayı bekliyor
        isReply: false
      }

      await createComment(commentData)
      
      // Blog yorum sayısını güncelle
      try {
        await updateBlogComments(blog.id, true)
      } catch (updateError) {
        // Bu hata yorum oluşturmayı engellemez
      }

      // Başarılı gönderim
      setSubmitStatus('success')
      setFormData({ name: '', email: '', comment: '' })
      
      // Parent component'e bildir
      if (onCommentSubmit) {
        onCommentSubmit(formData)
      }

      // Scroll pozisyonunu koru - KESIN ÇÖZÜM
      setTimeout(() => {
        window.scrollTo({ top: currentScrollY, behavior: 'instant' })
      }, 50)

      // 3 saniye sonra durumu sıfırla
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)

    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(t('blogDetail.commentSubmitError', 'Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-8 shadow-modern-lg"
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-white">{t('blogDetail.commentFormTitle', 'Yorum Yap')}</h3>
          <p className="text-xs sm:text-sm text-neutral-400">{t('blogDetail.commentFormSubtitle', 'Yorumunuz admin tarafından incelendikten sonra yayınlanacaktır')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ad ve E-posta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white mb-2 flex items-center space-x-2">
              <User className="h-4 w-4 flex-shrink-0" />
              <span>{t('blogDetail.commentName', 'Adınız')} *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 min-w-0"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder={t('blogDetail.commentNamePlaceholder', 'Adınızı giriniz')}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white mb-2 flex items-center space-x-2">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span>{t('blogDetail.commentEmail', 'E-posta')} *</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 min-w-0"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder={t('blogDetail.commentEmailPlaceholder', 'E-posta adresinizi giriniz')}
              required
            />
          </div>
        </div>

        {/* Yorum */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white mb-2 flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 flex-shrink-0" />
            <span>{t('blogDetail.commentContent', 'Yorumunuz')} *</span>
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => handleInputChange('comment', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none min-w-0"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            placeholder={t('blogDetail.commentPlaceholder', 'Yorumunuzu buraya yazınız...')}
            required
          />
          <p className="text-xs text-neutral-400">
            {t('blogDetail.commentMinLength', 'En az 10 karakter olmalıdır')} ({formData.comment.length}/10)
          </p>
        </div>

        {/* Durum Mesajları */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 p-4 bg-green-500/20 text-green-400 rounded-xl border border-green-500/30"
          >
            <CheckCircle className="h-5 w-5" />
            <span>{t('blogDetail.commentSuccess', 'Yorumunuz başarıyla gönderildi!')}</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 p-4 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30"
          >
            <AlertCircle className="h-5 w-5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Gönder Butonu */}
        <div className="flex items-center justify-center sm:justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center space-x-2 px-6 py-3 text-white rounded-xl hover:opacity-90 transition-all duration-200 shadow-modern-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{t('blogDetail.commentSending', 'Gönderiliyor...')}</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{t('blogDetail.commentSubmit', 'Yorum Gönder')}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
