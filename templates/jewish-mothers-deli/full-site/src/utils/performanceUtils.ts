// Performance utility functions for monitoring and optimization

export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start}ms`)
  return end - start
}

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout
  return ((...args: unknown[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

export const requestIdleCallback = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback)
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    return setTimeout(callback, 1)
  }
}

export const cancelIdleCallback = (id: number) => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id)
  } else {
    clearTimeout(id)
  }
}

export const optimizeImages = () => {
  // Add loading="lazy" to all images that don't have it
  const images = document.querySelectorAll('img:not([loading])')
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy')
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async')
    }
  })
}

export const optimizeScroll = () => {
  // Add passive scroll listeners to all scrollable elements
  const scrollableElements = document.querySelectorAll('[data-scroll-optimize]')
  scrollableElements.forEach(element => {
    element.addEventListener('scroll', () => {}, { passive: true })
  })
}

export const measureCoreWebVitals = () => {
  if ('PerformanceObserver' in window) {
    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime)
    })
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.log('LCP monitoring not supported')
    }

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        const fidEntry = entry as PerformanceEntry & { processingStart: number }
        console.log('FID:', fidEntry.processingStart - entry.startTime)
      })
    })
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (e) {
      console.log('FID monitoring not supported')
    }

    // CLS (Cumulative Layout Shift)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value
        }
      }
      console.log('CLS:', clsValue)
    })
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      console.log('CLS monitoring not supported')
    }
  }
}

export const preloadCriticalResources = () => {
  // Preload critical images only (removed favicon to avoid preload warnings)
  const criticalImages: string[] = [
    // Favicon removed - browsers automatically request it
  ]

  if (criticalImages.length > 0) {
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }
}
