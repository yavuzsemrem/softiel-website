"use client"

import dynamic from "next/dynamic"

// Header ve Footer'ı lazy load et
const Header = dynamic(() => import("@/components/lazy-header").then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => <div className="h-16 bg-slate-800 animate-pulse" />
})

const Footer = dynamic(() => import("@/components/lazy-footer").then(mod => ({ default: mod.Footer })), {
  ssr: false,
  loading: () => <div className="h-64 bg-slate-900 animate-pulse" />
})

export { Header, Footer }
