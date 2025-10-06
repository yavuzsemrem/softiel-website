"use client"

import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, Eye, Lock, FileText, Mail, Globe } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
                          <Shield className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold font-display">{t('privacy.title', 'Gizlilik Politikası')}</h2>
                          <p className="text-blue-100 text-sm">{t('privacy.subtitle', 'Kişisel verilerinizin korunması')}</p>
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
                  <div className="prose prose-lg max-w-none text-neutral-700 dark:text-neutral-300">
                    {/* Introduction */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                      <p className="text-base leading-relaxed mb-0">
                        {t('privacy.introduction', 'Softiel olarak, ziyaretçilerimizin ve müşterilerimizin gizliliğini korumak en önemli önceliklerimizden biridir. Bu gizlilik politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında, hangi kişisel verilerinizi topladığımızı, nasıl işlediğimizi ve haklarınızı açıklamaktadır.')}
                      </p>
                    </div>

                    {/* Section 1 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('privacy.section1.title', '1. Toplanan Veriler')}</h3>
                      </div>
                      <p className="mb-4">{t('privacy.section1.description', 'Web sitemiz üzerinden aşağıdaki kişisel veriler toplanabilmektedir:')}</p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>{t('privacy.section1.name', 'Ad Soyad')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>{t('privacy.section1.email', 'E-posta adresi')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>{t('privacy.section1.phone', 'Telefon numarası')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span>{t('privacy.section1.cookies', 'Çerezler (IP adresi, tarayıcı bilgileri, oturum verileri vb.)')}</span>
                        </li>
                      </ul>
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                        <p className="text-sm text-amber-800 dark:text-amber-200 mb-0">
                          <strong>{t('privacy.section1.important', 'Önemli:')}</strong> {t('privacy.section1.note', 'İletişim formu aracılığıyla paylaştığınız bilgiler dışında, yapay zeka botu aracılığıyla herhangi bir veri toplanmamaktadır.')}
                        </p>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('privacy.section2.title', '2. Verilerin İşlenme Amaçları')}</h3>
                      </div>
                      <p className="mb-4">{t('privacy.section2.description', 'Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:')}</p>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{t('privacy.section2.customer', 'Müşteri taleplerini yanıtlamak ve iletişime geçmek')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{t('privacy.section2.quotes', 'Teklif hazırlamak ve iş ilişkisi kurmak')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{t('privacy.section2.marketing', 'Pazarlama faaliyetleri yürütmek')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{t('privacy.section2.analytics', 'Analitik ve performans ölçümleri yapmak (Google Analytics aracılığıyla)')}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Globe className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('privacy.section3.title', '3. Çerezler ve Analitik')}</h3>
                      </div>
                      <p className="mb-4">
                        {t('privacy.section3.description', 'Web sitemizde yalnızca Google Analytics hizmeti kapsamında çerezler kullanılmaktadır. Bu çerezler, kullanıcı deneyimini geliştirmek ve site performansını ölçmek amacıyla işlenmektedir. Çerez ayarlarınızı tarayıcı seçeneklerinizden yönetebilirsiniz.')}
                      </p>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Lock className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('privacy.section4.title', '4. Verilerin Saklanma Süresi')}</h3>
                      </div>
                      <p>
                        {t('privacy.section4.description', 'Kişisel verileriniz, müşteri ilişkisi devam ettiği sürece saklanmaktadır. İlgili iş ilişkisinin sona ermesi halinde verileriniz silinecek veya anonim hale getirilecektir.')}
                      </p>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('privacy.section5.title', '5. Kullanıcı Hakları')}</h3>
                      </div>
                      <p className="mb-4">{t('privacy.section5.description', 'KVKK ve GDPR kapsamında, kişisel verileriniz üzerinde aşağıdaki haklara sahipsiniz:')}</p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>{t('privacy.section5.view', 'Verilerinizi görüntüleme')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>{t('privacy.section5.edit', 'Verilerinizi düzeltme')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>{t('privacy.section5.delete', 'Verilerinizin silinmesini talep etme')}</span>
                        </li>
                      </ul>
                      <p>{t('privacy.section5.contact', 'Bu haklarınızı kullanmak için bize')} <a href="mailto:info@softiel.com" className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium">info@softiel.com</a> {t('privacy.section5.contactEnd', 'adresinden ulaşabilirsiniz.')}</p>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Globe className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('privacy.section6.title', '6. Veri Aktarımı')}</h3>
                      </div>
                      <p className="mb-4">{t('privacy.section6.description', 'Web sitemiz Avrupa\'da barındırılmakta olup, verilerinizin işlenmesi yalnızca aşağıdaki ülkelerle sınırlıdır:')}</p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>{t('privacy.section6.turkey', 'Türkiye (iş süreçleri kapsamında)')}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span>{t('privacy.section6.usa', 'Amerika Birleşik Devletleri (Google Analytics hizmeti aracılığıyla)')}</span>
                        </li>
                      </ul>
                      <p>{t('privacy.section6.note', 'Bunun dışında verileriniz üçüncü bir ülkeye aktarılmamaktadır.')}</p>
                    </div>

                    {/* Section 7 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Lock className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('privacy.section7.title', '7. Güvenlik Önlemleri')}</h3>
                      </div>
                      <p>
                        {t('privacy.section7.description', 'Softiel olarak, kişisel verilerinizin yetkisiz erişime, kayba veya kötüye kullanıma karşı korunması için gerekli idari ve teknik güvenlik önlemlerini almaktayız.')}
                      </p>
                    </div>

                    {/* Section 8 */}
                    <div className="mb-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Mail className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{t('privacy.section8.title', '8. İletişim')}</h3>
                      </div>
                      <p className="mb-4">{t('privacy.section8.description', 'Gizlilik politikamız hakkında sorularınız veya talepleriniz için bizimle iletişime geçebilirsiniz:')}</p>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                        <div className="space-y-2">
                          <p className="font-semibold text-neutral-900 dark:text-white mb-2">Softiel</p>
                          <p className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
                            <Mail className="h-4 w-4 text-cyan-500" />
                            <span>{t('privacy.section8.email', 'E-posta:')} <a href="mailto:info@softiel.com" className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium">info@softiel.com</a></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {t('privacy.lastUpdated', 'Son güncelleme:')} {new Date().toLocaleDateString('tr-TR')}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-6 py-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 text-white rounded-xl font-medium text-sm shadow-modern hover:shadow-modern-lg transition-all duration-200"
                    >
                      {t('privacy.understood', 'Anladım')}
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
