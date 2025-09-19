import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function EgitimMentorlukPage() {
  const serviceData = {
    title: "Eğitim & Mentorluk",
    subtitle: "Dijital Becerilerinizi Geliştirin",
    description: "Web geliştirme, tasarım, dijital pazarlama ve teknoloji konularında profesyonel eğitim ve mentorluk hizmeti sunuyoruz. Bireysel veya kurumsal eğitim programları ile ekibinizin yetkinliklerini artırıyoruz.",
    icon: "🎓",
    features: [
      {
        title: "Kişiselleştirilmiş Eğitim",
        description: "Seviyenize özel program",
        icon: "👤"
      },
      {
        title: "Uygulamalı Öğrenme",
        description: "Proje bazlı eğitim",
        icon: "🛠️"
      },
      {
        title: "1:1 Mentorluk",
        description: "Kişisel rehberlik",
        icon: "🤝"
      },
      {
        title: "Sertifika Programı",
        description: "Uluslararası geçerlilik",
        icon: "📜"
      }
    ],
    process: [
      {
        step: "1",
        title: "Seviye Belirleme",
        description: "Mevcut bilgi seviyenizi değerlendiriyoruz."
      },
      {
        step: "2", 
        title: "Program Tasarımı",
        description: "İhtiyaçlarınıza özel eğitim programı oluşturuyoruz."
      },
      {
        step: "3",
        title: "Eğitim & Mentorluk",
        description: "Uygulamalı eğitim ve kişisel mentorluk veriyoruz."
      },
      {
        step: "4",
        title: "Değerlendirme",
        description: "Öğrenme sürecini değerlendirip sertifika veriyoruz."
      }
    ],
    pricing: [
      {
        name: "Temel Eğitim",
        price: "₺1.500",
        period: "aylık",
        features: [
          "8 Saat Eğitim",
          "Temel Konular",
          "E-posta Destek",
          "Sertifika",
          "Kaynak Materyaller"
        ],
        popular: false
      },
      {
        name: "Profesyonel Eğitim",
        price: "₺3.000",
        period: "aylık",
        features: [
          "16 Saat Eğitim",
          "İleri Seviye",
          "1:1 Mentorluk",
          "Proje Desteği",
          "Uluslararası Sertifika"
        ],
        popular: true
      },
      {
        name: "Kurumsal Eğitim",
        price: "₺8.000+",
        period: "aylık",
        features: [
          "Sınırsız Eğitim",
          "Özel Program",
          "Ekip Mentorluğu",
          "Sürekli Destek",
          "Kurumsal Sertifika"
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
