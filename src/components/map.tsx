"use client"

import React from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Clock, ExternalLink, Phone, Mail } from "lucide-react"

export function Map() {
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
            <MapPin className="h-5 w-5 text-blue-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Ofis Konumu
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Ofisimizi{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Ziyaret Edin
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            İstanbul'daki merkez ofisimizde sizi ağırlamaktan mutluluk duyarız. 
            Randevu alarak gelmek isterseniz bizimle iletişime geçebilirsiniz.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 flex-[2]"
          >
                         <div className="glass rounded-3xl shadow-modern-lg border border-white/50 dark:border-white/40 overflow-hidden relative h-[400px] lg:h-[500px] backdrop-blur-lg bg-white/40 dark:bg-white/20">
              <div className="w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.1339581064312!2d28.808490299999995!3d41.10976538365639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caafe2fc66e777%3A0x7b042b01c249aa22!2sSoftiel%20Software!5e0!3m2!1str!2str!4v1756989145374!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full block"
                />
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <motion.a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass rounded-full p-3 shadow-modern hover:shadow-modern-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass rounded-full p-3 shadow-modern hover:shadow-modern-lg transition-all duration-200"
                >
                  <Navigation className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
                         className="order-1 lg:order-2 flex-[1] flex flex-col justify-between h-[400px] lg:h-[500px] gap-4"
          >
                         {/* Address */}
             <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 flex-1 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
               <div className="flex items-start space-x-4 h-full">
                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                   <MapPin className="h-6 w-6 text-white" />
                 </div>
                 <div className="flex-1 flex flex-col justify-center">
                   <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                     Adres
                   </h3>
                   <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                     Başak, Şair Zihni Cd.<br />
                     4. Etap 1. Kısım L-33<br />
                     34480 Başakşehir/İstanbul
                   </p>
                 </div>
               </div>
             </div>

                         {/* Working Hours */}
             <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 flex-1 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
               <div className="flex items-start space-x-4 h-full">
                 <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                   <Clock className="h-6 w-6 text-white" />
                 </div>
                 <div className="flex-1 flex flex-col justify-center">
                   <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                     Çalışma Saatleri
                   </h3>
                   <div className="space-y-1 text-base text-neutral-600 dark:text-neutral-400">
                     <p className="font-medium">Pazartesi - Cuma: 09:00 - 18:00</p>
                     <p className="font-medium">Cumartesi: 10:00 - 16:00</p>
                     <p className="font-medium text-red-500 dark:text-red-400">Pazar: Kapalı</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Contact Info */}
             <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 flex-1 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
               <div className="flex items-start space-x-4 h-full">
                 <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                   <Phone className="h-6 w-6 text-white" />
                 </div>
                 <div className="flex-1 flex flex-col justify-center">
                   <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                     Hızlı İletişim
                   </h3>
                   <div className="space-y-2 text-base text-neutral-600 dark:text-neutral-400">
                     <div className="flex items-center space-x-2">
                       <Phone className="h-4 w-4 text-green-500" />
                       <a href="tel:+905411883045" className="font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                         0541 188 30 45
                       </a>
                     </div>
                     <div className="flex items-center space-x-2">
                       <Mail className="h-4 w-4 text-blue-500" />
                       <a href="mailto:info@softiel.com" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                         info@softiel.com
                       </a>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}







