import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

const theme = extendTheme({
  fonts: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
  config: { initialColorMode: 'light' },
})

export function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
