"use client"

import { usePathname } from "next/navigation"
import React from "react"

import { NotFoundHero } from "./not-found-hero"
import { NotFoundContent } from "./not-found-content"

type SupportedLang = 'tr' | 'en' | 'de' | 'fr' | 'ru' | 'ar'

function detectLangFromPath(pathname: string): SupportedLang {
  const seg = pathname.split('/').filter(Boolean)[0]
  const supported: SupportedLang[] = ['tr', 'en', 'de', 'fr', 'ru', 'ar']
  if (supported.includes(seg as SupportedLang)) return seg as SupportedLang
  return 'tr'
}

export function NotFoundContainer() {
  const pathname = usePathname() || '/tr'
  const lang = detectLangFromPath(pathname)
  return (
    <>
      <NotFoundHero lang={lang} />
      <NotFoundContent lang={lang} />
    </>
  )
}





