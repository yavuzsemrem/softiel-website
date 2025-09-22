"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight,
  Globe,
  Sparkles,
  Zap,
  Award,
  Shield,
  Share2,
  Users
} from "lucide-react"
import { Logo } from "./logo"
import { PrivacyModal } from "./privacy-modal"
import { TermsModal } from "./terms-modal"
import { CookieModal } from "./cookie-modal"
import { useI18n } from "@/contexts/i18n-context"

// Footer links will be generated dynamically with i18n

const socialLinks = [
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/softieldev/", 
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    hoverGradient: "hover:from-pink-500/40 hover:to-purple-500/40",
    hoverBorder: "hover:border-pink-400/80",
    hoverShadow: "hover:shadow-pink-500/30"
  },
  { 
    name: "Facebook", 
    href: "https://www.facebook.com/people/Softiel/61578774434444/?ref=pl_edit_xav_ig_profile_page_web#", 
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    hoverGradient: "hover:from-blue-500/40 hover:to-indigo-500/40",
    hoverBorder: "hover:border-blue-400/80",
    hoverShadow: "hover:shadow-blue-500/30"
  },
  { 
    name: "X (Twitter)", 
    href: "https://x.com/Softieldev", 
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    hoverGradient: "hover:from-slate-600/40 hover:to-slate-700/40",
    hoverBorder: "hover:border-slate-400/80",
    hoverShadow: "hover:shadow-slate-500/30"
  },
  { 
    name: "TikTok", 
    href: "https://www.tiktok.com/@softieldev", 
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    hoverGradient: "hover:from-emerald-500/40 hover:to-teal-500/40",
    hoverBorder: "hover:border-emerald-400/80",
    hoverShadow: "hover:shadow-emerald-500/30"
  },
]

