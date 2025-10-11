/**
 * Performance utilities to prevent forced reflows
 */

/**
 * Batch DOM reads and writes to prevent forced reflows
 */
export const batchDOMOperations = (readOps: (() => void)[], writeOps: (() => void)[]) => {
  // Execute all reads first
  requestAnimationFrame(() => {
    readOps.forEach(op => op())
    
    // Then execute all writes
    requestAnimationFrame(() => {
      writeOps.forEach(op => op())
    })
  })
}

/**
 * Debounce function to prevent excessive reflows
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for scroll/resize events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Read DOM properties without causing reflow
 */
export const readDOMProperty = <T>(element: HTMLElement, property: keyof HTMLElement): T => {
  return element[property] as unknown as T
}

/**
 * Safe scroll with RAF to prevent forced reflow
 */
export const safeScrollTo = (options: ScrollToOptions) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(options)
    })
  })
}

/**
 * Safe element scroll into view with RAF
 */
export const safeScrollIntoView = (element: HTMLElement, options?: ScrollIntoViewOptions) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.scrollIntoView(options)
    })
  })
}

