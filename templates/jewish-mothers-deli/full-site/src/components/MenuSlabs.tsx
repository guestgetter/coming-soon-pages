import React from 'react'
import {
  Box,
  Grid,
  Image,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: string
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Pastrami on Rye',
    description: 'Hand-carved pastrami piled high on fresh rye bread with mustard and pickles',
    price: '$18.95',
    image: '/menu_images/sandwich-with-salami-lettuce-tomato-arugula_optimized.jpg',
    category: 'Sandwiches'
  },
  {
    id: '2',
    name: 'Matzo Ball Soup',
    description: 'Grandma\'s recipe with fluffy matzo balls in rich chicken broth',
    price: '$12.95',
    image: '/menu_images/meatballs-soup-with-noodles-board-uncooked-pastas-lemon-greens-dark-background-footage_optimized.jpg',
    category: 'Soups'
  },
  {
    id: '3',
    name: 'Bagel & Lox',
    description: 'Fresh-baked everything bagel with house-cured salmon and cream cheese',
    price: '$16.95',
    image: '/menu_images/big-portion-baguette-sandwich-full-mixed-sausages-vegetables_optimized.jpg',
    category: 'Breakfast'
  },
  {
    id: '4',
    name: 'Brisket Plate',
    description: 'Slow-smoked beef brisket with potato latkes and apple sauce',
    price: '$24.95',
    image: '/menu_images/brisket_optimized.jpg',
    category: 'Mains'
  },
  {
    id: '5',
    name: 'Rugelach',
    description: 'Traditional Jewish pastry filled with chocolate, nuts, and cinnamon',
    price: '$4.95',
    image: '/menu_images/still-life-delicious-pastry_optimized.jpg',
    category: 'Desserts'
  },
  {
    id: '6',
    name: 'Kugel',
    description: 'Sweet noodle pudding with raisins and cinnamon, baked to golden perfection',
    price: '$8.95',
    image: '/menu_images/delicious-food-prepared-jewish-hanukkah-celebration_optimized.jpg',
    category: 'Sides'
  }
]

const MenuSlabs: React.FC = () => {
  const gridCols = useBreakpointValue({ base: 1, md: 2, lg: 3 })

  return (
    <Box
      py={{ base: 12, md: 16, lg: 20 }}
      px={{ base: 4, md: 8 }}
      bg="brand.cream"
      position="relative"
    >
      {/* Section Header */}
      <VStack spacing={6} mb={{ base: 12, md: 16, lg: 20 }} textAlign="center">
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
          Every dish tells a story of tradition, love, and generations of family recipes
        </Text>
      </VStack>

      {/* Menu Grid */}
      <Grid
        templateColumns={`repeat(${gridCols}, 1fr)`}
        gap={{ base: 6, md: 8, lg: 10 }}
        maxW="1400px"
        mx="auto"
      >
        {menuItems.map((item) => (
          <Box
            key={item.id}
            bg="rgba(255, 255, 255, 0.7)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="20px"
            overflow="hidden"
            boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{
              transform: 'translateY(-8px) translateZ(0)',
              boxShadow: '0 30px 60px rgba(138, 84, 46, 0.15)',
            }}
            sx={{
              willChange: 'transform',
              transform: 'translateZ(0)', // Force hardware acceleration
            }}
          >
            {/* Dish Photo */}
            <Box
              position="relative"
              h="250px"
              overflow="hidden"
              bg="gray.100"
            >
              <Image
                src={item.image}
                alt={item.name}
                w="100%"
                h="100%"
                objectFit="cover"
                loading="lazy"
                decoding="async"
                fallback={
                  <Box
                    w="100%"
                    h="100%"
                    bg="brand.cream"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text color="brand.lightBrown" fontSize="lg">
                      {item.name}
                    </Text>
                  </Box>
                }
                sx={{
                  willChange: 'transform',
                  transform: 'translateZ(0)', // Force hardware acceleration
                }}
              />
              {/* Category Badge */}
              <Box
                position="absolute"
                top={3}
                left={3}
                bg="brand.mediumBrown"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight={500}
                textTransform="uppercase"
                letterSpacing="0.5px"
              >
                {item.category}
              </Box>
            </Box>

            {/* Content */}
            <VStack spacing={4} p={6} align="stretch">
              {/* Name and Price */}
              <HStack justify="space-between" align="flex-start">
                <Text
                  fontFamily="heading"
                  fontSize="1.3rem"
                  color="brand.darkBrown"
                  fontWeight={600}
                  lineHeight={1.3}
                  flex={1}
                >
                  {item.name}
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize="1.2rem"
                  color="brand.mediumBrown"
                  fontWeight={600}
                  textAlign="right"
                  flexShrink={0}
                  ml={2}
                >
                  {item.price}
                </Text>
              </HStack>

              {/* Description */}
              <Text
                fontSize="0.95rem"
                color="brand.lightBrown"
                lineHeight={1.6}
                fontWeight={300}
              >
                {item.description}
              </Text>
            </VStack>
          </Box>
        ))}
      </Grid>

      {/* Call to Action */}
      <VStack spacing={6} mt={{ base: 12, md: 16, lg: 20 }} textAlign="center">
        <Text
          fontSize={{ base: '1.1rem', lg: '1.3rem' }}
          color="brand.darkBrown"
          maxW="600px"
        >
          Can't wait to try our full menu? Join our waitlist to be first in line when we open!
        </Text>
      </VStack>
    </Box>
  )
}

export default React.memo(MenuSlabs)
