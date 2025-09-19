"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Key,
  User,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Activity,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  X,
  AlertCircle,
  ShieldCheck,
  Database,
  Server
} from "lucide-react"

// Demo güvenlik verileri
const demoSecurityData = {
  overview: {
    securityScore: 92,
    lastScan: "2024-12-15T10:30:00Z",
    threatsBlocked: 1247,
    vulnerabilities: 2,
    sslStatus: "Aktif",
    firewallStatus: "Aktif"
  },
  recentActivity: [
    { action: "Başarılı giriş", user: "admin@softiel.com", ip: "192.168.1.100", time: "2 dakika önce", status: "success" },
    { action: "Başarısız giriş denemesi", user: "unknown@example.com", ip: "203.45.67.89", time: "15 dakika önce", status: "failed" },
    { action: "Şifre değiştirildi", user: "admin@softiel.com", ip: "192.168.1.100", time: "1 saat önce", status: "success" },
    { action: "Yeni cihazdan giriş", user: "admin@softiel.com", ip: "10.0.0.50", time: "3 saat önce", status: "warning" },
    { action: "Suspicious activity detected", user: "unknown@example.com", ip: "45.67.89.123", time: "6 saat önce", status: "blocked" }
  ],
  vulnerabilities: [
    {
      id: "vuln1",
      title: "Eski PHP versiyonu",
      severity: "Orta",
      description: "PHP 7.4 kullanılıyor, güncel versiyon 8.2",
      fix: "PHP versiyonunu güncelleyin",
      status: "open"
    },
    {
      id: "vuln2",
      title: "Güvenlik başlıkları eksik",
      severity: "Düşük",
      description: "CSP ve HSTS başlıkları eksik",
      fix: "Güvenlik başlıklarını ekleyin",
      status: "open"
    }
  ],
  users: [
    {
      id: "user1",
      name: "Admin",
      email: "admin@softiel.com",
      role: "Super Admin",
      lastLogin: "2024-12-15T10:30:00Z",
      status: "active",
      twoFactor: true,
      loginAttempts: 0
    },
    {
      id: "user2",
      name: "Elif Demir",
      email: "elif@softiel.com",
      role: "Editor",
      lastLogin: "2024-12-15T09:15:00Z",
      status: "active",
      twoFactor: false,
      loginAttempts: 0
    },
    {
      id: "user3",
      name: "Ahmet Yılmaz",
      email: "ahmet@softiel.com",
      role: "Author",
      lastLogin: "2024-12-14T16:45:00Z",
      status: "suspended",
      twoFactor: false,
      loginAttempts: 3
    }
  ],
  settings: {
    twoFactorAuth: true,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      expireDays: 90
    },
    loginSecurity: {
      maxAttempts: 5,
      lockoutDuration: 30,
      ipWhitelist: false,
      sessionTimeout: 60
    },
    sslSettings: {
      forceHttps: true,
      hstsEnabled: true,
      certificateExpiry: "2025-06-15"
    }
  }
}

