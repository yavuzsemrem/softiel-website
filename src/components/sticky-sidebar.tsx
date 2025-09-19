"use client"

import React from "react"
import { BlogDetailSidebar } from "./blog-detail-sidebar"

interface StickySidebarProps {
  currentSlug?: string
}

export function StickySidebar({ currentSlug }: StickySidebarProps) {
  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <BlogDetailSidebar currentSlug={currentSlug} />
    </div>
  )
}
