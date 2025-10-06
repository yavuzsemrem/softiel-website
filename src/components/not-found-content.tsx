"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Globe,
  Code,
  Smartphone,
  Search,
  Palette
} from "lucide-react"

export function NotFoundContent() {
  const popularPages = [
    {
      title: "Ana Sayfa",
      description: "Softiel'in ana sayfasına dönün",
      icon: Home,
      href: "/",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Hakkımızda",
      description: "Ekibimizi ve değerlerimizi keşfedin",
      icon: User,
      href: "/hakkimizda",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Hizmetlerimiz",
      description: "Sunduğumuz dijital hizmetleri inceleyin",
      icon: Briefcase,
      href: "/hizmetlerimiz",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "İletişim",
      description: "Bizimle iletişime geçin",
      icon: Mail,
      href: "/iletisim",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Fiyatlandırma",
      description: "Hizmet fiyatlarımızı görün",
      icon: Phone,
      href: "/fiyatlandirma",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Blog",
      description: "Dijital dünyadan haberler ve ipuçları",
      icon: Globe,
      href: "/blog",
      color: "from-pink-500 to-pink-600"
    }
  ]

  const services = [
    {
      title: "Web Tasarım",
      description: "Modern ve responsive web siteleri",
      icon: Palette,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Web Geliştirme",
      description: "Özel web uygulamaları",
      icon: Code,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Mobil Uygulama",
      description: "iOS ve Android uygulamaları",
      icon: Smartphone,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "SEO Optimizasyonu",
      description: "Arama motoru optimizasyonu",
      icon: Search,
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section className="relative py-8 lg:py-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Popular Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
                         <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 0.6 }}
               viewport={{ once: true }}
               className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}
             >
               <Globe className="h-5 w-5 text-cyan-500 fill-current" />
               <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                 Popüler Sayfalar
               </span>
             </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              Belki{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Bunları Arıyorsunuz
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              En çok ziyaret edilen sayfalarımıza göz atın ve aradığınızı bulun.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPages.map((page, index) => (
                             <motion.a
                 key={page.title}
                 href={page.href}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1, duration: 0.6 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-75 group"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}
               >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${page.color} rounded-xl flex items-center justify-center shadow-modern flex-shrink-0`}>
                    <page.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
                      {page.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                      {page.description}
                    </p>
                                         <div className="flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                       <span>Sayfaya Git</span>
                       <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-75" />
                     </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
                         <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 0.6 }}
               viewport={{ once: true }}
               className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}
             >
               <Briefcase className="h-5 w-5 text-purple-500 fill-current" />
               <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                 Hizmetlerimiz
               </span>
             </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              Sunduğumuz{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Dijital Hizmetler
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Dijital dünyada fark yaratacak projeleriniz için profesyonel hizmetlerimizi keşfedin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
                             <motion.div
                 key={service.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1, duration: 0.6 }}
                 viewport={{ once: true }}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-75 text-center group"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}
               >
                                 <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-modern group-hover:scale-110 transition-transform duration-75`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-3xl p-8 lg:p-12 shadow-modern-lg border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-modern">
                <Mail className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
                Yardıma mı İhtiyacınız Var?
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                Aradığınızı bulamadınız mı? Uzman ekibimiz size yardımcı olmaktan mutluluk duyar. 
                İletişime geçin ve size en uygun çözümü bulalım.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="/tr/iletisim"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-75"
                >
                  <Mail className="h-5 w-5" />
                  <span>İletişime Geç</span>
                </motion.a>
                
                                 <motion.a
                   href="tel:+905411883045"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   transition={{ duration: 0.15 }}
                   className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-75 border border-white/20"
                   style={{ background: 'rgba(148, 148, 148, 0.1)' }}
                 >
                  <Phone className="h-5 w-5" />
                  <span>Hemen Ara</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
