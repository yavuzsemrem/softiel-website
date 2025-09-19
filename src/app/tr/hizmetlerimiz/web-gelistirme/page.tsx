import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function WebGelistirmePage() {
  const serviceData = {
    title: "Web Geliştirme",
    subtitle: "Profesyonel Web Uygulamaları",
    description: "Modern teknolojiler kullanarak ölçeklenebilir, hızlı ve güvenli web uygulamaları geliştiriyoruz. React, Next.js, Node.js ve diğer güncel teknolojilerle performanslı çözümler sunuyoruz.",
    icon: "💻",
    features: [
      {
        title: "Modern Teknolojiler",
        description: "React, Next.js, Node.js",
        icon: "⚡"
      },
      {
        title: "Ölçeklenebilir Mimari",
        description: "Büyüyen işletmeler için",
        icon: "📈"
      },
      {
        title: "API Geliştirme",
        description: "RESTful ve GraphQL API'ler",
        icon: "🔗"
      },
      {
        title: "Veritabanı Optimizasyonu",
        description: "Hızlı ve güvenli veri yönetimi",
        icon: "🗄️"
      }
    ],
    process: [
      {
        step: "1",
        title: "Teknik Analiz",
        description: "Proje gereksinimlerini analiz ediyor, en uygun teknoloji stack'ini belirliyoruz."
      },
      {
        step: "2", 
        title: "Mimari Tasarım",
        description: "Ölçeklenebilir ve sürdürülebilir sistem mimarisi tasarlıyoruz."
      },
      {
        step: "3",
        title: "Geliştirme",
        description: "Agile metodoloji ile adım adım uygulamayı geliştiriyoruz."
      },
      {
        step: "4",
        title: "Test & Deploy",
        description: "Kapsamlı testler yapıp production ortamına deploy ediyoruz."
      }
    ],
    pricing: [
      {
        name: "Kurumsal Web App",
        price: "₺25.000",
        period: "başlangıç",
        features: [
          "Admin Paneli",
          "Kullanıcı Yönetimi",
          "API Entegrasyonu",
          "Responsive Tasarım",
          "6 Ay Destek"
        ],
        popular: false
      },
      {
        name: "E-Ticaret Platformu",
        price: "₺40.000",
        period: "başlangıç",
        features: [
          "Ürün Yönetimi",
          "Ödeme Sistemi",
          "Stok Takibi",
          "Raporlama",
          "1 Yıl Destek"
        ],
        popular: true
      },
      {
        name: "Özel Uygulama",
        price: "₺75.000+",
        period: "başlangıç",
        features: [
          "Özel Geliştirme",
          "Mikroservis Mimari",
          "Cloud Deploy",
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
