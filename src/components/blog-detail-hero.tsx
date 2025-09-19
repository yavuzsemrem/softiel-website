"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, User, Clock, Eye, Heart, Share2, ArrowLeft, BookOpen, Tag, Loader2 } from "lucide-react"
import Link from "next/link"
import { getBlog, incrementBlogViews, updateBlogLikes, BlogPost } from "@/lib/blog-service"
import { logBlogLikeActivity } from "@/lib/simple-activity-logger"

interface BlogDetailHeroProps {
  slug: string
}

const blogData = {
  "web-tasarim-trendleri-2024": {
    title: "2024'te Web Tasarım Trendleri",
    excerpt: "Bu yıl web tasarımında öne çıkan trendleri ve nasıl uygulayabileceğinizi keşfedin. Glassmorphism, neumorphism ve minimal tasarım yaklaşımları.",
    author: "Elif Demir",
    date: "15 Aralık 2024",
    category: "Web Tasarım",
    readTime: "5 dk",
    views: 1250,
    likes: 89,
    image: "/api/placeholder/800/400",
    tags: ["Tasarım", "Trend", "UI/UX"],
    content: "Web tasarım dünyası sürekli evrim geçiriyor ve 2024 yılı da bu değişimin hızlandığı bir dönem olarak karşımıza çıkıyor. Bu yazıda, web tasarımında öne çıkan en önemli trendleri ve bunları projelerinizde nasıl uygulayabileceğinizi detaylı bir şekilde inceleyeceğiz."
  },
  "wordpress-gelistirme-ipuclari": {
    title: "WordPress Geliştirme İpuçları ve Püf Noktaları",
    excerpt: "WordPress'te profesyonel web siteleri geliştirmek için bilmeniz gereken temel ipuçları ve gelişmiş teknikler. Plugin geliştirme ve tema özelleştirme.",
    author: "Fatma Özkan",
    date: "1 Aralık 2024",
    category: "Web Geliştirme",
    readTime: "12 dk",
    views: 1950,
    likes: 143,
    image: "/api/placeholder/800/400",
    tags: ["WordPress", "PHP", "Web Geliştirme"],
    content: "WordPress, dünyanın en popüler içerik yönetim sistemi olarak web geliştiricilerin vazgeçilmez aracı haline geldi. Bu yazıda, WordPress'te profesyonel web siteleri geliştirmek için bilmeniz gereken temel ipuçları ve gelişmiş teknikleri ele alacağız."
  },
  "google-ads-optimizasyonu": {
    title: "Google Ads Kampanyalarınızı Nasıl Optimize Edersiniz?",
    excerpt: "Google Ads kampanyalarınızın performansını artırmak için uygulayabileceğiniz stratejiler. Anahtar kelime araştırması ve reklam metni optimizasyonu.",
    author: "Emre Yılmaz",
    date: "28 Kasım 2024",
    category: "Pazarlama",
    readTime: "8 dk",
    views: 2200,
    likes: 167,
    image: "/api/placeholder/800/400",
    tags: ["Google Ads", "Pazarlama", "Optimizasyon"],
    content: "Google Ads, dijital pazarlama dünyasının en güçlü araçlarından biri. Bu yazıda, Google Ads kampanyalarınızın performansını artırmak için uygulayabileceğiniz stratejileri detaylı bir şekilde inceleyeceğiz."
  },
  "cyber-guvenlik-web-siteleri": {
    title: "Web Siteleri İçin Siber Güvenlik Rehberi",
    excerpt: "Web sitenizi siber saldırılardan korumak için almanız gereken önlemler. SSL sertifikaları, güvenlik duvarları ve güvenli kodlama.",
    author: "Deniz Kaya",
    date: "25 Kasım 2024",
    category: "Güvenlik",
    readTime: "11 dk",
    views: 3100,
    likes: 245,
    image: "/api/placeholder/800/400",
    tags: ["Güvenlik", "SSL", "Siber Güvenlik"],
    content: "Siber güvenlik, günümüzde web siteleri için kritik önem taşıyor. Bu yazıda, web sitenizi siber saldırılardan korumak için almanız gereken temel önlemleri ele alacağız."
  },
  "javascript-modern-ozellikler": {
    title: "JavaScript'in Modern Özellikleri ve ES2024",
    excerpt: "JavaScript'in en yeni özelliklerini keşfedin. ES2024 ile gelen yenilikler, async/await, destructuring ve modern JavaScript teknikleri.",
    author: "Burak Arslan",
    date: "22 Kasım 2024",
    category: "Web Geliştirme",
    readTime: "9 dk",
    views: 2750,
    likes: 189,
    image: "/api/placeholder/800/400",
    tags: ["JavaScript", "ES2024", "Web Geliştirme"],
    content: "JavaScript, web geliştirme dünyasının en dinamik dillerinden biri. Bu yazıda, JavaScript'in en yeni özelliklerini ve ES2024 ile gelen yenilikleri inceleyeceğiz."
  },
  "ui-ux-tasarim-prensipleri": {
    title: "UI/UX Tasarımda Temel Prensipler",
    excerpt: "Kullanıcı deneyimini artıran tasarım prensipleri. Renk teorisi, tipografi, boşluk kullanımı ve kullanıcı arayüzü tasarımı.",
    author: "Zeynep Demir",
    date: "20 Kasım 2024",
    category: "Web Tasarım",
    readTime: "7 dk",
    views: 1850,
    likes: 134,
    image: "/api/placeholder/800/400",
    tags: ["UI/UX", "Tasarım", "Kullanıcı Deneyimi"],
    content: "UI/UX tasarım, kullanıcı deneyimini doğrudan etkileyen kritik bir alan. Bu yazıda, kullanıcı deneyimini artıran temel tasarım prensiplerini ele alacağız."
  },
  "cloud-computing-avantajlari": {
    title: "Cloud Computing'in İşletmenize Avantajları",
    excerpt: "Bulut bilişim teknolojilerinin işletmenize sağlayacağı faydalar. AWS, Azure ve Google Cloud karşılaştırması ve maliyet optimizasyonu.",
    author: "Serkan Özkan",
    date: "18 Kasım 2024",
    category: "Teknoloji",
    readTime: "10 dk",
    views: 2400,
    likes: 178,
    image: "/api/placeholder/800/400",
    tags: ["Cloud Computing", "AWS", "Azure"],
    content: "Cloud computing, modern işletmelerin vazgeçilmez teknolojisi haline geldi. Bu yazıda, bulut bilişim teknolojilerinin işletmenize sağlayacağı faydaları inceleyeceğiz."
  },
  "seo-onemli-faktorler": {
    title: "SEO İçin En Önemli 10 Faktör",
    excerpt: "Arama motorlarında üst sıralarda yer almak için dikkat etmeniz gereken temel faktörler. Core Web Vitals ve teknik SEO optimizasyonu.",
    author: "Zeynep Özkan",
    date: "12 Aralık 2024",
    category: "SEO",
    readTime: "7 dk",
    views: 2100,
    likes: 156,
    image: "/api/placeholder/800/400",
    tags: ["SEO", "Optimizasyon", "Arama Motoru"],
    content: "SEO (Search Engine Optimization) artık sadece anahtar kelime yoğunluğu ile ilgili değil. Google'ın algoritmaları sürekli gelişiyor ve kullanıcı deneyimini ön planda tutuyor. Bu yazıda, 2024 yılında SEO için kritik olan 10 faktörü detaylı bir şekilde ele alacağız."
  },
  "yapay-zeka-web-gelistirme": {
    title: "Yapay Zeka ve Web Geliştirme",
    excerpt: "AI teknolojilerinin web geliştirme süreçlerine nasıl entegre edileceğini öğrenin. ChatGPT, GitHub Copilot ve diğer AI araçları.",
    author: "Ahmet Yılmaz",
    date: "10 Aralık 2024",
    category: "Teknoloji",
    readTime: "8 dk",
    views: 3200,
    likes: 234,
    image: "/api/placeholder/800/400",
    tags: ["AI", "Geliştirme", "Teknoloji"],
    content: "Yapay zeka teknolojileri web geliştirme süreçlerini köklü bir şekilde değiştiriyor. Bu yazıda, AI araçlarının web geliştirmede nasıl kullanılabileceğini ve bu teknolojilerin gelecekteki etkilerini inceleyeceğiz."
  },
  "e-ticaret-optimizasyonu": {
    title: "E-ticaret Sitesi Optimizasyonu",
    excerpt: "E-ticaret sitenizin dönüşüm oranını artırmak için uygulayabileceğiniz stratejiler. UX/UI iyileştirmeleri ve A/B test yöntemleri.",
    author: "Mehmet Kaya",
    date: "8 Aralık 2024",
    category: "E-ticaret",
    readTime: "6 dk",
    views: 1800,
    likes: 112,
    image: "/api/placeholder/800/400",
    tags: ["E-ticaret", "Dönüşüm", "Optimizasyon"],
    content: "E-ticaret sitenizin başarısı, sadece ürün kalitesi ile değil, kullanıcı deneyimi ile de doğrudan ilişkilidir. Bu yazıda, e-ticaret sitenizin dönüşüm oranını artırmak için uygulayabileceğiniz stratejileri detaylı bir şekilde inceleyeceğiz."
  },
  "mobil-uygulama-gelistirme": {
    title: "Mobil Uygulama Geliştirme Rehberi",
    excerpt: "Başarılı bir mobil uygulama geliştirmek için bilmeniz gereken her şey. React Native, Flutter ve native geliştirme karşılaştırması.",
    author: "Can Arslan",
    date: "5 Aralık 2024",
    category: "Mobil",
    readTime: "10 dk",
    views: 2800,
    likes: 198,
    image: "/api/placeholder/800/400",
    tags: ["Mobil", "React Native", "Flutter"],
    content: "Mobil uygulama geliştirme, günümüzde en hızlı büyüyen teknoloji alanlarından biri. Bu yazıda, başarılı bir mobil uygulama geliştirmek için bilmeniz gereken tüm detayları ele alacağız."
  },
  "sosyal-medya-pazarlama": {
    title: "Sosyal Medya Pazarlama Stratejileri",
    excerpt: "Sosyal medyada etkili pazarlama kampanyaları oluşturmanın yolları. Instagram, LinkedIn ve TikTok için içerik stratejileri.",
    author: "Selin Yıldız",
    date: "3 Aralık 2024",
    category: "Pazarlama",
    readTime: "9 dk",
    views: 1650,
    likes: 87,
    image: "/api/placeholder/800/400",
    tags: ["Sosyal Medya", "Pazarlama", "İçerik"],
    content: "Sosyal medya pazarlaması, markaların hedef kitlelerine ulaşmasının en etkili yollarından biri. Bu yazıda, sosyal medyada başarılı pazarlama kampanyaları oluşturmanın yollarını inceleyeceğiz."
  }
}

