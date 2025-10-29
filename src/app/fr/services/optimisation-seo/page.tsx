import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Optimisation SEO - Softiel",
  description: "Optimisation pour les moteurs de recherche, meilleur classement Google et augmentation du trafic organique.",
}

export const dynamic = 'force-static'

export default function OptimisationSEOPage() {
  const serviceData = {
    title: "Optimisation\nSEO",
    subtitle: "Mieux classé sur Google",
    description: "Nous optimisons votre site pour un meilleur classement dans les moteurs de recherche. Nous offrons croissance du trafic organique et acquisition de clients.",
    detailDescription: "Le SEO n'est plus seulement la densité de mots-clés, c'est une stratégie centrée sur l'expérience utilisateur. Avec la bonne approche, nous répondons aux algorithmes de Google et aux besoins clients.",
    icon: "🔍",
    serviceType: "seo",
    labels: {
      detailsBadge: "Détails du service",
      whyPrefix: "Pourquoi",
      processBadge: "Processus",
      processHeadingBefore: "Comment",
      processHeadingGradient: "Nous travaillons",
      processSubtitle: "Nous réalisons votre projet étape par étape. À chaque phase, nous restons en contact pour garantir le meilleur résultat.",
      timelineAverage: "Durée moyenne",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Tarification",
      pricingHeadingBefore: "Tarifs",
      pricingHeadingGradient: "Avantageux",
      pricingSubtitle: "Choisissez le pack adapté à votre projet. Des offres sur mesure sont possibles.",
      popularBadge: "Le plus populaire",
      ctaGetOffer: "Demander un devis",
      ctaOfferMessageTemplate: "Bonjour ! Je souhaite obtenir des informations sur l'offre {planName} pour le service {serviceTitle}.",
      domainNotice: "Domaine + SSL + frais d'hébergement non inclus",
      addOnsBadge: "Services additionnels",
      addOnsHeadingBefore: "Services",
      addOnsHeadingGradient: "Additionnels",
      addOnsSubtitle: "Améliorez votre projet avec des options additionnelles. Des solutions flexibles sont proposées.",
      ctaGetDetails: "Voir les détails",
      ctaAddOnMessageTemplate: "Bonjour ! Je souhaite obtenir des informations sur l'option {addOnName} pour le service {serviceTitle}.",
      featuresSEO: [
        { title: "Recherche de Mots-Clés", description: "Analyse et stratégie de mots-clés axées sur le public cible" },
        { title: "SEO Technique", description: "Vitesse du site, compatibilité mobile et optimisation de l'indexation" },
        { title: "Optimisation de Contenu", description: "Production de contenu SEO-friendly et optimisation meta" },
        { title: "Analytics & Suivi", description: "Intégration Google Analytics et Search Console" },
        { title: "Stratégie Backlinks", description: "Développement d'autorité et de profils de liens organiques" },
        { title: "Rapport de Performance", description: "Rapports détaillés mensuels de performance SEO" },
      ],
    },
    features: [
      { title: "Amélioration du classement Google", description: "Nous garantissons la visibilité première page", icon: "🚀" },
      { title: "Gain de trafic organique", description: "Augmentation des visiteurs qualifiés", icon: "📈" },
      { title: "Analyse concurrentielle", description: "Nous nous démarquons sur le marché", icon: "🎯" },
      { title: "Résultats axés ROI", description: "Retour sur investissement garanti", icon: "💰" },
    ],
    process: [
      { step: "1", title: "Audit SEO", description: "Nous analysons la situation actuelle et identifions les domaines d'amélioration." },
      { step: "2", title: "Développement de stratégie", description: "Nous créons une stratégie de mots-clés et un plan de contenu." },
      { step: "3", title: "Optimisation", description: "Nous appliquons optimisations techniques et de contenu." },
      { step: "4", title: "Suivi & Reporting", description: "Nous suivons les performances et fournissons rapports réguliers." },
    ],
    pricing: [
      {
        name: "Starter (SEO Technique)",
        price: "€300",
        period: "mois",
        features: [
          "Audit",
          "Configuration Analytics/Console",
          "Optimisation meta/URL",
          "Plan du site",
          "Rapports Lighthouse",
          "Rapport mensuel",
          "1 révision",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (SEO Croissance)",
        price: "€500",
        period: "mois",
        features: [
          "Starter + recherche mots-clés",
          "Optimisation contenu",
          "Plan blog",
          "Netlinking",
          "SEO images",
          "Rapport détaillé",
          "2 révisions",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (SEO Agressif)",
        price: "€750",
        period: "mois",
        features: [
          "Pro + plus mots-clés/contenu",
          "Stratégie backlinks",
          "Analyse concurrentielle",
          "SEO local",
          "Gestion 360°",
          "Réunion mensuelle",
          "3 révisions",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Mots-clés supplémentaires", description: "Pour 5 mots-clés", price: "€20" },
      { name: "Rédaction Contenu", description: "700-1000 mots, par article", price: "€50" },
      { name: "Packages backlinks", description: "5-10 liens de qualité", price: "€100" },
      { name: "Image SEO", description: "Par pièce", price: "€25" },
      { name: "Rapport", description: "Mensuel", price: "€100/mois" },
      { name: "Rapport", description: "Trimestriel", price: "€200/trimestre" },
      { name: "SEO Landing", description: "Par page", price: "€75" },
    ]
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
        <ServiceProcess data={serviceData} duration="1 - 5 Jours" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
