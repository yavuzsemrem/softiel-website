"use client"

import React from "react"
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
  Monitor
} from "lucide-react"

export function DashboardAnalytics() {
  const analyticsData = {
    overview: {
      totalViews: 15847,
      uniqueVisitors: 3241,
      avgSessionDuration: "2:34",
      bounceRate: 42.3,
      conversionRate: 3.2
    },
    trafficSources: [
      { name: "Organik Arama", value: 45, color: "from-blue-500 to-blue-600" },
      { name: "Sosyal Medya", value: 28, color: "from-purple-500 to-purple-600" },
      { name: "Direkt", value: 15, color: "from-green-500 to-green-600" },
      { name: "Referans", value: 12, color: "from-orange-500 to-orange-600" }
    ],
    deviceBreakdown: [
      { device: "Masaüstü", percentage: 58, icon: Monitor, color: "text-blue-500" },
      { device: "Mobil", percentage: 35, icon: Smartphone, color: "text-green-500" },
      { device: "Tablet", percentage: 7, icon: Globe, color: "text-purple-500" }
    ],
    topPages: [
      { page: "/hakkimizda", views: 1245, change: "+12%" },
      { page: "/hizmetlerimiz", views: 892, change: "+8%" },
      { page: "/blog", views: 756, change: "+15%" },
      { page: "/iletisim", views: 634, change: "+5%" }
    ]
  }

  return (
    <section className="relative py-6 lg:py-8">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Site{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Analitikleri
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Web sitenizin performansını detaylı olarak takip edin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {[
                {
                  title: "Toplam Görüntülenme",
                  value: analyticsData.overview.totalViews.toLocaleString(),
                  icon: Eye,
                  color: "from-blue-500 to-blue-600",
                  change: "+12%",
                  changeType: "positive"
                },
                {
                  title: "Benzersiz Ziyaretçi",
                  value: analyticsData.overview.uniqueVisitors.toLocaleString(),
                  icon: Users,
                  color: "from-green-500 to-green-600",
                  change: "+8%",
                  changeType: "positive"
                },
                {
                  title: "Ortalama Süre",
                  value: analyticsData.overview.avgSessionDuration,
                  icon: Clock,
                  color: "from-purple-500 to-purple-600",
                  change: "+5%",
                  changeType: "positive"
                },
                {
                  title: "Dönüşüm Oranı",
                  value: `${analyticsData.overview.conversionRate}%`,
                  icon: MousePointer,
                  color: "from-orange-500 to-orange-600",
                  change: "+0.3%",
                  changeType: "positive"
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="glass rounded-xl p-4 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] text-center"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <metric.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                    {metric.value}
                  </p>
                  <div className="flex items-center justify-center space-x-1">
                    {metric.changeType === 'positive' ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Traffic Sources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Trafik Kaynakları
                </h3>
              </div>
              
              <div className="space-y-4">
                {analyticsData.trafficSources.map((source, index) => (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 bg-gradient-to-r ${source.color} rounded-full`}></div>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {source.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${source.value}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${source.color} rounded-full`}
                        ></motion.div>
                      </div>
                      <span className="text-sm font-bold text-neutral-900 dark:text-white w-8 text-right">
                        {source.value}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Device Breakdown */}
            <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Cihaz Dağılımı
              </h3>
              
              <div className="space-y-4">
                {analyticsData.deviceBreakdown.map((device, index) => (
                  <motion.div
                    key={device.device}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <device.icon className={`h-5 w-5 ${device.color}`} />
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {device.device}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      {device.percentage}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Pages */}
            <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                En Popüler Sayfalar
              </h3>
              
              <div className="space-y-3">
                {analyticsData.topPages.map((page, index) => (
                  <motion.div
                    key={page.page}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {page.page}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {page.views} görüntülenme
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs font-medium text-green-500">
                        {page.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bounce Rate */}
            <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                Bounce Rate
              </h3>
              
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-neutral-200 dark:text-neutral-700"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      className="text-orange-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray={`${analyticsData.overview.bounceRate}, 100`}
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: `${analyticsData.overview.bounceRate}, 100` }}
                      transition={{ delay: 1, duration: 1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-neutral-900 dark:text-white">
                      {analyticsData.overview.bounceRate}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Ziyaretçilerin tek sayfa görüntüleme oranı
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
