import React from 'react'
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Grid,
  Divider,
  IconButton
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { Project } from '../store/projectsSlice'

interface DealCardProps {
  project: Project
}

const DealCard: React.FC<DealCardProps> = ({ project }) => {
  return (
    <Box bg="white" rounded="lg" shadow="sm" p={4} className="space-y-2">
      <Stack direction="row" justify="space-between" align="center">
        <Heading size="md" fontWeight="bold" className="truncate">
          {project.homeowner}
        </Heading>
        <IconButton
          aria-label="Edit Project"
          icon={<EditIcon />}
          size="sm"
          variant="ghost"
        />
      </Stack>
      <Grid templateColumns="repeat(2,1fr)" gap={2} fontSize="sm">
        <Box>
          <Text fontWeight="semibold">Sale Date</Text>
          <Text>{project.saleDate}</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold" mb={1}>Products</Text>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {project.products?.map(prod => (
              <Badge
                key={prod}
                variant="solid"
                colorScheme="teal"
                className="whitespace-nowrap"
              >
                {prod}
              </Badge>
            ))}
          </Stack>
        </Box>
        <Box>
          <Text fontWeight="semibold">Status</Text>
          <Badge>{project.status}</Badge>
        </Box>
        <Box>
          <Text fontWeight="semibold">Stage</Text>
          <Badge colorScheme="purple">{project.stage}</Badge>
        </Box>
        <Box>
          <Text fontWeight="semibold">Contract</Text>
          <Text>{project.contractAmount}</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold">Size</Text>
          <Text>{project.systemSize}</Text>
        </Box>
      </Grid>
      <Divider />
      <Stack spacing={1} fontSize="xs" color="gray.600">
        <Text>{project.installer}</Text>
        <Text>{project.phone}</Text>
        <Text className="truncate">{project.address}</Text>
      </Stack>
    </Box>
  )
}

export default DealCard
