"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, Globe, Code, Smartphone, Search, Target, FileText, Palette, Share2, Bot, Zap, Users, BookOpen, Wrench, Loader2, XCircle, Image as ImageIcon, Monitor, ShoppingCart, Megaphone, Brain, Settings, GraduationCap, Camera, Layers, Images, Layout, Paintbrush, Eye, Video } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"
import Link from "next/link"
import { getProject, getProjectBySlug, type Project as ProjectType } from "@/lib/project-service"
import { ImageGalleryModal } from "@/components/image-gallery-modal"

interface ProjectDetailProps {
  slug: string
}

const categoryIcons = {
  webDesign: Paintbrush,     // Web tasarımı için paintbrush ikonu (tasarım ve yaratıcılık)
  webDevelopment: Code,      // Web geliştirme için code ikonu
  mobileApp: Smartphone,     // Mobil uygulama için smartphone ikonu
  ecommerce: ShoppingCart,   // E-ticaret için shopping cart ikonu
  seo: Search,               // SEO için search ikonu
  branding: Palette,         // Marka kimliği için palette ikonu
  socialMedia: Megaphone,    // Sosyal medya için megaphone ikonu
  aiIntegration: Brain,      // AI entegrasyonu için brain ikonu
  automation: Settings,      // Otomasyon için settings ikonu
  digitalConsulting: Users,  // Dijital danışmanlık için users ikonu
  noCode: Layers,           // No-code için layers ikonu
  education: GraduationCap   // Eğitim için graduation cap ikonu
}

