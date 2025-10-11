"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, FileText, ChevronDown, Globe } from "lucide-react"
import { Logo } from "./logo"
import { Navigation } from "./navigation"
import { QuoteModal } from "./quote-modal"
import { useI18n } from "@/contexts/i18n-context"

const languages = [
  { code: 'tr', countryCode: 'TR' },
  { code: 'en', countryCode: 'GB' },
  { code: 'de', countryCode: 'DE' },
  { code: 'fr', countryCode: 'FR' },
  { code: 'ru', countryCode: 'RU' },
  { code: 'ar', countryCode: 'SA' },
]

export function Header() {
  const { locale, setLocale, t, getLocalizedUrl } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  // Cache buster kaldırıldı: SSR/CSR srcSet mismatch önlemek için

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const selectLanguage = (language: typeof languages[0]) => {
    setSelectedLanguage(language)
    setLocale(language.code)
    setIsLanguageDropdownOpen(false)
  }

  // Mevcut dil değiştiğinde seçili dili güncelle
  useEffect(() => {
    const currentLanguage = languages.find(lang => lang.code === locale)
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage)
    }
  }, [locale])

  const toggleQuoteModal = () => {
    setIsQuoteModalOpen(!isQuoteModalOpen)
  }


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 w-full">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-1 lg:gap-2">
          {/* Logo */}
          <Link href={getLocalizedUrl("/")} className="flex-shrink-0">
            <div className="flex items-center space-x-2 lg:space-x-3 ml-2 lg:ml-0">
              <div className="w-12 h-12 lg:w-12 lg:h-12 relative">
                <Image 
                  src="/transparent.webp" 
                  alt="Softiel Logo" 
                  width={48} 
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl lg:text-2xl font-bold text-white">Softiel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex-1 flex justify-center">
            <Navigation />
          </div>

          {/* Quote Request Button - desktop only */}
          <div className="hidden lg:flex flex-shrink-0 mr-2 lg:mr-3 xl:mr-4">
            <motion.button
              onClick={toggleQuoteModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-auto h-auto space-x-1 xl:space-x-1.5 px-2 xl:px-3 py-1.5 lg:py-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-200 shadow-lg"
            >
              <FileText className="h-4 w-4" />
              <span className="text-xs lg:text-sm xl:text-base font-medium">{t('common.getQuote', 'Teklif Al')}</span>
            </motion.button>
          </div>

          {/* Right side buttons for mobile and desktop */}
          <div className="flex items-center lg:space-x-0">
            {/* Mobile Quote Button */}
            <motion.button
              onClick={toggleQuoteModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-200 shadow-lg mr-3"
            >
              <FileText className="h-4 w-4" />
            </motion.button>

            {/* Language Selector */}
            <div className="relative mr-3 lg:mr-0">
              <motion.button
                onClick={toggleLanguageDropdown}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 lg:w-auto lg:h-auto lg:space-x-1 xl:space-x-1.5 lg:px-1.5 xl:px-2 py-1.5 lg:py-2 text-white rounded-lg transition-all duration-200 backdrop-blur-sm bg-slate-800/60 hover:bg-slate-700/60"
                style={{ border: '1px solid rgba(178, 178, 178, 0.1)' }}
              >
                <Image 
                  src={`/flags/${selectedLanguage.code}.svg`}
                  alt={`${selectedLanguage.countryCode} flag`}
                  width={32}
                  height={24}
                  className="w-7 h-5 lg:w-8 lg:h-6 rounded-sm"
                />
                <ChevronDown className={`hidden lg:block h-4 w-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-28 sm:w-32 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl py-2 z-50"
                    style={{ border: '1px solid rgba(178, 178, 178, 0.1)' }}
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => selectLanguage(language)}
                        className={`w-full flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 text-sm text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all duration-200 rounded-lg ${
                          selectedLanguage.code === language.code ? 'bg-slate-700/80 text-white shadow-lg' : ''
                        }`}
                      >
                        <Image 
                          src={`/flags/${language.code}.svg`}
                          alt={`${language.countryCode} flag`}
                          width={32}
                          height={24}
                          className="w-6 h-4 sm:w-8 sm:h-6 rounded-sm shadow-sm"
                        />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900"
            style={{ borderTop: '1px solid rgba(178, 178, 178, 0.1)' }}
          >
            <div className="px-4 py-6">
              <Navigation isMobile onClose={() => setIsMobileMenuOpen(false)} />
              
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </motion.header>
  )
}

