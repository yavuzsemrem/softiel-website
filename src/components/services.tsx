"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Palette, 
  Code, 
  Smartphone, 
  Search, 
  Target, 
  Bot, 
  PenTool, 
  Globe,
  FileText,
  Share2,
  ArrowRight
} from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Web Tasarım",
    description: "Modern, kullanıcı dostu ve responsive web tasarımları",
    features: ["UI/UX Tasarım", "Responsive Design", "Prototipleme"],
    href: "/hizmetlerimiz/web-tasarim",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Code,
    title: "Web Geliştirme",
    description: "Hızlı, güvenli ve ölçeklenebilir web uygulamaları",
    features: ["Frontend Geliştirme", "Backend Geliştirme", "API Entegrasyonu"],
    href: "/hizmetlerimiz/web-gelistirme",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Mobil Uygulama",
    description: "iOS ve Android için native ve cross-platform uygulamalar",
    features: ["Native Uygulama", "React Native", "Flutter"],
    href: "/hizmetlerimiz/mobil-uygulama",
    color: "from-sky-500 to-blue-500"
  },
  {
    icon: Search,
    title: "SEO Optimizasyonu",
    description: "Arama motorlarında üst sıralarda yer alın",
    features: ["Teknik SEO", "İçerik Optimizasyonu", "Link Building"],
    href: "/hizmetlerimiz/seo-optimizasyonu",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: Target,
    title: "Google Ads",
    description: "Hedefli reklam kampanyaları ile müşteri kazanın",
    features: ["Kampanya Yönetimi", "A/B Testing", "ROI Optimizasyonu"],
    href: "/hizmetlerimiz/google-ads",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Bot,
    title: "Yapay Zeka Entegrasyonu",
    description: "AI teknolojileri ile işinizi geleceğe taşıyın",
    features: ["Chatbot Geliştirme", "Makine Öğrenmesi", "Otomasyon"],
    href: "/hizmetlerimiz/yapay-zeka",
    color: "from-cyan-500 to-blue-500"
  }
]

export function Services() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
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
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
          >
            <Palette className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Hizmetlerimiz
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Hizmetlerimiz
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Dijital dünyada başarılı olmak için ihtiyacınız olan tüm hizmetleri 
            tek çatı altında sunuyoruz.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={service.href}>
                <div className="glass rounded-xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 text-center group cursor-pointer block backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 h-full"
                     style={{ background: 'rgba(148, 148, 148, 0.1)' }}>
                  {/* Icon */}
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-modern group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white mb-3 lg:mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium group-hover:translate-x-2 transition-transform duration-300 justify-center">
                    <span className="text-sm">Detayları Görün</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl shadow-modern-lg p-8 lg:p-12 max-w-4xl mx-auto border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Projeniz İçin Hangi Hizmete İhtiyacınız Var?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle birlikte projenizi hayata geçirelim. 
              Ücretsiz danışmanlık için hemen iletişime geçin.
            </p>
            <Link href="/iletisim">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
                style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
              >
                Ücretsiz Danışmanlık Alın
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

