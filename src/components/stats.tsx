"use client"

import React from "react"
import { motion } from "framer-motion"
import { Users, Award, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Mutlu Müşteri",
    description: "Başarıyla tamamlanan proje"
  },
  {
    icon: Award,
    value: "50+",
    label: "Ödül",
    description: "Ulusal ve uluslararası"
  },
  {
    icon: Clock,
    value: "5+",
    label: "Yıl Deneyim",
    description: "Dijital dünyada"
  },
  {
    icon: TrendingUp,
    value: "99%",
    label: "Memnuniyet",
    description: "Müşteri memnuniyeti"
  }
]

export function Stats() {
  return (
    <section className="py-16 lg:py-24 gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 group-hover:bg-white/30 transition-colors duration-300">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white/90 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-white/70">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

