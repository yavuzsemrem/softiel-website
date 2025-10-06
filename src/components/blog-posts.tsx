"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Search, Filter, Clock, Eye, Heart, BookOpen, Tag, ChevronDown, Loader2, X } from "lucide-react"
import Link from "next/link"
import { getPublishedBlogs, BlogPost, getCategories } from "@/lib/blog-service"

const demoBlogs: BlogPost[] = []


export function BlogPosts() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(9)
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<string[]>(["all"])

  // Tüm etiketleri topla
  const allTags = Array.from(new Set(blogs.flatMap(post => post.tags || []))).sort()

  // Blog verilerini yükle
  useEffect(() => {
    loadBlogs()
    loadCategories()
  }, [])

  const loadBlogs = async () => {
    try {
      setLoading(true)
      setError("")
      
      const filters = {
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        search: searchQuery || undefined
      }

      const result = await getPublishedBlogs(filters, { page: 1, limit: 100 })
      setBlogs(result.blogs)
    } catch (err) {
      setError("Bloglar yüklenirken bir hata oluştu")
      setBlogs(demoBlogs)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const firebaseCategories = await getCategories()
      setCategories(["all", ...firebaseCategories])
    } catch (err) {
      // Hata durumunda varsayılan kategorileri kullan
      setCategories(["all"])
    }
  }

  // Filtreler değiştiğinde blogları yeniden yükle
  useEffect(() => {
    if (!loading) {
      loadBlogs()
    }
  }, [selectedCategory, selectedTags, searchQuery])


  // URL parametrelerini kontrol et
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const categoryParam = urlParams.get('category')
      const tagParam = urlParams.get('tag')
      const tagsParam = urlParams.get('tags')
      const scrollParam = urlParams.get('scroll')
      
      if (categoryParam && categories.includes(categoryParam)) {
        setSelectedCategory(categoryParam)
        // URL'den kategori geldiyse filtreleri aç
        setIsFilterOpen(true)
      }
      
      if (tagParam) {
        setSelectedTags([tagParam])
        setIsFilterOpen(true)
      } else if (tagsParam) {
        setSelectedTags(tagsParam.split(',').filter(tag => tag.trim()))
        setIsFilterOpen(true)
      }
      
      // Kategori, etiket filtrelendiyse veya scroll parametresi varsa blog yazıları kısmına scroll yap
      if (categoryParam || tagParam || tagsParam || scrollParam === 'blog-posts') {
        setTimeout(() => {
          const blogPostsElement = document.getElementById('blog-posts')
          if (blogPostsElement) {
            blogPostsElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 200)
      }
    }
  }, [categories])

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
  })

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
    setCurrentPage(1)
  }

  // Kategori, etiket veya arama değiştiğinde ilk sayfaya dön
  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedTags, searchQuery])

  // Kategori değiştiğinde scroll davranışını kontrol et
  React.useEffect(() => {
    if (selectedCategory !== "all") {
      // Sadece filtre paneli açıksa scroll yap
      if (isFilterOpen) {
        setTimeout(() => {
          const blogPostsElement = document.getElementById('blog-posts')
          if (blogPostsElement) {
            blogPostsElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
      }
    }
  }, [selectedCategory, isFilterOpen])



  return (
    <section id="blog-posts" className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <BookOpen className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Son Yazılar
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Blog{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Yazıları
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Dijital dünyadaki son gelişmeler ve uzman görüşlerimizi takip edin.<br/>
            Teknoloji, pazarlama ve web geliştirme konularında derinlemesine içerikler.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden mb-12"
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
                    Blog Filtreleri
                  </h2>
                  <p className="text-neutral-400 text-sm">
                    Blog yazılarınızı kategorilere göre filtreleyin ve arayın
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
                    {isFilterOpen ? 'Filtreleri Gizle' : 'Filtreleri Göster'}
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
                placeholder="Yazı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 backdrop-blur-lg text-lg"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </div>
            
            {/* Advanced Filters Panel */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: isFilterOpen ? 1 : 0, height: isFilterOpen ? "auto" : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isFilterOpen ? 1 : 0, y: isFilterOpen ? 0 : -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
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
                        <label className="text-sm font-semibold text-white uppercase tracking-wider">Kategori</label>
                      </div>
                      
                      <div className="relative">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 appearance-none cursor-pointer text-sm font-medium"
                    style={{ 
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {categories.map((category) => (
                            <option key={category} value={category} className="bg-slate-800 text-white">
                              {category === "all" ? "Tümü" : category}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-cyan-400" />
                        </div>
                      </div>
                              </div>

                    {/* Tags Filter */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                        <label className="text-sm font-semibold text-white uppercase tracking-wider">Etiketler</label>
                      </div>
                      
                      <div className="relative">
                        <select
                          value=""
                          onChange={(e) => {
                            if (e.target.value && !selectedTags.includes(e.target.value)) {
                              toggleTag(e.target.value)
                            }
                          }}
                          className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 appearance-none cursor-pointer text-sm font-medium"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <option value="" className="bg-slate-800 text-white">
                            {selectedTags.length === 0 ? 'Etiket seçin' : 'Başka etiket ekle'}
                          </option>
                          {allTags.map((tag) => (
                            <option key={tag} value={tag} className="bg-slate-800 text-white">
                              {tag}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <Tag className="h-5 w-5 text-cyan-400" />
                        </div>
                      </div>

                    </div>

                    {/* Clear Filters */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                        <label className="text-sm font-semibold text-white uppercase tracking-wider">Temizle</label>
                      </div>
                      <motion.button
                        onClick={clearAllFilters}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative w-full px-6 py-3 rounded-xl text-neutral-400 hover:text-white transition-all duration-300 overflow-hidden"
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center space-x-2">
                          <X className="h-4 w-4" />
                          <span className="font-medium">Tümünü Temizle</span>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Active Filters */}
            {(selectedCategory !== "all" || selectedTags.length > 0 || (searchQuery && searchQuery.trim() !== "")) && (
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
                      {selectedCategory !== "all" && selectedCategory !== "" && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl text-sm font-medium border border-cyan-500/30"
                          style={{ boxShadow: '0 4px 16px rgba(6, 182, 212, 0.2)' }}
                        >
                          <span>{selectedCategory}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedCategory("all")}
                            className="hover:text-cyan-100 transition-colors duration-200"
                          >
                            <X className="h-3 w-3" />
                          </motion.button>
                        </motion.span>
                      )}
                      
                      {searchQuery && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 rounded-xl text-sm font-medium border border-blue-500/30"
                          style={{ boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)' }}
                        >
                          <span>"{searchQuery}"</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSearchQuery("")}
                            className="hover:text-blue-100 transition-colors duration-200"
                          >
                            <X className="h-3 w-3" />
                          </motion.button>
                        </motion.span>
                      )}
                      
                      {selectedTags.map((tag) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 rounded-xl text-sm font-medium border border-emerald-500/30"
                          style={{ boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)' }}
                        >
                          <span>{tag}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleTag(tag)}
                            className="hover:text-emerald-100 transition-colors duration-200"
                          >
                            <X className="h-3 w-3" />
                          </motion.button>
                        </motion.span>
                      ))}
                    </div>
                  </div>
            </div>
              </motion.div>
            )}
          </div>
        </motion.div>


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
              <span className="text-white text-lg">Bloglar yükleniyor...</span>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && (
          <div id="blog-posts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-0">
            {currentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group glass rounded-2xl shadow-modern hover:shadow-modern-lg transition-all duration-200 border border-white/50 dark:border-white/40 overflow-hidden backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 hover:-translate-y-2 relative z-0"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                {post.image ? (
                  <>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
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
                <Link href={`/tr/blog/${post.slug || post.id}`}>
                  <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium transition-transform duration-200 cursor-pointer">
                  <span className="text-sm">Devamını Oku</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>
                </Link>
              </div>
            </motion.article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="glass rounded-2xl p-4 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="glass rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </motion.button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
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
                    </motion.button>
                  ))}
                </div>

                {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="glass rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
                  <ArrowRight className="h-4 w-4" />
          </motion.button>
              </div>
            </div>
        </motion.div>
        )}
      </div>

    </section>
  )
}

