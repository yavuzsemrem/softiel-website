"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Search, Filter, Clock, Eye, Heart, BookOpen, Tag, ChevronDown, Loader2 } from "lucide-react"
import Link from "next/link"
import { getPublishedBlogs, BlogPost, getCategories } from "@/lib/blog-service"

const demoBlogs: BlogPost[] = []


export function BlogPosts() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(9)
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<string[]>(["Tümü"])

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
        category: selectedCategory !== "Tümü" ? selectedCategory : undefined,
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
      setCategories(["Tümü", ...firebaseCategories])
    } catch (err) {
      // Hata durumunda varsayılan kategorileri kullan
      setCategories(["Tümü"])
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
      }
      
      if (tagParam) {
        setSelectedTags([tagParam])
      } else if (tagsParam) {
        setSelectedTags(tagsParam.split(',').filter(tag => tag.trim()))
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
        }, 100)
      }
    }
  }, [])

  const filteredPosts = blogs.filter(post => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory
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
    setSelectedCategory("Tümü")
    setSelectedTags([])
    setSearchQuery("")
    setCurrentPage(1)
  }

  // Kategori, etiket veya arama değiştiğinde ilk sayfaya dön
  React.useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedTags, searchQuery])

  // Dropdown dışına tıklandığında kapat
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-dropdown="tags"]')) {
        setIsTagsDropdownOpen(false)
      }
    }

    if (isTagsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isTagsDropdownOpen])


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
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Yazıları
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Dijital dünyadaki son gelişmeler ve uzman görüşlerimizi takip edin.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-2xl shadow-modern-lg p-6 mb-12 border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Yazı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-200 backdrop-blur-lg border border-white/20"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              />
            </div>

            {/* Category Filter */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 text-center focus:outline-none focus:ring-0 focus:border-0 focus:shadow-none ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'glass text-neutral-700 dark:text-neutral-300 hover:bg-white/20 dark:hover:bg-gray-800'
                  }`}
                  style={{
                    ...(selectedCategory !== category ? { background: 'rgba(255, 255, 255, 0.1)' } : {}),
                    outline: 'none',
                    border: 'none',
                    boxShadow: selectedCategory === category ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
                  }}
                >
                  <span className="truncate block">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedTags.length > 0 || selectedCategory !== "Tümü" || searchQuery) && (
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Aktif Filtreler:</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategory !== "Tümü" && (
                  <div className="inline-flex items-center space-x-2 glass rounded-full px-3 py-1 text-xs sm:text-sm text-cyan-600 dark:text-cyan-400"
                       style={{ background: 'rgba(6, 182, 212, 0.2)' }}>
                    <span className="truncate">Kategori: {selectedCategory}</span>
                    <button
                      onClick={() => setSelectedCategory("Tümü")}
                      className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex-shrink-0"
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {selectedTags.map((tag) => (
                  <div key={tag} className="inline-flex items-center space-x-2 glass rounded-full px-3 py-1 text-xs sm:text-sm text-cyan-600 dark:text-cyan-400"
                       style={{ background: 'rgba(6, 182, 212, 0.2)' }}>
                    <span className="truncate max-w-24">{tag}</span>
                    <button
                      onClick={() => toggleTag(tag)}
                      className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex-shrink-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center space-x-1 glass rounded-full px-3 py-1 text-xs sm:text-sm text-red-500 hover:text-red-600 transition-colors"
                  style={{ background: 'rgba(239, 68, 68, 0.2)' }}
                >
                  <span>Tümünü Temizle</span>
                </button>
              </div>
            </div>
          )}

          {/* Tags Dropdown */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Etiketler</h3>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {selectedTags.length > 0 ? `${selectedTags.length} etiket seçili` : 'Etiket seçin'}
              </span>
            </div>
            
            {/* Dropdown Button */}
            <div className="relative" data-dropdown="tags">
              <button
                onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 glass rounded-xl text-left text-neutral-900 dark:text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <span className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-cyan-500" />
                  <span className="truncate">
                    {selectedTags.length === 0 
                      ? 'Etiket seçin' 
                      : selectedTags.length === 1 
                        ? selectedTags[0]
                        : `${selectedTags.length} etiket seçili`
                    }
                  </span>
                </span>
                <ChevronDown 
                  className={`h-5 w-5 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                    isTagsDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown Content */}
              {isTagsDropdownOpen && (
                <>
                  {/* Overlay */}
                  <div 
                    className="fixed inset-0 z-[99998]" 
                    onClick={() => setIsTagsDropdownOpen(false)}
                  />
                  
                  {/* Dropdown - Fixed positioning for full control */}
                  <div 
                    className="fixed glass rounded-xl shadow-2xl z-[99999] max-h-96 overflow-y-auto border border-cyan-500/30"
                    style={{ 
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '90vw',
                      maxWidth: '600px',
                      background: 'rgba(15, 23, 42, 0.95)', 
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Etiket Seçin</h3>
                        <button
                          onClick={() => setIsTagsDropdownOpen(false)}
                          className="text-neutral-400 hover:text-white transition-colors"
                        >
                          ×
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {allTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`group relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                              selectedTags.includes(tag)
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                                : 'text-neutral-200 hover:bg-cyan-500/20 hover:text-cyan-300'
                            }`}
                            style={!selectedTags.includes(tag) ? { 
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.15)'
                            } : {}}
                          >
                            <span className="block truncate">{tag}</span>
                            {selectedTags.includes(tag) && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-cyan-500 text-xs font-bold">✓</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => setIsTagsDropdownOpen(false)}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                        >
                          Tamam
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
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
                <Link href={`/blog/${post.slug || post.id}`}>
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

