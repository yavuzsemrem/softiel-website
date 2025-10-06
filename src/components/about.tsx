"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Target, 
  Users, 
  Lightbulb, 
  Award, 
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Hedef Odaklı",
    description: "Her projede müşterinin hedeflerine ulaşmasını sağlıyoruz"
  },
  {
    icon: Users,
    title: "Müşteri Memnuniyeti",
    description: "Müşteri memnuniyeti bizim önceliğimizdir"
  },
  {
    icon: Lightbulb,
    title: "İnovasyon",
    description: "Sürekli gelişen teknolojileri takip ediyoruz"
  },
  {
    icon: Award,
    title: "Kalite",
    description: "En yüksek kalite standartlarında çalışıyoruz"
  }
]

const achievements = [
  "500+ Başarılı Proje",
  "50+ Mutlu Müşteri",
  "5+ Yıl Deneyim",
  "99% Müşteri Memnuniyeti"
]

export function About() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            >
              <Award className="h-5 w-5 text-cyan-500 fill-current" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Güvenilir Partner</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6"
            >
              Dijital Dünyada{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Güvenilir Partneriniz
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 mb-8"
            >
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                2019 yılından beri dijital dünyada faaliyet gösteren Softiel, 
                müşterilerinin dijital dönüşüm yolculuğunda güvenilir bir partner olarak 
                hizmet vermektedir.
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Modern teknolojiler, yaratıcı tasarım anlayışı ve deneyimli ekibimizle 
                markanızı dijital dünyada öne çıkarıyor, hedeflerinize ulaşmanızı sağlıyoruz.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
            >
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                Başarılarımız
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/hakkimizda">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center space-x-2 text-white px-6 py-3 rounded-2xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
                  style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
                >
                  <span>Daha Fazla Bilgi</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-2 glass px-6 py-3 rounded-2xl font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border border-white/20"
                style={{ background: 'rgba(148, 148, 148, 0.1)' }}
              >
                <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Hikayemizi İzleyin</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="glass rounded-2xl p-8 shadow-modern-lg border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                   style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-modern">
                    <span className="text-2xl font-bold text-white">S</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                    Softiel Ekibi
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Uzman ve deneyimli kadromuz
                  </p>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 glass rounded-lg"
                       style={{ background: 'rgba(148, 148, 148, 0.1)' }}>
                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">15+</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Uzman</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg"
                       style={{ background: 'rgba(148, 148, 148, 0.1)' }}>
                    <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">5+</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Yıl</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Web Tasarım</span>
                    <span className="text-neutral-900 dark:text-white font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Web Geliştirme</span>
                    <span className="text-neutral-900 dark:text-white font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">SEO</span>
                    <span className="text-neutral-900 dark:text-white font-semibold">88%</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-modern"
              >
                <Award className="h-8 w-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-modern"
              >
                <Users className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

