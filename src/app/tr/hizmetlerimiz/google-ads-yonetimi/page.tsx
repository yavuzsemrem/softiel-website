import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function GoogleAdsMetaAdsYonetimiPage() {
  const serviceData = {
    title: "Google Ads Yönetimi",
    subtitle: "Hedefli Reklam Kampanyaları",
    description: "Google Ads ve Meta Ads platformlarında etkili reklam kampanyaları yönetiyoruz. Düşük maliyetle yüksek dönüşüm oranları elde etmenizi sağlıyoruz.",
    detailDescription: "Online reklamlar artık işletmeler için hayati önem taşıyor. Doğru platform stratejisi ve kampanya yönetimiyle müşterilerinize doğrudan ulaşıp satışlarınızı artırabilirsiniz.",
    icon: "📢",
    serviceType: "google-ads",
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
      featuresGoogleAds: [
        { title: "Hedefli Reklamcılık", description: "Doğru kitleye hassas hedefleme ile ulaşın" },
        { title: "ROI Odaklı Stratejiler", description: "Her kurulan kampanyadan yüksek geri dönüş" },
        { title: "Gerçek Zamanlı Optimizasyon", description: "7/24 kampanya performans takibi ve iyileştirme" },
        { title: "Multi-Platform Yönetim", description: "Google Ads, Meta Ads ve LinkedIn tek elden" },
        { title: "Hızlı Kampanya Kurulumu", description: "24 saat içinde aktif kampanyalar" },
        { title: "Detaylı Performans Analizi", description: "Aylık raporlarla kampanya sonuçları" },
      ],
    },
    features: [
      {
        title: "Hedefli Kampanyalar",
        description: "Doğru müşterilere ulaşın",
        icon: "🎯"
      },
      {
        title: "ROI Artış Garantisi",
        description: "Yatırımınızın geri dönüşü garantili",
        icon: "💰"
      },
      {
        title: "Gerçek Zamanlı Optimizasyon",
        description: "7/24 kampanya takibi",
        icon: "⚡"
      },
      {
        title: "Profesyonel Tasarım",
        description: "Reklam görselleri dahil",
        icon: "🎨"
      }
    ],
    process: [
      {
        step: "1",
        title: "Hedef Kitle Analizi",
        description: "Hedef kitlenizi analiz ediyor, en etkili kanalları belirliyoruz."
      },
      {
        step: "2", 
        title: "Kampanya Tasarımı",
        description: "Reklam metinleri, görseller ve hedefleme stratejisi oluşturuyoruz."
      },
      {
        step: "3",
        title: "Optimizasyon",
        description: "Kampanyaları sürekli optimize ediyor, performansı artırıyoruz."
      },
      {
        step: "4",
        title: "Raporlama",
        description: "Detaylı performans raporları ile sonuçları takip ediyoruz."
      }
    ],
    pricing: [
      {
        name: "Starter (Temel Yönetim)",
        price: "₺7.500",
        period: "aylık",
        features: [
          "Google Ads veya Meta Ads (tek kanal)",
          "Kampanya kurulumu (Arama/Görüntülü/Instagram-Facebook)",
          "Hedefleme ayarları (bölge, demografi, anahtar kelime)",
          "Temel reklam metinleri + görseller (müşteri sağlarsa)",
          "Aylık 1 rapor (temel performans)",
          "1 revizyon / değişiklik"
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (Optimizasyonlu Yönetim)",
        price: "₺15.000",
        period: "aylık",
        features: [
          "Google Ads + Meta Ads (2 kanal birden yönetim)",
          "2-3 kampanya (arama + remarketing + sosyal medya)",
          "Reklam kopyası + görsel tasarımı (bizden)",
          "A/B testleri (başlık, CTA)",
          "Haftalık optimizasyon (bütçe, hedefleme)",
          "Aylık detaylı rapor (CTR, dönüşüm, maliyet analizi)",
          "2 revizyon / değişiklik"
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Stratejik Yönetim)",
        price: "₺25.000",
        period: "aylık",
        features: [
          "Çok kanallı yönetim (Google Ads + Meta + LinkedIn)",
          "5+ kampanya (search, display, remarketing, video, lead ads)",
          "Profesyonel reklam tasarımları (görsel + video dahil)",
          "Dönüşüm hunisi planlama (landing page optimizasyonu dahil)",
          "Haftalık raporlama + aylık strateji toplantısı",
          "Aylık A/B testleri ve sürekli optimizasyon",
          "Reklam bütçesi 50.000₺ üzeri projeler için uygun",
          "3 revizyon / değişiklik"
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Ek kanal yönetimi",
        description: "LinkedIn/TikTok/Twitter – kanal",
        price: "₺3.500 / ay"
      },
      {
        name: "Profesyonel görsel tasarımı",
        description: "Banner, sosyal medya postu – parça başına",
        price: "₺1.500"
      },
      {
        name: "Video reklam üretimi",
        description: "YouTube/Reels/TikTok – video",
        price: "₺2.500"
      },
      {
        name: "Landing page tasarımı",
        description: "Dönüşüm odaklı – sayfa başına",
        price: "₺7.500"
      },
      {
        name: "Hunisi Danışmanlığı",
        description: "CRM entegrasyonu, lead takibi",
        price: "₺5.000"
      },
      {
        name: "Rakip Analizi",
        description: "Tek seferlik",
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
