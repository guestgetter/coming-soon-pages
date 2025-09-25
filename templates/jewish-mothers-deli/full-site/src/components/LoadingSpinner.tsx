import React from 'react'
import { Box, Spinner, Text, VStack } from '@chakra-ui/react'

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      background="brand.cream"
      color="brand.darkBrown"
    >
      <VStack spacing={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="brand.lightGray"
          color="brand.mediumBrown"
          size="xl"
        />
        <Text
          fontSize="1.2rem"
          fontFamily="body"
          color="brand.mediumBrown"
        >
          Loading Jewish Mother's Deli...
        </Text>
      </VStack>
    </Box>
  )
}

export default LoadingSpinner
