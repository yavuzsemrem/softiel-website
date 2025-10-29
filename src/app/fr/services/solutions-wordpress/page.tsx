import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Solutions WordPress - Softiel",
  description: "Installation WordPress professionnelle, développement de thèmes et solutions CMS. Services WordPress pour e-commerce, sites d'entreprise et projets personnalisés.",
}

export const dynamic = 'force-static'

export default function SolutionsWordPressPage() {
  const serviceData = {
    title: "Solutions\nWordPress",
    subtitle: "Sites Web Facilement Gestionnables",
    description: "Nous créons des sites web professionnels sur WordPress et d'autres plateformes CMS. Nous offrons une gestion de contenu facile, des solutions sécurisées et rapides.",
    detailDescription: "Grâce à la structure flexible de WordPress, nous pouvons créer rapidement et de manière rentable tout type de site web, des petits blogs aux grandes plateformes e-commerce d'entreprise. Nous offrons une liberté illimitée à nos clients en gestion de contenu.",
    icon: "🔧",
    serviceType: "wordpress",
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
      featuresWordPress: [
        { title: "Gestion de Contenu Facile", description: "Ajout et modification faciles de contenu avec éditeur glisser-déposer" },
        { title: "Écosystème de Plugins Riche", description: "Personnalisation illimitée avec plus de 50 000 plugins gratuits et payants" },
        { title: "Mesures de Sécurité Actuelles", description: "Protection avec Wordfence, 2FA et plugins de sécurité" },
        { title: "Infrastructure Prête pour SEO", description: "Optimisation pour moteurs de recherche avec Yoast SEO et RankMath" },
        { title: "Support Multi-Langues", description: "Support de site multilingue avec WPML et Polylang" },
        { title: "Optimisation Cache & Vitesse", description: "Haute performance avec LiteSpeed Cache et intégration CDN" },
      ],
    },
    features: [
      { title: "Gestion Facile", description: "Éditeur glisser-déposer", icon: "🎛️" },
      { title: "Intégration de Plugins", description: "Plugins personnalisés selon les besoins", icon: "🔌" },
      { title: "Sécurité", description: "Mesures de sécurité à jour", icon: "🔒" },
      { title: "SEO Prêt", description: "Optimisation SEO incluse", icon: "🔍" },
    ],
    process: [
      { step: "1", title: "Analyse des Besoins", description: "Nous analysons les besoins du projet et sélectionnons le CMS le plus adapté." },
      { step: "2", title: "Sélection Thème & Plugins", description: "Nous déterminons les thèmes et plugins adaptés aux besoins." },
      { step: "3", title: "Personnalisation", description: "Nous personnalisons les designs et fonctions." },
      { step: "4", title: "Formation & Livraison", description: "Nous fournissons une formation à l'utilisation et livrons le projet." },
    ],
    pricing: [
      {
        name: "Starter (Site d'Entreprise)",
        price: "€750",
        period: "à partir de",
        features: [
          "Installation WordPress + adaptation de thème prêt",
          "5–7 pages (À propos, Services, Contact, etc.)",
          "Responsive (compatible mobile)",
          "Plugins SEO de base (Yoast / RankMath)",
          "1 tour de révision",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (E-Commerce / WooCommerce)",
        price: "€2 000",
        period: "à partir de",
        features: [
          "Tout dans Starter +",
          "Installation WooCommerce",
          "Téléchargement de produits jusqu'à 10 produits (plus est client ou option)",
          "Intégration système de paiement de base (PayPal, Iyzico, etc.)",
          "Intégration modules de livraison",
          "2 tours de révision",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (CMS d'Entreprise / Plateforme de Contenu)",
        price: "€3 500",
        period: "à partir de",
        features: [
          "Tout dans Pro +",
          "Développement thème personnalisé ou child theme",
          "Support multilingue (Polylang, WPML)",
          "Sécurité avancée (Wordfence / 2FA)",
          "Cache avancé + optimisation vitesse (LiteSpeed, CDN)",
          "Rôles utilisateurs pour équipes de contenu",
          "3 tours de révision",
          "Support maintenance 3 mois",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Produit Supplémentaire", description: "Produit supplémentaire", price: "€20" },
      { name: "Multi-Langues", description: "Pack configuration multilingue", price: "€150" },
      { name: "Plugin Personnalisé", description: "Pack développement plugin personnalisé", price: "€300" },
      { name: "Optimisation SEO", description: "Pack optimisation SEO", price: "€150" },
      { name: "Boost Vitesse Site", description: "Pack boost vitesse site", price: "€75" },
      { name: "Maintenance", description: "Pack maintenance et mise à jour mensuelle", price: "€50/mois" },
      { name: "Logo / Rafraîchissement", description: "Logo", price: "€100" },
      { name: "Page Supplémentaire", description: "Page supplémentaire", price: "€100" },
      { name: "Rédaction de Contenu", description: "Rédaction professionnelle de textes de page", price: "€50" },
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
        <ServiceProcess data={serviceData} duration="7 - 14 Jours" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
