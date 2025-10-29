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
    labels: {
      detailsBadge: "Hizmet Detayları",
      whyPrefix: "Neden",
      processBadge: "Süreç",
      processHeadingBefore: "Nasıl",
      processHeadingGradient: "Çalışıyoruz",
      processSubtitle: "Projenizi adım adım hayata geçiriyoruz. Her aşamada en iyi sonucu sağlamak için iletişim halinde kalıyoruz.",
      timelineAverage: "Ortalama Süre",
      timelineSupport: "Destek",
      timelineSatisfaction: "Memnuniyet",
      pricingBadge: "Fiyatlandırma",
      pricingHeadingBefore: "Uygun",
      pricingHeadingGradient: "Fiyatlar",
      pricingSubtitle: "Projeniz için doğru paketi seçin. Özel ihtiyaçlar için özel teklifler de hazırlıyoruz.",
      popularBadge: "En Popüler",
      ctaGetOffer: "Teklif Al",
      ctaOfferMessageTemplate: "Merhaba! {serviceTitle} hizmeti için {planName} paketi hakkında bilgi almak istiyorum.",
      domainNotice: "Domain + SSL + hosting ücretleri pakete dahil değildir",
      addOnsBadge: "Ek Hizmetler",
      addOnsHeadingBefore: "Ek",
      addOnsHeadingGradient: "Hizmetler",
      addOnsSubtitle: "Projenizi opsiyonel ek hizmetlerle geliştirin. Özel ihtiyaçlar için esnek çözümler sunuyoruz.",
      ctaGetDetails: "Detayları Gör",
      ctaAddOnMessageTemplate: "Merhaba! {serviceTitle} hizmeti için {addOnName} ek hizmeti hakkında bilgi almak istiyorum.",
      featuresSEO: [
        { title: "Anahtar Kelime Araştırması", description: "Hedef kitleye odaklı anahtar kelime analizi ve strateji" },
        { title: "Teknik SEO", description: "Site hızı, mobil uyum ve indeksleme optimizasyonu" },
        { title: "İçerik Optimizasyonu", description: "SEO dostu içerik üretimi ve meta optimizasyonu" },
        { title: "Analytics & Takip", description: "Google Analytics ve Search Console entegrasyonu" },
        { title: "Backlink Stratejisi", description: "Otorite sağlayan ve organik link profili geliştirme" },
        { title: "Performans Raporu", description: "Aylık detaylı SEO performans raporları" },
      ],
    },
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
          "Denetim",
          "Analytics/Console kurulumu",
          "Meta/URL optimizasyonu",
          "Site haritası",
          "Lighthouse raporları",
          "Aylık rapor",
          "1 revizyon",
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
          "Starter + anahtar kelime araştırması",
          "İçerik optimizasyonu",
          "Blog planı",
          "Linkleme",
          "Görsel SEO",
          "Ayrıntılı rapor",
          "2 revizyon",
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
          "Pro + daha fazla kelime/içerik",
          "Backlink stratejisi",
          "Rakip analizi",
          "Yerel SEO",
          "360° yönetim",
          "Aylık toplantı",
          "3 revizyon",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Ekstra Anahtar Kelime",
        description: "Her 5 kelime başına",
        price: "₺500"
      },
      {
        name: "Ekstra İçerik Yazarlığı",
        description: "700–1000 kelime, makale başına",
        price: "₺1.500"
      },
      {
        name: "Backlink Paketleri",
        description: "5–10 kaliteli link",
        price: "₺3.500"
      },
      {
        name: "SEO Görsel",
        description: "Parça başına",
        price: "₺1.000"
      },
      {
        name: "Rakip Analizi Raporu",
        description: "Aylık",
        price: "₺2.000"
      },
      {
        name: "Rakip Analizi Raporu",
        description: "Çeyreklik",
        price: "₺5.000"
      },
      {
        name: "Landing SEO",
        description: "Sayfa başına",
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
