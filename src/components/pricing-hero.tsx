"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react"

export function PricingHero() {
  return (
    <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-6"
          >
            <Sparkles className="h-5 w-5 text-cyan-400 fill-current" />
            <span className="text-sm font-semibold text-white/90">
              Fiyatlandırma
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Şeffaf ve{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Uygun Fiyatlandırma
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Projenizin büyüklüğüne ve ihtiyaçlarınıza uygun esnek fiyatlandırma seçenekleri.
          </p>
          
          {/* CTA Button */}
          <motion.a
            href="#pricing-plans"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <span>Planları İncele</span>
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>

        {/* Quick Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Şeffaf Fiyatlandırma",
              description: "Gizli maliyet yok, tüm fiyatlar net"
            },
            {
              icon: CheckCircle,
              title: "Kalite Garantisi",
              description: "100% memnuniyet garantisi"
            },
            {
              icon: ArrowRight,
              title: "Hızlı Teslimat",
              description: "7-30 gün içinde teslimat"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-6 shadow-modern border border-white/20 text-center backdrop-blur-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white/70 text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}