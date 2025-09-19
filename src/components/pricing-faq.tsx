"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react"

const faqs = [
  {
    question: "Fiyatlandırma nasıl hesaplanıyor?",
    answer: "Fiyatlandırmamız projenizin karmaşıklığına, sayfa sayısına ve özel özelliklerine göre belirlenir. Temel web siteleri 5.000₺'den, kurumsal projeler 35.000₺'ye kadar değişir."
  },
  {
    question: "Ödeme seçenekleri nelerdir?",
    answer: "%50 peşin, %50 teslimat sonrası ödeme yapabilirsiniz. Ayrıca 3, 6 veya 12 taksitli ödeme seçeneklerimiz de mevcuttur."
  },
  {
    question: "Proje teslimat süresi ne kadar?",
    answer: "Başlangıç planı 7-14 gün, Profesyonel plan 14-21 gün, Kurumsal plan ise 21-30 gün içinde teslim edilir."
  },
  {
    question: "Hosting ve domain dahil mi?",
    answer: "Evet, tüm planlarımızda hosting ve domain hizmeti dahildir. Hosting süresi planınıza göre 1-3 yıl arasında değişir."
  },
  {
    question: "Proje sonrası destek var mı?",
    answer: "Proje tesliminden sonra 6 ay ücretsiz destek sağlıyoruz. Küçük güncellemeler ve hata düzeltmeleri ücretsizdir."
  },
  {
    question: "İptal ve iade politikası nedir?",
    answer: "Proje başlamadan önce iptal edilirse %100 iade yapılır. Proje başladıktan sonra tamamlanan kısım kadar ücret alınır."
  }
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
              Sık Sorulan Sorular
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Merak{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ettikleriniz
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Fiyatlandırma hakkında en çok sorulan soruları yanıtladık.
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