"use client"

import dynamic from "next/dynamic"
import { ServicesHome } from "@/components/services-home"
import { AboutNew } from "@/components/about-new"
import { Footer } from "@/components/footer"

// Sadece ağır bileşenleri lazy load et
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

const PricingCTA = dynamic(() => import("@/components/pricing-cta").then(mod => ({ default: mod.PricingCTA })), {
  ssr: false,
  loading: () => <div className="h-64 bg-slate-800 animate-pulse" />
})

export default function LazyHomeContent() {
  return (
    <>
      <ServicesHome />
      <AboutNew />
      <Testimonials />
      <PricingCTA />
      <Footer />
    </>
  );
}

