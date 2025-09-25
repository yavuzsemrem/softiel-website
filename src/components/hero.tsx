"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
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
  Layers,
  Cpu,
  Database,
  Cloud
} from "lucide-react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  
  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -250])
  
  // Logo parallax
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  
  // Background elements parallax
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -400])
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  
  // Mouse tracking for interactive parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Gradient Orbs with Parallax */}
        <motion.div
          style={{ y: bgY1, x: mousePosition.x * 0.5 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-500/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
        />
        <motion.div
          style={{ y: bgY2, x: mousePosition.x * -0.3 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/30 via-pink-500/20 to-rose-500/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl"
        />
        <motion.div
          style={{ y: bgY3, x: mousePosition.x * 0.2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-sky-400/20 via-cyan-500/15 to-teal-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl"
        />
        
        {/* Additional Parallax Elements */}
        <motion.div
          style={{ y: y1, x: mousePosition.x * 0.4 }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl"
        />
        <motion.div
          style={{ y: y2, x: mousePosition.x * -0.2 }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/15 to-green-500/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl"
        />
        
        {/* Grid Pattern with Parallax */}
        <motion.div
          style={{ 
            y: y3,
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
          className="absolute inset-0 opacity-40"
        />
        
        {/* Floating Tech Icons with Parallax */}
        <motion.div
          style={{ 
            y: y4, 
            x: mousePosition.x * 0.3,
            background: 'rgba(255, 255, 255, 0.1)'
          }}
          className="absolute top-20 left-20 w-16 h-16 glass rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-lg"
        >
          <Code className="h-8 w-8 text-cyan-400" />
        </motion.div>
        
        <motion.div
          style={{ 
            y: y5, 
            x: mousePosition.x * -0.4,
            background: 'rgba(255, 255, 255, 0.1)'
          }}
          className="absolute top-32 right-20 w-16 h-16 glass rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-lg"
        >
          <Database className="h-8 w-8 text-blue-400" />
        </motion.div>
        
        <motion.div
          style={{ 
            y: y1, 
            x: mousePosition.x * 0.6,
            background: 'rgba(255, 255, 255, 0.1)'
          }}
          className="absolute bottom-40 left-20 w-16 h-16 glass rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-lg"
        >
          <Cloud className="h-8 w-8 text-purple-400" />
        </motion.div>
        
        <motion.div
          style={{ 
            y: y2, 
            x: mousePosition.x * -0.5,
            background: 'rgba(255, 255, 255, 0.1)'
          }}
          className="absolute bottom-20 right-10 w-16 h-16 glass rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-lg"
        >
          <Cpu className="h-8 w-8 text-pink-400" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center">
          {/* Parallax Logo Section */}
          <motion.div
            style={{ y: logoY, scale: logoScale, rotate: logoRotate }}
            className="mb-16"
          >
            <div className="relative inline-block">
              {/* Logo Container with Parallax Effects */}
              <div className="w-40 h-40 mx-auto mb-8 relative">
                {/* Animated Glow Rings */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-40"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.9, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute inset-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full blur-xl opacity-60"
                />
                
                {/* Logo with Parallax */}
                <motion.div
                  style={{ 
                    x: mousePosition.x * 0.1,
                    y: mousePosition.y * 0.1,
                    background: 'rgba(255, 255, 255, 0.15)'
                  }}
                  className="relative w-full h-full glass rounded-full flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-2xl"
                >
                  <Image
                    src="/transparent.png"
                    alt="Softiel Logo"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                    priority
                  />
                </motion.div>
                
                {/* Floating Particles with Parallax */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      x: mousePosition.x * (0.2 + i * 0.05),
                      y: mousePosition.y * (0.1 + i * 0.03),
                      top: '50%',
                      left: '50%',
                      transformOrigin: `${70 + i * 15}px 0px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{ 
                      rotate: 360,
                      scale: [0.8, 1.3, 0.8]
                    }}
                    transition={{ 
                      duration: 6 + i * 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  />
                ))}
              </div>
              
              {/* Badge with Parallax */}
              <motion.div
                style={{ 
                  y: logoY * 0.5,
                  x: mousePosition.x * 0.05,
                  background: 'rgba(255, 255, 255, 0.15)'
                }}
                className="inline-flex items-center space-x-3 glass rounded-full px-8 py-4 shadow-modern-lg border border-white/30 backdrop-blur-lg"
              >
            <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4,
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
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Award className="h-6 w-6 text-yellow-400" />
                </motion.div>
              </motion.div>
            </div>
            </motion.div>

          {/* Main Heading - KORUNAN BAŞLIK */}
            <motion.h1
            style={{ y: logoY * 0.3 }}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-neutral-900 dark:text-white mb-8 leading-[0.9] tracking-tight"
          >
            <motion.span
              style={{ x: mousePosition.x * 0.02 }}
              className="block"
            >
              Dijital Dünyada
            </motion.span>
            <motion.span
              style={{ x: mousePosition.x * -0.02 }}
              className="block bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
                Fark Yaratın
            </motion.span>
            </motion.h1>

          {/* Parallax Subtitle */}
            <motion.p
            style={{ y: logoY * 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-neutral-600 dark:text-neutral-300 mb-16 max-w-5xl mx-auto leading-relaxed font-light"
          >
            <motion.span
              style={{ x: mousePosition.x * 0.01 }}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              Modern web tasarımı
            </motion.span>
            , gelişmiş web geliştirme ve 
            <br />
            <motion.span
              style={{ x: mousePosition.x * -0.01 }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
            >
              etkili dijital pazarlama
            </motion.span>
            çözümleriyle markanızı öne çıkarın.
            </motion.p>

          {/* Parallax Feature Cards */}
            <motion.div
            style={{ y: logoY * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              { text: "Modern Tasarım", icon: Palette, color: "from-pink-500 to-rose-500", delay: 0 },
              { text: "Hızlı Geliştirme", icon: Zap, color: "from-yellow-500 to-orange-500", delay: 0.2 },
              { text: "SEO Optimizasyonu", icon: Search, color: "from-green-500 to-emerald-500", delay: 0.4 },
              { text: "7/24 Destek", icon: Shield, color: "from-blue-500 to-cyan-500", delay: 0.6 }
              ].map((feature, index) => (
              <motion.div
                key={feature.text}
                style={{ 
                  y: logoY * (0.05 + index * 0.02),
                  x: mousePosition.x * (0.01 + index * 0.005)
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5
                }}
                className="group relative"
              >
                <div className="glass rounded-2xl p-6 shadow-modern-lg border border-white/30 backdrop-blur-lg h-full"
                     style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                  <div className="text-center">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                      {feature.text}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Profesyonel çözümler
                    </p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} blur-xl opacity-20 -z-10`}
                />
              </motion.div>
              ))}
            </motion.div>

          {/* Parallax CTA Buttons */}
            <motion.div
            style={{ y: logoY * 0.05 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
            >
              <Link href="/iletisim">
                <motion.button
                style={{ x: mousePosition.x * 0.01 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
                }}
                  whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden text-white px-12 py-6 rounded-3xl font-bold text-2xl shadow-2xl transition-all duration-500"
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
                    whileHover={{ x: 5, rotate: 5 }}
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
              style={{ x: mousePosition.x * -0.01 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
              }}
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

          {/* Parallax Stats Section */}
          <motion.div
            style={{ y: logoY * 0.1 }}
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
                  style={{ 
                    y: logoY * (0.02 + index * 0.01),
                    x: mousePosition.x * (0.005 + index * 0.002)
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    rotateY: 5
                  }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                  >
                    <stat.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </div>
                  <div className="text-xl text-neutral-600 dark:text-neutral-300 font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

