"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Clock, Eye, Heart, Tag } from "lucide-react"
import Link from "next/link"

const relatedPosts = [
  {
    id: "seo-onemli-faktorler",
    title: "SEO İçin En Önemli 10 Faktör",
    excerpt: "Arama motorlarında üst sıralarda yer almak için dikkat etmeniz gereken temel faktörler.",
    author: "Zeynep Özkan",
    date: "12 Aralık 2024",
    category: "SEO",
    readTime: "7 dk",
    views: 2100,
    likes: 156,
    tags: ["SEO", "Optimizasyon", "Arama Motoru"]
  },
  {
    id: "yapay-zeka-web-gelistirme",
    title: "Yapay Zeka ve Web Geliştirme",
    excerpt: "AI teknolojilerinin web geliştirme süreçlerine nasıl entegre edileceğini öğrenin.",
    author: "Ahmet Yılmaz",
    date: "10 Aralık 2024",
    category: "Teknoloji",
    readTime: "8 dk",
    views: 3200,
    likes: 234,
    tags: ["AI", "Geliştirme", "Teknoloji"]
  },
  {
    id: "mobil-uygulama-gelistirme",
    title: "Mobil Uygulama Geliştirme Rehberi",
    excerpt: "Başarılı bir mobil uygulama geliştirmek için bilmeniz gereken her şey.",
    author: "Can Arslan",
    date: "5 Aralık 2024",
    category: "Mobil",
    readTime: "10 dk",
    views: 2800,
    likes: 198,
    tags: ["Mobil", "React Native", "Flutter"]
  }
]

export function RelatedPosts() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6">
            İlgili{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Yazılar
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Bu konuyla ilgili diğer blog yazılarımızı keşfedin.
          </p>
        </motion.div>

        {/* Related Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post, index) => (
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-cyan-500/30 dark:text-cyan-400/30">
                    {post.title.charAt(0)}
                  </div>
                </div>
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
                      <span>{post.date}</span>
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
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
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
              className="text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200 inline-flex items-center space-x-2"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
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
