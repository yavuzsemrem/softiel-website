"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, Users, Award, Lightbulb, TrendingUp, Clock, Star, Globe } from "lucide-react"

const stats = [
  {
    icon: Target,
    value: "500+",
    label: "Başarılı Proje",
    description: "Tamamlanan projeler"
  },
  {
    icon: Users,
    value: "200+",
    label: "Mutlu Müşteri",
    description: "Memnun müşteriler"
  },
  {
    icon: Award,
    value: "50+",
    label: "Ödül",
    description: "Kazanılan ödüller"
  },
  {
    icon: Lightbulb,
    value: "5+",
    label: "Yıl Deneyim",
    description: "Sektör deneyimi"
  },
  {
    icon: TrendingUp,
    value: "99%",
    label: "Memnuniyet",
    description: "Müşteri memnuniyeti"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Destek",
    description: "Kesintisiz destek"
  },
  {
    icon: Star,
    value: "4.9",
    label: "Puan",
    description: "Ortalama değerlendirme"
  },
  {
    icon: Globe,
    value: "15+",
    label: "Ülke",
    description: "Hizmet verilen ülkeler"
  }
]

export function AboutStats() {
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
            Rakamlarla{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Softiel
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Yılların deneyimi ve başarısıyla müşterilerimize en kaliteli hizmeti sunuyoruz
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </motion.div>

                {/* Value */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-2xl lg:text-3xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-sm font-semibold text-white mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs text-gray-300">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Bu Başarıların Bir Parçası Olun
            </h3>
            <p className="text-gray-300 mb-6">
              Dijital dönüşüm yolculuğunuzda güvenilir partneriniz olmaya hazırız. 
              Projelerinizi birlikte hayata geçirelim.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Projenizi Başlatın
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
