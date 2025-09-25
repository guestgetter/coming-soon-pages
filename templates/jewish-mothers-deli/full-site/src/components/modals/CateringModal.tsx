import React, { useState } from 'react'
import {
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
  Flex,
  Select,
} from '@chakra-ui/react'
import BaseModal from './BaseModal'

interface CateringModalProps {
  isOpen: boolean
  onClose: () => void
}

const CateringModal: React.FC<CateringModalProps> = ({ isOpen, onClose }) => {
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
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
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
        onClose()
      }, 2000)
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

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSubmitted(false)
      onClose()
    }
  }

  if (isSubmitted) {
    return (
      <BaseModal isOpen={isOpen} onClose={handleClose} title="Thank You!">
        <VStack spacing={6} textAlign="center" py={8}>
          <Text
            fontSize="1.2rem"
            color="brand.darkBrown"
            fontWeight={500}
          >
            🎉 Your catering request has been sent successfully!
          </Text>
          <Text
            color="brand.lightBrown"
            lineHeight={1.6}
          >
            We'll review your request and get back to you within 24 hours with a custom quote and next steps.
          </Text>
          <Text
            fontSize="0.9rem"
            color="brand.mediumBrown"
            fontStyle="italic"
          >
            This window will close automatically...
          </Text>
        </VStack>
      </BaseModal>
    )
  }

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title="Catering Service Request" size="2xl">
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          {/* Name and Email */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              size="lg"
              bg="rgba(255, 255, 255, 0.9)"
              border="2px solid"
              borderColor="brand.lightGray"
              borderRadius="16px"
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

          {/* Phone and Company */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              size="lg"
              bg="rgba(255, 255, 255, 0.9)"
              border="2px solid"
              borderColor="brand.lightGray"
              borderRadius="16px"
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
              name="company"
              placeholder="Company/Organization (Optional)"
              value={formData.company}
              onChange={handleInputChange}
              size="lg"
              bg="rgba(255, 255, 255, 0.9)"
              border="2px solid"
              borderColor="brand.lightGray"
              borderRadius="16px"
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

          {/* Event Date and Time */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
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

          {/* Guest Count and Event Type */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <Input
              name="guestCount"
              type="number"
              placeholder="Number of Guests"
              value={formData.guestCount}
              onChange={handleInputChange}
              required
              size="lg"
              bg="rgba(255, 255, 255, 0.9)"
              border="2px solid"
              borderColor="brand.lightGray"
              borderRadius="16px"
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
              <option value="meeting">Business Meeting</option>
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
            placeholder="Special requests, dietary restrictions, or additional details..."
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            size="lg"
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
            isLoading={isSubmitting}
            loadingText="Sending Request..."
            size="lg"
            bg="brand.mediumBrown"
            color="white"
            fontFamily="heading"
            fontWeight={600}
            fontSize="1.1rem"
            py={6}
            borderRadius="16px"
            _hover={{
              bg: 'brand.darkBrown',
              transform: 'translateY(-2px)',
              boxShadow: '0 15px 35px rgba(138, 84, 46, 0.3)',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.3s ease"
          >
            Send Catering Request
          </Button>

          {/* Additional Info */}
          <VStack spacing={2} textAlign="center" pt={4}>
            <HStack spacing={2} justify="center">
              <Text color="brand.mediumBrown" fontSize="0.95rem">
                📞 Prefer to call? Reach us at (555) 123-4567
              </Text>
            </HStack>
            <Text color="brand.lightBrown" fontSize="0.9rem">
              We'll provide a custom quote within 24 hours
            </Text>
          </VStack>
        </VStack>
      </form>
    </BaseModal>
  )
}

export default CateringModal
