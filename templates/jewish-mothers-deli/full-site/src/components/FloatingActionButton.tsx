import React, { useState, useCallback, useRef } from 'react'
import {
  Box,
  IconButton,
  VStack,
  useDisclosure,
  Portal,
} from '@chakra-ui/react'
import { ChatIcon, EmailIcon, CalendarIcon, CloseIcon } from '@chakra-ui/icons'
import CateringModal from './modals/CateringModal'
import ContactModal from './modals/ContactModal'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactElement
  bgColor: string
  action: () => void
}

const FloatingActionButton: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isOpen: isCateringOpen, onOpen: onCateringOpen, onClose: onCateringClose } = useDisclosure()
  const { isOpen: isContactOpen, onOpen: onContactOpen, onClose: onContactClose } = useDisclosure()
  const fabRef = useRef<HTMLDivElement>(null)

  const handleCateringOpen = useCallback(() => {
    onCateringOpen()
  }, [onCateringOpen])

  const handleContactOpen = useCallback(() => {
    onContactOpen()
  }, [onContactOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const menuItems: MenuItem[] = [
    {
      id: 'catering',
      label: 'Catering Service',
      icon: <CalendarIcon boxSize={5} />,
      bgColor: 'brand.mediumBrown',
      action: handleCateringOpen,
    },
    {
      id: 'contact',
      label: 'Send Us a Message',
      icon: <EmailIcon boxSize={5} />,
      bgColor: 'brand.darkBrown',
      action: handleContactOpen,
    },
  ]

  return (
    <Portal>
      <Box
        ref={fabRef}
        position="fixed"
        bottom={{ base: '20px', md: '30px' }}
        right={{ base: '20px', md: '30px' }}
        zIndex={1001}
        role="navigation"
        aria-label="Floating action menu"
      >
        <VStack spacing={3} align="center">
          {/* Individual Action Buttons - Always Visible */}
          {isMenuOpen && menuItems.map((item, index) => (
            <Box
              key={item.id}
              position="relative"
              role="group"
              sx={{
                '@keyframes slideInRight': {
                  from: {
                    opacity: 0,
                    transform: 'translateX(20px) scale(0.8)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateX(0) scale(1)',
                  },
                },
                animation: `slideInRight 0.3s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Action Button */}
              <IconButton
                onClick={item.action}
                aria-label={item.label}
                icon={item.icon}
                size="lg"
                bg={item.bgColor}
                color="white"
                borderRadius="full"
                w="48px"
                h="48px"
                fontSize="20px"
                boxShadow="0 6px 20px rgba(0, 0, 0, 0.15)"
                _hover={{
                  transform: 'translateY(-2px) scale(1.1)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                }}
                _active={{
                  transform: 'translateY(0) scale(0.95)',
                }}
                transition="all 0.3s ease"
                sx={{
                  '&:focus': {
                    boxShadow: '0 0 0 3px rgba(138, 84, 46, 0.3)',
                  },
                }}
              />

              {/* Tooltip - appears on hover */}
              <Box
                position="absolute"
                right="60px"
                top="50%"
                transform="translateY(-50%)"
                bg="rgba(0, 0, 0, 0.9)"
                color="white"
                px={3}
                py={2}
                borderRadius="md"
                fontSize="sm"
                fontWeight={500}
                whiteSpace="nowrap"
                opacity={0}
                pointerEvents="none"
                transition="all 0.3s ease"
                _groupHover={{
                  opacity: 1,
                  transform: 'translateY(-50%) translateX(-5px)',
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  right: '-6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderLeft: '6px solid rgba(0, 0, 0, 0.9)',
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                }}
              >
                {item.label}
              </Box>
            </Box>
          ))}

          {/* Main FAB Button */}
          <IconButton
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open quick actions menu"}
            icon={
              <Box
                transform={isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)'}
                transition="transform 0.3s ease"
              >
                {isMenuOpen ? <CloseIcon boxSize={6} /> : <ChatIcon boxSize={6} />}
              </Box>
            }
            size="lg"
            bg="brand.mediumBrown"
            color="white"
            borderRadius="full"
            w="56px"
            h="56px"
            fontSize="24px"
            boxShadow="0 8px 25px rgba(138, 84, 46, 0.3)"
            _hover={{
              bg: 'brand.darkBrown',
              transform: 'translateY(-2px) scale(1.05)',
              boxShadow: '0 12px 35px rgba(138, 84, 46, 0.4)',
            }}
            _active={{
              transform: 'translateY(0) scale(0.95)',
            }}
            transition="all 0.3s ease"
            sx={{
              '&:focus': {
                boxShadow: '0 0 0 3px rgba(138, 84, 46, 0.3)',
              },
            }}
          />
        </VStack>
      </Box>

      {/* Modals */}
      <CateringModal isOpen={isCateringOpen} onClose={onCateringClose} />
      <ContactModal isOpen={isContactOpen} onClose={onContactClose} />
    </Portal>
  )
}

export default React.memo(FloatingActionButton)