export function BlogDetailHero({ slug }: BlogDetailHeroProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewCount, setViewCount] = useState(0)
  const [hasViewed, setHasViewed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [showCopied, setShowCopied] = useState(false)

  // Blog verisini yükle
  useEffect(() => {
    loadBlog()
  }, [slug])

  const loadBlog = async () => {
    try {
      setLoading(true)
      setError("")
      
      const blogData = await getBlog(slug)
      if (blogData) {
        setPost(blogData)
        setViewCount(blogData.views || 0)
        setLikeCount(blogData.likes || 0)
        
        // Görüntülenme sayısını artır
        await incrementBlogViews(slug)
      } else {
        setError("Blog yazısı bulunamadı")
      }
    } catch (err) {
      setError("Blog yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  // Beğen fonksiyonu
  const handleLike = async () => {
    if (!post) return

    try {
      const newLikedState = !isLiked
      setIsLiked(newLikedState)
      
      // Firebase'de beğeni sayısını güncelle
      await updateBlogLikes(slug, newLikedState)
      
      // Local state'i güncelle
      setLikeCount(prev => newLikedState ? prev + 1 : Math.max(0, prev - 1))
      
      // Aktivite kaydet (sadece beğeni eklendiğinde)
      if (newLikedState) {
        await logBlogLikeActivity(post.title || 'Blog yazısı', post.id || slug)
      }
    } catch (err) {
      // Hata durumunda state'i geri al
      setIsLiked(!isLiked)
    }
  }

  // Paylaş fonksiyonu
  const handleShare = async () => {
    const shareData = {
      title: post?.title || 'Blog Yazısı',
      text: 'Bu blog yazısını okumanızı tavsiye ederim!',
      url: `${window.location.origin}/blog/${slug}`
    }

    try {
      // Mobil cihazlarda native paylaşım
      if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share(shareData)
      } else {
        // Desktop'ta URL'yi panoya kopyala
        await navigator.clipboard.writeText(shareData.url)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
      }
    } catch (error) {
      // Fallback: URL'yi panoya kopyala
      try {
        await navigator.clipboard.writeText(shareData.url)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
      } catch (clipboardError) {
        alert('Paylaşım desteklenmiyor. Lütfen linki manuel olarak kopyalayın.')
      }
    }
  }

  if (loading) {
    return (
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            <span className="text-white text-lg">Blog yükleniyor...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || !post) {
    return (
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Yazı Bulunamadı</h1>
          <p className="text-neutral-400 mb-8">{error || "Aradığınız blog yazısı mevcut değil."}</p>
          <Link href="/blog" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
            <ArrowLeft className="h-4 w-4" />
            <span>Blog'a Dön</span>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/blog" className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <ArrowLeft className="h-4 w-4" />
            <span>Blog'a Dön</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
          >
            <BookOpen className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {post.category}
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight blog-hero-title">
            {post.title.split(' ').slice(0, -2).join(' ')} {post.title.split(' ').length > 2 && (
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {post.title.split(' ').slice(-2).join(' ')}
              </span>
            )}
            {post.title.split(' ').length <= 2 && (
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {post.title}
              </span>
            )}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed mb-8 blog-hero-excerpt">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {post.tags && post.tags.length > 0 ? post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 glass rounded-full px-3 py-1 text-xs text-cyan-600 dark:text-cyan-400 blog-hero-tag"
                style={{ background: 'rgba(6, 182, 212, 0.2)' }}
              >
                <Tag className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{tag}</span>
              </span>
            )) : null}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 mb-8">
            <div className="flex items-center space-x-2 min-w-0">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="blog-hero-meta">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2 min-w-0">
              <Calendar className="h-4 w-4 flex-shrink-0" />
        <span>
          {(() => {
            try {
              if (!post.createdAt) return 'Tarih yok'
              
              let date: Date
              if (typeof post.createdAt === 'object' && post.createdAt.toDate) {
                // Firestore Timestamp
                date = post.createdAt.toDate()
              } else if (typeof post.createdAt === 'number') {
                // Unix timestamp
                date = new Date(post.createdAt)
              } else if (typeof post.createdAt === 'string') {
                // String date
                date = new Date(post.createdAt)
              } else {
                // Fallback
                date = new Date(post.createdAt)
              }
              
              if (isNaN(date.getTime())) return 'Geçersiz tarih'
              
              return date.toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            } catch (error) {
              return 'Tarih hatası'
            }
          })()}
        </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} okuma</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>{viewCount || post.views} görüntüleme</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>{likeCount} beğeni</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`inline-flex items-center space-x-2 glass px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isLiked
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-red-500'
              }`}
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{isLiked ? 'Beğenildi' : 'Beğen'}</span>
            </motion.button>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="inline-flex items-center space-x-2 glass px-6 py-3 rounded-xl font-medium text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <Share2 className="h-4 w-4" />
                <span>Paylaş</span>
              </motion.button>
              
              {/* Kopyalandı Mesajı */}
              {showCopied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -10, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
                    ✓ Kopyalandı!
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500"></div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-modern-lg"
        >
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div className="aspect-video bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="text-8xl font-bold text-cyan-500/30 dark:text-cyan-400/30">
                {post.title.charAt(0)}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
