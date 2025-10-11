"use client"

import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cookie, Settings, BarChart, Shield, Eye, Globe, Mail, Scale } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

interface CookieModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CookieModal({ isOpen, onClose }: CookieModalProps) {
  const { t } = useI18n()
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
      document.body.style.top = `-${savedScrollY.current}px`
    } else {
      // Modal kapandığında scroll'u geri aç
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
      document.body.style.top = 'unset'
      
      // Scroll pozisyonunu geri yükle - animasyonsuz
      window.scrollTo({
        top: savedScrollY.current,
        left: 0,
        behavior: 'instant'
      })
    }
  }, [isOpen])

  return (
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
              {/* Modal Container */}
              <div 
                className="glass rounded-3xl shadow-modern-lg backdrop-blur-lg overflow-hidden flex flex-col"
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none' }}
              >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Cookie className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold font-display">{t('cookie.title', 'Çerez Politikası')}</h2>
                          <p className="text-emerald-100 text-sm">{t('cookie.subtitle', 'Web sitemizde kullanılan çerezler hakkında bilgi')}</p>
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
                <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                  <div className="prose prose-lg max-w-none text-neutral-700 dark:text-neutral-300">
                    {/* Introduction */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl" style={{ border: 'none' }}>
                      <p className="text-base leading-relaxed mb-0">
                        {t('cookie.introduction', 'Softiel olarak, web sitemizi ziyaret eden kullanıcıların deneyimini geliştirmek, site performansını ölçmek ve hizmetlerimizi iyileştirmek amacıyla çerezler kullanmaktayız. Bu Çerez Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında hazırlanmıştır.')}
                      </p>
                    </div>

                    {/* Section 1 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <Cookie className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('cookie.section1.title', '1. Çerez Nedir?')}</h3>
                      </div>
                      <p>
                        {t('cookie.section1.description', 'Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza veya cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar sayesinde site, tercihlerinizi hatırlayabilir ve kullanıcı deneyiminizi geliştirebilir.')}
                      </p>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Settings className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('cookie.section2.title', '2. Kullanılan Çerez Türleri')}</h3>
                      </div>
                      
                      {/* Zorunlu Çerezler */}
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl" style={{ border: 'none' }}>
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {t('cookie.section2.essential', 'Zorunlu Çerezler')}
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-300 mb-0">
                          {t('cookie.section2.essentialDesc', 'Sitenin temel işlevlerini yerine getirebilmesi için gerekli çerezlerdir. Oturum açma, form gönderme gibi işlevler bu çerezler olmadan çalışmaz.')}
                        </p>
                      </div>

                      {/* İşlevsel Çerezler */}
                      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl" style={{ border: 'none' }}>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {t('cookie.section2.functional', 'İşlevsel Çerezler')}
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-0">
                          {t('cookie.section2.functionalDesc', 'Tercihlerinizi (ör. dil seçimi, görüntü ayarları) hatırlayarak siteyi size özel hale getirir.')}
                        </p>
                      </div>

                      {/* Analitik Çerezler */}
                      <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl" style={{ border: 'none' }}>
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                          {t('cookie.section2.analytics', 'Analitik / Performans Çerezleri')}
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-300 mb-0">
                          {t('cookie.section2.analyticsDesc', 'Google Analytics aracılığıyla kullanıcıların site üzerindeki hareketlerini (trafik analizi, ziyaret edilen sayfalar, gezinme süreleri) anonim olarak toplar. Bu sayede site performansını ve kullanıcı deneyimini geliştirmemize yardımcı olur.')}
                        </p>
                      </div>

                      {/* Pazarlama Çerezleri */}
                      <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl" style={{ border: 'none' }}>
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          {t('cookie.section2.marketing', 'Pazarlama / İzleme Çerezleri')}
                        </h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300 mb-0">
                          {t('cookie.section2.marketingDesc', 'Kullanıcı davranışlarını analiz ederek reklam ve kampanya çalışmalarının etkinliğini ölçmemize yardımcı olur.')}
                        </p>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <BarChart className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('cookie.section3.title', '3. Çerezlerin Kullanım Amaçları')}</h3>
                      </div>
                      <p className="mb-4">{t('cookie.section3.description', 'Toplanan veriler, aşağıdaki amaçlarla kullanılmaktadır:')}</p>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>{t('cookie.section3.analyze', 'Site performansını analiz etmek,')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>{t('cookie.section3.improve', 'Kullanıcı deneyimini iyileştirmek,')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>{t('cookie.section3.measure', 'Ziyaretçi sayısını ve trafik kaynaklarını ölçmek,')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>{t('cookie.section3.quality', 'Hizmet kalitemizi artırmak.')}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('cookie.section4.title', '4. Üçüncü Taraf Çerezler')}</h3>
                      </div>
                      <p>
                        {t('cookie.section4.description', 'Sitemizde yalnızca Google Analytics hizmeti kapsamında üçüncü taraf çerezler kullanılmaktadır. Bu çerezler anonim istatistiksel veriler toplar ve kişisel kimlik bilgilerinizi ifşa etmez.')}
                      </p>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('cookie.section5.title', '5. Çerezlerin Saklanma Süresi')}</h3>
                      </div>
                      <p>
                        {t('cookie.section5.description', 'Çerezler, oturum süresince saklanmakta olup tarayıcı kapatıldığında otomatik olarak silinir.')}
                      </p>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Globe className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('cookie.section6.title', '6. Çerezlerin Yönetimi')}</h3>
                      </div>
                      <p>
                        {t('cookie.section6.description', 'Kullanıcılar, tarayıcı ayarları üzerinden çerezleri reddedebilir veya mevcut çerezleri silebilir. Çerezleri devre dışı bırakmanız halinde, sitenin bazı bölümlerinin doğru çalışmayabileceğini hatırlatırız.')}
                      </p>
                    </div>

                    {/* Section 7 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Scale className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('cookie.section7.title', '7. Yasal Dayanak ve Uyum')}</h3>
                      </div>
                      <p>
                        {t('cookie.section7.description', 'Çerez kullanımı, KVKK ve GDPR kapsamında yasal yükümlülüklere uygun olarak gerçekleştirilmektedir. Kullanıcılar, diledikleri zaman çerezlere ilişkin haklarını kullanabilir ve bizden bilgi talep edebilirler.')}
                      </p>
                    </div>

                    {/* Section 8 */}
                    <div className="mb-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <Mail className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('cookie.section8.title', '8. İletişim')}</h3>
                      </div>
                      <p className="mb-4">{t('cookie.section8.description', 'Çerez Politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:')}</p>
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-2xl" style={{ border: 'none' }}>
                        <div className="space-y-2">
                          <p className="font-semibold text-neutral-900 dark:text-white mb-2">Softiel</p>
                          <p className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
                            <Mail className="h-4 w-4 text-emerald-500" />
                            <span>{t('cookie.section8.email', 'E-posta:')} <a href="mailto:info@softiel.com" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">info@softiel.com</a></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" style={{ borderTop: 'none' }}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {t('cookie.lastUpdated', 'Son güncelleme:')} {new Date().toLocaleDateString('tr-TR')}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium text-sm shadow-modern hover:shadow-modern-lg transition-all duration-200"
                    >
                      {t('cookie.understood', 'Anladım')}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
