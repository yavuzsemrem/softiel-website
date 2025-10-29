import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Conseil Numérique - Softiel",
  description: "Nous guidons votre transformation numérique: stratégie, choix technologique et exécution mesurable.",
}

export const dynamic = 'force-static'

export default function ConseilNumeriquePage() {
  const pricing = [
    { name: "Starter", price: "€300", period: "à partir de", features: [
      "Audit numérique ponctuel (site, social, SEO, ads)",
      "Analyse SWOT",
      "Recommandations clés",
      "Feuille de route simple (3–6 mois)",
      "1 révision"
    ], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
    { name: "Pro", price: "€500", period: "mensuel", features: [
      "Tout dans Starter +",
      "2 réunions mensuelles (Zoom/Meet)",
      "Guidance continue (Ads, SEO, social)",
      "KPIs & suivi performance",
      "Analyse concurrentielle (trimestrielle)",
      "2 révisions"
    ], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
    { name: "Enterprise", price: "€750", period: "mensuel", features: [
      "Tout dans Pro +",
      "Sessions hebdo/mensuelles",
      "Feuille de route (1 an)",
      "Choix technologique (ERP, CRM, e‑commerce)",
      "Formations équipe",
      "Reporting & mises à jour",
      "3 révisions + SLA 6 mois"
    ], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
  ]

  const serviceData = {
    title: "Conseil\nNumérique",
    subtitle: "Pilotage de la transformation digitale",
    description: "Conseil en stratégie et choix technologique.",
    detailDescription: "Nous analysons votre situation et définissons un chemin clair vers vos objectifs.",
    icon: "💡",
    serviceType: "danismanlik",
    labels: {
      detailsBadge: "Détails du Service",
      whyPrefix: "Pourquoi",
      processBadge: "Processus",
      processHeadingBefore: "Comment",
      processHeadingGradient: "Nous Travaillons",
      processSubtitle: "Mise en œuvre pas à pas avec KPIs mesurables.",
      timelineAverage: "Temps Moyen",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Tarification",
      pricingHeadingBefore: "Prix",
      pricingHeadingGradient: "Équitables",
      pricingSubtitle: "Choisissez le bon plan.",
      popularBadge: "Le Plus Populaire",
      ctaGetOffer: "Obtenir un Devis",
      ctaOfferMessageTemplate: "Bonjour ! Je souhaite des infos sur l'offre {planName} pour {serviceTitle}.",
      domainNotice: undefined,
      addOnsBadge: "Services Suppl.",
      addOnsHeadingBefore: "Services",
      addOnsHeadingGradient: "Suppl.",
      addOnsSubtitle: "Renforcez avec des options.",
      ctaGetDetails: "Voir les Détails",
      ctaAddOnMessageTemplate: "Bonjour ! Infos sur {addOnName} pour {serviceTitle}.",
      featuresConsulting: [
        { title: "Développement Stratégique", description: "Feuille de route" },
        { title: "Choix Technologique", description: "Bon outils" },
        { title: "Amélioration des Processus", description: "Efficacité" },
        { title: "Formation & Mentorat", description: "Équipe prête" },
        { title: "Analyse & Rapports", description: "KPIs & insights" },
        { title: "Analyse Concurrentielle", description: "Position marché" },
      ],
    },
    features: [
      { title: "Développement Stratégique", description: "Plan clair", icon: "🎯" },
      { title: "Choix Technologique", description: "Bonnes plateformes", icon: "🔧" },
      { title: "Amélioration des Processus", description: "Efficience", icon: "📈" },
      { title: "Formation & Mentorat", description: "Équipe formée", icon: "👨‍🏫" },
    ],
    process: [
      { step: "1", title: "Analyse Actuelle", description: "Nous analysons votre présence digitale." },
      { step: "2", title: "Définition d'Objectifs", description: "Objectifs mesurables." },
      { step: "3", title: "Feuille de Route", description: "Plan d'action." },
      { step: "4", title: "Accompagnement", description: "Guidance continue." },
    ],
    addOnServices: [
      { name: "Réunion Supplémentaire", description: "Hors forfait mensuel", price: "€50" },
      { name: "Module de Formation", description: "SEO/social/marketing digital", price: "€150" },
      { name: "Choix Technologique", description: "ERP/CRM/e‑commerce", price: "€200" },
      { name: "Analyse Concurrentielle", description: "Rapport détaillé", price: "€200" },
    ],
    pricing: pricing,
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
        <ServiceProcess data={serviceData} duration="1 - 2 Semaines" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


