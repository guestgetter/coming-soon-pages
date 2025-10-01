import React from 'react'
import { Box, Heading, Text, VStack, Image, LinkBox, LinkOverlay } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPosts } from '../data/posts'
import { Link as RouterLink } from 'react-router-dom'

const BlogPage: React.FC = () => {
  const posts = getPosts()
  return (
    <Box>
      <Navbar />
      <Box pt={{ base: 36, md: 40 }} px={{ base: 4, md: 8 }} maxW="960px" mx="auto">
        <Heading as="h1" size="2xl" mb={6} color="brand.darkBrown">Blog</Heading>
        <VStack align="stretch" spacing={10}>
          {posts.map((post) => (
            <LinkBox key={post.slug} as="article" borderWidth="1px" borderColor="rgba(138,84,46,0.2)" borderRadius="md" overflow="hidden" bg="rgba(251,231,204,0.5)">
              <Image src={post.heroImage} alt={post.title} w="100%" maxH="420px" objectFit="cover" />
              <Box p={6}>
                <Heading as="h2" size="lg" mb={2} color="brand.darkBrown">
                  <LinkOverlay as={RouterLink} to={`/blog/${post.slug}`}>{post.title}</LinkOverlay>
                </Heading>
                <Text fontSize="sm" color="brand.lightBrown" mb={2}>{new Date(post.date).toLocaleDateString()}</Text>
                <Text color="brand.mediumBrown">{post.excerpt}</Text>
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


