import React from 'react'
import { Box } from '@chakra-ui/react'

const BackgroundPatterns: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      pointerEvents="none"
      zIndex={0}
      sx={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(111, 62, 19, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(111, 62, 19, 0.02) 0%, transparent 50%),
          linear-gradient(90deg, transparent 39px, rgba(111, 62, 19, 0.02) 40px, rgba(111, 62, 19, 0.02) 41px, transparent 42px),
          linear-gradient(0deg, transparent 39px, rgba(111, 62, 19, 0.015) 40px, rgba(111, 62, 19, 0.015) 41px, transparent 42px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 80px 80px, 80px 80px',
        willChange: 'transform',
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    />
  )
}

export default React.memo(BackgroundPatterns)
