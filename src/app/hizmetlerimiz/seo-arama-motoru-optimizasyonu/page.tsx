import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function SEOAramaMotoruOptimizasyonuPage() {
  const serviceData = {
    title: "SEO & Arama Motoru Optimizasyonu",
    subtitle: "Google'da Üst Sıralarda Yer Alın",
    description: "Web sitenizi arama motorlarında üst sıralarda yer alması için optimize ediyoruz. Organik trafik artışı ve daha fazla müşteri kazanımı sağlıyoruz.",
    icon: "🔍",
    features: [
      {
        title: "Anahtar Kelime Analizi",
        description: "Hedef kelimeleri belirleme",
        icon: "🎯"
      },
      {
        title: "Teknik SEO",
        description: "Site hızı ve yapı optimizasyonu",
        icon: "⚙️"
      },
      {
        title: "İçerik Optimizasyonu",
        description: "SEO uyumlu içerik üretimi",
        icon: "📝"
      },
      {
        title: "Raporlama",
        description: "Detaylı performans raporları",
        icon: "📊"
      }
    ],
    process: [
      {
        step: "1",
        title: "SEO Audit",
        description: "Mevcut durumu analiz ediyor, iyileştirme alanlarını belirliyoruz."
      },
      {
        step: "2", 
        title: "Strateji Geliştirme",
        description: "Anahtar kelime stratejisi ve içerik planı oluşturuyoruz."
      },
      {
        step: "3",
        title: "Optimizasyon",
        description: "Teknik ve içerik optimizasyonlarını uyguluyoruz."
      },
      {
        step: "4",
        title: "Takip & Raporlama",
        description: "Performansı takip edip düzenli raporlar sunuyoruz."
      }
    ],
    pricing: [
      {
        name: "Temel SEO",
        price: "₺2.500",
        period: "aylık",
        features: [
          "5 Anahtar Kelime",
          "Teknik SEO",
          "Aylık Rapor",
          "Google Analytics",
          "3 Ay Minimum"
        ],
        popular: false
      },
      {
        name: "Kurumsal SEO",
        price: "₺5.000",
        period: "aylık",
        features: [
          "15 Anahtar Kelime",
          "İçerik Üretimi",
          "Haftalık Rapor",
          "Rakip Analizi",
          "6 Ay Minimum"
        ],
        popular: true
      },
      {
        name: "E-Ticaret SEO",
        price: "₺8.000",
        period: "aylık",
        features: [
          "Sınırsız Kelime",
          "Ürün Optimizasyonu",
          "Günlük Takip",
          "Özel Strateji",
          "12 Ay Minimum"
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
