"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 lg:py-24 bg-slate-900/95 backdrop-blur-md relative overflow-hidden mt-40">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-8 text-center">
                          Projenizi Hayata Geçirmeye{" "}
                          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Hazır mısınız?
                          </span>
                        </h2>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed text-center">
                          Uzman ekibimizle birlikte dijital dünyada fark yaratın. 
                          Ücretsiz danışmanlık için hemen iletişime geçin.
                        </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/iletisim">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200 hover:from-cyan-600 hover:to-blue-600 w-full sm:w-auto"
              >
                <span>Ücretsiz Danışmanlık Alın</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <motion.a
              href="https://wa.me/905411883045?text=Merhabalar,%20fiyatlandırmalar%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200 hover:from-green-600 hover:to-emerald-600 w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
              <span>WhatsApp Sohbet</span>
            </motion.a>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {/* Phone */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Telefon</h3>
              <p className="text-white/80 text-sm">0541 188 30 45</p>
              <p className="text-white/60 text-xs mt-1">7/24 Destek</p>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">E-posta</h3>
              <p className="text-white/80 text-sm">info@softiel.com</p>
              <p className="text-white/60 text-xs mt-1">24 Saat İçinde Yanıt</p>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-white/80 text-sm">0541 188 30 45</p>
              <p className="text-white/60 text-xs mt-1">Anında Yanıt</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

