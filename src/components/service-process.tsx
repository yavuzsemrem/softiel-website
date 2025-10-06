"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle, Clock, Users, Code, Rocket, Settings, Workflow } from "lucide-react"

interface ServiceProcessProps {
  data: {
    title: string
    process: Array<{
      step: string
      title: string
      description: string
    }>
  }
  duration?: string
}

export function ServiceProcess({ data, duration = "2 - 4 Hafta" }: ServiceProcessProps) {
  const processIcons = [Users, Code, CheckCircle, Rocket]
  const processColors = [
    "from-blue-500 to-cyan-500",
    "from-cyan-500 to-sky-500", 
    "from-sky-500 to-indigo-500",
    "from-indigo-500 to-purple-500"
  ]

  return (
    <section className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Workflow className="h-5 w-5 text-cyan-500" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Çalışma Süreci
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Nasıl{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Çalışıyoruz
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Projenizi adım adım hayata geçiriyoruz. Her aşamada sizinle iletişim halinde kalarak 
            en iyi sonucu elde etmenizi sağlıyoruz.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {data.process.map((step, index) => {
              const IconComponent = processIcons[index] || CheckCircle
              const stepColor = processColors[index] || "from-cyan-500 to-blue-500"
              
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                   className="relative"
                >
                  <div className="glass rounded-xl p-8 lg:p-10 shadow-modern border border-white/50 dark:border-white/40 text-center backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 h-full"
                       style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-modern z-20">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-r ${stepColor} rounded-xl flex items-center justify-center mx-auto mb-8 shadow-modern`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
                      {step.title}
                    </h3>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm lg:text-base">
                      {step.description}
                    </p>

                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Timeline Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] max-w-4xl mx-auto"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-cyan-500 mb-2">{duration}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Ortalama Süre</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-500 mb-2">7/24</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Destek</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-purple-500 mb-2">%100</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Memnuniyet</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
