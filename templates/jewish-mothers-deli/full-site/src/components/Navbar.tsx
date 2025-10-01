import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Box,
  Button,
  useBreakpointValue,
  HStack,
  VStack,
  useDisclosure,
  Collapse,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

interface NavbarProps {
  isScrolled?: boolean
  shrinkLogo?: boolean
  hideLogo?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled: propIsScrolled, shrinkLogo = false, hideLogo = false }) => {
  const { isOpen, onToggle } = useDisclosure()
  const location = useLocation()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [internalIsScrolled, setInternalIsScrolled] = useState(false)

  // Optimized scroll handler with throttling instead of debouncing for better performance
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50
    if (scrolled !== internalIsScrolled) {
      setInternalIsScrolled(scrolled)
    }
  }, [internalIsScrolled])

  // Use throttled scroll handler for better performance
  const throttledScrollHandler = useMemo(() => {
    let ticking = false
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
  }, [handleScroll])

  // Internal scroll detection for consistent behavior across all pages
  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', throttledScrollHandler)
  }, [throttledScrollHandler])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen) {
        const target = event.target as Element
        const navbar = document.querySelector('[data-navbar]')
        if (navbar && !navbar.contains(target)) {
          onToggle()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, isOpen, onToggle])

  // Use internal scroll detection if no prop is provided, otherwise use prop
  const isScrolled = propIsScrolled !== undefined ? propIsScrolled : internalIsScrolled

  // Memoize nav items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ], [])

  const isActivePage = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname === path
  }, [location.pathname])

  const handleNavigation = useCallback((path: string) => {
    // If navigating to a different page, ensure smooth scroll to top
    if (location.pathname !== path) {
      // Small delay to ensure route change happens first
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }, 100)
    }
  }, [location.pathname])

  // Memoize the logo image to prevent unnecessary re-renders
  const logoImage = useMemo(() => {
    // Calculate logo size based on different states
    let maxHeight = '220px'; // Default size
    let baseScale = 1;
    
    if (shrinkLogo) {
      maxHeight = '140px'; // Smaller when in cuisine section
      baseScale = 0.8;
    }
    
    // Mobile logo sizing
    if (isMobile) {
      maxHeight = '160px'; // reduce to avoid cramped look
      if (shrinkLogo) {
        maxHeight = '120px';
        baseScale = 0.8;
      }
    }
    
    return (
      <img
        src="/JMD_full_logo.png"
        alt="Jewish Mother's Deli Logo"
        style={{
          maxHeight,
          height: 'auto',
          width: 'auto',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: isScrolled ? 'brightness(0.9)' : 'brightness(1)',
          objectFit: "contain",
          background: "transparent",
          willChange: 'transform, filter, opacity',
          transform: hideLogo ? `scale(${baseScale * 0.8}) translateZ(0)` : `scale(${baseScale}) translateZ(0)`,
          opacity: hideLogo ? 0 : 1,
          visibility: hideLogo ? 'hidden' : 'visible',
        }}
        onMouseEnter={(e) => {
          if (!hideLogo) {
            const target = e.target as HTMLImageElement;
            target.style.transform = `scale(${baseScale * 1.05}) translateZ(0)`;
            target.style.filter = 'brightness(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!hideLogo) {
            const target = e.target as HTMLImageElement;
            target.style.transform = `scale(${baseScale}) translateZ(0)`;
            target.style.filter = isScrolled ? 'brightness(0.9)' : 'brightness(1)';
          }
        }}
      />
    );
  }, [isScrolled, shrinkLogo, isMobile, hideLogo])

  return (
         <Box
      data-navbar
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1500}
      transition="all 0.3s ease"
      bg="transparent"
      willChange="transform"
      transform="translateZ(0)"
    >
      {/* Top yellow accent strip */}
      <Box
        h="4px"
        bg="yellow.400"
        w="100%"
      />

      {/* Sticky background - use brand beige */}
      {isScrolled && !isOpen && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h={{ base: shrinkLogo ? "75%" : "135%", md: "40%" }}
          bg="rgba(251, 231, 204, 0.95)"
          backdropFilter="blur(8px)"
          borderBottom="1px solid rgba(138, 84, 46, 0.15)"
          boxShadow="0 2px 10px rgba(0, 0, 0, 0.08)"
          transition="all 0.3s ease"
          zIndex={1}
        />
      )}

      <Box
        py={{ base: 4, md: 8, lg: 12 }}
        px={{ base: 4, md: 8, lg: 12 }}
        maxW="1400px"
        mx="auto"
        position="relative"
        minH={{ base: '130px', md: '180px', lg: '240px' }}
        zIndex={2}
      >
        {/* Mobile Layout */}
        {isMobile && (
          <>
            {/* Header background overlay when menu is open - match site background */}
            {isOpen && (
              <Box
                position="absolute"
                top="0px"
                left="0px"
                right="0px"
                zIndex={9998}
                h="140px"
                bg="linear-gradient(135deg, #fbe7cc 0%, #f5ddb8 50%, #ead5a3 100%)"
              >
                {/* Subtle pattern overlay for consistency */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  opacity="0.03"
                  backgroundImage="radial-gradient(circle at 25% 25%, #8a542e 2px, transparent 2px), radial-gradient(circle at 75% 75%, #6f3e13 2px, transparent 2px)"
                  backgroundSize="60px 60px"
                  pointerEvents="none"
                />
                {/* Centered logo in mobile menu header */}
                <Box position="relative" h="100%" display="flex" alignItems="center" justifyContent="center">
                  <Link to="/" onClick={() => handleNavigation('/')}>
                    {logoImage}
                  </Link>
                </Box>
              </Box>
            )}
            
            {/* Clean background for X icon when menu is open */}
            {isOpen && (
              <Box
                position="absolute"
                top="56px"
                left={4}
                zIndex={10002}
                transform="translateY(-50%)"
                w="44px"
                h="44px"
                bg="transparent"
              />
            )}
            
            {/* Hamburger Menu */}
            <Box position="absolute" top={isOpen ? "56px" : (shrinkLogo ? "2.5" : "56px")} left={4} zIndex={10003} transform={isOpen ? "translateY(-50%)" : (shrinkLogo ? "none" : "translateY(-50%)")} transition="all 0.3s ease">
              <IconButton
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                onClick={onToggle}
                variant="ghost"
                color={isOpen ? 'brand.darkBrown' : (isScrolled ? 'brand.darkBrown' : 'brand.mediumBrown')}
                bg={isOpen ? 'transparent' : 'transparent'}
                _hover={{
                  color: 'brand.mediumBrown',
                  bg: isOpen ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                }}
                border={'none'}
                size="lg"
                fontSize="24px"
                transition="all 0.3s ease"
                minW="44px"
                minH="44px"
                transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                opacity={1}
                boxShadow="none"
                borderRadius="md"
                _active={{
                  transform: isOpen ? "rotate(180deg) scale(0.95)" : "rotate(0deg) scale(0.95)",
                }}
              />
            </Box>

            {/* Mobile Logo */}
            {!isOpen && !shrinkLogo && (
              <Box 
                position="absolute" 
                left="50%" 
                top="70%"
                transform="translate(-50%, -50%)"
                zIndex={5}
                transition="all 0.3s ease"
              >
                <Link to="/" onClick={() => handleNavigation('/')}>
                  {logoImage}
                </Link>
              </Box>
            )}
          </>
        )}

        {/* Desktop Navigation Layout */}
        {!isMobile && (
          <Flex align="center" justify="space-between" position="relative" zIndex={3}>
            {/* Left Navigation Links */}
            <HStack spacing={6} justify="flex-end" flex={1} pr={{ base: 16, md: 24, lg: 36 }}>
              {navItems.slice(0, 3).map((item) => (
                <Link key={item.name} to={item.path} onClick={() => handleNavigation(item.path)}>
                  <Button
                    variant="ghost"
                    color={isActivePage(item.path) ? 'brand.mediumBrown' : (isScrolled ? 'brand.darkBrown' : 'brand.mediumBrown')}
                    _hover={{
                      color: 'brand.mediumBrown',
                      bg: 'rgba(255, 255, 255, 0.1)',
                    }}
                    fontWeight={isActivePage(item.path) ? 600 : 500}
                    fontSize="1rem"
                    transition="all 0.3s ease"
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActivePage(item.path) ? '100%' : '0%',
                      height: '2px',
                      bg: 'brand.mediumBrown',
                      transition: 'width 0.3s ease',
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </HStack>

            {/* Logo Background Container */}
            <Box
              position="absolute"
              left="50%"
              top={isOpen ? "85%" : (shrinkLogo ? "0%" : "85%")}
              transform="translate(-50%, -50%)"
              zIndex={4}
              bg={isScrolled ? 'rgba(251, 231, 204, 0.95)' : 'transparent'}
              borderRadius="50%"
              w={isOpen ? "135px" : (shrinkLogo ? "70px" : "135px")}
              h={isOpen ? "135px" : (shrinkLogo ? "60px" : "135px")}
              transition="all 0.3s ease"
            />
            
            {/* Centered Logo */}
            <Box
              position="absolute"
              left="50%"
              top={isOpen ? "85%" : (shrinkLogo ? "0%" : "85%")}
              transform="translate(-50%, -50%)"
              zIndex={5}
              transition="all 0.3s ease"
            >
              <Link to="/" onClick={() => handleNavigation('/')}>
                {logoImage}
              </Link>
            </Box>

            {/* Right Navigation Links */}
            <HStack spacing={6} justify="flex-start" flex={1} pl={{ base: 16, md: 24, lg: 36 }}>
              {navItems.slice(3).map((item) => (
                <Link key={item.name} to={item.path} onClick={() => handleNavigation(item.path)}>
                  <Button
                    variant="ghost"
                    color={isActivePage(item.path) ? 'brand.mediumBrown' : (isScrolled ? 'brand.darkBrown' : 'brand.mediumBrown')}
                    _hover={{
                      color: 'brand.mediumBrown',
                      bg: 'rgba(255, 255, 255, 0.1)',
                    }}
                    fontWeight={isActivePage(item.path) ? 600 : 500}
                    fontSize="1rem"
                    transition="all 0.3s ease"
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActivePage(item.path) ? '100%' : '0%',
                      height: '2px',
                      bg: 'brand.mediumBrown',
                      transition: 'width 0.3s ease',
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              {/* ORDER button on far right */}
              <Button
                variant="primary"
                onClick={() => {
                  window.open('tel:+17575551234', '_self')
                }}
              >
                ORDER
              </Button>
            </HStack>
          </Flex>
        )}

      </Box>

      {/* Mobile Navigation */}
      {isMobile && (
        <Collapse in={isOpen} animateOpacity>
          <Box
            bg="linear-gradient(135deg, #fbe7cc 0%, #f5ddb8 50%, #ead5a3 100%)"
            position="fixed"
            top={isOpen ? "140px" : (shrinkLogo ? "100px" : "120px")}
            left="0"
            right="0"
            zIndex={9999}
            minH="100vh"
          >
            {/* Background Pattern */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              opacity="0.03"
              backgroundImage="radial-gradient(circle at 25% 25%, #8a542e 2px, transparent 2px), radial-gradient(circle at 75% 75%, #6f3e13 2px, transparent 2px)"
              backgroundSize="60px 60px"
              pointerEvents="none"
            />
            
            <VStack 
              spacing={8} 
              pt="40px" 
              pb="40px"
              px="20px"
              align="center" 
              justify="flex-start" 
              minH="calc(100vh - 140px)"
              position="relative"
              zIndex="1"
            >
              {/* Navigation Links */}
              <VStack spacing={4} mb="8">
                {navItems.map((item) => (
                  <Box key={item.name}>
                    <Link to={item.path} onClick={() => handleNavigation(item.path)}>
                      <Button
                        variant="ghost"
                        color={isActivePage(item.path) ? 'brand.mediumBrown' : 'brand.darkBrown'}
                        _hover={{
                          color: 'brand.mediumBrown',
                          bg: 'rgba(138, 84, 46, 0.1)',
                        }}
                        fontWeight={isActivePage(item.path) ? 600 : 500}
                        fontSize="1.1rem"
                        justifyContent="center"
                        px={8}
                        py={3}
                        borderRadius="md"
                        bg={isActivePage(item.path) ? 'rgba(138, 84, 46, 0.05)' : 'transparent'}
                        minW="200px"
                        textTransform="uppercase"
                        letterSpacing="0.5px"
                        transition="all 0.3s ease"
                        _active={{
                          transform: "scale(0.95)",
                        }}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  </Box>
                ))}
              </VStack>

              {/* Call-to-Action Buttons */}
              <VStack spacing={4} w="100%" maxW="280px">
                <Button
                  variant="primary"
                  size="lg"
                  w="100%"
                  fontSize="1rem"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="0.8px"
                  py="6"
                  onClick={() => {
                    // Add order functionality here
                    window.open('tel:+17575551234', '_self');
                  }}
                >
                  ORDER NOW
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  w="100%"
                  fontSize="1rem"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="0.8px"
                  py="6"
                  borderColor="brand.mediumBrown"
                  color="brand.mediumBrown"
                  _hover={{
                    bg: 'brand.mediumBrown',
                    color: 'white',
                  }}
                  onClick={() => {
                    window.open('https://maps.google.com/?q=Jewish+Mother\'s+Deli+Williamsburg+VA', '_blank');
                  }}
                >
                  GET DIRECTIONS
                </Button>
              </VStack>

              {/* Phone Number */}
              <VStack spacing={2} mt="6">
                <Button
                  variant="ghost"
                  size="lg"
                  fontSize="1.2rem"
                  fontWeight="600"
                  color="brand.darkBrown"
                  _hover={{
                    color: 'brand.mediumBrown',
                  }}
                  onClick={() => {
                    window.open('tel:+17575551234', '_self');
                  }}
                >
                  (757) 555-1234
                </Button>
                <Box
                  fontSize="sm"
                  color="brand.lightBrown"
                  textAlign="center"
                  fontStyle="italic"
                >
                  Tap to call
                </Box>
              </VStack>
            </VStack>
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

export default React.memo(Navbar)
