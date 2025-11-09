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
  Upload,
  X,
  Plus,
  Briefcase,
  HelpCircle,
  Loader2,
  Globe,
  Monitor,
  Smartphone,
  Target,
  Search,
  Palette,
  Share2,
  Bot,
  Zap,
  Users,
  BookOpen,
  Wrench
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createProject } from "@/lib/project-service"
import { useCurrentUser } from "@/hooks/use-current-user"
import { createSlug } from "@/lib/slug-utils"

export function ProjectCreateForm() {
  const router = useRouter()
  const { user: currentUser, loading: userLoading } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [imageError, setImageError] = useState("")
  const [imageSuccess, setImageSuccess] = useState("")
  const [galleryError, setGalleryError] = useState("")
  const [gallerySuccess, setGallerySuccess] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [galleryUrls, setGalleryUrls] = useState<string[]>([])
  const [newGalleryUrl, setNewGalleryUrl] = useState("")
  const [galleryUploadMethod, setGalleryUploadMethod] = useState<'file' | 'url'>('file')
  const [isGalleryUploading, setIsGalleryUploading] = useState(false)
  const [galleryUploadProgress, setGalleryUploadProgress] = useState(0)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    status: 'upcoming' as 'completed' | 'ongoing' | 'upcoming',
    client: '',
    duration: '',
    endDate: '',
    image: '',
    gallery: [] as string[],
    technologies: [] as string[],
    features: [] as string[],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    slug: ''
  })
  const [imageUploadMethod, setImageUploadMethod] = useState<'file' | 'url'>('file')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [newTechnology, setNewTechnology] = useState("")

  const categories = [
    { value: "websiteDesign", label: "Website Design", icon: Globe },
    { value: "webApplicationDevelopment", label: "Web Application Development", icon: Monitor },
    { value: "mobileApplication", label: "Mobile Application", icon: Smartphone },
    { value: "seoOptimization", label: "SEO Optimization", icon: Search },
    { value: "googleAdsManagement", label: "Google Ads Management", icon: Target },
    { value: "wordPressSolutions", label: "WordPress Solutions", icon: Wrench },
    { value: "logoCorporateIdentity", label: "Logo & Corporate Identity", icon: Palette },
    { value: "socialMediaManagement", label: "Social Media Management", icon: Share2 },
    { value: "aiIntegration", label: "AI Integration", icon: Bot },
    { value: "digitalConsulting", label: "Digital Consulting", icon: Users }
  ]

  const technologies = []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Slug otomatik oluştur
    if (name === 'title') {
      const slug = createSlug(value)
      setFormData(prev => ({
        ...prev,
        slug: slug
      }))
    }
  }

  const handleTechnologyAdd = (tech: string) => {
    if (!formData.technologies.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech]
      }))
    }
  }

  const handleNewTechnologyAdd = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }))
      setNewTechnology("")
    }
  }

  const handleTechnologyRemove = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  const handleFeatureAdd = () => {
    const feature = (document.getElementById('newFeature') as HTMLInputElement)?.value
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }))
      ;(document.getElementById('newFeature') as HTMLInputElement).value = ''
    }
  }

  const handleFeatureRemove = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Dosya boyutu kontrolü (10MB - Cloudinary limiti)
    if (file.size > 10 * 1024 * 1024) {
      setImageError('Dosya boyutu 10MB\'dan büyük olamaz!')
      setTimeout(() => setImageError(''), 5000)
      return
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      setImageError('Sadece resim dosyaları yüklenebilir!')
      setTimeout(() => setImageError(''), 5000)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Cloudinary'ye yükle
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('upload_preset', 'softiel-uploads')
      uploadData.append('cloud_name', 'dwban9dgy')
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/dwban9dgy/image/upload`, {
        method: 'POST',
        body: uploadData
      })
      
      const data = await response.json()
      
      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          image: data.secure_url
        }))
        setImageSuccess('Görsel başarıyla yüklendi!')
        setTimeout(() => setImageSuccess(''), 3000)
      } else {
        setImageError('Görsel yüklenemedi: ' + (data.error?.message || 'Bilinmeyen hata'))
        setTimeout(() => setImageError(''), 5000)
      }
    } catch (error) {
      setImageError('Görsel yüklenirken bir hata oluştu!')
      setTimeout(() => setImageError(''), 5000)
    } finally {
      setIsUploading(false)
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
    
    try {
      new URL(imageUrl)
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }))
      setImageUrl("")
      setImageSuccess('Görsel URL\'den başarıyla eklendi!')
      setTimeout(() => setImageSuccess(''), 3000)
    } catch {
      setImageError('Geçerli bir URL girin!')
      setTimeout(() => setImageError(''), 5000)
    }
  }

  const handleGalleryImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Dosya boyutu kontrolü (10MB - Cloudinary limiti)
    if (file.size > 10 * 1024 * 1024) {
      setGalleryError('Dosya boyutu 10MB\'dan büyük olamaz!')
      setTimeout(() => setGalleryError(''), 5000)
      return
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      setGalleryError('Sadece resim dosyaları yüklenebilir!')
      setTimeout(() => setGalleryError(''), 5000)
      return
    }

    setIsGalleryUploading(true)
    setGalleryUploadProgress(0)

    try {
      // Cloudinary'ye yükle
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('upload_preset', 'softiel-uploads')
      uploadData.append('cloud_name', 'dwban9dgy')
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/dwban9dgy/image/upload`, {
        method: 'POST',
        body: uploadData
      })
      
      const data = await response.json()
      
      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          gallery: [...prev.gallery, data.secure_url]
        }))
        setGallerySuccess('Galeri görseli başarıyla yüklendi!')
        setTimeout(() => setGallerySuccess(''), 3000)
      } else {
        setGalleryError('Galeri görseli yüklenemedi: ' + (data.error?.message || 'Bilinmeyen hata'))
        setTimeout(() => setGalleryError(''), 5000)
      }
    } catch (error) {
      setGalleryError('Galeri görseli yüklenirken bir hata oluştu!')
      setTimeout(() => setGalleryError(''), 5000)
    } finally {
      setIsGalleryUploading(false)
    }
  }

  const handleGalleryImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>
      handleGalleryImageUpload(fakeEvent)
    }
  }

  const handleGalleryDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleGalleryAdd = () => {
    if (!newGalleryUrl.trim()) return
    
    try {
      new URL(newGalleryUrl)
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, newGalleryUrl]
      }))
      setNewGalleryUrl("")
      setGallerySuccess('Galeri görseli URL\'den başarıyla eklendi!')
      setTimeout(() => setGallerySuccess(''), 3000)
    } catch {
      setGalleryError('Geçerli bir URL girin!')
      setTimeout(() => setGalleryError(''), 5000)
    }
  }

  // Slug oluşturma
  useEffect(() => {
    if (formData.title) {
      const slug = createSlug(formData.title)
      setFormData(prev => ({
        ...prev,
        slug
      }))
    }
  }, [formData.title])

  // Form kaydetme
  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError('Proje başlığı gereklidir!')
      return
    }

    if (!formData.description.trim()) {
      setError('Proje açıklaması gereklidir!')
      return
    }

    if (!formData.image.trim()) {
      setError('Proje görseli gereklidir!')
      return
    }

    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        client: formData.client.trim(),
        duration: formData.duration.trim(),
        endDate: formData.endDate,
        status: formData.status,
        category: formData.category,
        technologies: formData.technologies,
        features: formData.features,
        image: formData.image,
        gallery: formData.gallery,
        liveUrl: formData.liveUrl.trim(),
        githubUrl: formData.githubUrl.trim(),
        featured: formData.featured
      }

      const projectId = await createProject(projectData)
      
      setSuccess('Proje başarıyla oluşturuldu!')
      setTimeout(() => {
        router.push('/content-management-system-2024/projects')
      }, 2000)

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Proje oluşturulurken bir hata oluştu!')
    } finally {
      setIsSaving(false)
    }
  }

  const handleGalleryRemove = (url: string) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g !== url)
    }))
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
                Yeni Proje Oluştur
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base">
                Yeni bir proje oluşturun ve portföyünüze ekleyin
              </p>
            </div>
          </div>
        </div>

        {/* Form Error/Success Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 glass"
            style={{ background: 'rgba(239, 68, 68, 0.1)' }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="h-3 w-3 text-red-400" />
              </div>
              <p className="font-medium">{error}</p>
            </div>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 glass"
            style={{ background: 'rgba(34, 197, 94, 0.1)' }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="font-medium">{success}</p>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="glass rounded-xl p-6 border border-white/20 mb-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="/dashboard/projects"
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
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 text-white rounded-xl hover:opacity-90 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Calendar className="h-4 w-4 group-hover:scale-110 transition-transform" />
                )}
                <span>{isSaving ? 'Kaydediliyor...' : 'Kaydet ve Yayınla'}</span>
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
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Temel Bilgiler</h3>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Proje Başlığı</span>
                    <span className="text-red-400">*</span>
                    <span className="text-xs text-neutral-400">({formData.title.length}/60)</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-base sm:text-lg font-medium"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Proje başlığını girin..."
                    maxLength={60}
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>URL Slug</span>
                    <span className="text-xs text-neutral-400">(Otomatik oluşturulur)</span>
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-neutral-400 whitespace-nowrap">/projelerimiz/</span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className="flex-1 px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-sm"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                      placeholder="proje-slug"
                    />
                  </div>
                  <p className="text-xs text-neutral-400">
                    Proje detay sayfası için URL. Boş bırakılırsa başlıktan otomatik oluşturulur.
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Kısa Açıklama</span>
                    <span className="text-red-400">*</span>
                    <span className="text-xs text-neutral-400">({formData.description.length}/160)</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Proje hakkında kısa açıklama..."
                    maxLength={160}
                    required
                  />
                </div>

                {/* Long Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Detaylı Açıklama</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 resize-none text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Proje hakkında detaylı açıklama..."
                  />
                </div>

                {/* Client */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Müşteri</span>
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Müşteri adı..."
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Proje Süresi</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="Örn: 3 ay, 6 hafta..."
                  />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-cyan-300" />
                    <span>Bitiş Tarihi</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-sm sm:text-base cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Calendar className="h-4 w-4 text-cyan-300" />
                    </div>
                  </div>
                  {formData.endDate && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-xs text-cyan-300"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Seçilen tarih: {new Date(formData.endDate).toLocaleDateString('tr-TR')}</span>
                    </motion.div>
                  )}
                </div>

              </div>
            </div>

            {/* Technologies */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}>
                  <TagIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Teknolojiler</h3>
              </div>

              <div className="space-y-6">
                {/* Selected Technologies */}
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleTechnologyRemove(tech)}
                          className="ml-1 hover:text-red-400 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Add New Technology */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Yeni teknoloji ekle"
                    className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleNewTechnologyAdd()}
                  />
                  <button
                    type="button"
                    onClick={handleNewTechnologyAdd}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}>
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Proje Özellikleri</h3>
              </div>

              <div className="space-y-6">
                {/* Selected Features */}
                {formData.features.length > 0 && (
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <span className="text-white">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleFeatureRemove(feature)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Feature */}
                <div className="flex space-x-2">
                  <input
                    id="newFeature"
                    type="text"
                    placeholder="Yeni özellik ekle"
                    className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={handleFeatureAdd}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category & Status */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #f59e0b, #d97706)' }}>
                  <TagIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Kategori & Durum</h3>
              </div>
              
              <div className="space-y-6">
                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Kategori</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <option value="" className="bg-gray-800">Kategori seçin</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value} className="bg-gray-800">
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Durum</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <option value="upcoming" className="bg-gray-800">Yakında</option>
                    <option value="ongoing" className="bg-gray-800">Devam Ediyor</option>
                    <option value="completed" className="bg-gray-800">Tamamlandı</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-500"
                  />
                  <label className="text-sm text-white">Öne çıkan proje</label>
                </div>
              </div>
            </div>

            {/* Project Image */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}>
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Görsel</h3>
              </div>
            
              <div className="space-y-6">
                {/* Image Error/Success Messages */}
                {imageError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                    style={{ background: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="h-2.5 w-2.5 text-red-400" />
                      </div>
                      <p className="text-sm font-medium">{imageError}</p>
                    </div>
                  </motion.div>
                )}
                {imageSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
                    style={{ background: 'rgba(34, 197, 94, 0.1)' }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="h-2.5 w-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">{imageSuccess}</p>
                    </div>
                  </motion.div>
                )}

                {/* Current Image */}
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Proje görseli"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
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
                            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm ${
                              imageUploadMethod === 'file'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Monitor className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="hidden md:inline">Dosya Yükle</span>
                            <span className="md:hidden">Dosya Yükle</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setImageUploadMethod('url')}
                            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm ${
                              imageUploadMethod === 'url'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Globe className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="hidden md:inline">URL ile Ekle</span>
                            <span className="md:hidden">URL Ekle</span>
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
                        <div className="space-y-4">
                          <div className="w-12 h-12 mx-auto text-cyan-400">
                            <Upload className="h-12 w-12" />
                          </div>
                          <div>
                            <p className="text-cyan-400 font-medium mb-2">Görsel yüklemek için tıklayın</p>
                            <p className="text-sm text-neutral-400">veya sürükleyip bırakın</p>
                            <p className="text-xs text-neutral-500 mt-2">PNG, JPG, GIF (Max 10MB)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* URL Upload */}
                  {imageUploadMethod === 'url' && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="Görsel URL'i"
                          className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <button
                          type="button"
                          onClick={handleImageFromUrl}
                          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                          Ekle
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Project Gallery */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}>
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Proje Galerisi</h3>
              </div>
              
              <div className="space-y-6">
                {/* Gallery Error/Success Messages */}
                {galleryError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                    style={{ background: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="h-2.5 w-2.5 text-red-400" />
                      </div>
                      <p className="text-sm font-medium">{galleryError}</p>
                    </div>
                  </motion.div>
                )}
                {gallerySuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
                    style={{ background: 'rgba(34, 197, 94, 0.1)' }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="h-2.5 w-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">{gallerySuccess}</p>
                    </div>
                  </motion.div>
                )}

                {/* Current Gallery Images */}
                {formData.gallery.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {formData.gallery.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Galeri görseli ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleGalleryRemove(img)}
                          className="absolute top-2 right-2 p-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Method Selection */}
                <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            type="button"
                            onClick={() => setGalleryUploadMethod('file')}
                            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm ${
                              galleryUploadMethod === 'file'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Monitor className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="hidden md:inline">Dosya Yükle</span>
                            <span className="md:hidden">Dosya Yükle</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setGalleryUploadMethod('url')}
                            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm ${
                              galleryUploadMethod === 'url'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                            }`}
                          >
                            <Globe className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="hidden md:inline">URL ile Ekle</span>
                            <span className="md:hidden">URL Ekle</span>
                          </button>
                  </div>

                  {/* File Upload */}
                  {galleryUploadMethod === 'file' && (
                    <div 
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                        isGalleryUploading 
                          ? 'border-cyan-500/50 bg-cyan-500/10' 
                          : 'border-cyan-500/30 hover:border-cyan-500/50'
                      }`}
                      onDrop={handleGalleryImageDrop}
                      onDragOver={handleGalleryDragOver}
                      onClick={() => document.getElementById('gallery-upload')?.click()}
                    >
                      <input
                        id="gallery-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryImageUpload}
                        className="hidden"
                      />
                      
                      {isGalleryUploading ? (
                        <div className="space-y-3">
                          <div className="w-10 h-10 mx-auto">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-cyan-500/30 border-t-cyan-500"></div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-cyan-400 font-medium text-sm">Galeri görseli yükleniyor...</p>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${galleryUploadProgress}%`,
                                  background: 'linear-gradient(to right, #06b6d4, #3b82f6)'
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-neutral-400">{galleryUploadProgress}% tamamlandı</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-10 h-10 mx-auto text-cyan-400">
                            <Upload className="h-10 w-10" />
                          </div>
                          <div>
                            <p className="text-cyan-400 font-medium mb-1 text-sm">Galeri görseli yüklemek için tıklayın</p>
                            <p className="text-xs text-neutral-400">veya sürükleyip bırakın</p>
                            <p className="text-xs text-neutral-500 mt-1">PNG, JPG, GIF (Max 10MB)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* URL Upload */}
                  {galleryUploadMethod === 'url' && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="url"
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          placeholder="Galeri görseli URL'i"
                          className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          onKeyPress={(e) => e.key === 'Enter' && handleGalleryAdd()}
                        />
                        <button
                          type="button"
                          onClick={handleGalleryAdd}
                          className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-neutral-400">
                    Galeri görselleri proje detay sayfasında gösterilecektir
                  </p>
                </div>
              </div>
            </div>

            {/* Project Links */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}>
                  <LinkIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Proje Linkleri</h3>
              </div>
              
              <div className="space-y-6">
                {/* Live URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>Canlı URL</span>
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="https://example.com"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                    <span>GitHub URL</span>
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 transition-all duration-300 text-sm sm:text-base"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
