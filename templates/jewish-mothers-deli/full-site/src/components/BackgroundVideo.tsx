import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'

interface BackgroundVideoProps {
  src: string
  poster?: string
}

// Lightweight background video with intersection-based lazy load and
// reduced-motion/Save-Data safeguards
const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const media = videoRef.current
    if (!media) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // If user prefers reduced motion or Save-Data is enabled, do not autoplay
    // and skip loading the source entirely.
    // @ts-expect-error navigator.connection may not exist in all browsers
    const saveData = typeof navigator !== 'undefined' && navigator.connection && navigator.connection.saveData

    if (prefersReducedMotion || saveData) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          // Attach src only when in view to avoid early network cost
          if (!media.src) {
            media.src = src
          }
          media.play().catch(() => {})
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' }
    )

    observer.observe(media)

    const onLoadedData = () => setIsLoaded(true)
    media.addEventListener('loadeddata', onLoadedData)

    return () => {
      media.removeEventListener('loadeddata', onLoadedData)
      observer.disconnect()
    }
  }, [src])

  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={-2} overflow="hidden">
      <video
        ref={videoRef}
        // Do not set src initially for lazy loading; it is attached via IntersectionObserver
        // eslint-disable-next-line react/no-unknown-property
        playsInline
        muted
        loop
        autoPlay
        preload="none"
        aria-hidden="true"
        poster={poster}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.9)',
          transform: 'translateZ(0)',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 600ms ease',
        }}
      />
    </Box>
  )
}

export default BackgroundVideo


