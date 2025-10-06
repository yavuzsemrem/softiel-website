"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle, Star, ArrowRight, Zap, Shield, Clock } from "lucide-react"

const plans = [
  {
    name: "Basic – Dijital Başlangıç Paketi",
    price: "₺30.000",
    period: "proje",
    description: "Yeni kurulan işletmeler veya online vitrine ihtiyaç duyan küçük markalar için. Bu pakette temel dijital görünürlük sağlanır.",
    features: [
      "Web Sitesi Tasarımı (Basic seviye: 5–7 sayfa)",
      "Logo & Kurumsal Kimlik (logo + renk paleti + kartvizit)",
      "SEO Temel Ayarları (meta, sitemap, indeksleme)",
      "Google My Business kurulumu",
      "1 ay sosyal medya başlangıç desteği (profil düzenleme, 4 paylaşım)"
    ],
    popular: false,
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    deliveryTime: "7-14 gün"
  },
  {
    name: "Pro – Dijital Büyüme Paketi",
    price: "₺60.000",
    period: "proje",
    description: "Halihazırda dijitalde var olan ama trafik, görünürlük ve etkileşim isteyen markalar için.",
    features: [
      "Web Sitesi Tasarımı (Pro seviye: özel ana sayfa + blog)",
      "SEO Optimizasyonu (aylık çalışma, içerik planı)",
      "Google Ads Yönetimi (aylık 1 kampanya yönetimi)",
      "Sosyal Medya Yönetimi (2 platform, 8 paylaşım/ay)",
      "Bakım ve Güncelleme",
      "Aylık performans raporu"
    ],
    popular: true,
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    deliveryTime: "14-21 gün"
  },
  {
    name: "Enterprise – Dijital Dönüşüm Paketi",
    price: "₺90.000",
    period: "proje",
    description: "Kurumsal işletmeler ve global pazara açılmak isteyen firmalar için. Amaç: dijital sistemleşme, otomasyon ve entegrasyon.",
    features: [
      "Web Uygulaması Geliştirme (özelleştirilmiş iş akışı / portal)",
      "Web Sitesi Tasarımı (Enterprise seviye, CMS + çok dil)",
      "SEO + Google Ads tam yönetim (süreklilik)",
      "Sosyal Medya Yönetimi (4 platform, profesyonel içerik + reklam)",
      "Yapay Zeka Entegrasyonu (chatbot veya raporlama AI)",
      "Dijital Danışmanlık (aylık strateji + rapor)",
      "3 ay bakım & SLA desteği"
    ],
    popular: false,
    icon: Shield,
    color: "from-blue-500 to-indigo-500",
    deliveryTime: "21-30 gün"
  }
]

export function PricingPlans() {
  return (
    <section id="pricing-plans" className="relative py-16 lg:py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6">
            Fiyat{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Planları
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Size uygun planı seçin ve projenizi hayata geçirin.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative glass rounded-2xl p-6 lg:p-8 shadow-modern border backdrop-blur-lg transition-all duration-300 hover:scale-105 flex flex-col ${
                plan.popular 
                  ? 'border-cyan-500/50 dark:border-cyan-400/50 ring-2 ring-cyan-500/20' 
                  : 'border-white/50 dark:border-white/40'
              }`}
              style={{ background: plan.popular ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-modern">
                    <Star className="h-4 w-4 fill-current" />
                    <span>En Popüler</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400 ml-2">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
                  {plan.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500 dark:text-neutral-500 mt-2">
                  <Clock className="h-4 w-4" />
                  <span>Teslimat: {plan.deliveryTime}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-4 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm lg:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Domain/Hosting Notice */}
              <div className="mt-auto mb-4 pt-3 border-t border-neutral-200/20 dark:border-neutral-700/20">
                <span className="text-xs text-neutral-500 dark:text-neutral-500 italic text-center block">
                  Domain + SSL + hosting ücretleri pakete dahil değildir
                </span>
              </div>

              {/* CTA Button */}
              <motion.a
                href={`https://wa.me/905411823045?text=Merhaba! ${plan.name} paketi hakkında bilgi almak istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-auto ${
                  plan.popular
                    ? 'text-white shadow-modern hover:shadow-modern-lg'
                    : 'glass text-neutral-700 dark:text-neutral-300 hover:bg-white/20 dark:hover:bg-gray-800 border border-white/20'
                }`}
                style={plan.popular 
                  ? { background: 'linear-gradient(to right, #06b6d4, #3b82f6, #2563eb)' }
                  : { background: 'rgba(255, 255, 255, 0.1)' }
                }
              >
                <span>Teklif Al</span>
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}