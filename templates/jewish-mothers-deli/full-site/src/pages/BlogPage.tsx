import React from 'react'
import { Box, Heading, Text, VStack, Image, LinkBox, LinkOverlay, HStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPosts } from '../data/posts'
import { Link as RouterLink } from 'react-router-dom'

const BlogPage: React.FC = () => {
  const posts = getPosts()
  return (
    <Box>
      <Navbar />
      <Box pt={{ base: 40, md: 44 }} pb={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} maxW="1000px" mx="auto">
        <Heading as="h1" size="2xl" mb={8} color="brand.darkBrown" letterSpacing="0.5px">Blog</Heading>
        <VStack align="stretch" spacing={12}>
          {posts.map((post) => (
            <LinkBox
              key={post.slug}
              as="article"
              borderWidth="1px"
              borderColor="rgba(138,84,46,0.18)"
              borderRadius="lg"
              overflow="hidden"
              bg="rgba(251,231,204,0.6)"
              boxShadow="0 6px 20px rgba(0,0,0,0.06)"
              _hover={{ boxShadow: '0 10px 28px rgba(0,0,0,0.1)', transform: 'translateY(-2px)' }}
              transition="all 0.25s ease"
            >
              <Image src={post.heroImage} alt={post.title} w="100%" maxH="460px" objectFit="cover" />
              <Box p={{ base: 5, md: 8 }}>
                <Heading as="h2" size="xl" mb={3} color="brand.darkBrown" lineHeight={1.2}>
                  <LinkOverlay as={RouterLink} to={`/blog/${post.slug}`}>{post.title}</LinkOverlay>
                </Heading>
                <HStack spacing={3} mb={3} color="brand.lightBrown" fontSize="sm">
                  <Text>{new Date(post.date).toLocaleDateString()}</Text>
                  <Text>•</Text>
                  <Text>by {post.author}</Text>
                </HStack>
                <Text color="brand.mediumBrown" fontSize={{ base: 'md', md: 'lg' }} lineHeight={1.8}>{post.excerpt}</Text>
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


