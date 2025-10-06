"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle, Star, ArrowRight, Zap, Shield } from "lucide-react"

interface ServicePricingProps {
  data: {
    title: string
    pricing: Array<{
      name: string
      price: string
      period: string
      features: string[]
      popular: boolean
      icon?: string
      color?: string
    }>
    addOnServices?: Array<{
      name: string
      description: string
      price: string
    }>
  }
  showDomainNotice?: boolean
  showAddOnServices?: boolean
  serviceType?: string
}

export function ServicePricing({ data, showDomainNotice = false, showAddOnServices = false, serviceType = "web-tasarimi" }: ServicePricingProps) {
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

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
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
              className={`relative glass rounded-2xl p-6 lg:p-8 shadow-modern border backdrop-blur-lg transition-all duration-300 hover:scale-105 flex flex-col ${
                plan.popular 
                  ? 'border-cyan-500/50 dark:border-cyan-400/50 ring-2 ring-cyan-500/20' 
                  : 'border-white/50 dark:border-white/40'
              }`}
              style={{ background: plan.popular ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-modern">
                    <Star className="h-4 w-4 fill-current" />
                    <span>En Popüler</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                {plan.icon && (
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color || 'from-blue-500 to-cyan-500'} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    {plan.icon === 'Zap' && <Zap className="h-8 w-8 text-white" />}
                    {plan.icon === 'Star' && <Star className="h-8 w-8 text-white" />}
                    {plan.icon === 'Shield' && <Shield className="h-8 w-8 text-white" />}
                  </div>
                )}
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
              <div className="space-y-3 mb-4 flex-grow">
                {plan.features.map((feature, featureIndex) => {
                  // Skip domain/hosting text as it will be handled separately
                  const isDomainText = feature.includes("Domain + SSL + hosting ücretleri pakete dahil değildir")
                  
                  if (isDomainText) {
                    return null // Skip this feature as it will be rendered separately
                  }
                  
                  return (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm lg:text-base">
                        {feature}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Domain/Hosting Notice */}
              {showDomainNotice && (
                <div className="mt-auto mb-4 pt-3 border-t border-neutral-200/20 dark:border-neutral-700/20">
                  <span className="text-xs text-neutral-500 dark:text-neutral-500 italic text-center block">
                    Domain + SSL + hosting ücretleri pakete dahil değildir
                  </span>
                </div>
              )}

              {/* CTA Button */}
              <motion.a
                href={`https://wa.me/905411883045?text=${encodeURIComponent(`Merhaba! ${data.title} hizmeti ${plan.name} paketi hakkında bilgi almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 mt-auto ${
                  plan.popular
                    ? 'text-white shadow-modern hover:shadow-modern-lg'
                    : 'glass text-neutral-700 dark:text-neutral-300 hover:bg-white/20 dark:hover:bg-gray-800 border border-white/20'
                }`}
                style={plan.popular 
                  ? { background: 'linear-gradient(to right, #06b6d4, #3b82f6, #2563eb)' }
                  : { background: 'rgba(255, 255, 255, 0.1)' }
                }
              >
                <span>Teklif Al</span>
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Add-on Services */}
        {showAddOnServices && data.addOnServices && data.addOnServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
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
                <Zap className="h-5 w-5 text-green-500 fill-current" />
                <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Ek Hizmetler
                </span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
                Ek{" "}
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Hizmetler
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                Paketlerinize ekleyebileceğiniz ek hizmetler ile projenizi daha da geliştirin. 
                Özel ihtiyaçlarınız için esnek çözümler sunuyoruz.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
              {data.addOnServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg hover:scale-105 transition-all duration-300 group flex flex-col"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', height: '240px' }}
                >
                  {/* Service Icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-modern">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Service Content */}
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {service.name}
                    </h4>
                    <span className="text-xl font-bold text-green-500">
                      {service.price}
                    </span>
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow mb-4">
                    {service.description}
                  </p>
                  
                  {/* CTA Button */}
                  <motion.a
                    href={`https://wa.me/905411883045?text=${encodeURIComponent(`Merhaba! ${data.title} hizmeti ${service.name} ek hizmeti hakkında bilgi almak istiyorum.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 glass text-neutral-700 dark:text-neutral-300 hover:bg-white/20 dark:hover:bg-gray-800 border border-white/20 mt-auto"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <span>Detay Al</span>
                    <ArrowRight className="h-3 w-3" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  )
}
