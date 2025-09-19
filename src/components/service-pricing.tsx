"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle, Star, ArrowRight, Zap } from "lucide-react"

interface ServicePricingProps {
  data: {
    title: string
    pricing: Array<{
      name: string
      price: string
      period: string
      features: string[]
      popular: boolean
    }>
  }
}

export function ServicePricing({ data }: ServicePricingProps) {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Zap className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Fiyatlandırma
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Uygun{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Fiyatlar
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Her bütçeye uygun paketlerimizle projenizi hayata geçirin. 
            Özel ihtiyaçlarınız için özel fiyatlandırma yapıyoruz.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative glass rounded-2xl p-6 lg:p-8 shadow-modern border backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-cyan-500/50 dark:border-cyan-400/50 ring-2 ring-cyan-500/20' 
                  : 'border-white/50 dark:border-white/40'
              }`}
              style={{ background: plan.popular ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-modern">
                    <Star className="h-4 w-4 fill-current" />
                    <span>En Popüler</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400 ml-2">
                    /{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm lg:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'text-white shadow-modern hover:shadow-modern-lg'
                    : 'glass text-neutral-700 dark:text-neutral-300 hover:bg-white/20 dark:hover:bg-gray-800 border border-white/20'
                }`}
                style={plan.popular 
                  ? { background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }
                  : { background: 'rgba(255, 255, 255, 0.1)' }
                }
              >
                <span>Teklif Al</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Custom Pricing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 lg:p-12 shadow-modern-lg border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] max-w-4xl mx-auto"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Özel Proje mi İstiyorsunuz?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Standart paketlerimiz dışında özel ihtiyaçlarınız için 
              size özel fiyatlandırma yapıyoruz.
            </p>
            <motion.a
              href="#contact-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <span>Özel Teklif Al</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
