"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, FileText, ChevronDown, Globe } from "lucide-react"
import { Logo } from "./logo"
import { Navigation } from "./navigation"
import { QuoteModal } from "./quote-modal"

const languages = [
  { code: 'tr', flag: '/flags/tr.svg' },
  { code: 'en', flag: '/flags/en.svg' },
  { code: 'de', flag: '/flags/de.svg' },
  { code: 'fr', flag: '/flags/fr.svg' },
  { code: 'ru', flag: '/flags/ru.svg' },
  { code: 'ar', flag: '/flags/ar.svg' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

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
    setIsLanguageDropdownOpen(false)
  }

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative">
                <Image 
                  src="/transparent.png" 
                  alt="Softiel Logo" 
                  width={40} 
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">Softiel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">

            {/* Quote Request Button */}
            <motion.button
              onClick={toggleQuoteModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:space-x-2 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-lg"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-medium">Teklif Al</span>
            </motion.button>

            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={toggleLanguageDropdown}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:space-x-2 sm:px-3 py-2 text-white rounded-xl transition-all duration-200 backdrop-blur-sm bg-slate-800/60 hover:bg-slate-700/60"
                style={{ border: '1px solid rgba(178, 178, 178, 0.1)' }}
              >
                <Image 
                  src={selectedLanguage.flag} 
                  alt={`${selectedLanguage.code} flag`} 
                  width={28} 
                  height={20}
                  className="w-6 h-4 sm:w-7 sm:h-5 object-cover rounded-sm"
                />
                <ChevronDown className={`hidden sm:block h-4 w-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
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
                          src={language.flag} 
                          alt={`${language.code} flag`} 
                          width={32} 
                          height={24}
                          className="w-6 h-4 sm:w-8 sm:h-6 object-cover rounded-sm shadow-sm"
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

