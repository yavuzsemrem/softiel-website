"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  Phone, 
  Mail,
  MessageCircle,
  Sparkles,
  Rocket,
  CheckCircle
} from "lucide-react"

export function CTANew() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Rocket className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Projenizi Başlatın
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
            Projenizi{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Hayata Geçirin
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-20 max-w-4xl mx-auto leading-relaxed">
            Dijital dünyada fark yaratacak projeniz için bugün başlayın. 
            Uzman ekibimizle birlikte hayalinizdeki projeyi gerçeğe dönüştürün.
          </p>

          {/* Quick Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            {[
              { icon: CheckCircle, text: "100% Memnuniyet Garantisi", color: "text-green-500" },
              { icon: Phone, text: "Hızlı Teslimat", color: "text-blue-500" },
              { icon: ArrowRight, text: "7/24 Destek", color: "text-purple-500" }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-center space-x-2 glass rounded-lg p-3 shadow-modern border border-white/30 dark:border-white/20 backdrop-blur-lg"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <benefit.icon className={`h-5 w-5 ${benefit.color} flex-shrink-0`} />
                <span className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-2xl shadow-modern-lg p-8 lg:p-12 max-w-4xl mx-auto border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] mb-12"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Ücretsiz Danışmanlık Alın
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Projeniz hakkında detaylı bilgi verin, size en uygun çözümü sunalım.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/iletisim">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-2 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
                style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
              >
                <span>Ücretsiz Teklif Al</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <motion.a
              href="tel:+905411883045"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border border-white/20"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <Phone className="h-5 w-5" />
              <span>Hemen Ara</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Phone,
              title: "Telefon",
              info: "0541 188 30 45",
              description: "7/24 Destek",
              color: "from-blue-500 to-blue-600",
              href: "tel:+905411883045"
            },
            {
              icon: Mail,
              title: "E-posta",
              info: "info@softiel.com",
              description: "24 Saat İçinde Yanıt",
              color: "from-cyan-500 to-cyan-600",
              href: "mailto:info@softiel.com"
            },
            {
              icon: MessageCircle,
              title: "Canlı Destek",
              info: "Anında Yanıt",
              description: "Chatbot ile 7/24",
              color: "from-purple-500 to-purple-600",
              href: "#"
            }
          ].map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 shadow-modern border border-white/50 dark:border-white/40 text-center group cursor-pointer block backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-modern`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-1 text-base">
                {item.info}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}


