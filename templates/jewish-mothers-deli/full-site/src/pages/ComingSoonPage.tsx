import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  VStack,
  Grid,
  GridItem,
  HStack,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react'
import { CalendarIcon, ViewIcon } from '@chakra-ui/icons'

import BackgroundPatterns from '../components/BackgroundPatterns'

import OurStory from '../components/OurStory'
import CateringForm from '../components/ReservationsForm'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ComingSoonPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isInHeroSection, setIsInHeroSection] = useState(true)
  const navigate = useNavigate()
  
  // Responsive logic: only hide logo on XS and SM devices
  const isMobile = useBreakpointValue({ base: true, md: false })
  const shouldHideLogo = isInHeroSection && isMobile

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50
    const heroSection = document.getElementById('hero')
    const heroHeight = heroSection ? heroSection.offsetHeight : 0
    const inHeroSection = window.scrollY < heroHeight * 0.8 // Consider out of hero when 80% scrolled through
    
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
    if (inHeroSection !== isInHeroSection) {
      setIsInHeroSection(inHeroSection)
    }
  }, [isScrolled, isInHeroSection])

  useEffect(() => {
    let ticking = false
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [handleScroll])

  // CTA Button Handlers
  const handleOrderNow = useCallback(() => {
    // Scroll to catering form section
    const cateringSection = document.getElementById('catering')
    if (cateringSection) {
      cateringSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])

  const handleViewMenu = useCallback(() => {
    navigate('/menu')
  }, [navigate])

  return (
    <Box position="relative">
      {/* Navigation */}
      <Navbar isScrolled={isScrolled} hideLogo={shouldHideLogo} />
      
      {/* Background Patterns - following todo-plan.md texture requirements */}
      <BackgroundPatterns />
      
      {/* Simplified Grain Overlay - reduced complexity for better performance */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        pointerEvents="none"
        opacity={0.015}
        zIndex={1}
        sx={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, transparent 20%, rgba(120, 119, 116, 0.2) 21%, rgba(120, 119, 116, 0.2) 34%, transparent 35%, transparent)
          `,
          willChange: 'transform',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
      />

      {/* 1. HERO SECTION - following todo-plan.md specifications */}
      <Box id="hero" position="relative" h={{ base: "100vh", md: "100vh", lg: "100vh" }} zIndex={10} pt={{ base: "60px", sm: "70px", md: "140px", lg: "120px" }} overflow="hidden">
        {/* Gradient Background */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(135deg, rgba(111, 62, 19, 0.08) 0%, rgba(138, 84, 46, 0.03) 100%)"
          zIndex="-1"
        />
        <Container
          maxW="1400px"
          h="100%"
          px={{ base: 4, md: 8 }}
          position="relative"
          zIndex="1"
          display="flex"
          alignItems={{ base: "flex-start", sm: "flex-start", md: "center" }}
          justifyContent="center"
          pt={{ base: "20px", sm: "30px", md: "0" }}
        >
          <Flex
            direction={{ base: 'column', lg: 'column' }}
            align="center"
            justify="center"
            w="100%"
            gap={{ base: 3, sm: 4, md: 8, lg: 12 }}
            textAlign="center"
          >
            {/* Logo Container - Visible on XS and small devices, hidden on medium+ */}
            <Box
              flex="0 0 auto"
              order={{ base: 1, md: 0 }}
              display={{ base: 'block', md: 'none' }}
              sx={{
                '@keyframes fadeInDown': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(-30px) translateZ(0)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0) translateZ(0)',
                  },
                },
                animation: 'fadeInDown 1s ease-out',
                willChange: 'transform',
                transform: 'translateZ(0)', // Force hardware acceleration
              }}
            >
              <Image
                src="/JMD_full_logo.png"
                alt="Jewish Mother's Deli Logo"
                maxW={{ base: '280px', sm: '320px' }}
                w="100%"
                h="auto"
                filter="drop-shadow(0 12px 30px rgba(0, 0, 0, 0.2))"
                transition="transform 0.3s ease"
                _hover={{
                  transform: 'scale(1.02) translateZ(0)',
                  filter: 'drop-shadow(0 12px 30px rgba(0, 0, 0, 0.2)) hue-rotate(5deg)',
                }}
                sx={{
                  willChange: 'transform',
                  transform: 'translateZ(0)', // Force hardware acceleration
                }}
              />
            </Box>

            {/* Content Container - Centered on Desktop */}
            <VStack
              flex={{ base: 'none', lg: 1 }}
              w={{ base: '100%', lg: 'auto' }}
              maxW={{ base: '100%', lg: '800px' }}
              align="center"
              spacing={{ base: 3, sm: 4, md: 6 }}
              order={{ base: 2, lg: 1 }}
              mx="auto"
              pt={{ base: 0, md: 4, lg: 6 }}
              sx={{
                '@keyframes fadeInRight': {
                  from: {
                    opacity: 0,
                    transform: 'translateX(50px) translateZ(0)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateX(0) translateZ(0)',
                  },
                },
                animation: 'fadeInRight 1s ease-out 0.3s both',
                willChange: 'transform',
                transform: 'translateZ(0)', // Force hardware acceleration
              }}
            >
              {/* Tagline */}
              <Text variant="tagline" textAlign="center" fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}>
                "A Taste of Tradition, Served with Love."
              </Text>

              {/* Description */}
              <Text variant="description" textAlign="center" fontSize={{ base: '1.1rem', md: '1.2rem', lg: '1.3rem' }}>
                The Jewish Mother's Deli is bringing old-school deli classics, 
                fresh-baked bagels, stacked sandwiches, and heartfelt hospitality to{' '}
                <Text as="span" variant="highlight">
                  Williamsburg
                </Text>
                . Inspired by generations of tradition and a whole lot of chutzpah, 
                we're serving up comfort food the way only a Jewish mother can: warm, 
                generous, and full of flavor.
              </Text>

              {/* CTA Buttons */}
              <HStack 
                spacing={{ base: 4, md: 6 }} 
                wrap="wrap" 
                justify="center"
                pt={{ base: 0, sm: 1, md: 3, lg: 4 }}
                sx={{
                  '@keyframes slideInUp': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(30px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                  animation: 'slideInUp 1s ease-out 0.6s both',
                }}
              >
                {/* Primary CTA: ORDER NOW */}
                <Button
                  onClick={handleOrderNow}
                  size="lg"
                  bg="linear-gradient(135deg, #8A542E 0%, #6F3E13 100%)"
                  color="white"
                  fontFamily="body"
                  fontWeight={600}
                  fontSize={{ base: '1rem', md: '1.1rem' }}
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                  px={{ base: 6, md: 8 }}
                  py={{ base: 6, md: 7 }}
                  h={{ base: '48px', md: '52px' }}
                  borderRadius="full"
                  border="2px solid transparent"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: 'linear-gradient(135deg, #6F3E13 0%, #8A542E 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: -1,
                  }}
                  _hover={{
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(138, 84, 46, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    _before: {
                      opacity: 1,
                    },
                  }}
                  _active={{
                    transform: 'translateY(-1px) scale(1.01)',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  minW={{ base: '160px', md: '180px' }}
                  leftIcon={<CalendarIcon boxSize={4} />}
                >
                  ORDER NOW
                </Button>

                {/* Secondary CTA: VIEW MENU */}
                <Button
                  onClick={handleViewMenu}
                  size="lg"
                  variant="outline"
                  bg="rgba(255, 255, 255, 0.9)"
                  backdropFilter="blur(10px)"
                  borderColor="brand.mediumBrown"
                  color="brand.mediumBrown"
                  fontFamily="body"
                  fontWeight={600}
                  fontSize={{ base: '1rem', md: '1.1rem' }}
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                  px={{ base: 6, md: 8 }}
                  py={{ base: 6, md: 7 }}
                  h={{ base: '48px', md: '52px' }}
                  borderRadius="full"
                  borderWidth="2px"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: 'linear-gradient(135deg, #8A542E 0%, #6F3E13 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: -1,
                  }}
                  _hover={{
                    bg: 'transparent',
                    color: 'white',
                    borderColor: 'transparent',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(138, 84, 46, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                    _before: {
                      opacity: 1,
                    },
                  }}
                  _active={{
                    transform: 'translateY(-1px) scale(1.01)',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  minW={{ base: '160px', md: '180px' }}
                  leftIcon={<ViewIcon boxSize={4} />}
                >
                  VIEW MENU
                </Button>
              </HStack>

            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* 3. OUR STORY SECTION - Split-screen layout as specified in todo-plan.md */}
      <Box id="story">
        <OurStory />
      </Box>

      {/* 4. WHAT TO EXPECT SECTION - Dining Experience Preview */}
      <Box id="expect" py={{ base: 16, md: 20, lg: 24 }} bg="brand.cream" position="relative">
        {/* Subtle grain texture + brown gradient overlays */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(135deg, rgba(111, 62, 19, 0.06) 0%, rgba(138, 84, 46, 0.03) 100%)"
          zIndex="-1"
        />
        
        <Container maxW="1400px">
          <VStack spacing={12}>
            {/* Header - Intro Title & Tagline */}
            <VStack spacing={6} textAlign="center" maxW="700px" mx="auto">
              <Text
                fontFamily="heading"
                fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                color="brand.darkBrown"
                fontWeight={600}
                position="relative"
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '2px',
                  bg: 'brand.mediumBrown',
                }}
              >
                What to Expect
              </Text>
              <Text
                fontSize={{ base: '1.1rem', md: '1.2rem', lg: '1.3rem' }}
                color="brand.lightBrown"
                fontWeight={400}
                lineHeight={1.6}
              >
                Step into a space where tradition meets warmth, and every detail is crafted to make you feel at home.
              </Text>
            </VStack>

            {/* Main Grid Content */}
            <Grid
              templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
              gap={{ base: 8, md: 12, lg: 16 }}
              w="100%"
              alignItems="center"
            >
              {/* Left Column - Preview Image */}
              <GridItem>
                <Box position="relative">
                  <Image
                    src="/humble_images/1-A7303628_optimized.jpg"
                    alt="Jewish Mother's Deli Interior"
                    borderRadius="2xl"
                    w="100%"
                    h={{ base: '300px', md: '400px', lg: '500px' }}
                    objectFit="cover"
                    boxShadow="0 20px 40px rgba(0, 0, 0, 0.15)"
                    fallback={
                      <Box
                        w="100%"
                        h={{ base: '300px', md: '400px', lg: '500px' }}
                        bg="brand.cream"
                        borderRadius="2xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="brand.lightBrown" fontSize="lg" fontFamily="heading">
                          Warm Deli Interior
                        </Text>
                      </Box>
                    }
                  />
                  
                  {/* Overlay Accent - Smaller circular inset photo */}
                  <Box
                    position="absolute"
                    bottom={{ base: '20px', md: '30px' }}
                    left={{ base: '20px', md: '30px' }}
                    w={{ base: '80px', md: '100px' }}
                    h={{ base: '80px', md: '100px' }}
                    borderRadius="50%"
                    border="5px solid"
                    borderColor="brand.cream"
                    boxShadow="0 8px 20px rgba(0, 0, 0, 0.2)"
                    overflow="hidden"
                  >
                    <Image
                      src="/humble_images/10-A7303637_optimized.jpg"
                      alt="Fresh Bagels"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      fallback={
                        <Box
                          w="100%"
                          h="100%"
                          bg="brand.mediumBrown"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text color="white" fontSize="sm" fontFamily="heading">
                            Fresh
                          </Text>
                        </Box>
                      }
                    />
                  </Box>
                </Box>
              </GridItem>

              {/* Right Column - Experience Breakdown */}
              <GridItem>
                <VStack spacing={6} align="stretch">
                  {/* Card 1: Atmosphere */}
                  <Box
                    bg="rgba(255, 255, 255, 0.7)"
                    backdropFilter="blur(10px)"
                    p={6}
                    border="1px solid"
                    borderColor="brand.lightGray"
                    borderRadius="xl"
                    boxShadow="0 8px 25px rgba(0, 0, 0, 0.08)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'scale(1.02)',
                      boxShadow: '0 15px 35px rgba(138, 84, 46, 0.15)',
                    }}
                  >
                    <HStack spacing={4} align="flex-start">
                      <Box
                        w="40px"
                        h="40px"
                        bg="brand.mediumBrown"
                        borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        boxShadow="0 4px 12px rgba(138, 84, 46, 0.3)"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                            fill="white"
                          />
                        </svg>
                      </Box>
                      <VStack spacing={2} align="flex-start">
                        <Text
                          fontFamily="heading"
                          fontSize="1.2rem"
                          color="brand.darkBrown"
                          fontWeight={600}
                        >
                          A Warm, Welcoming Atmosphere
                        </Text>
                        <Text
                          fontSize="1rem"
                          color="brand.lightBrown"
                          lineHeight={1.6}
                        >
                          Rich wooden textures, warm lighting, and a touch of modern elegance create the perfect setting for family gatherings or casual bites.
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>

                  {/* Card 2: Service */}
                  <Box
                    bg="rgba(255, 255, 255, 0.7)"
                    backdropFilter="blur(10px)"
                    p={6}
                    border="1px solid"
                    borderColor="brand.lightGray"
                    borderRadius="xl"
                    boxShadow="0 8px 25px rgba(0, 0, 0, 0.08)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'scale(1.02)',
                      boxShadow: '0 15px 35px rgba(138, 84, 46, 0.15)',
                    }}
                  >
                    <HStack spacing={4} align="flex-start">
                      <Box
                        w="40px"
                        h="40px"
                        bg="brand.mediumBrown"
                        borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        boxShadow="0 4px 12px rgba(138, 84, 46, 0.3)"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L9.6 7.8l1.4 1.4 3.17-3.22a3.4 3.4 0 0 1 4.82 0 3.4 3.4 0 0 1 0 4.82l-3.17 3.22 1.4 1.4 3.17-3.22a5.4 5.4 0 0 0 0-7.65z"
                            fill="white"
                          />
                          <path
                            d="M3.58 19.42a5.4 5.4 0 0 0 7.65 0l3.17-3.22-1.4-1.4-3.17 3.22a3.4 3.4 0 0 1-4.82 0 3.4 3.4 0 0 1 0-4.82l3.17-3.22-1.4-1.4-3.17 3.22a5.4 5.4 0 0 0 0 7.65z"
                            fill="white"
                          />
                        </svg>
                      </Box>
                      <VStack spacing={2} align="flex-start">
                        <Text
                          fontFamily="heading"
                          fontSize="1.2rem"
                          color="brand.darkBrown"
                          fontWeight={600}
                        >
                          Service with Heart
                        </Text>
                        <Text
                          fontSize="1rem"
                          color="brand.lightBrown"
                          lineHeight={1.6}
                        >
                          Our staff welcomes you like family — attentive, kind, and committed to giving you an unforgettable dining experience.
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>

                  {/* Card 3: Unique Features */}
                  <Box
                    bg="rgba(255, 255, 255, 0.7)"
                    backdropFilter="blur(10px)"
                    p={6}
                    border="1px solid"
                    borderColor="brand.lightGray"
                    borderRadius="xl"
                    boxShadow="0 8px 25px rgba(0, 0, 0, 0.08)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'scale(1.02)',
                      boxShadow: '0 15px 35px rgba(138, 84, 46, 0.15)',
                    }}
                  >
                    <HStack spacing={4} align="flex-start">
                      <Box
                        w="40px"
                        h="40px"
                        bg="brand.mediumBrown"
                        borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        boxShadow="0 4px 12px rgba(138, 84, 46, 0.3)"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 18V5l12-2v13"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                          <circle cx="6" cy="18" r="3" fill="white" />
                          <circle cx="18" cy="16" r="3" fill="white" />
                        </svg>
                      </Box>
                      <VStack spacing={2} align="flex-start">
                        <Text
                          fontFamily="heading"
                          fontSize="1.2rem"
                          color="brand.darkBrown"
                          fontWeight={600}
                        >
                          Moments to Remember
                        </Text>
                        <Text
                          fontSize="1rem"
                          color="brand.lightBrown"
                          lineHeight={1.6}
                        >
                          From live music evenings to deli-inspired community events, there's always something to enjoy beyond the plate.
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </VStack>
              </GridItem>
            </Grid>

            {/* Footer Accent */}
            <VStack spacing={6}>
              <Box
                w="100px"
                h="1px"
                bg="brand.mediumBrown"
              />
              <Text
                fontFamily="heading"
                fontSize="1.1rem"
                color="brand.darkBrown"
                fontStyle="italic"
                textAlign="center"
              >
                Every visit is more than a meal — it's a story worth sharing.
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* 5. CATERING FORM - Glassmorphic centered card for catering services */}
      <Box id="catering">
        <CateringForm />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default ComingSoonPage
