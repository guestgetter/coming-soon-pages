import React, { useState, useRef, useCallback } from 'react'
import { Box, VStack } from '@chakra-ui/react'

interface VirtualizedListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  overscan?: number
}

const VirtualizedList = <T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5
}: VirtualizedListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalHeight = items.length * itemHeight
  const visibleItemCount = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.floor(scrollTop / itemHeight) + visibleItemCount + overscan
  )

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  const visibleItems = items.slice(startIndex, endIndex + 1)

  return (
    <Box
      ref={containerRef}
      h={containerHeight}
      overflow="auto"
      onScroll={handleScroll}
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(138, 84, 46, 0.3)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(138, 84, 46, 0.5)',
        },
      }}
    >
      <Box h={totalHeight} position="relative">
        <Box
          position="absolute"
          top={startIndex * itemHeight}
          left={0}
          right={0}
        >
          <VStack spacing={0} align="stretch">
            {visibleItems.map((item, index) => (
              <Box key={startIndex + index} h={itemHeight}>
                {renderItem(item, startIndex + index)}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}

export default VirtualizedList
