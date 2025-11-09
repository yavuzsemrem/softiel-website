"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Save, 
  Eye, 
  FileText, 
  Tag, 
  Calendar, 
  User, 
  Image, 
  Link as LinkIcon, 
  Loader2,
  ArrowLeft,
  Send,
  Clock
} from "lucide-react"
import Link from "next/link"

export function BlogForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    readTime: '',
    image: '',
    slug: '',
    status: 'draft'
  })

  const categories = [
    "Website Design",
    "Web Application Development",
    "Mobile Application",
    "SEO Optimization",
    "Google Ads Management",
    "WordPress Solutions",
    "Logo & Corporate Identity",
    "Social Media Management",
    "AI Integration",
    "Digital Consulting"
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Slug otomatik oluştur
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({
        ...prev,
        slug: slug
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent, action: 'save' | 'publish') => {
    e.preventDefault()
    
    if (action === 'save') {
      setIsSaving(true)
    } else {
      setIsLoading(true)
    }

    try {
      // Demo - gerçek uygulamada API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Blog kaydedildi
      
      // Başarılı kayıt sonrası dashboard'a yönlendir
      if (action === 'publish') {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      // Blog kaydedilirken hata oluştu
    } finally {
      setIsLoading(false)
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link 
        href="/content-management-system-2024"
        className="inline-flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Dashboard'a Dön</span>
      </Link>

      <form onSubmit={(e) => handleSubmit(e, 'save')} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl shadow-modern p-6 border border-white/50 dark:border-white/40 backdrop-blur-lg"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Temel Bilgiler
                </h3>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Blog yazısının başlığını girin"
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Özet *
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 resize-none backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Blog yazısının kısa özetini girin"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    İçerik *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={12}
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 resize-none backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Blog yazısının detaylı içeriğini girin..."
                  />
                </div>
              </div>
            </motion.div>

            {/* SEO & Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass rounded-2xl shadow-modern p-6 border border-white/50 dark:border-white/40 backdrop-blur-lg"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <LinkIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  SEO & Ayarlar
                </h3>
              </div>

              <div className="space-y-4">
                {/* Slug */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/70 focus:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="url-slug-formatinda"
                  />
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    URL: /blog/{formData.slug || 'url-slug-formatinda'}
                  </p>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Kapak Resmi URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass rounded-2xl shadow-modern p-6 border border-white/50 dark:border-white/40 backdrop-blur-lg"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Send className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Yayın Ayarları
                </h3>
              </div>

              <div className="space-y-4">
                {/* Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Durum
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition-all duration-300 appearance-none cursor-pointer backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <option value="draft">Taslak</option>
                    <option value="published">Yayınla</option>
                    <option value="archived">Arşivle</option>
                  </select>
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Yazar *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      placeholder="Yazar adı"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/70 transition-all duration-300 appearance-none cursor-pointer backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <option value="">Kategori seçin</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Read Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Okuma Süresi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      placeholder="5 dk"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    Etiketler
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl glass text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/70 transition-all duration-300 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      placeholder="Etiket1, Etiket2, Etiket3"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Etiketleri virgülle ayırın
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3"
            >
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'publish')}
                disabled={isLoading}
                className="w-full text-white py-3 rounded-xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Yayınlanıyor...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Yayınla</span>
                  </>
                )}
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full glass py-3 rounded-xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed border border-white/20"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Taslak Olarak Kaydet</span>
                  </>
                )}
              </button>

            </motion.div>
          </div>
        </div>
      </form>
    </div>
  )
}
