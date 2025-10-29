import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Logo & Kurumsal Kimlik Tasarımı - Softiel",
  description: "Özgün logo tasarımı, marka kimliği, tipografi ve brandbook kılavuzu ile profesyonel kurumsal kimlik çözümleri.",
}

export const dynamic = 'force-static'

export default function LogoKurumsalKimlikPage() {
  const serviceData = {
    title: "Logo &\nKurumsal Kimlik",
    subtitle: "Güçlü ve Tutarlı Marka Dili",
    description: "Markanızı özgün logo, renk paleti, tipografi ve kurumsal kimlik kılavuzu ile profesyonelce konumlandırıyoruz.",
    detailDescription: "Tutarlı marka kimliği; güven, hatırlanabilirlik ve profesyonel algı oluşturur. Tüm temas noktalarında aynı dili konuşan, ölçeklenebilir bir kurumsal yapı sunuyoruz.",
    icon: "🎨",
    serviceType: "logo-kimlik",
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
      featuresLogoIdentity: [
        { title: "Özgün Logo Tasarımı", description: "Etkileyici ve akılda kalıcı" },
        { title: "Marka Kimliği", description: "Renk paleti & tipografi" },
        { title: "Kurumsal Kimlik Kılavuzu", description: "Brandbook teslim" },
        { title: "Çoklu Format Desteği", description: "PNG, SVG, PDF" },
        { title: "Revizyon Hakkı", description: "Memnuniyet odaklı" },
        { title: "Hızlı Teslimat", description: "Planlı süreç yönetimi" },
      ],
    },
    features: [
      { title: "Özgün Logo Tasarımı", description: "Özgün & profesyonel", icon: "🎯" },
      { title: "Kurumsal Renk Paleti", description: "Tutarlı görünüm", icon: "🎨" },
      { title: "Tipografi Seçimi", description: "Okunabilir & uyumlu", icon: "🔤" },
      { title: "Brandbook Kılavuzu", description: "Standartlar & kullanım", icon: "📘" },
    ],
    process: [
      { step: "1", title: "Keşif & Brief", description: "İhtiyaç analizi ve rakip taraması" },
      { step: "2", title: "Eskiz & Yön", description: "Tasarım yönleri ve geri bildirim" },
      { step: "3", title: "Revizyonlar", description: "Seçili yönün iyileştirilmesi" },
      { step: "4", title: "Teslim", description: "Brandbook ve formatlar" },
    ],
    pricing: [
      { name: "Starter", price: "₺5.000", period: "başlangıç", features: ["3 tasarım yönü", "2 revizyon", "PNG/SVG/PDF"], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "₺10.000", period: "başlangıç", features: ["Logo + renk paleti", "Tipografi", "2 revizyon", "Brandbook"], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "₺20.000", period: "başlangıç", features: ["Logo + kurumsal set", "Şablonlar", "3 revizyon", "Geniş brandbook"], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "Ek Logo Konsepti", description: "Her yeni yön için", price: "₺2.500" },
      { name: "Ek Revizyon Turu", description: "Ek revizyon hakkı", price: "₺1.000" },
      { name: "Ek Dil Desteği", description: "Brandbook çevirisi", price: "₺1.500" },
      { name: "Kurumsal Giydirme", description: "Kıyafet/araç tasarımı", price: "₺5.000" },
      { name: "Animasyonlu Logo", description: "Motion logo, intro", price: "₺3.500" },
      { name: "Web İkon Seti", description: "Favicon & app icon", price: "₺1.000" },
      { name: "Marka Kimliği Eğitimi", description: "Şirket içi eğitim", price: "₺5.000" },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <ServiceHero data={serviceData} />
        <ServiceDetails data={serviceData} />
        <ServiceProcess data={serviceData} duration="5 - 10 Gün" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
