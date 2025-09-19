import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function GoogleAdsMetaAdsYonetimiPage() {
  const serviceData = {
    title: "Google Ads & Meta Ads Yönetimi",
    subtitle: "Hedefli Reklam Kampanyaları",
    description: "Google Ads ve Meta Ads platformlarında etkili reklam kampanyaları yönetiyoruz. Düşük maliyetle yüksek dönüşüm oranları elde etmenizi sağlıyoruz.",
    icon: "📢",
    features: [
      {
        title: "Hedefli Reklamlar",
        description: "Doğru kitleye ulaşın",
        icon: "🎯"
      },
      {
        title: "ROI Optimizasyonu",
        description: "Yatırım getirisi artırma",
        icon: "💰"
      },
      {
        title: "A/B Testing",
        description: "Sürekli iyileştirme",
        icon: "🧪"
      },
      {
        title: "Detaylı Raporlama",
        description: "Kampanya performans analizi",
        icon: "📈"
      }
    ],
    process: [
      {
        step: "1",
        title: "Hedef Kitle Analizi",
        description: "Hedef kitlenizi analiz ediyor, en etkili kanalları belirliyoruz."
      },
      {
        step: "2", 
        title: "Kampanya Tasarımı",
        description: "Reklam metinleri, görseller ve hedefleme stratejisi oluşturuyoruz."
      },
      {
        step: "3",
        title: "Optimizasyon",
        description: "Kampanyaları sürekli optimize ediyor, performansı artırıyoruz."
      },
      {
        step: "4",
        title: "Raporlama",
        description: "Detaylı performans raporları ile sonuçları takip ediyoruz."
      }
    ],
    pricing: [
      {
        name: "Temel Yönetim",
        price: "₺1.500",
        period: "aylık",
        features: [
          "1 Platform",
          "5 Kampanya",
          "Aylık Rapor",
          "Temel Optimizasyon",
          "E-posta Destek"
        ],
        popular: false
      },
      {
        name: "Profesyonel Yönetim",
        price: "₺3.000",
        period: "aylık",
        features: [
          "2 Platform",
          "15 Kampanya",
          "Haftalık Rapor",
          "Gelişmiş Optimizasyon",
          "Telefon Destek"
        ],
        popular: true
      },
      {
        name: "Kurumsal Yönetim",
        price: "₺5.000+",
        period: "aylık",
        features: [
          "Tüm Platformlar",
          "Sınırsız Kampanya",
          "Günlük Rapor",
          "Özel Strateji",
          "7/24 Destek"
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
