import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function YapayZekaEntegrasyonlariPage() {
  // Pricing packages'ı önce tanımlıyoruz
  const pricing = [
    {
      name: "Starter",
      price: "₺20.000",
      period: "başlangıç",
      features: [
        "Web sitesi veya WhatsApp/Telegram chatbot entegrasyonu",
        "SSS (sık sorulan sorular) tabanlı yanıt sistemi",
        "Temel NLP (kullanıcı niyetini anlama)",
        "Basit dashboard → soru-cevap kayıtları",
        "1 revizyon hakkı"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "₺60.000",
      period: "başlangıç",
      features: [
        "Starter'daki her şey +",
        "CRM/ERP entegrasyonu (müşteri bilgileri, sipariş durumu, fatura sorgulama)",
        "AI destekli raporlama (Excel, Power BI, özel dashboard entegrasyonu)",
        "Öneri sistemleri (ör. ürün tavsiyesi, upsell/cross-sell)",
        "Çok dilli destek (TR/EN)",
        "2 revizyon hakkı"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "₺100.000",
      period: "başlangıç",
      features: [
        "Pro'daki her şey +",
        "Özel AI modelleri (OpenAI, Azure AI, HuggingFace entegrasyonu)",
        "Sesli asistan entegrasyonu (IVR / Voice bot)",
        "Görüntü işleme (ürün tanıma, kalite kontrol)",
        "Gerçek zamanlı öneri motoru (reklam optimizasyonu, satış tahmini)",
        "Güvenlik + loglama (KVKK/GDPR uyumlu)",
        "3 revizyon hakkı + 6 ay SLA desteği"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Yapay Zeka Entegrasyonları",
    subtitle: "Geleceğin Teknolojisi Bugün",
    description: "Chatbot, makine öğrenmesi, doğal dil işleme ve diğer AI teknolojilerini işletmenize entegre ediyoruz. Otomasyon ve verimlilik artışı sağlıyoruz.",
    detailDescription: "Yapay zeka entegrasyonları, işletmenizi geleceğe taşır. İş süreçlerinizi optimize eden akıllı çözümler sunuyoruz. Chatbot'lardan makine öğrenmesine kadar geniş bir AI ekosistemi ile verimliliğinizi artırıyoruz.",
    icon: "🤖",
    serviceType: "yapay-zeka",
    packagesTitle: "Paketlerde neler olmalı?",
    labels: {
      detailsBadge: "Hizmet Detayları",
      whyPrefix: "Neden",
      processBadge: "Süreç",
      processHeadingBefore: "Nasıl",
      processHeadingGradient: "Çalışıyoruz",
      processSubtitle: "İhtiyaç analiziyle başlar, eskizler ve revizyonlarla netleşir, brandbook ile teslim ederiz.",
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
      featuresAI: [
        { title: "Chatbot Geliştirme", description: "Akıllı müşteri hizmetleri" },
        { title: "Makine Öğrenmesi", description: "Veri analizi & tahminleme" },
        { title: "Doğal Dil İşleme", description: "Metin analizi & anlama" },
        { title: "İş Süreci Otomasyonu", description: "Rutin işleri otomatikleştirme" },
        { title: "Görüntü İşleme", description: "Görsel analiz & tanıma" },
        { title: "Gerçek Zamanlı Analiz", description: "Anlık veri işleme" },
      ],
    },
    features: [
      {
        title: "Chatbot Geliştirme",
        description: "Akıllı müşteri hizmetleri",
        icon: "💬"
      },
      {
        title: "Makine Öğrenmesi",
        description: "Veri analizi ve tahminleme",
        icon: "🧠"
      },
      {
        title: "Doğal Dil İşleme",
        description: "Metin analizi ve anlama",
        icon: "📝"
      },
      {
        title: "İş Süreci Otomasyonu",
        description: "Rutin işleri otomatikleştirme",
        icon: "⚙️"
      }
    ],
    process: [
      {
        step: "1",
        title: "İhtiyaç Analizi",
        description: "AI çözümü gerektiren süreçleri belirliyoruz."
      },
      {
        step: "2", 
        title: "Model Seçimi",
        description: "En uygun AI modelini ve teknolojisini seçiyoruz."
      },
      {
        step: "3",
        title: "Geliştirme & Eğitim",
        description: "AI sistemini geliştirip eğitiyoruz."
      },
      {
        step: "4",
        title: "Entegrasyon & Test",
        description: "Mevcut sistemlere entegre edip test ediyoruz."
      }
    ],
    addOnServices: [
      {
        name: "Ek Dil Desteği",
        description: "İngilizce + Almanca vb.",
        price: "₺2.500"
      },
      {
        name: "Özel Veriyle Model Eğitimi",
        description: "Müşteri e-postalarıyla fine-tuning",
        price: "₺7.500"
      },
      {
        name: "AI Destekli İçerik Üretimi",
        description: "Blog, sosyal medya, ürün açıklaması",
        price: "₺8.000"
      },
      {
        name: "Görüntü İşleme Modülü",
        description: "Ürün görselleri, kalite kontrol",
        price: "₺20.000"
      },
      {
        name: "Sesli Asistan Modülü",
        description: "Çağrı merkezi entegrasyonu",
        price: "₺25.000"
      },
      {
        name: "Kullanıcı Eğitimi",
        description: "Ekibinize AI kullanım eğitimi",
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
        <ServiceProcess data={serviceData} duration="2 - 4 Hafta" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
