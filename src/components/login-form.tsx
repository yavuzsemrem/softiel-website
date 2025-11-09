"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, LogIn, Shield, AlertTriangle, User, Mail, Clock, RefreshCw, X, ArrowLeft, AlertCircle, CheckCircle, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginUserByUsernameOrEmail } from "@/lib/firestore-auth"
import { sessionService } from "@/lib/session"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    totpCode: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showTOTPModal, setShowTOTPModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [totpSecret, setTotpSecret] = useState("")
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  // Check if already authenticated
  useEffect(() => {
    const isAuth = sessionService.isAuthenticated()
    if (isAuth) {
      router.push('/dashboard')
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError("")
  }

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    setIsLoading(true)
    setError("")

    try {
      const result = await loginUserByUsernameOrEmail(formData.email, formData.password, null)
      
      if (result.success && result.user) {
        // Kullanıcı bilgilerini kaydet
        setUserData(result.user)
        
        // TOTP setup olmuş mu kontrol et
        await handleCheckTOTPSetup()
      } else {
        setError(result.error || "An error occurred during login")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckTOTPSetup = async () => {
    try {
      // Önce TOTP kurulumu var mı kontrol et
      const checkResponse = await fetch('/api/totp/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email
        }),
      })

      const checkResult = await checkResponse.json()

      if (checkResult.success) {
        if (checkResult.hasSetup) {
          // TOTP kurulumu var - direkt doğrulama ekranını aç
          setShowTOTPModal(true)
          setSuccess("Google Authenticator'dan kodu girin")
        } else {
          // TOTP kurulumu yok - QR kod oluştur ve göster
          const setupResponse = await fetch('/api/totp/setup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email: formData.email,
              userName: userData?.name || 'Admin'
            }),
          })

          const setupResult = await setupResponse.json()

          if (setupResult.success) {
            setQrCodeUrl(setupResult.qrCode)
            setTotpSecret(setupResult.secret)
            setShowQRModal(true)
            setSuccess("QR kodu Google Authenticator ile tarayın")
          } else {
            setError(setupResult.error || "TOTP kurulumu başarısız")
          }
        }
      } else {
        setError(checkResult.error || "TOTP kontrolü başarısız")
      }
    } catch (err) {
      console.error('TOTP setup check error:', err)
      setError("TOTP kontrolü sırasında bir hata oluştu")
    }
  }

  const handleVerifyTOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('/api/totp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          token: formData.totpCode 
        }),
      })

      const result = await response.json()

      if (result.success && result.isValid) {
        // TOTP verified, log in the user
        if (userData) {
          // Store session data in localStorage for compatibility
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('userRole', userData.role)
          localStorage.setItem('userEmail', userData.email)
          localStorage.setItem('userName', userData.name)
          localStorage.setItem('userId', userData.id)
          
          setSuccess("TOTP doğrulandı ve giriş başarılı!")
          setShowTOTPModal(false)
          setShowQRModal(false)
          router.push('/dashboard')
        } else {
          setError("Kullanıcı bilgileri bulunamadı")
        }
      } else {
        setError(result.error || "TOTP kodu doğrulanamadı")
      }
    } catch (err) {
      setError("TOTP doğrulanırken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQRScanned = () => {
    setShowQRModal(false)
    setShowTOTPModal(true)
  }



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass rounded-2xl p-8 border border-white/20 shadow-modern-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center -mb-1">
            <img 
              src="/transparent.webp" 
              alt="Logo" 
              className="h-28 w-28 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Secure Login</h1>
          <p className="text-neutral-400">Sign in to access the admin panel</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 flex items-center space-x-2"
          >
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-xl border border-green-500/30"
          >
            {success}
          </motion.div>
        )}

        {/* Login Form */}
        <form 
          ref={formRef} 
          onSubmit={(e) => {
            console.log('Form onSubmit triggered')
            handleLogin(e)
          }} 
          className="space-y-6" 
          autoComplete="off" 
          data-lpignore="true" 
          data-1p-ignore="true"
          noValidate
        >
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Username or Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-10 pr-4 py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-medium"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="username or email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full pl-10 pr-12 py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-medium"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  WebkitTextSecurity: showPassword ? 'none' : 'disc'
                } as React.CSSProperties}
                placeholder="Enter your password"
                autoComplete="new-password"
                data-form-type="other"
                data-lpignore="true"
                data-1p-ignore="true"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-colors z-10"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            onClick={(e) => {
              console.log('Button onClick triggered', { isLoading })
              
              // Eğer form geçersizse, preventDefault yapıp validation göster
              if (formRef.current && !formRef.current.checkValidity()) {
                console.log('Form invalid, showing validation')
                e.preventDefault()
                e.stopPropagation()
                formRef.current.reportValidity()
                return false
              }
              
              // Form geçerliyse, form submit edilecek ve onSubmit tetiklenecek
              console.log('Form valid, will submit')
            }}
            onMouseDown={(e) => {
              console.log('Button mouse down')
            }}
            className="w-full px-6 py-4 text-white rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 cursor-pointer active:scale-[0.98] relative z-10"
            style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)', pointerEvents: 'auto', WebkitTapHighlightColor: 'transparent' }}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn className="h-5 w-5" />
            )}
            <span>{isLoading ? "Logging In..." : "Login"}</span>
          </button>
        </form>


        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-500">
            © 2024 Softiel. All rights reserved.
          </p>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={() => setShowQRModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ 
                type: "spring", 
                duration: 0.5,
                damping: 25,
                stiffness: 300
              }}
              className="relative w-full max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-6">
                <button
                  onClick={() => setShowQRModal(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-700/80 hover:bg-gray-600/80 rounded-full flex items-center justify-center transition-all duration-200 group"
                >
                  <X className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </button>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <QrCode className="w-16 h-16 text-cyan-400" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Google Authenticator Kurulumu
                  </h1>
                  
                  <p className="text-gray-300 text-sm mb-6">
                    QR kodu Google Authenticator veya Microsoft Authenticator uygulaması ile tarayın
                  </p>

                  {/* QR Code */}
                  {qrCodeUrl && (
                    <div className="bg-white p-4 rounded-xl mb-4 inline-block">
                      <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                    </div>
                  )}

                  {/* Manual Entry */}
                  <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                    <p className="text-gray-300 text-xs mb-2">Manuel giriş için kod:</p>
                    <code className="text-cyan-400 font-mono text-sm break-all">{totpSecret}</code>
                  </div>

                  {/* Info */}
                  <div className="bg-blue-500/20 border border-blue-400/50 rounded-xl p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <p className="text-blue-300 text-sm mb-2">
                          QR kodu taradıktan sonra uygulamanız her 30 saniyede bir yeni 6 haneli kod üretecektir.
                        </p>
                        <p className="text-blue-200 text-xs font-semibold">
                          ⚠️ Bu kurulum sadece bir kere yapılır. Bir sonraki girişinizde sadece kod girmeniz yeterli olacak.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleQRScanned}
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>QR Kodu Taradım, Devam Et</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOTP Verification Modal */}
      <AnimatePresence>
        {showTOTPModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={() => setShowTOTPModal(false)}
          >
            {/* Modal Container - Perfectly Centered with Better Spacing */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ 
                type: "spring", 
                duration: 0.5,
                damping: 25,
                stiffness: 300
              }}
              className="relative w-full max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Card - Dark Design without Border */}
              <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={() => setShowTOTPModal(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-700/80 hover:bg-gray-600/80 rounded-full flex items-center justify-center transition-all duration-200 group"
                >
                  <X className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </button>

                {/* Logo - Inside Modal, Bigger and Closer */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex justify-center pt-4 pb-1"
                >
                  <img 
                    src="/transparent.webp" 
                    alt="Logo" 
                    className="h-20 w-auto opacity-95"
                  />
                </motion.div>

                {/* Header Section */}
                <div className="px-6 pt-2 pb-4 text-center">
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    Verification Code
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 text-sm mb-4"
                  >
                    Google Authenticator uygulamasından 6 haneli kodu girin
                  </motion.p>
                  
                  {/* Enhanced TOTP Info Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-green-500/20 border border-green-400/50 rounded-xl p-4 mb-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-green-300 font-semibold text-sm mb-1">
                          🔐 TOTP İki Faktörlü Doğrulama
                        </p>
                        <p className="text-green-200 text-xs leading-relaxed">
                          Google Authenticator veya Microsoft Authenticator uygulamasından anlık olarak üretilen 6 haneli kodu girin.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-6">
                  {/* Error/Success Messages for OTP */}
                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.div
                        key="error-message"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="mb-4 p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center space-x-3 backdrop-blur-sm"
                      >
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span className="text-red-300 text-sm font-medium">{error}</span>
                      </motion.div>
                    )}
                    {success && !success.includes("OTP code sent successfully") && (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="mb-4 p-3 bg-green-500/20 border border-green-400/50 rounded-xl flex items-center space-x-3 backdrop-blur-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-green-300 text-sm font-medium">{success}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* TOTP Form */}
                  <form onSubmit={handleVerifyTOTP} className="space-y-4">
                    {/* TOTP Input with Enhanced Design */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2 text-center">
                        Doğrulama Kodu
                      </label>
                      <div className="flex justify-center">
                        <input
                          type="text"
                          value={formData.totpCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                            handleInputChange("totpCode", value)
                          }}
                          className="w-56 text-center text-2xl font-mono font-bold tracking-[0.3em] py-4 bg-gray-800/50 rounded-xl text-cyan-400 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all duration-300 shadow-lg backdrop-blur-sm"
                          placeholder="000000"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-full backdrop-blur-sm">
                        <Clock className="w-4 h-4 text-gray-300" />
                        <span className="text-gray-300 text-xs font-medium">
                          Kod her 30 saniyede bir değişir
                        </span>
                      </div>
                    </motion.div>

                    {/* Verify Button with Enhanced Design */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading || formData.totpCode.length !== 6}
                      className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Doğrulanıyor...</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>Kodu Doğrula</span>
                        </>
                      )}
                    </motion.button>

                    {/* Back Button with Enhanced Design */}
                    <button
                      type="button"
                      onClick={() => setShowTOTPModal(false)}
                      className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="font-medium">Geri Dön</span>
                    </button>
                  </form>

                  {/* Footer with Enhanced Design */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-full backdrop-blur-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <p className="text-xs text-gray-300 font-medium">
                        Güvenli doğrulama sistemi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}