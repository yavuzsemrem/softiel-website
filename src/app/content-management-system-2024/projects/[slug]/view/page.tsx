"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Eye, 
  ExternalLink, 
  Github, 
  Calendar,
  User,
  Tag,
  FolderOpen,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  Target,
  Image as ImageIcon,
  Link as LinkIcon,
  Star,
  Globe,
  Smartphone,
  Search,
  Palette,
  Share2,
  Bot,
  Zap,
  Users,
  BookOpen,
  Wrench
} from "lucide-react"
import { getProject, getProjectBySlug } from "@/lib/project-service"
import { Project } from "@/lib/project-service"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ProjectViewPage() {
  const params = useParams()
  const router = useRouter()
  const projectSlug = params.slug as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        console.log('CMS Loading project with ID/slug:', projectSlug)
        
        // Önce ID ile arama yap, bulamazsa slug ile ara
        let projectData = await getProject(projectSlug)
        console.log('Project found by ID:', projectData)
        
        // Eğer ID ile bulunamadıysa, slug ile ara
        if (!projectData) {
          console.log('Project not found by ID, trying by slug...')
          projectData = await getProjectBySlug(projectSlug)
          console.log('Project found by slug:', projectData)
        }
        
        if (projectData) {
          setProject(projectData)
        } else {
          setError("Proje bulunamadı")
        }
      } catch (err) {
        console.error('Error fetching project:', err)
        setError("Proje yüklenirken bir hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    if (projectSlug) {
      fetchProject()
    }
  }, [projectSlug])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Tarih yok"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "ongoing":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "upcoming":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "ongoing":
        return <Clock className="h-4 w-4" />
      case "upcoming":
        return <Calendar className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "ongoing":
        return "Devam Ediyor"
      case "upcoming":
        return "Yakında"
      default:
        return "Bilinmiyor"
    }
  }

  const getCategoryIcon = (category: string) => {
    const categories = {
      "webDesign": Globe,
      "webDevelopment": Globe,
      "mobileApp": Smartphone,
      "ecommerce": Target,
      "seo": Search,
      "branding": Palette,
      "socialMedia": Share2,
      "aiIntegration": Bot,
      "automation": Zap,
      "digitalConsulting": Users,
      "noCode": Wrench,
      "education": BookOpen
    }
    return categories[category as keyof typeof categories] || Briefcase
  }

  const getCategoryLabel = (category: string) => {
    const categories = {
      "webDesign": "Web Tasarım",
      "webDevelopment": "Web Geliştirme",
      "mobileApp": "Mobil Uygulama",
      "ecommerce": "E-ticaret",
      "seo": "SEO",
      "branding": "Branding",
      "socialMedia": "Sosyal Medya",
      "aiIntegration": "AI Entegrasyonu",
      "automation": "Otomasyon",
      "digitalConsulting": "Dijital Danışmanlık",
      "noCode": "No-Code",
      "education": "Eğitim"
    }
    return categories[category as keyof typeof categories] || category
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-neutral-400">Proje yükleniyor...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !project) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Hata</h2>
            <p className="text-neutral-400 mb-6">{error || "Proje bulunamadı"}</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Geri Dön
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const CategoryIcon = getCategoryIcon(project.category)

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Proje Görüntüle
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Proje detaylarını görüntüleyin ve düzenleyin
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="glass rounded-xl p-6 border border-white/20 mb-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 glass rounded-xl text-white hover:bg-white/10 transition-all duration-200 group"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Geri Dön</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => router.push(`/content-management-system-2024/projects/${project?.slug || projectSlug}/edit`)}
                  className="flex items-center justify-center space-x-2 px-6 py-2 text-white rounded-xl hover:opacity-90 transition-all duration-200 group"
                  style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
                >
                  <Edit className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Düzenle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="glass rounded-xl p-6 border border-white/20 mb-8" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="text-sm font-medium">{getStatusText(project.status)}</span>
              </div>
              {project.featured && (
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">Öne Çıkan</span>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h2>
            
            <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Project Image */}
            {project.image && (
              <div className="mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Project Content */}
          {project.content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-xl p-6 border border-white/20 mb-8"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Proje Detayları</h3>
              <div 
                className="prose prose-invert prose-lg max-w-none"
                style={{
                  color: 'white'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: project.content?.replace(
                    /<p>/g, '<p style="color: white;">'
                  ).replace(
                    /<h1>/g, '<h1 style="color: white;">'
                  ).replace(
                    /<h2>/g, '<h2 style="color: white;">'
                  ).replace(
                    /<h3>/g, '<h3 style="color: white;">'
                  ).replace(
                    /<h4>/g, '<h4 style="color: white;">'
                  ).replace(
                    /<h5>/g, '<h5 style="color: white;">'
                  ).replace(
                    /<h6>/g, '<h6 style="color: white;">'
                  ).replace(
                    /<li>/g, '<li style="color: white;">'
                  ).replace(
                    /<strong>/g, '<strong style="color: white;">'
                  ).replace(
                    /<em>/g, '<em style="color: white;">'
                  ).replace(
                    /<span>/g, '<span style="color: white;">'
                  ).replace(
                    /<div>/g, '<div style="color: white;">'
                  )
                }}
              />
            </motion.div>
          )}

          {/* Project Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-xl p-6 border border-white/20 mb-8"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Proje Galerisi</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Proje görseli ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{project.views || 0}</p>
                  <p className="text-sm text-neutral-400">Görüntülenme</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{project.features?.length || 0}</p>
                  <p className="text-sm text-neutral-400">Özellik</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Tag className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{project.technologies?.length || 0}</p>
                  <p className="text-sm text-neutral-400">Teknoloji</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{project.duration || "N/A"}</p>
                  <p className="text-sm text-neutral-400">Süre</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Basic Info */}
            <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <h3 className="text-lg font-semibold text-white mb-4">Proje Bilgileri</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FolderOpen className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-neutral-400">Kategori</p>
                    <div className="flex items-center space-x-2">
                      <CategoryIcon className="h-4 w-4 text-blue-400" />
                      <p className="text-white font-medium">{getCategoryLabel(project.category)}</p>
                    </div>
                  </div>
                </div>

                {project.client && (
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm text-neutral-400">Müşteri</p>
                      <p className="text-white font-medium">{project.client}</p>
                    </div>
                  </div>
                )}

                {project.duration && (
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-sm text-neutral-400">Proje Süresi</p>
                      <p className="text-white font-medium">{project.duration}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-neutral-400">Oluşturulma Tarihi</p>
                    <p className="text-white font-medium">{formatDate(project.createdAt)}</p>
                  </div>
                </div>

                {project.updatedAt && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-neutral-400">Güncellenme Tarihi</p>
                      <p className="text-white font-medium">{formatDate(project.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technologies & Features */}
            <div className="space-y-6">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                  <h3 className="text-lg font-semibold text-white mb-4">Teknolojiler</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="glass rounded-xl p-6 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                  <h3 className="text-lg font-semibold text-white mb-4">Proje Özellikleri</h3>
                  <div className="space-y-2">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Project Links */}
          {(project.liveUrl || project.githubUrl) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass rounded-xl p-6 border border-white/20"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Proje Linkleri</h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Canlı Site</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl.startsWith('http') ? project.githubUrl : `https://${project.githubUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors border border-gray-500/30"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
