import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Button,
  Link,
  Badge,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

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
  status: 'open' | 'coming-soon';
  features: string[];
}

const restaurants: Restaurant[] = [
  {
    name: "Ember Restaurant",
    tagline: "Fusion, Redefined",
    description: "Where fire meets amazing food. The best steaks, fresh seafood, and perfect sushi. Something extraordinary awaits in Williamsburg with special dinners and exclusive tastings.",
    image: "/images/ember-restaurant-williamsburg-virginia.avif",
    website: "https://www.emberwilliamsburg.com",
    location: "Williamsburg, VA",
    cuisine: "Fusion & Steakhouse",
    status: "coming-soon",
    features: ["Premium Steaks", "Fresh Sushi", "Chef Tastings", "Private Events"]
  },
  {
    name: "Waypoint Seafood & Grill",
    tagline: "Fresh, Seasonal, and Proudly Local",
    description: "A refined coastal restaurant rooted in the Tidewater region. Loved for fresh coastal flavors, warm hospitality, and community wine nights that bring people together.",
    image: "/images/waypoint-seafood-and-grill-williamburg-virginia.avif",
    website: "https://www.waypointgrill.com",
    location: "Williamsburg, VA",
    cuisine: "Coastal Seafood",
    status: "open",
    features: ["Chesapeake Oysters", "Hand-Cut Steaks", "Wine Nights", "Daily Happy Hour"]
  },
  {
    name: "Riverwalk Restaurant",
    tagline: "Taste the River, Embrace the Moment",
    description: "Fine dining with a view on the scenic York River waterfront. Local flavors with a strong commitment to community and sustainability, featuring private event spaces.",
    image: "/images/riverwalk-restaurant-yorktown-virginia.avif",
    website: "https://riverwalkrestaurantva.com",
    location: "Yorktown, VA",
    cuisine: "American Fine Dining",
    status: "open",
    features: ["Waterfront Views", "Private Events", "Local Sourcing", "Seasonal Menu"]
  },
  {
    name: "Water Street Grille",
    tagline: "Where the Food Matches the View",
    description: "Thoughtful preparation meets a setting that does the rest. Seasonal ingredients, fresh local seafood, and unexpected twists on classics in the heart of Yorktown's waterfront.",
    image: "/images/water-street-grille-yorktown-virginia.avif",
    website: "https://waterstreetgrille.net",
    location: "Yorktown, VA",
    cuisine: "Contemporary American",
    status: "open",
    features: ["Waterfront Dining", "Local Seafood", "Craft Cocktails", "Catering"]
  },
  {
    name: "Jewish Mother's Deli",
    tagline: "A Taste of Tradition, Served with Love",
    description: "Bringing old-school deli classics, fresh-baked bagels, stacked sandwiches, and heartfelt hospitality to Williamsburg. Inspired by generations of tradition and a whole lot of chutzpah.",
    image: "/images/jewish-mothers-deli-williamsburg-virginia.jpg",
    website: "https://www.thejewishmothersdeli.com",
    location: "Williamsburg, VA",
    cuisine: "Jewish Deli",
    status: "coming-soon",
    features: ["Traditional Recipes", "Fresh Bagels", "Matzo Ball Soup", "Family Heritage"]
  }
];

