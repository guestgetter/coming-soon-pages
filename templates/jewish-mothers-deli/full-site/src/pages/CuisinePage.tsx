import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Image,
  Button,
} from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackgroundPatterns from '../components/BackgroundPatterns'
import AlternatingMenuSection from '../components/AlternatingMenuSection'
import { menuData } from '../data/menuData'
import { getImagesForCategory } from '../data/menuImages'

const CuisinePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isNavbarSticky, setIsNavbarSticky] = useState(false)
  const [isManualScroll, setIsManualScroll] = useState(false)
  const [isInCuisineSection, setIsInCuisineSection] = useState(false)

  // Smooth scroll to category function
  const scrollToCategory = (categoryId: string) => {
    console.log('=== MANUAL SCROLL START ===')
    console.log('Clicked category:', categoryId)
    console.log('Current activeCategory:', activeCategory)
    
    setActiveCategory(categoryId)
    setIsManualScroll(true) // Prevent scroll spy from overriding during manual scroll
    
    // Scroll to specific category
    const categoryElement = document.getElementById(`category-${categoryId}`)
    if (categoryElement) {
      // Calculate offset to account for sticky navigation height + extra space
      const navHeight = 200 // Increased offset for sticky nav + padding + extra space
      const elementPosition = categoryElement.offsetTop
      const offsetPosition = elementPosition - navHeight
      
      console.log('Element found:', `category-${categoryId}`)
      console.log('Element position:', elementPosition, 'Offset position:', offsetPosition)
      console.log('Setting activeCategory to:', categoryId)
      
      console.log('Attempting to scroll to position:', offsetPosition)
      console.log('Current scroll position:', window.scrollY)
      
      // Try different scroll methods for better compatibility
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else {
        // Fallback for older browsers
        window.scrollTo(0, offsetPosition)
      }
      
      // Verify scroll happened
      setTimeout(() => {
        console.log('New scroll position after 100ms:', window.scrollY)
      }, 100)
      
      // Use a longer timeout and also detect scroll completion
      let scrollEndTimer: NodeJS.Timeout
      
      const handleScrollEnd = () => {
        clearTimeout(scrollEndTimer)
        scrollEndTimer = setTimeout(() => {
          console.log('=== MANUAL SCROLL END - Re-enabling scroll spy ===')
          setIsManualScroll(false)
          window.removeEventListener('scroll', handleScrollEnd)
        }, 200) // Short delay after scroll stops
      }
      
      // Listen for scroll events to detect when scrolling stops
      window.addEventListener('scroll', handleScrollEnd)
      
      // Also use a maximum timeout as fallback
      setTimeout(() => {
        console.log('=== MANUAL SCROLL TIMEOUT - Re-enabling scroll spy ===')
        setIsManualScroll(false)
        window.removeEventListener('scroll', handleScrollEnd)
      }, 2000) // 2 second maximum timeout
      
    } else {
      console.log('Category element not found:', `category-${categoryId}`)
      setIsManualScroll(false)
    }
  }

  // Scroll spy to detect which category is in view and navbar sticky state
  useEffect(() => {
    const handleScroll = () => {
      // Check if navbar should be sticky (detect if we've scrolled past the hero section)
      const heroHeight = 400 // Approximate height where navbar should become sticky
      const scrollY = window.scrollY
      const shouldBeSticky = scrollY > heroHeight
      
      if (shouldBeSticky !== isNavbarSticky) {
        setIsNavbarSticky(shouldBeSticky)
      }

      // Check if user is in the cuisine selection section
      const cuisineSection = document.getElementById('complete-menu')
      if (cuisineSection) {
        const rect = cuisineSection.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        // Consider user "in section" if the section takes up significant viewport space
        const isInSection = rect.top < viewportHeight * 0.3 && rect.bottom > viewportHeight * 0.1
        
        if (isInSection !== isInCuisineSection) {
          setIsInCuisineSection(isInSection)
          console.log('Cuisine section visibility changed:', isInSection)
        }
      }

      const categoryElements = menuData.categories.map(category => ({
        id: category.id,
        element: document.getElementById(`category-${category.id}`)
      })).filter(item => item.element)

      // Find the category that's currently most visible, accounting for sticky nav
      let currentCategory = null
      const navOffset = 200 // Match the scroll offset for consistency

      categoryElements.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          
          console.log(`Category ${id}: top=${rect.top}, bottom=${rect.bottom}, navOffset=${navOffset}`)
          
          // Check if the category header is visible at or near the sticky nav position
          // Use a tolerance for floating point precision and positioning
          const tolerance = 10
          if (rect.top <= (navOffset + tolerance) && rect.bottom > navOffset) {
            currentCategory = id
            console.log(`✅ Setting currentCategory to: ${id} (top: ${rect.top}, tolerance: ${navOffset + tolerance})`)
          }
        }
      })

      // If no category is in the nav area, find the closest one above
      if (!currentCategory) {
        let closestCategory = null
        let closestDistance = Infinity

        categoryElements.forEach(({ id, element }) => {
          if (element) {
            const rect = element.getBoundingClientRect()
            const distance = Math.abs(rect.top - navOffset)
            
            if (rect.top < navOffset && distance < closestDistance) {
              closestDistance = distance
              closestCategory = id
            }
          }
        })

        currentCategory = closestCategory
      }

      // Only update active category if not in manual scroll mode
      if (!isManualScroll && currentCategory && currentCategory !== activeCategory) {
        console.log('=== SCROLL SPY UPDATE ===')
        console.log('Detected category:', currentCategory)
        console.log('Previous activeCategory:', activeCategory)
        console.log('isManualScroll:', isManualScroll)
        setActiveCategory(currentCategory)
      } else if (isManualScroll) {
        console.log('=== SCROLL SPY BLOCKED ===')
        console.log('Manual scroll in progress, keeping activeCategory:', activeCategory)
        console.log('Would have detected:', currentCategory)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeCategory, isNavbarSticky, isManualScroll, isInCuisineSection])

  const highlightDish = {
    name: 'The Jewish Mother\'s Special',
    description: 'Our signature dish featuring hand-carved pastrami, corned beef, and turkey on three slices of fresh rye bread, served with a side of our famous potato salad and a bowl of matzo ball soup.',
    price: '$32.95',
    image: '/menu_images/big-portion-baguette-sandwich-full-mixed-sausages-vegetables_optimized.jpg',
    chefNote: 'This is the dish that made us famous in Brooklyn. Every bite tells a story of tradition and love.'
  }

  // Ensure TypeScript recognizes the variable is used
  console.log('Highlight dish:', highlightDish.name)

  const galleryImages = [
    '/menu_images/sandwich-with-salami-lettuce-tomato-arugula_optimized.jpg', // Pastrami sandwich
    '/menu_images/delicious-food-prepared-jewish-hanukkah-celebration_optimized.jpg', // Bagel with lox
    '/menu_images/meatballs-soup-with-noodles-board-uncooked-pastas-lemon-greens-dark-background-footage_optimized.jpg', // Matzo ball soup
    '/menu_images/brisket_optimized.jpg', // Brisket plate
    '/menu_images/sandwich-with-ham-avocado-sauce-caramelized-onions_optimized.jpg', // Corned beef sandwich
    '/menu_images/still-life-delicious-pastry_optimized.jpg'  // Kugel dessert
  ]

  return (
    <Box position="relative">
      <Navbar shrinkLogo={isInCuisineSection} />
      <BackgroundPatterns />
      
      {/* Grain Overlay - exact copy from ComingSoonPage.tsx */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        pointerEvents="none"
        opacity={0.02}
        zIndex={1}
        sx={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, transparent 20%, rgba(120, 119, 116, 0.3) 21%, rgba(120, 119, 116, 0.3) 34%, transparent 35%, transparent),
            linear-gradient(0deg, transparent 24%, rgba(120, 119, 116, 0.05) 25%, rgba(120, 119, 116, 0.05) 26%, transparent 27%, transparent 74%, rgba(120, 119, 116, 0.05) 75%, rgba(120, 119, 116, 0.05) 76%, transparent 77%, transparent)
          `,
        }}
      />
      
      {/* 1. HERO BANNER - Themed background */}
      <Box
        position="relative"
        minH="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt="80px"
        overflow="hidden"
      >
        <Container maxW="1400px">
          <VStack spacing={6} textAlign="center">
            <Text
              fontFamily="heading"
              fontSize={{ base: '2.5rem', md: '3.5rem', lg: '4rem' }}
              color="brand.darkBrown"
              fontWeight={600}
              textShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            >
              A Modern Jewish Kitchen Deli
            </Text>
            <Text
              fontSize={{ base: '1.2rem', md: '1.5rem' }}
              color="brand.darkBrown"
              fontWeight={300}
            >
              Traditional flavors. Quick service. Big comfort.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Section 2: Our Complete Menu - Continuous Scrollable Display */}
      <Box id="complete-menu" py={{ base: 16, md: 20, lg: 24 }} bg="brand.mediumBrown">
        <Container maxW="1400px">
          {/* Main Header */}
          <VStack spacing={6} textAlign="center" mb={8}>
            <Text
              fontFamily="heading"
              fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
              color="white"
              fontWeight={600}
            >
              Our Complete Menu
            </Text>
            <Text
              fontSize={{ base: '1.1rem', lg: '1.3rem' }}
              color="rgba(255, 255, 255, 0.9)"
              maxW="600px"
              lineHeight={1.6}
            >
              Authentic Jewish deli cuisine - browse by category or view all
            </Text>
          </VStack>
        </Container>

        {/* Sticky Category Navigation - Outside Container for better positioning */}
        <Box
          position="sticky"
          top={{ base: "60px", md: "100px", lg: "95px" }}
          zIndex={1000}
          bg="brand.mediumBrown"
          py={4}
          mb={8}
          borderTop={isNavbarSticky ? "1px solid rgba(255, 255, 255, 0.1)" : "none"}
          borderBottom={isNavbarSticky ? "1px solid rgba(255, 255, 255, 0.1)" : "none"}
          boxShadow={isNavbarSticky ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "none"}
          transition="all 0.3s ease"
        >
          <Container maxW="1400px">
            <HStack 
              spacing={{ base: 2, md: 3 }} 
              justify="center"
              wrap="wrap"
              overflowX="auto"
              px={4}
            >
              {menuData.categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    scrollToCategory(category.id)
                  }}
                  variant="solid"
                  size={{ base: 'sm', md: 'md' }}
                  color={activeCategory === category.id ? 'brand.darkBrown' : 'white'}
                  bg={activeCategory === category.id ? 'white' : 'transparent'}
                  fontFamily="body"
                  fontWeight={600}
                  fontSize={{ base: '0.75rem', md: '0.85rem' }}
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                  px={{ base: 3, md: 4 }}
                  py={{ base: 2, md: 3 }}
                  borderRadius="12px"
                  border="1px solid rgba(255, 255, 255, 0.3)"
                  flexShrink={0}
                  _hover={{
                    bg: activeCategory === category.id ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </HStack>
          </Container>
        </Box>

        <Container maxW="1400px">
          {/* Menu Content - Alternating 2-Column Layout */}
          <VStack spacing={16} w="100%">
            {menuData.categories.map((category, categoryIndex) => (
              <AlternatingMenuSection
                key={category.id}
                category={category}
                images={getImagesForCategory(category.id)}
                isImageLeft={categoryIndex % 2 === 0} // Alternate: even = left, odd = right
              />
            ))}
          </VStack>
        </Container>
      </Box>

      {/* Section 3: Our Signature Dishes */}
      {/* <Box py={{ base: 16, md: 20, lg: 24 }} bg="brand.cream">
        <Container maxW="1400px">
          <VStack spacing={12}>
            <VStack spacing={6} textAlign="center">
              <Text
                fontFamily="heading"
                fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                color="brand.darkBrown"
                fontWeight={600}
              >
                Our Signature Dishes
              </Text>
              <Text
                fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                color="brand.lightBrown"
                maxW="600px"
                lineHeight={1.6}
              >
                The dishes that made us famous - each one tells a story of tradition and love
              </Text>
            </VStack>

            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={8}
              w="100%"
            >
              {[
                {
                  name: 'Pastrami on Rye',
                  image: '/menu_images/sandwich-with-salami-lettuce-tomato-arugula_optimized.jpg'
                },
                {
                  name: 'Bagel & Lox',
                  image: '/menu_images/delicious-food-prepared-jewish-hanukkah-celebration_optimized.jpg'
                },
                {
                  name: 'Matzo Ball Soup',
                  image: '/menu_images/meatballs-soup-with-noodles-board-uncooked-pastas-lemon-greens-dark-background-footage_optimized.jpg'
                },
                {
                  name: 'Brisket Plate',
                  image: '/menu_images/brisket_optimized.jpg'
                },
                {
                  name: 'Corned Beef Sandwich',
                  image: '/menu_images/sandwich-with-ham-avocado-sauce-caramelized-onions_optimized.jpg'
                },
                {
                  name: 'Kugel',
                  image: '/menu_images/still-life-delicious-pastry_optimized.jpg'
                }
              ].map((dish, index) => (
                <GridItem key={index}>
                  <Box
                    bg="white"
                    borderRadius="20px"
                    overflow="hidden"
                    boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-8px)',
                      boxShadow: '0 30px 60px rgba(138, 84, 46, 0.2)',
                    }}
                  >
                    <Box
                      position="relative"
                      h="250px"
                      overflow="hidden"
                    >
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        fallback={
                          <Box
                            w="100%"
                            h="100%"
                            bg="brand.cream"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text color="brand.lightBrown" fontSize="lg" fontFamily="heading">
                              {dish.name}
                            </Text>
                          </Box>
                        }
                      />
                    </Box>

                    <Box p={6}>
                      <VStack spacing={4} align="center" textAlign="center">
                        <Text
                          variant="tagline"
                          fontSize="1.4rem"
                          color="brand.darkBrown"
                          fontWeight={400}
                          letterSpacing="0.05em"
                          lineHeight={1.2}
                        >
                          {dish.name}
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box> */}

      {/* Section 4: CHEF'S HIGHLIGHT DISH - Spotlight box with embossed frame */}
      {/* <Box py={{ base: 16, md: 20, lg: 24 }} bg="brand.cream" position="relative"> */}
        {/* Gradient Background - same as ComingSoonPage hero */}
        {/* <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(135deg, rgba(111, 62, 19, 0.08) 0%, rgba(138, 84, 46, 0.03) 100%)"
          zIndex="-1"
        />
        <Container maxW="1400px">
          <VStack spacing={12}>
            <Text
              fontFamily="heading"
              fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
              color="brand.darkBrown"
              fontWeight={600}
            >
              Chef's Highlight
            </Text>

            <Box
              bg="white"
              borderRadius="24px"
              overflow="hidden"
              boxShadow="0 30px 60px rgba(0, 0, 0, 0.15)"
              maxW="1000px"
              w="100%"
              position="relative"
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                borderRadius="24px"
                border="3px solid"
                borderColor="rgba(138, 84, 46, 0.1)"
                boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.1)"
                pointerEvents="none"
                zIndex={1}
              />
              
              <Flex direction={{ base: 'column', lg: 'row' }}>
                <Box flex={{ base: 'none', lg: '1' }} minH={{ base: '300px', lg: '400px' }}>
                  <Image
                    src={highlightDish.image}
                    alt={highlightDish.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    fallback={
                      <Box
                        w="100%"
                        h="100%"
                        bg="brand.cream"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="brand.lightBrown" fontSize="xl" fontFamily="heading">
                          {highlightDish.name}
                        </Text>
                      </Box>
                    }
                  />
                </Box>

                <Box flex={{ base: 'none', lg: '1' }} p={{ base: 6, md: 8 }}>
                  <VStack spacing={6} align={{ base: 'center', lg: 'flex-start' }} textAlign={{ base: 'center', lg: 'left' }}>
                    <Text
                      fontFamily="heading"
                      fontSize={{ base: '1.8rem', md: '2.2rem' }}
                      color="brand.darkBrown"
                      fontWeight={600}
                    >
                      {highlightDish.name}
                    </Text>
                    
                    <Text fontSize="1.1rem" color="brand.lightBrown" lineHeight={1.6}>
                      {highlightDish.description}
                    </Text>
                    
                    <Text
                      fontFamily="heading"
                      fontSize="1.5rem"
                      color="brand.mediumBrown"
                      fontWeight={600}
                    >
                      {highlightDish.price}
                    </Text>
                    
                    <Box
                      bg="rgba(138, 84, 46, 0.1)"
                      p={4}
                      borderRadius="12px"
                      borderLeft="4px solid"
                      borderColor="brand.mediumBrown"
                      w="100%"
                    >
                      <Text fontSize="0.95rem" color="brand.darkBrown" fontStyle="italic">
                        "{highlightDish.chefNote}"
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </Flex>
            </Box>
          </VStack>
        </Container>
      </Box> */}

      {/* Section 5: CUISINE GALLERY - Enhanced Quilted Image List */}
      <Box py={{ base: 16, md: 20, lg: 24 }} bg="brand.cream">
        <Container maxW="1400px">
          <VStack spacing={12}>
            <VStack spacing={6} textAlign="center">
              <Text
                fontFamily="heading"
                fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                color="brand.darkBrown"
                fontWeight={600}
              >
                Gallery
              </Text>
              <Text
                fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                color="brand.lightBrown"
                maxW="600px"
                lineHeight={1.6}
              >
                A visual feast of our most beloved dishes and culinary moments
              </Text>
            </VStack>

            {/* Enhanced Quilted Image List using CSS columns */}
            <Box
              w="100%"
              sx={{
                columnCount: { base: 1, md: 2, lg: 3 },
                columnGap: '20px',
              }}
            >
              {galleryImages.map((image, index) => (
                <Box
                  key={index}
                  mb={5}
                  borderRadius="20px"
                  overflow="hidden"
                  boxShadow="0 25px 50px rgba(0, 0, 0, 0.12)"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 35px 70px rgba(138, 84, 46, 0.25)',
                  }}
                  position="relative"
                  sx={{
                    display: 'inline-block',
                    width: '100%',
                    breakInside: 'avoid',
                  }}
                >
                  {/* Floating category badge */}
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    bg="rgba(255, 255, 255, 0.95)"
                    backdropFilter="blur(10px)"
                    px={3}
                    py={1}
                    borderRadius="full"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
                    zIndex={2}
                    opacity={0}
                    transform="translateY(-10px)"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    _hover={{
                      opacity: 1,
                      transform: 'translateY(0)',
                    }}
                  >
                    <Text
                      fontSize="0.75rem"
                      fontWeight={600}
                      color="brand.darkBrown"
                      textTransform="uppercase"
                      letterSpacing="0.5px"
                    >
                      {index % 3 === 0 ? 'Signature' : index % 3 === 1 ? 'Classic' : 'Specialty'}
                    </Text>
                  </Box>

                  {/* Image container with gradient overlay */}
                  <Box
                    position="relative"
                    overflow="hidden"
                    sx={{
                      height: index % 4 === 0 ? '320px' : 
                              index % 4 === 1 ? '280px' : 
                              index % 4 === 2 ? '360px' : '240px'
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Deli dish ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{
                        transform: 'scale(1.1)',
                      }}
                      fallback={
                        <Box
                          w="100%"
                          h="100%"
                          bg="brand.cream"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text color="brand.lightBrown" fontSize="lg" fontFamily="heading">
                            Dish {index + 1}
                          </Text>
                        </Box>
                      }
                    />
                    
                    {/* Subtle gradient overlay */}
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      h="60px"
                      bg="linear-gradient(transparent, rgba(0,0,0,0.3))"
                      opacity={0}
                      transition="opacity 0.3s ease"
                      _hover={{
                        opacity: 1,
                      }}
                    />
                  </Box>

                  {/* Dish name overlay */}
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    p={4}
                    bg="rgba(255, 255, 255, 0.95)"
                    backdropFilter="blur(10px)"
                    transform="translateY(100%)"
                    transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    _hover={{
                      transform: 'translateY(0)',
                    }}
                  >
                    <Text
                      fontFamily="heading"
                      fontSize="1.1rem"
                      color="brand.darkBrown"
                      fontWeight={600}
                      textAlign="center"
                    >
                      {['Pastrami Delight', 'Bagel & Lox', 'Matzo Ball Soup', 'Brisket Plate', 'Corned Beef', 'Sweet Kugel'][index]}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default CuisinePage
