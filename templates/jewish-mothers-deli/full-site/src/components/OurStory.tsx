import React from 'react'
import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'

const OurStory: React.FC = () => {
  const direction = useBreakpointValue({ base: 'column', lg: 'row' }) || 'column'

  return (
    <Box
      py={{ base: 16, md: 20, lg: 24 }}
      px={{ base: 4, md: 8 }}
      bg="brand.cream"
      position="relative"
      overflow="hidden"
    >
      {/* Simplified Background Texture Overlay - reduced complexity for better performance */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.02}
        sx={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(111, 62, 19, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(138, 84, 46, 0.06) 0%, transparent 50%)
          `,
          willChange: 'transform',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
      />

      <Container maxW="1400px" position="relative" zIndex={1}>
        <Flex
          direction={direction as 'column' | 'row'}
          align="center"
          gap={{ base: 8, lg: 12 }}
          minH={{ base: 'auto', lg: '600px' }}
        >
          {/* Left Side - Deli Interior Image */}
          <Box
            flex={{ base: 'none', lg: '1' }}
            position="relative"
            order={{ base: 2, lg: 1 }}
          >
            <Box
              position="relative"
              borderRadius="20px"
              overflow="hidden"
              boxShadow="0 25px 50px rgba(0, 0, 0, 0.15)"
              transform={{ base: 'none', lg: 'rotate(-2deg) translateZ(0)' }}
              _hover={{
                transform: { base: 'none', lg: 'rotate(0deg) scale(1.02) translateZ(0)' },
                transition: 'all 0.4s ease',
              }}
              sx={{
                willChange: 'transform',
                transform: 'translateZ(0)', // Force hardware acceleration
              }}
            >
              {/* Sepia-toned overlay */}
              <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                bg="rgba(111, 62, 19, 0.1)"
                zIndex={1}
                mixBlendMode="multiply"
              />
              
              <Image
                src="/images/the-jewish-mothers-deli-sign-williamsburg-va.jpg"
                alt="The Jewish Mother's Deli sign in Williamsburg, VA"
                w="100%"
                h={{ base: '300px', md: '400px', lg: '500px' }}
                objectFit="cover"
                loading="lazy"
                decoding="async"
                fallback={
                  <Box
                    w="100%"
                    h={{ base: '300px', md: '400px', lg: '500px' }}
                    bg="brand.cream"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      w="100%"
                      h="100%"
                      bg="rgba(111, 62, 19, 0.1)"
                      zIndex={1}
                    />
                    <Text
                      color="brand.darkBrown"
                      fontSize="xl"
                      fontFamily="heading"
                      zIndex={2}
                      position="relative"
                    >
                      Deli Interior
                    </Text>
                  </Box>
                }
                sx={{
                  willChange: 'transform',
                  transform: 'translateZ(0)', // Force hardware acceleration
                }}
              />
              
              {/* Vintage frame effect */}
              <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                border="3px solid rgba(138, 84, 46, 0.3)"
                borderRadius="20px"
                zIndex={2}
                pointerEvents="none"
              />
            </Box>
          </Box>

          {/* Center Divider - Thin gold-brown line */}
          <Box
            display={{ base: 'none', lg: 'block' }}
            w="2px"
            h="400px"
            bg="linear-gradient(180deg, transparent 0%, rgba(138, 84, 46, 0.4) 20%, rgba(138, 84, 46, 0.4) 80%, transparent 100%)"
            position="relative"
            order={2}
          >
            {/* Decorative elements on divider */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="12px"
              h="12px"
              bg="brand.mediumBrown"
              borderRadius="50%"
              boxShadow="0 0 20px rgba(138, 84, 46, 0.6)"
            />
          </Box>

          {/* Right Side - Story Content */}
          <VStack
            flex={{ base: 'none', lg: '1' }}
            align={{ base: 'center', lg: 'flex-start' }}
            textAlign={{ base: 'center', lg: 'left' }}
            spacing={6}
            order={{ base: 1, lg: 3 }}
          >
            {/* Warm serif headline */}
            <Text
              fontFamily="heading"
              fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
              color="brand.darkBrown"
              fontWeight={600}
              lineHeight={1.2}
            >
              A Story of Family, Tradition, and Love
            </Text>

            {/* Thin gold-brown line for mobile */}
            <Box
              display={{ base: 'block', lg: 'none' }}
              w="60px"
              h="2px"
              bg="brand.mediumBrown"
              borderRadius="1px"
            />

            {/* Sans-serif description */}
            <VStack spacing={4} align={{ base: 'center', lg: 'flex-start' }}>
              <Text
                fontSize={{ base: '1.1rem', lg: '1.2rem' }}
                color="brand.lightBrown"
                lineHeight={1.7}
                fontWeight={300}
                maxW="500px"
              >
                The Jewish Mother's Deli isn't just a restaurant—it's a legacy. Our story begins in the 
                bustling kitchens of Brooklyn, where my grandmother Sarah first learned the art of 
                Jewish cooking from her own mother.
              </Text>
              
              <Text
                fontSize={{ base: '1.1rem', lg: '1.2rem' }}
                color="brand.lightBrown"
                lineHeight={1.7}
                fontWeight={300}
                maxW="500px"
              >
                Every recipe we serve has been passed down through generations, each dish carrying the 
                warmth and love that only a Jewish mother can infuse. From our hand-rolled bagels to 
                our slow-smoked pastrami, every bite tells a story of tradition, family, and the 
                comfort of home.
              </Text>
              
              <Text
                fontSize={{ base: '1.1rem', lg: '1.2rem' }}
                color="brand.lightBrown"
                lineHeight={1.7}
                fontWeight={300}
                maxW="500px"
              >
                Now, we're bringing that same love and tradition to Williamsburg, creating a place 
                where everyone feels like family, and every meal feels like Sunday dinner at Bubbe's house.
              </Text>
            </VStack>

            {/* Signature */}
            <HStack spacing={3} pt={4}>
              <Text
                fontFamily="heading"
                fontSize="1.1rem"
                color="brand.mediumBrown"
                fontStyle="italic"
              >
                — Sarah & Family
              </Text>
              <Box
                w="40px"
                h="1px"
                bg="brand.mediumBrown"
                borderRadius="1px"
              />
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default React.memo(OurStory)
