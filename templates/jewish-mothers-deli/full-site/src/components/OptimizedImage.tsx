import React, { useState, useRef, useEffect } from 'react'
import { Box, Image, Skeleton } from '@chakra-ui/react'

interface OptimizedImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  width?: string | number
  height?: string | number
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  borderRadius?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  className?: string
  onClick?: () => void
  sx?: Record<string, unknown>
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  width,
  height,
  objectFit = 'cover',
  borderRadius,
  loading = 'lazy',
  priority = false,
  className,
  onClick,
  sx
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) {
      // Preload priority images
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    }
  }, [src, priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
    } else {
      setHasError(true)
    }
  }

  return (
    <Box
      position="relative"
      width={width}
      height={height}
      borderRadius={borderRadius}
      overflow="hidden"
      className={className}
      onClick={onClick}
      sx={{
        willChange: 'transform',
        transform: 'translateZ(0)', // Force hardware acceleration
        ...sx
      }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <Skeleton
          startColor="gray.200"
          endColor="gray.300"
          width="100%"
          height="100%"
          borderRadius={borderRadius}
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <Box
          width="100%"
          height="100%"
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={borderRadius}
        >
          <Box
            textAlign="center"
            color="gray.500"
            fontSize="sm"
          >
            {alt}
          </Box>
        </Box>
      )}

      {/* Optimized Image */}
      <Image
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        width="100%"
        height="100%"
        objectFit={objectFit}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        opacity={isLoaded ? 1 : 0}
        transition="opacity 0.3s ease"
        borderRadius={borderRadius}
        sx={{
          willChange: 'transform, opacity',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
      />
    </Box>
  )
}

export default React.memo(OptimizedImage)
