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

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

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
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
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
                className="flex items-center justify-center space-x-2 glass rounded-lg p-3 shadow-modern border border-white/30 dark:border-white/20 backdrop-blur-lg text-center"
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
            <Link href="/tr/iletisim">
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
              href="https://wa.me/905411883045"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 border border-white/20"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Hemen İletişime Geç</span>
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


