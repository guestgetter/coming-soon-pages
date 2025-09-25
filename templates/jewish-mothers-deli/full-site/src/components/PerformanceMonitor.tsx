import { useEffect } from 'react'
import { measureCoreWebVitals, preloadCriticalResources, optimizeImages, optimizeScroll } from '../utils/performanceUtils'

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV === 'production') {
      // Preload critical resources
      preloadCriticalResources()
      
      // Optimize images and scroll performance
      optimizeImages()
      optimizeScroll()
      
      // Monitor Core Web Vitals
      measureCoreWebVitals()

      // Monitor long tasks
      if ('PerformanceObserver' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration, 'ms')
            }
          }
        })

        try {
          longTaskObserver.observe({ entryTypes: ['longtask'] })
        } catch (e) {
          // Fallback for older browsers
        }

        // Monitor paint timing
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-paint') {
              console.log('FP:', entry.startTime)
            }
            if (entry.name === 'first-contentful-paint') {
              console.log('FCP:', entry.startTime)
            }
          }
        })

        try {
          paintObserver.observe({ entryTypes: ['paint'] })
        } catch (e) {
          // Fallback for older browsers
        }

        return () => {
          longTaskObserver.disconnect()
          paintObserver.disconnect()
        }
      }
    }
  }, [])

  return null
}

export default PerformanceMonitor
