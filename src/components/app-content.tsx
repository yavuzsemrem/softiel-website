"use client";

import { useI18n } from "@/contexts/i18n-context";
import { LoadingScreen } from "@/components/loading-screen";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Chatbot'u lazy load et
const Chatbot = dynamic(() => import("@/components/lazy-chatbot").then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => null
});

interface AppContentProps {
  children: React.ReactNode;
}

export function AppContent({ children }: AppContentProps) {
  const { isChangingLocale, t } = useI18n();
  const pathname = usePathname();
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Dashboard sayfalarında chatbot'u gösterme
  const isDashboardPage = pathname.startsWith('/content-management-system-2024') || 
                         pathname.startsWith('/admin-panel-secure-access-2024');

  // Sayfa yükleme durumunu takip et
  useEffect(() => {
    const handleStart = () => setIsPageLoading(true);
    const handleComplete = () => setIsPageLoading(false);

    // Next.js router events
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleStart);
      window.addEventListener('load', handleComplete);
      
      return () => {
        window.removeEventListener('beforeunload', handleStart);
        window.removeEventListener('load', handleComplete);
      };
    }
  }, []);

  // Dashboard loading screen'i websitesinde de göster
  if (isChangingLocale || isPageLoading) {
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
            animate={{ 
              scale: [0.5, 1.1, 1],
              opacity: [0, 1, 1]
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              times: [0, 0.7, 1]
            }}
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
              className="absolute inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Logo with floating animation */}
            <motion.img 
              src="/transparent.webp" 
              alt="Softiel Logo" 
              className="w-full h-full object-contain relative z-10"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
                y: [0, -2, 0]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating particles */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0'
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 2) * 60, 0],
                  y: [0, Math.sin(i * Math.PI / 2) * 60, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
            </div>
          </motion.div>

          
          {/* Loading dots */}
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
      </div>
    );
  }

  // Blog sayfalarında da chatbot gösterilecek, sadece dashboard'da gizli
  return (
    <>
      {children}
      {!isDashboardPage && !isPageLoading && !isChangingLocale && <Chatbot />}
    </>
  );
}
