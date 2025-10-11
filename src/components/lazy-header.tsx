"use client"

import dynamic from "next/dynamic"

// Header'ı daha küçük parçalara böl
const HeaderCore = dynamic(() => import("@/components/header").then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => <div className="h-16 bg-slate-800 animate-pulse" />
})

export { HeaderCore as Header }




