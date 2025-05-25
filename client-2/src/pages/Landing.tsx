import React from 'react'
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      <VStack spacing={6} textAlign="center">
        <Heading size="2xl" className="text-primary-700">Welcome to Volta CRM</Heading>
        <Text fontSize="lg" className="text-gray-600 max-w-md">Your lightweight, powerful CRM platform. Beautiful. Fast. Modular.</Text>
        <Link to="/login">
          <Button colorScheme="blue" size="lg" rounded="full" className="transition-transform hover:scale-105">Get Started</Button>
        </Link>
      </VStack>
    </Box>
  )
}

export default LandingPage
