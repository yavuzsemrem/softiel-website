"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Suspense } from 'react'

interface LazySectionProps {
  children: React.ReactNode
  fallback: React.ReactNode
  className?: string
}

export const LazySection = ({ children, fallback, className = "" }: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.disconnect()
        }
      },
      { 
        rootMargin: '200px 0px', // 200px önceden yükle
        threshold: 0.1 
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasLoaded])

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}




