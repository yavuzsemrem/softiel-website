"use client"

import React from "react"
import { motion } from "framer-motion"
import { BookOpen, Search, Filter, ArrowRight, Calendar, User, MessageCircle } from "lucide-react"

export function BlogHero() {
  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20">
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
            <BookOpen className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Blog & İçerikler
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
            Dijital Dünyada{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Bilgi ve İlham
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Web tasarımından yapay zekaya, SEO'dan mobil uygulama geliştirmeye kadar 
            dijital dünyadaki son gelişmeler, ipuçları ve uzman görüşlerimizi keşfedin. 
            İşinizi büyütecek stratejiler ve teknolojiler hakkında güncel içerikler.
          </p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center items-center"
          >
            <motion.a
              href="#blog-posts"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <span>Yazıları Keşfet</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Blog Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            {
              icon: Search,
              title: "Aylık Ziyaretçi",
              info: "25K+",
              description: "Aktif Okuyucu",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: ArrowRight,
              title: "Ortalama Okuma",
              info: "4.2 dk",
              description: "İçerik Kalitesi",
              color: "from-cyan-500 to-cyan-600",
            },
            {
              icon: Calendar,
              title: "Haftalık Güncelleme",
              info: "3-4",
              description: "Yeni İçerik",
              color: "from-sky-500 to-sky-600",
            },
            {
              icon: MessageCircle,
              title: "Okuyucu Memnuniyeti",
              info: "98%",
              description: "Pozitif Geri Bildirim",
              color: "from-purple-500 to-purple-600",
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-4 lg:p-5 shadow-modern border border-white/50 dark:border-white/40 text-center group backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-modern`}>
                <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-neutral-900 dark:text-white mb-1 lg:mb-2">
                {item.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1 text-sm lg:text-base">
                {item.info}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

