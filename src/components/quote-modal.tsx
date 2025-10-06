"use client"

import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Send, CheckCircle, MessageSquare, User, Mail, Phone, Building, Calendar, ArrowDown, Loader2 } from "lucide-react"
import emailjs from '@emailjs/browser'
import { PrivacyModal } from './privacy-modal'
import { useI18n } from "@/contexts/i18n-context"

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

function QuoteFormContent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, locale } = useI18n()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // ReCAPTCHA kontrolü kaldırıldı

      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      // Select'ten seçilen option'ın text içeriğini al
      const serviceSelect = form.querySelector('select[name="service"]') as HTMLSelectElement
      const selectedServiceText = serviceSelect.options[serviceSelect.selectedIndex]?.text || formData.get('service') as string
      
      const templateParams = {
        // Template'de kullanılan değişken isimleri
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        company: formData.get('company') as string,
        service: selectedServiceText, // Seçilen option'ın tam text'i
        message: formData.get('message') as string,
        date: new Date().toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        // Hostinger SMTP için
        to_email: 'info@softiel.com',
        to_name: 'Softiel Ekibi',
        from_email: formData.get('email') as string,
        from_name: formData.get('name') as string,
        // Ek bilgiler
        ip_address: typeof window !== 'undefined' ? window.location.hostname : 'unknown'
      }

      // Form verileri hazırlandı

      // EmailJS ile gönder
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      // Environment variable kontrolü
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS yapılandırması eksik. Lütfen environment variable\'ları kontrol edin.')
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )

      if (!result || result.status !== 200) {
        throw new Error('Email gönderimi başarısız oldu')
      }
      
      setIsSubmitted(true)
    } catch (err) {
      setError('Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="glass rounded-3xl shadow-modern-lg border border-white/50 dark:border-white/40 backdrop-blur-lg overflow-hidden flex flex-col"
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 p-8 text-white">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display">{t('quote.title', 'Teklif Al')}</h2>
                  <p className="text-blue-100 text-sm">{t('quote.subtitle', 'Projeniz için ücretsiz teklif alın')}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Form Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                {t('quote.formTitle', 'Projenizi Anlatalım')}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                {t('quote.formDescription', 'Aşağıdaki formu doldurarak projeniz hakkında detaylı bilgi verin.')}
                <br />
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{t('quote.timeframe', '24 saat içinde')}</span> {t('quote.timeframeDescription', 'size özel teklifimizi sunacağız.')}
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    <User className="inline h-4 w-4 mr-2 text-cyan-500" />
                    {t('contact.name', 'Ad Soyad')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    style={{ borderColor: 'rgba(178, 178, 178, 0.3)' }}
                    placeholder={t('contact.namePlaceholder', 'Adınız ve soyadınız')}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    <Mail className="inline h-4 w-4 mr-2 text-cyan-500" />
                    {t('contact.email', 'E-posta')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    style={{ borderColor: 'rgba(178, 178, 178, 0.3)' }}
                    placeholder={t('contact.emailPlaceholder', 'ornek@email.com')}
                  />
                </motion.div>
              </div>

              {/* Phone and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    <Phone className="inline h-4 w-4 mr-2 text-cyan-500" />
                    {t('contact.phone', 'Telefon')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    style={{ borderColor: 'rgba(178, 178, 178, 0.3)' }}
                    placeholder={t('contact.phonePlaceholder', '0555 123 45 67')}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label htmlFor="company" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    <Building className="inline h-4 w-4 mr-2 text-cyan-500" />
                    {t('contact.company', 'Şirket')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    style={{ borderColor: 'rgba(178, 178, 178, 0.3)' }}
                    placeholder={t('contact.companyPlaceholder', 'Şirket adınız (opsiyonel)')}
                  />
                </motion.div>
              </div>

              {/* Service Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <label htmlFor="service" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  <MessageSquare className="inline h-4 w-4 mr-2 text-cyan-500" />
                  {t('quote.serviceQuestion', 'Hangi hizmete ihtiyacınız var?')} *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  style={{ borderColor: 'rgba(178, 178, 178, 0.3)' }}
                >
                  <option value="">{t('quote.selectService', 'Hizmet seçiniz')}</option>
                  <option value="web-design">{t('services.webDesign', 'Web Sitesi Tasarımı')}</option>
                  <option value="web-development">{t('services.webDevelopment', 'Web Geliştirme')}</option>
                  <option value="mobile-app">{t('services.mobileApp', 'Mobil Uygulama Geliştirme')}</option>
                  <option value="seo">{t('services.seo', 'SEO Optimizasyonu')}</option>
                  <option value="google-ads">{t('services.googleAds', 'Google Ads & Meta Ads Yönetimi')}</option>
                  <option value="wordpress">{t('services.wordpress', 'WordPress & CMS Çözümleri')}</option>
                  <option value="logo-design">{t('services.logoDesign', 'Logo & Kurumsal Kimlik Tasarımı')}</option>
                  <option value="social-media">{t('services.socialMedia', 'Sosyal Medya Yönetimi')}</option>
                  <option value="ai-integration">{t('services.aiIntegration', 'Yapay Zeka Entegrasyonları')}</option>
                  <option value="consulting">{t('services.digitalConsulting', 'Dijital Danışmanlık')}</option>
                  <option value="other">{t('quote.other', 'Diğer')}</option>
                </select>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  <MessageSquare className="inline h-4 w-4 mr-2 text-cyan-500" />
                  {t('quote.projectDetails', 'Proje Detayları')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                  style={{ borderColor: 'rgba(178, 178, 178, 0.3)' }}
                  placeholder={t('quote.messagePlaceholder', 'Projeniz hakkında detaylı bilgi verin. Bütçe, zaman çizelgesi, özel istekleriniz vb. ne kadar detay verirseniz, o kadar doğru teklif hazırlayabiliriz.')}
                />
              </motion.div>

              {/* Privacy Policy Checkbox */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start space-x-3 p-4 glass rounded-xl"
              >
                <input
                  type="checkbox"
                  id="privacy-policy"
                  name="privacy-policy"
                  required
                  className="mt-1 h-4 w-4 text-cyan-500 border-neutral-300 rounded focus:ring-cyan-500"
                  style={{ borderColor: 'rgba(178, 178, 178, 0.3)' }}
                />
                <label htmlFor="privacy-policy" className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <button
                    type="button"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors duration-200"
                  >
                    {t('footer.privacyPolicy', 'Gizlilik Politikası')}
                  </button> {locale === 'tr' ? "'nı okudum ve kabul ediyorum. Kişisel verilerimin işlenmesine onay veriyorum." : t('quote.privacyAcceptance', "'nı okudum ve kabul ediyorum. Kişisel verilerimin işlenmesine onay veriyorum.")}
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{t('quote.sending', 'Gönderiliyor...')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{t('quote.submit', 'Teklif Talep Et')}</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Success Message - Only show when form is submitted */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3 text-green-700 dark:text-green-300">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium text-sm">
                    {t('contact.success', 'Mesajınız başarıyla gönderildi!')} {t('quote.responseTime', '24 saat içinde size dönüş yapacağız.')}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-4 bg-gradient-to-r from-red-50/80 to-pink-50/80 dark:from-red-900/30 dark:to-pink-900/30 border border-red-200 dark:border-red-800 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3 text-red-700 dark:text-red-300">
                  <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <span className="font-medium text-sm">
                    {error}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t('quote.footerText', 'Ücretsiz teklif almak için formu doldurun')}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 text-white rounded-xl font-medium text-sm shadow-modern hover:shadow-modern-lg transition-all duration-200"
            >
              {t('common.close', 'Kapat')}
            </motion.button>
          </div>
        </div>

        {/* Privacy Modal */}
        <PrivacyModal 
          isOpen={isPrivacyModalOpen} 
          onClose={() => setIsPrivacyModalOpen(false)} 
        />
      </div>
  )
}

// Ana QuoteModal component'i - ReCAPTCHA Provider ile sarmalanmış
export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const savedScrollY = useRef(0)

  // Modal açıldığında scroll pozisyonunu sakla ve engelle
  useEffect(() => {
    if (isOpen) {
      // Mevcut scroll pozisyonunu sakla
      savedScrollY.current = window.scrollY
      
      // Body scroll'unu engelle ve pozisyonu sabitle
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
      document.body.style.top = `-${savedScrollY.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      
      // HTML elementini de engelle
      document.documentElement.style.overflow = 'hidden'
    } else {
      // Modal kapandığında scroll'u geri aç
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      
      // HTML elementini de geri aç
      document.documentElement.style.overflow = ''
      
      // Scroll pozisyonunu geri yükle - animasyonsuz
      window.scrollTo({
        top: savedScrollY.current,
        left: 0,
        behavior: 'instant'
      })
    }
    
    // Cleanup function
    return () => {
      if (isOpen) {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.height = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.documentElement.style.overflow = ''
      }
    }
  }, [isOpen])

  // Modal her zaman göster (ReCAPTCHA kontrolü kaldırıldı)
  if (typeof window === 'undefined') return null
  
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div 
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <QuoteFormContent isOpen={isOpen} onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
