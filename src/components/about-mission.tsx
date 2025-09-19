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
    <section id="our-mission" className="relative py-20 lg:py-24">
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

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Misyonumuz ve{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
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
          
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Çalışma{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Prensiplerimiz
            </span>
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Müşterilerimize en iyi hizmeti sunmak için belirlediğimiz değerler ve yaklaşımımızla fark yaratıyoruz.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group w-full max-w-md h-full"
            >
              <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] text-center sm:text-left h-full flex flex-col"
                   style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/25 mx-auto sm:mx-0"
                >
                  <value.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Title */}
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  {value.title}
                </h4>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  {value.description}
                </p>

                {/* Features */}
                <div className="space-y-2 flex flex-col items-center sm:items-start max-w-44 sm:max-w-none mx-auto sm:mx-0 pl-2 sm:pl-0 flex-grow">
                  {value.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2 justify-start w-full"
                    >
                      <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-left">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
