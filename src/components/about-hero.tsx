"use client"

import React from "react"
import { motion } from "framer-motion"
import { Users, Award, Target, Lightbulb, ArrowRight, Calendar, MapPin, Phone } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
          >
            <Users className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Hakkımızda
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
            Dijital Dünyada{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Güvenilir Partneriniz
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Dijital dünyada faaliyet gösteren Softiel, müşterilerinin dijital dönüşüm yolculuğunda 
            güvenilir bir partner olarak hizmet vermektedir. Modern teknolojiler, yaratıcı tasarım anlayışı ve 
            deneyimli ekibimizle markanızı dijital dünyada öne çıkarıyoruz.
          </p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#our-story"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <span>Hikayemizi Keşfedin</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="/iletisim"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border border-white/20"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <Phone className="h-5 w-5" />
              <span>İletişime Geçin</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Services Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            {
              icon: Target,
              title: "Web Tasarımı",
              description: "Modern ve responsive web siteleri",
              color: "from-blue-500 to-blue-600",
              href: "/hizmetlerimiz/web-sitesi-tasarimi"
            },
            {
              icon: Lightbulb,
              title: "Mobil Uygulama",
              description: "iOS ve Android uygulamaları",
              color: "from-cyan-500 to-cyan-600",
              href: "/hizmetlerimiz/mobil-uygulama-gelistirme"
            },
            {
              icon: Award,
              title: "SEO Optimizasyonu",
              description: "Arama motoru optimizasyonu",
              color: "from-sky-500 to-sky-600",
              href: "/hizmetlerimiz/seo-arama-motoru-optimizasyonu"
            },
            {
              icon: Users,
              title: "Dijital Danışmanlık",
              description: "Stratejik dijital çözümler",
              color: "from-purple-500 to-purple-600",
              href: "/hizmetlerimiz/dijital-danismanlik"
            }
          ].map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-4 lg:p-5 shadow-modern border border-white/50 dark:border-white/40 text-center group cursor-pointer block backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-modern`}>
                <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-neutral-900 dark:text-white mb-1 lg:mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

