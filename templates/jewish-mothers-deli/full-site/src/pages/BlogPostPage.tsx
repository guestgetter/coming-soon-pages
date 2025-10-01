import React from 'react'
import { Box, Heading, Text, VStack, Image } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { getPostBySlug } from '../data/posts'

const BlogPostPage: React.FC = () => {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <Box>
        <Navbar />
        <Box pt={{ base: 36, md: 40 }} px={{ base: 4, md: 8 }} maxW="960px" mx="auto">
          <Heading size="lg">Post not found</Heading>
        </Box>
        <Footer />
      </Box>
    )
  }

  return (
    <Box>
      <Navbar />
      <Box pt={{ base: 40, md: 48 }} pb={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} maxW="860px" mx="auto">
        <Heading as="h1" size="2xl" mb={4} color="brand.darkBrown" lineHeight={1.2}>{post.title}</Heading>
        <Text fontSize="sm" color="brand.lightBrown" mb={8}>{new Date(post.date).toLocaleDateString()} • {post.author}</Text>
        <Image src={post.heroImage} alt={post.title} w="100%" mb={10} borderRadius="lg" boxShadow="md" />
        <VStack align="stretch" spacing={6}>
          {post.content.map((para, idx) => (
            <Text key={idx} color="brand.mediumBrown" fontSize={{ base: 'lg', md: 'xl' }} lineHeight={2}>{para}</Text>
          ))}
        </VStack>
      </Box>
      <Footer />
    </Box>
  )
}

export default BlogPostPage


