"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, Star, CheckCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-300 dark:bg-sky-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        
        {/* Additional gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-sky-500/5 via-transparent to-blue-500/5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 shadow-modern mb-6"
            >
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Türkiye'nin En İyi Web Ajansı
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
            >
              Dijital Dünyada{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Fark Yaratın
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-blue-100 dark:text-blue-200 mb-8 leading-relaxed max-w-2xl"
            >
              Softiel ile modern web tasarımı, gelişmiş web geliştirme ve 
              etkili dijital pazarlama çözümleriyle markanızı öne çıkarın.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {[
                "Modern ve Responsive Tasarım",
                "SEO Optimizasyonu",
                "Hızlı Yükleme Süreleri",
                "7/24 Teknik Destek"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-blue-100 dark:text-blue-200">
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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/iletisim">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center space-x-2 gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
                >
                  <span>Projenizi Başlatın</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-2 glass text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 hover:border-white/40 transition-all duration-200 shadow-modern hover:shadow-modern-lg"
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Demo İzleyin</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-8 text-center"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-cyan-300 dark:text-cyan-400">
                  500+
                </div>
                <div className="text-sm text-blue-100 dark:text-blue-200">
                  Proje
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-cyan-300 dark:text-cyan-400">
                  98%
                </div>
                <div className="text-sm text-blue-100 dark:text-blue-200">
                  Memnuniyet
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-cyan-300 dark:text-cyan-400">
                  24/7
                </div>
                <div className="text-sm text-blue-100 dark:text-blue-200">
                  Destek
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Clean Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-3xl shadow-modern-lg overflow-hidden">
              {/* Simple Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-sky-400 rounded-full blur-2xl"></div>
              </div>

              {/* Clean Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Softiel
                  </div>
                  <div className="text-xl opacity-90 mb-8">Dijital Çözümler</div>
                  
                  {/* Simple Feature Icons */}
                  <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto">
                    <div className="glass rounded-2xl p-4 text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg mx-auto mb-2"></div>
                      <div className="text-sm font-medium">Web Tasarım</div>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg mx-auto mb-2"></div>
                      <div className="text-sm font-medium">Web Geliştirme</div>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mx-auto mb-2"></div>
                      <div className="text-sm font-medium">SEO</div>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-lg mx-auto mb-2"></div>
                      <div className="text-sm font-medium">Dijital Pazarlama</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

