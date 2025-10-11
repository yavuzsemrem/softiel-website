"use client"

import dynamic from "next/dynamic"

// Footer'ı daha küçük parçalara böl
const FooterCore = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  ssr: false,
  loading: () => <div className="h-64 bg-slate-900 animate-pulse" />
})

export { FooterCore as Footer }




