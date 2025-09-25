import React, { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
  Flex,
  useBreakpointValue,
  Select,
} from '@chakra-ui/react'

const CateringForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventDate: '',
    eventTime: '',
    guestCount: '',
    eventType: '',
    serviceType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const toast = useToast()

  const direction = useBreakpointValue({ base: 'column', md: 'row' }) || 'column'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitted(true)
      toast({
        title: 'Catering Request Sent!',
        description: "We'll get back to you within 24 hours to discuss your catering needs and provide a custom quote.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or call us directly.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Box
        bg="linear-gradient(135deg, rgba(138, 84, 46, 0.1) 0%, rgba(111, 62, 19, 0.1) 100%)"
        color="brand.darkBrown"
        p={8}
        borderRadius="20px"
        border="1px solid rgba(138, 84, 46, 0.2)"
        textAlign="center"
        maxW="600px"
        mx="auto"
        animation="pulse 2s ease-in-out infinite"
        sx={{
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.02)' },
          },
        }}
      >
        <VStack spacing={4}>
          <Text
            fontFamily="heading"
            fontSize="2rem"
            color="brand.darkBrown"
            fontWeight={600}
          >
            Thank You!
          </Text>
          <Text fontSize="1.1rem" lineHeight={1.6}>
            We've received your catering request and will get back to you within 24 hours 
            with a custom quote and menu options. We can't wait to make your event special!
          </Text>
        </VStack>
      </Box>
    )
  }

  return (
    <Box
      py={{ base: 16, md: 20, lg: 24 }}
      px={{ base: 4, md: 8 }}
      bg="brand.cream"
      position="relative"
    >
      {/* Background Texture */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.02}
        sx={{
          backgroundImage: `
            radial-gradient(circle at 25% 75%, rgba(111, 62, 19, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(138, 84, 46, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      <Box maxW="1400px" mx="auto" position="relative" zIndex={1}>
        {/* Section Header */}
        <VStack spacing={6} mb={{ base: 12, md: 16, lg: 20 }} textAlign="center">
          <Text
            fontFamily="heading"
            fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
            color="brand.darkBrown"
            fontWeight={600}
          >
            Catering Services
          </Text>
          <Text
            fontSize={{ base: '1.1rem', lg: '1.3rem' }}
            color="brand.lightBrown"
            maxW="600px"
            lineHeight={1.6}
          >
            Let us cater your next event with authentic Jewish deli cuisine. From corporate lunches 
            to family celebrations, we'll bring the warmth and tradition to your special occasions.
          </Text>
        </VStack>

        {/* Glassmorphic Form Card */}
        <Box
          bg="rgba(255, 255, 255, 0.7)"
          backdropFilter="blur(15px)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          borderRadius="24px"
          p={{ base: '2rem', md: '3rem', lg: '4rem' }}
          maxW="800px"
          mx="auto"
          boxShadow="0 30px 60px rgba(0, 0, 0, 0.12)"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative corner elements */}
          <Box
            position="absolute"
            top={0}
            left={0}
            w="60px"
            h="60px"
            borderTop="3px solid rgba(138, 84, 46, 0.3)"
            borderLeft="3px solid rgba(138, 84, 46, 0.3)"
            borderTopLeftRadius="24px"
          />
          <Box
            position="absolute"
            top={0}
            right={0}
            w="60px"
            h="60px"
            borderTop="3px solid rgba(138, 84, 46, 0.3)"
            borderRight="3px solid rgba(138, 84, 46, 0.3)"
            borderTopRightRadius="24px"
          />

          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* Name and Email Row */}
              <Flex direction={direction as 'column' | 'row'} gap={4}>
                <Input
                  name="name"
                  placeholder="Contact Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  size="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  border="2px solid"
                  borderColor="brand.lightGray"
                  borderRadius="16px"
                  autoComplete="name"
                  _focus={{
                    borderColor: 'brand.mediumBrown',
                    bg: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                  }}
                  _hover={{
                    borderColor: 'brand.mediumBrown',
                    transform: 'translateY(-1px)',
                  }}
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  size="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  border="2px solid"
                  borderColor="brand.lightGray"
                  borderRadius="16px"
                  autoComplete="email"
                  _focus={{
                    borderColor: 'brand.mediumBrown',
                    bg: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                  }}
                  _hover={{
                    borderColor: 'brand.mediumBrown',
                    transform: 'translateY(-1px)',
                  }}
                />
              </Flex>

              {/* Company and Phone Row */}
              <Flex direction={direction as 'column' | 'row'} gap={4}>
                <Input
                  name="company"
                  placeholder="Company/Organization"
                  value={formData.company}
                  onChange={handleInputChange}
                  size="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  border="2px solid"
                  borderColor="brand.lightGray"
                  borderRadius="16px"
                  autoComplete="organization"
                  _focus={{
                    borderColor: 'brand.mediumBrown',
                    bg: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                  }}
                  _hover={{
                    borderColor: 'brand.mediumBrown',
                    transform: 'translateY(-1px)',
                  }}
                />
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  size="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  border="2px solid"
                  borderColor="brand.lightGray"
                  borderRadius="16px"
                  autoComplete="tel"
                  _focus={{
                    borderColor: 'brand.mediumBrown',
                    bg: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                  }}
                  _hover={{
                    borderColor: 'brand.mediumBrown',
                    transform: 'translateY(-1px)',
                  }}
                />
              </Flex>

              {/* Event Date and Time Row */}
              <Flex direction={direction as 'column' | 'row'} gap={4}>
                <Input
                  name="eventDate"
                  type="date"
                  placeholder="Event Date"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                  size="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  border="2px solid"
                  borderColor="brand.lightGray"
                  borderRadius="16px"
                  autoComplete="off"
                  _focus={{
                    borderColor: 'brand.mediumBrown',
                    bg: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                  }}
                  _hover={{
                    borderColor: 'brand.mediumBrown',
                    transform: 'translateY(-1px)',
                  }}
                />
                <Input
                  name="eventTime"
                  type="time"
                  placeholder="Event Time"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  required
                  size="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  border="2px solid"
                  borderColor="brand.lightGray"
                  borderRadius="16px"
                  autoComplete="off"
                  _focus={{
                    borderColor: 'brand.mediumBrown',
                    bg: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                  }}
                  _hover={{
                    borderColor: 'brand.mediumBrown',
                    transform: 'translateY(-1px)',
                  }}
                />
              </Flex>

              {/* Guest Count and Event Type Row */}
              <Flex direction={direction as 'column' | 'row'} gap={4}>
                <Input
                  name="guestCount"
                  type="number"
                  placeholder="Number of Guests"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  required
                  min="10"
                  max="500"
                  size="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  border="2px solid"
                  borderColor="brand.lightGray"
                  borderRadius="16px"
                  autoComplete="off"
                  _focus={{
                    borderColor: 'brand.mediumBrown',
                    bg: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                  }}
                  _hover={{
                    borderColor: 'brand.mediumBrown',
                    transform: 'translateY(-1px)',
                  }}
                />
                <Select
                  name="eventType"
                  placeholder="Event Type"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  required
                  size="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  border="2px solid"
                  borderColor="brand.lightGray"
                  borderRadius="16px"
                  aria-label="Select event type"
                  aria-describedby="eventType-description"
                  _focus={{
                    borderColor: 'brand.mediumBrown',
                    bg: 'rgba(255, 255, 255, 0.95)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                  }}
                  _hover={{
                    borderColor: 'brand.mediumBrown',
                    transform: 'translateY(-1px)',
                  }}
                >
                  <option value="corporate">Corporate Event</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="holiday">Holiday Party</option>
                  <option value="graduation">Graduation</option>
                  <option value="other">Other</option>
                </Select>
              </Flex>

              {/* Service Type */}
              <Select
                name="serviceType"
                placeholder="Service Type"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
                size="lg"
                bg="rgba(255, 255, 255, 0.9)"
                border="2px solid"
                borderColor="brand.lightGray"
                borderRadius="16px"
                aria-label="Select service type"
                aria-describedby="serviceType-description"
                _focus={{
                  borderColor: 'brand.mediumBrown',
                  bg: 'rgba(255, 255, 255, 0.95)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                }}
                _hover={{
                  borderColor: 'brand.mediumBrown',
                  transform: 'translateY(-1px)',
                }}
              >
                <option value="full-service">Full Service (Setup, Service, Cleanup)</option>
                <option value="delivery">Delivery Only</option>
                <option value="pickup">Pickup Only</option>
                <option value="drop-off">Drop-off Service</option>
              </Select>

              {/* Message */}
              <Textarea
                name="message"
                placeholder="Tell us about your event! Any dietary restrictions, special requests, or specific dishes you'd like to include?"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                bg="rgba(255, 255, 255, 0.9)"
                border="2px solid"
                borderColor="brand.lightGray"
                borderRadius="16px"
                resize="vertical"
                _focus={{
                  borderColor: 'brand.mediumBrown',
                  bg: 'rgba(255, 255, 255, 0.95)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(138, 84, 46, 0.15)',
                }}
                _hover={{
                  borderColor: 'brand.mediumBrown',
                  transform: 'translateY(-1px)',
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                loadingText="Sending Request..."
                w="100%"
                py={6}
                fontSize="1.1rem"
                fontWeight={600}
                _hover={{
                  transform: 'translateY(-3px)',
                  boxShadow: '0 20px 40px rgba(138, 84, 46, 0.4)',
                }}
                _active={{
                  transform: 'translateY(-1px)',
                }}
              >
                Request Catering Quote
              </Button>
            </VStack>
          </form>
        </Box>

        {/* Additional Info */}
        <VStack spacing={4} mt={8} textAlign="center">
          <HStack spacing={2} justify="center">
            <Box
              w="16px"
              h="16px"
              bg="brand.mediumBrown"
              borderRadius="50%"
              position="relative"
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="6px"
                h="6px"
                bg="white"
                borderRadius="50%"
              />
            </Box>
            <Text color="brand.mediumBrown" fontSize="0.95rem">
              Prefer to call? Reach us at (555) 123-4567
            </Text>
          </HStack>
          <Text color="brand.lightBrown" fontSize="0.9rem">
            We'll provide a custom quote within 24 hours
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

export default CateringForm
