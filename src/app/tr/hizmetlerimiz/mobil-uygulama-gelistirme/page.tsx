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
    description: "Tek kod tabanıyla iOS ve Android uygulamaları geliştiriyoruz. MVP'den Enterprise'a kadar her seviyede çözüm sunuyoruz.",
    detailDescription: "Mobil uygulamalar artık işletmeler için kritik önem taşıyor. Kullanıcılar zamanlarının %90'ını mobil cihazlarda geçirirken, doğru mobil strateji müşterilerinize 7/24 erişim sağlar ve rekabette avantaj kazandırır.",
    icon: "📱",
    serviceType: "mobil-uygulama",
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
          "iOS + Android (Flutter/React Native)",
          "Kullanıcı girişi (e-posta/şifre)",
          "Profil sayfası + temel CRUD",
          "Basit push notification",
          "Backend: Firebase/REST API",
          "1 revizyon turu"
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
          "Tüm Starter özellikleri",
          "Gelişmiş kullanıcı yönetimi (roller, izinler)",
          "Ödeme entegrasyonu (Iyzico, Stripe)",
          "Harita/konum tabanlı özellikler",
          "Gerçek zamanlı bildirim",
          "Basit admin paneli",
          "2 revizyon turu"
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "₺150.000+",
        period: "başlangıç",
        features: [
          "Tüm Pro özellikleri",
          "Çoklu dil desteği",
          "İleri seviye güvenlik (2FA, şifreleme)",
          "Gerçek zamanlı chat/socket",
          "Mikroservis tabanlı backend",
          "CI/CD entegrasyonu",
          "SLA + 6 ay bakım",
          "3 revizyon turu"
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Ek Ekran",
        description: "Yeni ekran tasarımı ve geliştirme",
        price: "₺1.500"
      },
      {
        name: "Ödeme Entegrasyonu",
        description: "Stripe, PayPal veya Iyzico entegrasyonu",
        price: "₺7.500"
      },
      {
        name: "Harita Servisleri",
        description: "Google Maps, konum bazlı özellikler",
        price: "₺7.500"
      },
      {
        name: "Bildirim Sistemi",
        description: "Firebase Cloud Messaging, OneSignal",
        price: "₺5.000"
      },
      {
        name: "Admin Panel",
        description: "Web tabanlı içerik yönetim paneli",
        price: "₺10.000"
      },
      {
        name: "Store Optimizasyon",
        description: "App Store & Google Play ASO danışmanlığı",
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
