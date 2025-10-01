import React from 'react'
import { Box, Heading, Text, VStack, Image, HStack, Divider } from '@chakra-ui/react'
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
      <Box pt={{ base: 40, md: 44 }} pb={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} maxW="900px" mx="auto">
        <Heading as="h1" size="2xl" mb={4} color="brand.darkBrown" lineHeight={1.15}>{post.title}</Heading>
        <HStack spacing={3} color="brand.lightBrown" fontSize="sm" mb={6}>
          <Text>{new Date(post.date).toLocaleDateString()}</Text>
          <Text>•</Text>
          <Text>{post.author}</Text>
        </HStack>
        <Image src={post.heroImage} alt={post.title} w="100%" mb={8} borderRadius="lg" boxShadow="0 8px 24px rgba(0,0,0,0.1)" />
        <VStack align="stretch" spacing={5}>
          {post.content.map((para, idx) => (
            <Text key={idx} color="brand.mediumBrown" fontSize={{ base: 'lg', md: 'xl' }} lineHeight={1.9}>{para}</Text>
          ))}
        </VStack>
        <Divider my={10} borderColor="rgba(138,84,46,0.2)" />
        <Text color="brand.lightBrown" fontSize="sm">Thank you for reading. More updates coming soon.</Text>
      </Box>
      <Footer />
    </Box>
  )
}

export default BlogPostPage


