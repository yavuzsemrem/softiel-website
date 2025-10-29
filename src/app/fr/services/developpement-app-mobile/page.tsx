import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Développement d'applications mobiles - Softiel",
  description: "Développement d'applications iOS et Android. Solutions natives et cross-platform.",
}

export const dynamic = 'force-static'

export default function DeveloppementAppMobilePage() {
  const serviceData = {
    title: "Développement\nd'applications mobiles",
    subtitle: "Applications iOS & Android",
    description: "Nous développons des applications iOS et Android à partir d'une seule base de code. Nous proposons des solutions du MVP au niveau Enterprise.",
    detailDescription: "Les applications mobiles sont maintenant essentielles pour les entreprises. Alors que les utilisateurs passent 90% de leur temps sur les appareils mobiles, la bonne stratégie mobile offre un accès 24/7 à vos clients et vous donne un avantage concurrentiel.",
    icon: "📱",
    serviceType: "mobil-uygulama",
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
      featuresMobileApp: [
        { title: "Cross-Platform", description: "Applications iOS et Android à partir d'une seule base de code" },
        { title: "Développement Rapide", description: "Développement rapide d'applications avec des technologies cross-platform modernes" },
        { title: "Compatibilité Store", description: "Applications conformes aux standards App Store et Google Play" },
        { title: "Performance Native", description: "Expérience d'application mobile haute performance" },
        { title: "Intégration Backend", description: "Services de base de données et pusher basés sur API" },
        { title: "Notifications Push", description: "Notifications en temps réel et fonctionnalités d'engagement" },
      ],
    },
    features: [
      { title: "MVP Rapide", description: "Mise en ligne en 3-6 semaines", icon: "⚡" },
      { title: "Base de Code Unique", description: "iOS + Android simultanément", icon: "🔄" },
      { title: "Personnalisable", description: "Modules adaptés à votre activité", icon: "🎯" },
      { title: "Support Long Terme", description: "Garantie de maintenance avec SLA", icon: "🛡️" },
    ],
    process: [
      { step: "1", title: "Analyse des Besoins", description: "Nous analysons vos idées et déterminons la solution adaptée du MVP à l'Enterprise." },
      { step: "2", title: "Prototype & Design", description: "Nous créons un design orienté UX et des prototypes interactifs." },
      { step: "3", title: "Développement Cross-Platform", description: "Nous développons les apps iOS et Android simultanément à partir d'une seule base de code." },
      { step: "4", title: "Tests & Publication Store", description: "Nous effectuons des tests complets et publions sur App Store et Google Play." },
    ],
    pricing: [
      {
        name: "Starter (MVP)",
        price: "€2 000",
        period: "à partir de",
        features: [
          "iOS + Android (Flutter/React Native)",
          "Connexion utilisateur (e-mail/mot de passe)",
          "Page profil + CRUD de base",
          "Notifications push simples",
          "Backend : Firebase/REST API",
          "1 tour de révision",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "€3 500",
        period: "à partir de",
        features: [
          "Toutes les fonctionnalités Starter",
          "Gestion utilisateur avancée (rôles, permissions)",
          "Intégration paiement (Iyzico, Stripe)",
          "Fonctionnalités carte/emplacement",
          "Notifications en temps réel",
          "Panel admin de base",
          "2 tours de révision",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "€5 000",
        period: "à partir de",
        features: [
          "Toutes les fonctionnalités Pro",
          "Support multilingue",
          "Sécurité avancée (2FA, chiffrement)",
          "Chat/socket en temps réel",
          "Backend basé microservices",
          "Intégration CI/CD",
          "SLA + 6 mois de maintenance",
          "3 tours de révision",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Écran Supplémentaire", description: "Nouvel écran", price: "€100" },
      { name: "Intégration Paiement", description: "Intégration Stripe, PayPal ou Iyzico", price: "€300" },
      { name: "Services Carte", description: "Google Maps", price: "€300" },
      { name: "Système de Notifications", description: "Firebase / OneSignal", price: "€200" },
      { name: "Panel Admin", description: "Panel admin web", price: "€400" },
      { name: "Conseil Store", description: "Optimisation, ASO", price: "€200" },
      { name: "Maintenance 6 Mois", description: "Pack maintenance et mises à jour", price: "€100" },
      { name: "Maintenance 12 Mois", description: "Pack maintenance et mises à jour", price: "€200" },
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
        <ServiceProcess data={serviceData} duration="3 - 6 Semaines" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
