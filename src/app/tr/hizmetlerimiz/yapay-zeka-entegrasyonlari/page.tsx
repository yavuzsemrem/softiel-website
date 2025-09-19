import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function YapayZekaEntegrasyonlariPage() {
  const serviceData = {
    title: "Yapay Zeka Entegrasyonları",
    subtitle: "Geleceğin Teknolojisi Bugün",
    description: "Chatbot, makine öğrenmesi, doğal dil işleme ve diğer AI teknolojilerini işletmenize entegre ediyoruz. Otomasyon ve verimlilik artışı sağlıyoruz.",
    icon: "🤖",
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
        title: "Otomasyon",
        description: "İş süreçlerini otomatikleştirme",
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
    pricing: [
      {
        name: "Chatbot Entegrasyonu",
        price: "₺10.000",
        period: "başlangıç",
        features: [
          "Temel Chatbot",
          "Web Entegrasyonu",
          "Türkçe Destek",
          "3 Ay Destek",
          "Temel Eğitim"
        ],
        popular: false
      },
      {
        name: "AI Otomasyon",
        price: "₺25.000",
        period: "başlangıç",
        features: [
          "Gelişmiş AI",
          "API Entegrasyonu",
          "Veri Analizi",
          "6 Ay Destek",
          "Kapsamlı Eğitim"
        ],
        popular: true
      },
      {
        name: "Özel AI Çözümü",
        price: "₺50.000+",
        period: "başlangıç",
        features: [
          "Özel Geliştirme",
          "Makine Öğrenmesi",
          "Sınırsız Destek",
          "Kaynak Kod",
          "Sürekli Güncelleme"
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
