"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  Play, 
  Star, 
  CheckCircle, 
  Sparkles,
  Rocket,
  Shield,
  Globe,
  Code,
  Palette,
  Search,
  Zap,
  Award,
  Target,
  Lightbulb
} from "lucide-react"

export function HeroNew() {
  const patternBg = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
  
  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `url('${patternBg}')` }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-16"
          >
            <div className="relative inline-block">
              <div className="w-40 h-40 mx-auto mb-8 relative">
                <div className="relative w-full h-full glass rounded-full flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-2xl"
                     style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                  <Image
                    src="/transparent.webp"
                    alt="Softiel Logo"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                    priority
                  />
                </div>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotate: 360,
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ 
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: `${60 + i * 10}px 0px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center space-x-3 glass rounded-full px-8 py-4 shadow-modern-lg border border-white/30 backdrop-blur-lg"
                style={{ background: 'rgba(255, 255, 255, 0.15)' }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="h-6 w-6 text-cyan-400 fill-current" />
                </motion.div>
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Türkiye'nin En İyi Web Ajansı
                </span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Award className="h-6 w-6 text-yellow-400" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-neutral-900 dark:text-white mb-8 leading-[0.9] tracking-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="block"
            >
              Dijital Dünyada
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="block bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Fark Yaratın
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-neutral-600 dark:text-neutral-300 mb-16 max-w-5xl mx-auto leading-relaxed font-light"
          >
            <motion.span
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Modern web tasarımı
            </motion.span>
            , gelişmiş web geliştirme ve 
            <br />
            <motion.span
              animate={{ 
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%']
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              etkili dijital pazarlama
            </motion.span>
            çözümleriyle markanızı öne çıkarın.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {[
              { text: "Modern Tasarım", icon: Palette, color: "from-pink-500 to-rose-500" },
              { text: "Hızlı Geliştirme", icon: Zap, color: "from-yellow-500 to-orange-500" },
              { text: "SEO Optimizasyonu", icon: Search, color: "from-green-500 to-emerald-500" },
              { text: "7/24 Destek", icon: Shield, color: "from-blue-500 to-cyan-500" }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="glass rounded-full px-8 py-4 shadow-modern-lg border border-white/30 backdrop-blur-lg"
                     style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                    >
                      <feature.icon className="h-4 w-4 text-white" />
                    </motion.div>
                    <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
                      {feature.text}
                    </span>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${feature.color} blur-xl opacity-30 -z-10`}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
          >
            <Link href="/tr/iletisim">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden text-white px-12 py-6 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500"
                style={{ 
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
                  backgroundSize: '200% 200%'
                }}
              >
                <motion.div
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative flex items-center space-x-4">
                  <span>Projenizi Başlatın</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="h-7 w-7" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group glass px-12 py-6 rounded-3xl font-bold text-2xl text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 border border-white/30 backdrop-blur-lg shadow-2xl"
              style={{ background: 'rgba(255, 255, 255, 0.15)' }}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Play className="h-7 w-7" />
                </motion.div>
                <span>Demo İzleyin</span>
              </div>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 1.2 }}
            className="glass rounded-3xl shadow-2xl p-12 lg:p-16 max-w-6xl mx-auto border border-white/30 backdrop-blur-lg"
            style={{ background: 'rgba(255, 255, 255, 0.15)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {[
                { number: "500+", label: "Başarılı Proje", icon: Rocket, color: "from-cyan-500 to-blue-500" },
                { number: "98%", label: "Müşteri Memnuniyeti", icon: Star, color: "from-yellow-500 to-orange-500" },
                { number: "24/7", label: "Teknik Destek", icon: Shield, color: "from-green-500 to-emerald-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 2.2 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                  >
                    <stat.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.4 + index * 0.2, duration: 0.6, ease: "easeOut" }}
                    className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-3"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xl text-neutral-600 dark:text-neutral-300 font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none">
            {[
              { icon: Globe, position: "top-20 left-10", delay: 0, color: "cyan" },
              { icon: Code, position: "top-32 right-20", delay: 0.5, color: "blue" },
              { icon: Palette, position: "bottom-40 left-20", delay: 1, color: "purple" },
              { icon: Search, position: "bottom-20 right-10", delay: 1.5, color: "pink" },
              { icon: Target, position: "top-1/2 left-5", delay: 2, color: "green" },
              { icon: Lightbulb, position: "top-1/2 right-5", delay: 2.5, color: "yellow" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 2.5 + item.delay, duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                className={`absolute ${item.position} w-16 h-16 glass rounded-2xl flex items-center justify-center shadow-2xl border border-white/30 backdrop-blur-lg`}
                style={{ background: 'rgba(255, 255, 255, 0.15)' }}
              >
                <item.icon className={`h-8 w-8 text-${item.color}-400`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
















