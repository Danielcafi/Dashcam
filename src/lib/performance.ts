// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
  } else {
    fn()
  }
}

export const reportWebVitals = (metric: { name: string; id: string; value: number }) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-expect-error - gtag is added by Google Analytics
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}

// Image optimization helper
export const getOptimizedImageUrl = (src: string) => {
  // In production, you might want to use a CDN or image optimization service
  return src
}

// Lazy loading helper
export const useIntersectionObserver = (callback: () => void, options?: IntersectionObserverInit) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
          observer.disconnect()
        }
      })
    }, options)
    
    return observer
  }
  return null
}
