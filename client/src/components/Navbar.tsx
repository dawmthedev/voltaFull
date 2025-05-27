import React from 'react'
import { Flex, Button, Heading } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import UserAvatar from './UserAvatar'

interface NavbarProps {
  onLogout: () => void
  onCSVChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddProject: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, onCSVChange, onAddProject }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={50}
      px={4}
      py={2}
      bg="white"
      align="center"
      justify="space-between"
      wrap="wrap"
      className="border-b shadow-sm"
    >
      <Heading size="md" mb={{ base: 2, md: 0 }}>
        Volta CRM
      </Heading>

      <Flex
        align="center"
        gap={2}
        wrap="wrap"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Button onClick={onLogout} colorScheme="red" variant="outline">
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
        <Button onClick={() => inputRef.current?.click()} variant="ghost">
          Upload CSV
        </Button>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={onAddProject}
        >
          Add Project
        </Button>
        <UserAvatar />
      </Flex>
    </Flex>
  )
}

export default Navbar
