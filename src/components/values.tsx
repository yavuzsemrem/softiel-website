"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Target, 
  Users, 
  Lightbulb, 
  Award, 
  Shield, 
  Heart,
  CheckCircle
} from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Hedef Odaklı Yaklaşım",
    description: "Her projede müşterinin hedeflerine ulaşmasını sağlamak için stratejik planlama yaparız.",
    features: [
      "Hedef analizi ve strateji geliştirme",
      "KPI takibi ve raporlama",
      "Sürekli optimizasyon"
    ]
  },
  {
    icon: Users,
    title: "Müşteri Memnuniyeti",
    description: "Müşteri memnuniyeti bizim önceliğimizdir. Her adımda müşterimizi düşünürüz.",
    features: [
      "7/24 müşteri desteği",
      "Düzenli geri bildirim toplama",
      "Kişiselleştirilmiş çözümler"
    ]
  },
  {
    icon: Lightbulb,
    title: "İnovasyon ve Yaratıcılık",
    description: "Sürekli gelişen teknolojileri takip eder, yaratıcı çözümler üretiriz.",
    features: [
      "En son teknolojileri kullanma",
      "Yaratıcı tasarım yaklaşımı",
      "Sürekli öğrenme ve gelişim"
    ]
  },
  {
    icon: Award,
    title: "Kalite ve Mükemmellik",
    description: "En yüksek kalite standartlarında çalışır, mükemmellik arayışımızı sürdürürüz.",
    features: [
      "Detaylı kalite kontrolü",
      "Test ve optimizasyon",
      "Sürekli iyileştirme"
    ]
  },
  {
    icon: Shield,
    title: "Güvenilirlik",
    description: "Projelerimizi zamanında ve kaliteli bir şekilde teslim etmeyi garanti ederiz.",
    features: [
      "Zamanında teslimat",
      "Şeffaf iletişim",
      "Güvenli ve güvenilir çözümler"
    ]
  },
  {
    icon: Heart,
    title: "Tutku ve Bağlılık",
    description: "İşimizi tutkuyla yapar, müşterilerimizin başarısı için çalışırız.",
    features: [
      "İşe tutkuyla yaklaşım",
      "Müşteri başarısına odaklanma",
      "Uzun vadeli ortaklık"
    ]
  }
]

export function Values() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Değerlerimiz
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Softiel olarak çalışma prensiplerimizi ve değerlerimizi keşfedin. 
            Bu değerler, her projede bize rehberlik eder.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 h-full">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {value.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  {value.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {value.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Bu Değerlerle Çalışmak İster misiniz?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Değerlerimizi paylaşıyor ve birlikte çalışmak istiyorsanız, 
              hemen iletişime geçin ve projenizi hayata geçirelim.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Hemen İletişime Geçin
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

