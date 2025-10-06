import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function SosyalMedyaYonetimiPage() {
  const serviceData = {
    title: "Sosyal Medya Yönetimi",
    subtitle: "Etkili Sosyal Medya Stratejisi",
    description: "Instagram, Facebook, LinkedIn ve diğer sosyal medya platformlarında profesyonel içerik üretimi ve yönetimi yapıyoruz. Marka bilinirliğinizi artırıp müşteri etkileşiminizi güçlendiriyoruz.",
    icon: "📱",
    serviceType: "sosyal-medya",
    features: [
      {
        title: "İçerik Üretimi",
        description: "Yaratıcı ve etkileyici içerikler",
        icon: "✨"
      },
      {
        title: "Görsel Tasarım",
        description: "Profesyonel sosyal medya görselleri",
        icon: "🎨"
      },
      {
        title: "Topluluk Yönetimi",
        description: "Takipçi etkileşimi ve yönetimi",
        icon: "👥"
      },
      {
        title: "Analiz & Raporlama",
        description: "Detaylı performans analizi",
        icon: "📊"
      }
    ],
    process: [
      {
        step: "1",
        title: "Strateji Geliştirme",
        description: "Hedef kitle analizi yapıp sosyal medya stratejisi oluşturuyoruz."
      },
      {
        step: "2", 
        title: "İçerik Planlama",
        description: "Aylık içerik takvimi ve tema planlaması yapıyoruz."
      },
      {
        step: "3",
        title: "İçerik Üretimi",
        description: "Görsel ve metin içeriklerini üretip yayınlıyoruz."
      },
      {
        step: "4",
        title: "Takip & Optimizasyon",
        description: "Performansı takip edip stratejiyi sürekli iyileştiriyoruz."
      }
    ],
    pricing: [
      {
        name: "Temel Yönetim",
        price: "₺2.000",
        period: "aylık",
        features: [
          "2 Platform",
          "15 Post/Ay",
          "Story Yönetimi",
          "Aylık Rapor",
          "Temel Analiz"
        ],
        popular: false
      },
      {
        name: "Profesyonel Yönetim",
        price: "₺4.000",
        period: "aylık",
        features: [
          "4 Platform",
          "30 Post/Ay",
          "Video İçerik",
          "Haftalık Rapor",
          "Detaylı Analiz"
        ],
        popular: true
      },
      {
        name: "Kurumsal Yönetim",
        price: "₺7.000+",
        period: "aylık",
        features: [
          "Tüm Platformlar",
          "Sınırsız İçerik",
          "Canlı Yayın",
          "Günlük Rapor",
          "Özel Strateji"
        ],
        popular: false
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <ServiceHero data={serviceData} />
        <ServiceDetails data={serviceData} />
        <ServiceProcess data={serviceData} />
        <ServicePricing data={serviceData} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}