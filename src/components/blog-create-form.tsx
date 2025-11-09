"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Calendar, 
  User, 
  Tag as TagIcon, 
  Image as ImageIcon,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  Upload,
  X,
  Plus,
  FileText,
  HelpCircle,
  Loader2,
  Globe,
  Monitor
} from "lucide-react"
import Link from "next/link"
import { createBlog, getBlog } from "@/lib/blog-service"
import { getActiveCategories } from "@/lib/category-service"
import { getActiveTags, createTag, generateSlug } from "@/lib/tag-service"
import type { Tag } from "@/lib/tag-service"
import { getWritableUsers, type User as UserType } from "@/lib/user-service"
import { useRouter } from "next/navigation"
import { createSlug } from "@/lib/slug-utils"
import { useSearchParams } from "next/navigation"
import HtmlEditor from "./html-editor"
import type { Category } from "@/lib/category-service"
import { useCurrentUser } from "@/hooks/use-current-user"

export function BlogCreateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user: currentUser, loading: userLoading } = useCurrentUser()
  
  // Geri dönülecek sayfa - URL parametresinden al veya varsayılan olarak blog listesi
  const backUrl = searchParams.get('from') || '/dashboard/blogs'
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: currentUser?.displayName || "Admin",
    category: "Web Tasarım",
    readTime: "5",
    status: "draft" as "draft" | "published" | "archived",
    tags: [] as string[],
    image: "",
    featured: false,
    slug: ""
  })
  const [newTag, setNewTag] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [createdBlogSlug, setCreatedBlogSlug] = useState("")
  const [imageUploadMethod, setImageUploadMethod] = useState<'file' | 'url'>('file')
  const [imageUrl, setImageUrl] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [isLoadingTags, setIsLoadingTags] = useState(true)
  const [availableUsers, setAvailableUsers] = useState<UserType[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const statuses = [
    { value: "draft", label: "Taslak" },
    { value: "published", label: "Yayınlandı" },
    { value: "archived", label: "Arşivlendi" }
  ]

  // Current user değiştiğinde author'ı güncelle
  useEffect(() => {
    if (currentUser?.displayName) {
      setFormData(prev => ({
        ...prev,
        author: currentUser.displayName
      }))
    }
  }, [currentUser])

  // Kategorileri ve etiketleri yükle
  useEffect(() => {
    const loadData = async () => {
      try {
        // Kategorileri yükle
        setIsLoadingCategories(true)
        const categoriesData = await getActiveCategories()
        setCategories(categoriesData)
        
        // İlk kategoriyi varsayılan olarak seç
        if (categoriesData.length > 0) {
          setFormData(prev => ({
            ...prev,
            category: categoriesData[0].name
          }))
        }
        
        // Etiketleri yükle
        setIsLoadingTags(true)
        const tagsData = await getActiveTags()
        setAvailableTags(tagsData)
        
        // Kullanıcıları yükle
        setIsLoadingUsers(true)
        const usersData = await getWritableUsers()
        setAvailableUsers(usersData)
      } catch (err) {
        setError("Veriler yüklenirken bir hata oluştu")
      } finally {
        setIsLoadingCategories(false)
        setIsLoadingTags(false)
        setIsLoadingUsers(false)
      }
    }

    loadData()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Title değiştiğinde slug'ı otomatik oluştur
    if (field === 'title') {
      const autoSlug = createSlug(value)
      setFormData(prev => ({
        ...prev,
        slug: autoSlug
      }))
    }
  }

  // Etiket ekleme/çıkarma fonksiyonları
  const addTag = (tagName: string) => {
    if (!formData.tags.includes(tagName)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagName]
      }))
    }
  }

  const removeTag = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagName)
    }))
  }

  const handleAddTag = async () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      try {
        // Önce Firestore'da etiket oluştur
        const tagName = newTag.trim()
        const tagData = {
          name: tagName,
          slug: generateSlug(tagName),
          description: `${tagName} etiketi`,
          color: "#3b82f6", // Varsayılan renk
          isActive: true
        }
        
        await createTag(tagData)
        
        // Form verisine ekle
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }))
        
        // Mevcut etiketleri yeniden yükle
        const updatedTags = await getActiveTags()
        setAvailableTags(updatedTags)
        
        setNewTag("")
        setSuccess("Etiket başarıyla oluşturuldu!")
        
        // Success mesajını 3 saniye sonra kaldır
        setTimeout(() => {
          setSuccess("")
        }, 3000)
      } catch (error) {
        setError("Etiket oluşturulurken bir hata oluştu")
      }
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      setError("Lütfen tüm gerekli alanları doldurun")
      return
    }
    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      const blogData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        category: formData.category,
        readTime: formData.readTime,
        status: formData.status,
        tags: formData.tags,
        image: formData.image,
        featured: formData.featured,
        slug: formData.slug.trim()
      }

      const result = await createBlog(blogData)
      
      setSuccess(`Blog başarıyla oluşturuldu!`)
      setCreatedBlogSlug(result.slug)
    } catch (error) {
      setError(`Blog oluşturulurken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    setFormData(prev => ({
      ...prev,
      status: "published"
    }))
    
    // Status güncellendikten sonra kaydet
    setTimeout(() => {
      handleSave()
    }, 100)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Dosya boyutu kontrolü (10MB - Cloudinary limiti)
    if (file.size > 10 * 1024 * 1024) {
      alert('Dosya boyutu 10MB\'dan büyük olamaz!')
      return
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      alert('Sadece resim dosyaları yüklenebilir!')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Cloudinary'ye yükle
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'softiel-uploads')
      formData.append('cloud_name', 'dwban9dgy')
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/dwban9dgy/image/upload`, {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          image: data.secure_url
        }))
        setSuccess('Görsel başarıyla yüklendi!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Görsel yüklenemedi: ' + (data.error?.message || 'Bilinmeyen hata'))
      }
    } catch (error) {
      setError('Görsel yüklenirken bir hata oluştu!')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>
      handleImageUpload(fakeEvent)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleImageFromUrl = () => {
    if (!imageUrl.trim()) return
    
    // URL geçerliliğini kontrol et
    try {
      new URL(imageUrl)
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }))
      setImageUrl("")
    } catch {
      alert('Geçerli bir URL girin!')
    }
  }


  return (
    <div>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-500/10 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 space-y-6 sm:space-y-8 p-4 sm:p-6"
      >
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Yeni Blog Oluştur
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base">
                Yeni bir blog yazısı oluşturun ve yayınlayın
              </p>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{success}</p>
                {createdBlogSlug && (
                  <p className="text-xs text-green-300 mt-1">
                    URL: /tr/blog/{createdBlogSlug}
                  </p>
                )}
              </div>
              {createdBlogSlug && (
                <button
                  onClick={() => router.push(`/tr/blog/${createdBlogSlug}`)}
                  className="ml-4 px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                >
                  Blogu Görüntüle
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="glass rounded-xl p-6 border border-white/20 mb-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href={backUrl}
                className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 group"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Geri Dön</span>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                )}
                <span>{isSaving ? 'Kaydediliyor...' : 'Kaydet'}</span>
              </button>
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 text-white rounded-xl hover:opacity-90 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Calendar className="h-4 w-4 group-hover:scale-110 transition-transform" />
                )}
                <span>{isSaving ? 'Yayınlanıyor...' : 'Yayınla'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Editor */}
          <div className="xl:col-span-2 space-y-6 lg:space-y-8">
            {/* Basic Info */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Temel Bilgiler</h3>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Başlık</span>
                    <span className="text-red-400">*</span>
                    <span className="text-xs text-neutral-400">({formData.title.length}/60)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-base sm:text-lg font-medium"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Blog başlığını girin..."
                    maxLength={60}
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Özet</span>
                    <span className="text-red-400">*</span>
                    <span className="text-xs text-neutral-400">({formData.excerpt.length}/160)</span>
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Blog özetini girin..."
                    maxLength={160}
                    required
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>İçerik</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <HtmlEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                    placeholder="Blog içeriğinizi buraya yazın..."
                    className="min-h-[400px]"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}>
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Görsel</h3>
              </div>
            
              <div className="space-y-6">
                {/* Current Image */}
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Blog görseli"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => handleInputChange('image', '')}
                      className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Upload Method Selection */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => setImageUploadMethod('file')}
                      className={`flex-1 px-3 sm:px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                        imageUploadMethod === 'file'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                          : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Monitor className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Bilgisayardan Yükle</span>
                      <span className="sm:hidden">Dosya Yükle</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadMethod('url')}
                      className={`flex-1 px-3 sm:px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                        imageUploadMethod === 'url'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                          : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">URL ile Ekle</span>
                      <span className="sm:hidden">URL Ekle</span>
                    </button>
                  </div>

                  {/* File Upload */}
                  {imageUploadMethod === 'file' && (
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                        isUploading 
                          ? 'border-cyan-500/50 bg-cyan-500/10' 
                          : 'border-cyan-500/30 hover:border-cyan-500/50'
                      }`}
                      onDrop={handleImageDrop}
                      onDragOver={handleDragOver}
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      
                      {isUploading ? (
                        <div className="space-y-4">
                          <div className="w-12 h-12 mx-auto">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-500"></div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-cyan-400 font-medium">Görsel yükleniyor...</p>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${uploadProgress}%`,
                                  background: 'linear-gradient(to right, #06b6d4, #3b82f6)'
                                }}
                              ></div>
                            </div>
                            <p className="text-sm text-neutral-400">{uploadProgress}% tamamlandı</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                          <p className="text-neutral-400 mb-2">Görsel yüklemek için tıklayın veya sürükleyin</p>
                          <p className="text-sm text-neutral-500">PNG, JPG, GIF, WebP (Max 10MB - Cloudinary)</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* URL Upload */}
                  {imageUploadMethod === 'url' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-white">Görsel URL'si</label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-white/50"
                          />
                          <button
                            type="button"
                            onClick={handleImageFromUrl}
                            disabled={!imageUrl.trim()}
                            className="px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                          >
                            Ekle
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-400">
                        Geçerli bir görsel URL'si girin. Desteklenen formatlar: JPG, PNG, GIF, WebP
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:space-y-8">
            {/* Publish Settings */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}>
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Yayın Ayarları</h3>
              </div>
            
              <div className="space-y-6">
                {/* Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Durum</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-medium text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value} className="bg-slate-800 text-white">
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Kategori</span>
                    <span className="text-red-400">*</span>
                  </label>
                  {isLoadingCategories ? (
                    <div className="w-full px-4 py-4 glass rounded-xl border border-white/20 animate-pulse" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <div className="h-5 bg-white/20 rounded w-32"></div>
                    </div>
                  ) : (
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-medium text-sm sm:text-base"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      required
                    >
                      <option value="">Kategori seçin</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name} className="bg-slate-800 text-white">
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Yazar</label>
                  {isLoadingUsers ? (
                    <div className="w-full px-4 py-4 glass rounded-xl border border-white/20 flex items-center space-x-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
                      <span className="text-neutral-400">Kullanıcılar yükleniyor...</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 pr-8 sm:pr-10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-medium cursor-pointer text-sm sm:text-base"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none'
                        }}
                      >
                        <option value="">Kullanıcı seçin...</option>
                        {availableUsers.map((user) => (
                          <option key={user.id} value={user.name || ''} className="bg-slate-800 text-white">
                            {user.name || 'İsimsiz Kullanıcı'}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Read Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3">Okuma Süresi (dakika)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange('readTime', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-medium text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="5"
                    min="1"
                  />
                </div>

                {/* URL Slug */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>URL Slug</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-medium text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="url-slug-formatinda"
                    required
                  />
                  <p className="text-xs text-neutral-400">
                    URL: /dashboard/blogs/{formData.slug || 'url-slug-formatinda'}
                  </p>
                </div>

                {/* Featured */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-5 h-5 text-cyan-500 bg-transparent border-2 border-cyan-500 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <span className="text-sm font-semibold text-white">Öne Çıkan Blog</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #6b7280, #374151)' }}>
                  <TagIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Etiketler</h3>
              </div>
                
              <div className="space-y-6">
                {/* Current Tags */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">Mevcut Etiketler</label>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm rounded-xl border border-cyan-500/30 hover:bg-cyan-500/30 transition-all duration-200 group"
                      >
                        <span className="font-medium">{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-400 transition-colors hover:scale-110"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {formData.tags.length === 0 && (
                      <p className="text-neutral-400 text-sm italic">Henüz etiket eklenmedi</p>
                    )}
                  </div>
                </div>

                {/* Available Tags */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">Mevcut Etiketlerden Seç</label>
                  {isLoadingTags ? (
                    <div className="flex flex-wrap gap-2">
                      {[...Array(6)].map((_, index) => (
                        <div key={index} className="h-8 bg-white/20 rounded-lg animate-pulse w-20"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => addTag(tag.name)}
                          disabled={formData.tags.includes(tag.name)}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                            formData.tags.includes(tag.name)
                              ? 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30 cursor-not-allowed'
                              : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105'
                          }`}
                          style={{ 
                            backgroundColor: formData.tags.includes(tag.name) ? undefined : tag.color + '20',
                            borderColor: formData.tags.includes(tag.name) ? undefined : tag.color + '40'
                          }}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add New Tag */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">Yeni Etiket Ekle</label>
                  <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="w-full sm:flex-1 px-4 py-3 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 font-medium"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      placeholder="Yeni etiket..."
                    />
                    <button
                      onClick={handleAddTag}
                      className="w-full sm:w-auto px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-all duration-200 border border-cyan-500/30 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Etiket Ekle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">İpuçları</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/20">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Başlık Optimizasyonu</p>
                    <p className="text-neutral-400 text-sm">Başlık 60 karakterden kısa olmalı ve anahtar kelimeleri içermeli</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/20">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Özet Yazımı</p>
                    <p className="text-neutral-400 text-sm">Özet 160 karakterden kısa olmalı ve okuyucuyu cezbedecek şekilde yazılmalı</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/20">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Etiket Stratejisi</p>
                    <p className="text-neutral-400 text-sm">En az 3-5 etiket ekleyin ve ilgili anahtar kelimeleri kullanın</p>
                  </div>
                </div>
              
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/20">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Görsel Boyutu</p>
                    <p className="text-neutral-400 text-sm">Görsel boyutu 1200x630 px önerilir (16:9 oranı)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


