import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Link,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

interface Restaurant {
  name: string;
  tagline: string;
  description: string;
  image: string;
  website: string;
  location: string;
  cuisine: string;
}

const restaurants: Restaurant[] = [
  {
    name: "Ember Restaurant",
    tagline: "Fusion, Redefined",
    description: "Where fire meets amazing food. The best steaks, fresh seafood, and perfect sushi. Something extraordinary awaits in Williamsburg with special dinners and exclusive tastings.",
    image: "/images/ember-restaurant-williamsburg-virginia.avif",
    website: "https://www.emberwilliamsburg.com",
    location: "Williamsburg, VA",
    cuisine: "Fusion & Steakhouse"
  },
  {
    name: "Waypoint Seafood & Grill",
    tagline: "Fresh, Seasonal, and Proudly Local",
    description: "A refined coastal restaurant rooted in the Tidewater region. Loved for fresh coastal flavors, warm hospitality, and community wine nights that bring people together.",
    image: "/images/waypoint-seafood-and-grill-williamburg-virginia.avif",
    website: "https://www.waypointgrill.com",
    location: "Williamsburg, VA",
    cuisine: "Coastal Seafood"
  },
  {
    name: "Riverwalk Restaurant",
    tagline: "Taste the River, Embrace the Moment",
    description: "Fine dining with a view on the scenic York River waterfront. Local flavors with a strong commitment to community and sustainability, featuring private event spaces.",
    image: "/images/riverwalk-restaurant-yorktown-virginia.avif",
    website: "https://riverwalkrestaurantva.com",
    location: "Yorktown, VA",
    cuisine: "American Fine Dining"
  },
  {
    name: "Water Street Grille",
    tagline: "Where the Food Matches the View",
    description: "Thoughtful preparation meets a setting that does the rest. Seasonal ingredients, fresh local seafood, and unexpected twists on classics in the heart of Yorktown's waterfront.",
    image: "/images/water-street-grille-yorktown-virginia.avif",
    website: "https://waterstreetgrille.net",
    location: "Yorktown, VA",
    cuisine: "Contemporary American"
  },
  {
    name: "Jewish Mother's Deli",
    tagline: "A Taste of Tradition, Served with Love",
    description: "Bringing old-school deli classics, fresh-baked bagels, stacked sandwiches, and heartfelt hospitality to Williamsburg. Inspired by generations of tradition and a whole lot of chutzpah.",
    image: "/images/jewish-mothers-deli-williamsburg-virginia.jpg",
    website: "https://www.thejewishmothersdeli.com",
    location: "Williamsburg, VA",
    cuisine: "Jewish Deli"
  }
];

