"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, Sparkles, Globe, Code, Smartphone, Search, Target, FileText, Palette, Share2, Bot, Zap, Users, BookOpen, Wrench } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

// Navigation items will be generated dynamically with i18n

interface NavigationProps {
  isMobile?: boolean
  onClose?: () => void
}

export function Navigation({ isMobile = false, onClose }: NavigationProps) {
  const { t, getLocalizedUrl } = useI18n()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Navigation items with i18n and localized URLs
  const navigationItems = [
    { name: t('navigation.home', 'Ana Sayfa'), href: getLocalizedUrl("/") },
    { 
      name: t('navigation.services', 'Hizmetlerimiz'), 
      href: getLocalizedUrl("/hizmetlerimiz"),
      dropdown: [
        { name: t('services.webDesign', 'Web Sitesi Tasarımı'), href: getLocalizedUrl("/hizmetlerimiz/web-sitesi-tasarimi"), icon: Globe },
        { name: t('services.webDevelopment', 'Web Uygulaması Geliştirme'), href: getLocalizedUrl("/hizmetlerimiz/web-gelistirme"), icon: Code },
        { name: t('services.mobileApp', 'Mobil Uygulama Geliştirme'), href: getLocalizedUrl("/hizmetlerimiz/mobil-uygulama-gelistirme"), icon: Smartphone },
        { name: t('services.seo', 'SEO Optimizasyonu'), href: getLocalizedUrl("/hizmetlerimiz/seo-optimizasyonu"), icon: Search },
        { name: t('services.googleAds', 'Google Ads & Meta Ads Yönetimi'), href: getLocalizedUrl("/hizmetlerimiz/google-ads-yonetimi"), icon: Target },
        { name: t('services.wordpress', 'WordPress & CMS Çözümleri'), href: getLocalizedUrl("/hizmetlerimiz/wordpress-cozumleri"), icon: FileText },
        { name: t('services.logoDesign', 'Logo & Kurumsal Kimlik Tasarımı'), href: getLocalizedUrl("/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi"), icon: Palette },
        { name: t('services.socialMedia', 'Sosyal Medya Yönetimi'), href: getLocalizedUrl("/hizmetlerimiz/social-media-yonetimi"), icon: Share2 },
        { name: t('services.aiIntegration', 'Yapay Zeka Entegrasyonları'), href: getLocalizedUrl("/hizmetlerimiz/yapay-zeka-entegrasyonlari"), icon: Bot },
        { name: t('services.digitalConsulting', 'Dijital Danışmanlık'), href: getLocalizedUrl("/hizmetlerimiz/dijital-danismanlik"), icon: Users },
      ]
    },
    { name: t('navigation.about', 'Hakkımızda'), href: getLocalizedUrl("/hakkimizda") },
    { name: t('navigation.pricing', 'Fiyatlandırma'), href: getLocalizedUrl("/fiyatlandirma") },
    { name: t('navigation.references', 'Projelerimiz'), href: getLocalizedUrl("/projelerimiz") },
    { name: t('navigation.blog', 'Blog'), href: getLocalizedUrl("/blog") },
    { name: t('navigation.contact', 'İletişim'), href: getLocalizedUrl("/iletisim") },
  ]

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  const handleLinkClick = () => {
    if (onClose) onClose()
    setActiveDropdown(null)
  }

  const isActive = (href: string) => {
    // Ana sayfa kontrolü - getLocalizedUrl("/") "/tr" döndürüyor
    if (href === "/" || href === "/tr" || href === "/en" || href === "/de" || href === "/fr" || href === "/ru" || href === "/ar") {
      // Ana sayfa sadece tam olarak ana sayfa URL'sinde aktif olmalı
      return pathname === href
    }
    
    // Tam eşleşme kontrolü
    if (pathname === href) {
      return true
    }
    
    // Başlangıç kontrolü
    if (pathname.startsWith(href)) {
      return true
    }

    // RU diline özel: Hizmetler kökü /ru/uslugi, alt sayfalar /ru/services/... altında
    // Parent "Hizmetler" menüsünün aktif kalması için bu eşleştirmeyi yap
    if (href === "/ru/uslugi" && pathname.startsWith("/ru/services")) {
      return true
    }
    
    // SEO optimizasyonu için özel kontrol - hem eski hem yeni URL'leri destekle
    if (href.includes('/seo-optimizasyonu') || href.includes('/seo-arama-motoru-optimizasyonu')) {
      return pathname.includes('/seo-optimizasyonu') || pathname.includes('/seo-arama-motoru-optimizasyonu')
    }
    
    return false
  }

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-2">
        {navigationItems.map((item) => (
          <div key={item.name}>
            {item.dropdown ? (
              <div>
                <div className="relative w-full">
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`relative flex items-center justify-center w-full px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-blue-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-center relative z-10">
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {isActive(item.href) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl z-0"
                      />
                    )}
                  </Link>
                  <motion.button
                    onClick={() => handleDropdownToggle(item.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-slate-300 hover:text-white transition-colors z-20"
                  >
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                  </motion.button>
                </div>
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 space-y-1 mt-2">
                        {item.dropdown.map((subItem, index) => {
                          const IconComponent = subItem.icon
                          return (
                            <motion.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                <Link
                  href={subItem.href}
                  onClick={handleLinkClick}
                  className={`group flex items-center space-x-3 px-4 py-2.5 text-sm transition-all duration-300 rounded-lg ${
                    isActive(subItem.href)
                      ? 'text-blue-400 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 shadow-md shadow-blue-400/10'
                      : 'text-slate-400 hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-400/8 hover:to-cyan-400/8'
                  }`}
                >
                                <IconComponent className={`h-4 w-4 transition-colors ${
                                  isActive(subItem.href)
                                    ? 'text-blue-400'
                                    : 'text-blue-400/70 group-hover:text-blue-400'
                                }`} />
                                <span>{subItem.name}</span>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`relative flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-blue-500/10'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive(item.href) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl z-0"
                    />
                  )}
                </Link>
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    )
  }

  return (
    <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-3">
      {navigationItems.map((item) => (
        <div key={item.name} className="relative group">
          {item.dropdown ? (
            <div className="relative">
              <Link
                href={item.href}
                onClick={handleLinkClick}
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                className={`relative flex items-center justify-center space-x-1 px-1.5 lg:px-2 xl:px-3 py-1.5 lg:py-2 rounded-lg font-medium text-xs lg:text-sm xl:text-base transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10'
                    : 'text-white hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-blue-500/10'
                }`}
              >
                <span className="relative z-10 truncate max-w-[100px] lg:max-w-[120px] xl:max-w-none">{item.name}</span>
                <ChevronDown 
                  className={`h-4 w-4 transition-all duration-300 relative z-10 ${
                    activeDropdown === item.name ? 'rotate-180 text-white' : ''
                  }`} 
                />
                {isActive(item.href) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl z-0"
                  />
                )}
              </Link>
              
              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl py-4 z-50"
                    style={{ border: '1px solid rgba(178, 178, 178, 0.1)' }}
                  >
                    <div className="px-2">
                      <div className="flex items-center space-x-2 px-3 py-2 mb-2">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400">{t('navigation.services', 'Hizmetlerimiz')}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {item.dropdown.map((subItem, index) => {
                          const IconComponent = subItem.icon
                          return (
                            <motion.div
                              key={subItem.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={subItem.href}
                                onClick={handleLinkClick}
                                className={`group flex items-center space-x-3 px-3 py-2.5 text-sm transition-all duration-300 rounded-lg ${
                                  isActive(subItem.href)
                                    ? 'text-blue-400 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 shadow-md shadow-blue-400/10'
                                    : 'text-slate-300 hover:bg-gradient-to-r hover:from-blue-400/8 hover:to-cyan-400/8 hover:text-blue-400'
                                }`}
                              >
                                <IconComponent className={`h-4 w-4 transition-colors ${
                                  isActive(subItem.href)
                                    ? 'text-blue-400'
                                    : 'text-blue-400/70 group-hover:text-blue-400'
                                }`} />
                                <span className="flex-1">{subItem.name}</span>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.href}
                className={`relative flex items-center justify-center px-1.5 lg:px-2 xl:px-3 py-1.5 lg:py-2 rounded-lg font-medium text-xs lg:text-sm xl:text-base transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10'
                    : 'text-white hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-blue-500/10'
                }`}
              >
                <span className="relative z-10 truncate max-w-[100px] lg:max-w-[120px] xl:max-w-none">{item.name}</span>
                {isActive(item.href) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl z-0"
                  />
                )}
              </Link>
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  )
}