export function Footer() {
  const { t, getLocalizedUrl } = useI18n()
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false)

  // Footer links with i18n and localized URLs
  const footerLinks = {
    services: [
      { name: t('services.webDesign', 'Web Sitesi Tasarımı'), href: getLocalizedUrl("/hizmetlerimiz/web-sitesi-tasarimi") },
      { name: t('services.webDevelopment', 'Web Geliştirme'), href: getLocalizedUrl("/hizmetlerimiz/web-gelistirme") },
      { name: t('services.mobileApp', 'Mobil Uygulama'), href: getLocalizedUrl("/hizmetlerimiz/mobil-uygulama-gelistirme") },
      { name: t('services.seo', 'SEO Optimizasyonu'), href: getLocalizedUrl("/hizmetlerimiz/seo-arama-motoru-optimizasyonu") },
      { name: t('services.googleAds', 'Google Ads Yönetimi'), href: getLocalizedUrl("/hizmetlerimiz/google-ads-meta-ads-yonetimi") },
      { name: t('services.aiIntegration', 'Yapay Zeka Entegrasyonu'), href: getLocalizedUrl("/hizmetlerimiz/yapay-zeka-entegrasyonlari") },
      { name: t('services.wordpress', 'WordPress Çözümleri'), href: getLocalizedUrl("/hizmetlerimiz/wordpress-cms-cozumleri") },
      { name: t('services.logoDesign', 'Logo & Kurumsal Kimlik'), href: getLocalizedUrl("/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi") },
    ],
    pages: [
      { name: t('navigation.home', 'Ana Sayfa'), href: getLocalizedUrl("/") },
      { name: t('navigation.about', 'Hakkımızda'), href: getLocalizedUrl("/hakkimizda") },
      { name: t('navigation.services', 'Hizmetlerimiz'), href: getLocalizedUrl("/hizmetlerimiz") },
      { name: t('navigation.references', 'Projelerimiz'), href: getLocalizedUrl("/projelerimiz") },
      { name: t('navigation.pricing', 'Fiyatlandırma'), href: getLocalizedUrl("/fiyatlandirma") },
      { name: t('navigation.blog', 'Blog'), href: getLocalizedUrl("/blog") },
      { name: t('navigation.contact', 'İletişim'), href: getLocalizedUrl("/iletisim") },
    ]
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-slate-900 text-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-center md:items-start">
            {/* Company Info */}
            <div className="lg:col-span-1 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col h-full text-center md:text-left"
              >
                {/* Logo */}
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  <div className="w-12 h-12 relative">
                    <Image 
                      src="/transparent.png" 
                      alt="Softiel Logo" 
                      width={48} 
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">{t('footer.brandName', 'Softiel')}</span>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
                  {t('footer.description', 'Dijital dünyada fark yaratan çözümler üretiyoruz. Web tasarımından mobil uygulamalara, SEO\'dan yapay zeka entegrasyonlarına kadar geniş bir yelpazede hizmet veriyoruz.')}
                </p>

                {/* Social Media */}
                <div className="mb-6">
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          scale: 1.1, 
                          y: -3,
                          rotate: 5
                        }}
                        whileTap={{ 
                          scale: 0.9,
                          rotate: -5
                        }}
                        className={`group relative p-3 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 ${social.hoverGradient} transition-all duration-200 hover:shadow-lg ${social.hoverShadow} backdrop-blur-sm`}
                        style={{ border: '1px solid rgba(178, 178, 178, 0.1)' }}
                        aria-label={social.name}
                      >
                        <div className="relative z-10">
                          <social.icon />
                        </div>
                        {/* Hover glow effect */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-transparent group-hover:${social.hoverGradient.replace('hover:', '')} transition-all duration-200`}></div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Services */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col h-full text-center md:text-left"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-start">
                  <Zap className="h-5 w-5 text-cyan-400 mr-2" />
                  {t('footer.services', 'Hizmetlerimiz')}
                </h3>
                <ul className="space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-200 block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Pages */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col h-full text-center md:text-left"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-start">
                  <Globe className="h-5 w-5 text-blue-400 mr-2" />
                  {t('footer.quickLinks', 'Sayfalarımız')}
                </h3>
                <ul className="space-y-2">
                  {footerLinks.pages.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-blue-400 transition-colors duration-200 block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col h-full text-center md:text-left"
              >
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center justify-center md:justify-start">
                  <Phone className="h-5 w-5 text-blue-400 mr-2" />
                  {t('footer.contactInfo', 'İletişim Bilgileri')}
                </h3>
                
                {/* Contact Cards */}
                <div className="space-y-4">
                  {/* Email Card */}
                  <motion.a 
                    href="mailto:info@softiel.com"
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group block p-3 md:p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border transition-all duration-200 max-w-xs mx-auto md:max-w-none md:mx-0"
                    style={{ border: '1px solid rgba(178, 178, 178, 0.1)' }}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-xs font-medium text-blue-400 mb-1">{t('footer.email', 'E-posta')}</p>
                        <p className="text-sm font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">info@softiel.com</p>
                      </div>
                    </div>
                  </motion.a>

                  {/* Phone Card */}
                  <motion.a 
                    href="tel:+905411883045"
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group block p-3 md:p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border transition-all duration-200 max-w-xs mx-auto md:max-w-none md:mx-0"
                    style={{ border: '1px solid rgba(178, 178, 178, 0.1)' }}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-xs font-medium text-blue-400 mb-1">{t('footer.phone', 'Telefon')}</p>
                        <p className="text-sm font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">0541 188 30 45</p>
                      </div>
                    </div>
                  </motion.a>

                  {/* Address Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group block p-3 md:p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm border transition-all duration-200 max-w-xs mx-auto md:max-w-none md:mx-0"
                    style={{ border: '1px solid rgba(178, 178, 178, 0.1)' }}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-xs font-medium text-blue-400 mb-1">{t('footer.address', 'Adres')}</p>
                        <p className="text-sm font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">İstanbul, Türkiye</p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </div>
            </div>
          </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-slate-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sm text-slate-400">
              © 2025 {t('footer.brandName', 'Softiel')}. {t('footer.allRightsReserved', 'Tüm hakları saklıdır.')}
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {t('footer.privacyPolicy', 'Gizlilik Politikası')}
              </button>
              <button
                onClick={() => setIsTermsModalOpen(true)}
                className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {t('footer.termsOfService', 'Kullanım Koşulları')}
              </button>
              <button
                onClick={() => setIsCookieModalOpen(true)}
                className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {t('footer.cookiePolicy', 'Çerez Politikası')}
              </button>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <span>{t('common.scrollToTop', 'Yukarı Çık')}</span>
              <ArrowUpRight className="h-4 w-4 rotate-[-45deg]" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
      <CookieModal 
        isOpen={isCookieModalOpen} 
        onClose={() => setIsCookieModalOpen(false)} 
      />
    </footer>
  )
}

