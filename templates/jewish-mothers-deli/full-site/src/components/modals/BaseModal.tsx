import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from '@chakra-ui/react'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: string
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'xl'
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      <ModalOverlay 
        bg="rgba(0, 0, 0, 0.4)"
        backdropFilter="blur(8px)"
      />
      <ModalContent
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor="brand.lightGray"
        borderRadius="2xl"
        boxShadow="0 25px 50px rgba(0, 0, 0, 0.25)"
        mx={4}
        my={8}
        maxH="90vh"
        overflow="hidden"
      >
        <ModalHeader
          fontFamily="heading"
          fontSize={{ base: '1.5rem', md: '2rem' }}
          color="brand.darkBrown"
          fontWeight={600}
          pb={2}
          borderBottom="1px solid"
          borderColor="brand.lightGray"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton
          color="brand.mediumBrown"
          _hover={{
            color: 'brand.darkBrown',
            bg: 'rgba(138, 84, 46, 0.1)',
          }}
          size="lg"
        />
        <ModalBody p={0} overflow="auto">
          <Box p={6}>
            {children}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BaseModal
