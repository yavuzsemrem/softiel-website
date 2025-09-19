"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, User, Tag, ArrowRight, BookOpen, TrendingUp, Clock, Star } from "lucide-react"
import Link from "next/link"
import { getFeaturedBlogs, getBlogs, getCategories, getTags } from "@/lib/blog-service"
import type { BlogPost } from "@/lib/blog-service"

interface BlogDetailSidebarProps {
  currentSlug?: string
}

export function BlogDetailSidebar({ currentSlug }: BlogDetailSidebarProps) {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        
        // Paralel olarak tüm verileri yükle
        const [featured, categoriesData, tagsData] = await Promise.all([
          getFeaturedBlogs(10),
          getCategories(),
          getTags()
        ])
        
        // Kategorileri ve etiketleri ayarla
        setCategories(categoriesData)
        setTags(tagsData)
        
        // Mevcut blogu hariç tut
        const filteredFeatured = featured.filter(blog => 
          blog.slug !== currentSlug && blog.id !== currentSlug
        )
        
        // Karışık sırada göster (Fisher-Yates shuffle)
        const shuffledFeatured = [...filteredFeatured].sort(() => Math.random() - 0.5)
        
        // İlk 5'ini al
        setFeaturedPosts(shuffledFeatured.slice(0, 5))
        
        // Eğer featured blog yoksa, son yazıları getir
        if (filteredFeatured.length === 0) {
          const latest = await getBlogs({ status: 'published' }, { page: 1, limit: 10 })
          
          // Mevcut blogu hariç tut
          const filteredLatest = latest.blogs.filter(blog => 
            blog.slug !== currentSlug && blog.id !== currentSlug
          )
          
          // Karışık sırada göster
          const shuffledLatest = [...filteredLatest].sort(() => Math.random() - 0.5)
          
          setLatestPosts(shuffledLatest.slice(0, 5))
        }
      } catch (error) {
        console.error('Veri yükleme hatası:', error)
        // Hata durumunda son yazıları getir
        try {
          const latest = await getBlogs({ status: 'published' }, { page: 1, limit: 10 })
          
          // Mevcut blogu hariç tut
          const filteredLatest = latest.blogs.filter(blog => 
            blog.slug !== currentSlug && blog.id !== currentSlug
          )
          
          // Karışık sırada göster
          const shuffledLatest = [...filteredLatest].sort(() => Math.random() - 0.5)
          
          setLatestPosts(shuffledLatest.slice(0, 5))
        } catch (fallbackError) {
          console.error('Fallback blog yükleme hatası:', fallbackError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [currentSlug])

  // Gösterilecek bloglar
  const displayPosts = featuredPosts.length > 0 ? featuredPosts : latestPosts
  const sectionTitle = featuredPosts.length > 0 ? "Popüler Yazılar" : "Son Yazılar"

  // Tarih formatlama fonksiyonu
  const formatDate = (date: any) => {
    try {
      if (!date) return 'Tarih yok'
      
      let dateObj: Date
      if (typeof date === 'object' && date.toDate) {
        dateObj = date.toDate()
      } else if (typeof date === 'number') {
        dateObj = new Date(date)
      } else if (typeof date === 'string') {
        dateObj = new Date(date)
      } else {
        dateObj = new Date(date)
      }
      
      if (isNaN(dateObj.getTime())) return 'Geçersiz tarih'
      
      return dateObj.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.error('Tarih işleme hatası:', error)
      return 'Tarih hatası'
    }
  }

  // Kategori renkleri
  const categoryColors = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600", 
    "from-purple-500 to-purple-600",
    "from-orange-500 to-orange-600",
    "from-pink-500 to-pink-600",
    "from-red-500 to-red-600",
    "from-cyan-500 to-cyan-600",
    "from-indigo-500 to-indigo-600",
    "from-emerald-500 to-emerald-600",
    "from-violet-500 to-violet-600"
  ]

  return (
    <div className="space-y-8">

      {/* Popular/Featured Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass rounded-2xl shadow-modern p-6 border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
          {featuredPosts.length > 0 ? (
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
          ) : (
          <Clock className="h-5 w-5 mr-2 text-cyan-500" />
          )}
          {sectionTitle}
        </h3>
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
        <div className="space-y-4">
            {displayPosts.map((post, index) => {
              // URL oluşturma - daha güvenli
              const blogUrl = post.slug ? `/blog/${post.slug}` : post.id ? `/blog/${post.id}` : '#'
              
              return (
            <Link
                  key={post.id || index}
                  href={blogUrl}
              className="group block p-3 glass rounded-xl hover:bg-white/20 transition-all duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <h4 className="text-sm font-medium text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3" />
                    <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
                {featuredPosts.length > 0 && (
                  <div className="flex items-center mt-2">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs text-yellow-500">Öne Çıkan</span>
                  </div>
                )}
            </Link>
              )
            })}
        </div>
        )}
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="glass rounded-2xl shadow-modern p-6 border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-cyan-500" />
          Kategoriler
        </h3>
        <div className="space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 bg-white/20 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            categories.map((category, index) => (
            <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
              className="group flex items-center justify-between p-3 glass rounded-xl hover:bg-white/20 transition-all duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[index % categoryColors.length]}`}></div>
                <span className="text-sm font-medium text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {category}
                </span>
              </div>
                <ArrowRight className="h-3 w-3 text-neutral-400 group-hover:text-cyan-500 transition-colors" />
            </Link>
            ))
          )}
        </div>
      </motion.div>

      {/* Popular Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="glass rounded-2xl shadow-modern p-6 border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-cyan-500" />
          Popüler Etiketler
        </h3>
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-8 w-20 bg-white/20 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            tags.slice(0, 12).map((tag, index) => (
            <Link
              key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="group inline-flex items-center px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white/10 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-full transition-all duration-200 border border-white/20 hover:border-cyan-500/50"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
            </Link>
            ))
          )}
        </div>
      </motion.div>

    </div>
  )
}
