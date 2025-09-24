"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Filter, X, Search, ChevronDown } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

interface FilterProps {
  onFilterChange: (filters: {
    category: string
    search: string
    sortBy: string
  }) => void
  projectCounts?: { [category: string]: number }
  totalProjects?: number
}

export function ReferencesFilter({ onFilterChange, projectCounts = {}, totalProjects = 0 }: FilterProps) {
  const { t } = useI18n()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    search: "",
    sortBy: "newest"
  })

  // Dashboard ile aynı kategori listesi
  const allCategories = [
    { value: "webDesign", label: "Web Tasarım" },
    { value: "webDevelopment", label: "Web Geliştirme" },
    { value: "mobileApp", label: "Mobil Uygulama" },
    { value: "ecommerce", label: "E-ticaret" },
    { value: "seo", label: "SEO" },
    { value: "branding", label: "Branding" },
    { value: "socialMedia", label: "Sosyal Medya" },
    { value: "aiIntegration", label: "AI Entegrasyonu" },
    { value: "automation", label: "Otomasyon" },
    { value: "digitalConsulting", label: "Dijital Danışmanlık" },
    { value: "noCode", label: "No-Code" },
    { value: "education", label: "Eğitim" }
  ]

  const categories = [
    { value: "all", label: t('references.filter.categories.all'), count: totalProjects },
    ...allCategories.map(category => ({
      value: category.value,
      label: category.label,
      count: projectCounts[category.value] || 0
    }))
  ]

  const sortOptions = [
    { value: "newest", label: t('references.filter.sortOptions.newest') },
    { value: "oldest", label: t('references.filter.sortOptions.oldest') },
    { value: "name", label: t('references.filter.sortOptions.name') },
    { value: "category", label: t('references.filter.sortOptions.category') }
  ]

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = { category: "all", search: "", sortBy: "newest" }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <section className="relative py-8 lg:py-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <style jsx>{`
          button:focus {
            outline: none !important;
            box-shadow: none !important;
          }
          button:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
        `}</style>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl"></div>
          
          {/* Main Container */}
          <div className="relative glass rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20 backdrop-blur-xl"
               style={{ 
                 background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
               }}>
            
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="flex items-center space-x-4 mb-6 lg:mb-0">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Filter className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {t('references.filter.title', 'Proje Filtreleri')}
                  </h2>
                  <p className="text-neutral-400 text-sm">
                    Projelerinizi kategorilere göre filtreleyin ve arayın
                  </p>
                </div>
              </div>
              
              {/* Filter Toggle */}
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden px-6 py-3 rounded-2xl text-white font-medium transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Filter className="h-5 w-5" />
                  <span className="sm:hidden">
                    Filtreler
                  </span>
                  <span className="hidden sm:inline">
                    {isFilterOpen ? t('references.filter.hideFilters') : t('references.filter.showFilters')}
                  </span>
                  <motion.div
                    animate={{ rotate: isFilterOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-cyan-400" />
              </div>
              <input
                type="text"
                placeholder={t('references.filter.searchPlaceholder')}
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 backdrop-blur-lg text-lg"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              />
              {filters.search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => handleFilterChange("search", "")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </div>

            {/* Advanced Filters */}
            <motion.div
              initial={false}
              animate={{ height: isFilterOpen ? "auto" : 0, opacity: isFilterOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isFilterOpen ? 1 : 0, y: isFilterOpen ? 0 : -20 }}
                transition={{ duration: 0.4, delay: isFilterOpen ? 0.1 : 0 }}
                className="relative"
              >
                {/* Filter Panel Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/3 to-purple-500/5 rounded-2xl"></div>
                
                <div className="relative glass rounded-2xl p-8 border border-white/10 backdrop-blur-xl"
                     style={{ 
                       background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                     }}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Category Filter */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                        <label className="text-sm font-semibold text-white uppercase tracking-wider">
                          {t('references.filter.category')}
                        </label>
                      </div>
                      <div className="relative">
                        <select
                          value={filters.category}
                          onChange={(e) => handleFilterChange("category", e.target.value)}
                          className="w-full px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 appearance-none cursor-pointer text-sm font-medium"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {categories.map(category => (
                            <option key={category.value} value={category.value} className="bg-slate-800 text-white">
                              {category.label} ({category.count})
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="h-4 w-4 text-cyan-400" />
                        </div>
                      </div>
                    </div>

                    {/* Sort Filter */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <label className="text-sm font-semibold text-white uppercase tracking-wider">
                          {t('references.filter.sortBy')}
                        </label>
                      </div>
                      <div className="relative">
                        <select
                          value={filters.sortBy}
                          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                          className="w-full px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 appearance-none cursor-pointer text-sm font-medium"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {sortOptions.map(option => (
                            <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="h-4 w-4 text-purple-400" />
                        </div>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <motion.button
                        onClick={clearFilters}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full px-6 py-4 rounded-xl text-neutral-400 hover:text-white transition-all duration-300 overflow-hidden"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center space-x-2">
                          <X className="h-4 w-4" />
                          <span className="font-medium">{t('references.filter.clearFilters')}</span>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Active Filters */}
            {(filters.category !== "all" || (filters.search && filters.search.trim() !== "") || filters.sortBy !== "newest") && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="glass rounded-2xl p-6 border border-white/10 backdrop-blur-xl"
                     style={{ 
                       background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                     }}>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-white uppercase tracking-wider">Aktif Filtreler</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {filters.category !== "all" && filters.category !== "" && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl text-sm font-medium border border-cyan-500/30"
                          style={{ boxShadow: '0 4px 16px rgba(6, 182, 212, 0.2)' }}
                        >
                          <span>{categories.find(c => c.value === filters.category)?.label}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleFilterChange("category", "all")}
                            className="hover:text-cyan-100 transition-colors duration-200"
                          >
                            <X className="h-3 w-3" />
                          </motion.button>
                        </motion.span>
                      )}
                      
                      {filters.search && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 rounded-xl text-sm font-medium border border-blue-500/30"
                          style={{ boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)' }}
                        >
                          <span>"{filters.search}"</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleFilterChange("search", "")}
                            className="hover:text-blue-100 transition-colors duration-200"
                          >
                            <X className="h-3 w-3" />
                          </motion.button>
                        </motion.span>
                      )}
                      
                      {filters.sortBy !== "newest" && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl text-sm font-medium border border-purple-500/30"
                          style={{ boxShadow: '0 4px 16px rgba(147, 51, 234, 0.2)' }}
                        >
                          <span>{sortOptions.find(s => s.value === filters.sortBy)?.label}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleFilterChange("sortBy", "newest")}
                            className="hover:text-purple-100 transition-colors duration-200"
                          >
                            <X className="h-3 w-3" />
                          </motion.button>
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}