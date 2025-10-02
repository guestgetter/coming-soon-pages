import React from 'react'
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MenuCategory } from '../data/menuData'
import MenuImageCarousel from './MenuImageCarousel'

interface AlternatingMenuSectionProps {
  category: MenuCategory
  images: {
    src: string
    alt: string
    title?: string
  }[]
  isImageLeft: boolean
}

const AlternatingMenuSection: React.FC<AlternatingMenuSectionProps> = ({
  category,
  images,
  isImageLeft,
}) => {
  // Responsive grid template - 50% each on medium+ devices
  const gridTemplate = useBreakpointValue({
    base: '1fr', // Single column on mobile
    md: '1fr 1fr', // 50% each on medium+ devices
  })

  return (
    <VStack 
      key={category.id} 
      id={`category-${category.id}`} 
      spacing={8} 
      w="100%" 
      pt={8}
      // Ensure anchor scroll positions account for sticky nav height
      scrollMarginTop={{ base: '180px', md: '220px' }}
      maxW="1200px"
      mx="auto"
    >
      {/* Category Header - Always at top */}
      <VStack spacing={4} textAlign="center" pt={4} w="100%">
        <Text
          fontFamily="heading"
          fontSize={{ base: '1.8rem', md: '2.2rem' }}
          color="rgba(255, 255, 255, 0.95)"
          fontWeight={600}
          textTransform="uppercase"
          letterSpacing="1px"
        >
          {category.name}
        </Text>
        {category.description && (
          <Text
            fontSize="1.1rem"
            color="rgba(255, 255, 255, 0.8)"
            fontStyle="italic"
            maxW="500px"
          >
            {category.description}
          </Text>
        )}
      </VStack>

      {/* Category Options (for bagels and deli sandwiches) */}
      {category.options && (
        <Box
          backdropFilter="blur(10px)"
          p={4}
          borderRadius="12px"
          textAlign="center"
          maxW="700px"
          w="100%"
        >
          <Text
            fontSize="1rem"
            fontWeight={600}
            color="white"
            mb={2}
            textTransform="uppercase"
            letterSpacing="0.5px"
          >
            {category.id === 'bagels-schmears' ? 'Bagel Options:' : 'Served On:'}
          </Text>
          <Text
            fontSize="0.9rem"
            color="rgba(255, 255, 255, 0.9)"
            lineHeight={1.6}
          >
            {category.options.join(' • ')}
          </Text>
        </Box>
      )}

      {/* Main Content Grid - 50% each on medium+ devices */}
      <Grid
        templateColumns={gridTemplate}
        gap={{ base: 8, md: 12 }}
        w="100%"
        alignItems={{ base: 'start', md: 'center' }} // Center align on medium+ devices
        minH={{ base: 'auto', md: '100vh' }} // Ensure minimum height for centering
      >
        {/* Image Carousel - Full width of its column, centered vertically */}
        <GridItem
          order={{ base: 1, md: isImageLeft ? 1 : 2 }}
          display="flex"
          justifyContent="center"
          alignItems={{ base: 'center', md: 'center' }} // Center vertically on all devices
          w="100%" // Full width of its grid column
          minH={{ base: '300px', md: '100vh' }} // Ensure enough height for centering
        >
          <MenuImageCarousel
            images={images}
            autoPlayInterval={6000}
            showNavigation={true}
            showIndicators={true}
          />
        </GridItem>

        {/* Menu Items - Full width of its column */}
        <GridItem
          order={{ base: 2, md: isImageLeft ? 2 : 1 }}
          w="100%" // Full width of its grid column
        >
          <VStack spacing={0} align="stretch" w="100%">
            {category.items.map((item, index) => (
              <Box key={item.id}>
                <Box
                  py={6}
                  px={4}
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.05)',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <VStack spacing={3} align="stretch">
                    {/* Item Name/Price with Signature Badge */}
                    <HStack justify="space-between" align="center">
                      <Text
                        fontFamily="heading"
                        fontSize="1.3rem"
                        color="white"
                        fontWeight={600}
                      >
                        {item.name}
                      </Text>
                      {item.price && (
                        <Text fontFamily="heading" fontSize="1.1rem" color="rgba(255,255,255,0.9)">
                          {item.price}
                        </Text>
                      )}
                      {/* Signature pill removed per request */}
                    </HStack>

                    {/* One-line details: prefer explicit description; otherwise use ingredients */}
                    {(item.description || (item.ingredients && item.ingredients.length > 0)) && (
                      <Text
                        fontSize="1rem"
                        color="rgba(255, 255, 255, 0.85)"
                        fontStyle="italic"
                      >
                        {item.description || item.ingredients?.join(' | ')}
                      </Text>
                    )}

                    {/* Dietary indicators removed per request */}
                  </VStack>
                </Box>
                
                {index < category.items.length - 1 && (
                  <Box h="1px" bg="rgba(255, 255, 255, 0.2)" mx={4} />
                )}
              </Box>
            ))}
          </VStack>
        </GridItem>
      </Grid>

      {/* Category Separator (except for last category) */}
      <Box
        w="100%"
        h="2px"
        bg="linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)"
        my={8}
      />
    </VStack>
  )
}

export default AlternatingMenuSection
