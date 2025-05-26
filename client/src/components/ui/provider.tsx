import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import { AuthProvider } from '../../hooks/useAuth'

const theme = extendTheme({
  fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
  config: { initialColorMode: 'light' },
})

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  )
}
