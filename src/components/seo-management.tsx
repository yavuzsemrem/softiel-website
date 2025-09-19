"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  FileText,
  Image,
  Link,
  Zap,
  BarChart3,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Edit,
  Save,
  X
} from "lucide-react"

// Demo SEO verileri
const demoSEData = {
  metaTags: {
    title: "Softiel - Dijital Çözümler ve Web Tasarım Hizmetleri",
    description: "Profesyonel web tasarım, mobil uygulama geliştirme, SEO ve dijital pazarlama hizmetleri. Modern ve etkili çözümlerle işinizi büyütün.",
    keywords: "web tasarım, mobil uygulama, SEO, dijital pazarlama, yazılım geliştirme",
    author: "Softiel",
    robots: "index, follow",
    canonical: "https://softiel.com"
  },
  pageAnalysis: [
    {
      page: "/",
      title: "Ana Sayfa",
      score: 95,
      issues: 2,
      suggestions: [
        "Meta description uzunluğu optimize edilebilir",
        "H1 etiketi eksik"
      ]
    },
    {
      page: "/hakkimizda",
      title: "Hakkımızda",
      score: 88,
      issues: 4,
      suggestions: [
        "Alt text'ler eksik",
        "İç bağlantılar artırılabilir",
        "Sayfa hızı optimize edilebilir"
      ]
    },
    {
      page: "/hizmetlerimiz",
      title: "Hizmetlerimiz",
      score: 92,
      issues: 1,
      suggestions: [
        "Schema markup eklenebilir"
      ]
    },
    {
      page: "/blog",
      title: "Blog",
      score: 89,
      issues: 3,
      suggestions: [
        "Breadcrumb navigation eksik",
        "Related posts bölümü eklenebilir"
      ]
    }
  ],
  keywords: [
    { keyword: "web tasarım", position: 3, volume: 1200, difficulty: "Orta", trend: "up" },
    { keyword: "mobil uygulama", position: 5, volume: 800, difficulty: "Yüksek", trend: "up" },
    { keyword: "SEO hizmetleri", position: 2, volume: 1500, difficulty: "Düşük", trend: "up" },
    { keyword: "dijital pazarlama", position: 7, volume: 900, difficulty: "Orta", trend: "down" },
    { keyword: "e-ticaret sitesi", position: 12, volume: 600, difficulty: "Yüksek", trend: "up" }
  ],
  backlinks: {
    total: 156,
    quality: 89,
    domains: 45,
    recent: [
      { domain: "techcrunch.com", anchor: "Softiel web tasarım", date: "2024-12-15", type: "Dofollow" },
      { domain: "forbes.com", anchor: "dijital çözümler", date: "2024-12-14", type: "Dofollow" },
      { domain: "medium.com", anchor: "web geliştirme", date: "2024-12-13", type: "Nofollow" }
    ]
  },
  technical: {
    siteSpeed: 87,
    mobileFriendly: true,
    sslCertificate: true,
    sitemap: true,
    robotsTxt: true,
    structuredData: false
  }
}

