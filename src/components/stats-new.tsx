"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Award, 
  Clock, 
  Star,
  TrendingUp
} from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Mutlu Müşteri",
    description: "Başarılı projeler",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Award,
    number: "100+",
    label: "Tamamlanan Proje",
    description: "Farklı sektörlerde",
    color: "from-cyan-500 to-sky-500"
  },
  {
    icon: Clock,
    number: "5+",
    label: "Yıl Deneyim",
    description: "Dijital dünyada",
    color: "from-sky-500 to-indigo-500"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Müşteri Memnuniyeti",
    description: "Ortalama puan",
    color: "from-indigo-500 to-purple-500"
  }
]


export function StatsNew() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <TrendingUp className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Başarılarımız
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Başarılarımız
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Dijital dünyada başarılı projeler geliştirerek müşterilerimizin 
            hedeflerine ulaşmasına yardımcı oluyoruz.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass rounded-xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 text-center backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-modern`}>
                <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>

              {/* Number */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-2"
              >
                {stat.number}
              </motion.div>

              {/* Label */}
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
