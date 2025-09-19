"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  Lightbulb, 
  Code, 
  Rocket, 
  CheckCircle,
  ArrowRight
} from "lucide-react"

const processSteps = [
  {
    step: "01",
    title: "Keşif ve Analiz",
    description: "Projenizi detaylı bir şekilde analiz eder, hedeflerinizi ve ihtiyaçlarınızı belirleriz.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    features: [
      "Hedef kitle analizi",
      "Rekabet analizi",
      "Teknik gereksinimler",
      "Proje kapsamı belirleme"
    ]
  },
  {
    step: "02",
    title: "Strateji ve Tasarım",
    description: "Projeniz için en uygun stratejiyi geliştirir ve yaratıcı tasarım çözümleri üretiriz.",
    icon: Lightbulb,
    color: "from-purple-500 to-pink-500",
    features: [
      "Konsept geliştirme",
      "Wireframe oluşturma",
      "UI/UX tasarım",
      "Prototip hazırlama"
    ]
  },
  {
    step: "03",
    title: "Geliştirme ve Test",
    description: "Modern teknolojiler kullanarak projenizi geliştirir ve kapsamlı testler yaparız.",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    features: [
      "Frontend geliştirme",
      "Backend geliştirme",
      "Veritabanı tasarımı",
      "Test ve optimizasyon"
    ]
  },
  {
    step: "04",
    title: "Lansman ve Destek",
    description: "Projenizi başarıyla lansman eder ve sürekli destek sağlarız.",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    features: [
      "Canlıya alma",
      "SEO optimizasyonu",
      "Performans izleme",
      "7/24 teknik destek"
    ]
  }
]

export function Process() {
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
            Çalışma Sürecimiz
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Her projede tutarlı kalite ve başarı sağlamak için 4 aşamalı 
            kanıtlanmış sürecimizi takip ediyoruz.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200 dark:from-primary-800 dark:via-secondary-800 dark:to-accent-800 rounded-full transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 h-full">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                      {step.step}
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow for mobile */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6">
                    <ArrowRight className="h-6 w-6 text-neutral-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
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
              Projenizi Bu Süreçle Hayata Geçirelim
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Kanıtlanmış sürecimizle projenizi başarıyla tamamlayalım. 
              Ücretsiz danışmanlık için hemen iletişime geçin.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Proje Başlatın
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

