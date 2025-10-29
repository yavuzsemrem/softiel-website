"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Rocket, 
  Zap, 
  Globe, 
  Shield, 
  Users,
  Award,
  Cpu
} from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

const features = [
  { icon: Rocket, color: "from-blue-500 to-blue-600" },
  { icon: Zap, color: "from-yellow-500 to-orange-500" },
  { icon: Globe, color: "from-green-500 to-emerald-500" },
  { icon: Shield, color: "from-purple-500 to-violet-500" },
  { icon: Users, color: "from-cyan-500 to-teal-500" },
  { icon: Award, color: "from-pink-500 to-rose-500" }
]

export function AboutNew() {
  const { t } = useI18n()
  const [isVisible, setIsVisible] = useState(false)
  
  // Get features from translations
  const featuresData = features.map((feature, index) => ({
    ...feature,
    title: t(`aboutNew.features.${index}.title`, ''),
    description: t(`aboutNew.features.${index}.description`, '')
  }))
  
  // Get process steps from translations
  const processSteps = Array.from({ length: 6 }, (_, index) => ({
    step: t(`aboutNew.processSteps.${index}.step`, ''),
    title: t(`aboutNew.processSteps.${index}.title`, ''),
    description: t(`aboutNew.processSteps.${index}.description`, '')
  }))

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Cpu className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {t('aboutNew.badge', 'Teknoloji & İnovasyon')}
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
            {t('aboutNew.titlePart1', 'Geleceği')}{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {t('aboutNew.titlePart2', 'İnşa Ediyoruz')}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-16 max-w-4xl mx-auto leading-relaxed">
            {t('aboutNew.description', 'Cutting-edge teknolojiler ve yaratıcı çözümlerle markanızı dijital dünyada öne çıkarıyoruz. Her proje bir hikaye, her kod satırı bir adım daha yakın geleceğe.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-6">
              {featuresData.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: isVisible ? index * 0.1 : 0, duration: 0.6 }}
                  className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      {feature.icon && <feature.icon className="h-8 w-8 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ delay: isVisible ? 0.4 : 0, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Process Steps */}
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: isVisible ? index * 0.1 : 0, duration: 0.6 }}
                  className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="flex items-center space-x-4">
                    {step.step && (
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <span className="text-xl font-bold text-white">{step.step}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


