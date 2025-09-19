import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function WordPressCMSCozumleriPage() {
  const serviceData = {
    title: "WordPress & CMS Çözümleri",
    subtitle: "Kolay Yönetilebilir Web Siteleri",
    description: "WordPress ve diğer CMS platformlarında profesyonel web siteleri oluşturuyoruz. İçerik yönetimi kolay, güvenli ve hızlı çözümler sunuyoruz.",
    icon: "🔧",
    features: [
      {
        title: "Kolay Yönetim",
        description: "Sürükle-bırak editör",
        icon: "🎛️"
      },
      {
        title: "Plugin Entegrasyonu",
        description: "İhtiyaca özel eklentiler",
        icon: "🔌"
      },
      {
        title: "Güvenlik",
        description: "Güncel güvenlik önlemleri",
        icon: "🔒"
      },
      {
        title: "SEO Hazır",
        description: "SEO optimizasyonu dahil",
        icon: "🔍"
      }
    ],
    process: [
      {
        step: "1",
        title: "İhtiyaç Analizi",
        description: "Proje gereksinimlerini analiz ediyor, en uygun CMS'i seçiyoruz."
      },
      {
        step: "2", 
        title: "Tema & Plugin Seçimi",
        description: "İhtiyaca uygun tema ve eklentileri belirliyoruz."
      },
      {
        step: "3",
        title: "Özelleştirme",
        description: "Tasarım ve fonksiyonları özelleştiriyoruz."
      },
      {
        step: "4",
        title: "Eğitim & Teslim",
        description: "Kullanım eğitimi verip projeyi teslim ediyoruz."
      }
    ],
    pricing: [
      {
        name: "Kurumsal Site",
        price: "₺8.000",
        period: "başlangıç",
        features: [
          "5-10 Sayfa",
          "Temel SEO",
          "Güvenlik",
          "1 Yıl Destek",
          "Eğitim"
        ],
        popular: false
      },
      {
        name: "E-Ticaret Sitesi",
        price: "₺15.000",
        period: "başlangıç",
        features: [
          "WooCommerce",
          "Ödeme Entegrasyonu",
          "Stok Yönetimi",
          "SSL Sertifikası",
          "6 Ay Destek"
        ],
        popular: true
      },
      {
        name: "Özel CMS",
        price: "₺25.000+",
        period: "başlangıç",
        features: [
          "Özel Geliştirme",
          "API Entegrasyonu",
          "Gelişmiş Özellikler",
          "Sınırsız Destek",
          "Kaynak Kod"
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
