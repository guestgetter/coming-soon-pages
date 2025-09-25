import React from 'react'
import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
} from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackgroundPatterns from '../components/BackgroundPatterns'
import ImageWithFallback from '../components/ImageWithFallback'

const AboutPage: React.FC = () => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartX, setDragStartX] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [dragStartPosition, setDragStartPosition] = React.useState(0);





  const timelineEvents = [
    {
      year: '1923',
      title: 'The Beginning in Brooklyn',
      description: 'Sarah Cohen, our founder\'s grandmother, opens her first kitchen in a small apartment in Brooklyn, serving traditional Jewish dishes to neighbors and friends.',
      image: '/history_images/1_optimized.jpg'
    },
    {
      year: '1948',
      title: 'The Deli Tradition Begins',
      description: 'Sarah\'s daughter, Ruth, takes over the kitchen and transforms it into a small deli, introducing the famous pastrami recipe that would become our signature.',
      image: '/history_images/2_optimized.jpg'
    },
    {
      year: '1972',
      title: 'Expansion to Manhattan',
      description: 'Ruth\'s son, David, expands the business to Manhattan, bringing authentic Jewish deli cuisine to a wider audience and earning critical acclaim.',
      image: '/history_images/3_optimized.jpg'
    },
    {
      year: '1998',
      title: 'The Next Generation',
      description: 'David\'s daughter, Rachel, modernizes the recipes while preserving tradition, introducing new techniques while honoring the family\'s culinary heritage.',
      image: '/history_images/4.webp'
    },
    {
      year: '2024',
      title: 'Coming to Williamsburg',
      description: 'Now, Rachel\'s children are bringing the Jewish Mother\'s Deli to Williamsburg, Virginia, continuing the legacy of love, tradition, and exceptional food.',
      image: '/history_images/5.webp'
    }
  ]

  // Optimized card component with better performance








  // Drag handlers for manual control
  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    // Store the current drag offset when starting
    setDragStartPosition(dragOffset);
  }, [dragOffset]);



  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = e.clientX - dragStartX;
    const newOffset = dragStartPosition + deltaX;
    setDragOffset(newOffset);
  }, [isDragging, dragStartX, dragStartPosition]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers
  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    // Store the current drag offset when starting
    setDragStartPosition(dragOffset);
  }, [dragOffset]);

  const handleTouchMove = React.useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = e.touches[0].clientX - dragStartX;
    const newOffset = dragStartPosition + deltaX;
    setDragOffset(newOffset);
  }, [isDragging, dragStartX, dragStartPosition]);

  const handleTouchEnd = React.useCallback(() => {
    setIsDragging(false);
  }, []);



  // Global event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Create proper image mapping based on actual files - combining humble_images and menu_images
  const getImagePath = (index: number) => {
    // Humble images mapping (1-33)
    const humbleImageMap: { [key: number]: string } = {
      1: '1-A7303628_optimized.jpg',
      2: '2-A7303629_optimized.jpg',
      3: '3-A7303630_optimized.jpg',
      4: '4-A7303631_optimized.jpg',
      5: '5-A7303632_optimized.jpg',
      6: '6-A7303633_optimized.jpg',
      7: '7-A7303634_optimized.jpg',
      8: '8-A7303635_optimized.jpg',
      9: '9-A7303636_optimized.jpg',
      10: '10-A7303637_optimized.jpg',
      11: '11-A7303638_optimized.jpg',
      12: '12-A7303639_optimized.jpg',
      13: '13-A7303640_optimized.jpg',
      14: '14-A7303641_optimized.jpg',
      15: '15-A7303642_optimized.jpg',
      16: '16-A7303643_optimized.jpg',
      17: '17-A7303644_optimized.jpg',
      18: '18-A7303645_optimized.jpg',
      19: '19-A7303646_optimized.jpg',
      20: '20-A7303647_optimized.jpg',
      21: '21-A7303648_optimized.jpg',
      22: '22-IMG_1034_optimized.jpg',
      23: '23-IMG_1037_optimized.jpg',
      24: '24-IMG_1039_optimized.jpg',
      25: '25-IMG_1040_optimized.jpg',
      26: '26-IMG_1041_optimized.jpg',
      27: '27-IMG_1042 3_optimized.jpg',
      28: '28-IMG_1043 2_optimized.jpg',
      29: '29-IMG_1044 2_optimized.jpg',
      30: '30-IMG_1045 3_optimized.jpg',
      31: '31-IMG_1046 2_optimized.jpg',
      32: '32-IMG_1047_optimized.jpg',
      33: '33-IMG_1048 2_optimized.jpg'
    };

    // Menu images mapping (34-42)
    const menuImageMap: { [key: number]: string } = {
      34: 'big-portion-baguette-sandwich-full-mixed-sausages-vegetables_optimized.jpg',
      35: 'brisket_optimized.jpg',
      36: 'delicious-food-prepared-jewish-hanukkah-celebration_optimized.jpg',
      37: 'delicious-sandwich-with-melted-cheese-ham_optimized.jpg',
      38: 'meatballs-soup-with-noodles-board-uncooked-pastas-lemon-greens-dark-background-footage_optimized.jpg',
      39: 'sandwich-with-ham-avocado-sauce-caramelized-onions_optimized.jpg',
      40: 'sandwich-with-salami-lettuce-tomato-arugula_optimized.jpg',
      41: 'still-life-delicious-pastry_optimized.jpg',
      42: 'tasty-sandwich-with-bacon_optimized.jpg'
    };

    const imageIndex = index + 1;
    
    // Check if it's a humble image (1-33)
    if (imageIndex <= 33 && humbleImageMap[imageIndex]) {
      return `/humble_images/${humbleImageMap[imageIndex]}`;
    }
    
    // Check if it's a menu image (34-42)
    if (imageIndex >= 34 && imageIndex <= 42 && menuImageMap[imageIndex]) {
      return `/menu_images/${menuImageMap[imageIndex]}`;
    }
    
    // Fallback for any other index
    return `/humble_images/${humbleImageMap[((imageIndex - 1) % 33) + 1] || 'fallback.jpg'}`;
  };

  const CardComponent = React.useMemo(() => {
    const MemoizedCard = React.memo(({ index, setKey }: { index: number; setKey: string }) => {
      const imageIndex = index + 1;
      const isMenuImage = imageIndex >= 34 && imageIndex <= 42;
      const altText = isMenuImage 
        ? `Delicious menu item ${imageIndex - 33}`
        : `Humble beginnings image ${imageIndex}`;
      const fallbackText = isMenuImage 
        ? `Menu ${imageIndex - 33}`
        : `Image ${imageIndex}`;

      return (
        <Box
          key={setKey}
          overflow="visible"
          position="relative"
          minW="400px"
          sx={{
            willChange: 'transform',
            transform: 'translateZ(0)', // Force hardware acceleration
            backfaceVisibility: 'hidden', // Prevent flickering
            perspective: '1000px', // Better 3D rendering
          }}
        >
          <Box
            minW="400px"
            bg="white"
            borderRadius="20px"
            boxShadow="0 15px 35px rgba(0, 0, 0, 0.1)"
            transition="all 0.3s ease"
            position="relative"
            sx={{
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <Box
              w="100%"
              h="400px"
              borderRadius="20px"
              overflow="hidden"
              position="relative"
            >
              <ImageWithFallback
                src={getImagePath(index)}
                alt={altText}
                w="100%"
                h="100%"
                objectFit="cover"
                fallbackText={fallbackText}
              />
            </Box>
          </Box>
        </Box>
      );
    });
    
    MemoizedCard.displayName = 'CardComponent';
    return MemoizedCard;
  }, []);

  return (
    <Box position="relative">
      <Navbar />
      <BackgroundPatterns />
      
      {/* Hero Section */}
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
              Our Story
            </Text>
            <Text
              fontSize={{ base: '1.2rem', md: '1.5rem' }}
              color="brand.darkBrown"
              fontWeight={300}
              maxW="600px"
            >
              A century of tradition, love, and the most delicious Jewish deli cuisine
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Section 1: Story Timeline - Vertical timeline component as specified */}
      <Box py={{ base: 16, md: 20, lg: 24 }} bg="brand.mediumBrown">
        <Container maxW="1400px">
          <VStack spacing={12}>
            <VStack spacing={6} textAlign="center">
              <Text
                fontFamily="heading"
                fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                color="white"
                fontWeight={600}
              >
                Our Journey Through Time
              </Text>
              <Text
                fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                color="brand.cream"
                maxW="600px"
                lineHeight={1.6}
              >
                From a small Brooklyn kitchen to Williamsburg, Virginia - our story spans generations
              </Text>
            </VStack>

            {/* Vertical Timeline Component */}
            <Box w="100%" maxW="1200px" position="relative">
              {/* Timeline Line */}
              <Box
                position="absolute"
                left={{ base: '10%', lg: '50%' }}
                top={0}
                bottom={0}
                w="4px"
                bg="white"
                transform="translateX(-50%)"
                zIndex={1}
                borderRadius="2px"
              />

              <VStack spacing={0} align="stretch">
                {timelineEvents.map((event, index) => (
                  <Box key={index} position="relative" py={{ base: 12, lg: 16 }}>
                    {/* Timeline Dot */}
                    <Box
                      position="absolute"
                      left={{ base: '10%', lg: '50%' }}
                      top="50%"
                      w="24px"
                      h="24px"
                      bg="brand.mediumBrown"
                      borderRadius="50%"
                      border="5px solid white"
                      boxShadow="0 0 25px rgba(138, 84, 46, 0.5), 0 4px 15px rgba(0, 0, 0, 0.1)"
                      transform="translate(-50%, -50%)"
                      zIndex={10}
                    />

                    {/* Content Container */}
                    <Flex
                      direction={{ base: 'column', lg: 'row' }}
                      align="center"
                      justify="center"
                      gap={{ base: 6, lg: 12 }}
                      position="relative"
                      zIndex={2}
                    >
                      {/* Left Content - Year and Title */}
                      <Box
                        flex="1"
                        maxW={{ base: '100%', lg: '360px' }}
                        textAlign={{ base: 'left', lg: 'right' }}
                        order={{ base: 1, lg: 1 }}
                        pr={{ base: 0, lg: 12 }}
                        mt={{ base: 4, lg: 0 }}
                      >
                        <VStack spacing={3} align={{ base: 'center', lg: 'flex-end' }}>
                          <Text
                            fontFamily="heading"
                            fontSize={{ base: '2.5rem', lg: '3.5rem' }}
                            color="white"
                            fontWeight={600}
                            lineHeight={1}
                            textShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                          >
                            {event.year}
                          </Text>
                          
                          <Text
                            fontFamily="heading"
                            fontSize={{ base: '1.3rem', lg: '1.6rem' }}
                            color="brand.cream"
                            fontWeight={600}
                            lineHeight={1.2}
                            maxW="320px"
                          >
                            {event.title}
                          </Text>
                        </VStack>
                      </Box>

                      {/* Center Spacer for Mobile */}
                      <Box 
                        display={{ base: 'none', lg: 'none' }}
                      />

                      {/* Right Content - Description and Image */}
                      <Box
                        flex="1"
                        maxW={{ base: '100%', lg: '440px' }}
                        textAlign={{ base: 'left', lg: 'left' }}
                        order={{ base: 3, lg: 2 }}
                        pl={{ base: 0, lg: 12 }}
                        mt={{ base: 4, lg: 0 }}
                      >
                        <VStack spacing={4} align={{ base: 'center', lg: 'flex-start' }}>
                          <Text
                            fontSize={{ base: '1rem', lg: '1.1rem' }}
                            color="brand.cream"
                            lineHeight={1.6}
                            fontWeight={300}
                            maxW="380px"
                          >
                            {event.description}
                          </Text>

                          {/* Image */}
                          <Box
                            w={{ base: '200px', lg: '240px' }}
                            h={{ base: '130px', lg: '160px' }}
                            borderRadius="16px"
                            overflow="hidden"
                            boxShadow="0 15px 35px rgba(0, 0, 0, 0.15)"
                            transition="all 0.3s ease"
                            border="2px solid white"
                            _hover={{
                              transform: 'scale(1.05)',
                              boxShadow: '0 20px 40px rgba(138, 84, 46, 0.25)',
                            }}
                          >
                            <ImageWithFallback
                              src={event.image}
                              alt={event.title}
                              w="100%"
                              h="100%"
                              objectFit="cover"
                              fallbackText={event.year}
                            />
                          </Box>
                        </VStack>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Section 2: Team Spotlight - Grid of chefs/staff as specified - COMMENTED OUT */}
      {/*
      <Box py={{ base: 16, md: 20, lg: 24 }} bg="brand.lightGray">
        <Container maxW="1400px">
          <VStack spacing={12}>
            <VStack spacing={6} textAlign="center">
              <Text
                fontFamily="heading"
                fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                color="brand.darkBrown"
                fontWeight={600}
              >
                Meet Our Team
              </Text>
              <Text
                fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                color="brand.lightBrown"
                maxW="600px"
                lineHeight={1.6}
              >
                The passionate chefs and staff who bring our family recipes to life
              </Text>
            </VStack>

            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={8}
              w="100%"
            >
              {teamMembers.map((member, index) => (
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
                      p={4}
                      bg="white"
                    >
                      <Box
                        position="relative"
                        borderRadius="16px"
                        overflow="hidden"
                        boxShadow="0 8px 25px rgba(0, 0, 0, 0.15)"
                      >
                        <ImageWithFallback
                          src={member.image}
                          alt={member.name}
                          w="100%"
                          h="250px"
                          objectFit="cover"
                          fallbackText={member.name}
                        />
                      </Box>
                    </Box>

                    <Box p={6}>
                      <VStack spacing={4} align="center" textAlign="center">
                        <Text
                          fontFamily="heading"
                          fontSize="1.4rem"
                          color="brand.darkBrown"
                          fontWeight={600}
                          lineHeight={1.2}
                        >
                          {member.name}
                        </Text>
                        
                        <Text
                          fontSize="1rem"
                          color="brand.mediumBrown"
                          fontWeight={500}
                          textTransform="uppercase"
                          letterSpacing="0.5px"
                        >
                          {member.role}
                        </Text>
                        
                        <Text
                          fontSize="0.95rem"
                          color="brand.lightBrown"
                          lineHeight={1.6}
                          fontWeight={300}
                        >
                          {member.bio}
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>
      */}

      {/* Section 3: Started from Bottom But Now We Are Here - OPTIMIZED */}
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
                Started from Bottom But Now We Are Here
              </Text>
              <Text
                fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                color="brand.lightBrown"
                maxW="600px"
                lineHeight={1.6}
              >
                Our journey from humble beginnings to becoming a beloved culinary destination
              </Text>
            </VStack>

            {/* Optimized Sliding Cards Container - Infinite Scroll Effect */}
            <Box w="100%" overflow="hidden">


              
              <Box
                display="flex"
                gap={6}
                cursor="grab"
                _active={{ cursor: 'grabbing' }}
                userSelect="none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                style={{
                  transform: `translate3d(${dragOffset}px, 0, 0)`,
                  animation: isDragging ? 'none' : 'slideCards 1200s linear infinite',
                }}
                                  sx={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    '@keyframes slideCards': {
                      '0%': {
                        transform: `translate3d(${dragOffset}px, 0, 0)`,
                      },
                      '100%': {
                        transform: `translate3d(${dragOffset - 66780}px, 0, 0)`,
                      },
                    },
                  }}
              >
                             {/* First set: 42, 41, 40... (for left scrolling) - includes humble + menu images */}
             {Array.from({ length: 42 }).map((_, index) => (
               <CardComponent
                 key={`left-${index}`}
                 index={41 - index}
                 setKey={`left-${index}`}
               />
             ))}
             
             {/* Main set: 1, 2, 3... 42 (normal order) - includes humble + menu images */}
             {Array.from({ length: 42 }).map((_, index) => (
               <CardComponent
                 key={`main-${index}`}
                 index={index}
                 setKey={`main-${index}`}
               />
             ))}
             
             {/* Third set: 1, 2, 3... 42 (for right scrolling) - includes humble + menu images */}
             {Array.from({ length: 42 }).map((_, index) => (
               <CardComponent
                 key={`right-${index}`}
                 index={index}
                 setKey={`right-${index}`}
               />
             ))}
              </Box>
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default AboutPage
