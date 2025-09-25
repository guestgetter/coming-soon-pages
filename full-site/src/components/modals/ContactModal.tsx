import React, { useState } from 'react'
import {
  VStack,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react'
import BaseModal from './BaseModal'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitted(true)
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you soon!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
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
            ✉️ Your message has been sent successfully!
          </Text>
          <Text
            color="brand.lightBrown"
            lineHeight={1.6}
          >
            We appreciate you reaching out to us. Our team will review your message and get back to you as soon as possible.
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
    <BaseModal isOpen={isOpen} onClose={handleClose} title="Send Us a Message">
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Text
            color="brand.lightBrown"
            fontSize="1rem"
            textAlign="center"
            mb={2}
          >
            Have a question or want to get in touch? We're here to help!
          </Text>

          {/* Name */}
          <Input
            name="name"
            placeholder="Your Full Name"
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

          {/* Email */}
          <Input
            name="email"
            type="email"
            placeholder="Your Email Address"
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

          {/* Message */}
          <Textarea
            name="message"
            placeholder="Your message, question, or feedback..."
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
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
            loadingText="Sending Message..."
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
            Send Message
          </Button>

          {/* Additional Info */}
          <VStack spacing={2} textAlign="center" pt={4}>
            <Text color="brand.mediumBrown" fontSize="0.95rem">
              📞 You can also call us at (555) 123-4567
            </Text>
            <Text color="brand.lightBrown" fontSize="0.9rem">
              We typically respond within 24 hours
            </Text>
          </VStack>
        </VStack>
      </form>
    </BaseModal>
  )
}

export default ContactModal
