"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, LogIn, Shield, AlertTriangle, User, Mail, Clock, RefreshCw, X, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { loginUserByUsernameOrEmail } from "@/lib/firestore-auth"
import { sessionService } from "@/lib/session"
import { useRecaptcha } from "@/hooks/useRecaptcha"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otpCode: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOTPLoading, setIsOTPLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpExpiresIn, setOtpExpiresIn] = useState(0)
  const [otpTimer, setOtpTimer] = useState(0)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  
  // ReCAPTCHA hook
  const { isAvailable, executeRecaptchaAction } = useRecaptcha()

  // Check if already authenticated
  useEffect(() => {
    const isAuth = sessionService.isAuthenticated()
    if (isAuth) {
      router.push('/content-management-system-2024')
    }
  }, [router])

  // OTP Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            setOtpSent(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

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
      // ReCAPTCHA token al (production'da)
      let recaptchaToken = null
      if (isAvailable) {
        const result = await executeRecaptchaAction('LOGIN')
        recaptchaToken = result.token || null
      }

      const result = await loginUserByUsernameOrEmail(formData.email, formData.password, recaptchaToken)
      
      if (result.success && result.user) {
        // Kullanıcı bilgilerini kaydet
        setUserData(result.user)
        
        // OTP gönder
        await handleSendOTP()
        
        // OTP modalını aç
        setShowOTPModal(true)
        setSuccess("OTP code sent successfully")
      } else {
        setError(result.error || "An error occurred during login")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOTP = async () => {
    if (!formData.email) {
      setError("Önce e-posta adresinizi girin")
      return
    }

    setIsOTPLoading(true)
    setError("")

    try {
      // Use relative URL for production compatibility
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      })

      const result = await response.json()

      if (result.success) {
        setOtpSent(true)
        setOtpExpiresIn(result.expiresIn || 300)
        setOtpTimer(result.expiresIn || 300)
        setSuccess("OTP code sent successfully")
      } else {
        setError(result.error || "OTP code could not be sent")
      }
    } catch (err) {
      setError("An error occurred while sending OTP code")
    } finally {
      setIsOTPLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Use relative URL for production compatibility
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          code: formData.otpCode 
        }),
      })

      const result = await response.json()

      if (result.success && result.isValid) {
        // OTP verified, log in the user
        if (userData) {
          // Store session data in localStorage for compatibility
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('userRole', userData.role)
          localStorage.setItem('userEmail', userData.email)
          localStorage.setItem('userName', userData.name)
          localStorage.setItem('userId', userData.id)
          
          setSuccess("OTP verified and login successful!")
          setShowOTPModal(false)
          router.push('/content-management-system-2024')
        } else {
          setError("User information not found")
        }
      } else {
        setError(result.error || "OTP code could not be verified")
      }
    } catch (err) {
      setError("An error occurred while verifying OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setOtpSent(false)
    setOtpTimer(0)
    await handleSendOTP()
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

      {/* OTP Modal - Completely Redesigned */}
      <AnimatePresence>
        {showOTPModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={() => setShowOTPModal(false)}
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
                  onClick={() => setShowOTPModal(false)}
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
                    Enter the 6-digit verification code sent to your email
                  </motion.p>
                  
                  {/* Enhanced OTP Info Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-green-500/20 border border-green-400/50 rounded-xl p-4 mb-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-green-300 font-semibold text-sm mb-1">
                          📧 OTP Code Sent via Email
                        </p>
                        <p className="text-green-200 text-xs leading-relaxed">
                          Verification code has been sent to your email address. 
                          Please check your inbox and enter the code below.
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

                  {/* OTP Form */}
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    {/* OTP Input with Enhanced Design */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2 text-center">
                        Verification Code
                      </label>
                      <div className="flex justify-center">
                        <input
                          type="text"
                          value={formData.otpCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                            handleInputChange("otpCode", value)
                          }}
                          className="w-56 text-center text-2xl font-mono font-bold tracking-[0.3em] py-4 bg-gray-800/50 rounded-xl text-cyan-400 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all duration-300 shadow-lg backdrop-blur-sm"
                          placeholder="000000"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>

                    {/* Timer with Enhanced Design */}
                    {otpSent && otpTimer > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-full backdrop-blur-sm">
                          <Clock className="w-4 h-4 text-gray-300" />
                          <span className="text-gray-300 text-sm font-medium">
                            Code expires in: <span className="text-cyan-400 font-mono font-bold">{otpTimer}s</span>
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Resend Button with Enhanced Design */}
                    {otpTimer === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={isOTPLoading}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-sm font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-cyan-400/50 backdrop-blur-sm"
                        >
                          <RefreshCw className={`w-4 h-4 ${isOTPLoading ? 'animate-spin' : ''}`} />
                          <span>Resend Code</span>
                        </button>
                      </motion.div>
                    )}

                    {/* Verify Button with Enhanced Design */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading || formData.otpCode.length !== 6}
                      className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>Verify Code</span>
                        </>
                      )}
                    </motion.button>

                    {/* Back Button with Enhanced Design */}
                    <button
                      type="button"
                      onClick={() => setShowOTPModal(false)}
                      className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="font-medium">Back to Login</span>
                    </button>
                  </form>

                  {/* Footer with Enhanced Design */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-full backdrop-blur-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <p className="text-xs text-gray-300 font-medium">
                        Secure verification system
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