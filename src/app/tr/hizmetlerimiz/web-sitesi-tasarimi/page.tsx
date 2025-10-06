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
    description: "Profesyonel web siteleri ile dijital dünyada öne çıkarın. Responsive tasarım, hızlı yükleme ve SEO uyumlu yapı ile en iyi deneyimi sunun.",
    detailDescription: "Bir web sitesi artık sadece bilgi paylaşımı değil, markanızın dijital yüzü haline geldi. Doğru tasarım ve kullanıcı deneyimi müşterilerinizi etkiler ve işinizin güvenilirliğini artırır.",
    serviceType: "web-tasarimi",
    features: [
      {
        title: "7-14 Gün İçinde Yayında",
        description: "Hızlı teslimat garantisi"
      },
      {
        title: "Mobil Uyumlu & Hızlı",
        description: "Performans odaklı tasarım"
      },
      {
        title: "SEO Altyapısı Hazır",
        description: "Arama motorları için optimize"
      },
      {
        title: "Revizyon Hakkı",
        description: "Müşteri memnuniyeti garantisi"
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
        name: "Basic",
        price: "₺20.000",
        period: "başlangıç",
        features: [
          "5-7 sayfa (Ana sayfa, Hakkımızda, Hizmetler, İletişim vb.)",
          "Responsive (mobil uyumlu)",
          "Temel SEO (meta, site haritası, robots.txt)",
          "1 iletişim formu + Google Maps entegrasyonu",
          "1 revizyon turu",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "₺50.000",
        period: "başlangıç",
        features: [
          "8-12 sayfa",
          "Özel ana sayfa tasarımı",
          "Blog altyapısı",
          "2 revizyon turu",
          "Çok dilli altyapıya hazır (opsiyon)",
          "Gelişmiş hız optimizasyonu (WebP, lazy load, font preload)",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "₺80.000+",
        period: "başlangıç",
        features: [
          "12+ sayfa",
          "Çok dilli destek",
          "İçerik yönetim sistemi (WordPress, Headless CMS vb.)",
          "Özel entegrasyon (CRM, ödeme, API)",
          "3 revizyon turu",
          "Erişilebilirlik standartları (WCAG uyumu)",
          "3 ay ücretsiz bakım ve destek",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Ek Sayfa",
        description: "Ek sayfa tasarımı ve geliştirme",
        price: "₺1.500"
      },
      {
        name: "Çok Dil Desteği",
        description: "Web sitenizi birden fazla dilde yayınlayın",
        price: "₺5.000"
      },
      {
        name: "İçerik Yazarlığı",
        description: "Sayfa metinleri profesyonel yazılsın",
        price: "₺500"
      },
      {
        name: "Logo Tasarımı / Yenileme",
        description: "Logo tasarımı veya mevcut logo yenileme",
        price: "₺2.500"
      },
      {
        name: "Hız Optimizasyonu",
        description: "Mevcut site için hız optimizasyonu",
        price: "₺2.500"
      },
      {
        name: "Aylık Bakım",
        description: "Site bakımı ve güncelleme",
        price: "₺500/ay"
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
        <ServiceProcess data={serviceData} duration="7 - 14 Gün" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
