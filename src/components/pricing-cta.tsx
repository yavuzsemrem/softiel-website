"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, MessageCircle, Phone } from "lucide-react"

export function PricingCTA() {
  return (
    <section className="relative py-32 lg:py-20">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 lg:p-12 shadow-modern-lg border border-white/20 backdrop-blur-lg text-center relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Projenizi{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Hayata Geçirin
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Dijital dünyada fark yaratacak projeniz için bugün başlayın. 
              Uzman ekibimizle birlikte hayalinizdeki projeyi gerçeğe dönüştürün.
            </p>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: CheckCircle, text: "100% Memnuniyet Garantisi", color: "text-green-400" },
                { icon: Phone, text: "Hızlı Teslimat", color: "text-blue-400" },
                { icon: ArrowRight, text: "7/24 Destek", color: "text-purple-400" }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 glass rounded-xl p-4 shadow-modern border border-white/20"
                >
                  <benefit.icon className={`h-6 w-6 ${benefit.color} flex-shrink-0`} />
                  <span className="text-white/90 font-medium text-sm">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/tr/iletisim"
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.1 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-75"
              >
                <span>Ücretsiz Teklif Al</span>
                <ArrowRight className="h-5 w-5" />
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.1 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-75 cursor-pointer"
                onClick={() => {
                  window.open('https://wa.me/905411883045', '_blank');
                }}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Hemen İletişime Geç</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}