"use client"

import React from "react"
import { motion } from "framer-motion"
import { Users, Award, Target, Lightbulb, ArrowRight, Calendar, MapPin, Phone, CheckCircle, Sparkles, Shield, Globe, Code, Palette, Search, Clock, Headphones, MessageCircle, Zap, Star } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[size:20px_20px]"></div>
        
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 via-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        
        {/* Additional gradient orbs for depth */}
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-bl from-sky-500/15 via-cyan-500/15 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-500/15 via-cyan-500/15 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-gradient-to-l from-indigo-500/20 via-blue-500/20 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        
        {/* Background icons */}
        <div className="absolute top-1/6 left-1/6 opacity-5">
          <Users className="h-12 w-12 text-cyan-500" />
        </div>
        <div className="absolute top-1/3 right-1/6 opacity-5">
          <Award className="h-10 w-10 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 opacity-5">
          <Target className="h-14 w-14 text-cyan-400" />
        </div>
        <div className="absolute bottom-1/6 right-1/5 opacity-5">
          <Lightbulb className="h-8 w-8 text-blue-400" />
        </div>
        <div className="absolute top-1/4 left-1/4 opacity-5">
          <Shield className="h-6 w-6 text-cyan-300" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-5">
          <Globe className="h-8 w-8 text-blue-300" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-5">
          <Code className="h-10 w-10 text-cyan-200" />
        </div>
        <div className="absolute top-2/3 left-1/2 opacity-5">
          <Palette className="h-16 w-16 text-blue-200" />
        </div>
        <div className="absolute top-1/5 right-1/3 opacity-5">
          <Search className="h-7 w-7 text-cyan-100" />
        </div>
        <div className="absolute bottom-1/5 right-1/3 opacity-5">
          <Zap className="h-9 w-9 text-blue-100" />
        </div>
        <div className="absolute top-3/4 left-1/4 opacity-5">
          <Star className="h-11 w-11 text-cyan-50" />
        </div>
        <div className="absolute bottom-1/2 right-1/2 opacity-5">
          <Sparkles className="h-13 w-13 text-blue-50" />
        </div>
        <div className="absolute top-1/8 left-1/8 opacity-5">
          <Users className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="absolute top-5/6 right-1/8 opacity-5">
          <Award className="h-7 w-7 text-blue-400" />
        </div>
        <div className="absolute bottom-1/8 left-1/8 opacity-5">
          <Target className="h-9 w-9 text-cyan-300" />
        </div>
        <div className="absolute top-1/2 left-1/8 opacity-5">
          <Lightbulb className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/12 left-1/12 opacity-5">
          <Shield className="h-8 w-8 text-cyan-400" />
        </div>
        <div className="absolute top-1/12 right-1/12 opacity-5">
          <Globe className="h-7 w-7 text-blue-400" />
        </div>
        <div className="absolute top-1/8 right-1/3 opacity-5">
          <Code className="h-9 w-9 text-cyan-300" />
        </div>
        <div className="absolute top-1/6 right-1/2 opacity-5">
          <Palette className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/4 left-1/6 opacity-5">
          <Search className="h-8 w-8 text-cyan-200" />
        </div>
        <div className="absolute top-1/5 left-1/2 opacity-5">
          <Zap className="h-7 w-7 text-blue-200" />
        </div>
        <div className="absolute top-1/3 left-1/12 opacity-5">
          <Star className="h-9 w-9 text-cyan-100" />
        </div>
        <div className="absolute top-1/4 right-1/6 opacity-5">
          <Sparkles className="h-8 w-8 text-blue-100" />
        </div>
        <div className="absolute top-1/6 left-1/3 opacity-5">
          <Users className="h-6 w-6 text-cyan-50" />
        </div>
        <div className="absolute top-1/8 left-1/2 opacity-5">
          <Award className="h-7 w-7 text-blue-50" />
        </div>
        <div className="absolute top-1/5 right-1/5 opacity-5">
          <Target className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="absolute top-1/7 left-1/5 opacity-5">
          <Lightbulb className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/9 right-1/7 opacity-5">
          <Shield className="h-7 w-7 text-cyan-200" />
        </div>
        <div className="absolute top-1/10 left-1/7 opacity-5">
          <Globe className="h-5 w-5 text-blue-200" />
        </div>
      </div>
      
      {/* Hero Content Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20 pb-4 lg:pt-32 lg:pb-8">
        {/* Mobile Layout - Alt Alta */}
        <div className="lg:hidden text-center">
          {/* Page Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full px-4 py-2 shadow-modern mb-4 w-fit mx-auto"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Users className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Hakkımızda
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Güvenilir{" "}
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Partneriniz
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 space-y-2"
          >
            <p>Dijital dönüşüm yolculuğunuzda güvenilir ve deneyimli partneriniz. Modern teknolojiler ve uzman ekibimizle işinizi geleceğe taşıyoruz.</p>
          </motion.div>
      
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                
                // Element yüklenene kadar bekle ve scroll yap
                const scrollToOurMission = () => {
                  const ourMissionElement = document.getElementById('our-mission');
                  if (ourMissionElement) {
                    // Element bulundu, scroll yap
                    ourMissionElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                    return true;
                  }
                  return false;
                };

                // Hemen dene
                if (!scrollToOurMission()) {
                  // Element yoksa, yüklenene kadar bekle (maksimum 5 saniye)
                  let attempts = 0;
                  const maxAttempts = 50; // 50 * 100ms = 5 saniye
                  const interval = setInterval(() => {
                    attempts++;
                    if (scrollToOurMission()) {
                      clearInterval(interval);
                    } else if (attempts >= maxAttempts) {
                      clearInterval(interval);
                      console.warn('Our mission element not found after 5 seconds');
                    }
                  }, 100);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 cursor-pointer"
            >
              <span>Hikayemizi Keşfedin</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
              
            <motion.a
              href="/tr/iletisim"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              <Phone className="h-5 w-5" />
              <span>İletişime Geçin</span>
            </motion.a>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              <img
                src="/images/about.webp"
                alt="Hakkımızda"
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout - Yan Yana */}
        <div className="hidden lg:flex items-center justify-between min-h-[60vh]">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-left lg:max-w-3xl xl:max-w-4xl"
          >
            {/* Page Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center space-x-2 rounded-full px-4 py-2 shadow-modern mb-4 w-fit"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Users className="h-5 w-5 text-cyan-500 fill-current" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Hakkımızda
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
              Güvenilir{" "}
              <br />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Partneriniz
              </span>
            </h1>
            
            {/* Description */}
            <div className="text-lg lg:text-xl text-gray-300 mb-10 space-y-2">
              <p>Dijital dönüşüm yolculuğunuzda güvenilir ve deneyimli partneriniz. Modern teknolojiler ve uzman ekibimizle işinizi geleceğe taşıyoruz.</p>
            </div>
        
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  
                  // Element yüklenene kadar bekle ve scroll yap
                  const scrollToOurMission = () => {
                    const ourMissionElement = document.getElementById('our-mission');
                    if (ourMissionElement) {
                      // Element bulundu, scroll yap
                      ourMissionElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
                      return true;
                    }
                    return false;
                  };

                  // Hemen dene
                  if (!scrollToOurMission()) {
                    // Element yoksa, yüklenene kadar bekle (maksimum 5 saniye)
                    let attempts = 0;
                    const maxAttempts = 50; // 50 * 100ms = 5 saniye
                    const interval = setInterval(() => {
                      attempts++;
                      if (scrollToOurMission()) {
                        clearInterval(interval);
                      } else if (attempts >= maxAttempts) {
                        clearInterval(interval);
                        console.warn('Our mission element not found after 5 seconds');
                      }
                    }, 100);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 cursor-pointer"
              >
                <span>Hikayemizi Keşfedin</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
                
              <motion.a
                href="/tr/iletisim"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                <Phone className="h-5 w-5" />
                <span>İletişime Geçin</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-none lg:max-w-md xl:max-w-lg flex justify-end"
          >
            <div className="relative w-full max-w-xl xl:max-w-2xl">
              <img
                src="/images/about.webp"
                alt="Hakkımızda"
                className="w-full h-auto object-contain lg:translate-x-4 xl:translate-x-6 scale-110 lg:scale-125 xl:scale-135"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Stats Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Web Tasarımı</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">Modern ve responsive web siteleri</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Mobil Uygulama</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">iOS ve Android uygulamaları</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SEO Optimizasyonu</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">Arama motoru optimizasyonu</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

