import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function SocialMediaYonetimiPage() {
  // Pricing packages'ı önce tanımlıyoruz
  const pricing = [
    {
      name: "Starter (Temel Yönetim)",
      price: "₺7.500",
      period: "aylık",
      features: [
        "2 platform (Instagram + Facebook)",
        "Aylık 8 paylaşım (hazır şablon + müşteri içerikleri)",
        "Basit tasarım (Canva/şablon bazlı)",
        "Hashtag ve içerik takvimi önerisi",
        "Aylık performans raporu",
        "1 revizyon hakkı"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro (İçerik + Etkileşim)",
      price: "₺15.000",
      period: "aylık",
      features: [
        "3–4 platform (Instagram, Facebook, LinkedIn, TikTok opsiyon)",
        "Aylık 12–16 paylaşım (biz içerik üretiriz: görsel + metin)",
        "Profesyonel tasarım (Photoshop/Illustrator, markaya özel)",
        "Basit video içerikleri (reels / story animasyonları)",
        "Haftalık planlama + düzenli yayın",
        "Yorum ve mesaj takibi (temel community management)",
        "Aylık ayrıntılı rapor (erişim, etkileşim, takipçi analizi)",
        "2 revizyon hakkı"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise (Tam Stratejik Yönetim)",
      price: "₺25.000",
      period: "aylık",
      features: [
        "Tüm Pro hizmetleri +",
        "4–5 platform (Instagram, Facebook, LinkedIn, TikTok, YouTube)",
        "Aylık 20+ paylaşım (fotoğraf + video + blog entegrasyonu)",
        "Profesyonel video prodüksiyon (aylık 1–2 kısa video)",
        "Influencer işbirliği önerileri",
        "A/B testleri (içerik performans denemeleri)",
        "Reklam entegrasyonu (Google Ads / Meta Ads kampanyaları ile senkron)",
        "Haftalık rapor + aylık strateji toplantısı",
        "3 revizyon hakkı"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Sosyal Medya Yönetimi",
    subtitle: "Etkili Sosyal Medya Stratejisi",
    description: "Instagram, Facebook, LinkedIn platformlarında profesyonel içerik üretimi yapıyoruz. Marka bilinirliğinizi artırıp müşteri etkileşiminizi güçlendiriyoruz.",
    detailDescription: "Sosyal medya yönetimi, markanızın dijital dünyadaki sesi olur. Stratejik düşünerek hedef kitlenizle etkili iletişim kurmanızı sağlıyoruz. Profesyonel içerik üretimi ve topluluk yönetimi ile markanızı sosyal medyada öne çıkarıyoruz.",
    icon: "📱",
    serviceType: "sosyal-medya",
    packagesTitle: "Paketlerde neler olmalı?",
    features: [
      {
        title: "İçerik Üretimi",
        description: "Yaratıcı ve etkileyici içerikler",
        icon: "✨"
      },
      {
        title: "Görsel Tasarım",
        description: "Profesyonel sosyal medya görselleri",
        icon: "🎨"
      },
      {
        title: "Topluluk Yönetimi",
        description: "Takipçi etkileşimi ve yönetimi",
        icon: "👥"
      },
      {
        title: "Analiz & Raporlama",
        description: "Detaylı performans analizi",
        icon: "📊"
      }
    ],
    process: [
      {
        step: "1",
        title: "Strateji Geliştirme",
        description: "Hedef kitle analizi yapıp sosyal medya stratejisi oluşturuyoruz."
      },
      {
        step: "2", 
        title: "İçerik Planlama",
        description: "Aylık içerik takvimi ve tema planlaması yapıyoruz."
      },
      {
        step: "3",
        title: "İçerik Üretimi",
        description: "Görsel ve metin içeriklerini üretip yayınlıyoruz."
      },
      {
        step: "4",
        title: "Takip & Optimizasyon",
        description: "Performansı takip edip stratejiyi sürekli iyileştiriyoruz."
      }
    ],
    addOnServices: [
      {
        name: "Ek İçerik",
        description: "Ek paylaşım (+4 paylaşım)",
        price: "₺1.000"
      },
      {
        name: "Profesyonel Fotoğraf",
        description: "Profesyonel fotoğraf çekimi",
        price: "₺2.000"
      },
      {
        name: "Profesyonel Video",
        description: "Story/reels/tanıtım video çekimi",
        price: "₺2.000"
      },
      {
        name: "Influencer İşbirliği",
        description: "Influencer işbirliği yönetimi",
        price: "₺7.500"
      },
      {
        name: "Reklam Yönetimi",
        description: "Ads entegrasyonu",
        price: "₺5.000"
      },
      {
        name: "Kampanya Yönetimi",
        description: "Çekiliş/kampanya yönetimi",
        price: "₺3.000"
      },
      {
        name: "Rakip Analizi",
        description: "Aylık/çeyreklik rakip analiz raporu",
        price: "₺2.000"
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
        <ServiceProcess data={serviceData} duration="1 - 3 Gün" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
