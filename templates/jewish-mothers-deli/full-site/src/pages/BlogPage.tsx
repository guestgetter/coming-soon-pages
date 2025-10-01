import React from 'react'
import { Box, Heading, Text, VStack, Image, LinkBox, LinkOverlay, Stack, HStack, Divider } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPosts } from '../data/posts'
import { Link as RouterLink } from 'react-router-dom'

const BlogPage: React.FC = () => {
  const posts = getPosts()
  return (
    <Box>
      <Navbar />
      <Box pt={{ base: 40, md: 48 }} pb={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} maxW="1040px" mx="auto">
        <Stack spacing={4} mb={8} align="center">
          <Heading as="h1" size="2xl" color="brand.darkBrown" textAlign="center">Blog</Heading>
          <Text color="brand.mediumBrown" textAlign="center" maxW="720px">Stories, updates, and the heart behind Jewish Mother’s Deli.</Text>
        </Stack>
        <VStack align="stretch" spacing={12}>
          {posts.map((post) => (
            <LinkBox key={post.slug} as="article" borderWidth="1px" borderColor="rgba(138,84,46,0.15)" borderRadius="lg" overflow="hidden" bg="rgba(251,231,204,0.55)" boxShadow="sm" _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }} transition="all 0.2s ease">
              <Image src={post.heroImage} alt={post.title} w="100%" maxH="520px" objectFit="cover" />
              <Box p={{ base: 5, md: 7 }}>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" color="brand.lightBrown">{new Date(post.date).toLocaleDateString()}</Text>
                </HStack>
                <Heading as="h2" size="xl" mb={3} color="brand.darkBrown" lineHeight={1.25}>
                  <LinkOverlay as={RouterLink} to={`/blog/${post.slug}`}>{post.title}</LinkOverlay>
                </Heading>
                <Text color="brand.mediumBrown" fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.9}>{post.excerpt}</Text>
              </Box>
            </LinkBox>
          ))}
        </VStack>
      </Box>
      <Footer />
    </Box>
  )
}

export default BlogPage


