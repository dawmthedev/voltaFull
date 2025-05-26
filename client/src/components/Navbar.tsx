import React from 'react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

interface NavbarProps {
  onLogout: () => void
  onCSVChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddProject: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, onCSVChange, onAddProject }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={50}
      bg="white"
      className="border-b shadow-sm"
    >
      <Flex justify="space-between" align="center" px={4} py={2}>
        <Heading size="md" className="whitespace-nowrap">
          Volta CRM
        </Heading>
        <Flex gap={2} flexWrap="wrap">
          <Button
            onClick={onLogout}
            colorScheme="red"
            variant="outline"
            className="whitespace-nowrap"
          >
            Logout
          </Button>
          <input
            type="file"
            accept=".csv"
            onChange={onCSVChange}
            hidden
            ref={inputRef}
            data-testid="csv-input"
          />
          <Button onClick={() => inputRef.current?.click()} className="whitespace-nowrap">
            Upload CSV
          </Button>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={onAddProject}
            className="whitespace-nowrap"
          >
            Add Project
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
