"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Clock, Eye, Heart, Tag, Star } from "lucide-react"
import Link from "next/link"
import { getFeaturedBlogs, BlogPost } from "@/lib/blog-service"

interface PopularPostsProps {
  currentSlug?: string
}

export function RelatedPosts({ currentSlug }: PopularPostsProps) {
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopularPosts = async () => {
      try {
        setLoading(true)
        const featuredBlogs = await getFeaturedBlogs(10)
        
        // Mevcut sayfayı hariç tut
        const filteredBlogs = featuredBlogs.filter(blog => 
          blog.slug !== currentSlug && blog.id !== currentSlug
        )
        
        // Rastgele karıştır (Fisher-Yates shuffle algoritması)
        const shuffledBlogs = [...filteredBlogs]
        for (let i = shuffledBlogs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledBlogs[i], shuffledBlogs[j]] = [shuffledBlogs[j], shuffledBlogs[i]]
        }
        
        // Sadece ilk 3'ünü al
        setPopularPosts(shuffledBlogs.slice(0, 3))
      } catch (error) {
        setPopularPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadPopularPosts()
  }, [currentSlug])

  if (loading) {
    return (
      <section id="related-posts-section" className="relative py-16 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-300 dark:bg-neutral-600 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (popularPosts.length === 0) {
    return null
  }

  return (
    <section id="related-posts-section" className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            Popüler{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Yazılar
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            En çok okunan ve beğenilen blog yazılarımızı keşfedin.
          </p>
        </motion.div>

        {/* Popular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group glass rounded-2xl shadow-modern hover:shadow-modern-lg transition-all duration-200 border border-white/50 dark:border-white/40 overflow-hidden backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 hover:-translate-y-2"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 relative overflow-hidden">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Görsel yüklenemezse fallback göster
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center" style={{ display: post.image ? 'none' : 'flex' }}>
                  <div className="text-6xl font-bold text-cyan-500/30 dark:text-cyan-400/30">
                    {post.title.charAt(0)}
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="category-tag glass rounded-full px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400"
                       style={{ background: 'rgba(6, 182, 212, 0.2)' }}>
                    {post.category}
                  </div>
                  {post.featured && (
                    <div className="category-tag glass rounded-full px-2 py-1 text-xs font-semibold text-yellow-600 dark:text-yellow-400 gap-1"
                         style={{ background: 'rgba(251, 191, 36, 0.2)' }}>
                      <Star className="h-3 w-3 fill-current" />
                      <span>Popüler</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags && post.tags.slice(0, 2).map((tag) => (
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
                      <span>{post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString('tr-TR') : 'Tarih yok'}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime || '5 dk'}</span>
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200 inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600"
            >
              <span>Tüm Blog Yazılarını Gör</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
