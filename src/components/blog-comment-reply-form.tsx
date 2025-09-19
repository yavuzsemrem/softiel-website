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
  Loader2,
  X
} from "lucide-react"
import { useRecaptcha } from "@/hooks/useRecaptcha"
import { createComment } from "@/lib/comment-service"

interface CommentReplyFormData {
  name: string
  email: string
  content: string
}

interface BlogCommentReplyFormProps {
  parentCommentId: string
  blogId: string
  onReplySubmit?: (reply: CommentReplyFormData) => void
  onCancel?: () => void
}

export function BlogCommentReplyForm({ 
  parentCommentId, 
  blogId, 
  onReplySubmit, 
  onCancel 
}: BlogCommentReplyFormProps) {
  const [formData, setFormData] = useState<CommentReplyFormData>({
    name: '',
    email: '',
    content: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { isReady, isEnabled, executeRecaptcha } = useRecaptcha()

  const handleInputChange = (field: keyof CommentReplyFormData, value: string) => {
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
    if (!formData.content.trim()) {
      setErrorMessage('Yanıtınızı yazınız')
      setSubmitStatus('error')
      return false
    }
    if (formData.content.trim().length < 5) {
      setErrorMessage('Yanıtınız en az 5 karakter olmalıdır')
      setSubmitStatus('error')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // ReCAPTCHA token al (production'da)
      let recaptchaToken = null
      if (isEnabled && isReady) {
        recaptchaToken = await executeRecaptcha('BLOG_COMMENT')
      }

      // Yanıtı Firestore'a kaydet
      const replyData = {
        blogId: blogId,
        authorName: formData.name.trim(),
        authorEmail: formData.email.trim(),
        content: formData.content.trim(),
        isApproved: false, // Admin onayı bekliyor
        isReply: true,
        parentCommentId: parentCommentId
      }

      await createComment(replyData)

      // Başarılı gönderim
      setSubmitStatus('success')
      setFormData({ name: '', email: '', content: '' })
      
      // Parent component'e bildir
      if (onReplySubmit) {
        onReplySubmit(formData)
      }

      // 2 saniye sonra durumu sıfırla
      setTimeout(() => {
        setSubmitStatus('idle')
        if (onCancel) {
          onCancel()
        }
      }, 2000)

    } catch (error) {
      console.error('Yanıt gönderme hatası:', error)
      setSubmitStatus('error')
      setErrorMessage('Yanıt gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 glass rounded-xl p-6 border border-white/20 shadow-modern w-full max-w-2xl"
      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}>
            <MessageSquare className="h-3 w-3 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-white">Yanıt Yaz</h4>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1 text-neutral-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ad ve E-posta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-white flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>Adınız *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2.5 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 border border-white/20 text-sm min-w-0"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="Adınızı giriniz"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-white flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>E-posta *</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2.5 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 border border-white/20 text-sm min-w-0"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              placeholder="E-posta adresinizi giriniz"
              required
            />
          </div>
        </div>

        {/* Yanıt */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-white flex items-center space-x-1">
            <MessageSquare className="h-3 w-3" />
            <span>Yanıtınız *</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 border border-white/20 resize-y min-h-[80px] text-sm min-w-0"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            placeholder="Yanıtınızı buraya yazınız..."
            required
          />
          <p className="text-xs text-neutral-400">
            En az 5 karakter olmalıdır ({formData.content.length}/5)
          </p>
        </div>

        {/* Durum Mesajları */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 p-3 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Yanıtınız başarıyla gönderildi!</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 p-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{errorMessage}</span>
          </motion.div>
        )}

        {/* Gönder Butonu */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm order-2 sm:order-1"
            >
              İptal
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !isReady}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-modern disabled:opacity-50 disabled:cursor-not-allowed text-sm order-1 sm:order-2"
            style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Gönderiliyor...</span>
              </>
            ) : (
              <>
                <Send className="h-3 w-3" />
                <span>Yanıt Gönder</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