const RestaurantCard: React.FC<{ restaurant: Restaurant; index: number }> = ({ restaurant, index }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      viewport={{ once: true }}
      maxW="1000px"
      w="100%"
    >
      <Box
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(12px)"
        borderRadius="20px"
        overflow="hidden"
        boxShadow="0 20px 60px rgba(111, 62, 19, 0.12)"
        transition="transform 0.4s ease, box-shadow 0.4s ease"
        border="1px solid"
        borderColor="rgba(138, 84, 46, 0.08)"
        _hover={{ transform: 'translateY(-6px)', boxShadow: '0 28px 80px rgba(111, 62, 19, 0.16)' }}
      >
        {/* Image */}
        <Box position="relative" overflow="hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            width="100%"
            height="360px"
            objectFit="cover"
            transition="transform 0.6s ease"
            _hover={{ transform: 'scale(1.03)' }}
          />
        </Box>

        {/* Content */}
        <VStack spacing={4} align="stretch" p={{ base: 6, md: 8 }}>
          <Heading size="lg" fontFamily="heading" color="brand.darkBrown">
            {restaurant.name}
          </Heading>
          <Text variant="tagline">"{restaurant.tagline}"</Text>

          <HStack spacing={2}>
            <Text fontSize="sm" color="brand.lightBrown">
              {restaurant.location}
            </Text>
            <Text fontSize="sm" color="brand.mediumBrown" fontWeight="500">
              • {restaurant.cuisine}
            </Text>
          </HStack>

          <Text variant="description" fontSize="md" lineHeight="1.7">
            {restaurant.description}
          </Text>

          <HStack justify="flex-start" pt={2}>
            <Button
              as={Link}
              href={restaurant.website}
              isExternal
              variant="primary"
              size="lg"
              px="8"
              _hover={{ textDecoration: 'none' }}
            >
              Visit Website
            </Button>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const HistoricHospitalityGroup: React.FC = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box
        flex="1"
        bg="linear-gradient(135deg, #fbe7cc 0%, #f5ddb8 50%, #ead5a3 100%)"
        position="relative"
        overflow="hidden"
      >
      {/* Background Patterns */}
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
      
      {/* Hero Section */}
      <Container maxW="container.xl" position="relative" zIndex="2">
        <Center minHeight="80vh" py="32">
          <MotionVStack
            spacing="8"
            textAlign="center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            color="brand.darkBrown"
          >
            <Heading
              size="4xl"
              fontFamily="heading"
              color="brand.darkBrown"
              fontWeight="400"
              mb="4"
              textShadow="2px 2px 4px rgba(111, 62, 19, 0.1)"
            >
              Historic Hospitality
            </Heading>
            
            <Text
              variant="tagline"
              fontSize="xl"
              mb="6"
            >
              "Creating Exceptional Dining Experiences"
            </Text>
            
            <Text
              variant="description"
              fontSize="lg"
              maxW="800px"
              mb="8"
            >
              At Historic Hospitality, we create and operate distinctive restaurants 
              that celebrate Virginia's culinary heritage while setting new standards 
              for exceptional dining experiences.
            </Text>
            
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                document.getElementById('restaurants')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Explore Our Restaurants
            </Button>
          </MotionVStack>
        </Center>
      </Container>
      
      {/* Restaurants Section */}
      <Box bg="brand.cream" py="20" id="restaurants">
        <Container maxW="container.lg">
          <MotionVStack
            spacing="16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <VStack spacing="6" textAlign="center">
              <Heading
                size="2xl"
                fontFamily="heading"
                color="brand.darkBrown"
                fontWeight="400"
                textShadow="2px 2px 4px rgba(111, 62, 19, 0.1)"
              >
                Our Restaurant Collection
              </Heading>
              
              <Text
                variant="description"
                fontSize="lg"
                maxW="700px"
              >
                Each restaurant in our portfolio offers a unique culinary experience, 
                united by our commitment to quality, service, and memorable dining.
              </Text>
            </VStack>
            
            {/* Restaurant Collection */}
            <VStack spacing="12" width="100%">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.name}
                  restaurant={restaurant}
                  index={index}
                />
              ))}
            </VStack>
          </MotionVStack>
        </Container>
      </Box>
      
      {/* Footer Section */}
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        textAlign="center"
        pt="16"
        pb="8"
        bg="brand.cream"
      >
        <Container maxW="container.lg">
          <VStack spacing="8">
            <VStack spacing="4">
              <Text
                variant="description"
                fontSize="lg"
                color="brand.mediumBrown"
                fontWeight="500"
                maxW="600px"
              >
                Each restaurant in our family is independently crafted to celebrate its unique character 
                while maintaining our shared values of quality, tradition, and community.
              </Text>
              
              <Text
                fontSize="sm"
                color="brand.lightBrown"
                fontStyle="italic"
              >
                Historic Hospitality • Serving Virginia with Pride Since 2020
              </Text>
            </VStack>
            
            {/* Copyright */}
            <Box pt="6" borderTop="1px solid rgba(138, 84, 46, 0.2)">
              <Text
                fontSize="sm"
                color="brand.lightBrown"
                textAlign="center"
                fontWeight="300"
              >
                © 2025 Historic Hospitality. All rights reserved.
              </Text>
            </Box>
          </VStack>
        </Container>
      </MotionBox>
      </Box>
      <Footer />
    </Box>
  );
};

export default HistoricHospitalityGroup;