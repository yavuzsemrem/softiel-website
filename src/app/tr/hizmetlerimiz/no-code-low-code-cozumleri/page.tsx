import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function NoCodeLowCodeCozumleriPage() {
  const serviceData = {
    title: "No-Code / Low-Code Çözümleri",
    subtitle: "Kod Yazmadan Uygulama Geliştirin",
    description: "Bubble, Webflow, Airtable gibi no-code/low-code platformlarla hızlı ve maliyet etkin uygulamalar geliştiriyoruz. Teknik bilgi gerektirmeden işletmenizin ihtiyaçlarını karşılıyoruz.",
    icon: "🚀",
    features: [
      {
        title: "Hızlı Geliştirme",
        description: "Geleneksel yöntemlerden 10x hızlı",
        icon: "⚡"
      },
      {
        title: "Maliyet Etkin",
        description: "Düşük maliyetle yüksek değer",
        icon: "💰"
      },
      {
        title: "Kolay Yönetim",
        description: "Teknik bilgi gerektirmez",
        icon: "👥"
      },
      {
        title: "Hızlı İterasyon",
        description: "Sürekli iyileştirme imkanı",
        icon: "🔄"
      }
    ],
    process: [
      {
        step: "1",
        title: "Platform Seçimi",
        description: "İhtiyaca en uygun no-code/low-code platformunu seçiyoruz."
      },
      {
        step: "2", 
        title: "Tasarım & Prototip",
        description: "Hızlı prototip oluşturup kullanıcı geri bildirimlerini alıyoruz."
      },
      {
        step: "3",
        title: "Geliştirme",
        description: "Seçilen platformda uygulamayı geliştiriyoruz."
      },
      {
        step: "4",
        title: "Eğitim & Teslim",
        description: "Kullanım eğitimi verip projeyi teslim ediyoruz."
      }
    ],
    pricing: [
      {
        name: "Basit Uygulama",
        price: "₺8.000",
        period: "başlangıç",
        features: [
          "5-10 Sayfa",
          "Temel Veritabanı",
          "Kullanıcı Sistemi",
          "1 Ay Destek",
          "Eğitim"
        ],
        popular: false
      },
      {
        name: "Orta Seviye Uygulama",
        price: "₺15.000",
        period: "başlangıç",
        features: [
          "15-25 Sayfa",
          "Gelişmiş Veritabanı",
          "API Entegrasyonu",
          "3 Ay Destek",
          "Kapsamlı Eğitim"
        ],
        popular: true
      },
      {
        name: "Karmaşık Uygulama",
        price: "₺30.000+",
        period: "başlangıç",
        features: [
          "Sınırsız Sayfa",
          "Özel Entegrasyonlar",
          "Gelişmiş Özellikler",
          "6 Ay Destek",
          "Sürekli Eğitim"
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
