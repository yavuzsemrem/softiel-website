import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export default function LogoKurumsalKimlikTasarimiPage() {
  // Pricing packages'ı önce tanımlıyoruz
  const pricing = [
    {
      name: "Starter (Sadece Logo)",
      price: "₺5.000",
      period: "başlangıç",
      features: [
        "3 logo konsepti (farklı tasarım yönleri)",
        "2 revizyon hakkı",
        "Renk varyasyonları (renkli, siyah-beyaz, negatif)",
        "Farklı formatlarda teslim (PNG, SVG, PDF, JPG)",
        "Basit kullanım kılavuzu (renk kodları + tipografi önerisi)"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro (Logo + Temel Kimlik)",
      price: "₺10.000",
      period: "başlangıç",
      features: [
        "Starter'daki her şey +",
        "Kartvizit tasarımı",
        "E-posta imza tasarımı",
        "Antetli kağıt & fatura tasarımı",
        "Sosyal medya profil görselleri (Facebook, Instagram, LinkedIn kapakları)",
        "3 revizyon hakkı"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise (Tam Kurumsal Kimlik)",
      price: "₺20.000",
      period: "başlangıç",
      features: [
        "Pro'daki her şey +",
        "Kurumsal kimlik kılavuzu (brandbook) → renk paleti, tipografi, logo kullanımı, ikonografi, görsel stil",
        "Sunum şablonu (PowerPoint/Google Slides)",
        "Broşür/katolog şablonu",
        "Sosyal medya post şablonları",
        "Dijital & basılı kullanım kuralları (logo boyut, aralık, yanlış kullanım örnekleri)",
        "4 revizyon hakkı",
        "3 ay destek (küçük uyarlamalar)"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Logo & Kurumsal Kimlik Tasarımı",
    subtitle: "Güçlü Marka Kimliği",
    description: "Markanızı en iyi şekilde temsil eden logo ve kurumsal kimlik tasarımları oluşturuyoruz. Profesyonel, unutulmaz ve etkili marka kimliği tasarlıyoruz.",
    detailDescription: "Logo ve kurumsal kimlik tasarımı, markanızın görsel DNA'sını oluşturur. Sadece bir logo değil, markanızın her platformda tutarlı ve profesyonel görünmesini sağlayan kapsamlı bir kimlik sistemi tasarlıyoruz. Rakiplerinizden ayrışmanızı sağlayacak özgün tasarımlar ile marka gücünüzü artırıyoruz.",
    icon: "🎨",
    serviceType: "logo-kimlik",
    packagesTitle: "Paketlerde neler olmalı?",
    features: [
      {
        title: "Özgün Logo Tasarımı",
        description: "Markanızı en iyi temsil eden özgün logolar",
        icon: "✨"
      },
      {
        title: "Kurumsal Renk Paleti",
        description: "Marka kimliği için profesyonel renk sistemi",
        icon: "🎨"
      },
      {
        title: "Tipografi Seçimi",
        description: "Marka karakterine uygun yazı tipi",
        icon: "📝"
      },
      {
        title: "Brandbook Kılavuzu",
        description: "Logo kullanım kuralları ve rehberi",
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
    addOnServices: [
      {
        name: "Ek Logo Konsepti",
        description: "Her yeni yön için ek logo konsepti",
        price: "₺2.500"
      },
      {
        name: "Ek Revizyon Turu",
        description: "Ek revizyon turu",
        price: "₺1.000"
      },
      {
        name: "Ek Dil Desteği",
        description: "Brandbook çevirisi (EN/TR vb.)",
        price: "₺1.500"
      },
      {
        name: "Kurumsal Giydirme",
        description: "Kıyafet ve araç giydirme tasarımı",
        price: "₺5.000"
      },
      {
        name: "Animasyonlu Logo",
        description: "Motion logo, intro animasyonu",
        price: "₺3.500"
      },
      {
        name: "Web İkon Seti",
        description: "Web için favicon & app icon seti",
        price: "₺1.000"
      },
      {
        name: "Marka Kimliği Eğitimi",
        description: "Marka kimliği uygulama eğitimi",
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
        <ServiceProcess data={serviceData} duration="1 - 5 Gün" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
