"use client"

import React from "react"
import { motion } from "framer-motion"
import { Mail, Send } from "lucide-react"

export function Newsletter() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Bültenimize Abone Olun
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Dijital dünyadaki son gelişmeler, ipuçları ve özel tekliflerden 
            haberdar olmak için bültenimize abone olun.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Send className="h-5 w-5" />
              <span>Abone Ol</span>
            </motion.button>
          </div>

          <p className="text-sm text-white/70 mt-4">
            Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