const RestaurantCard: React.FC<{ restaurant: Restaurant; index: number }> = ({ restaurant, index }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      bg="rgba(40, 40, 40, 0.9)"
      backdropFilter="blur(10px)"
      borderRadius="0px"
      overflow="hidden"
      border="1px solid rgba(200, 180, 120, 0.3)"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        border: "1px solid rgba(200, 180, 120, 0.5)",
      }}
      mb="6"
    >
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        height="200px"
        width="100%"
        objectFit="cover"
        _hover={{ transform: 'scale(1.02)' }}
        transition="transform 0.4s ease"
      />
      
      <VStack spacing="4" p="6" align="stretch" color="white">
        <VStack spacing="2" align="stretch">
          <Heading
            size="lg"
            fontFamily="'Playfair Display', serif"
            color="#C8B478"
            textAlign="left"
            fontWeight="400"
          >
            {restaurant.name}
          </Heading>
          
          <Text
            fontSize="md"
            fontStyle="italic"
            color="#C8B478"
            textAlign="left"
            fontFamily="'Playfair Display', serif"
          >
            {restaurant.tagline}
          </Text>
          
          <HStack justify="flex-start" spacing="2" mt="2">
            <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)">
              {restaurant.location}
            </Text>
            <Text fontSize="sm" color="#C8B478">
              • {restaurant.cuisine}
            </Text>
          </HStack>
        </VStack>
        
        <Text
          fontSize="sm"
          color="rgba(255, 255, 255, 0.8)"
          textAlign="left"
          lineHeight="1.6"
        >
          {restaurant.description}
        </Text>
        
        <HStack justify="space-between" align="center" mt="4">
          <Badge
            colorScheme={restaurant.status === 'open' ? 'green' : 'orange'}
            variant="outline"
            borderRadius="0px"
            px="3"
            py="1"
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.5px"
            borderColor={restaurant.status === 'open' ? '#C8B478' : '#D69E2E'}
            color={restaurant.status === 'open' ? '#C8B478' : '#D69E2E'}
          >
            {restaurant.status === 'open' ? 'Open Now' : 'Coming Soon'}
          </Badge>
          
          <Button
            as={Link}
            href={restaurant.website}
            isExternal
            bg="#C8B478"
            color="black"
            size="sm"
            borderRadius="0px"
            fontWeight="600"
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.5px"
            px="6"
            _hover={{ 
              bg: "#D4C087",
              textDecoration: 'none',
              transform: 'translateY(-2px)'
            }}
            _active={{
              transform: 'translateY(0px)'
            }}
          >
            Visit Website
          </Button>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

