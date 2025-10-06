import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function WordPressCMSCozumleriPage() {
  // Pricing packages'ı önce tanımlıyoruz
  const pricing = [
    {
      name: "Starter (Kurumsal Site)",
      price: "₺15.000",
      period: "başlangıç",
      features: [
        "WordPress kurulumu + hazır tema uyarlaması",
        "5–7 sayfa (Hakkımızda, Hizmetler, İletişim vb.)",
        "Responsive (mobil uyumlu)",
        "Temel SEO eklentileri (Yoast / RankMath)",
        "1 revizyon turu"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro (E-Ticaret / WooCommerce)",
      price: "₺35.000",
      period: "başlangıç",
      features: [
        "Starter'daki her şey +",
        "WooCommerce kurulumu",
        "10 ürüne kadar ürün yükleme (daha fazlası müşteri ya da ek hizmet)",
        "Temel ödeme sistemi entegrasyonu (PayPal, Iyzico vb.)",
        "Kargo modülleri entegrasyonu",
        "2 revizyon turu"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise (Kurumsal CMS / İçerik Platformu)",
      price: "₺60.000",
      period: "başlangıç",
      features: [
        "Pro'daki her şey +",
        "Özel tema veya child theme geliştirme",
        "Çok dilli destek (Polylang, WPML)",
        "Gelişmiş güvenlik (Wordfence / 2FA)",
        "Gelişmiş cache + hız optimizasyonu (LiteSpeed, CDN)",
        "İçerik ekipleri için kullanıcı rolleri",
        "3 revizyon turu",
        "3 ay bakım desteği"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]
  
  const serviceData = {
    title: "WordPress Çözümleri",
    subtitle: "Kolay Yönetilebilir Web Siteleri",
    description: "WordPress ve diğer CMS platformlarında profesyonel web siteleri oluşturuyoruz. İçerik yönetimi kolay, güvenli ve hızlı çözümler sunuyoruz.",
    detailDescription: "WordPress'in esnek yapısı sayesinde küçük blog sitelerinden büyük kurumsal e-ticaret platformlarına kadar her türlü web sitesini hızlıca ve maliyet-etkin bir şekilde oluşturabiliyoruz. İçerik yönetimi konusunda müşterilerinize sınırsız özgürlük sunuyoruz.",
    icon: "🔧",
    serviceType: "wordpress",
    packagesTitle: "2️⃣ Paketlerde neler olmalı?",
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
    addOnServices: [
      {
        name: "Ek Ürün Yükleme",
        description: "Ek ürün yükleme ve optimizasyon",
        price: "₺500"
      },
      {
        name: "Çok Dilli Yapı",
        description: "Çok dilli yapı kurulum paketi",
        price: "₺5.000"
      },
      {
        name: "Özel Plugin Geliştirme",
        description: "Özel plugin geliştirme paketi",
        price: "₺7.500"
      },
      {
        name: "SEO Optimizasyonu",
        description: "SEO optimizasyon paketi",
        price: "₺5.000"
      },
      {
        name: "Site Hızlandırma",
        description: "Site hızlandırma paketi",
        price: "₺2.000"
      },
      {
        name: "Aylık Bakım & Güncelleme",
        description: "Aylık bakım ve güncelleme paketi",
        price: "₺500"
      },
      {
        name: "Logo Tasarımı / Yenileme",
        description: "Logo tasarımı veya mevcut logo yenileme",
        price: "₺2.500"
      },
      {
        name: "Ek Sayfa",
        description: "Ek sayfa tasarımı ve geliştirme",
        price: "₺1.500"
      },
      {
        name: "İçerik Yazarlığı",
        description: "Sayfa metinleri profesyonel yazılsın",
        price: "₺500"
      }
    ],
    pricing: pricing, // packages array'i doğrudan kullanacağız
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
