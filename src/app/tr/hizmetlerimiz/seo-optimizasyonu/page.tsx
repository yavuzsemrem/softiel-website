import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

// Static generation için metadata
export const metadata = {
  title: "SEO Optimizasyonu - Softiel",
  description: "Arama motoru optimizasyonu, Google'da üst sıralarda yer alma ve organik trafik artırma hizmetleri.",
}

// Static generation - sayfa önceden oluşturulsun
export const dynamic = 'force-static'

export default function SEOAramaMotoruOptimizasyonuPage() {
  const serviceData = {
    title: "SEO Optimizasyonu",
    subtitle: "Google'da Üst Sıralarda Yer Alın",
    description: "Web sitenizi arama motorlarında üst sıralarda yer alması için optimize ediyoruz. Organik trafik artışı ve müşteri kazanımı sağlıyoruz.",
    detailDescription: "SEO artık sadece anahtar kelime yoğunluğu değil, kullanıcı deneyimi odaklı bir stratejidir. Doğru yaklaşımla hem Google'ın algoritmalarını hem de müşteri ihtiyaçlarını karşılıyoruz.",
    icon: "🔍",
    serviceType: "seo",
    features: [
      {
        title: "Google Rank Artışı",
        description: "İlk sayfada görünürlük sağlıyoruz",
        icon: "🚀"
      },
      {
        title: "Organik Trafik Kazanımı",
        description: "Kaliteli ziyaretçi artışı",
        icon: "📈"
      },
      {
        title: "Rakip Analizi",
        description: "Pazarda öne çıkarıyoruz",
        icon: "🎯"
      },
      {
        title: "ROI Odaklı Sonuç",
        description: "Yatırımın geri dönüşü garantili",
        icon: "💰"
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
        name: "Starter (Teknik SEO)",
        price: "₺7.500",
        period: "aylık",
        features: [
          "5 Anahtar Kelime",
          "Teknik SEO",
          "Aylık Rapor",
          "Google Analytics",
          "3 Ay Minimum"
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (Büyüme SEO)",
        price: "₺15.000",
        period: "aylık",
        features: [
          "15 Anahtar Kelime",
          "İçerik Üretimi",
          "Haftalık Rapor",
          "Rakip Analizi",
          "6 Ay Minimum"
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Agresif SEO)",
        price: "₺25.000",
        period: "aylık",
        features: [
          "Sınırsız Kelime",
          "Ürün Optimizasyonu",
          "Günlük Takip",
          "Özel Strateji",
          "12 Ay Minimum"
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Ekstra Anahtar Kelime",
        description: "Ek anahtar kelime araştırma ve optimizasyon",
        price: "₺500"
      },
      {
        name: "Ekstra İçerik Yazarlığı",
        description: "SEO uyumlu içerik üretimi paketi",
        price: "₺1.500"
      },
      {
        name: "Backlink Paketleri",
        description: "Kaliteli backlink kazanım paketi",
        price: "₺3.500"
      },
      {
        name: "SEO Uyumlu Görsel",
        description: "Optimize edilmiş görsel tasarım paketi",
        price: "₺1.000"
      },
      {
        name: "Rakip Analizi Raporu",
        description: "Detaylı rakip analiz paketi",
        price: "₺2.000"
      },
      {
        name: "Landing Page SEO",
        description: "Landing page optimizasyon paketi",
        price: "₺2.000"
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
        <ServiceProcess data={serviceData} duration="1 - 5 Gün" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
