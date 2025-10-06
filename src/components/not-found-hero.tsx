"use client"

import React from "react"
import { motion } from "framer-motion"
import { Home, ArrowLeft, AlertTriangle } from "lucide-react"

export function NotFoundHero() {
  return (
    <section className="relative pt-20 pb-8 lg:pt-32 lg:pb-12">
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
            <AlertTriangle className="h-5 w-5 text-red-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              404 Hata
            </span>
          </motion.div>

          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-display font-bold text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text leading-none">
              404
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6 leading-tight"
          >
            Sayfa{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Bulunamadı
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönmek için aşağıdaki seçenekleri kullanabilirsiniz.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-75"
            >
              <Home className="h-5 w-5" />
              <span>Ana Sayfaya Dön</span>
            </motion.a>
            
            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-75 border border-white/20"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Geri Git</span>
            </motion.button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
