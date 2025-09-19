"use client"

import React, { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { 
  Settings, 
  Globe, 
  Mail, 
  Palette,
  Database,
  Server,
  Shield,
  Bell,
  Users,
  User,
  FileText,
  Image,
  Save,
  RefreshCw,
  Upload,
  Download,
  Eye,
  EyeOff,
  Edit,
  X,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react"

// Demo ayar verileri
const demoSettings = {
  general: {
    siteName: "Softiel",
    siteDescription: "Dijital Çözümler ve Web Tasarım Hizmetleri",
    siteUrl: "https://softiel.com",
    adminEmail: "admin@softiel.com",
    timezone: "Europe/Istanbul",
    language: "tr",
    maintenanceMode: false
  },
  appearance: {
    theme: "dark",
    primaryColor: "#06b6d4",
    secondaryColor: "#3b82f6",
    logo: "/images/logo.png",
    favicon: "/favicon.ico",
    customCss: "",
    customJs: ""
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "noreply@softiel.com",
    smtpPassword: "••••••••••••",
    smtpEncryption: "tls",
    fromName: "Softiel",
    fromEmail: "noreply@softiel.com"
  },
  social: {
    facebook: "https://facebook.com/softiel",
    twitter: "https://twitter.com/softiel",
    instagram: "https://instagram.com/softiel",
    linkedin: "https://linkedin.com/company/softiel",
    youtube: "https://youtube.com/softiel"
  },
  seo: {
    metaTitle: "Softiel - Dijital Çözümler",
    metaDescription: "Profesyonel web tasarım ve dijital pazarlama hizmetleri",
    metaKeywords: "web tasarım, dijital pazarlama, SEO",
    googleAnalytics: "GA-XXXXXXXXX",
    googleSearchConsole: "verified",
    sitemapUrl: "https://softiel.com/sitemap.xml"
  },
  backup: {
    autoBackup: true,
    backupFrequency: "daily",
    lastBackup: "2024-12-15T10:30:00Z",
    backupLocation: "cloud",
    retentionDays: 30
  }
}

// useSearchParams kullanan iç component
function SettingsManagementContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState(demoSettings)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@softiel.com",
    phone: "+90 555 123 45 67",
    role: "Super Admin"
  })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  // URL parametresinden tab'ı oku
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['profile', 'general', 'appearance', 'email', 'social', 'seo', 'backup'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleSave = () => {
    setIsSaving(true)
    // Simulate save
    setTimeout(() => {
      setIsSaving(false)
      alert("Ayarlar başarıyla kaydedildi!")
    }, 2000)
  }

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const SettingCard = ({ title, description, icon: Icon, color, bgColor }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 border border-white/20 hover:shadow-modern transition-all duration-300"
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
      </div>
    </motion.div>
  )

  const tabs = [
    { id: "profile", name: "Profil Ayarları", icon: User },
    { id: "general", name: "Genel", icon: Settings },
    { id: "appearance", name: "Görünüm", icon: Palette },
    { id: "email", name: "E-posta", icon: Mail },
    { id: "social", name: "Sosyal Medya", icon: Globe },
    { id: "seo", name: "SEO", icon: FileText },
    { id: "backup", name: "Yedekleme", icon: Database }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Site Ayarları</h2>
          <p className="text-neutral-400">Sitenizi yapılandırın ve özelleştirin</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50"
            style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
          >
            <Save className={`h-5 w-5 ${isSaving ? 'animate-spin' : ''}`} />
            <span>{isSaving ? 'Kaydediliyor...' : 'Kaydet'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass rounded-xl p-2 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white shadow-modern'
                  : 'text-neutral-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-lg font-semibold text-white mb-6">Profil Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="Ad soyadınızı girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">E-posta</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="E-posta adresinizi girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="Telefon numaranızı girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Rol</label>
                <select
                  value={profileData.role}
                  onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Author">Author</option>
                </select>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-lg font-semibold text-white mb-6">Güvenlik Ayarları</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Mevcut Şifre</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="Mevcut şifrenizi girin"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Yeni Şifre</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Yeni şifrenizi girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Şifre Tekrar</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Şifrenizi tekrar girin"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="w-4 h-4 text-cyan-500 bg-neutral-700 border-neutral-600 rounded focus:ring-cyan-500"
                />
                <label htmlFor="twoFactor" className="text-sm text-neutral-300">
                  İki faktörlü kimlik doğrulama (2FA)
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* General Tab */}
      {activeTab === "general" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Genel Ayarlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Site Adı</label>
              <input
                type="text"
                value={settings.general.siteName}
                onChange={(e) => handleInputChange("general", "siteName", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Site adını girin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Site URL</label>
              <input
                type="url"
                value={settings.general.siteUrl}
                onChange={(e) => handleInputChange("general", "siteUrl", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="https://example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-300 mb-2">Site Açıklaması</label>
              <textarea
                value={settings.general.siteDescription}
                onChange={(e) => handleInputChange("general", "siteDescription", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Site açıklamasını girin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Admin E-posta</label>
              <input
                type="email"
                value={settings.general.adminEmail}
                onChange={(e) => handleInputChange("general", "adminEmail", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Dil</label>
              <select
                value={settings.general.language}
                onChange={(e) => handleInputChange("general", "language", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.general.maintenanceMode}
                  onChange={(e) => handleInputChange("general", "maintenanceMode", e.target.checked)}
                  className="w-4 h-4 text-cyan-500 bg-neutral-700 border-neutral-600 rounded focus:ring-cyan-500"
                />
                <label htmlFor="maintenanceMode" className="text-sm text-neutral-300">
                  Bakım modunu etkinleştir
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-lg font-semibold text-white mb-6">Tema Ayarları</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Tema</label>
                <select
                  value={settings.appearance.theme}
                  onChange={(e) => handleInputChange("appearance", "theme", e.target.value)}
                  className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <option value="dark">Koyu Tema</option>
                  <option value="light">Açık Tema</option>
                  <option value="auto">Otomatik</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Ana Renk</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleInputChange("appearance", "primaryColor", e.target.value)}
                    className="w-12 h-12 rounded-lg border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleInputChange("appearance", "primaryColor", e.target.value)}
                    className="flex-1 px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="#06b6d4"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-lg font-semibold text-white mb-6">Logo ve Görseller</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Logo</label>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-neutral-700 rounded-lg flex items-center justify-center">
                    <Image className="h-8 w-8 text-neutral-400" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-4 py-3 glass rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Favicon</label>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-neutral-700 rounded-lg flex items-center justify-center">
                    <Globe className="h-8 w-8 text-neutral-400" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-4 py-3 glass rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Email Tab */}
      {activeTab === "email" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">E-posta Ayarları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">SMTP Sunucu</label>
              <input
                type="text"
                value={settings.email.smtpHost}
                onChange={(e) => handleInputChange("email", "smtpHost", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Port</label>
              <input
                type="number"
                value={settings.email.smtpPort}
                onChange={(e) => handleInputChange("email", "smtpPort", parseInt(e.target.value))}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="587"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Kullanıcı Adı</label>
              <input
                type="text"
                value={settings.email.smtpUsername}
                onChange={(e) => handleInputChange("email", "smtpUsername", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="noreply@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Şifre</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={settings.email.smtpPassword}
                  onChange={(e) => handleInputChange("email", "smtpPassword", e.target.value)}
                  className="w-full px-4 py-3 pr-10 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Gönderen Adı</label>
              <input
                type="text"
                value={settings.email.fromName}
                onChange={(e) => handleInputChange("email", "fromName", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Softiel"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Gönderen E-posta</label>
              <input
                type="email"
                value={settings.email.fromEmail}
                onChange={(e) => handleInputChange("email", "fromEmail", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="noreply@softiel.com"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Social Media Tab */}
      {activeTab === "social" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Sosyal Medya Hesapları</h3>
          <div className="space-y-4">
            {Object.entries(settings.social).map(([platform, url]) => (
              <div key={platform} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-neutral-300 mb-1 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    value={url as string}
                    onChange={(e) => handleInputChange("social", platform, e.target.value)}
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder={`https://${platform}.com/softiel`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* SEO Tab */}
      {activeTab === "seo" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">SEO Ayarları</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Meta Başlık</label>
              <input
                type="text"
                value={settings.seo.metaTitle}
                onChange={(e) => handleInputChange("seo", "metaTitle", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Site başlığı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Meta Açıklama</label>
              <textarea
                value={settings.seo.metaDescription}
                onChange={(e) => handleInputChange("seo", "metaDescription", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Site açıklaması"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Google Analytics ID</label>
              <input
                type="text"
                value={settings.seo.googleAnalytics}
                onChange={(e) => handleInputChange("seo", "googleAnalytics", e.target.value)}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="GA-XXXXXXXXX"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Backup Tab */}
      {activeTab === "backup" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-lg font-semibold text-white mb-6">Yedekleme Ayarları</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Otomatik Yedekleme</h4>
                  <p className="text-xs text-neutral-400">Düzenli aralıklarla otomatik yedekleme yap</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.backup.autoBackup}
                  onChange={(e) => handleInputChange("backup", "autoBackup", e.target.checked)}
                  className="w-4 h-4 text-cyan-500 bg-neutral-700 border-neutral-600 rounded focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Yedekleme Sıklığı</label>
                <select
                  value={settings.backup.backupFrequency}
                  onChange={(e) => handleInputChange("backup", "backupFrequency", e.target.value)}
                  className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <option value="daily">Günlük</option>
                  <option value="weekly">Haftalık</option>
                  <option value="monthly">Aylık</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
                        style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                  <Download className="h-4 w-4" />
                  <span>Yedek İndir</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 glass rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                        style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                  <Upload className="h-4 w-4" />
                  <span>Yedek Yükle</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Ana component - Suspense ile sarmalanmış
export function SettingsManagement() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8">
      <div className="text-white">Yükleniyor...</div>
    </div>}>
      <SettingsManagementContent />
    </Suspense>
  )
}
