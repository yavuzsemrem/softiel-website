import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

// Static generation için metadata
export const metadata = {
  title: "Design de Site Web - Softiel",
  description: "Design de site web moderne et responsive. Apparence professionnelle, chargement rapide et services de design web conformes au SEO.",
}

// Static generation - sayfa önceden oluşturulsun
export const dynamic = 'force-static'

export default function WebsiteDesignPage() {
  const serviceData = {
    title: "Design de Site\nWeb",
    subtitle: "Designs Web Modernes et Impactants",
    description: "Démarquez-vous dans le monde numérique avec des sites web professionnels. Offrez la meilleure expérience avec un design responsive, un chargement rapide et une structure conforme au SEO.",
    detailDescription: "Un site web n'est plus seulement une question de partage d'informations, il est devenu le visage numérique de votre marque. Le bon design et l'expérience utilisateur influencent vos clients et augmentent la crédibilité de votre entreprise.",
    serviceType: "web-tasarimi",
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
      pricingSubtitle: "Réalisez votre projet avec des packs pour tous les budgets. Nous proposons des tarifs adaptés à vos besoins.",
      popularBadge: "Le plus populaire",
      ctaGetOffer: "Demander un devis",
      ctaOfferMessageTemplate: "Bonjour ! Je souhaite obtenir des informations sur l'offre {planName} pour le service {serviceTitle}.",
      domainNotice: "Domaine + SSL + frais d'hébergement non inclus",
      addOnsBadge: "Services additionnels",
      addOnsHeadingBefore: "Services",
      addOnsHeadingGradient: "Additionnels",
      addOnsSubtitle: "Améliorez votre projet avec des options additionnelles. Nous offrons des solutions flexibles pour vos besoins spécifiques.",
      ctaGetDetails: "Voir les détails",
      ctaAddOnMessageTemplate: "Bonjour ! Je souhaite obtenir des informations sur l'option {addOnName} pour le service {serviceTitle}.",
      featuresWebDesign: [
        { title: "Design moderne", description: "Designs web tendance et esthétiques" },
        { title: "Mise en page responsive", description: "Adaptation parfaite sur tous les appareils" },
        { title: "Chargement rapide", description: "Haute performance grâce à un code et des images optimisés" },
        { title: "Compatible SEO", description: "Code propre optimisé pour les moteurs de recherche" },
        { title: "Sécurité", description: "Mesures robustes et protection sécurisée par SSL" },
        { title: "Optimisation mobile", description: "Optimisation et design spécifiques aux appareils mobiles" },
      ],
    },
    features: [
      {
        title: "En Ligne en 7-14 Jours",
        description: "Garantie de livraison rapide"
      },
      {
        title: "Adapté Mobile & Rapide",
        description: "Design orienté performance"
      },
      {
        title: "Infrastructure SEO Prête",
        description: "Optimisé pour les moteurs de recherche"
      },
      {
        title: "Droits de Révision",
        description: "Garantie de satisfaction client"
      }
    ],
    process: [
      {
        step: "1",
        title: "Analyse & Planification",
        description: "Nous analysons vos besoins, déterminons votre public cible et développons une stratégie."
      },
      {
        step: "2",
        title: "Design & Prototype",
        description: "Nous créons des wireframes et des maquettes avec des principes de design modernes."
      },
      {
        step: "3",
        title: "Développement",
        description: "Nous codons le site web responsive et rapide à charger."
      },
      {
        step: "4",
        title: "Test & Lancement",
        description: "Nous effectuons des tests complets et lançons le site."
      }
    ],
    pricing: [
      {
        name: "Basique",
        price: "€1,000",
        period: "à partir de",
        features: [
          "5-7 pages (Accueil, À Propos, Services, Contact, etc.)",
          "Responsive (adapté mobile)",
          "SEO de base (meta, plan du site, robots.txt)",
          "1 formulaire de contact + intégration Google Maps",
          "1 tour de révision",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "€2,500",
        period: "à partir de",
        features: [
          "8-12 pages",
          "Design de page d'accueil personnalisé",
          "Infrastructure de blog",
          "2 tours de révision",
          "Prêt pour le multilangue (optionnel)",
          "Optimisation de vitesse avancée (WebP, lazy load, préchargement des polices)",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Entreprise",
        price: "€4,000",
        period: "à partir de",
        features: [
          "12+ pages",
          "Support multilingue",
          "Système de gestion de contenu (WordPress, Headless CMS, etc.)",
          "Intégrations personnalisées (CRM, paiement, API)",
          "3 tours de révision",
          "Normes d'accessibilité (conformité WCAG)",
          "3 mois de maintenance et support gratuits",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Page Supplémentaire",
        description: "Conception d’une page supplémentaire",
        price: "€100"
      },
      {
        name: "Support Multilingue",
        description: "Support multilingue du site",
        price: "€150"
      },
      {
        name: "Rédaction de Contenu",
        description: "Rédaction professionnelle des pages",
        price: "€50"
      },
      {
        name: "Logo",
        description: "Création ou mise à jour de logo",
        price: "€100"
      },
      {
        name: "Optimisation de Vitesse",
        description: "Optimisation de vitesse du site",
        price: "€200"
      },
      {
        name: "Maintenance Mensuelle",
        description: "Maintenance et mises à jour",
        price: "€50/mois"
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
        <ServiceProcess data={serviceData} duration="7 - 14 Jours" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
