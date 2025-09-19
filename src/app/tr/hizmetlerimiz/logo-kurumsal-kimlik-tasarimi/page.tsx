import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function LogoKurumsalKimlikTasarimiPage() {
  const serviceData = {
    title: "Logo & Kurumsal Kimlik Tasarımı",
    subtitle: "Güçlü Marka Kimliği",
    description: "Markanızı en iyi şekilde temsil eden logo ve kurumsal kimlik tasarımları oluşturuyoruz. Profesyonel, unutulmaz ve etkili marka kimliği tasarlıyoruz.",
    icon: "🎨",
    features: [
      {
        title: "Logo Tasarımı",
        description: "Özgün ve etkileyici logolar",
        icon: "✨"
      },
      {
        title: "Kurumsal Renkler",
        description: "Marka renk paleti",
        icon: "🎨"
      },
      {
        title: "Tipografi",
        description: "Marka yazı tipi seçimi",
        icon: "📝"
      },
      {
        title: "Uygulama Rehberi",
        description: "Kullanım kılavuzu",
        icon: "📋"
      }
    ],
    process: [
      {
        step: "1",
        title: "Marka Analizi",
        description: "Marka değerlerini, hedef kitleyi ve rakipleri analiz ediyoruz."
      },
      {
        step: "2", 
        title: "Konsept Geliştirme",
        description: "Yaratıcı konseptler geliştirip tasarım yönü belirliyoruz."
      },
      {
        step: "3",
        title: "Tasarım & Revizyon",
        description: "Logo ve kimlik öğelerini tasarlayıp revizyonlar yapıyoruz."
      },
      {
        step: "4",
        title: "Finalizasyon",
        description: "Son halini verip tüm formatlarda teslim ediyoruz."
      }
    ],
    pricing: [
      {
        name: "Logo Paketi",
        price: "₺3.000",
        period: "başlangıç",
        features: [
          "3 Logo Konsepti",
          "2 Revizyon",
          "Vektör Format",
          "PNG & JPG",
          "1 Hafta Teslim"
        ],
        popular: false
      },
      {
        name: "Kurumsal Kimlik",
        price: "₺8.000",
        period: "başlangıç",
        features: [
          "Logo Tasarımı",
          "Renk Paleti",
          "Tipografi",
          "Kartvizit Tasarımı",
          "Uygulama Rehberi"
        ],
        popular: true
      },
      {
        name: "Tam Kimlik Paketi",
        price: "₺15.000",
        period: "başlangıç",
        features: [
          "Kurumsal Kimlik",
          "Antetli Kağıt",
          "Zarf Tasarımı",
          "Sosyal Medya Paketi",
          "Web Tasarım Uyumu"
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
