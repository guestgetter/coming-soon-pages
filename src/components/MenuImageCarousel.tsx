import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Box,
  Image,
  IconButton,
  HStack,
  Circle,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface MenuImageCarouselProps {
  images: {
    src: string
    alt: string
    title?: string
  }[]
  autoPlayInterval?: number
  showNavigation?: boolean
  showIndicators?: boolean
}

const MenuImageCarousel: React.FC<MenuImageCarouselProps> = ({
  images,
  autoPlayInterval = 6000, // 6 seconds default
  showNavigation = true,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Responsive carousel size - always full width of container
  const carouselSize = '100%' // Always full width of its container

  const carouselHeight = useBreakpointValue({
    base: '300px', // Fixed height on mobile
    md: '90vh',    // 90% of viewport height on tablet+
  })

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Parallax effect completely disabled - image slider stays fixed

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered || images.length <= 1) return

    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered, autoPlayInterval, goToNext, images.length])

  // Pause auto-play on hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  // Handle touch events for mobile
  const handleTouchStart = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    // Delay to prevent immediate auto-play resume
    setTimeout(() => setIsHovered(false), 2000)
  }, [])

  if (!images || images.length === 0) {
    return (
      <Box
        w={carouselSize}
        h={carouselHeight}
        bg="brand.cream"
        borderRadius="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
      >
        <Box color="brand.lightBrown" fontSize="lg" fontFamily="heading">
          No Images Available
        </Box>
      </Box>
    )
  }

  return (
    <Box
      ref={carouselRef}
      position="relative"
      w={carouselSize}
      h={carouselHeight}
      borderRadius="20px"
      overflow="hidden"
      boxShadow="0 25px 50px rgba(0, 0, 0, 0.12)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      transform="translateY(0px)" // Fixed position - no parallax movement
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      _hover={{
        transform: 'translateY(-4px) scale(1.01)', // Simple hover effect without parallax
        boxShadow: '0 35px 70px rgba(138, 84, 46, 0.25)',
      }}
      sx={{
        // Smooth transition for hover effects
        transition: 'transform 0.1s ease-out, box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Main Image Display */}
      <Box position="relative" w="100%" h="100%">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            title={image.title}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            objectFit="cover"
            opacity={index === currentIndex ? 1 : 0}
            transition="opacity 0.5s ease-in-out"
            fallback={
              <Box
                w="100%"
                h="100%"
                bg="brand.cream"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box color="brand.lightBrown" fontSize="md" fontFamily="heading">
                  {image.title || image.alt}
                </Box>
              </Box>
            }
          />
        ))}

        {/* Subtle gradient overlay for better control visibility */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
        />
      </Box>

      {/* Navigation Arrows */}
      {showNavigation && images.length > 1 && (
        <>
          <IconButton
            aria-label="Previous image"
            icon={<ChevronLeftIcon />}
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            bg="rgba(255, 255, 255, 0.9)"
            color="brand.darkBrown"
            borderRadius="full"
            opacity={isHovered ? 1 : 0}
            transition="all 0.3s ease"
            _hover={{
              bg: 'white',
              transform: 'translateY(-50%) scale(1.1)',
            }}
            _active={{
              transform: 'translateY(-50%) scale(0.95)',
            }}
            onClick={goToPrevious}
            zIndex={2}
          />
          <IconButton
            aria-label="Next image"
            icon={<ChevronRightIcon />}
            position="absolute"
            right={3}
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            bg="rgba(255, 255, 255, 0.9)"
            color="brand.darkBrown"
            borderRadius="full"
            opacity={isHovered ? 1 : 0}
            transition="all 0.3s ease"
            _hover={{
              bg: 'white',
              transform: 'translateY(-50%) scale(1.1)',
            }}
            _active={{
              transform: 'translateY(-50%) scale(0.95)',
            }}
            onClick={goToNext}
            zIndex={2}
          />
        </>
      )}

      {/* Dot Indicators */}
      {showIndicators && images.length > 1 && (
        <HStack
          position="absolute"
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
          spacing={2}
          opacity={isHovered ? 1 : 0.7}
          transition="opacity 0.3s ease"
          zIndex={2}
        >
          {images.map((_, index) => (
            <Circle
              key={index}
              size="8px"
              bg={index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)'}
              cursor="pointer"
              transition="all 0.3s ease"
              _hover={{
                bg: 'white',
                transform: 'scale(1.2)',
              }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </HStack>
      )}

      {/* Auto-play indicator */}
      {isAutoPlaying && !isHovered && images.length > 1 && (
        <Box
          position="absolute"
          top={3}
          right={3}
          w="6px"
          h="6px"
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="50%"
          opacity={0.6}
          zIndex={2}
          sx={{
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 0.6 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.6 },
            },
          }}
        />
      )}
    </Box>
  )
}

export default MenuImageCarousel
