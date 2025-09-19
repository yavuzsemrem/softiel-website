import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function WebSitesiTasarimiPage() {
  const serviceData = {
    title: "Web Sitesi Tasarımı",
    subtitle: "Modern ve Etkileyici Web Tasarımları",
    description: "Markanızı en iyi şekilde yansıtan, kullanıcı dostu ve dönüşüm odaklı web siteleri tasarlıyoruz. Responsive tasarım, hızlı yükleme süreleri ve SEO uyumlu yapı ile dijital varlığınızı güçlendiriyoruz.",
    icon: "🎨",
    features: [
      {
        title: "Responsive Tasarım",
        description: "Tüm cihazlarda mükemmel görünüm",
        icon: "📱"
      },
      {
        title: "Modern UI/UX",
        description: "Kullanıcı deneyimi odaklı tasarım",
        icon: "✨"
      },
      {
        title: "Hızlı Yükleme",
        description: "Optimize edilmiş performans",
        icon: "⚡"
      },
      {
        title: "SEO Uyumlu",
        description: "Arama motorları için optimize",
        icon: "🔍"
      }
    ],
    process: [
      {
        step: "1",
        title: "Analiz & Planlama",
        description: "İhtiyaçlarınızı analiz ediyor, hedef kitleyi belirliyor ve strateji geliştiriyoruz."
      },
      {
        step: "2", 
        title: "Tasarım & Prototip",
        description: "Modern tasarım prensipleri ile wireframe ve mockup'lar oluşturuyoruz."
      },
      {
        step: "3",
        title: "Geliştirme",
        description: "Responsive ve hızlı çalışan web sitesini kodluyoruz."
      },
      {
        step: "4",
        title: "Test & Yayın",
        description: "Kapsamlı testler yapıp siteyi yayına alıyoruz."
      }
    ],
    pricing: [
      {
        name: "Kurumsal Web Sitesi",
        price: "₺15.000",
        period: "başlangıç",
        features: [
          "5-10 Sayfa",
          "Responsive Tasarım",
          "SEO Optimizasyonu",
          "İçerik Yönetim Sistemi",
          "1 Yıl Destek"
        ],
        popular: false
      },
      {
        name: "E-Ticaret Sitesi",
        price: "₺25.000",
        period: "başlangıç",
        features: [
          "Sınırsız Ürün",
          "Ödeme Entegrasyonu",
          "Stok Yönetimi",
          "Mobil Uyumlu",
          "SSL Sertifikası"
        ],
        popular: true
      },
      {
        name: "Özel Proje",
        price: "₺50.000+",
        period: "başlangıç",
        features: [
          "Özel Tasarım",
          "Gelişmiş Özellikler",
          "API Entegrasyonları",
          "Özel Geliştirme",
          "Sınırsız Destek"
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
