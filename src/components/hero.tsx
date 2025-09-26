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
  Lightbulb,
  MessageCircle,
  Phone
} from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Hero Image Background with Cinematic Effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero1.png"
            alt="Softiel Hero"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          
          {/* Cinematic Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
          
          {/* Film Grain Effect */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay animate-pulse bg-noise"></div>
        </div>

        {/* Cinematic Light Beams */}
        <motion.div
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-b from-cyan-500/30 via-transparent to-transparent transform -skew-x-12 blur-sm"
        />
        
        <motion.div
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-0 right-1/3 w-80 h-full bg-gradient-to-b from-blue-500/20 via-transparent to-transparent transform skew-x-6 blur-sm"
        />

        {/* Floating Cinematic Particles */}
        {[...Array(25)].map((_, i) => (
        <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0
            }}
          animate={{ 
              y: [null, -300],
              x: [null, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
          }}
          transition={{ 
              duration: Math.random() * 5 + 4,
            repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut"
            }}
            className="absolute w-1 h-8 bg-gradient-to-t from-cyan-400/60 to-transparent rounded-full shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
            }}
          />
        ))}

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"></div>
        
        {/* Animated Spotlight Effect */}
        <motion.div
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 lg:pb-24 w-full">
        <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16">

          {/* Main Hero Title with Enhanced Cinematic Effects */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.8, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="space-y-4"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-white leading-[0.9] tracking-tight"
              style={{
                textShadow: '0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(6, 182, 212, 0.4), 0 0 120px rgba(6, 182, 212, 0.2)'
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="block"
              >
                Dijital Dünyada
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.7, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 1,
                  ease: "easeOut"
                }}
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.8))',
                  textShadow: '0 0 50px rgba(59, 130, 246, 0.5)'
                }}
              >
                Fark Yaratın
              </motion.span>
            </motion.h1>
            
            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1.8 }}
              className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto max-w-md rounded-full"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
              }}
            />
          </motion.div>

          {/* Enhanced Cinematic Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              delay: 2.2,
              ease: "easeOut"
            }}
            className="max-w-5xl mx-auto px-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light"
               style={{
                 textShadow: '0 0 30px rgba(0, 0, 0, 0.9)',
                 backdropFilter: 'blur(3px)'
               }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.6 }}
          >
            Web tasarımından yapay zeka entegrasyonuna, mobil uygulamalardan SEO optimizasyonuna kadar 
            tüm dijital ihtiyaçlarınız için profesyonel çözümler sunuyoruz.
              </motion.span>
            </p>
          </motion.div>

          {/* Enhanced Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              { icon: Rocket, number: "Hızlı", label: "Teslimat", color: "cyan" },
              { icon: Star, number: "5.0", label: "Müşteri Memnuniyeti", color: "blue" },
              { icon: Shield, number: "24/7", label: "Teknik Destek", color: "purple" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 3.2 + index * 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  boxShadow: `0 0 40px rgba(${stat.color === 'cyan' ? '6, 182, 212' : stat.color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 0.6)`
                }}
                className="relative backdrop-blur-xl rounded-2xl p-8 overflow-hidden group cursor-pointer"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${
                    stat.color === 'cyan' ? 'from-cyan-400 to-blue-500' :
                    stat.color === 'blue' ? 'from-blue-400 to-purple-500' :
                    'from-purple-400 to-pink-500'
                  }`}
                />
                
                <stat.icon 
                  className={`h-12 w-12 mx-auto mb-4 relative z-10 ${
                    stat.color === 'cyan' ? 'text-cyan-400' :
                    stat.color === 'blue' ? 'text-blue-400' :
                    'text-purple-400'
                  }`}
                  style={{
                    filter: `drop-shadow(0 0 15px rgba(${stat.color === 'cyan' ? '6, 182, 212' : stat.color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 0.8))`
                  }}
                />
                <div className="text-4xl font-bold text-white mb-2 relative z-10">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300 relative z-10">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Cinematic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link href="/tr/iletisim">
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 4 }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -5,
                  boxShadow: '0 0 50px rgba(6, 182, 212, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center space-x-3 text-white px-12 py-6 rounded-3xl font-bold text-xl overflow-hidden transition-all duration-300 cursor-pointer"
                style={{ 
                  background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                  boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)'
                }}
              >
                {/* Enhanced Button Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-200, 300] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 4.5 }}
                />
                <span className="relative z-10">Ücretsiz Teklif Al</span>
                <ArrowRight className="relative z-10 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </Link>
            
            <Link href="/tr/hizmetlerimiz">
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 4.2 }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -5,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(6, 182, 212, 0.8)',
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-3 px-12 py-6 rounded-3xl font-bold text-xl text-white transition-all duration-300 border-2 border-white/40 backdrop-blur-xl cursor-pointer"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)'
                }}
              >
                <span>Hizmetlerimizi İncele</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Cinematic Features */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 4.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {[
              { icon: Code, text: "Web Geliştirme", color: "cyan" },
              { icon: Palette, text: "UI/UX Tasarım", color: "blue" },
              { icon: Search, text: "SEO Optimizasyonu", color: "purple" },
              { icon: Zap, text: "Yapay Zeka", color: "pink" }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 40, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 4.8 + index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  boxShadow: `0 0 50px rgba(${feature.color === 'cyan' ? '6, 182, 212' : feature.color === 'blue' ? '59, 130, 246' : feature.color === 'purple' ? '139, 92, 246' : '236, 72, 153'}, 0.7)`
                }}
                className={`relative flex flex-col items-center space-y-4 backdrop-blur-xl rounded-3xl p-8 transition-all duration-300 border border-white/30 overflow-hidden group cursor-pointer`}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Enhanced Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300 bg-gradient-to-br ${
                    feature.color === 'cyan' ? 'from-cyan-400 to-blue-500' :
                    feature.color === 'blue' ? 'from-blue-400 to-purple-500' :
                    feature.color === 'purple' ? 'from-purple-400 to-pink-500' :
                    'from-pink-400 to-rose-500'
                  }`}
                />
                
                <feature.icon 
                  className={`h-12 w-12 flex-shrink-0 relative z-10 ${
                    feature.color === 'cyan' ? 'text-cyan-400' :
                    feature.color === 'blue' ? 'text-blue-400' :
                    feature.color === 'purple' ? 'text-purple-400' :
                    'text-pink-400'
                  }`}
                  style={{
                    filter: `drop-shadow(0 0 20px rgba(${feature.color === 'cyan' ? '6, 182, 212' : feature.color === 'blue' ? '59, 130, 246' : feature.color === 'purple' ? '139, 92, 246' : '236, 72, 153'}, 0.8))`
                  }}
                />
                <span className="text-lg font-bold text-white relative z-10 text-center">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}