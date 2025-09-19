"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye, 
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap
} from "lucide-react"

// Demo istatistik verileri
const demoStats = {
  overview: {
    totalViews: 15847,
    uniqueVisitors: 3241,
    avgSessionDuration: "2:34",
    bounceRate: 42.3,
    conversionRate: 3.2,
    pageViews: 28456,
    newVisitors: 2156,
    returningVisitors: 1085
  },
  trafficSources: [
    { name: "Organik Arama", value: 45, color: "from-blue-500 to-blue-600", change: "+12%" },
    { name: "Sosyal Medya", value: 28, color: "from-purple-500 to-purple-600", change: "+8%" },
    { name: "Direkt", value: 15, color: "from-green-500 to-green-600", change: "+5%" },
    { name: "Referans", value: 12, color: "from-orange-500 to-orange-600", change: "-2%" }
  ],
  deviceBreakdown: [
    { device: "Masaüstü", percentage: 58, icon: Monitor, color: "text-blue-500", change: "+3%" },
    { device: "Mobil", percentage: 35, icon: Smartphone, color: "text-green-500", change: "+7%" },
    { device: "Tablet", percentage: 7, icon: Globe, color: "text-purple-500", change: "-1%" }
  ],
  topPages: [
    { page: "/hakkimizda", views: 1245, change: "+12%", avgTime: "3:24" },
    { page: "/hizmetlerimiz", views: 892, change: "+8%", avgTime: "2:45" },
    { page: "/blog", views: 756, change: "+15%", avgTime: "4:12" },
    { page: "/iletisim", views: 634, change: "+5%", avgTime: "2:18" },
    { page: "/fiyatlandirma", views: 523, change: "+22%", avgTime: "3:56" }
  ],
  recentActivity: [
    { action: "Yeni blog yazısı eklendi", user: "Admin", time: "2 saat önce", type: "blog" },
    { action: "Kategori güncellendi", user: "Elif Demir", time: "4 saat önce", type: "category" },
    { action: "Yorum onaylandı", user: "Admin", time: "6 saat önce", type: "comment" },
    { action: "Kullanıcı kaydı", user: "Sistem", time: "8 saat önce", type: "user" }
  ]
}

export function StatsManagement() {
  const [timeRange, setTimeRange] = useState("7gün")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [stats, setStats] = useState(demoStats)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const StatCard = ({ title, value, change, icon: Icon, color, bgColor }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 border border-white/20 hover:shadow-modern transition-all duration-300"
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="flex items-center space-x-1">
          {change?.startsWith('+') ? (
            <ArrowUpRight className="h-4 w-4 text-green-400" />
          ) : change?.startsWith('-') ? (
            <ArrowDownRight className="h-4 w-4 text-red-400" />
          ) : null}
          <span className={`text-sm font-medium ${
            change?.startsWith('+') ? 'text-green-400' : 
            change?.startsWith('-') ? 'text-red-400' : 'text-neutral-400'
          }`}>
            {change}
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-neutral-400">{title}</p>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Site İstatistikleri</h2>
          <p className="text-neutral-400">Son {timeRange} verileri</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="24saat">Son 24 Saat</option>
            <option value="7gün">Son 7 Gün</option>
            <option value="30gün">Son 30 Gün</option>
            <option value="90gün">Son 90 Gün</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50"
            style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Yenile</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Görüntüleme"
          value={stats.overview.totalViews.toLocaleString()}
          change="+12%"
          icon={Eye}
          color="text-blue-500"
          bgColor="rgba(59, 130, 246, 0.1)"
        />
        <StatCard
          title="Benzersiz Ziyaretçi"
          value={stats.overview.uniqueVisitors.toLocaleString()}
          change="+8%"
          icon={Users}
          color="text-green-500"
          bgColor="rgba(34, 197, 94, 0.1)"
        />
        <StatCard
          title="Ortalama Oturum"
          value={stats.overview.avgSessionDuration}
          change="+5%"
          icon={Clock}
          color="text-purple-500"
          bgColor="rgba(168, 85, 247, 0.1)"
        />
        <StatCard
          title="Çıkış Oranı"
          value={`%${stats.overview.bounceRate}`}
          change="-3%"
          icon={TrendingDown}
          color="text-orange-500"
          bgColor="rgba(249, 115, 22, 0.1)"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Trafik Kaynakları</h3>
            <Globe className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="space-y-4">
            {stats.trafficSources.map((source, index) => (
              <div key={source.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">{source.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">{source.value}%</span>
                    <span className="text-xs text-green-400">{source.change}</span>
                  </div>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${source.color}`}
                    style={{ width: `${source.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Cihaz Dağılımı</h3>
            <Monitor className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="space-y-4">
            {stats.deviceBreakdown.map((device, index) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <device.icon className={`h-5 w-5 ${device.color}`} />
                  <span className="text-sm text-neutral-300">{device.device}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white">{device.percentage}%</span>
                  <span className="text-xs text-green-400">{device.change}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 border border-white/20"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">En Popüler Sayfalar</h3>
          <BarChart3 className="h-5 w-5 text-neutral-400" />
        </div>
        <div className="space-y-4">
          {stats.topPages.map((page, index) => (
            <div key={page.page} className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/5 transition-all duration-200"
                 style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{page.page}</p>
                  <p className="text-xs text-neutral-400">Ortalama süre: {page.avgTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{page.views.toLocaleString()}</p>
                  <p className="text-xs text-neutral-400">görüntüleme</p>
                </div>
                <div className="flex items-center space-x-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">{page.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 border border-white/20"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Son Aktiviteler</h3>
          <Activity className="h-5 w-5 text-neutral-400" />
        </div>
        <div className="space-y-3">
          {stats.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 glass rounded-lg hover:bg-white/5 transition-all duration-200"
                 style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activity.type === 'blog' ? 'bg-blue-500/20' :
                activity.type === 'category' ? 'bg-green-500/20' :
                activity.type === 'comment' ? 'bg-purple-500/20' :
                'bg-orange-500/20'
              }`}>
                {activity.type === 'blog' ? <BarChart3 className="h-4 w-4 text-blue-400" /> :
                 activity.type === 'category' ? <Target className="h-4 w-4 text-green-400" /> :
                 activity.type === 'comment' ? <Users className="h-4 w-4 text-purple-400" /> :
                 <Zap className="h-4 w-4 text-orange-400" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-neutral-400">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}




