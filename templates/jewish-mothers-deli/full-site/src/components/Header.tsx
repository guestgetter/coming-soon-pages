import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, HStack, IconButton, Link as ChakraLink, useDisclosure } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

/**
 * New, hardened Header built from scratch.
 * - Compact mobile sticky height
 * - Exact current desktop look (centered logo, nav links)
 * - Uses CSS var --header-h for offset-aware scrolling
 */
const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSticky, setSticky] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  // Track header height -> CSS var
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight
      document.documentElement.style.setProperty('--header-h', h + 'px')
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Sticky sentinel using IntersectionObserver (becomes sticky when hero is out of view)
  useEffect(() => {
    const sentinel = document.querySelector('#hero-sentinel')
    if (!sentinel) {
      // fallback: use scroll
      const onScroll = () => setSticky(window.scrollY > 60)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }
    const io = new IntersectionObserver(([entry]) => {
      setSticky(!entry.isIntersecting)
    }, { rootMargin: '-1px 0px 0px 0px' })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  const isActive = (path: string) => (location.pathname === path)

  return (
    <Box
      ref={headerRef}
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1500}
      bg={isSticky ? 'linear-gradient(135deg, #fbe7cc 0%, #f5ddb8 50%, #ead5a3 100%)' : 'transparent'}
      transition="background 200ms ease"
      boxShadow={isSticky ? '0 2px 10px rgba(0,0,0,0.06)' : 'none'}
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="1400px"
        mx="auto"
        px={{ base: 4, md: 8, lg: 12 }}
        py={{ base: 2, md: 6, lg: 10 }}
      >
        {/* Mobile hamburger */}
        <IconButton
          display={{ base: 'inline-flex', md: 'none' }}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          onClick={isOpen ? onClose : onOpen}
        />

        {/* Centered logo */}
        <Box position="absolute" left="50%" transform="translateX(-50%)">
          <Link to="/">
            <img
              src="/JMD_full_logo.png"
              alt="Jewish Mother's Deli Logo"
              style={{
                maxHeight: window.matchMedia('(min-width: 768px)').matches ? (isSticky ? '140px' : '220px') : (isSticky ? '78px' : '120px'),
                height: 'auto',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Link>
        </Box>

        {/* Desktop nav */}
        <HStack spacing={6} display={{ base: 'none', md: 'flex' }} flex={1} justify="flex-end">
          {[
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
            { name: 'About', path: '/about' },
            { name: 'Blog', path: '/blog' },
            { name: 'Contact', path: '/contact' },
          ].map((item) => (
            <Link key={item.name} to={item.path}>
              <Button variant="ghost" color={isActive(item.path) ? 'brand.mediumBrown' : 'brand.mediumBrown'}>{item.name}</Button>
            </Link>
          ))}
          <ChakraLink href="tel:+17575551234">
            <Button variant="primary">ORDER</Button>
          </ChakraLink>
        </HStack>
      </Flex>

      {/* Mobile menu sheet */}
      {isOpen && (
        <Box
          position="fixed"
          top="var(--header-h)"
          left={0}
          right={0}
          bg="linear-gradient(135deg, #fbe7cc 0%, #f5ddb8 50%, #ead5a3 100%)"
          zIndex={1400}
          p={6}
        >
          <Flex direction="column" gap={3}>
            {[
              { name: 'Home', path: '/' },
              { name: 'Menu', path: '/menu' },
              { name: 'About', path: '/about' },
              { name: 'Blog', path: '/blog' },
              { name: 'Contact', path: '/contact' },
            ].map((item) => (
              <Link key={item.name} to={item.path} onClick={onClose}>
                <Button width="100%" variant="ghost">{item.name}</Button>
              </Link>
            ))}
            <ChakraLink href="tel:+17575551234">
              <Button variant="primary" width="100%">ORDER NOW</Button>
            </ChakraLink>
          </Flex>
        </Box>
      )}
    </Box>
  )
}

export default Header


