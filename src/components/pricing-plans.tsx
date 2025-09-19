"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle, Star, ArrowRight, Zap, Shield, Clock } from "lucide-react"

const plans = [
  {
    name: "Başlangıç",
    price: "₺5.000",
    period: "proje",
    description: "Küçük işletmeler için temel web çözümleri",
    features: [
      "Responsive Web Tasarım",
      "5 Sayfa",
      "SEO Temel Optimizasyon",
      "1 Yıl Hosting",
      "E-posta Desteği"
    ],
    popular: false,
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    deliveryTime: "7-14 gün"
  },
  {
    name: "Profesyonel",
    price: "₺15.000",
    period: "proje",
    description: "Büyüyen işletmeler için kapsamlı çözümler",
    features: [
      "Özel Web Tasarım",
      "15 Sayfa",
      "Gelişmiş SEO",
      "E-ticaret Entegrasyonu",
      "Sosyal Medya Entegrasyonu",
      "2 Yıl Hosting",
      "Telefon Desteği"
    ],
    popular: true,
    icon: Star,
    color: "from-cyan-500 to-blue-500",
    deliveryTime: "14-21 gün"
  },
  {
    name: "Kurumsal",
    price: "₺35.000",
    period: "proje",
    description: "Büyük şirketler için enterprise çözümler",
    features: [
      "Özel Web Uygulaması",
      "Sınırsız Sayfa",
      "Gelişmiş SEO & Analytics",
      "API Entegrasyonu",
      "Yapay Zeka Entegrasyonu",
      "3 Yıl Hosting",
      "7/24 Destek"
    ],
    popular: false,
    icon: Shield,
    color: "from-purple-500 to-pink-500",
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Fiyat{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Planları
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Size uygun planı seçin ve projenizi hayata geçirin.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.1 }}
              className={`relative glass rounded-3xl p-8 shadow-modern-lg border transition-all duration-75 ${
                plan.popular 
                  ? 'border-cyan-500/50 scale-105' 
                  : 'border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-modern">
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
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {plan.price}
                </div>
                <div className="text-white/70 mb-2">
                  {plan.period}
                </div>
                <p className="text-white/80 text-sm mb-3">
                  {plan.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-white/60">
                  <Clock className="h-4 w-4" />
                  <span>Teslimat: {plan.deliveryTime}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/90 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.a
                href="/iletisim"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-2xl hover:shadow-cyan-500/25'
                    : 'glass text-white/90 hover:text-white border border-white/20 hover:bg-white/10'
                }`}
              >
                <span>Planı Seç</span>
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}