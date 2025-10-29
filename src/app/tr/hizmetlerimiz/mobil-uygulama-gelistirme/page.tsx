import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

// Static generation için metadata
export const metadata = {
  title: "Mobil Uygulama Geliştirme - Softiel",
  description: "iOS ve Android mobil uygulama geliştirme. Native ve cross-platform mobil uygulama çözümleri.",
}

// Static generation - sayfa önceden oluşturulsun
export const dynamic = 'force-static'

export default function MobilUygulamaGelistirmePage() {
  const serviceData = {
    title: "Mobil Uygulama Geliştirme",
    subtitle: "iOS & Android Uygulamaları",
    description: "Tek kod tabanıyla iOS ve Android uygulamaları geliştiriyoruz. MVP'den Enterprise'a kadar her seviyede çözüm sunuyoruz.",
    detailDescription: "Mobil uygulamalar artık işletmeler için kritik önem taşıyor. Kullanıcılar zamanlarının %90'ını mobil cihazlarda geçirirken, doğru mobil strateji müşterilerinize 7/24 erişim sağlar ve rekabette avantaj kazandırır.",
    icon: "📱",
    serviceType: "mobil-uygulama",
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
      featuresMobileApp: [
        { title: "Cross Platform", description: "Tek kod tabanıyla iOS ve Android uygulamaları" },
        { title: "Hızlı Geliştirme", description: "Modern cross-platform teknolojiler ile hızlı uygulama geliştirme" },
        { title: "Store Uyumluluğu", description: "App Store ve Google Play standartlarına uyumlu uygulamalar" },
        { title: "Native Performans", description: "Yüksek performanslı mobil uygulama deneyimi" },
        { title: "Backend Entegrasyon", description: "API tabanlı veritabanı ve pusher servisler" },
        { title: "Push Notification", description: "Gerçek zamanlı bildirimler ve engagement özellikleri" },
      ],
    },
    features: [
      {
        title: "Hızlı MVP",
        description: "3-6 haftada yayına alabilirsiniz",
        icon: "⚡"
      },
      {
        title: "Tek Kod Tabanı",
        description: "iOS + Android aynı anda",
        icon: "🔄"
      },
      {
        title: "Özelleştirilebilir",
        description: "İşinize özel modüller",
        icon: "🎯"
      },
      {
        title: "Uzun Vadeli Destek",
        description: "SLA ile bakım garantisi",
        icon: "🛡️"
      }
    ],
    process: [
      {
        step: "1",
        title: "İhtiyaç Analizi",
        description: "Fikirlerinizi analiz edip MVP'den Enterprise'a uygun çözüm belirliyoruz."
      },
      {
        step: "2", 
        title: "Prototip & Tasarım",
        description: "Kullanıcı deneyimi odaklı tasarım ve interaktif prototipler oluşturuyoruz."
      },
      {
        step: "3",
        title: "Cross-Platform Geliştirme",
        description: "Tek kod tabanıyla iOS ve Android uygulamasını eş zamanlı geliştiriyoruz."
      },
      {
        step: "4",
        title: "Test & Store Yayın",
        description: "Kapsamlı testler yapıp App Store ve Google Play'de yayınlıyoruz."
      }
    ],
    pricing: [
      {
        name: "Starter (MVP)",
        price: "₺50.000",
        period: "başlangıç",
        features: [
          "iOS + Android cross-platform",
          "Kullanıcı girişi",
          "Profil + CRUD",
          "Basit bildirim",
          "Firebase/REST",
          "1 revizyon"
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "₺80.000",
        period: "başlangıç",
        features: [
          "Starter + gelişmiş kullanıcı",
          "Ödeme entegrasyonu",
          "Harita",
          "Gerçek zamanlı bildirim",
          "Admin panel",
          "2 revizyon"
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "₺150.000",
        period: "başlangıç",
        features: [
          "Pro + çoklu dil",
          "İleri güvenlik",
          "Chat/socket",
          "Mikroservis backend",
          "CI/CD",
          "SLA + 6 ay bakım",
          "3 revizyon"
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Ek Ekran",
        description: "1 ekran başına",
        price: "₺1.500"
      },
      {
        name: "Ödeme Entegrasyonu",
        description: "Stripe, PayPal, Iyzico",
        price: "₺7.500"
      },
      {
        name: "Harita Servisleri",
        description: "Google Maps, konum bazlı özellikler",
        price: "₺7.500"
      },
      {
        name: "Bildirim Sistemi",
        description: "Firebase / OneSignal",
        price: "₺5.000"
      },
      {
        name: "Admin Panel Geliştirme",
        description: "Web tabanlı",
        price: "₺10.000"
      },
      {
        name: "Store Danışmanlığı",
        description: "Optimizasyon, ASO",
        price: "₺5.000"
      },
      {
        name: "6 Ay Bakım",
        description: "Uygulama bakımı ve güncelleme paketi",
        price: "₺3.000"
      },
      {
        name: "12 Ay Bakım",
        description: "Uygulama bakımı ve güncelleme paketi",
        price: "₺6.000"
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
        <ServiceProcess data={serviceData} duration="3 - 6 Hafta" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
