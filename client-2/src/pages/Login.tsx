import React from 'react'
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'

const LoginPage: React.FC = () => {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <Box bg="white" p={8} rounded="xl" shadow="xl" className="w-full max-w-md transition-transform hover:scale-[1.01]">
        <Heading mb={6} size="lg" textAlign="center">Login to Volta</Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="you@example.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button colorScheme="blue" size="md" rounded="md">Sign In</Button>
        </Stack>
        <Text fontSize="sm" textAlign="center" mt={4} color="gray.500">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </Text>
      </Box>
    </Box>
  )
}

export default LoginPage
