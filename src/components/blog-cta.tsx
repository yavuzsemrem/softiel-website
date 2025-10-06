"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle, Phone, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export function BlogCTA() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-2xl shadow-modern-lg p-8 lg:p-12 text-center border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              Projenizi{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Hayata Geçirelim
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Blog yazılarımızda gördüğünüz teknikleri ve stratejileri projelerinizde uygulamak için 
              uzman ekibimizle iletişime geçin. Size özel çözümler sunalım.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: CheckCircle,
                title: "Ücretsiz Danışmanlık",
                description: "Projeniz için detaylı analiz ve öneriler"
              },
              {
                icon: MessageCircle,
                title: "Hızlı Yanıt",
                description: "24 saat içinde size dönüş yapıyoruz"
              },
              {
                icon: ArrowRight,
                title: "Özel Çözümler",
                description: "İhtiyaçlarınıza özel tasarım ve geliştirme"
              }
            ].map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-modern">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/iletisim">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200 inline-flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Ücretsiz Danışmanlık Al</span>
              </motion.button>
            </Link>
            
            <Link href="/hizmetlerimiz">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 border border-white/20 inline-flex items-center space-x-2"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <ArrowRight className="h-5 w-5" />
                <span>Hizmetlerimizi İncele</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
              <a 
                href="tel:+905411883045" 
                className="flex items-center space-x-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>0541 188 30 45</span>
              </a>
              <a 
                href="mailto:info@softiel.com" 
                className="flex items-center space-x-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>info@softiel.com</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
