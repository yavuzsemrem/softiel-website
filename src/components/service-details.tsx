"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Code, Palette, Smartphone, Search, Zap, Shield } from "lucide-react"

interface ServiceDetailsProps {
  data: {
    title: string
    description: string
    features: Array<{
      title: string
      description: string
      icon: string
    }>
  }
}

export function ServiceDetails({ data }: ServiceDetailsProps) {
  const detailedFeatures = [
    {
      icon: Palette,
      title: "Modern Tasarım",
      description: "Güncel tasarım trendlerini takip eden, kullanıcı dostu arayüzler",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Smartphone,
      title: "Mobil Uyumlu",
      description: "Tüm cihazlarda mükemmel görünüm ve performans",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "SEO Optimizasyonu",
      description: "Arama motorlarında üst sıralarda yer almanızı sağlayan yapı",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Hızlı Yükleme",
      description: "Optimize edilmiş kod ve görseller ile hızlı yükleme süreleri",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Güvenlik",
      description: "SSL sertifikası ve güvenlik önlemleri ile korumalı siteler",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Code,
      title: "Temiz Kod",
      description: "Bakımı kolay, ölçeklenebilir ve standartlara uygun kod yapısı",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <section className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <CheckCircle className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Hizmet Detayları
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Neden{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {detailedFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 group"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-modern group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 lg:p-12 shadow-modern-lg border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Projenizi Hayata Geçirelim
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle birlikte, dijital dünyada fark yaratacak projenizi oluşturalım.
            </p>
            <motion.a
              href="#contact-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <span>Ücretsiz Teklif Al</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
