"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectDetail } from "@/components/project-detail"
import { CTA } from "@/components/cta"
import { useParams } from "next/navigation"

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        <ProjectDetail slug={slug} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}



