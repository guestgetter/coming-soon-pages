import React from 'react'
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Text,
  Link,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Footer: React.FC = () => {
  const direction = useBreakpointValue({ base: 'column', lg: 'row' }) as 'column' | 'row'

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Visit Us',
      items: [
        { label: 'Williamsburg, Virginia', href: '#', isExternal: false, icon: 'location' },
        { label: '(555) 123-4567', href: 'tel:5551234567', isExternal: false, icon: 'phone' },
        { label: 'hello@jewishmothersdeli.com', href: 'mailto:hello@jewishmothersdeli.com', isExternal: false, icon: 'email' },
      ]
    },
    {
      title: 'Quick Links',
      items: [
        { label: 'Our Menu', href: '/menu', isExternal: false, icon: undefined },
        { label: 'About Us', href: '/about', isExternal: false, icon: undefined },
        { label: 'Reservations', href: '/contact', isExternal: false, icon: undefined },
        { label: 'Contact', href: '/contact', isExternal: false, icon: undefined },
      ]
    },
    {
      title: 'Hours',
      items: [
        { label: 'Monday - Friday: 7:00 AM - 9:00 PM', href: '#', isExternal: false, icon: undefined },
        { label: 'Saturday: 8:00 AM - 10:00 PM', href: '#', isExternal: false, icon: undefined },
        { label: 'Sunday: 8:00 AM - 8:00 PM', href: '#', isExternal: false, icon: undefined },
      ]
    }
  ]

  return (
    <Box
      bg="brand.darkBrown"
      color="white"
      position="relative"
      overflow="hidden"
    >
      {/* Background Texture Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.05}
        sx={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      <Container maxW="1400px" position="relative" zIndex={1}>
        {/* Main Footer Content */}
        <Box py={{ base: 12, md: 16, lg: 20 }} pb={{ base: 8, md: 10, lg: 12 }}>
          <Flex
            direction={direction}
            gap={{ base: 8, lg: 12 }}
            align={{ base: 'center', lg: 'flex-start' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            {/* Brand Section */}
            <VStack
              flex={{ base: 'none', lg: '1' }}
              align={{ base: 'center', lg: 'flex-start' }}
              spacing={6}
              maxW={{ base: '100%', lg: '300px' }}
            >
              <Text
                fontFamily="heading"
                fontSize="2rem"
                color="brand.cream"
                fontWeight={600}
                lineHeight={1.2}
              >
                Jewish Mother's Deli
              </Text>
              
              <Text
                fontSize="1.1rem"
                color="rgba(255, 255, 255, 0.8)"
                lineHeight={1.6}
                fontWeight={300}
              >
                A Taste of Tradition, Served with Love. Bringing authentic Jewish deli cuisine 
                and heartfelt hospitality to Williamsburg.
              </Text>
            </VStack>

            {/* Footer Sections */}
            <Flex
              flex={{ base: 'none', lg: '2' }}
              gap={{ base: 6, lg: 8 }}
              justify="space-around"
              wrap="wrap"
            >
              {footerSections.map((section) => (
                <VStack
                  key={section.title}
                  align={{ base: 'center', lg: 'flex-start' }}
                  spacing={4}
                  minW={{ base: '100%', sm: '200px' }}
                >
                  <Text
                    fontFamily="heading"
                    fontSize="1.2rem"
                    color="brand.cream"
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing="0.5px"
                  >
                    {section.title}
                  </Text>
                  
                  <VStack spacing={2} align={{ base: 'center', lg: 'flex-start' }}>
                    {section.items.map((item, index) => (
                      <HStack key={index} spacing={2}>
                        {item.icon === 'location' && (
                          <Box
                            w="32px"
                            h="32px"
                            position="relative"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {/* Map pin icon */}
                            <Box
                              w="26px"
                              h="26px"
                              bg="brand.cream"
                              borderRadius="50% 50% 50% 0"
                              transform="rotate(-45deg)"
                              position="relative"
                            >
                              {/* Pin center dot */}
                              <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                w="10px"
                                h="10px"
                                bg="brand.darkBrown"
                                borderRadius="50%"
                              />
                            </Box>
                          </Box>
                        )}
                        {item.icon === 'phone' && (
                          <Box
                            w="32px"
                            h="32px"
                            position="relative"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {/* Phone receiver icon */}
                            <Box
                              w="24px"
                              h="24px"
                              border="3px solid brand.cream"
                              borderRadius="16px"
                              position="relative"
                              bg="transparent"
                            >
                              {/* Phone handle */}
                              <Box
                                position="absolute"
                                bottom="-3px"
                                left="50%"
                                transform="translateX(-50%)"
                                w="8px"
                                h="10px"
                                border="3px solid brand.cream"
                                borderTop="none"
                                borderRadius="0 0 4px 4px"
                              />
                              {/* Phone screen */}
                              <Box
                                position="absolute"
                                top="3px"
                                left="50%"
                                transform="translateX(-50%)"
                                w="12px"
                                h="10px"
                                bg="brand.cream"
                                borderRadius="3px"
                              />
                            </Box>
                          </Box>
                        )}
                        {item.icon === 'email' && (
                          <Box
                            w="32px"
                            h="32px"
                            position="relative"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            {/* Envelope icon */}
                            <Box
                              w="26px"
                              h="18px"
                              border="3px solid brand.cream"
                              borderRadius="3px"
                              position="relative"
                              bg="transparent"
                            >
                              {/* Envelope flap */}
                              <Box
                                position="absolute"
                                top="-3px"
                                left="-3px"
                                w="26px"
                                h="0"
                                borderLeft="13px solid transparent"
                                borderRight="13px solid transparent"
                                borderTop="10px solid brand.cream"
                              />
                              {/* Envelope content lines */}
                              <Box
                                position="absolute"
                                top="5px"
                                left="4px"
                                w="18px"
                                h="1px"
                                bg="brand.cream"
                              />
                              <Box
                                position="absolute"
                                top="9px"
                                left="4px"
                                w="18px"
                                h="1px"
                                bg="brand.cream"
                              />
                              <Box
                                position="absolute"
                                top="13px"
                                left="4px"
                                w="18px"
                                h="1px"
                                bg="brand.cream"
                              />
                            </Box>
                          </Box>
                        )}
                        <Link
                          as={!item.isExternal && item.href.startsWith('/') ? RouterLink : undefined}
                          to={!item.isExternal && item.href.startsWith('/') ? (item.href as any) : undefined}
                          href={item.isExternal || !item.href.startsWith('/') ? item.href : undefined}
                          color="rgba(255, 255, 255, 0.7)"
                          fontSize="0.95rem"
                          fontWeight={300}
                          _hover={{
                            color: 'brand.cream',
                            transition: 'color 0.3s ease',
                          }}
                          target={item.isExternal ? '_blank' : undefined}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
                        >
                          {item.label}
                        </Link>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              ))}
            </Flex>
          </Flex>
        </Box>

        {/* Social Media Icons - Centered Across Full Footer */}
        <Box py={4} textAlign="center">
          <HStack spacing={8} justify="center" w="100%">
            {/* Facebook Icon */}
            <Link
              href="https://www.facebook.com/thejewishmothersdeli"
              color="rgba(255, 255, 255, 0.7)"
              fontSize="1.2rem"
              p={5}
              borderRadius="50%"
              bg="rgba(255, 255, 255, 0.1)"
              aria-label="Visit our Facebook page"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.2)',
                color: 'brand.cream',
                transition: 'all 0.3s ease',
              }}
            >
              <Box
                w="40px"
                h="40px"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Clean Facebook icon */}
                <Box
                  w="20px"
                  h="20px"
                  bg="white"
                  borderRadius="3px"
                  position="relative"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize="16px"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                    color="brand.darkBrown"
                    lineHeight="1"
                  >
                    f
                  </Text>
                </Box>
              </Box>
            </Link>

            {/* Instagram Icon */}
            <Link
              href="https://www.instagram.com/thejewishmothersdeli"
              color="rgba(255, 255, 255, 0.7)"
              fontSize="1.2rem"
              p={5}
              borderRadius="50%"
              bg="rgba(255, 255, 255, 0.1)"
              aria-label="Visit our Instagram page"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.2)',
                color: 'brand.cream',
                transition: 'all 0.3s ease',
              }}
            >
              <Box
                w="40px"
                h="40px"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Clean Instagram icon */}
                <Box
                  w="20px"
                  h="20px"
                  border="2px solid white"
                  borderRadius="4px"
                  position="relative"
                >
                  {/* Inner circle */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w="8px"
                    h="8px"
                    border="2px solid white"
                    borderRadius="50%"
                  />
                  {/* Top right dot */}
                  <Box
                    position="absolute"
                    top="2px"
                    right="2px"
                    w="4px"
                    h="4px"
                    bg="white"
                    borderRadius="50%"
                  />
                </Box>
              </Box>
            </Link>

            {/* Twitter/X Icon (placeholder) */}
            <Link
              href="#"
              color="rgba(255, 255, 255, 0.7)"
              fontSize="1.2rem"
              p={5}
              borderRadius="50%"
              bg="rgba(255, 255, 255, 0.1)"
              aria-label="Visit our X (Twitter) page"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.2)',
                color: 'brand.cream',
                transition: 'all 0.3s ease',
              }}
            >
              <Box
                w="40px"
                h="40px"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Clean X icon */}
                <Box
                  w="18px"
                  h="18px"
                  position="relative"
                >
                  {/* X using clean lines */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    w="2px"
                    h="18px"
                    bg="white"
                    borderRadius="1px"
                    transform="translate(-50%, -50%) rotate(45deg)"
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    w="2px"
                    h="18px"
                    bg="white"
                    borderRadius="1px"
                    transform="translate(-50%, -50%) rotate(-45deg)"
                  />
                </Box>
              </Box>
            </Link>
          </HStack>
        </Box>

        {/* Divider */}
        <Divider borderColor="rgba(255, 255, 255, 0.1)" />

        {/* Bottom Footer */}
        <Box py={6}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Text
              fontSize="0.9rem"
              color="rgba(255, 255, 255, 0.6)"
              fontWeight={300}
            >
              © {currentYear} Jewish Mother's Deli. All rights reserved.
            </Text>
            
            <HStack spacing={6} fontSize="0.9rem">
              <Link
                as={RouterLink}
                to="/privacy"
                color="rgba(255, 255, 255, 0.6)"
                _hover={{
                  color: 'brand.cream',
                  transition: 'color 0.3s ease',
                }}
              >
                Privacy Policy
              </Link>
              <Link
                as={RouterLink}
                to="/terms"
                color="rgba(255, 255, 255, 0.6)"
                _hover={{
                  color: 'brand.cream',
                  transition: 'color 0.3s ease',
                }}
              >
                Terms of Service
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
