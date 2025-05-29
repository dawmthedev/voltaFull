import React, { useState, useEffect } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useDisclosure, ScaleFade, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../store'
import { login } from '../store/authSlice'


const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token, status } = useAppSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  useEffect(() => {
    if (token) navigate('/dashboard/projects', { replace: true })
  }, [token, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await dispatch(login({ email, password })).unwrap()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const bg = useColorModeValue('blue.50', 'gray.900')
  const panelBg = useColorModeValue('white', 'gray.700')
  return (
    <Box className="min-h-screen flex flex-col items-center justify-center px-4" bg={bg}>
      <Button size="sm" mb={4} onClick={onToggle}>Toggle Login</Button>
      <ScaleFade in={isOpen} initialScale={0.9} className="w-full">
        <Box
          bg={panelBg}
          p={8}
          rounded="xl"
          shadow="xl"
          className="w-full max-w-md transition-all"
          transform={{ base: 'scale(0.5)', sm: 'scale(0.75)', md: 'scale(1)' }}
        >
          <Heading mb={6} size="lg" textAlign="center">Login to Volta</Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </FormControl>

              {error && (
                <Text color="red.500" fontSize="sm">
                  {error}
                </Text>
              )}
              <Button type="submit" colorScheme="blue" size="md" rounded="md" isLoading={status === 'loading'}>
                Sign In
              </Button>
            </Stack>
          </form>
          <Text fontSize="sm" textAlign="center" mt={4} color="gray.500">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </Text>
        </Box>
      </ScaleFade>
    </Box>
  )
}

export default LoginPage
