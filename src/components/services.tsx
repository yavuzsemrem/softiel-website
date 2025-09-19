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
  },
  {
    icon: PenTool,
    title: "Logo Tasarım",
    description: "Markanızı yansıtan profesyonel logo tasarımları",
    features: ["Kurumsal Kimlik", "Logo Tasarım", "Brand Guidelines"],
    href: "/hizmetlerimiz/logo-tasarim",
    color: "from-sky-500 to-indigo-500"
  },
  {
    icon: Globe,
    title: "WordPress",
    description: "Kolay yönetilebilir WordPress siteleri",
    features: ["Tema Geliştirme", "Plugin Özelleştirme", "Güvenlik"],
    href: "/hizmetlerimiz/wordpress",
    color: "from-cyan-500 to-sky-500"
  },
  {
    icon: FileText,
    title: "İçerik Üretimi",
    description: "SEO uyumlu ve etkili içerik stratejileri",
    features: ["Blog Yazıları", "Sosyal Medya İçerik", "Video İçerik"],
    href: "/hizmetlerimiz/icerik-uretimi",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Share2,
    title: "Sosyal Medya Yönetimi",
    description: "Sosyal medyada güçlü bir varlık oluşturun",
    features: ["İçerik Planlama", "Topluluk Yönetimi", "Analiz"],
    href: "/hizmetlerimiz/sosyal-medya",
    color: "from-indigo-500 to-blue-500"
  }
]

export function Services() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Dijital dünyada başarılı olmak için ihtiyacınız olan tüm hizmetleri 
            tek çatı altında sunuyoruz.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 h-full">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
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
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 lg:p-12">
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
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
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

