"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, MessageSquare, User, Mail, Phone, Building, Calendar, ArrowDown, Loader2 } from "lucide-react"
import emailjs from '@emailjs/browser'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { RECAPTCHA_CONFIG, RECAPTCHA_ACTIONS, isReCAPTCHAEnabled } from '@/config'
import { PrivacyModal } from './privacy-modal'

function ContactFormContent() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // ReCAPTCHA kontrolü (sadece production'da)
      let recaptchaToken = ''
      if (isReCAPTCHAEnabled() && executeRecaptcha) {
        recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTIONS.CONTACT_FORM)
      }

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
        to_email: 'info@softiel.com',
        // ReCAPTCHA token'ı (production'da)
        recaptcha_token: recaptchaToken
      }

      // Form verileri hazırlandı

      // EmailJS konfigürasyonu
      const result = await emailjs.send(
        'service_kz9k55y', // EmailJS Service ID
        'template_zj8l9k7', // EmailJS Template ID  
        templateParams,
        '2sFjyMYKIlcAHZn4r' // EmailJS Public Key
      )
      
      if (!result || result.status !== 200) {
        throw new Error('Email gönderimi başarısız oldu')
      }
      
      setIsSubmitted(true)
      form.reset()
      
      // 5 saniye sonra mesajı gizle
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Email gönderilirken hata:', error)
      setError('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact-form" className="relative py-16 lg:py-24">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <MessageSquare className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Detaylı İletişim
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            İletişim{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Formu
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Projeniz hakkında detaylı bilgi verin, size en uygun çözümü sunalım.
          </p>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2 text-neutral-400 dark:text-neutral-500"
            >
              <span className="text-sm font-medium">Formu doldurun</span>
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-2xl shadow-modern-lg p-8 max-w-4xl mx-auto border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Kişisel Bilgiler
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:shadow-[0_0_30px_rgba(6,182,212,0.6)] focus:shadow-[0_0_60px_rgba(6,182,212,0.4)] focus:shadow-[0_0_90px_rgba(6,182,212,0.2)] transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:shadow-[0_0_30px_rgba(16,185,129,0.6)] focus:shadow-[0_0_60px_rgba(16,185,129,0.4)] focus:shadow-[0_0_90px_rgba(16,185,129,0.2)] transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="E-posta adresiniz"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:shadow-[0_0_30px_rgba(139,92,246,0.6)] focus:shadow-[0_0_60px_rgba(139,92,246,0.4)] focus:shadow-[0_0_90px_rgba(139,92,246,0.2)] transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Telefon numaranız"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Şirket
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/70 focus:shadow-[0_0_30px_rgba(249,115,22,0.6)] focus:shadow-[0_0_60px_rgba(249,115,22,0.4)] focus:shadow-[0_0_90px_rgba(249,115,22,0.2)] transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Şirket adınız"
                  />
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Proje Bilgileri
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Hizmet Türü *
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      required
                      className="w-full px-4 py-3 pr-10 rounded-xl glass text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:shadow-[0_0_30px_rgba(59,130,246,0.6)] focus:shadow-[0_0_60px_rgba(59,130,246,0.4)] focus:shadow-[0_0_90px_rgba(59,130,246,0.2)] transition-all duration-300 appearance-none cursor-pointer backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] dark:[background:rgba(255,255,255,0.1)]"
                      style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <option value="">Hizmet seçiniz</option>
                      <option value="web-sitesi-tasarimi">Web Sitesi Tasarımı</option>
                      <option value="web-gelistirme">Web Uygulaması Geliştirme</option>
                      <option value="mobil-uygulama-gelistirme">Mobil Uygulama Geliştirme</option>
                      <option value="seo-arama-motoru-optimizasyonu">SEO Optimizasyonu</option>
                      <option value="google-ads-yonetimi">Google Ads & Meta Ads Yönetimi</option>
                      <option value="wordpress-cozumleri">WordPress & CMS Çözümleri</option>
                      <option value="logo-kurumsal-kimlik-tasarimi">Logo & Kurumsal Kimlik Tasarımı</option>
                      <option value="sosyal-medya-yonetimi">Sosyal Medya Yönetimi</option>
                      <option value="yapay-zeka-entegrasyonlari">Yapay Zeka Entegrasyonları</option>
                      <option value="dijital-danismanlik">Dijital Danışmanlık</option>
                      <option value="diger">Diğer</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Proje Detayları *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:shadow-[0_0_30px_rgba(168,85,247,0.6)] focus:shadow-[0_0_60px_rgba(168,85,247,0.4)] focus:shadow-[0_0_90px_rgba(168,85,247,0.2)] transition-all duration-300 resize-none backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Projeniz hakkında detaylı bilgi verin..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="flex items-start space-x-3 p-4 glass rounded-xl">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 text-cyan-500 border-neutral-300 rounded focus:ring-cyan-500"
              />
              <label className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors duration-200"
                >
                  Gizlilik Politikası
                </button>'nı okudum ve kabul ediyorum. Kişisel verilerimin işlenmesine onay veriyorum.
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
              className={`w-full text-white py-3 rounded-xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Gönderiliyor...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Mesajı Gönder</span>
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
                  Mesajınız başarıyla gönderildi! 24 saat içinde size dönüş yapacağız.
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

      {/* Privacy Modal */}
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </section>
  )
}

// Ana ContactForm component'i - ReCAPTCHA Provider ile sarmalanmış
export function ContactForm() {
  // ReCAPTCHA sadece production'da etkin
  if (isReCAPTCHAEnabled()) {
    return (
      <GoogleReCaptchaProvider
        reCaptchaKey={RECAPTCHA_CONFIG.siteKey}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <ContactFormContent />
      </GoogleReCaptchaProvider>
    )
  }

  // Development modunda ReCAPTCHA olmadan
  return <ContactFormContent />
}