export function SecurityManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isScanning, setIsScanning] = useState(false)
  const [securityData, setSecurityData] = useState(demoSecurityData)
  const [showPassword, setShowPassword] = useState(false)

  const handleSecurityScan = () => {
    setIsScanning(true)
    // Simulate scan
    setTimeout(() => {
      setIsScanning(false)
    }, 3000)
  }

  const handleUserAction = (userId: string, action: string) => {
    if (action === "suspend") {
      setSecurityData(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === userId 
            ? { ...user, status: user.status === "active" ? "suspended" : "active" }
            : user
        )
      }))
    } else if (action === "delete") {
      if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
        setSecurityData(prev => ({
          ...prev,
          users: prev.users.filter(user => user.id !== userId)
        }))
      }
    }
  }

  const SecurityCard = ({ title, value, icon: Icon, color, bgColor, status }: any) => (
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
        {status && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'success' ? 'bg-green-500/20 text-green-400' :
            status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
            status === 'error' ? 'bg-red-500/20 text-red-400' :
            'bg-neutral-500/20 text-neutral-400'
          }`}>
            {status}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-neutral-400">{title}</p>
    </motion.div>
  )

  const tabs = [
    { id: "overview", name: "Genel Bakış", icon: Shield },
    { id: "activity", name: "Güvenlik Aktiviteleri", icon: Activity },
    { id: "vulnerabilities", name: "Güvenlik Açıkları", icon: AlertTriangle },
    { id: "users", name: "Kullanıcı Güvenliği", icon: User },
    { id: "settings", name: "Güvenlik Ayarları", icon: Settings }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Güvenlik Yönetimi</h2>
          <p className="text-neutral-400">Site güvenliğini izleyin ve yönetin</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSecurityScan}
            disabled={isScanning}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50"
            style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
          >
            <RefreshCw className={`h-5 w-5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Taranıyor...' : 'Güvenlik Taraması'}</span>
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
          {/* Security Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SecurityCard
              title="Güvenlik Skoru"
              value={`${securityData.overview.securityScore}/100`}
              icon={ShieldCheck}
              color="text-green-500"
              bgColor="rgba(34, 197, 94, 0.1)"
              status="success"
            />
            <SecurityCard
              title="Engellenen Tehdit"
              value={securityData.overview.threatsBlocked.toLocaleString()}
              icon={Shield}
              color="text-blue-500"
              bgColor="rgba(59, 130, 246, 0.1)"
            />
            <SecurityCard
              title="Güvenlik Açığı"
              value={securityData.overview.vulnerabilities}
              icon={AlertTriangle}
              color="text-orange-500"
              bgColor="rgba(249, 115, 22, 0.1)"
              status={securityData.overview.vulnerabilities > 0 ? "warning" : "success"}
            />
            <SecurityCard
              title="SSL Durumu"
              value={securityData.overview.sslStatus}
              icon={Lock}
              color="text-purple-500"
              bgColor="rgba(168, 85, 247, 0.1)"
              status="success"
            />
          </div>

          {/* Security Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 border border-white/20"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Güvenlik Durumu</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Firewall</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-white">Aktif</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">SSL Sertifikası</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-white">Aktif</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">2FA</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-white">Etkin</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Son Tarama</span>
                  <span className="text-sm text-white">
                    {new Date(securityData.overview.lastScan).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 border border-white/20"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Hızlı Eylemler</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 glass rounded-lg hover:bg-white/5 transition-all duration-200 text-left"
                        style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <Shield className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-white">Güvenlik Raporu İndir</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 glass rounded-lg hover:bg-white/5 transition-all duration-200 text-left"
                        style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <Key className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-white">API Anahtarlarını Yenile</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 glass rounded-lg hover:bg-white/5 transition-all duration-200 text-left"
                        style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <Database className="h-5 w-5 text-purple-400" />
                  <span className="text-sm text-white">Veritabanı Yedekle</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Son Güvenlik Aktiviteleri</h3>
          <div className="space-y-3">
            {securityData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 glass rounded-lg hover:bg-white/5 transition-all duration-200"
                   style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-green-500/20' :
                  activity.status === 'failed' ? 'bg-red-500/20' :
                  activity.status === 'warning' ? 'bg-yellow-500/20' :
                  'bg-orange-500/20'
                }`}>
                  {activity.status === 'success' ? <CheckCircle className="h-5 w-5 text-green-400" /> :
                   activity.status === 'failed' ? <XCircle className="h-5 w-5 text-red-400" /> :
                   activity.status === 'warning' ? <AlertTriangle className="h-5 w-5 text-yellow-400" /> :
                   <AlertCircle className="h-5 w-5 text-orange-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-neutral-400">
                    {activity.user} • {activity.ip} • {activity.time}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'success' ? 'bg-green-500/20 text-green-400' :
                  activity.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                  activity.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Vulnerabilities Tab */}
      {activeTab === "vulnerabilities" && (
        <div className="space-y-6">
          {securityData.vulnerabilities.map((vuln, index) => (
            <motion.div
              key={vuln.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 border border-white/20 hover:shadow-modern transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    vuln.severity === 'Yüksek' ? 'bg-red-500/20' :
                    vuln.severity === 'Orta' ? 'bg-yellow-500/20' :
                    'bg-green-500/20'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      vuln.severity === 'Yüksek' ? 'text-red-400' :
                      vuln.severity === 'Orta' ? 'text-yellow-400' :
                      'text-green-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{vuln.title}</h3>
                    <p className="text-sm text-neutral-400">{vuln.description}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  vuln.severity === 'Yüksek' ? 'bg-red-500/20 text-red-400' :
                  vuln.severity === 'Orta' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {vuln.severity}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Çözüm:</h4>
                  <p className="text-sm text-neutral-300">{vuln.fix}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
                          style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                    <Edit className="h-4 w-4" />
                    <span>Düzelt</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 glass rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                          style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <X className="h-4 w-4" />
                    <span>Görmezden Gel</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 border border-white/20"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6">Kullanıcı Güvenliği</h3>
          <div className="space-y-4">
            {securityData.users.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/5 transition-all duration-200"
                   style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user.status === 'active' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    <User className={`h-5 w-5 ${
                      user.status === 'active' ? 'text-green-400' : 'text-red-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{user.name}</h4>
                    <p className="text-xs text-neutral-400">{user.email} • {user.role}</p>
                    <p className="text-xs text-neutral-500">
                      Son giriş: {new Date(user.lastLogin).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs text-neutral-400">2FA:</span>
                      {user.twoFactor ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    {user.loginAttempts > 0 && (
                      <p className="text-xs text-red-400">{user.loginAttempts} başarısız deneme</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUserAction(user.id, "suspend")}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        user.status === 'active' 
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      {user.status === 'active' ? 'Askıya Al' : 'Aktif Et'}
                    </button>
                    <button
                      onClick={() => handleUserAction(user.id, "delete")}
                      className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 border border-white/20"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Güvenlik Ayarları</h3>
            <div className="space-y-6">
              {/* Two Factor Auth */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">İki Faktörlü Kimlik Doğrulama</h4>
                  <p className="text-xs text-neutral-400">Hesap güvenliğini artırmak için 2FA'yı etkinleştirin</p>
                </div>
                <button className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  securityData.settings.twoFactorAuth
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-neutral-500/20 text-neutral-400'
                }`}>
                  {securityData.settings.twoFactorAuth ? 'Etkin' : 'Devre Dışı'}
                </button>
              </div>

              {/* Password Policy */}
              <div>
                <h4 className="text-sm font-medium text-white mb-4">Şifre Politikası</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={securityData.settings.passwordPolicy.requireUppercase} readOnly />
                    <span className="text-sm text-neutral-300">Büyük harf gerekli</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={securityData.settings.passwordPolicy.requireLowercase} readOnly />
                    <span className="text-sm text-neutral-300">Küçük harf gerekli</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={securityData.settings.passwordPolicy.requireNumbers} readOnly />
                    <span className="text-sm text-neutral-300">Rakam gerekli</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked={securityData.settings.passwordPolicy.requireSymbols} readOnly />
                    <span className="text-sm text-neutral-300">Özel karakter gerekli</span>
                  </div>
                </div>
              </div>

              {/* Login Security */}
              <div>
                <h4 className="text-sm font-medium text-white mb-4">Giriş Güvenliği</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Maksimum Deneme</label>
                    <input
                      type="number"
                      value={securityData.settings.loginSecurity.maxAttempts}
                      className="w-full px-3 py-2 glass rounded-lg text-white text-sm"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Kilitleme Süresi (dakika)</label>
                    <input
                      type="number"
                      value={securityData.settings.loginSecurity.lockoutDuration}
                      className="w-full px-3 py-2 glass rounded-lg text-white text-sm"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}




