"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"

const features = [
  "Modern ve Responsive Tasarım",
  "SEO Optimizasyonu",
  "Hızlı Yükleme Süreleri",
  "7/24 Teknik Destek",
  "Güvenli ve Güvenilir",
  "Mobil Uyumlu"
]

export function ServicesHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white dark:bg-neutral-800 rounded-full px-4 py-2 shadow-lg border border-neutral-200 dark:border-neutral-700 mb-6"
          >
            <CheckCircle className="h-4 w-4 text-green-500 fill-current" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Kapsamlı Dijital Hizmetler
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6 leading-tight"
          >
            Dijital Dünyada{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              İhtiyacınız Olan Her Şey
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Web tasarımından yapay zeka entegrasyonuna, SEO'dan sosyal medya yönetimine kadar 
            dijital dünyada başarılı olmak için ihtiyacınız olan tüm hizmetleri sunuyoruz.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white dark:bg-neutral-800 rounded-lg px-4 py-3 shadow-sm border border-neutral-200 dark:border-neutral-700">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>Hizmetlerimizi Keşfedin</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Ücretsiz Danışmanlık</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

