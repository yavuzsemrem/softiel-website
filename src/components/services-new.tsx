"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useI18n } from "@/contexts/i18n-context"
import { 
  Palette, 
  Code, 
  Smartphone, 
  Search, 
  Target, 
  Bot, 
  PenTool, 
  Globe,
  Share2,
  ArrowRight,
  Sparkles,
  FileText,
  Zap,
  Users,
  Wrench,
  BookOpen
} from "lucide-react"

export function ServicesNew() {
  const { t, getLocalizedUrl } = useI18n()
  
  const services = [
    {
      icon: Palette,
      title: t('services.items.webDesign.title', 'Web Sitesi Tasarımı'),
      description: t('services.items.webDesign.description', 'Modern, kullanıcı dostu ve responsive web tasarımları ile markanızı dijital dünyada öne çıkarın'),
      features: ["UI/UX Tasarım", "Responsive Design", "Brand Identity", "Prototipleme"],
      href: getLocalizedUrl('/hizmetlerimiz/web-sitesi-tasarimi'),
      color: "from-blue-500 to-blue-600",
      badge: null
    },
    {
      icon: Code,
      title: t('services.items.webDevelopment.title', 'Web Uygulaması Geliştirme'),
      description: t('services.items.webDevelopment.description', 'Hızlı, güvenli ve ölçeklenebilir web uygulamaları ile dijital hedeflerinize ulaşın'),
      features: ["Frontend Geliştirme", "Backend Geliştirme", "API Entegrasyonu", "Cloud Deployment"],
      href: "/tr/hizmetlerimiz/web-gelistirme",
      color: "from-cyan-500 to-cyan-600",
      badge: null
    },
    {
      icon: Smartphone,
      title: t('services.items.mobileApp.title', 'Mobil Uygulama Geliştirme'),
      description: t('services.items.mobileApp.description', 'iOS ve Android için native ve cross-platform uygulamalar ile mobil pazarda yerinizi alın'),
      features: ["Native iOS/Android", "React Native", "Flutter", "App Store Optimizasyonu"],
      href: "/tr/hizmetlerimiz/mobil-uygulama-gelistirme",
      color: "from-sky-500 to-sky-600",
      badge: null
    },
    {
      icon: Search,
      title: t('services.items.seo.title', 'SEO Optimizasyonu'),
      description: t('services.items.seo.description', 'Arama motorlarında üst sıralarda yer alarak organik trafik ve müşteri kazanın'),
      features: ["Teknik SEO", "İçerik Optimizasyonu", "Link Building", "Local SEO"],
      href: "/tr/hizmetlerimiz/seo-optimizasyonu",
      color: "from-emerald-500 to-emerald-600",
      badge: null
    },
    {
      icon: Target,
      title: t('services.items.googleAds.title', 'Google Ads Yönetimi'),
      description: t('services.items.googleAds.description', 'Hedefli reklam kampanyaları ile müşteri kazanın ve satışlarınızı artırın'),
      features: ["Kampanya Yönetimi", "A/B Testing", "ROI Optimizasyonu", "Retargeting"],
      href: "/tr/hizmetlerimiz/google-ads-yonetimi",
      color: "from-orange-500 to-orange-600",
      badge: null
    },
    {
      icon: Bot,
      title: t('services.items.aiIntegration.title', 'Yapay Zeka Entegrasyonları'),
      description: t('services.items.aiIntegration.description', 'AI teknolojileri ile işinizi geleceğe taşıyın ve rekabet avantajı elde edin'),
      features: ["Chatbot Geliştirme", "Makine Öğrenmesi", "AI Otomasyon", "API Entegrasyonu"],
      href: "/tr/hizmetlerimiz/yapay-zeka-entegrasyonlari",
      color: "from-violet-500 to-violet-600",
      badge: null
    },
    {
      icon: FileText,
      title: t('services.items.wordpress.title', 'WordPress Çözümleri'),
      description: t('services.items.wordpress.description', 'Kolay yönetilebilir içerik yönetim sistemleri ile web sitenizi güncel tutun'),
      features: ["WordPress Kurulum", "Tema Geliştirme", "Plugin Entegrasyonu", "Güvenlik Optimizasyonu"],
      href: "/tr/hizmetlerimiz/wordpress-cozumleri",
      color: "from-indigo-500 to-indigo-600",
      badge: null
    },
    {
      icon: PenTool,
      title: t('services.items.logoDesign.title', 'Logo & Kurumsal Kimlik Tasarımı'),
      description: t('services.items.logoDesign.description', 'Markanızı yansıtan profesyonel logo ve kurumsal kimlik tasarımları'),
      features: ["Logo Tasarımı", "Kurumsal Kimlik", "Brand Guidelines", "Materyal Tasarımı"],
      href: "/tr/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi",
      color: "from-pink-500 to-pink-600",
      badge: null
    },
    {
      icon: Share2,
      title: t('services.items.socialMedia.title', 'Sosyal Medya Yönetimi'),
      description: t('services.items.socialMedia.description', 'Sosyal medya hesaplarınızı profesyonel şekilde yönetin ve takipçi sayınızı artırın'),
      features: ["İçerik Planlama", "Görsel Tasarım", "Etkileşim Yönetimi", "Analiz & Raporlama"],
      href: "/tr/hizmetlerimiz/sosyal-medya-yonetimi",
      color: "from-rose-500 to-rose-600",
      badge: null
    },
    {
      icon: Users,
      title: t('services.items.digitalConsulting.title', 'Dijital Danışmanlık'),
      description: t('services.items.digitalConsulting.description', 'Dijital dönüşüm yolculuğunuzda stratejik rehberlik ve danışmanlık hizmetleri'),
      features: ["Dijital Strateji", "Teknoloji Seçimi", "Süreç Analizi", "Eğitim & Destek"],
      href: "/tr/hizmetlerimiz/dijital-danismanlik",
      color: "from-teal-500 to-teal-600",
      badge: null
    },
  ]
  
  return (
    <section id="services" className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Sparkles className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {t('servicesNew.badge', 'Hizmetlerimiz')}
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
            {t('servicesNew.titlePart1', 'Dijital')}{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {t('servicesNew.titlePart2', 'Hizmetlerimiz')}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-20 max-w-4xl mx-auto leading-relaxed">
            {t('servicesNew.description', 'Markanızı dijital dünyada öne çıkaran kapsamlı çözümler.')}<br/>
            {t('servicesNew.description2', 'Web tasarımından yapay zeka entegrasyonuna, mobil uygulama geliştirmeden SEO optimizasyonuna kadar tüm dijital ihtiyaçlarınız için tek durak noktanızız.')}
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
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative"
            >
              <Link href={service.href}>
                <div className="relative glass rounded-2xl p-6 lg:p-8 shadow-modern border border-white/20 dark:border-white/10 group cursor-pointer block backdrop-blur-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 h-full overflow-hidden flex flex-col"
                     style={{ background: 'rgba(255, 255, 255, 0.08)' }}>
                  
                  {/* Badge */}
                  {service.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-modern">
                        {service.badge}
                      </div>
                    </div>
                  )}

                  {/* Background Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-8 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-modern group-hover:scale-110 transition-all duration-300`}>
                    <service.icon className="h-8 w-8 lg:h-9 lg:w-9 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center flex flex-col flex-grow">
                    <h3 className="text-xl lg:text-2xl font-display font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm lg:text-base line-clamp-3 flex-grow">
                      {service.description}
                    </p>


                    {/* CTA */}
                    <div className="flex items-center justify-center space-x-2 text-cyan-600 dark:text-cyan-400 font-semibold py-3 px-6 rounded-xl group-hover:shadow-modern transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 mt-auto">
                      <span className="text-sm lg:text-base">{t('servicesNew.viewDetails', 'Detayları İncele')}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


