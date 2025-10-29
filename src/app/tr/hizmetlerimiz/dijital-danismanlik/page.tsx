import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function DijitalDanismanlikPage() {
  // Pricing packages'ı önce tanımlıyoruz
  const pricing = [
    {
      name: "Starter",
      price: "₺7.500",
      period: "başlangıç",
      features: [
        "1 defalık dijital durum analizi (web sitesi, sosyal medya, SEO, reklamlar)",
        "SWOT analizi (güçlü, zayıf yönler, fırsatlar, tehditler)",
        "Temel iyileştirme önerileri",
        "Basit yol haritası (3–6 aylık plan)",
        "1 revizyon hakkı"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "₺15.000",
      period: "aylık",
      features: [
        "Starter'daki her şey +",
        "Aylık 2 toplantı (Zoom/Meet)",
        "Reklam, SEO, sosyal medya için düzenli yönlendirmeler",
        "KPI belirleme ve performans takibi",
        "Rakip analizi (çeyreklik rapor)",
        "2 revizyon hakkı"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "₺25.000",
      period: "aylık",
      features: [
        "Pro'daki her şey +",
        "Haftalık/aylık düzenli danışmanlık görüşmeleri",
        "Dijital dönüşüm yol haritası (1 yıllık plan)",
        "Teknoloji seçimi (ERP, CRM, e-ticaret platformları)",
        "Eğitim oturumları (ekip için)",
        "Raporlama & strateji güncellemeleri",
        "3 revizyon hakkı",
        "6 ay SLA desteği"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Dijital Danışmanlık",
    subtitle: "Dijital Dönüşüm Rehberliği",
    description: "İşletmenizin dijital dönüşüm sürecinde rehberlik ediyoruz. Strateji geliştirme ve teknoloji seçimi konularında uzman danışmanlık sunuyoruz.",
    detailDescription: "Dijital danışmanlık, işletmenizin dijital dünyada başarılı olması için stratejik rehberlik sağlar. Mevcut durumunuzu analiz ederek, hedeflerinize ulaşmanız için en uygun yolu belirliyoruz.",
    icon: "💡",
    serviceType: "danismanlik",
    packagesTitle: "Paketlerde neler olmalı?",
    labels: {
      detailsBadge: "Hizmet Detayları",
      whyPrefix: "Neden",
      processBadge: "Süreç",
      processHeadingBefore: "Nasıl",
      processHeadingGradient: "Çalışıyoruz",
      processSubtitle: "İhtiyaç analiziyle başlar, strateji oluşturur, planı uygularız.",
      timelineAverage: "Ortalama Süre",
      timelineSupport: "Destek",
      timelineSatisfaction: "Memnuniyet",
      pricingBadge: "Fiyatlandırma",
      pricingHeadingBefore: "Uygun",
      pricingHeadingGradient: "Fiyatlar",
      pricingSubtitle: "İhtiyacınıza en uygun paketi seçin. Özel istekler için teklif sunuyoruz.",
      popularBadge: "En Popüler",
      ctaGetOffer: "Teklif Al",
      ctaOfferMessageTemplate: "Merhaba! {serviceTitle} için {planName} paketi hakkında bilgi almak istiyorum.",
      domainNotice: undefined,
      addOnsBadge: "Ek Hizmetler",
      addOnsHeadingBefore: "Ek",
      addOnsHeadingGradient: "Hizmetler",
      addOnsSubtitle: "Markanızı güçlendirecek ek hizmetleri seçin.",
      ctaGetDetails: "Detayları Gör",
      ctaAddOnMessageTemplate: "Merhaba! {serviceTitle} için {addOnName} ek hizmeti hakkında bilgi almak istiyorum.",
      featuresConsulting: [
        { title: "Strateji Geliştirme", description: "Dijital roadmap" },
        { title: "Teknoloji Seçimi", description: "Doğru araçlar" },
        { title: "Süreç İyileştirme", description: "Verimlilik" },
        { title: "Eğitim & Mentorluk", description: "Takım geliştirme" },
        { title: "Analiz & Raporlama", description: "KPI & insights" },
        { title: "Rakip Analizi", description: "Pazar konumu" },
      ],
    },
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
    addOnServices: [
      {
        name: "Ekstra Toplantı",
        description: "Aylık paket dışında",
        price: "₺1.000"
      },
      {
        name: "Eğitim Modülü",
        description: "SEO/sosyal medya/dijital pazarlama",
        price: "₺3.000"
      },
      {
        name: "Teknoloji Seçimi Danışmanlığı",
        description: "ERP/CRM/e-ticaret seçimi",
        price: "₺5.000"
      },
      {
        name: "Rakip Derinlemesine Analiz Raporu",
        description: "Kapsamlı rakip analizi",
        price: "₺5.000"
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
        <ServiceProcess data={serviceData} duration="1 - 2 Hafta" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
