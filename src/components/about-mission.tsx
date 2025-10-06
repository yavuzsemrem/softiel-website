"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, Eye, Heart, Lightbulb, CheckCircle, ArrowRight, Award } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Hedef Odaklılık",
    description: "Her projede müşterinin hedeflerine ulaşmasını sağlıyoruz. Stratejik yaklaşımımızla sonuç odaklı çözümler üretiyoruz.",
    features: ["Stratejik Planlama", "Hedef Belirleme", "Sonuç Odaklılık", "Performans Takibi"]
  },
  {
    icon: Heart,
    title: "Müşteri Memnuniyeti",
    description: "Müşteri memnuniyeti bizim önceliğimizdir. Her adımda müşteri deneyimini en üst seviyede tutuyoruz.",
    features: ["7/24 Destek", "Kişisel Yaklaşım", "Hızlı Çözüm", "Sürekli İletişim"]
  },
  {
    icon: Lightbulb,
    title: "İnovasyon",
    description: "Sürekli gelişen teknolojileri takip ediyor, yaratıcı çözümlerle müşterilerimize avantaj sağlıyoruz.",
    features: ["Yeni Teknolojiler", "Yaratıcı Çözümler", "Sürekli Gelişim", "Araştırma & Geliştirme"]
  },
  {
    icon: Eye,
    title: "Şeffaflık",
    description: "Tüm süreçlerde şeffaf olmaya özen gösteriyor, müşterilerimizle açık iletişim kuruyoruz.",
    features: ["Açık İletişim", "Düzenli Raporlama", "Proje Takibi", "Güvenilir Bilgi"]
  }
]

export function AboutMission() {
  return (
    <section id="our-mission" className="relative pt-20 pb-16 lg:pt-32 lg:pb-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            className="inline-flex items-center space-x-2 mb-8"
          >
            <Target className="h-6 w-6 text-cyan-500" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Misyon & Vizyon
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Misyonumuz ve{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Vizyonumuz
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Softiel olarak, müşterilerimize en iyi hizmeti sunmak için belirlediğimiz misyon ve vizyonumuzla 
            dijital dünyada fark yaratıyoruz.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-modern">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Misyonumuz
                </h3>
                <p className="text-cyan-600 dark:text-cyan-400 font-medium">
                  Ne Yapıyoruz?
                </p>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
              Modern teknolojiler, yaratıcı tasarım anlayışı ve deneyimli ekibimizle 
              markanızı dijital dünyada öne çıkarıyor, hedeflerinize ulaşmanızı sağlıyoruz. 
              Her projede müşteri memnuniyetini ön planda tutarak, kaliteli ve sürdürülebilir 
              çözümler sunuyoruz.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-modern">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Vizyonumuz
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  Nereye Gidiyoruz?
                </p>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
              Dünya çapında müşterilerimize hizmet veren önde gelen dijital ajans olmak ve 
              müşterilerimizin dijital dönüşüm yolculuğunda en güvenilir partner olmak. 
              Sürekli gelişen teknolojileri takip ederek, inovatif çözümlerle sektörde öncü olmaya devam etmek.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 mt-48"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(178, 178, 178, 0.1)' }}
          >
            <Award className="h-6 w-6 text-cyan-500" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Değerlerimiz
            </span>
          </motion.div>
          
          <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Çalışma{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Prensiplerimiz
            </span>
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Müşterilerimize en iyi hizmeti sunmak için belirlediğimiz değerler ve yaklaşımımızla fark yaratıyoruz.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group w-full h-full"
            >
              <div className="relative overflow-hidden rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/30 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] backdrop-blur-xl h-full flex flex-col"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                   }}>
                
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 group-hover:shadow-2xl group-hover:shadow-cyan-500/30 mx-auto sm:mx-0 transition-all duration-300"
                    style={{
                      boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <value.icon className="h-10 w-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {value.title}
                  </h4>

                  {/* Description */}
                  <p className="text-neutral-300 dark:text-neutral-400 mb-8 leading-relaxed text-lg group-hover:text-neutral-200 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 flex flex-col items-center sm:items-start flex-grow">
                    {value.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 justify-start w-full group/feature"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover/feature:scale-110 transition-transform duration-200">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm text-neutral-300 dark:text-neutral-400 leading-relaxed text-left group-hover/feature:text-white transition-colors duration-200 font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
