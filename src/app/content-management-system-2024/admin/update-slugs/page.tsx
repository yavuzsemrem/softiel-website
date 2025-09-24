"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { updateAllProjectSlugs } from "@/lib/update-project-slugs"
import { motion } from "framer-motion"
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react"

export default function UpdateSlugsPage() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [result, setResult] = useState<{ success: boolean; updatedCount?: number; error?: string } | null>(null)

  const handleUpdateSlugs = async () => {
    setIsUpdating(true)
    setResult(null)
    
    try {
      const result = await updateAllProjectSlugs()
      setResult(result)
    } catch (error) {
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                Proje Slug'larını Güncelle
              </h1>
              <p className="text-gray-300">
                Tüm projelerin slug'larını kontrol eder ve gerekirse günceller.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Slug Güncelleme İşlemi
                </h3>
                <p className="text-gray-300 mb-4">
                  Bu işlem tüm projeleri kontrol eder ve slug'ı olmayan veya geçersiz olan projeler için 
                  başlıktan yeni slug oluşturur.
                </p>
                
                <button
                  onClick={handleUpdateSlugs}
                  disabled={isUpdating}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isUpdating ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Güncelleniyor...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-5 w-5" />
                      <span>Slug'ları Güncelle</span>
                    </>
                  )}
                </button>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-lg p-6 border ${
                    result.success 
                      ? 'bg-green-500/10 border-green-500/20' 
                      : 'bg-red-500/10 border-red-500/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {result.success ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-red-400" />
                    )}
                    <div>
                      <h4 className={`font-semibold ${
                        result.success ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.success ? 'İşlem Başarılı' : 'İşlem Başarısız'}
                      </h4>
                      <p className="text-gray-300 mt-1">
                        {result.success 
                          ? `${result.updatedCount} proje güncellendi.`
                          : result.error
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}


