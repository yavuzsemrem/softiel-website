"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle, ArrowRight, Code, Palette, Smartphone, Search, Zap, Shield, Database, BarChart3, Target, TrendingUp, MousePointer, DollarSign, Eye, Clock, Settings, Layers, FileText, Share2, Users, Bot, RefreshCw, Wrench, Award, BookOpen } from "lucide-react"

interface ServiceDetailsProps {
  data: {
    title: string
    description: string
    detailDescription?: string
    serviceType?: string
    features: Array<{
      title: string
      description: string
    }>
    additionalServices?: {
      title: string
      services: string[]
    }
    valuePropositions?: Array<{
      title: string
      description: string
      icon: string
    }>
    keyValuesDeprecated?: boolean
  }
}

export function ServiceDetails({ data }: ServiceDetailsProps) {
  // Web geliştirme için kartlar
  const webGelistirmeFeatures = [
    {
      icon: Code,
      title: "Modern Framework",
      description: "Güncel teknolojilerle hızlı ve güvenilir web uygulamaları",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Güvenlik Odaklı",
      description: "Authentication, authorization ve veri koruması odaklı güvenli altyapı",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Tüm cihazlarda mükemmel çalışan responsive arayüz tasarımı",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Performans Optimizasyonu",
      description: "Yüksek hız ve verimlilik için optimize edilmiş kod yapısı",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Database,
      title: "Database Entegrasyonu",
      description: "Tüm veritabanı sistemleriyle tam uyumlu entegrasyon",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Search,
      title: "API First Yaklaşım",
      description: "Mikroservis mimarisi ve REST API ile gelecek odaklı geliştirme",
      color: "from-purple-500 to-violet-500"
    }
  ]

  // Web tasarımı için kartlar
  const webTasarimiFeatures = [
    {
      icon: Palette,
      title: "Modern Tasarım",
      description: "Trend ve estetik açıdan mükemmel web tasarımları",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: CheckCircle,
      title: "Responsive Yapı",
      description: "Tüm cihazlarda mükemmel çalışan uyumlu tasarım",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Hızlı Yükleme",
      description: "Optimize edilmiş kod ve görseller ile hızlı performans",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Search,
      title: "SEO Dostu",
      description: "Arama motorları için optimize edilmiş temiz kod",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Güvenlik",
      description: "Güvenli ve SSL sertifikalı güvenlik önlemleri",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Smartphone,
      title: "Mobil Optimizasyon",
      description: "Mobil cihazlar için özel optimizasyon ve tasarım",
      color: "from-red-500 to-pink-500"
    }
  ]

  // Mobil uygulama için kartlar
  const mobilUygulamaFeatures = [
    {
      icon: Smartphone,
      title: "Cross Platform",
      description: "Tek kod tabanıyla iOS ve Android uygulamaları",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Hızlı Geliştirme",
      description: "Modern cross-platform teknolojiler ile hızlı uygulama geliştirme",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Store Uyumluluğu",
      description: "App Store ve Google Play standartlarına uyumlu uygulamalar",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Code,
      title: "Native Performans",
      description: "Yüksek performanslı mobil uygulama deneyimi",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Database,
      title: "Backend Entegrasyon",
      description: "API tabanlı veritabanı ve pusher servisler",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Search,
      title: "Push Notification",
      description: "Anlık bildirim sistemi ve kullanıcı engagement",
      color: "from-red-500 to-pink-500"
    }
  ]

  // SEO için kartlar
  const seoFeatures = [
    {
      icon: Search,
      title: "Anahtar Kelime Araştırması",
      description: "Hedef kitleye odaklı anahtar kelime analizi ve strateji",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Code,
      title: "Teknik SEO",
      description: "Site hızı, mobil uyum ve indeksleme optimizasyonu",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Target,
      title: "İçerik Optimizasyonu",
      description: "SEO dostu içerik üretimi ve meta optimizasyonu",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "Analytics & Takip",
      description: "Google Analytics ve Search Console entegrasyonu",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Backlink Stratejisi",
      description: "Otorite sağlayan ve organik link profili geliştirme",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: CheckCircle,
      title: "Performans Raporu",
      description: "Aylık detaylı SEO performans raporları",
      color: "from-red-500 to-pink-500"
    }
  ]

  // Google Ads için kartlar
  const googleAdsFeatures = [
    {
      icon: Target,
      title: "Hedefli Reklamcılık",
      description: "Doğru kitleye hassas hedefleme ile ulaşın",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: DollarSign,
      title: "ROI Odaklı Stratejiler",
      description: "Her kurulan kampanyadan yüksek geri dönüş",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MousePointer,
      title: "Gerçek Zamanlı Optimizasyon",
      description: "7/24 kampanya performans takibi ve iyileştirme",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      title: "Multi-Platform Yönetim",
      description: "Google Ads, Meta Ads ve LinkedIn tek elden",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Clock,
      title: "Hızlı Kampanya Kurulumu",
      description: "24 saat içinde aktif kampanyalar",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Detaylı Performans Analizi",
      description: "Aylık raporlarla kampanya sonuçları",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  // WordPress için kartlar
  const wordpressFeatures = [
    {
      icon: Settings,
      title: "Kolay İçerik Yönetimi",
      description: "Sürükle-bırak editör ile kolayca içerik ekleme ve düzenleme",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Layers,
      title: "Zengin Plugin Ekosistemi",
      description: "50.000+ ücretsiz ve ücretli plugin ile sınırsız özelleştirme",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Shield,
      title: "Güncel Güvenlik Önlemleri",
      description: "Wordfence, 2FA ve güvenlik eklentileri ile koruma",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Search,
      title: "SEO Hazır Altyapı",
      description: "Yoast SEO ve RankMath ile arama motoru optimizasyonu",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FileText,
      title: "Multi-Language Destek",
      description: "WPML ve Polylang ile çok dilli site desteği",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Zap,
      title: "Cache & Hız Optimizasyonu",
      description: "LiteSpeed Cache ve CDN entegrasyonu ile yüksek performans",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  // Logo ve kurumsal kimlik için kartlar
  const logoKimlikFeatures = [
    {
      icon: Palette,
      title: "Özgün Logo Tasarımı",
      description: "Markanızı en iyi temsil eden özgün ve etkileyici logo tasarımları",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Target,
      title: "Marka Kimliği",
      description: "Renk paleti, tipografi ve görsel dil ile tutarlı marka kimliği",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: FileText,
      title: "Kurumsal Kimlik Kılavuzu",
      description: "Brandbook ile logo kullanım kuralları ve uygulama rehberi",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Layers,
      title: "Çoklu Format Desteği",
      description: "PNG, SVG, PDF, JPG formatlarında hazır teslim",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: CheckCircle,
      title: "Revizyon Hakkı",
      description: "Müşteri memnuniyeti için kapsamlı revizyon imkanı",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Zap,
      title: "Hızlı Teslimat",
      description: "Profesyonel süreç yönetimi ile hızlı ve kaliteli teslimat",
      color: "from-red-500 to-pink-500"
    }
  ]

  // Sosyal medya yönetimi için kartlar
  const sosyalMedyaFeatures = [
    {
      icon: Share2,
      title: "İçerik Üretimi",
      description: "Yaratıcı ve etkileyici sosyal medya içerikleri üretimi",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Palette,
      title: "Görsel Tasarım",
      description: "Profesyonel sosyal medya görselleri ve tasarım",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Users,
      title: "Topluluk Yönetimi",
      description: "Takipçi etkileşimi ve community management",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: BarChart3,
      title: "Analiz & Raporlama",
      description: "Detaylı performans analizi ve raporlama",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Strateji Geliştirme",
      description: "Hedef kitle odaklı sosyal medya stratejisi",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Hızlı Yayın",
      description: "Düzenli ve zamanında içerik yayınlama",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  // Yapay zeka entegrasyonları için kartlar
  const yapayZekaFeatures = [
    {
      icon: Bot,
      title: "Chatbot Geliştirme",
      description: "Akıllı müşteri hizmetleri ve otomatik yanıt sistemleri",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Makine Öğrenmesi",
      description: "Veri analizi, tahminleme ve öğrenen sistemler",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: FileText,
      title: "Doğal Dil İşleme",
      description: "Metin analizi, anlama ve dil işleme teknolojileri",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Settings,
      title: "İş Süreci Otomasyonu",
      description: "Rutin işleri otomatikleştiren akıllı sistemler",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Eye,
      title: "Görüntü İşleme",
      description: "Görsel analiz, tanıma ve işleme teknolojileri",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Gerçek Zamanlı Analiz",
      description: "Anlık veri işleme ve karar destek sistemleri",
      color: "from-yellow-500 to-orange-500"
    }
  ]


  // Dijital danışmanlık için kartlar
  const danismanlikFeatures = [
    {
      icon: Target,
      title: "Strateji Geliştirme",
      description: "Dijital dönüşüm stratejisi ve yol haritası oluşturma",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Settings,
      title: "Teknoloji Seçimi",
      description: "En uygun teknoloji ve platform önerileri",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: TrendingUp,
      title: "Süreç İyileştirme",
      description: "İş süreçlerini optimize etme ve verimlilik artırma",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Eğitim & Mentorluk",
      description: "Ekip eğitimi ve sürekli rehberlik desteği",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Analiz & Raporlama",
      description: "KPI takibi, performans analizi ve raporlama",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Search,
      title: "Rakip Analizi",
      description: "Pazar analizi ve rekabetçi konumlandırma",
      color: "from-yellow-500 to-orange-500"
    }
  ]



  // Hizmet türüne göre kartları seç
  const detailedFeatures = data.serviceType === 'web-tasarimi' 
    ? webTasarimiFeatures 
    : data.serviceType === 'mobil-uygulama'
    ? mobilUygulamaFeatures
    : data.serviceType === 'seo'
    ? seoFeatures
    : data.serviceType === 'google-ads'
    ? googleAdsFeatures
    : data.serviceType === 'wordpress'
    ? wordpressFeatures
    : data.serviceType === 'logo-kimlik'
    ? logoKimlikFeatures
    : data.serviceType === 'sosyal-medya'
    ? sosyalMedyaFeatures
    : data.serviceType === 'yapay-zeka'
    ? yapayZekaFeatures
    : data.serviceType === 'danismanlik'
    ? danismanlikFeatures
    : webGelistirmeFeatures

  return (
    <section className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <CheckCircle className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Hizmet Detayları
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Neden{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {data.detailDescription || data.description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {detailedFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 group"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-modern group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Services Section */}
        {data.additionalServices && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-8 text-center">
              {data.additionalServices.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.additionalServices.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="glass rounded-xl p-4 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/10 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 fill-current flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm font-medium">
                      {service}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Value Propositions Section */}
        {data.valuePropositions && data.valuePropositions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20"
          >
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
                <Target className="h-5 w-5 text-purple-500 fill-current" />
                <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Değer Önerileri
                </span>
              </motion.div>

              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                Müşteri İçin{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  Öne Çıkan Değerler
                </span>
              </h3>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Hizmetimizle müşterilerinize sunduğunuz temel değerler ve faydalar.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {data.valuePropositions.map((proposition, index) => (
                <motion.div
                  key={proposition.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-modern group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{proposition.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                    {proposition.title}
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {proposition.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  )
}
