"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, Award, Users, Target, Rocket, Star } from "lucide-react"

const timelineEvents = [
  {
    year: "2019",
    title: "Softiel Kuruluşu",
    description: "Dijital dünyada fark yaratmak amacıyla Softiel kuruldu.",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500"
  },
  {
    year: "2020",
    title: "İlk Büyük Projeler",
    description: "50+ başarılı proje ile sektörde tanınmaya başladık.",
    icon: Target,
    color: "from-green-500 to-emerald-500"
  },
  {
    year: "2021",
    title: "Ekip Genişlemesi",
    description: "Uzman ekibimizi genişlettik ve hizmet yelpazemizi artırdık.",
    icon: Users,
    color: "from-purple-500 to-indigo-500"
  },
  {
    year: "2022",
    title: "Ödül Kazanımı",
    description: "En İyi Web Ajansı ödülünü kazandık.",
    icon: Award,
    color: "from-yellow-500 to-orange-500"
  },
  {
    year: "2023",
    title: "Yapay Zeka Entegrasyonu",
    description: "AI teknolojilerini hizmetlerimize entegre ettik.",
    icon: Star,
    color: "from-pink-500 to-rose-500"
  },
  {
    year: "2024",
    title: "500+ Proje",
    description: "500+ başarılı proje ile sektörde lider konuma geldik.",
    icon: Calendar,
    color: "from-teal-500 to-cyan-500"
  }
]

export function Timeline() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
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
            Yolculuğumuz
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Softiel'in kuruluşundan bugüne kadar olan yolculuğunu keşfedin.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${event.color} rounded-full mb-4 ${
                      index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                    }`}>
                      <event.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                        {event.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-neutral-800 border-4 border-primary-500 rounded-full shadow-lg z-10"></div>

                {/* Spacer for alternating layout */}
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              5+
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Yıl Deneyim
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              500+
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Başarılı Proje
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              200+
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Mutlu Müşteri
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              50+
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Ödül
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

