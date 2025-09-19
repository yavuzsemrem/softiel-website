"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Proje süresi ne kadar?",
    answer: "Proje süresi projenin karmaşıklığına göre değişir. Basit web siteleri 2-4 hafta, karmaşık web uygulamaları 2-6 ay sürebilir. Detaylı süre tahmini için ücretsiz danışmanlık alabilirsiniz."
  },
  {
    question: "Ödeme koşulları nasıl?",
    answer: "Projelerimizde genellikle %50 peşin, %50 teslimde ödeme modeli uygularız. Büyük projelerde aşamalı ödeme seçenekleri de sunuyoruz."
  },
  {
    question: "Hosting ve domain dahil mi?",
    answer: "Evet, tüm planlarımızda hosting ve domain hizmetleri dahildir. Ayrıca SSL sertifikası, e-posta hesapları ve teknik destek de ücretsizdir."
  },
  {
    question: "Proje tesliminden sonra destek var mı?",
    answer: "Evet, tüm projelerimizde teslim sonrası 1 yıl ücretsiz teknik destek sağlıyoruz. Ayrıca güncelleme ve bakım hizmetleri de sunuyoruz."
  },
  {
    question: "SEO optimizasyonu dahil mi?",
    answer: "Evet, tüm web projelerimizde temel SEO optimizasyonu dahildir. Gelişmiş SEO hizmetleri için ayrı paketlerimiz de mevcuttur."
  },
  {
    question: "Mobil uyumluluk garantili mi?",
    answer: "Evet, tüm projelerimiz responsive tasarım ile mobil uyumludur. Farklı cihazlarda test edilir ve garanti edilir."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Merak ettiğiniz soruların yanıtlarını burada bulabilirsiniz.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <Plus className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  )}
                </div>
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
                    <div className="px-6 pb-6">
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
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

