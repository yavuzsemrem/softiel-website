import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function OtomasyonEntegrasyonPage() {
  const serviceData = {
    title: "Otomasyon & Entegrasyon",
    subtitle: "İş Süreçlerini Otomatikleştirin",
    description: "Zapier, Make.com ve özel entegrasyonlarla iş süreçlerinizi otomatikleştiriyoruz. Verimliliği artırıp manuel işleri minimize ediyoruz.",
    icon: "⚙️",
    features: [
      {
        title: "Süreç Analizi",
        description: "Otomasyon fırsatlarını belirleme",
        icon: "🔍"
      },
      {
        title: "API Entegrasyonları",
        description: "Sistemler arası veri akışı",
        icon: "🔗"
      },
      {
        title: "Workflow Tasarımı",
        description: "Otomatik iş akışları",
        icon: "📋"
      },
      {
        title: "Monitoring",
        description: "Süreç takibi ve raporlama",
        icon: "📊"
      }
    ],
    process: [
      {
        step: "1",
        title: "Süreç Haritalama",
        description: "Mevcut iş süreçlerini analiz ediyor, otomasyon fırsatlarını belirliyoruz."
      },
      {
        step: "2", 
        title: "Entegrasyon Planı",
        description: "Hangi sistemlerin entegre edileceğini ve nasıl çalışacağını planlıyoruz."
      },
      {
        step: "3",
        title: "Geliştirme",
        description: "Otomasyon sistemlerini geliştirip test ediyoruz."
      },
      {
        step: "4",
        title: "Devreye Alma",
        description: "Sistemleri devreye alıp eğitim veriyoruz."
      }
    ],
    pricing: [
      {
        name: "Temel Otomasyon",
        price: "₺5.000",
        period: "başlangıç",
        features: [
          "2-3 Sistem Entegrasyonu",
          "Basit Workflow",
          "Temel Monitoring",
          "1 Ay Destek",
          "Eğitim"
        ],
        popular: false
      },
      {
        name: "Gelişmiş Otomasyon",
        price: "₺12.000",
        period: "başlangıç",
        features: [
          "5-7 Sistem Entegrasyonu",
          "Karmaşık Workflow",
          "Detaylı Raporlama",
          "3 Ay Destek",
          "Kapsamlı Eğitim"
        ],
        popular: true
      },
      {
        name: "Kurumsal Otomasyon",
        price: "₺25.000+",
        period: "başlangıç",
        features: [
          "Sınırsız Entegrasyon",
          "Özel Geliştirme",
          "Real-time Monitoring",
          "6 Ay Destek",
          "Sürekli Optimizasyon"
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
