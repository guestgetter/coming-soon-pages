import React, { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Button,
  useToast,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackgroundPatterns from '../components/BackgroundPatterns'

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you soon!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setFormData({ name: '', email: '', message: '' })
    }, 2000)
  }

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
              Get In Touch
            </Text>
            <Text
              fontSize={{ base: '1.2rem', md: '1.5rem' }}
              color="brand.darkBrown"
              fontWeight={300}
              maxW="600px"
            >
              We'd love to hear from you. Send us a message or visit us in Williamsburg.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Section 2: Contact Form */}
      <Box py={{ base: 16, md: 20, lg: 24 }} bg="brand.mediumBrown">
        <Container maxW="1400px">
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 12, lg: 16 }}
            alignItems="start"
          >
            {/* Contact Form */}
            <GridItem>
              <VStack spacing={8} align="stretch">
                <VStack spacing={4} textAlign="center">
                  <Text
                    fontFamily="heading"
                    fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                    color="white"
                    fontWeight={600}
                  >
                    Send Us a Message
                  </Text>
                  <Text
                    fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                    color="brand.cream"
                    maxW="500px"
                    lineHeight={1.6}
                  >
                    Have a question or want to make a reservation? We're here to help!
                  </Text>
                </VStack>

                {/* Glassmorphic Form Box */}
                <Box
                  bg="rgba(255, 255, 255, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="24px"
                  p={{ base: 6, md: 8 }}
                  boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                >
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                      {/* Name Field */}
                      <VStack spacing={2} align="stretch" w="100%">
                        <Text
                          fontSize="1rem"
                          color="brand.darkBrown"
                          fontWeight={500}
                          fontFamily="body"
                        >
                          Name *
                        </Text>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          size="lg"
                          bg="brand.cream"
                          border="2px solid"
                          borderColor="brand.lightGray"
                          borderRadius="16px"
                          fontSize="1rem"
                          fontFamily="body"
                          autoComplete="name"
                          _focus={{
                            borderColor: 'brand.mediumBrown',
                            boxShadow: '0 0 0 3px rgba(138, 84, 46, 0.1)',
                            bg: 'white'
                          }}
                          _hover={{
                            borderColor: 'brand.mediumBrown'
                          }}
                          required
                        />
                      </VStack>

                      {/* Email Field */}
                      <VStack spacing={2} align="stretch" w="100%">
                        <Text
                          fontSize="1rem"
                          color="brand.darkBrown"
                          fontWeight={500}
                          fontFamily="body"
                        >
                          Email *
                        </Text>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          size="lg"
                          bg="brand.cream"
                          border="2px solid"
                          borderColor="brand.lightGray"
                          borderRadius="16px"
                          fontSize="1rem"
                          fontFamily="body"
                          autoComplete="email"
                          _focus={{
                            borderColor: 'brand.mediumBrown',
                            boxShadow: '0 0 0 3px rgba(138, 84, 46, 0.1)',
                            bg: 'white'
                          }}
                          _hover={{
                            borderColor: 'brand.mediumBrown'
                          }}
                          required
                        />
                      </VStack>

                      {/* Message Field */}
                      <VStack spacing={2} align="stretch" w="100%">
                        <Text
                          fontSize="1rem"
                          color="brand.darkBrown"
                          fontWeight={500}
                          fontFamily="body"
                        >
                          Message *
                        </Text>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us what's on your mind..."
                          size="lg"
                          bg="brand.cream"
                          border="2px solid"
                          borderColor="brand.lightGray"
                          borderRadius="16px"
                          fontSize="1rem"
                          fontFamily="body"
                          minH="120px"
                          resize="vertical"
                          _focus={{
                            borderColor: 'brand.mediumBrown',
                            boxShadow: '0 0 0 3px rgba(138, 84, 46, 0.1)',
                            bg: 'white'
                          }}
                          _hover={{
                            borderColor: 'brand.mediumBrown'
                          }}
                          required
                        />
                      </VStack>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        bg="brand.mediumBrown"
                        color="white"
                        fontSize="1.1rem"
                        fontWeight={500}
                        fontFamily="body"
                        borderRadius="16px"
                        px={8}
                        py={4}
                        isLoading={isSubmitting}
                        loadingText="Sending..."
                        _hover={{
                          bg: 'brand.darkBrown',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(138, 84, 46, 0.3)'
                        }}
                        _active={{
                          transform: 'translateY(0)'
                        }}
                        transition="all 0.2s ease"
                        w="100%"
                      >
                        Send Message
                      </Button>
                    </VStack>
                  </form>
                </Box>
              </VStack>
            </GridItem>

            {/* Contact Information */}
            <GridItem>
              <VStack spacing={8} align="stretch">
                <VStack spacing={4} textAlign="center">
                  <Text
                    fontFamily="heading"
                    fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                    color="white"
                    fontWeight={600}
                  >
                    Visit Us
                  </Text>
                  <Text
                    fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                    color="brand.cream"
                    maxW="500px"
                    lineHeight={1.6}
                  >
                    Come experience the warmth and tradition of Jewish Mother's Deli
                  </Text>
                </VStack>

                {/* Contact Details */}
                <VStack spacing={6} align="stretch">
                  {/* Address */}
                  <Box
                    bg="white"
                    p={6}
                    borderRadius="20px"
                    boxShadow="0 15px 30px rgba(0, 0, 0, 0.08)"
                    border="1px solid rgba(138, 84, 46, 0.1)"
                  >
                    <VStack spacing={3} align="flex-start">
                      <Text
                        fontFamily="heading"
                        fontSize="1.3rem"
                        color="brand.darkBrown"
                        fontWeight={600}
                      >
                        Address
                      </Text>
                      <Text
                        fontSize="1.1rem"
                        color="brand.lightBrown"
                        lineHeight={1.6}
                        fontFamily="body"
                      >
                        403 W Duke of Gloucester St<br />
                        Williamsburg, VA 23185<br />
                        United States
                      </Text>
                    </VStack>
                  </Box>

                  {/* Hours */}
                  <Box
                    bg="white"
                    p={6}
                    borderRadius="20px"
                    boxShadow="0 15px 30px rgba(0, 0, 0, 0.08)"
                    border="1px solid rgba(138, 84, 46, 0.1)"
                  >
                    <VStack spacing={3} align="flex-start">
                      <Text
                        fontFamily="heading"
                        fontSize="1.3rem"
                        color="brand.darkBrown"
                        fontWeight={600}
                      >
                        Hours
                      </Text>
                      <VStack spacing={2} align="flex-start" w="100%">
                        <HStack justify="space-between" w="100%">
                          <Text fontSize="1rem" color="brand.lightBrown" fontFamily="body">Monday - Friday</Text>
                          <Text fontSize="1rem" color="brand.mediumBrown" fontWeight={500} fontFamily="body">7:00 AM - 9:00 PM</Text>
                        </HStack>
                        <HStack justify="space-between" w="100%">
                          <Text fontSize="1rem" color="brand.lightBrown" fontFamily="body">Saturday</Text>
                          <Text fontSize="1rem" color="brand.mediumBrown" fontWeight={500} fontFamily="body">8:00 AM - 10:00 PM</Text>
                        </HStack>
                        <HStack justify="space-between" w="100%">
                          <Text fontSize="1rem" color="brand.lightBrown" fontFamily="body">Sunday</Text>
                          <Text fontSize="1rem" color="brand.mediumBrown" fontWeight={500} fontFamily="body">8:00 AM - 8:00 PM</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>

                  {/* Contact Info */}
                  <Box
                    bg="white"
                    p={6}
                    borderRadius="20px"
                    boxShadow="0 15px 30px rgba(0, 0, 0, 0.08)"
                    border="1px solid rgba(138, 84, 46, 0.1)"
                  >
                    <VStack spacing={3} align="flex-start">
                      <Text
                        fontFamily="heading"
                        fontSize="1.3rem"
                        color="brand.darkBrown"
                        fontWeight={600}
                      >
                        Contact
                      </Text>
                      <VStack spacing={2} align="flex-start">
                        <Text
                          fontSize="1.1rem"
                          color="brand.lightBrown"
                          lineHeight={1.6}
                          fontFamily="body"
                        >
                          <strong>Phone:</strong> (757) 555-0123
                        </Text>
                        <Text
                          fontSize="1.1rem"
                          color="brand.lightBrown"
                          lineHeight={1.6}
                          fontFamily="body"
                        >
                          <strong>Email:</strong> hello@jewishmothersdeli.com
                        </Text>
                      </VStack>
                    </VStack>
                  </Box>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Section 2: Location - Map embed styled with grain overlay as specified */}
      <Box py={{ base: 16, md: 20, lg: 24 }} bg="brand.cream" position="relative">
        {/* Gradient Background - same as ComingSoonPage hero */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(135deg, rgba(111, 62, 19, 0.08) 0%, rgba(138, 84, 46, 0.03) 100%)"
          zIndex="-1"
        />
        <Container maxW="1400px">
          <VStack spacing={12}>
            <VStack spacing={6} textAlign="center">
              <Text
                fontFamily="heading"
                fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
                color="brand.darkBrown"
                fontWeight={600}
              >
                Find Us in Williamsburg
              </Text>
              <Text
                fontSize={{ base: '1.1rem', lg: '1.3rem' }}
                color="brand.lightBrown"
                maxW="600px"
                lineHeight={1.6}
              >
                Located in the heart of Colonial Williamsburg, just steps from historic attractions
              </Text>
            </VStack>

            {/* Map Container with Grain Overlay */}
            <Box
              position="relative"
              w="100%"
              h={{ base: '300px', md: '400px', lg: '500px' }}
              borderRadius="24px"
              overflow="hidden"
              boxShadow="0 25px 50px rgba(0, 0, 0, 0.15)"
            >
              {/* Google Maps Embed */}
              <Box
                as="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2669.859638227976!2d-76.70786937061182!3d37.27104584018953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b0890bb6251c2b%3A0x59bc09a901db64bd!2s403%20W%20Duke%20of%20Gloucester%20St%2C%20Williamsburg%2C%20VA%2023185%2C%20USA!5e0!3m2!1sen!2sph!4v1757340595877!5m2!1sen!2sph"
                w="100%"
                h="100%"
                border="0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                borderRadius="24px"
              />

              {/* Grain Overlay */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                backgroundImage="url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E')"
                opacity={0.3}
                pointerEvents="none"
              />
            </Box>

            {/* Additional Location Info */}
            <Box
              bg="white"
              p={8}
              borderRadius="20px"
              boxShadow="0 20px 40px rgba(0, 0, 0, 0.08)"
              border="1px solid rgba(138, 84, 46, 0.1)"
              maxW="800px"
              textAlign="center"
            >
              <VStack spacing={4}>
                <Text
                  fontFamily="heading"
                  fontSize="1.5rem"
                  color="brand.darkBrown"
                  fontWeight={600}
                >
                  Easy to Find
                </Text>
                <Text
                  fontSize="1.1rem"
                  color="brand.lightBrown"
                  lineHeight={1.6}
                  fontFamily="body"
                >
                  We're located on Duke of Gloucester Street in the heart of Colonial Williamsburg. 
                  Look for our warm, welcoming storefront with traditional Jewish deli signage.
                </Text>
                <Text
                  fontSize="1rem"
                  color="brand.mediumBrown"
                  fontWeight={500}
                  fontFamily="body"
                >
                  Free parking available in the Colonial Williamsburg parking lots.
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default ContactPage
