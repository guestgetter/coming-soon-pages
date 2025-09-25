import React from 'react'

// Image optimization utilities for better performance

export const optimizeImageUrl = (url: string, width: number, height: number, quality: number = 80) => {
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}w=${width}&h=${height}&fit=crop&crop=center&q=${quality}&auto=format`
  }
  
  // For other images, return as is
  return url
}

export const getResponsiveImageSizes = () => {
  return {
    small: { width: 400, height: 300 },
    medium: { width: 600, height: 400 },
    large: { width: 800, height: 600 },
    hero: { width: 1200, height: 700 }
  }
}

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Lazy loading hook for images
export const useImageLazyLoad = (src: string, fallback?: string) => {
  const [imageSrc, setImageSrc] = React.useState(fallback || src)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true)
        await preloadImage(src)
        setImageSrc(src)
      } catch (error) {
        console.error('Failed to load image:', error)
        if (fallback) {
          setImageSrc(fallback)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadImage()
  }, [src, fallback])

  return { imageSrc, isLoading }
}
