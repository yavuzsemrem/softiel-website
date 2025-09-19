import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function MobilUygulamaGelistirmePage() {
  const serviceData = {
    title: "Mobil Uygulama Geliştirme",
    subtitle: "iOS & Android Uygulamaları",
    description: "React Native, Flutter ve native teknolojiler kullanarak performanslı mobil uygulamalar geliştiriyoruz. App Store ve Google Play Store'da yayınlanmaya hazır uygulamalar oluşturuyoruz.",
    icon: "📱",
    features: [
      {
        title: "Cross-Platform",
        description: "iOS ve Android tek kod",
        icon: "🔄"
      },
      {
        title: "Native Performans",
        description: "Yüksek performanslı uygulamalar",
        icon: "⚡"
      },
      {
        title: "App Store Yayın",
        description: "Store'larda yayınlama desteği",
        icon: "🏪"
      },
      {
        title: "Push Notification",
        description: "Anlık bildirim sistemi",
        icon: "🔔"
      }
    ],
    process: [
      {
        step: "1",
        title: "Uygulama Analizi",
        description: "Hedef kitle ve platform analizi yapıp uygulama konseptini belirliyoruz."
      },
      {
        step: "2", 
        title: "UI/UX Tasarım",
        description: "Mobil platformlara özel kullanıcı arayüzü tasarlıyoruz."
      },
      {
        step: "3",
        title: "Geliştirme",
        description: "Modern teknolojilerle uygulamayı geliştiriyoruz."
      },
      {
        step: "4",
        title: "Test & Yayın",
        description: "Kapsamlı testler yapıp store'larda yayınlıyoruz."
      }
    ],
    pricing: [
      {
        name: "Basit Uygulama",
        price: "₺30.000",
        period: "başlangıç",
        features: [
          "5-10 Ekran",
          "Offline Çalışma",
          "Push Notification",
          "App Store Yayın",
          "3 Ay Destek"
        ],
        popular: false
      },
      {
        name: "E-Ticaret Uygulaması",
        price: "₺50.000",
        period: "başlangıç",
        features: [
          "Ürün Kataloğu",
          "Sepet Sistemi",
          "Ödeme Entegrasyonu",
          "Admin Paneli",
          "6 Ay Destek"
        ],
        popular: true
      },
      {
        name: "Kurumsal Uygulama",
        price: "₺80.000+",
        period: "başlangıç",
        features: [
          "Özel Geliştirme",
          "API Entegrasyonu",
          "Güvenlik Önlemleri",
          "Sınırsız Destek",
          "Kaynak Kod Teslimi"
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
