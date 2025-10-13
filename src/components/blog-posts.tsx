"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
// Framer Motion optimizasyonu - sadece gerekli features
import { m, LazyMotion } from "framer-motion"
// Icon'ları tree-shakeable şekilde import et
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Clock, 
  Eye, 
  Heart, 
  BookOpen, 
  Loader2,
  Tag,
  Filter,
  X,
  Search,
  ChevronDown,
  SortAsc
} from "lucide-react"
import { getPublishedBlogs, BlogPost, getCategories } from "@/lib/blog-service"
import { useI18n } from "@/contexts/i18n-context"

// domAnimation'ı async yükle
const loadFeatures = () => import("framer-motion").then(mod => mod.domAnimation)

const demoBlogs: BlogPost[] = []


export function BlogPosts() {
  const { t, getLocalizedUrl } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<string[]>(["all"])

  // Tüm etiketleri topla
  const allTags = Array.from(new Set(blogs.flatMap(post => post.tags || []))).sort()

  // Kategorileri yükle - useCallback ile optimize et
  const loadCategories = useCallback(async () => {
    try {
      const firebaseCategories = await getCategories()
      setCategories(["all", ...firebaseCategories])
    } catch (err) {
      // Hata durumunda varsayılan kategorileri kullan
      setCategories(["all"])
    }
  }, [])

  // Blog verilerini yükle - useCallback ile optimize et
  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      
      const filters = {
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        search: searchQuery || undefined
      }

      // Defer Firestore call to reduce network chain blocking
      const fetchBlogs = async () => {
        const result = await getPublishedBlogs(filters, { page: 1, limit: 18 })
        setBlogs(result.blogs)
        setLoading(false)
      }

      // Use requestIdleCallback for non-critical data
      if (typeof window !== 'undefined' && (window as any).requestIdleCallback) {
        (window as any).requestIdleCallback(fetchBlogs, { timeout: 1500 })
      } else {
        setTimeout(fetchBlogs, 50)
      }
    } catch (err) {
      setError("Bloglar yüklenirken bir hata oluştu")
      setBlogs(demoBlogs)
      setLoading(false)
    }
  }, [selectedCategory, selectedTags, searchQuery])

  // Kategorileri yükle - sadece bir kez
  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  // Blog verilerini yükle - filtreler değiştiğinde yeniden yükle
  useEffect(() => {
    loadBlogs()
  }, [loadBlogs])


  // URL parametrelerini kontrol et - Prevent forced reflow
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const categoryParam = urlParams.get('category')
      const tagParam = urlParams.get('tag')
      const tagsParam = urlParams.get('tags')
      
      if (categoryParam && categories.includes(categoryParam)) {
        setSelectedCategory(categoryParam)
        setIsFilterOpen(true)
      }
      
      if (tagParam) {
        setSelectedTags([tagParam])
        setIsFilterOpen(true)
      } else if (tagsParam) {
        setSelectedTags(tagsParam.split(',').filter(tag => tag.trim()))
        setIsFilterOpen(true)
      }
      
      // DISABLED: Otomatik scroll ışınlanma sorununa neden olduğu için kaldırıldı
      // if (categoryParam || tagParam || tagsParam || scrollParam === 'blog-posts') {
      //   requestAnimationFrame(() => {
      //     requestAnimationFrame(() => {
      //       const blogPostsElement = document.getElementById('blog-posts')
      //       if (blogPostsElement) {
      //         blogPostsElement.scrollIntoView({ 
      //           behavior: 'smooth',
      //           block: 'start'
      //         })
      //       }
      //     })
      //   })
      // }
    }
  }, [categories])

  // Sıralama seçenekleri
  const sortOptions = [
    { value: "newest", label: t('blog.filter.newest', 'En Yeni') },
    { value: "oldest", label: t('blog.filter.oldest', 'En Eski') },
    { value: "popular", label: t('blog.filter.popular', 'En Popüler') },
    { value: "mostViewed", label: t('blog.filter.mostViewed', 'En Çok İzlenen') }
  ]

  const filteredPosts = blogs.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesTags = selectedTags.length === 0 || selectedTags.some(selectedTag => 
      (post.tags || []).some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
    )
    const matchesSearch = searchQuery === "" || 
                         post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesTags && matchesSearch
  }).sort((a, b) => {
    // Sıralama mantığı
    switch (sortBy) {
      case "newest":
        const aDate = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt as any)) : new Date(0)
        const bDate = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt as any)) : new Date(0)
        return bDate.getTime() - aDate.getTime()
      case "oldest":
        const aDateOld = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt as any)) : new Date(0)
        const bDateOld = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt as any)) : new Date(0)
        return aDateOld.getTime() - bDateOld.getTime()
      case "popular":
        return (b.likes || 0) - (a.likes || 0)
      case "mostViewed":
        return (b.views || 0) - (a.views || 0)
      default:
        return 0
    }
  })

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Sayfa değiştirme fonksiyonu - Prevent forced reflow
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  // Etiket ekleme/çıkarma fonksiyonu
  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newSelectedTags)
    setCurrentPage(1)
  }

  // Tüm filtreleri temizleme fonksiyonu
  const clearAllFilters = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Sadece state'leri güncelle, URL manipülasyonu yapma
    setSelectedCategory("all")
    setSelectedTags([])
    setSearchQuery("")
    setSortBy("newest")
    setCurrentPage(1)
  }

  // Kategori, etiket, sıralama veya arama değiştiğinde ilk sayfaya dön
  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedTags, searchQuery, sortBy])

  // Kategori değiştiğinde scroll davranışını kontrol et - DISABLED: Işınlanma sorununu önlemek için kaldırıldı
  // React.useEffect(() => {
  //   if (selectedCategory !== "all" && isFilterOpen) {
  //     // Use requestAnimationFrame to prevent forced reflow
  //     requestAnimationFrame(() => {
  //       requestAnimationFrame(() => {
  //         const blogPostsElement = document.getElementById('blog-posts')
  //         if (blogPostsElement) {
  //           blogPostsElement.scrollIntoView({ 
  //             behavior: 'smooth',
  //             block: 'start'
  //           })
  //         }
  //       })
  //     })
  //   }
  // }, [selectedCategory, isFilterOpen])



  return (
    <LazyMotion features={loadFeatures}>
    <section className="relative py-16 lg:py-24" style={{ contain: 'layout style' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ contain: 'layout' }}>
        
        {/* Filtre & Sırala Bölümü */}
        <div className="relative py-8 lg:py-12 mb-8">
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
          
          <m.div
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
                      {t('blog.filter.title', 'Filtrele & Sırala')}
                    </h2>
                    <p className="text-neutral-400 text-sm">
                      {t('blog.filter.subtitle', 'Blog yazılarını kategorilere göre filtreleyin ve arayın')}
                    </p>
                  </div>
                </div>
                
                {/* Filter Toggle */}
                <m.button
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
                      {t('blog.filter.filters', 'Filtreler')}
                    </span>
                    <span className="hidden sm:inline">
                      {isFilterOpen ? t('blog.filter.hideFilters', 'Filtreleri Gizle') : t('blog.filter.showFilters', 'Filtreleri Göster')}
                    </span>
                    <m.div
                      animate={{ rotate: isFilterOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </m.div>
                  </div>
                </m.button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-cyan-400" />
                </div>
                <input
                  type="text"
                  placeholder={t('blog.filter.searchPlaceholder', 'Blog yazılarında ara...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 backdrop-blur-lg text-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                />
                {searchQuery && (
                  <m.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <X className="h-4 w-4" />
                  </m.button>
                )}
              </div>

              {/* Advanced Filters */}
              <m.div
                initial={false}
                animate={{ height: isFilterOpen ? "auto" : 0, opacity: isFilterOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <m.div
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
                            {t('blog.filter.category', 'Kategori')}
                          </label>
                        </div>
                        <div className="relative">
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 appearance-none cursor-pointer text-sm font-medium"
                            style={{ 
                              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                            }}
                          >
                            {categories.map(category => (
                              <option key={category} value={category} className="bg-slate-800 text-white">
                                {category === "all" ? t('blog.filter.all', 'Tümü') : category}
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
                            {t('blog.filter.sort', 'Sırala')}
                          </label>
                        </div>
                        <div className="relative">
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
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
                        <m.button
                          onClick={clearAllFilters}
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
                            <span className="font-medium">{t('blog.filter.clearFilters', 'Filtreleri Temizle')}</span>
                          </div>
                        </m.button>
                      </div>
                    </div>
                  </div>
                </m.div>
              </m.div>

              {/* Active Filters */}
              {(selectedCategory !== "all" || (searchQuery && searchQuery.trim() !== "") || sortBy !== "newest") && (
                <m.div
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
                        <span className="text-sm font-semibold text-white uppercase tracking-wider">{t('blog.filter.activeFilters', 'Aktif Filtreler')}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {selectedCategory !== "all" && selectedCategory !== "" && (
                          <m.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl text-sm font-medium border border-cyan-500/30"
                            style={{ boxShadow: '0 4px 16px rgba(6, 182, 212, 0.2)' }}
                          >
                            <span>{selectedCategory}</span>
                            <m.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedCategory("all")}
                              className="hover:text-cyan-100 transition-colors duration-200"
                            >
                              <X className="h-3 w-3" />
                            </m.button>
                          </m.span>
                        )}
                        
                        {searchQuery && (
                          <m.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 rounded-xl text-sm font-medium border border-blue-500/30"
                            style={{ boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)' }}
                          >
                            <span>"{searchQuery}"</span>
                            <m.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSearchQuery("")}
                              className="hover:text-blue-100 transition-colors duration-200"
                            >
                              <X className="h-3 w-3" />
                            </m.button>
                          </m.span>
                        )}
                        
                        {sortBy !== "newest" && (
                          <m.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl text-sm font-medium border border-purple-500/30"
                            style={{ boxShadow: '0 4px 16px rgba(147, 51, 234, 0.2)' }}
                          >
                            <span>{sortOptions.find(s => s.value === sortBy)?.label}</span>
                            <m.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSortBy("newest")}
                              className="hover:text-purple-100 transition-colors duration-200"
                            >
                              <X className="h-3 w-3" />
                            </m.button>
                          </m.span>
                        )}
                      </div>
                    </div>
                  </div>
                </m.div>
              )}
            </div>
          </m.div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <BookOpen className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {t('blog.badge', 'Son Yazılar')}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6">
            <span className="text-neutral-900 dark:text-white">{t('blog.hero.headingNormal', 'Blog')}</span>{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {t('blog.hero.headingGradient', 'Yazıları')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            {t('blog.hero.description', 'Dijital dünyadaki son gelişmeler ve uzman görüşlerimizi takip edin.')}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
              <span className="text-white text-lg">{t('common.loading', 'Bloglar yükleniyor...')}</span>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && (
          <div id="blog-posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-0" style={{ contain: 'layout' }}>
            {currentPosts.map((post, index) => (
            <m.article
              key={post.id}
              initial={false}
              className="group glass rounded-2xl shadow-modern hover:shadow-modern-lg transition-all duration-200 border border-white/50 dark:border-white/40 overflow-hidden backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 hover:-translate-y-2 relative z-0"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                {post.image ? (
                  <>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      quality={70}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-6xl font-bold text-cyan-500/30 dark:text-cyan-400/30">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className="glass rounded-full px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400"
                       style={{ background: 'rgba(6, 182, 212, 0.2)' }}>
                    {post.category}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 text-xs text-cyan-600 dark:text-cyan-400"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                <span>
                  {post.createdAt ? (post.createdAt.toDate ? post.createdAt.toDate().toLocaleDateString('tr-TR') : new Date(post.createdAt as any).toLocaleDateString('tr-TR')) : 'Tarih yok'}
                </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Read More */}
                <Link href={`${getLocalizedUrl('/blog')}/${post.slug || post.id}`}>
                  <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium transition-transform duration-200 cursor-pointer">
                  <span className="text-sm">{t('blog.readMore', 'Devamını Oku')}</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>
                </Link>
              </div>
            </m.article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
        <div className="flex justify-center mt-12">
            <div className="glass rounded-2xl p-4 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="glass rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </m.button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <m.button
                      key={page}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                      page === currentPage
                        ? 'text-white shadow-modern'
                        : 'glass text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    style={page === currentPage 
                      ? { background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }
                      : { background: 'rgba(255, 255, 255, 0.1)' }
                    }
                    >
                      {page}
                    </m.button>
                  ))}
                </div>

                {/* Next Button */}
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="glass rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
                  <ArrowRight className="h-4 w-4" />
          </m.button>
              </div>
            </div>
        </div>
        )}
      </div>

    </section>
    </LazyMotion>
  )
}

