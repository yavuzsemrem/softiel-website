import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Gestion des Réseaux Sociaux - Softiel",
  description: "Services professionnels de gestion des réseaux sociaux sur Instagram, Facebook, LinkedIn. Nous augmentons la notoriété de votre marque et renforçons l'engagement client.",
}

export const dynamic = 'force-static'

export default function GestionReseauxSociauxPage() {
  const pricing = [
    {
      name: "Starter",
      price: "€300",
      period: "mensuel",
      features: [
        "2 plateformes (Instagram + Facebook)",
        "8 publications par mois (modèle + contenu client)",
        "Design simple (Canva/basé sur modèles)",
        "Suggestions de hashtags et calendrier de contenu",
        "Rapport de performance mensuel",
        "1 droit de révision"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "€500",
      period: "mensuel",
      features: [
        "3-4 plateformes (Instagram, Facebook, LinkedIn, option TikTok)",
        "12-16 publications par mois (nous créons le contenu: visuel + texte)",
        "Design professionnel (Photoshop/Illustrator, spécifique à la marque)",
        "Contenu vidéo simple (reels / animations story)",
        "Planification hebdomadaire + publication régulière",
        "Suivi des commentaires et messages (gestion communautaire de base)",
        "Rapport mensuel détaillé (portée, engagement, analyse de followers)",
        "2 droits de révision"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "€750",
      period: "mensuel",
      features: [
        "Tous les services Pro +",
        "4-5 plateformes (Instagram, Facebook, LinkedIn, TikTok, YouTube)",
        "20+ publications par mois (photo + vidéo + intégration blog)",
        "Production vidéo professionnelle (1-2 vidéos courtes par mois)",
        "Suggestions de collaboration influenceurs",
        "Tests A/B (essais de performance de contenu)",
        "Intégration publicitaire (synchronisation avec campagnes Google Ads / Meta Ads)",
        "Rapport hebdomadaire + réunion stratégique mensuelle",
        "3 droits de révision"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Gestion des\nRéseaux Sociaux",
    subtitle: "Stratégie Efficace",
    description: "Nous produisons du contenu professionnel sur Instagram, Facebook, LinkedIn. Nous augmentons la notoriété de votre marque et renforçons l'engagement client.",
    detailDescription: "La gestion des réseaux sociaux devient la voix de votre marque dans le monde numérique. Nous vous permettons de communiquer efficacement avec votre public cible en pensant stratégiquement. Nous faisons ressortir votre marque sur les réseaux sociaux grâce à la production de contenu professionnel et à la gestion communautaire.",
    icon: "📱",
    serviceType: "sosyal-medya",
    labels: {
      detailsBadge: "Détails du Service",
      whyPrefix: "Pourquoi",
      processBadge: "Processus",
      processHeadingBefore: "Comment",
      processHeadingGradient: "Nous Travaillons",
      processSubtitle: "Nous donnons vie à votre projet étape par étape. Nous restons en contact à chaque étape pour garantir le meilleur résultat.",
      timelineAverage: "Temps Moyen",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Tarification",
      pricingHeadingBefore: "Prix",
      pricingHeadingGradient: "Équitables",
      pricingSubtitle: "Choisissez le bon forfait pour votre projet. Nous proposons également des devis personnalisés pour des besoins spéciaux.",
      popularBadge: "Le Plus Populaire",
      ctaGetOffer: "Obtenir un Devis",
      ctaOfferMessageTemplate: "Bonjour ! Je souhaiterais obtenir des informations sur le plan {planName} pour le service {serviceTitle}.",
      domainNotice: undefined,
      addOnsBadge: "Services Supplémentaires",
      addOnsHeadingBefore: "Services",
      addOnsHeadingGradient: "Supplémentaires",
      addOnsSubtitle: "Améliorez votre projet avec des options supplémentaires. Nous offrons des solutions flexibles pour des besoins spéciaux.",
      ctaGetDetails: "Voir les Détails",
      ctaAddOnMessageTemplate: "Bonjour ! Je souhaiterais obtenir des informations sur le supplément {addOnName} pour le service {serviceTitle}.",
      featuresSocialMedia: [
        { title: "Production de Contenu", description: "Contenu créatif & attrayant" },
        { title: "Design Visuel", description: "Visuels professionnels" },
        { title: "Gestion Communautaire", description: "Engagement & gestion" },
        { title: "Analyse & Rapports", description: "Analyse de performance" },
        { title: "Développement Stratégique", description: "Stratégie ciblée" },
        { title: "Publication Rapide", description: "Contenu régulier" },
      ],
    },
    features: [
      { title: "Production de Contenu", description: "Créatif & attrayant", icon: "✨" },
      { title: "Design Visuel", description: "Visuels professionnels", icon: "🎨" },
      { title: "Gestion Communautaire", description: "Engagement des followers", icon: "👥" },
      { title: "Analyse & Rapports", description: "Performance détaillée", icon: "📊" },
    ],
    process: [
      { step: "1", title: "Développement Stratégique", description: "Nous analysons le public cible et créons une stratégie de réseaux sociaux." },
      { step: "2", title: "Planification du Contenu", description: "Nous planifions le calendrier et les thèmes mensuels." },
      { step: "3", title: "Production de Contenu", description: "Nous produisons et publions du contenu visuel et textuel." },
      { step: "4", title: "Suivi & Optimisation", description: "Nous suivons les performances et améliorons continuellement la stratégie." },
    ],
    addOnServices: [
      { name: "Contenu Supplémentaire", description: "Publications supplémentaires (+4)", price: "€50" },
      { name: "Photographie Professionnelle", description: "Séance photo professionnelle", price: "€75" },
      { name: "Collaboration Influenceur", description: "Gestion collaboration", price: "€250" },
      { name: "Gestion Publicitaire", description: "Intégration publicités", price: "€200" },
      { name: "Gestion de Campagne", description: "Concours/campagne", price: "€150" },
      { name: "Analyse Concurrent", description: "Rapport mensuel/trimestriel", price: "€100" },
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
        <ServiceProcess data={serviceData} duration="1 - 3 Jours" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

