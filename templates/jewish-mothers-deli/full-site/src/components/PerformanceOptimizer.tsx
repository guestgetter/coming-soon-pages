import React, { useEffect } from 'react'

export const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Preload critical resources
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

    // Add resource hints for better performance
    const resourceHints = [
      { rel: 'preconnect', href: 'https://images.unsplash.com' },
      { rel: 'dns-prefetch', href: 'https://images.unsplash.com' }
    ]

    resourceHints.forEach(hint => {
      const link = document.createElement('link')
      link.rel = hint.rel
      link.href = hint.href
      document.head.appendChild(link)
    })

    // Optimize scroll performance
    let ticking = false
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Force a repaint to prevent scroll lag
          document.body.style.transform = 'translateZ(0)'
          ticking = false
        })
        ticking = true
      }
    }

    // Add passive scroll listeners for better performance
    const addPassiveScrollListeners = () => {
      const elements = document.querySelectorAll('[data-scroll-optimize]')
      elements.forEach(element => {
        element.addEventListener('scroll', optimizeScroll, { passive: true })
      })
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addPassiveScrollListeners)
    } else {
      addPassiveScrollListeners()
    }

    // Cleanup
    return () => {
      const elements = document.querySelectorAll('[data-scroll-optimize]')
      elements.forEach(element => {
        element.removeEventListener('scroll', optimizeScroll)
      })
    }
  }, [])

  return null
}

export default PerformanceOptimizer