const HistoricHospitalityGroup: React.FC = () => {
  return (
    <Box
      minHeight="100vh"
      bg="black"
      position="relative"
      overflow="hidden"
    >
      {/* Hero Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="100vh"
        backgroundImage="url('/images/ember-restaurant-williamsburg-virginia.avif')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'rgba(0, 0, 0, 0.7)',
        }}
      />
      
      {/* Hero Section */}
      <Container maxW="container.xl" position="relative" zIndex="2">
        <Center minHeight="100vh">
          <MotionVStack
            spacing="8"
            textAlign="center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            color="white"
          >
            <Heading
              size="4xl"
              fontFamily="'Playfair Display', serif"
              color="#C8B478"
              fontWeight="400"
              mb="4"
            >
              Historic Hospitality
            </Heading>
            
            <Text
              fontSize="xl"
              fontStyle="italic"
              color="#C8B478"
              fontFamily="'Playfair Display', serif"
              mb="6"
            >
              Creating Exceptional Dining Experiences
            </Text>
            
            <Text
              fontSize="lg"
              color="rgba(255, 255, 255, 0.9)"
              maxW="800px"
              lineHeight="1.7"
              fontWeight="300"
              mb="8"
            >
              At Historic Hospitality, we create and operate distinctive restaurants 
              that celebrate Virginia's culinary heritage while setting new standards 
              for exceptional dining experiences.
            </Text>
            
            <Button
              bg="#C8B478"
              color="black"
              size="lg"
              borderRadius="0px"
              fontWeight="600"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="1px"
              px="12"
              py="6"
              _hover={{ 
                bg: "#D4C087",
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 30px rgba(200, 180, 120, 0.3)'
              }}
              _active={{
                transform: 'translateY(-1px)'
              }}
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
      <Box bg="black" py="20" id="restaurants">
        <Container maxW="container.lg">
          <MotionVStack
            spacing="16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <VStack spacing="6" textAlign="center" color="white">
              <Heading
                size="2xl"
                fontFamily="'Playfair Display', serif"
                color="#C8B478"
                fontWeight="400"
              >
                Our Restaurant Collection
              </Heading>
              
              <Text
                fontSize="lg"
                color="rgba(255, 255, 255, 0.8)"
                maxW="700px"
                lineHeight="1.7"
                fontWeight="300"
              >
                Each restaurant in our portfolio offers a unique culinary experience, 
                united by our commitment to quality, service, and memorable dining.
              </Text>
            </VStack>
            
            {/* Featured Restaurant - Ember */}
            <Box mb="12">
              <Text
                fontSize="xl"
                fontFamily="'Playfair Display', serif"
                color="#C8B478"
                textAlign="center"
                mb="8"
                fontStyle="italic"
              >
                Featured Restaurant
              </Text>
              <RestaurantCard restaurant={restaurants[0]} index={0} />
            </Box>
            
            {/* Other Restaurants Grid */}
            <VStack spacing="8" width="100%">
              <Text
                fontSize="xl"
                fontFamily="'Playfair Display', serif"
                color="#C8B478"
                textAlign="center"
                fontStyle="italic"
              >
                Our Restaurant Collection
              </Text>
              
              {restaurants.slice(1).map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.name}
                  restaurant={restaurant}
                  index={index + 1}
                />
              ))}
            </VStack>
          </MotionVStack>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box bg="#1A1A1A" py="16" borderTop="1px solid rgba(200, 180, 120, 0.3)">
        <Container maxW="container.lg">
          <VStack spacing="12">
            {/* Contact Info Grid */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="12" width="100%">
              {/* Contact */}
              <VStack spacing="4" align="center">
                <Heading
                  size="md"
                  fontFamily="'Playfair Display', serif"
                  color="#C8B478"
                  fontWeight="400"
                >
                  Contact
                </Heading>
                <VStack spacing="2" color="rgba(255, 255, 255, 0.8)" fontSize="sm">
                  <Text>(757) 555-1234</Text>
                  <Text>403 W Duke of Gloucester St</Text>
                  <Text>Williamsburg, VA 23185</Text>
                  <Link 
                    color="#C8B478" 
                    _hover={{ color: "#D4C087" }}
                    textDecoration="underline"
                  >
                    Get Directions
                  </Link>
                </VStack>
              </VStack>
              
              {/* Hours */}
              <VStack spacing="4" align="center">
                <Heading
                  size="md"
                  fontFamily="'Playfair Display', serif"
                  color="#C8B478"
                  fontWeight="400"
                >
                  Hours
                </Heading>
                <VStack spacing="2" color="rgba(255, 255, 255, 0.8)" fontSize="sm" textAlign="center">
                  <Text>Monday - Thursday</Text>
                  <Text>5:00 PM - 10:00 PM</Text>
                  <Text>Friday - Saturday</Text>
                  <Text>5:00 PM - 11:00 PM</Text>
                  <Text>Sunday</Text>
                  <Text>4:00 PM - 9:00 PM</Text>
                </VStack>
              </VStack>
              
              {/* Our Company */}
              <VStack spacing="4" align="center">
                <Heading
                  size="md"
                  fontFamily="'Playfair Display', serif"
                  color="#C8B478"
                  fontWeight="400"
                >
                  Our Company
                </Heading>
                <VStack spacing="3" align="center">
                  <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm">
                    Ember is brought to you by
                  </Text>
                  <Text
                    fontFamily="'Playfair Display', serif"
                    color="#C8B478"
                    fontStyle="italic"
                    fontSize="lg"
                  >
                    Historic Hospitality
                  </Text>
                  <Text 
                    color="rgba(255, 255, 255, 0.7)" 
                    fontSize="sm" 
                    textAlign="center"
                    maxW="250px"
                  >
                    Creating exceptional dining experiences in Virginia's Historic Triangle
                  </Text>
                </VStack>
              </VStack>
            </SimpleGrid>
            
            {/* Social Media */}
            <VStack spacing="6">
              <Heading
                size="md"
                fontFamily="'Playfair Display', serif"
                color="#C8B478"
                fontWeight="400"
              >
                Follow Us
              </Heading>
              <HStack spacing="6">
                {['facebook', 'instagram', 'twitter', 'linkedin'].map((social) => (
                  <Box
                    key={social}
                    as="button"
                    w="12"
                    h="12"
                    borderRadius="full"
                    border="2px solid #C8B478"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#C8B478"
                    _hover={{
                      bg: "#C8B478",
                      color: "black",
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.3s ease"
                  >
                    <Text fontSize="lg">📱</Text>
                  </Box>
                ))}
              </HStack>
            </VStack>
            
            {/* Copyright */}
            <Box pt="8" borderTop="1px solid rgba(200, 180, 120, 0.2)">
              <Text
                color="rgba(255, 255, 255, 0.6)"
                fontSize="sm"
                textAlign="center"
                fontWeight="300"
              >
                © 2025 Historic Hospitality. All rights reserved. | A Historic Hospitality Experience
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HistoricHospitalityGroup;