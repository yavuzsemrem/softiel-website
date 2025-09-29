"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  MessageCircle, 
  Lightbulb, 
  Code, 
  Rocket, 
  CheckCircle
} from "lucide-react"

const processSteps = [
  {
    icon: MessageCircle,
    title: "Analiz & Planlama",
    description: "Projenizi detaylı analiz eder, strateji geliştiririz",
    features: ["Ücretsiz Danışmanlık", "İhtiyaç Analizi", "Teknik Değerlendirme"],
    color: "from-blue-500 to-cyan-500",
    step: "01"
  },
  {
    icon: Lightbulb,
    title: "Tasarım & Geliştirme",
    description: "Modern tasarım ve kodlama ile hayata geçiririz",
    features: ["UI/UX Tasarım", "Prototip Oluşturma", "Proje Planlaması"],
    color: "from-cyan-500 to-sky-500",
    step: "02"
  },
  {
    icon: Code,
    title: "Test & Optimizasyon",
    description: "Kalite kontrolü ve performans optimizasyonu yaparız",
    features: ["Kod Geliştirme", "Test & Optimizasyon", "Güvenlik Kontrolleri"],
    color: "from-sky-500 to-indigo-500",
    step: "03"
  },
  {
    icon: Rocket,
    title: "Teslimat & Destek",
    description: "Projeyi teslim eder, sürekli destek sağlarız",
    features: ["Canlıya Alma", "7/24 Destek", "Sürekli Güncelleme"],
    color: "from-indigo-500 to-purple-500",
    step: "04"
  },
  {
    icon: CheckCircle,
    title: "İzleme & Raporlama",
    description: "Proje performansını takip eder, detaylı raporlar sunarız",
    features: ["Performans İzleme", "Detaylı Raporlar", "Analiz"],
    color: "from-purple-500 to-pink-500",
    step: "05"
  },
  {
    icon: MessageCircle,
    title: "Sürekli İyileştirme",
    description: "Kullanıcı geri bildirimlerine göre sürekli güncelleme yaparız",
    features: ["Geri Bildirim", "Güncellemeler", "İyileştirmeler"],
    color: "from-pink-500 to-red-500",
    step: "06"
  }
]

export function ProcessNew() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
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
              Çalışma Sürecimiz
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Projenizi{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Hayata Geçiriyoruz
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Deneyimli ekibimizle birlikte projenizi en verimli şekilde 
            planlayıp hayata geçiriyoruz.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="glass rounded-xl p-8 lg:p-10 shadow-modern border border-white/50 dark:border-white/40 text-center backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 h-full"
                     style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                  
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-modern">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mx-auto mb-8 shadow-modern`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
                    {step.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed text-sm lg:text-base">
                    {step.description}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
