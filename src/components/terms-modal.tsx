"use client"

import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Scale, Users, Shield, AlertCircle, Mail, Globe } from "lucide-react"

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
                <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Scale className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold font-display">Kullanım Koşulları</h2>
                          <p className="text-blue-100 text-sm">Hizmet kullanım şartları ve yükümlülükler</p>
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
                <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                  <div className="prose prose-lg max-w-none text-neutral-700 dark:text-neutral-300">
                    {/* Introduction */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                      <p className="text-base leading-relaxed mb-0">
                        Bu kullanım koşulları, Softiel web sitesini (bundan sonra "Site" olarak anılacaktır) ziyaret eden tüm kullanıcılar için geçerlidir. Siteye erişen ve kullanan herkes aşağıda belirtilen koşulları kabul etmiş sayılır.
                      </p>
                    </div>

                    {/* Section 1 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">1. Hizmetin Kapsamı</h3>
                      </div>
                      <p className="mb-4">Softiel web sitesi üzerinden kullanıcılar;</p>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Bilgi alma,</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Teklif talep etme,</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Demo talep etme,</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Blog yazılarını görüntüleme,</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Chat bot üzerinden sorular yöneltme</span>
                        </li>
                      </ul>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        hizmetlerinden yararlanabilirler. Kullanıcıların Site üzerinde bu hizmetler dışında herhangi bir işlem yapma hakkı bulunmamaktadır.
                      </p>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">2. Kullanıcı Sorumlulukları</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Kullanıcılar, Site üzerinden yalnızca doğru ve güncel bilgiler vermeyi taahhüt eder.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Spam, kötüye kullanım, zararlı içerik gönderme veya Site'nin işleyişini bozacak her türlü davranış yasaktır.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Site'nin amacı dışında kullanımı, yetkisiz erişim girişimleri ve benzeri durumlar hukuki yaptırımlara tabi olabilir.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">3. Telif Hakları</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Site üzerinde yer alan tüm içeriklerin (metin, görsel, logo, kod, tasarım vb.) tüm hakları Softiel'e aittir.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Softiel'in yazılı izni olmadan hiçbir içerik kopyalanamaz, çoğaltılamaz, dağıtılamaz veya ticari amaçla kullanılamaz.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">4. Hizmet ve İçerik Değişiklikleri</h3>
                      </div>
                      <p>
                        Softiel, Site üzerinde sunulan hizmetler, fiyatlar, içerikler ve kullanım koşullarında önceden bildirimde bulunmaksızın değişiklik yapma hakkını saklı tutar.
                      </p>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Globe className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">5. Sorumluluk Reddi</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Site üzerinde yer alan tüm bilgiler yalnızca genel bilgilendirme amacı taşır.</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Softiel, içeriklerdeki olası hata veya eksikliklerden ya da bu bilgilerin kullanımından doğabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Section 6 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Scale className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">6. Üçüncü Taraf Bağlantılar</h3>
                      </div>
                      <p>
                        Site üzerinde Google Maps ve sosyal medya hesapları gibi üçüncü taraf bağlantıları bulunabilir. Bu bağlantılar Softiel tarafından yönetilmekte olup, kullanıcı deneyimini geliştirmek amacıyla sunulmaktadır.
                      </p>
                    </div>

                    {/* Section 7 */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Scale className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">7. Uyuşmazlık ve Yasal Yetki</h3>
                      </div>
                      <p>
                        Bu kullanım koşullarından doğabilecek her türlü uyuşmazlıkta Türkiye Cumhuriyeti Kanunları geçerli olacaktır. Yetkili merciler, İstanbul mahkemeleri ve icra daireleridir.
                      </p>
                    </div>

                    {/* Section 8 */}
                    <div className="mb-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Mail className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">8. İletişim</h3>
                      </div>
                      <p className="mb-4">Kullanım koşulları hakkında tüm sorularınız ve talepleriniz için bizimle iletişime geçebilirsiniz:</p>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                        <div className="space-y-2">
                          <p className="font-semibold text-neutral-900 dark:text-white mb-2">Softiel</p>
                          <p className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
                            <Mail className="h-4 w-4 text-purple-500" />
                            <span>E-posta: <a href="mailto:info@softiel.com" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">info@softiel.com</a></span>
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
                      Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm shadow-modern hover:shadow-modern-lg transition-all duration-200"
                    >
                      Anladım
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
