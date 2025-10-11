"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowLeft, CheckCircle, AlertCircle, Clock, RefreshCw, X } from 'lucide-react';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otpCode: string) => Promise<boolean>;
  onResend: () => Promise<void>;
  userEmail: string;
  userName: string;
  otpId: string;
}

export function OTPModal({ 
  isOpen, 
  onClose, 
  onVerify, 
  onResend, 
  userEmail, 
  userName, 
  otpId 
}: OTPModalProps) {
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Reset modal when opened
  useEffect(() => {
    if (isOpen) {
      setOtpCode('');
      setError('');
      setSuccess('');
      setTimer(300);
      setCanResend(false);
    }
  }, [isOpen]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await onVerify(otpCode);
      if (result) {
        setSuccess('Doğrulama başarılı! Dashboard\'a yönlendiriliyorsunuz...');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('Geçersiz doğrulama kodu. Lütfen tekrar deneyin.');
      }
    } catch (error: any) {
      setError(error.message || 'Doğrulama sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await onResend();
      setSuccess('Yeni doğrulama kodu gönderildi!');
      setTimer(300);
      setCanResend(false);
    } catch (error: any) {
      setError(error.message || 'Kod gönderilirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        onClick={onClose}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh'
        }}
      >
        {/* Full Page Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%'
          }}
        />
        
        {/* Logo at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <img 
            src="/transparent.webp" 
            alt="Logo" 
            className="h-12 w-auto opacity-90"
          />
        </motion.div>
        
        {/* Modal Container - Perfectly Centered */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring", 
            duration: 0.6,
            damping: 20,
            stiffness: 300
          }}
          className="relative w-full max-w-lg mx-auto mt-16"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Card with Dark Transparent Design */}
          <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Decorative Top Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 group backdrop-blur-sm"
            >
              <X className="w-4 h-4 text-white group-hover:text-gray-200" />
            </button>

            {/* Header Section */}
            <div className="px-8 pt-8 pb-6 text-center">
              {/* Icon with Enhanced Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white mb-3"
              >
                Verification Code
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-base mb-6"
              >
                Enter the 6-digit verification code sent to your email
              </motion.p>
              
              {/* Enhanced OTP Info Card */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-green-500/20 border border-green-400/50 rounded-2xl p-5 mb-6 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-green-300 font-semibold text-sm mb-2">
                      📧 OTP Code Sent via Email
                    </p>
                    <p className="text-green-200 text-sm leading-relaxed">
                      Verification code has been sent to your email address. 
                      Please check your inbox and enter the code below.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="px-8 pb-8">
              {/* Error/Success Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center space-x-3 backdrop-blur-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-red-300 text-sm font-medium">{error}</span>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl flex items-center space-x-3 backdrop-blur-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-green-300 text-sm font-medium">{success}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* OTP Form */}
              <form onSubmit={handleVerify} className="space-y-6">
                {/* OTP Input with Enhanced Design */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Verification Code
                  </label>
                  <div className="flex justify-center">
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-64 text-center text-3xl font-mono tracking-[0.5em] py-5 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all duration-300 shadow-lg backdrop-blur-sm"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                {/* Timer with Enhanced Design */}
                {timer > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Clock className="w-4 h-4 text-gray-300" />
                      <span className="text-gray-300 text-sm font-medium">
                        Code expires in: <span className="text-cyan-400 font-mono font-bold">{formatTime(timer)}</span>
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Resend Button with Enhanced Design */}
                {canResend && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isLoading}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-cyan-400/50 backdrop-blur-sm"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                      <span>Resend Code</span>
                    </button>
                  </motion.div>
                )}

                {/* Verify Button with Enhanced Design */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || otpCode.length !== 6}
                  className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Verify Code</span>
                    </>
                  )}
                </motion.button>

                {/* Back Button with Enhanced Design */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 py-3 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Login</span>
                </button>
              </form>

              {/* Footer with Enhanced Design */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
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
    </AnimatePresence>
  );
}