export function SEOManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [seoData, setSeoData] = useState(demoSEData)
  const [metaTags, setMetaTags] = useState(seoData.metaTags)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleSaveMetaTags = () => {
    setSeoData(prev => ({
      ...prev,
      metaTags: metaTags
    }))
    alert("Meta etiketleri güncellendi!")
  }

  const ScoreCard = ({ title, score, maxScore = 100, icon: Icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 border border-white/20 hover:shadow-modern transition-all duration-300"
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{score}</div>
          <div className="text-sm text-neutral-400">/{maxScore}</div>
        </div>
      </div>
      <div className="w-full bg-neutral-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${
            score >= 90 ? 'bg-green-500' :
            score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${(score / maxScore) * 100}%` }}
        />
      </div>
    </motion.div>
  )

  const tabs = [
    { id: "overview", name: "Genel Bakış", icon: BarChart3 },
    { id: "meta", name: "Meta Etiketler", icon: FileText },
    { id: "pages", name: "Sayfa Analizi", icon: Target },
    { id: "keywords", name: "Anahtar Kelimeler", icon: Search },
    { id: "technical", name: "Teknik SEO", icon: Settings }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">SEO Yönetimi</h2>
          <p className="text-neutral-400">Site performansını optimize edin</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50"
            style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
          >
            <RefreshCw className={`h-5 w-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analiz Ediliyor...' : 'Analiz Et'}</span>
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

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* SEO Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScoreCard
              title="Genel Skor"
              score={89}
              icon={TrendingUp}
              color="bg-gradient-to-r from-green-500 to-green-600"
            />
            <ScoreCard
              title="Sayfa Hızı"
              score={seoData.technical.siteSpeed}
              icon={Zap}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
            />
            <ScoreCard
              title="Mobil Uyumluluk"
              score={seoData.technical.mobileFriendly ? 100 : 0}
              icon={Globe}
              color="bg-gradient-to-r from-purple-500 to-purple-600"
            />
            <ScoreCard
              title="Teknik SEO"
              score={75}
              icon={Settings}
              color="bg-gradient-to-r from-orange-500 to-orange-600"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 border border-white/20"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Anahtar Kelime Performansı</h3>
              <div className="space-y-3">
                {seoData.keywords.slice(0, 3).map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-300">{keyword.keyword}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white">#{keyword.position}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        keyword.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {keyword.trend === 'up' ? '↗' : '↘'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 border border-white/20"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Backlink Durumu</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Toplam Backlink</span>
                  <span className="text-sm font-medium text-white">{seoData.backlinks.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Kalite Skoru</span>
                  <span className="text-sm font-medium text-white">{seoData.backlinks.quality}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Referans Domain</span>
                  <span className="text-sm font-medium text-white">{seoData.backlinks.domains}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Meta Tags Tab */}
      {activeTab === "meta" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Meta Etiketleri</h3>
            <button
              onClick={handleSaveMetaTags}
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <Save className="h-5 w-5" />
              <span>Kaydet</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Sayfa Başlığı</label>
              <input
                type="text"
                value={metaTags.title}
                onChange={(e) => setMetaTags(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Sayfa başlığını girin"
              />
              <p className="text-xs text-neutral-400 mt-1">{metaTags.title.length}/60 karakter</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Meta Açıklama</label>
              <textarea
                value={metaTags.description}
                onChange={(e) => setMetaTags(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Meta açıklamasını girin"
              />
              <p className="text-xs text-neutral-400 mt-1">{metaTags.description.length}/160 karakter</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Anahtar Kelimeler</label>
              <input
                type="text"
                value={metaTags.keywords}
                onChange={(e) => setMetaTags(prev => ({ ...prev, keywords: e.target.value }))}
                className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Anahtar kelimeleri virgülle ayırın"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Yazar</label>
                <input
                  type="text"
                  value={metaTags.author}
                  onChange={(e) => setMetaTags(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="Yazar adı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Robots</label>
                <select
                  value={metaTags.robots}
                  onChange={(e) => setMetaTags(prev => ({ ...prev, robots: e.target.value }))}
                  className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, follow">No Index, Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pages Analysis Tab */}
      {activeTab === "pages" && (
        <div className="space-y-6">
          {seoData.pageAnalysis.map((page, index) => (
            <motion.div
              key={page.page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 border border-white/20 hover:shadow-modern transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    page.score >= 90 ? 'bg-green-500/20' :
                    page.score >= 70 ? 'bg-yellow-500/20' : 'bg-red-500/20'
                  }`}>
                    <Target className={`h-5 w-5 ${
                      page.score >= 90 ? 'text-green-400' :
                      page.score >= 70 ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{page.title}</h3>
                    <p className="text-sm text-neutral-400">{page.page}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{page.score}</div>
                  <div className="text-sm text-neutral-400">puan</div>
                </div>
              </div>

              <div className="w-full bg-neutral-700 rounded-full h-2 mb-4">
                <div 
                  className={`h-2 rounded-full ${
                    page.score >= 90 ? 'bg-green-500' :
                    page.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${page.score}%` }}
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Öneriler:</h4>
                {page.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-300">{suggestion}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Keywords Tab */}
      {activeTab === "keywords" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Anahtar Kelime Takibi</h3>
          <div className="space-y-4">
            {seoData.keywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/5 transition-all duration-200"
                   style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{keyword.position}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{keyword.keyword}</h4>
                    <p className="text-xs text-neutral-400">{keyword.volume} aylık arama</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-neutral-300">Zorluk</p>
                    <p className="text-sm font-medium text-white">{keyword.difficulty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-300">Trend</p>
                    <div className={`flex items-center space-x-1 ${
                      keyword.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {keyword.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingUp className="h-4 w-4 rotate-180" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Technical SEO Tab */}
      {activeTab === "technical" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 border border-white/20"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Teknik Kontroller</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">SSL Sertifikası</span>
                <div className="flex items-center space-x-2">
                  {seoData.technical.sslCertificate ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span className="text-sm text-white">
                    {seoData.technical.sslCertificate ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Sitemap</span>
                <div className="flex items-center space-x-2">
                  {seoData.technical.sitemap ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span className="text-sm text-white">
                    {seoData.technical.sitemap ? 'Mevcut' : 'Eksik'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Robots.txt</span>
                <div className="flex items-center space-x-2">
                  {seoData.technical.robotsTxt ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span className="text-sm text-white">
                    {seoData.technical.robotsTxt ? 'Mevcut' : 'Eksik'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Structured Data</span>
                <div className="flex items-center space-x-2">
                  {seoData.technical.structuredData ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span className="text-sm text-white">
                    {seoData.technical.structuredData ? 'Mevcut' : 'Eksik'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 border border-white/20"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Performans</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-300">Sayfa Hızı</span>
                  <span className="text-sm font-medium text-white">{seoData.technical.siteSpeed}/100</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      seoData.technical.siteSpeed >= 90 ? 'bg-green-500' :
                      seoData.technical.siteSpeed >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${seoData.technical.siteSpeed}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-300">Mobil Uyumluluk</span>
                  <span className="text-sm font-medium text-white">
                    {seoData.technical.mobileFriendly ? '100/100' : '0/100'}
                  </span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      seoData.technical.mobileFriendly ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${seoData.technical.mobileFriendly ? 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}




