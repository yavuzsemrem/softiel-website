"use client"

import dynamic from "next/dynamic"

// Fiyatlandırma sayfası bileşenlerini lazy load et
const PricingHero = dynamic(() => import("@/components/pricing-hero").then(mod => ({ default: mod.PricingHero })), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

const PricingPlans = dynamic(() => import("@/components/pricing-plans").then(mod => ({ default: mod.PricingPlans })), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

const PricingFAQ = dynamic(() => import("@/components/pricing-faq").then(mod => ({ default: mod.PricingFAQ })), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

const PricingCTA = dynamic(() => import("@/components/pricing-cta").then(mod => ({ default: mod.PricingCTA })), {
  ssr: false,
  loading: () => <div className="h-64 bg-slate-800 animate-pulse" />
})

export default function LazyPricingContent() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PricingFAQ />
      <PricingCTA />
    </>
  );
}





