import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Design de Logo & Identité Visuelle - Softiel",
  description: "Logo personnalisé, identité de marque, typographie et guide brandbook pour une identité cohérente.",
}

export const dynamic = 'force-static'

export default function LogoIdentiteFrPage() {
  const serviceData = {
    title: "Logo &\nIdentité Visuelle",
    subtitle: "Marque Forte et Cohérente",
    description: "Nous positionnons votre marque avec un logo personnalisé, une palette de couleurs, une typographie et un guide brandbook.",
    detailDescription: "Une identité cohérente renforce la confiance et la mémorisation. Nous livrons un langage de marque cohérent sur tous les supports.",
    icon: "🎨",
    serviceType: "logo-kimlik",
    labels: {
      detailsBadge: "Détails du service",
      whyPrefix: "Pourquoi",
      processBadge: "Processus",
      processHeadingBefore: "Comment",
      processHeadingGradient: "Nous travaillons",
      processSubtitle: "Découverte, révisions, livraison avec brandbook.",
      timelineAverage: "Durée moyenne",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Tarification",
      pricingHeadingBefore: "Tarifs",
      pricingHeadingGradient: "Avantageux",
      pricingSubtitle: "Choisissez un pack. Offres sur mesure disponibles.",
      popularBadge: "Le plus populaire",
      ctaGetOffer: "Demander un devis",
      ctaOfferMessageTemplate: "Bonjour ! Je souhaite des infos sur l'offre {planName} pour {serviceTitle}.",
      addOnsBadge: "Services additionnels",
      addOnsHeadingBefore: "Services",
      addOnsHeadingGradient: "Additionnels",
      addOnsSubtitle: "Renforcez votre marque avec des options.",
      ctaGetDetails: "Voir les détails",
      ctaAddOnMessageTemplate: "Bonjour ! Infos sur l'option {addOnName} pour {serviceTitle}.",
      featuresLogoIdentity: [
        { title: "Design de Logo", description: "Impactant & mémorable" },
        { title: "Identité de Marque", description: "Couleurs & typo" },
        { title: "Guide Brandbook", description: "Règles d'usage" },
        { title: "Livraison Multi-format", description: "PNG, SVG, PDF" },
        { title: "Droits de Révision", description: "Satisfaction d'abord" },
        { title: "Livraison Rapide", description: "Processus planifié" },
      ],
    },
    features: [
      { title: "Design de Logo", description: "Unique & pro", icon: "🎯" },
      { title: "Identité de Marque", description: "Look cohérent", icon: "🎨" },
      { title: "Typographie", description: "Lisible & alignée", icon: "🔤" },
      { title: "Guide Brandbook", description: "Standards d'usage", icon: "📘" },
    ],
    process: [
      { step: "1", title: "Découverte & Brief", description: "Besoins & concurrence" },
      { step: "2", title: "Esquisse & Direction", description: "Pistes & retours" },
      { step: "3", title: "Révisions", description: "Affinage de la piste" },
      { step: "4", title: "Livraison", description: "Brandbook et fichiers" },
    ],
    pricing: [
      { name: "Starter", price: "€150", period: "à partir de", features: ["3 concepts", "2 révisions", "PNG/SVG/PDF"], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "€350", period: "à partir de", features: ["Logo + couleurs", "Typographie", "2 révisions", "Brandbook"], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "€750", period: "à partir de", features: ["Logo + set", "Templates", "3 révisions", "Brandbook étendu"], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "Logo Supplémentaire", description: "Par nouvelle direction", price: "€100" },
      { name: "Révision Supplémentaire", description: "Révision additionnelle", price: "€50" },
      { name: "Langue Supplémentaire", description: "Traduction Brandbook", price: "€50" },
      { name: "Uniforme Corporate", description: "Vêtement/véhicule", price: "€150" },
      { name: "Logo Animé", description: "Motion logo, intro", price: "€175" },
      { name: "Set d'Icônes Web", description: "Favicon & app icon", price: "€50" },
      { name: "Formation Identité", description: "Formation interne", price: "€150" },
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
        <ServiceProcess data={serviceData} duration="5 - 10 Jours" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


