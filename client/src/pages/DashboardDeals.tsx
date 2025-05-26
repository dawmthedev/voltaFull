import React, { useEffect } from 'react'
import { Box, Button, List, ListItem, Heading } from '@chakra-ui/react'
import { fetchDeals } from '../store/dealsSlice'
import { logout } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store'

const DashboardDeals: React.FC = () => {
  const dispatch = useAppDispatch()
  const deals = useAppSelector(state => state.deals.items)

  useEffect(() => {
    dispatch(fetchDeals())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box p={4}>
      <Button onClick={handleLogout} mb={4} colorScheme="red">
        Logout
      </Button>
      <Heading size="md" mb={2}>Deals</Heading>
      <List spacing={2}>
        {deals.map(deal => (
          <ListItem key={deal.id}>{deal.name}</ListItem>
        ))}
      </List>
    </Box>
  )
}

export default DashboardDeals
