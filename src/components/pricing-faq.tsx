"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

export function PricingFAQ() {
  const { t, locale, getLocalizedUrl } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      question: t('pricing.faq.0.question', 'Fiyatlandırma nasıl hesaplanıyor?'),
      answer: t('pricing.faq.0.answer', 'Fiyatlandırmamız projenizin karmaşıklığına, sayfa sayısına ve özel özelliklerine göre belirlenir. Basic paket 30.000₺\'den, Pro paket 60.000₺, Enterprise paket ise 90.000₺\'den başlar. Özel projeler için özel fiyatlandırma yapıyoruz.')
    },
    {
      question: t('pricing.faq.1.question', 'Ödeme seçenekleri nelerdir?'),
      answer: t('pricing.faq.1.answer', '%50 peşin, %50 teslimat sonrası ödeme yapabilirsiniz.')
    },
    {
      question: t('pricing.faq.2.question', 'Proje teslimat süresi ne kadar?'),
      answer: t('pricing.faq.2.answer', 'Basic paket 7-14 gün, Pro paket 14-21 gün, Enterprise paket ise 21-30 gün içinde teslim edilir. Proje karmaşıklığına göre süre değişebilir.')
    },
    {
      question: t('pricing.faq.3.question', 'Hosting ve domain dahil mi?'),
      answer: t('pricing.faq.3.answer', 'Hayır, hosting ve domain ücretleri paketlere dahil değildir. Size uygun hosting ve domain seçenekleri konusunda danışmanlık sağlıyoruz. Hosting kurulumu ve yönetimi hizmetlerimiz mevcuttur.')
    },
    {
      question: t('pricing.faq.4.question', 'Proje sonrası destek var mı?'),
      answer: t('pricing.faq.4.answer', 'Evet! Basic pakette 1 ay, Pro pakette 3 ay, Enterprise pakette 6 ay ücretsiz destek sağlıyoruz. Küçük güncellemeler ve hata düzeltmeleri ücretsizdir. Aylık bakım paketlerimiz de mevcuttur.')
    },
    {
      question: t('pricing.faq.5.question', 'İptal ve iade politikası nedir?'),
      answer: t('pricing.faq.5.answer', 'Proje başlamadan önce iptal edilirse %100 iade yapılır. Proje başladıktan sonra tamamlanan kısım kadar ücret alınır. Revizyon haklarınız paket içeriğine göre belirlenir.')
    },
    {
      question: t('pricing.faq.6.question', 'SEO hizmeti dahil mi?'),
      answer: t('pricing.faq.6.answer', 'Basic pakette temel SEO ayarları, Pro pakette aylık SEO çalışması, Enterprise pakette tam SEO yönetimi dahildir. Ayrıca aylık SEO paketlerimiz de mevcuttur.')
    },
    {
      question: t('pricing.faq.7.question', 'Sosyal medya yönetimi var mı?'),
      answer: t('pricing.faq.7.answer', 'Evet! Basic pakette 1 ay sosyal medya başlangıç desteği, Pro pakette 2 platform 8 paylaşım/ay, Enterprise pakette 4 platform profesyonel içerik + reklam yönetimi dahildir.')
    },
    {
      question: t('pricing.faq.8.question', 'Çok dilli destek sunuyor musunuz?'),
      answer: t('pricing.faq.8.answer', 'Evet! Bütün dillerde altyapı kuruyoruz. Türkçe, İngilizce, Almanca, Fransızca, Arapça ve Rusça dil desteği sunuyoruz. Enterprise pakette çok dilli altyapı dahildir.')
    }
  ]

  return (
    <section className="relative py-16 lg:py-20">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-6"
          >
            <MessageCircle className="h-5 w-5 text-cyan-400 fill-current" />
            <span className="text-sm font-semibold text-white/90">
              {t('pricing.faq.badge', 'Sık Sorulan Sorular')}
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-4">
            {t('pricing.faq.title', 'Merak')}{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {t('pricing.faq.titleGradient', 'Ettikleriniz')}
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t('pricing.faq.description', 'Fiyatlandırma hakkında en çok sorulan soruları yanıtladık.')}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass rounded-2xl shadow-modern border border-white/20 backdrop-blur-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="h-6 w-6 text-cyan-400" />
                  ) : (
                    <Plus className="h-6 w-6 text-cyan-400" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-white/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}