"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageCircle, Phone, Mail, MapPin, ArrowRight, CheckCircle, Users, Clock, Headphones, Globe, Zap, Shield, Star, Sparkles } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

// WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

export function ContactHero() {
  const { t } = useI18n()
  
  // WhatsApp mesajını dile göre al
  const whatsappMessage = encodeURIComponent(t('contact.hero.whatsappMessage'))
  const whatsappUrl = `https://wa.me/905411883045?text=${whatsappMessage}`
  
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
          <MessageCircle className="h-12 w-12 text-cyan-500" />
        </div>
        <div className="absolute top-1/3 right-1/6 opacity-5">
          <Phone className="h-10 w-10 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 opacity-5">
          <Mail className="h-14 w-14 text-cyan-400" />
        </div>
        <div className="absolute bottom-1/6 right-1/5 opacity-5">
          <MapPin className="h-8 w-8 text-blue-400" />
        </div>
        <div className="absolute top-1/4 left-1/4 opacity-5">
          <Users className="h-6 w-6 text-cyan-300" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-5">
          <Clock className="h-8 w-8 text-blue-300" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-5">
          <Headphones className="h-10 w-10 text-cyan-200" />
        </div>
        <div className="absolute top-2/3 left-1/2 opacity-5">
          <Globe className="h-16 w-16 text-blue-200" />
        </div>
        <div className="absolute top-1/5 right-1/3 opacity-5">
          <Zap className="h-7 w-7 text-cyan-100" />
        </div>
        <div className="absolute bottom-1/5 right-1/3 opacity-5">
          <Shield className="h-9 w-9 text-blue-100" />
        </div>
        <div className="absolute top-3/4 left-1/4 opacity-5">
          <Star className="h-11 w-11 text-cyan-50" />
        </div>
        <div className="absolute bottom-1/2 right-1/2 opacity-5">
          <Sparkles className="h-13 w-13 text-blue-50" />
        </div>
        <div className="absolute top-1/8 left-1/8 opacity-5">
          <MessageCircle className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="absolute top-5/6 right-1/8 opacity-5">
          <Phone className="h-7 w-7 text-blue-400" />
        </div>
        <div className="absolute bottom-1/8 left-1/8 opacity-5">
          <Mail className="h-9 w-9 text-cyan-300" />
        </div>
        <div className="absolute top-1/2 left-1/8 opacity-5">
          <MapPin className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/12 left-1/12 opacity-5">
          <Users className="h-8 w-8 text-cyan-400" />
        </div>
        <div className="absolute top-1/12 right-1/12 opacity-5">
          <Clock className="h-7 w-7 text-blue-400" />
        </div>
        <div className="absolute top-1/8 right-1/3 opacity-5">
          <Headphones className="h-9 w-9 text-cyan-300" />
        </div>
        <div className="absolute top-1/6 right-1/2 opacity-5">
          <Globe className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/4 left-1/6 opacity-5">
          <Zap className="h-8 w-8 text-cyan-200" />
        </div>
        <div className="absolute top-1/5 left-1/2 opacity-5">
          <Shield className="h-7 w-7 text-blue-200" />
        </div>
        <div className="absolute top-1/3 left-1/12 opacity-5">
          <Star className="h-9 w-9 text-cyan-100" />
        </div>
        <div className="absolute top-1/4 right-1/6 opacity-5">
          <Sparkles className="h-8 w-8 text-blue-100" />
        </div>
        <div className="absolute top-1/6 left-1/3 opacity-5">
          <MessageCircle className="h-6 w-6 text-cyan-50" />
        </div>
        <div className="absolute top-1/8 left-1/2 opacity-5">
          <Phone className="h-7 w-7 text-blue-50" />
        </div>
        <div className="absolute top-1/5 right-1/5 opacity-5">
          <Mail className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="absolute top-1/7 left-1/5 opacity-5">
          <MapPin className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/9 right-1/7 opacity-5">
          <Users className="h-7 w-7 text-cyan-200" />
        </div>
        <div className="absolute top-1/10 left-1/7 opacity-5">
          <Clock className="h-5 w-5 text-blue-200" />
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
            <MessageCircle className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {t('contact.hero.badge')}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {t('contact.hero.headingNormal')}
            {" "}
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {t('contact.hero.headingGradient')}
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 space-y-2"
          >
            <p>{t('contact.hero.description')}</p>
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
                const scrollToContactForm = () => {
                  const contactFormElement = document.getElementById('contact-form');
                  if (contactFormElement) {
                    // Element bulundu, scroll yap
                    contactFormElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                    return true;
                  }
                  return false;
                };

                // Hemen dene
                if (!scrollToContactForm()) {
                  // Element yoksa, yüklenene kadar bekle (maksimum 5 saniye)
                  let attempts = 0;
                  const maxAttempts = 50; // 50 * 100ms = 5 saniye
                  const interval = setInterval(() => {
                    attempts++;
                    if (scrollToContactForm()) {
                      clearInterval(interval);
                    } else if (attempts >= maxAttempts) {
                      clearInterval(interval);
                      console.warn('Contact form element not found after 5 seconds');
                    }
                  }, 100);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 cursor-pointer"
            >
              <span>{t('contact.hero.ctaStart')}</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
              
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{t('contact.hero.ctaWhatsApp')}</span>
            </motion.a>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
              <img
                src="/images/contact.webp"
                alt="İletişim"
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
              <MessageCircle className="h-5 w-5 text-cyan-500 fill-current" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {t('contact.hero.badge')}
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
              {t('contact.hero.headingNormal')}
              {" "}
              <br />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                {t('contact.hero.headingGradient')}
              </span>
            </h1>
            
            {/* Description */}
            <div className="text-lg lg:text-xl text-gray-300 mb-10 space-y-2">
              <p>{t('contact.hero.description')}</p>
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
                  const scrollToContactForm = () => {
                    const contactFormElement = document.getElementById('contact-form');
                    if (contactFormElement) {
                      // Element bulundu, scroll yap
                      contactFormElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
                      return true;
                    }
                    return false;
                  };

                  // Hemen dene
                  if (!scrollToContactForm()) {
                    // Element yoksa, yüklenene kadar bekle (maksimum 5 saniye)
                    let attempts = 0;
                    const maxAttempts = 50; // 50 * 100ms = 5 saniye
                    const interval = setInterval(() => {
                      attempts++;
                      if (scrollToContactForm()) {
                        clearInterval(interval);
                      } else if (attempts >= maxAttempts) {
                        clearInterval(interval);
                        console.warn('Contact form element not found after 5 seconds');
                      }
                    }, 100);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 cursor-pointer"
              >
                <span>{t('contact.hero.ctaStart')}</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
                
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{t('contact.hero.ctaWhatsApp')}</span>
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
                src="/images/contact.webp"
                alt="İletişim"
                className="w-full h-auto object-contain lg:translate-x-4 xl:translate-x-6 scale-110 lg:scale-125 xl:scale-135"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
        </div>

        {/* Contact Methods Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('contact.hero.phoneTitle')}</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">{t('contact.hero.phoneNumber')}</p>
            <p className="text-gray-400 text-sm">{t('contact.hero.phoneDesc')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('contact.hero.emailTitle')}</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">{t('contact.hero.emailAddress')}</p>
            <p className="text-gray-400 text-sm">{t('contact.hero.emailDesc')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <WhatsAppIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('contact.hero.whatsappTitle')}</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">{t('contact.hero.whatsappNumber')}</p>
            <p className="text-gray-400 text-sm">{t('contact.hero.whatsappDesc')}</p>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
            >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-white" />
              </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('contact.hero.addressTitle')}</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">{t('contact.hero.addressLocation')}</p>
            <p className="text-gray-400 text-sm">{t('contact.hero.addressDesc')}</p>
            </motion.div>
        </div>
      </div>
    </section>
  )
}