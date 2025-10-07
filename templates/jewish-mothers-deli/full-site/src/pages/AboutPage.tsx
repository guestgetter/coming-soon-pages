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
              maxW="800px"
              lineHeight={1.6}
            >
              A tribute to family, tradition, and the women who shaped us
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Section 1: Sid's Story */}
      <Box py={{ base: 16, md: 20, lg: 24 }} bg="brand.mediumBrown">
        <Container maxW="1000px">
          <VStack spacing={8}>
            <VStack spacing={6} textAlign="center">
              <Text
                fontFamily="heading"
                fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                color="white"
                fontWeight={600}
              >
                Why The Jewish Mother's Deli
              </Text>
              <Text
                fontSize={{ base: '1rem', lg: '1.1rem' }}
                color="brand.cream"
                fontStyle="italic"
              >
                A personal note from Sid Hall
              </Text>
            </VStack>
            
            <VStack spacing={6} align="stretch" w="100%">
              <Text
                fontSize={{ base: '1.05rem', lg: '1.15rem' }}
                color="brand.cream"
                lineHeight={1.8}
                fontWeight={300}
              >
                I can't put into words how meaningful it is for me to bring The Jewish Mother's Deli to Williamsburg — my hometown. This town shaped who I am, and now I get to bring something back that's built on the foundation of family, tradition, and a lot of love.
              </Text>
              
              <Text
                fontSize={{ base: '1.05rem', lg: '1.15rem' }}
                color="brand.cream"
                lineHeight={1.8}
                fontWeight={300}
              >
                The name The Jewish Mother's Deli is more than a clever nod — it's a tribute. A tribute to the women who raised me, shaped me, and in many ways defined the kind of person I strive to be. My mother, Norma, who has always been my biggest supporter and fiercest critic, often in the same breath. My grandmothers, Jewel and Joanne — and while Joanne isn't Jewish, she is every bit my grandmother and every bit of the strong motherly presence I want to honor here.
              </Text>
              
              <Text
                fontSize={{ base: '1.05rem', lg: '1.15rem' }}
                color="brand.cream"
                lineHeight={1.8}
                fontWeight={300}
              >
                To me, that's what "the Jewish mother" really represents. She's the one who shows up when you need her most, no questions asked. She's the one who tells you the truth even when you don't want to hear it — because she loves you enough to say it. She's the one who insists you eat, again and again and again, because feeding you is her way of taking care of you.
              </Text>
              
              <Text
                fontSize={{ base: '1.05rem', lg: '1.15rem' }}
                color="brand.cream"
                lineHeight={1.8}
                fontWeight={300}
              >
                That spirit is what I want to capture with this deli. It's not just about bagels, schmears, pastrami, and whitefish (though of course there will be plenty of those). It's about creating a space that feels like the embrace of family. A place where tradition and comfort meet, where there's laughter, honesty, and maybe even a little guilt — but always with love at the center of it all.
              </Text>
              
              <Text
                fontSize={{ base: '1.15rem', lg: '1.25rem' }}
                color="white"
                lineHeight={1.8}
                fontWeight={400}
                fontStyle="italic"
                textAlign="center"
                pt={4}
              >
                From my family to yours — here's to strong mothers, strong community, and all the Manischewitz your heart desires.
              </Text>
              
              <Text
                fontSize={{ base: '1.1rem', lg: '1.2rem' }}
                color="brand.cream"
                textAlign="right"
                fontWeight={400}
                pt={2}
              >
                — Sid Hall
              </Text>
            </VStack>
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
            <Box w="100%" overflow="hidden" position="relative">
              {/* Left fade gradient */}
              <Box
                position="absolute"
                left={0}
                top={0}
                bottom={0}
                w={{ base: '60px', md: '120px' }}
                bgGradient="linear(to-r, brand.cream, transparent)"
                zIndex={10}
                pointerEvents="none"
              />
              
              {/* Right fade gradient */}
              <Box
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                w={{ base: '60px', md: '120px' }}
                bgGradient="linear(to-l, brand.cream, transparent)"
                zIndex={10}
                pointerEvents="none"
              />
              
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
