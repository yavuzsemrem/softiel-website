"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Rocket, 
  Zap, 
  Globe, 
  Shield, 
  Users,
  Award,
  Cpu
} from "lucide-react"

const features = [
  {
    icon: Rocket,
    title: "Hızlı Teslimat",
    description: "Projelerinizi zamanında ve kaliteli şekilde teslim ediyoruz",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Zap,
    title: "Modern Teknoloji",
    description: "En güncel teknolojileri kullanarak geleceğe uygun çözümler sunuyoruz",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Globe,
    title: "Global Standart",
    description: "Uluslararası kalite standartlarında hizmet veriyoruz",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Güvenli Çözümler",
    description: "Verilerinizi koruyan güvenli ve şifreli sistemler geliştiriyoruz",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Users,
    title: "Uzman Ekip",
    description: "Deneyimli ve uzman kadromuzla en iyi çözümleri sunuyoruz",
    color: "from-cyan-500 to-teal-500"
  },
  {
    icon: Award,
    title: "Kalite Garantisi",
    description: "Her projede en yüksek kalite standartlarını uyguluyoruz",
    color: "from-pink-500 to-rose-500"
  }
]

const processSteps = [
  { step: "01", title: "Analiz & Planlama", description: "Projenizi detaylı analiz eder, strateji geliştiririz" },
  { step: "02", title: "Tasarım & Geliştirme", description: "Modern tasarım ve kodlama ile hayata geçiririz" },
  { step: "03", title: "Test & Optimizasyon", description: "Kalite kontrolü ve performans optimizasyonu yaparız" },
  { step: "04", title: "Teslimat & Destek", description: "Projeyi teslim eder, sürekli destek sağlarız" },
  { step: "05", title: "İzleme & Raporlama", description: "Proje performansını takip eder, detaylı raporlar sunarız" },
  { step: "06", title: "Sürekli İyileştirme", description: "Kullanıcı geri bildirimlerine göre sürekli güncelleme yaparız" }
]

export function AboutNew() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
            <Cpu className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Teknoloji & İnovasyon
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
            Geleceği{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              İnşa Ediyoruz
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-16 max-w-4xl mx-auto leading-relaxed">
            Cutting-edge teknolojiler ve yaratıcı çözümlerle markanızı dijital dünyada öne çıkarıyoruz. 
            Her proje bir hikaye, her kod satırı bir adım daha yakın geleceğe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Process Steps */}
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <span className="text-xl font-bold text-white">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