const categoryLabels = {
  webDesign: "Web Tasarım",
  webDevelopment: "Web Geliştirme",
  mobileApp: "Mobil Uygulama",
  ecommerce: "E-ticaret",
  seo: "SEO",
  branding: "Branding",
  socialMedia: "Sosyal Medya",
  aiIntegration: "AI Entegrasyonu",
  automation: "Otomasyon",
  digitalConsulting: "Dijital Danışmanlık",
  noCode: "No-Code",
  education: "Eğitim"
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const { t, locale, getLocalizedUrl } = useI18n()
  const [project, setProject] = useState<ProjectType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Firestore'dan projeyi yükle
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        setError("")
        // Önce ID ile arama yap, bulamazsa slug ile ara
        let projectData = null
        projectData = await getProject(slug)
        
        // Eğer ID ile bulunamadıysa, slug ile ara
        if (!projectData) {
          projectData = await getProjectBySlug(slug)
        }
        
        if (projectData) {
          setProject(projectData)
        } else {
          setError(t('references.projectDetail.error', 'Proje bulunamadı'))
        }
      } catch (error) {
        setError(t('references.projectDetail.errorLoading', 'Proje yüklenirken bir hata oluştu'))
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [slug])

  // Tarih formatı
  const formatDate = (timestamp: any) => {
    if (!timestamp) return t('references.projectDetail.noDate', 'Tarih yok')
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const localeMap: { [key: string]: string } = {
      'tr': 'tr-TR',
      'en': 'en-US',
      'de': 'de-DE',
      'fr': 'fr-FR',
      'ru': 'ru-RU',
      'ar': 'ar-SA'
    }
    return date.toLocaleDateString(localeMap[locale] || 'tr-TR')
  }

  // Bitiş tarihi formatı
  const formatEndDate = (endDate: string) => {
    if (!endDate) return t('references.projectDetail.notSpecified', 'Belirtilmemiş')
    const date = new Date(endDate)
    const localeMap: { [key: string]: string } = {
      'tr': 'tr-TR',
      'en': 'en-US',
      'de': 'de-DE',
      'fr': 'fr-FR',
      'ru': 'ru-RU',
      'ar': 'ar-SA'
    }
    return date.toLocaleDateString(localeMap[locale] || 'tr-TR', {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  // URL formatı - protokol yoksa https:// ekle
  const formatUrl = (url: string | undefined) => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `https://${url}`
  }

  if (loading) {
    return (
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto mb-4" />
              <p className="text-neutral-400">{t('references.projectDetail.loading', 'Proje yükleniyor...')}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !project) {
    return (
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('references.projectDetail.errorTitle', 'Hata Oluştu')}</h3>
            <p className="text-neutral-400 mb-6">{error || t('references.projectDetail.error', 'Proje bulunamadı')}</p>
            <Link
              href={getLocalizedUrl('/projelerimiz')}
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('references.projectDetail.backToProjects', 'Projelere Dön')}</span>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const CategoryIcon = categoryIcons[project.category as keyof typeof categoryIcons] || Code

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
          <Link
            href={getLocalizedUrl('/projelerimiz')}
            className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 group"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t('references.projectDetail.backToProjects', 'Projelere Dön')}</span>
          </Link>
        </motion.div>

        {/* Project Header */}
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
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <CategoryIcon className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {t(`references.grid.category.${project.category}`, categoryLabels[project.category as keyof typeof categoryLabels] || project.category)}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight break-words hyphens-auto">
            {project.title.split(' ').slice(0, -2).join(' ')} {project.title.split(' ').length > 2 && (
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                {project.title.split(' ').slice(-2).join(' ')}
              </span>
            )}
            {project.title.split(' ').length <= 2 && (
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                {project.title}
              </span>
            )}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-4xl mx-auto leading-relaxed break-words hyphens-auto">
            {project.content || project.description}
          </p>
          
          {/* Project Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {project.liveUrl && (
              <motion.a
                href={formatUrl(project.liveUrl)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
                style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
              >
                <ExternalLink className="h-5 w-5" />
                <span>{t('references.projectDetail.viewLive', 'Canlı Görüntüle')}</span>
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={formatUrl(project.githubUrl)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border border-white/20"
                style={{ background: 'rgba(148, 148, 148, 0.1)' }}
              >
                <Github className="h-5 w-5" />
                <span>{t('references.projectDetail.viewCode', 'Kodu Görüntüle')}</span>
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Project Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {[
            {
              icon: User,
              title: t('references.projectDetail.client', 'Müşteri'),
              info: project.client,
              description: t('references.projectDetail.clientDesc', 'Proje Sahibi'),
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: Calendar,
              title: t('references.projectDetail.endDate', 'Bitiş Tarihi'),
              info: formatEndDate(project.endDate || ''),
              description: t('references.projectDetail.endDateDesc', 'Proje Bitiş Tarihi'),
              color: "from-green-500 to-green-600"
            },
            {
              icon: Tag,
              title: t('references.projectDetail.status', 'Durum'),
              info: t(`references.grid.status.${project.status}`, project.status),
              description: t('references.projectDetail.statusDesc', 'Proje Durumu'),
              color: "from-sky-500 to-sky-600"
            },
            {
              icon: CategoryIcon,
              title: t('references.projectDetail.category', 'Kategori'),
              info: t(`references.grid.category.${project.category}`, categoryLabels[project.category as keyof typeof categoryLabels] || project.category),
              description: t('references.projectDetail.categoryDesc', 'Proje Kategorisi'),
              color: "from-purple-500 to-purple-600"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-4 lg:p-5 shadow-modern border border-white/50 dark:border-white/40 text-center group backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-modern`}>
                <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-neutral-900 dark:text-white mb-1 lg:mb-2 break-words">
                {item.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1 text-sm lg:text-base break-words hyphens-auto">
                {item.info}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 break-words">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500 text-white">
                  {t('references.grid.featured', 'Öne Çıkan')}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass rounded-xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
            style={{ background: 'rgba(148, 148, 148, 0.1)' }}
          >
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
              <Code className="h-6 w-6 text-cyan-500 mr-3" />
              {t('references.projectDetail.technologies', 'Kullanılan Teknolojiler')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="glass rounded-xl p-6 lg:p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
            style={{ background: 'rgba(148, 148, 148, 0.1)' }}
          >
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center">
              <Target className="h-6 w-6 text-blue-500 mr-3" />
              {t('references.projectDetail.features', 'Proje Özellikleri')}
            </h3>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
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
                <Video className="h-5 w-5 text-cyan-500 fill-current" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {t('references.projectDetail.galleryBadge', 'Proje Galerisi')}
              </span>
            </motion.div>

            <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-6">
              {t('references.projectDetail.galleryTitle', 'Proje Görselleri')}
            </h3>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              {t('references.projectDetail.galleryDescription', 'Projemizin detaylarını görsel olarak keşfedin.')}
            </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                  onClick={() => {
                    setSelectedImageIndex(index)
                    setIsGalleryModalOpen(true)
                  }}
                >
                  <img
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t('references.projectDetail.clickToEnlarge', 'Büyütmek için tıklayın')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Image Gallery Modal */}
        <ImageGalleryModal
          images={project.gallery || []}
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          initialIndex={selectedImageIndex}
        />
      </div>
    </section>
  )
}
