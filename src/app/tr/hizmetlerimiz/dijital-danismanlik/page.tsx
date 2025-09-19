import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function DijitalDanismanlikPage() {
  const serviceData = {
    title: "Dijital Danışmanlık",
    subtitle: "Dijital Dönüşüm Rehberliği",
    description: "İşletmenizin dijital dönüşüm sürecinde rehberlik ediyoruz. Strateji geliştirme, teknoloji seçimi ve uygulama konularında uzman danışmanlık hizmeti sunuyoruz.",
    icon: "💡",
    features: [
      {
        title: "Strateji Geliştirme",
        description: "Dijital dönüşüm stratejisi",
        icon: "🎯"
      },
      {
        title: "Teknoloji Seçimi",
        description: "En uygun teknoloji önerileri",
        icon: "🔧"
      },
      {
        title: "Süreç İyileştirme",
        description: "İş süreçlerini optimize etme",
        icon: "📈"
      },
      {
        title: "Eğitim & Mentorluk",
        description: "Ekip eğitimi ve rehberlik",
        icon: "👨‍🏫"
      }
    ],
    process: [
      {
        step: "1",
        title: "Mevcut Durum Analizi",
        description: "İşletmenizin mevcut dijital durumunu analiz ediyoruz."
      },
      {
        step: "2", 
        title: "Hedef Belirleme",
        description: "Dijital dönüşüm hedeflerini belirliyoruz."
      },
      {
        step: "3",
        title: "Yol Haritası",
        description: "Adım adım dönüşüm planı oluşturuyoruz."
      },
      {
        step: "4",
        title: "Uygulama Desteği",
        description: "Planı uygularken sürekli destek veriyoruz."
      }
    ],
    pricing: [
      {
        name: "Temel Danışmanlık",
        price: "₺3.000",
        period: "aylık",
        features: [
          "4 Saat Danışmanlık",
          "Temel Analiz",
          "E-posta Destek",
          "Aylık Rapor",
          "Telefon Görüşmesi"
        ],
        popular: false
      },
      {
        name: "Profesyonel Danışmanlık",
        price: "₺6.000",
        period: "aylık",
        features: [
          "8 Saat Danışmanlık",
          "Detaylı Analiz",
          "Strateji Geliştirme",
          "Haftalık Rapor",
          "Video Görüşme"
        ],
        popular: true
      },
      {
        name: "Kurumsal Danışmanlık",
        price: "₺12.000+",
        period: "aylık",
        features: [
          "Sınırsız Danışmanlık",
          "Kapsamlı Analiz",
          "Özel Strateji",
          "Günlük Rapor",
          "Yüz Yüze Toplantı"
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
