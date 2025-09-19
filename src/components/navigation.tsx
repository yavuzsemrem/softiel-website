"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, Sparkles, Globe, Code, Smartphone, Search, Target, FileText, Palette, Share2, Bot, Zap, Users, BookOpen, Wrench } from "lucide-react"

const navigationItems = [
  { name: "Ana Sayfa", href: "/" },
  { 
    name: "Hizmetlerimiz", 
    href: "/hizmetlerimiz",
    dropdown: [
      { name: "Web Sitesi Tasarımı", href: "/hizmetlerimiz/web-sitesi-tasarimi", icon: Globe },
      { name: "Web Geliştirme", href: "/hizmetlerimiz/web-gelistirme", icon: Code },
      { name: "Mobil Uygulama Geliştirme", href: "/hizmetlerimiz/mobil-uygulama-gelistirme", icon: Smartphone },
      { name: "SEO & Arama Motoru Optimizasyonu", href: "/hizmetlerimiz/seo-arama-motoru-optimizasyonu", icon: Search },
      { name: "Google Ads & Meta Ads Yönetimi", href: "/hizmetlerimiz/google-ads-meta-ads-yonetimi", icon: Target },
      { name: "WordPress & CMS Çözümleri", href: "/hizmetlerimiz/wordpress-cms-cozumleri", icon: FileText },
      { name: "Logo & Kurumsal Kimlik Tasarımı", href: "/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi", icon: Palette },
      { name: "Sosyal Medya Yönetimi", href: "/hizmetlerimiz/sosyal-medya-yonetimi", icon: Share2 },
      { name: "Yapay Zeka Entegrasyonları", href: "/hizmetlerimiz/yapay-zeka-entegrasyonlari", icon: Bot },
      { name: "Otomasyon & Entegrasyon", href: "/hizmetlerimiz/otomasyon-entegrasyon", icon: Zap },
      { name: "Dijital Danışmanlık", href: "/hizmetlerimiz/dijital-danismanlik", icon: Users },
      { name: "No-Code / Low-Code Çözümleri", href: "/hizmetlerimiz/no-code-low-code-cozumleri", icon: Wrench },
      { name: "Eğitim & Mentorluk", href: "/hizmetlerimiz/egitim-mentorluk", icon: BookOpen },
    ]
  },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Fiyatlandırma", href: "/fiyatlandirma" },
  { name: "Blog", href: "/blog" },
  { name: "İletişim", href: "/iletisim" },
]

interface NavigationProps {
  isMobile?: boolean
  onClose?: () => void
}

export function Navigation({ isMobile = false, onClose }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  const handleLinkClick = () => {
    if (onClose) onClose()
    setActiveDropdown(null)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-2">
        {navigationItems.map((item) => (
          <div key={item.name}>
            {item.dropdown ? (
              <div>
                <motion.button
                  onClick={() => handleDropdownToggle(item.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-300 overflow-hidden ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-blue-500/10'
                  }`}
                >
                  <div className="flex items-center justify-center flex-1 relative z-10">
                    <span className="font-medium">{item.name}</span>
                    {isActive(item.href) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl z-0"
                      />
                    )}
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} 
                  />
                </motion.button>
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
                  className="group flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-400 hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-400/8 hover:to-cyan-400/8 transition-all duration-300 rounded-lg"
                >
                                <IconComponent className="h-4 w-4 text-blue-400/70 group-hover:text-blue-400 transition-colors" />
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
    <nav className="hidden lg:flex items-center space-x-4">
      {navigationItems.map((item) => (
        <div key={item.name} className="relative group">
          {item.dropdown ? (
            <div className="relative">
              <motion.button
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center justify-center space-x-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10'
                    : 'text-white hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-blue-500/10'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
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
              </motion.button>
              
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
                        <span className="text-sm font-semibold text-blue-400">Hizmetlerimiz</span>
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
                                className="group flex items-center space-x-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-gradient-to-r hover:from-blue-400/8 hover:to-cyan-400/8 hover:text-blue-400 transition-all duration-300 rounded-lg"
                              >
                                <IconComponent className="h-4 w-4 text-blue-400/70 group-hover:text-blue-400 transition-colors" />
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
                  className={`relative flex items-center justify-center px-4 py-2.5 rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10'
                      : 'text-white hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-blue-500/10'
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

