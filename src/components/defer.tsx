"use client"

import React from "react"

interface DeferProps {
  children: React.ReactNode
  /** Görünürlük eşiği (0-1). Varsayılan 0 */
  threshold?: number
  /** Idle bekleme süresi fallback (ms). Varsayılan 300 */
  idleTimeoutMs?: number
  /** SSR sırasında placeholder render etmek için */
  placeholder?: React.ReactNode
}

export function Defer({ children, threshold = 0, idleTimeoutMs = 300, placeholder = null }: DeferProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isIdle, setIsIdle] = React.useState(false)

  React.useEffect(() => {
    let observer: IntersectionObserver | null = null
    if (containerRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
            }
          })
        },
        { threshold }
      )
      observer.observe(containerRef.current)
    } else {
      // IntersectionObserver yoksa görünür say
      setIsVisible(true)
    }

    const idleCb = (cb: () => void) => {
      const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void, opts?: { timeout?: number }) => number)
      if (ric) ric(cb, { timeout: idleTimeoutMs })
      else setTimeout(cb, idleTimeoutMs)
    }
    idleCb(() => setIsIdle(true))

    return () => {
      if (observer && containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [threshold, idleTimeoutMs])

  const shouldRender = isVisible && isIdle

  return (
    <div ref={containerRef}>
      {shouldRender ? children : placeholder}
    </div>
  )
}




