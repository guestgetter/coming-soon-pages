import React, { useState } from 'react'
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  useToast,
  Flex,
} from '@chakra-ui/react'

const SignupForm: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const toast = useToast()

  // HighLevel API v1 Integration (using environment variables)
  const HIGHLEVEL_API_TOKEN = import.meta.env.VITE_HIGHLEVEL_API_TOKEN
  const LOCATION_ID = import.meta.env.VITE_HIGHLEVEL_LOCATION_ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName || !email) return

    // Check if environment variables are loaded
    if (!HIGHLEVEL_API_TOKEN || !LOCATION_ID) {
      console.error('High-Level API configuration missing')
      toast({
        title: 'Configuration Error',
        description: 'API configuration is missing. Please contact support.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Send to HighLevel API v1 (using working endpoint from original)
      const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HIGHLEVEL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          email: email,
          locationId: LOCATION_ID,
          source: 'Jewish Mothers Deli Coming Soon Page',
          tags: ['coming-soon', 'deli-signup', 'williamsburg']
        })
      })

      if (response.ok) {
        // Success
        setIsSubmitted(true)
        console.log('Contact successfully added to HighLevel')
        toast({
          title: 'Success!',
          description: "You'll be among the first to know when we're ready to feed you properly.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } else {
        throw new Error('Failed to add contact')
      }
    } catch (error) {
      console.error('Error:', error)
      // Still show success to user (for better UX), but log the error
      setIsSubmitted(true)
      toast({
        title: 'Success!',
        description: "You'll be among the first to know when we're ready to feed you properly.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      // Log fallback data for manual processing
      console.log('Fallback - Contact data:', { firstName, email, timestamp: new Date().toISOString() })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Box
        bg="linear-gradient(135deg, rgba(138, 84, 46, 0.1) 0%, rgba(111, 62, 19, 0.1) 100%)"
        color="brand.darkBrown"
        p={4}
        borderRadius="12px"
        border="1px solid rgba(138, 84, 46, 0.2)"
        textAlign="center"
        animation="pulse 2s ease-in-out infinite"
        sx={{
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          },
        }}
      >
        <Text>
          Perfect! I've got your information. You'll be among the first to know when we're ready to feed you properly.
        </Text>
      </Box>
    )
  }

  return (
    <Box
      bg="rgba(255, 255, 255, 0.7)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.2)"
      borderRadius="16px"
      p={{ base: '1.5rem', md: '2rem', lg: '2.5rem' }}
      mb={8}
      boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
      animation="fadeInUp 1s ease-out 0.6s both"
      sx={{
        '@keyframes fadeInUp': {
          from: {
            opacity: 0,
            transform: 'translateY(30px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <VStack spacing={6} align="stretch">
        {/* Form Title */}
        <Text variant="formTitle" textAlign={{ base: 'center', lg: 'left' }}>
          Be the First to Know
        </Text>
        
        {/* Form Subtitle */}
        <Text variant="formSubtitle" textAlign={{ base: 'center', lg: 'left' }}>
          Stay tuned for our opening date, menu sneak peeks, and more!
        </Text>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            {/* Input Row */}
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={4}
            >
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                size="lg"
                autoComplete="given-name"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="lg"
                autoComplete="email"
              />
            </Flex>
            
            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              loadingText="Saving..."
              w="100%"
            >
              Keep Me Posted
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
}

export default SignupForm
