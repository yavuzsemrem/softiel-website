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
  Zap,
  CheckCircle
} from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Hedef Odaklılık",
    description: "Her projede müşterinin hedeflerine ulaşmasını sağlıyoruz. Stratejik yaklaşımımızla sonuç odaklı çözümler üretiyoruz.",
    features: ["Stratejik Planlama", "Hedef Belirleme", "Sonuç Odaklılık"]
  },
  {
    icon: Users,
    title: "Müşteri Memnuniyeti",
    description: "Müşteri memnuniyeti bizim önceliğimizdir. Her adımda müşteri deneyimini en üst seviyede tutuyoruz.",
    features: ["7/24 Destek", "Kişisel Yaklaşım", "Hızlı Çözüm"]
  },
  {
    icon: Lightbulb,
    title: "İnovasyon",
    description: "Sürekli gelişen teknolojileri takip ediyor, yaratıcı çözümlerle müşterilerimize avantaj sağlıyoruz.",
    features: ["Yeni Teknolojiler", "Yaratıcı Çözümler", "Sürekli Gelişim"]
  },
  {
    icon: Award,
    title: "Kalite",
    description: "En yüksek kalite standartlarında çalışıyor, her projede mükemmellik arayışımızı sürdürüyoruz.",
    features: ["Yüksek Standartlar", "Detay Odaklılık", "Mükemmellik"]
  },
  {
    icon: Shield,
    title: "Güvenilirlik",
    description: "Güvenilir partner olarak, projelerinizi zamanında ve kaliteli bir şekilde teslim etmeyi garanti ediyoruz.",
    features: ["Zamanında Teslimat", "Güvenli İşlem", "Şeffaflık"]
  },
  {
    icon: Heart,
    title: "Tutku",
    description: "İşimize olan tutkumuz, müşterilerimizin başarısına olan bağlılığımızla birleşiyor.",
    features: ["İşe Tutku", "Müşteri Bağlılığı", "Sürekli Öğrenme"]
  }
]

export function AboutValues() {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Değerlerimiz ve{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Yaklaşımımız
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Softiel olarak, müşterilerimize en iyi hizmeti sunmak için belirlediğimiz değerler 
            ve yaklaşımımızla fark yaratıyoruz.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                >
                  <value.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {value.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {value.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Zap className="h-10 w-10 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Bu Değerlerle Birlikte Çalışalım
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Değerlerimizi paylaşıyor ve aynı vizyona sahip müşterilerimizle 
              uzun vadeli iş birlikleri kuruyoruz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Projenizi Başlatın
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Hakkımızda Daha Fazla
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
