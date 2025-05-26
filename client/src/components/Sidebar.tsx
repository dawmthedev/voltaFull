import React, { useState } from 'react'
import { Box, Button, VStack, Link } from '@chakra-ui/react'
import { useAppSelector } from '../store'

const sections = [
  { label: 'Deals', roles: ['admin', 'technician', 'sales'] },
  { label: 'Projects', roles: ['admin', 'technician'] },
  { label: 'Admin', roles: ['admin'] }
]

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const role = useAppSelector(state => state.auth.user?.role || 'sales')
  const visible = sections.filter(s => s.roles.includes(role))
  return (
    <Box as="nav" bg="gray.100" p={4} w={open ? '200px' : 'auto'}>
      <Button size="sm" mb={4} onClick={() => setOpen(!open)}>
        {open ? 'Hide' : 'Menu'}
      </Button>
      {open && (
        <VStack align="start" spacing={2}>
          {visible.map(sec => (
            <Link href="#" key={sec.label} fontWeight="bold">
              {sec.label}
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  )
}

export default Sidebar
