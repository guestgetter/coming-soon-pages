import React from 'react'
import { Image, Box, Text, ImageProps } from '@chakra-ui/react'

interface ImageWithFallbackProps extends Omit<ImageProps, 'fallback'> {
  src: string
  alt: string
  fallbackText?: string
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  fallbackText, 
  ...props 
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
      fallback={
        <Box
          w={props.w || '100%'}
          h={props.h || '100%'}
          bg="brand.cream"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={props.borderRadius || '8px'}
        >
          <Text 
            color="brand.lightBrown" 
            fontSize="lg" 
            fontFamily="heading"
            textAlign="center"
            px={4}
          >
            {fallbackText || alt}
          </Text>
        </Box>
      }
    />
  )
}

export default ImageWithFallback
