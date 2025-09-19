"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/contexts/i18n-context";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  const { t, locale } = useI18n();
  
  // Eğer message verilmediyse, mevcut dile göre çeviri yap
  const loadingMessage = message || t('common.loading', 'Yükleniyor...');
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black flex items-center justify-center">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Logo with Multiple Effects */}
        <motion.div 
          className="relative mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer rotating ring */}
            <motion.div 
              className="absolute inset-0 border-2 border-cyan-400/40 border-t-cyan-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Middle pulsing ring */}
            <motion.div 
              className="absolute inset-2 border border-cyan-500/60 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner glow effect */}
            <motion.div 
              className="absolute inset-4 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="/transparent.png" 
                alt="Softiel Logo" 
                width={80} 
                height={80}
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2 font-display">
            Softiel
          </h2>
          <p className="text-cyan-300 text-lg mb-6">
            {loadingMessage}
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
